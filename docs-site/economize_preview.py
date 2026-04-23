# Copyright 2026 Holochip Inc.
# SPDX-License-Identifier: Apache-2.0

import argparse
import hashlib
import os
import re

# Extensions whose content we scan and rewrite to fix up references to
# deleted duplicate binary assets.
REWRITABLE_EXTS = {'.html', '.htm', '.css', '.js'}

# HTML pages are intentionally NOT deduplicated: redirect stubs would
# cause full-page navigation out of the PR preview.
HTML_EXTS = {'.html', '.htm'}


def file_hash(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1 << 16), b''):
            h.update(chunk)
    return h.hexdigest()


def files_identical(a, b):
    try:
        if os.path.getsize(a) != os.path.getsize(b):
            return False
    except OSError:
        return False
    return file_hash(a) == file_hash(b)




def main():
    ap = argparse.ArgumentParser(
        description='Deduplicate a PR preview against the base site by '
                    'deleting duplicate binary assets and rewriting their '
                    'references in HTML/CSS/JS. HTML pages are preserved '
                    'as-is to keep review navigation inside the PR folder.')
    ap.add_argument('--site', required=True,
                    help='Path to the PR preview directory (e.g. public-site/PR-181)')
    ap.add_argument('--base', required=True,
                    help='Path to the base/gh-pages site root (e.g. public-site)')
    args = ap.parse_args()

    site_dir = os.path.abspath(args.site)
    base_dir = os.path.abspath(args.base)

    if not os.path.isdir(site_dir):
        print(f'error: site directory not found: {site_dir}')
        return 1
    if not os.path.isdir(base_dir):
        print(f'warning: base directory not found: {base_dir}; skipping dedup.')
        return 0

    pr_name = os.path.basename(site_dir.rstrip(os.sep))

    binary_deleted = 0
    binary_bytes_saved = 0
    kept = 0

    binary_dups = {}  # rel_path -> size

    # Pass 1: replace duplicate HTML with stubs; record duplicate binaries.
    for root, dirs, files in os.walk(site_dir):
        # Skip any nested PR-* folders defensively.
        dirs[:] = [d for d in dirs if not d.startswith('PR-')]
        for name in files:
            full = os.path.join(root, name)

            # Any pre-existing symlinks would be dereferenced by tar
            # anyway; materialize them as regular files so our dedup
            # logic is comparing real file contents.
            if os.path.islink(full):
                try:
                    real = os.path.realpath(full)
                    if os.path.isfile(real):
                        with open(real, 'rb') as r:
                            data = r.read()
                        os.remove(full)
                        with open(full, 'wb') as w:
                            w.write(data)
                    else:
                        # Broken symlink; drop it.
                        os.remove(full)
                        continue
                except OSError:
                    pass

            rel = os.path.relpath(full, site_dir)
            base_path = os.path.join(base_dir, rel)

            if not (os.path.isfile(base_path) and os.path.isfile(full)):
                kept += 1
                continue
            if not files_identical(full, base_path):
                kept += 1
                continue

            ext = os.path.splitext(name)[1].lower()
            size = os.path.getsize(full)

            if ext in HTML_EXTS:
                # Never stub HTML: we want reviewers to stay inside the
                # PR preview as they click through duplicate-content
                # pages. Keep the real file.
                kept += 1
            else:
                binary_dups[rel] = size

    # Pass 2: rewrite references to duplicate binaries, then delete them.
    if binary_dups:
        # Precompile a pattern per duplicate. We look for occurrences of the
        # duplicate's relative path inside HTML/CSS/JS attribute/url values.
        patterns = []
        for rel in binary_dups:
            rel_url = rel.replace(os.sep, '/')
            # Only trigger on reasonably filename-like references to avoid
            # false positives on short common substrings.
            escaped = re.escape(rel_url)
            patterns.append((rel_url, re.compile(
                rf'''(?P<q>["'])(?P<val>[^"']*?{escaped})(?P=q)''')))

        for root, dirs, files in os.walk(site_dir):
            dirs[:] = [d for d in dirs if not d.startswith('PR-')]
            for name in files:
                if os.path.splitext(name)[1].lower() not in REWRITABLE_EXTS:
                    continue
                full = os.path.join(root, name)
                try:
                    with open(full, 'r', encoding='utf-8', errors='ignore') as f:
                        text = f.read()
                except OSError:
                    continue

                rel_html = os.path.relpath(full, site_dir)
                depth = rel_html.count(os.sep)
                up = '../' * (depth + 1)  # leave the PR-xxx/ folder

                changed = False
                new_text = text
                for rel_url, pat in patterns:
                    replacement_url = up + rel_url

                    def _sub(m, rep=replacement_url):
                        return f'{m.group("q")}{rep}{m.group("q")}'

                    new_text2 = pat.sub(_sub, new_text)
                    if new_text2 != new_text:
                        changed = True
                        new_text = new_text2

                if changed:
                    with open(full, 'w', encoding='utf-8') as f:
                        f.write(new_text)

        # Delete duplicate binaries now that references point at the canonical copy.
        for rel, size in binary_dups.items():
            full = os.path.join(site_dir, rel)
            try:
                os.remove(full)
                binary_deleted += 1
                binary_bytes_saved += size
            except OSError as e:
                print(f'  failed to delete {rel}: {e}')

    total_saved_mb = binary_bytes_saved / (1024 * 1024)
    print(f'Dedup summary for {pr_name}:')
    print(f'  HTML pages kept as-is (preserve review navigation)')
    print(f'  Binary duplicates removed               : {binary_deleted} '
          f'(~{binary_bytes_saved / (1024 * 1024):.2f} MB)')
    print(f'  Files kept (changed by this PR or PR-only): {kept}')
    print(f'  Total bytes saved                       : ~{total_saved_mb:.2f} MB')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
