# Copyright 2026 Holochip Inc.
# SPDX-License-Identifier: Apache-2.0

import yaml
import os
import sys
import argparse
import subprocess

def clean_attachments(attachments_arg):
    # Handle attachments
    # We clean both the source and the processed antora directory to be sure
    for attachments_dir in ['Vulkan-Tutorial/attachments', 'Vulkan-Tutorial/antora/modules/ROOT/attachments']:
        if not os.path.exists(attachments_dir):
            continue
        
        if attachments_arg.lower() == 'false':
            # Remove attachments directory if tutorial is included
            print(f"Removing attachments: {attachments_dir}")
            subprocess.run(['rm', '-rf', attachments_dir])
        elif attachments_arg.lower() == 'true':
            # "Cleaning" it - remove known large types and unnecessary asset directories to save space
            print(f"Cleaning attachments: {attachments_dir}")
            # Remove known large directories
            for d in ['venv', 'node_modules', 'third_party', 'cmake-build-debug', 'build', 'lib', 'ort_gpu', 'build_integration_test', '__pycache__']:
                subprocess.run(['find', attachments_dir, '-type', 'd', '-name', d, '-prune', '-exec', 'rm', '-rf', '{}', '+'])
            
            # Specifically remove Assets and assets directories which are not needed for the published tutorial site
            # as requested by the user.
            subprocess.run(['find', attachments_dir, '-type', 'd', '(', '-name', 'Assets', '-o', '-name', 'assets', ')', '-exec', 'rm', '-rf', '{}', '+'])
            
            # Remove any large files that shouldn't be published as attachments
            subprocess.run(['find', attachments_dir, '-type', 'f', '(',
                            '-name', '*.zip', '-o',
                            '-name', '*.tar.gz', '-o',
                            '-name', '*.pdf', '-o',
                            '-name', '*.mp4', '-o',
                            '-name', '*.mov', '-o',
                            '-name', '*.whl', '-o',
                            '-name', '*.nupkg', '-o',
                            '-name', '*.tgz', '-o',
                            '-name', '*.so*', '-o',
                            '-name', '*.exe', '-o',
                            '-name', '*.bin', '-o',
                            '-name', '*.tar.xz', '-o',
                            '-name', '*.onnx*', '-o',
                            '-name', '*.pth', '-o',
                            '-name', '*.vmfb', '-o',
                            '-name', '*.mlir', '-o',
                            '-name', '*.a', '-o',
                            '-name', '*.lib', '-o',
                            '-name', '*.dll', '-o',
                            '-name', '*.node', '-o',
                            '-name', '*.pyc'
                            ')', '-delete'])

def main():
    parser = argparse.ArgumentParser(description='Prepare Antora playbook and optimize assets.')
    parser.add_argument('--guide', type=str, default='true')
    parser.add_argument('--glsl', type=str, default='true')
    parser.add_argument('--docs', type=str, default='true')
    parser.add_argument('--samples', type=str, default='true')
    parser.add_argument('--tutorial', type=str, default='true')
    parser.add_argument('--attachments', type=str, default='true')
    parser.add_argument('--optimize', type=str, default='false')
    parser.add_argument('--cleanup-only', action='store_true', help='Only clean attachments')

    args = parser.parse_args()

    if args.cleanup_only:
        clean_attachments(args.attachments)
        sys.exit(0)

    playbook_path = 'docs-site/antora-playbook.yml'
    with open(playbook_path, 'r') as f:
        playbook = yaml.safe_load(f)

    # Define modules mapping to their URL substrings in the playbook
    modules = {
        'Vulkan-Guide': args.guide.lower() == 'true',
        'GLSL': args.glsl.lower() == 'true',
        'Vulkan-Docs': args.docs.lower() == 'true',
        'Vulkan-Samples': args.samples.lower() == 'true',
        'Vulkan-Tutorial': args.tutorial.lower() == 'true'
    }

    # We need to handle both commented out and active sources.
    # We use exactly the URLs from the original playbook file.
    all_sources = [
        {'url': '../Vulkan-Guide', 'branches': 'HEAD', 'start_path': 'antora', 'name': 'Vulkan-Guide'},
        {'url': '../GLSL', 'branches': 'HEAD', 'start_path': 'antora', 'name': 'GLSL'},
        {'url': '../Vulkan-Docs', 'branches': 'HEAD', 'start_paths': 'antora/spec, antora/features, antora/refpages', 'name': 'Vulkan-Docs'},
        {'url': '../Vulkan-Samples', 'branches': 'HEAD', 'start_path': 'antora', 'name': 'Vulkan-Samples'},
        {'url': '../Vulkan-Tutorial', 'branches': 'HEAD', 'start_path': 'antora', 'name': 'Vulkan-Tutorial'}
    ]

    new_sources = []
    for src in all_sources:
        if modules.get(src['name']):
            # Clean up the dict before adding
            source_entry = {k: v for k, v in src.items() if k != 'name'}
            new_sources.append(source_entry)

    playbook['content']['sources'] = new_sources

    # Ensure .cjs files exist to avoid extension loading failure if Docs are excluded
    js_dir = 'docs-site/js'
    if not os.path.exists(js_dir):
        os.makedirs(js_dir)
    for f in ['apimap.cjs', 'pageMap.cjs', 'xrefMap.cjs']:
        path = os.path.join(js_dir, f)
        if not os.path.exists(path):
            with open(path, 'w') as out:
                out.write('module.exports = {};\n')

    with open(playbook_path, 'w') as f:
        yaml.dump(playbook, f, default_flow_style=False)

    # Handle image optimization
    if args.optimize.lower() == 'true':
        print("Optimizing images...")
        # Only optimize images in included modules to save time
        included_dirs = ['.']
        for name, included in modules.items():
            if included:
                if os.path.exists(name):
                    included_dirs.append(name)

        for target_dir in included_dirs:
            print(f"Scanning {target_dir} for images...")
            for root, dirs, files in os.walk(target_dir):
                if 'node_modules' in dirs:
                    dirs.remove('node_modules')
                if '.git' in dirs:
                    dirs.remove('.git')
                if 'build' in dirs:
                    dirs.remove('build')

                for f in files:
                    if f.lower().endswith('.png'):
                        path = os.path.join(root, f)
                        subprocess.run(['optipng', '-o2', path])
                    elif f.lower().endswith(('.jpg', '.jpeg')):
                        path = os.path.join(root, f)
                        subprocess.run(['jpegoptim', '--strip-all', '-m80', path])

if __name__ == '__main__':
    main()
