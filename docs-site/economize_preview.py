# Copyright 2026 Holochip Inc.
# SPDX-License-Identifier: Apache-2.0
"""Deduplicate a PR preview against a base site.

Design goals:
  * Idempotent & resumable: a `.economize_progress` marker file is written
    inside the PR folder so re-runs after interruption skip already-processed
    files instead of starting over.
  * Fast first pass: we index the base site by relative path once, and use
    size-first comparison before hashing.
  * Observable: prints a progress line every few seconds (files/sec, ETA) and
    flushes stdout so callers see live output.
  * Safe for tar: duplicate HTML pages are replaced with meta-refresh redirect
    stubs pointing at the canonical base-site copy. Duplicate binary assets are
    deleted and their references in non-stub HTML/CSS/JS are rewritten to point
    at the canonical main-site copy (``../<rel>``).
"""

import argparse
import filecmp
import json
import os
import re
import sys
import time
from urllib.parse import urlparse

REWRITABLE_EXTS = {'.html', '.htm', '.css', '.js'}
HTML_EXTS = {'.html', '.htm'}
PROGRESS_INTERVAL = 5.0
MARKER_NAME = '.economize_progress'


def log(msg):
    sys.stdout.write(msg + '\n')
    sys.stdout.flush()


def files_identical(a, b):
    try:
        if os.path.getsize(a) != os.path.getsize(b):
            return False
    except OSError:
        return False
    try:
        return filecmp.cmp(a, b, shallow=False)
    except OSError:
        return False


def _redirect_stub(redirect_url):
    return (f'<!DOCTYPE html>\n<html><head>'
            f'<meta http-equiv="refresh" content="0;url={redirect_url}">'
            f'</head></html>\n')


def index_base(base_dir, pr_name):
    log(f'[{pr_name}] indexing base site at {base_dir} ...')
    t0 = time.time()
    idx = {}
    for root, dirs, files in os.walk(base_dir):
        dirs[:] = [d for d in dirs if not d.startswith('PR-')]
        for name in files:
            full = os.path.join(root, name)
            try:
                idx[os.path.relpath(full, base_dir)] = os.path.getsize(full)
            except OSError:
                pass
    log(f'[{pr_name}] base index: {len(idx)} files in {time.time()-t0:.1f}s')
    return idx


def load_progress(site_dir):
    path = os.path.join(site_dir, MARKER_NAME)
    if not os.path.isfile(path):
        return {'pass1_done': False, 'processed_rewrites': [], 'dups': {},
                'html_stubs': []}
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (OSError, json.JSONDecodeError):
        return {'pass1_done': False, 'processed_rewrites': [], 'dups': {},
                'html_stubs': []}


def save_progress(site_dir, state):
    path = os.path.join(site_dir, MARKER_NAME)
    try:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(state, f)
    except OSError:
        pass


def materialize_symlink(full):
    if not os.path.islink(full):
        return True
    try:
        real = os.path.realpath(full)
        if os.path.isfile(real):
            with open(real, 'rb') as r:
                data = r.read()
            os.remove(full)
            with open(full, 'wb') as w:
                w.write(data)
            return True
        os.remove(full)
        return False
    except OSError:
        return True


def fix_root_index(site_dir, pr_name):
    """Rewrite root index.html so its meta-refresh stays inside the PR folder.

    Antora emits an absolute production URL (e.g. https://github.khronos.org/
    Vulkan-Site/spec/latest/index.html). When the preview is served from a
    subdirectory that URL takes reviewers to the live site instead of the PR
    preview. We walk the URL path segments until we find one that exists as an
    entry in site_dir and use the remainder as a relative redirect.
    """
    idx = os.path.join(site_dir, 'index.html')
    if not os.path.isfile(idx):
        return
    try:
        with open(idx, 'r', encoding='utf-8') as f:
            html = f.read()
    except OSError:
        return

    url_pat = re.compile(r'(url=)([^\s"\'<>]+)', re.IGNORECASE)
    m = url_pat.search(html)
    if not m:
        return

    url = m.group(2)
    parsed = urlparse(url)
    if not parsed.scheme:
        return  # already relative, nothing to do

    segments = parsed.path.lstrip('/').split('/')
    rel = None
    for i, seg in enumerate(segments):
        if os.path.exists(os.path.join(site_dir, seg)):
            rel = '/'.join(segments[i:])
            break
    if rel is None:
        return

    new_html = html[:m.start(2)] + rel + html[m.end(2):]
    try:
        with open(idx, 'w', encoding='utf-8') as f:
            f.write(new_html)
        log(f'[{pr_name}] fixed root index redirect: {url} -> {rel}')
    except OSError:
        pass


def _should_dir_stub(rel, stub_dirs):
    """True if rel is HTML in a stub_dir but NOT an index.html entry point."""
    if not stub_dirs:
        return False
    top = rel.split(os.sep)[0]
    if top not in stub_dirs:
        return False
    return os.path.basename(rel).lower() != 'index.html'


