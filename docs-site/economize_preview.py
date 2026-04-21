# Copyright 2026 Holochip Inc.
# SPDX-License-Identifier: Apache-2.0

import os
import hashlib
import argparse

def get_file_hash(path):
    """Calculate SHA-256 hash of a file."""
    hasher = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hasher.update(chunk)
    return hasher.hexdigest()

def are_files_identical(path1, path2):
    """Check if two files are identical by size and then hash."""
    if os.path.getsize(path1) != os.path.getsize(path2):
        return False
    return get_file_hash(path1) == get_file_hash(path2)

def main():
    parser = argparse.ArgumentParser(description='Deduplicate PR site against a base site using relative symlinks.')
    parser.add_argument('--site', required=True, help='Path to the newly built site')
    parser.add_argument('--base', required=True, help='Path to the base site (gh-pages root)')

    args = parser.parse_args()

    site_dir = os.path.abspath(args.site)
    base_dir = os.path.abspath(args.base)

    if not os.path.exists(site_dir):
        print(f"Error: Site directory {site_dir} does not exist.")
        return
    if not os.path.exists(base_dir):
        print(f"Warning: Base directory {base_dir} does not exist. Skipping deduplication.")
        return

    print(f"Deduplicating {site_dir} against {base_dir}...")

    savings = 0
    count = 0
    skipped = 0

    for root, dirs, files in os.walk(site_dir):
        for file in files:
            full_path = os.path.join(root, file)
            # Get path relative to site root
            rel_path = os.path.relpath(full_path, site_dir)
            base_path = os.path.join(base_dir, rel_path)

            if os.path.exists(base_path) and os.path.isfile(base_path):
                if are_files_identical(full_path, base_path):
                    # Calculate depth to site root
                    # rel_path.count(os.sep) gives the number of parent directories within the site
                    # The symlink needs to go up one extra level to leave the PR folder (e.g., PR-181/)
                    depth = rel_path.count(os.sep)
                    up_levels = "../" * (depth + 1)
                    target = os.path.join(up_levels, rel_path)

                    file_size = os.path.getsize(full_path)
                    try:
                        os.remove(full_path)
                        os.symlink(target, full_path)
                        savings += file_size
                        count += 1
                    except Exception as e:
                        print(f"Failed to symlink {rel_path}: {e}")
                else:
                    skipped += 1
            else:
                skipped += 1

    print(f"Deduplication complete.")
    print(f" - Files replaced with symlinks: {count}")
    print(f" - Files kept (new or modified): {skipped}")
    print(f" - Potential space saved on gh-pages: {savings / (1024*1024):.2f} MB")

if __name__ == "__main__":
    main()
