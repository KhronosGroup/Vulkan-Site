# Copyright 2023 The Khronos Group Inc.
# SPDX-License-Identifier: Apache-2.0

# Makefile for Vulkan Documentation Project
# This exists because we cannot just run the Antora playbook on the
# repository sources, since we are not yet using Antora Collector to do
# all the preprocessing on the repositories required to make their
# documents compatible with Antora.

# There are two targets:
#
# prepare_components (prepare_guide, prepare_spec) - preprocess the
# local clones and copy required JavaScript files used by custom
# extensions into the playbook repository. This takes a relatively long
# time and is broken out as a separate step. It should be done whenever
# the branch content is updated.
#
# build_site - run the Antora playbook and generate the site.
# Requires prepare_components to have run.

# GUIDEREPO and SPECREPO contain absolute paths to local clones of the
# Vulkan-Guide and Vulkan-Docs repositories, respectively.
# They must match the paths hardwired into antora-playbook.yml.

GUIDEREPO = ../../Vulkan-Guide
SPECREPO = ../../Vulkan-Docs

# GUIDEBRANCH and SPECBRANCH are the branches in those local clones
# from which to build.

#GUIDEBRANCH = antora
#SPECBRANCH = github-main

GUIDEBRANCH = main
SPECBRANCH = main
#SPECBRANCH = tilde-blocks-to-dashes

prepare_components: prepare_guide prepare_spec

prepare_guide:
	cd $(GUIDEREPO) && \
	    git checkout $(GUIDEBRANCH) && \
	    make -f antora/Makefile clean setup

GENPATH = $(SPECREPO)/antora/modules/ROOT/partials/gen
prepare_spec:
	cd $(SPECREPO) && \
	    git checkout $(SPECBRANCH) && \
	    make -f antora/Makefile clean setup
	cp $(GENPATH)/apimap.cjs $(GENPATH)/pageMap.cjs js/
	cp $(SPECREPO)/antora/xrefMap.cjs js/

build_site: clean
	npx antora antora-playbook.yml $(BUILDARGS)

clean:
	rm -rf build
