# Copyright 20206 Holochip Inc.
# SPDX-License-Identifier: Apache-2.0

import yaml
import os
import sys
import argparse
import subprocess

def main():
    parser = argparse.ArgumentParser(description='Prepare Antora playbook and optimize assets.')
    parser.add_argument('--guide', type=str, default='true')
    parser.add_argument('--glsl', type=str, default='true')
    parser.add_argument('--docs', type=str, default='true')
    parser.add_argument('--samples', type=str, default='true')
    parser.add_argument('--tutorial', type=str, default='true')
    parser.add_argument('--attachments', type=str, default='true')
    parser.add_argument('--optimize', type=str, default='false')

    args = parser.parse_args()

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

    # Handle attachments
    if args.attachments.lower() == 'false':
        # Remove attachments directory if tutorial is included
        attachments_dir = 'Vulkan-Tutorial/antora/modules/ROOT/attachments'
        if os.path.exists(attachments_dir):
            print(f"Removing attachments: {attachments_dir}")
            subprocess.run(['rm', '-rf', attachments_dir])
    elif args.attachments.lower() == 'true':
        # "Cleaning" it - remove known large types to save space
        attachments_dir = 'Vulkan-Tutorial/antora/modules/ROOT/attachments'
        if os.path.exists(attachments_dir):
            print(f"Cleaning attachments: {attachments_dir}")
            # Remove known large directories
            for d in ['venv', 'node_modules', 'third_party', 'cmake-build-debug', 'build', 'lib', 'ort_gpu', 'build_integration_test', 'Assets', 'simple_engine']:
                subprocess.run(['find', attachments_dir, '-type', 'd', '-name', d, '-prune', '-exec', 'rm', '-rf', '{}', '+'])
            # Remove any large files
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
                            '-name', '*.mlir'
                            ')', '-delete'])

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