def pass1_find_duplicates(site_dir, base_dir, base_index, pr_name,
                          stub_dirs=None):
    # stub_dirs: set of top-level directory names whose HTML is always stubbed
    # regardless of identity (e.g. {'refpages'}). index.html files within those
    # dirs are excluded so reviewers have a working entry point.
    stub_dirs = stub_dirs or set()
    all_files = []
    for root, dirs, files in os.walk(site_dir):
        dirs[:] = [d for d in dirs if not d.startswith('PR-')]
        for name in files:
            if name == MARKER_NAME:
                continue
            all_files.append(os.path.join(root, name))
    total = len(all_files)
    log(f'[{pr_name}] pass1: scanning {total} files')

    dups = {}
    kept = 0
    html_stubbed = 0
    html_bytes_saved = 0
    t0 = time.time()
    last = t0

    for i, full in enumerate(all_files, 1):
        if not materialize_symlink(full):
            continue
        rel = os.path.relpath(full, site_dir)
        base_size = base_index.get(rel)
        ext = os.path.splitext(full)[1].lower()
        if base_size is None:
            kept += 1
        elif ext in HTML_EXTS and _should_dir_stub(rel, stub_dirs):
            try:
                depth = rel.count(os.sep)
                up = '../' * (depth + 1)
                redirect_url = up + rel.replace(os.sep, '/')
                stub = _redirect_stub(redirect_url)
                orig_size = os.path.getsize(full)
                if orig_size != len(stub.encode()):
                    with open(full, 'w', encoding='utf-8') as f:
                        f.write(stub)
                    html_bytes_saved += max(0, orig_size - len(stub.encode()))
                html_stubbed += 1
            except OSError:
                kept += 1
        else:
            try:
                if os.path.getsize(full) != base_size:
                    kept += 1
                else:
                    base_path = os.path.join(base_dir, rel)
                    if files_identical(full, base_path):
                        if ext in HTML_EXTS:
                            depth = rel.count(os.sep)
                            up = '../' * (depth + 1)
                            redirect_url = up + rel.replace(os.sep, '/')
                            stub = _redirect_stub(redirect_url)
                            orig_size = os.path.getsize(full)
                            with open(full, 'w', encoding='utf-8') as f:
                                f.write(stub)
                            html_stubbed += 1
                            html_bytes_saved += max(0, orig_size - len(stub.encode()))
                        else:
                            dups[rel] = base_size
                    else:
                        kept += 1
            except OSError:
                kept += 1

        now = time.time()
        if now - last >= PROGRESS_INTERVAL or i == total:
            pct = 100.0 * i / max(total, 1)
            elapsed = now - t0
            rate = i / elapsed if elapsed > 0 else 0
            eta = (total - i) / rate if rate > 0 else 0
            log(f'[{pr_name}] pass1 {pct:5.1f}% ({i}/{total}) '
                f'kept={kept} html_stubs={html_stubbed} dups={len(dups)} '
                f'{rate:.0f} f/s ETA={eta:.0f}s')
            last = now

    return dups, kept, html_stubbed, html_bytes_saved


