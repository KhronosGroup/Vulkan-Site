# Utility Scripts

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/scripts/README.html

## Table of Contents

- [Generate](#_generate)
- [Generate Sample](#_generate_sample)
- [Generate API Sample](#_generate_api_sample)
- [Generate_API_Sample](#_generate_api_sample)
- [Generate Android Project](#_generate_android_project)
- [Generate_Android_Project](#_generate_android_project)
- [Clang Format](#_clang_format)
- [Copyright Headers](#_copyright_headers)

## Content

A series of helpers to make life easier.

Helps to generate new files for the project.

All flags are optional.
Setting --name is advised.
If --output-dir is not set, the sample will be generated in the samples directory filed under the specified category.

./scripts/generate.py sample --name  --category  --output-dir 

Running the above line will generate the following files:

samples/category/my_sample/CMakeLists.txt
samples/category/my_sample/sample_name.cpp
samples/category/my_sample/sample_name.h

A new class will also be generated

class SampleName : public VulkanSample {
...
};

API samples can be generated using the following command:

./scripts/generate.py sample_api --name  --category  --output-dir 

Running the above line will generate the following files:

samples/category/my_sample/CMakeLists.txt
samples/category/my_sample/sample_name.cpp
samples/category/my_sample/sample_name.h

A new class will also be generated

class SampleName :public ApiVulkanSample {
...
};

./scripts/generate.py android
./scripts/generate.py android --output-dir build/

When called from the root of the repository, this script will run clang-format on all files in the repository that have been altered in the `git diff`

./scripts/clang-format.py 

When called from the root of the repository, this script will check all files in the repository that have been altered in the `git diff` to ensure they have the correct license header.

./scripts/copyright.py 

This is similar to the copyright CI check except when run with `--fix` this script will update the license headers in all files in the repository that have been altered in the `git diff`.

./scripts/copyright.py  --fix
