# Copyright 2023-2024 The Khronos Group Inc.
# SPDX-License-Identifier: Apache-2.0

# Makefile for Vulkan Documentation Project
# This exists because we cannot just run the Antora playbook on the
# repository sources, since we are not yet using Antora Collector to do
# all the preprocessing on the repositories required to make their
# contents compatible with Antora.

# The Antora UI and components each exist in separate git repositories.
# They must be present as subdirectories, but are *not* git submodules.
# They could be separate repository clones, or links elsewhere.

# Targets:
# 'init' - updates whatever the current branch is in each repository,
#   then installs npm dependencies.
#   This need only be done when switching branches.
#   This Makefile itself does no branch selection.
# 'build-ui' - builds the Antora UI package.
# 'prep-sources' - prepare each repository's files for Antora.
# This has four subtargets for the separate repos:
#   'prep-docs' - Vulkan-Docs (specification and feature description
#	components
#   'prep-guide' - Vulkan Guide
#   'prep-samples' - Vulkan Samples
#   'prep-tutorials' - Vulkan Tutorials
# 'build-site' - builds the Antora site after prep-sources.
# 'clean' - cleans the Antora site

# UI and component repositories which must exist as subdirectories to build
REPONAMES = antora-ui-khronos Vulkan-Guide Vulkan-Samples Vulkan-Tutorial Vulkan-Docs

# Directories (mostly repos) with their own npm infrastructure
DIRSWITHNODE = antora-ui-khronos docs-site Vulkan-Docs

# Initialize subdirectory repositories and modules
# There are no longer any modules
init: subrepos
	for repo in $(REPONAMES) ; do \
	    (echo Pulling repo $$repo: && cd $$repo && git pull) ; \
	done
	# Install various node modules
	# Don't clean the cache (see 'npm cache clean' output for more)
	# npm cache clean --force
	for dir in $(DIRSWITHNODE) ; do \
	    (echo Installing node modules in $$dir: && cd $$dir && npm install) ; \
	done

subrepos: $(REPONAMES)
	for repo in $(REPONAMES) ; do \
	    echo Cloning $$repo && \
	    test -d $$repo || git clone git@github.com:KhronosGroup/$$repo.git ; \
	done

# Build UI bundle
build-ui:
	cd antora-ui-khronos && \
	    npx update-browserslist-db@latest && \
	    ./node_modules/gulp/bin/gulp.js --version && \
	    ./node_modules/gulp/bin/gulp.js bundle
	# Creates antora-ui-khronos/build/ui-bundle.zip
	cp antora-ui-khronos/build/ui-bundle.zip docs-site

# Prepare component antora sources
prep-sources: prep-docs prep-guide prep-samples prep-tutorial

# Prepare Vulkan-Docs
GENPATH = Vulkan-Docs/antora/spec/modules/ROOT/partials/gen
prep-docs:
	(cd Vulkan-Docs && ./makeSpec -clean -spec all setup_antora)
	cp $(GENPATH)/apimap.cjs \
	   $(GENPATH)/pageMap.cjs \
	   $(GENPATH)/xrefMap.cjs \
	   docs-site/js/

prep-guide:
	make -C Vulkan-Guide -f antora/Makefile clean setup

prep-samples:
	cd Vulkan-Samples && cmake -H"." -B"build/unix" -DVKB_GENERATE_ANTORA_SITE=ON

prep-tutorial:
	make -C Vulkan-Tutorial/antora setup_tutorial

# Build Antora site
# CI is needed as an environment variable which helps cause suppression
# of the "Edit this Page" link otherwise generated.
export CI = true
build-site:
	cd docs-site && npx antora antora-playbook.yml --stacktrace

# Clean Antora site (but not prepared component sources)
clean:
	rm -rf docs-site/build