def pass2_rewrite_and_delete(site_dir, dups, stub_paths, pr_name, state):
    if not dups:
        return 0, 0

    rel_urls = [r.replace(os.sep, '/') for r in dups]
    exact_set = set(rel_urls)

    # Index by last path component: O(1) exact match + O(k) suffix lookup
    # per regex match, instead of iterating all 4000+ dups per match.
    tail_to_urls = {}
    for u in rel_urls:
        tail = u.rsplit('/', 1)[-1]
        tail_to_urls.setdefault(tail, []).append(u)

    # Pre-filter: a file containing none of the dup file extensions cannot
    # reference any dup. Uses fast C-level str.__contains__ on ~15 extensions
    # instead of a 4000-alternative regex.
    dup_exts = {os.path.splitext(u)[1].lower()
                for u in rel_urls if '.' in u.rsplit('/', 1)[-1]}

    # Matches any quoted value containing a slash (all asset paths do).
    path_pat = re.compile(r'''(?P<q>["'])(?P<val>[^"']*?/[^"']*)(?P=q)''')

    # Exclude dup files themselves — they're about to be deleted.
    rewritable = []
    for root, dirs, files in os.walk(site_dir):
        dirs[:] = [d for d in dirs if not d.startswith('PR-')]
        for name in files:
            if os.path.splitext(name)[1].lower() in REWRITABLE_EXTS:
                full = os.path.join(root, name)
                rel = os.path.relpath(full, site_dir)
                if rel not in stub_paths and rel not in dups:
                    try:
                        if os.path.getsize(full) <= 512 * 1024:
                            rewritable.append(full)
                    except OSError:
                        pass

    already = set(state.get('processed_rewrites', []))
    rtotal = len(rewritable)
    log(f'[{pr_name}] pass2: rewriting up to {rtotal} html/css/js for '
        f'{len(dups)} dup assets (resume: {len(already)} already done)')

    t0 = time.time()
    last = t0
    for i, full in enumerate(rewritable, 1):
        if full not in already:
            try:
                with open(full, 'r', encoding='utf-8', errors='ignore') as f:
                    text = f.read()
            except OSError:
                text = None

            if text is not None and any(ext in text for ext in dup_exts):
                rel_html = os.path.relpath(full, site_dir)
                depth = rel_html.count(os.sep)
                up = '../' * (depth + 1)

                def _sub(m, up=up, exact_set=exact_set,
                         tail_to_urls=tail_to_urls):
                    val = m.group('val')
                    if val in exact_set:
                        return f'{m.group("q")}{up}{val}{m.group("q")}'
                    tail = val.rsplit('/', 1)[-1]
                    for u in tail_to_urls.get(tail, ()):
                        if val.endswith('/' + u):
                            return f'{m.group("q")}{up}{u}{m.group("q")}'
                    return m.group(0)

                new_text = path_pat.sub(_sub, text)
                if new_text != text:
                    try:
                        with open(full, 'w', encoding='utf-8') as f:
                            f.write(new_text)
                    except OSError:
                        pass

            already.add(full)

        now = time.time()
        if now - last >= PROGRESS_INTERVAL or i == rtotal:
            pct = 100.0 * i / max(rtotal, 1)
            elapsed = now - t0
            rate = i / elapsed if elapsed > 0 else 0
            eta = (rtotal - i) / rate if rate > 0 else 0
            log(f'[{pr_name}] pass2 {pct:5.1f}% ({i}/{rtotal}) '
                f'{rate:.0f} f/s ETA={eta:.0f}s')
            state['processed_rewrites'] = list(already)
            save_progress(site_dir, state)
            last = now

    deleted = 0
    bytes_saved = 0
    for rel, size in dups.items():
        full = os.path.join(site_dir, rel)
        try:
            os.remove(full)
            deleted += 1
            bytes_saved += size
        except OSError:
            pass
    return deleted, bytes_saved


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--site', required=True)
    ap.add_argument('--base', required=True)
    ap.add_argument('--reset', action='store_true')
    ap.add_argument('--stub-dirs', default='',
                    help='Comma-separated top-level directory names whose HTML '
                         'is always stubbed regardless of identity, except '
                         'index.html files. E.g. --stub-dirs refpages')
    args = ap.parse_args()

    site_dir = os.path.abspath(args.site)
    base_dir = os.path.abspath(args.base)
    pr_name = os.path.basename(site_dir.rstrip(os.sep))

    if not os.path.isdir(site_dir):
        log(f'[{pr_name}] error: site directory not found: {site_dir}')
        return 1
    if not os.path.isdir(base_dir):
        log(f'[{pr_name}] warning: base dir not found; skipping dedup.')
        return 0

    state = {'pass1_done': False, 'processed_rewrites': [], 'dups': {},
             'html_stubs': []}
    if not args.reset:
        state = load_progress(site_dir)

    fix_root_index(site_dir, pr_name)

    t_total = time.time()
    base_index = index_base(base_dir, pr_name)

    if state.get('pass1_done') and state.get('dups') is not None:
        dups = {k: int(v) for k, v in state['dups'].items()}
        kept = state.get('kept', -1)
        html_stubbed = state.get('html_stubbed', -1)
        html_bytes_saved = state.get('html_bytes_saved', 0)
        stub_paths = set(state.get('html_stubs', []))
        log(f'[{pr_name}] pass1: resumed, {len(dups)} dup assets, '
            f'{html_stubbed} html stubs from marker')
    else:
        stub_dirs = {d.strip().replace('/', os.sep)
                     for d in args.stub_dirs.split(',') if d.strip()}
        dups, kept, html_stubbed, html_bytes_saved = pass1_find_duplicates(
            site_dir, base_dir, base_index, pr_name, stub_dirs=stub_dirs)
        stub_paths = set()
        for root, dirs, files in os.walk(site_dir):
            dirs[:] = [d for d in dirs if not d.startswith('PR-')]
            for name in files:
                if os.path.splitext(name)[1].lower() in HTML_EXTS:
                    full = os.path.join(root, name)
                    try:
                        if os.path.getsize(full) < 256:
                            rel = os.path.relpath(full, site_dir)
                            stub_paths.add(rel)
                    except OSError:
                        pass
        state['pass1_done'] = True
        state['dups'] = dups
        state['kept'] = kept
        state['html_stubbed'] = html_stubbed
        state['html_bytes_saved'] = html_bytes_saved
        state['html_stubs'] = list(stub_paths)
        save_progress(site_dir, state)

    deleted, bytes_saved = pass2_rewrite_and_delete(
        site_dir, dups, stub_paths, pr_name, state)

    try:
        os.remove(os.path.join(site_dir, MARKER_NAME))
    except OSError:
        pass

    total_saved_mb = (html_bytes_saved + bytes_saved) / (1024 * 1024)
    log(f'[{pr_name}] DONE '
        f'kept={kept} '
        f'html_stubs={html_stubbed} (~{html_bytes_saved/(1024*1024):.2f}MB) '
        f'dup_bin_deleted={deleted} (~{bytes_saved/(1024*1024):.2f}MB) '
        f'total_saved~{total_saved_mb:.2f}MB '
        f'elapsed={time.time()-t_total:.0f}s')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
