# Tooling: CI/CD for Vulkan Projects

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Tooling/02_cicd.html

## Table of Contents

- [Continuous Integration and Deployment for Vulkan](#_continuous_integration_and_deployment_for_vulkan)
- [Continuous_Integration_and_Deployment_for_Vulkan](#_continuous_integration_and_deployment_for_vulkan)
- [Setting Up a CI/CD Pipeline](#_setting_up_a_cicd_pipeline)
- [Setting_Up_a_CI/CD_Pipeline](#_setting_up_a_cicd_pipeline)
- [Basic Pipeline Structure](#_basic_pipeline_structure)
- [Basic_Pipeline_Structure](#_basic_pipeline_structure)
- [Vulkan-Specific Considerations](#_vulkan_specific_considerations)
- [Vulkan SDK Installation](#_vulkan_sdk_installation)
- [Vulkan_SDK_Installation](#_vulkan_sdk_installation)
- [GPU Availability in CI Environments](#_gpu_availability_in_ci_environments)
- [GPU_Availability_in_CI_Environments](#_gpu_availability_in_ci_environments)
- [Platform-Specific Vulkan Loaders](#_platform_specific_vulkan_loaders)
- [Platform-Specific_Vulkan_Loaders](#_platform_specific_vulkan_loaders)
- [Shader Compilation](#_shader_compilation)
- [Automating Testing for Vulkan Applications](#_automating_testing_for_vulkan_applications)
- [Automating_Testing_for_Vulkan_Applications](#_automating_testing_for_vulkan_applications)
- [Unit Testing Vulkan Code](#_unit_testing_vulkan_code)
- [Unit_Testing_Vulkan_Code](#_unit_testing_vulkan_code)
- [Integration Testing](#_integration_testing)
- [Distribution Considerations](#_distribution_considerations)
- [Packaging Vulkan Applications](#_packaging_vulkan_applications)
- [Packaging_Vulkan_Applications](#_packaging_vulkan_applications)
- [Handling Vulkan Dependencies](#_handling_vulkan_dependencies)
- [Handling_Vulkan_Dependencies](#_handling_vulkan_dependencies)
- [Versioning and Updates](#_versioning_and_updates)
- [Versioning_and_Updates](#_versioning_and_updates)
- [Conclusion](#_conclusion)

## Content

Continuous Integration (CI) and Continuous Deployment (CD) are essential practices in modern software development. They help ensure code quality, catch issues early, and streamline the release process. For Vulkan applications, which often need to run on multiple platforms with different GPU architectures, a robust CI/CD pipeline is particularly valuable.

Let’s explore how to set up a CI/CD pipeline specifically tailored for Vulkan projects. We’ll use GitHub Actions as our example platform, but the concepts apply to other CI/CD systems like GitLab CI, Jenkins, or Azure DevOps.

A typical CI/CD pipeline for a Vulkan project might include these stages:

**Build**: Compile the application on multiple platforms (Windows, Linux, macOS)

**Test**: Run unit tests and integration tests

**Package**: Create distributable packages for each platform

**Deploy**: Deploy to a staging environment or release to users

Here’s a basic GitHub Actions workflow file for a Vulkan project:

name: Vulkan CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        build_type: [Debug, Release]

    steps:
    - uses: actions/checkout@v3
      with:
        submodules: recursive

    - name: Install Vulkan SDK
      uses: humbletim/install-vulkan-sdk@v1.1.1
      with:
        version: latest
        cache: true

    - name: Configure CMake
      run: cmake -B ${{github.workspace}}/build -DCMAKE_BUILD_TYPE=${{matrix.build_type}}

    - name: Build
      run: cmake --build ${{github.workspace}}/build --config ${{matrix.build_type}}

    - name: Test
      working-directory: ${{github.workspace}}/build
      run: ctest -C ${{matrix.build_type}}

    - name: Package
      if: matrix.build_type == 'Release'
      run: |
        # Platform-specific packaging commands
        if [ "${{ matrix.os }}" == "ubuntu-latest" ]; then
          # Linux packaging (e.g., .deb or .AppImage)
          echo "Packaging for Linux"
        elif [ "${{ matrix.os }}" == "windows-latest" ]; then
          # Windows packaging (e.g., .exe installer)
          echo "Packaging for Windows"
        elif [ "${{ matrix.os }}" == "macos-latest" ]; then
          # macOS packaging (e.g., .app bundle or .dmg)
          echo "Packaging for macOS"
        fi

When setting up CI/CD for Vulkan projects, consider these specific challenges:

Ensure your CI environment has the Vulkan SDK installed. Many CI platforms don’t include it by default. In the example above, we used a GitHub Action to install the SDK.

Most CI environments don’t have GPUs available, which can make testing Vulkan applications challenging. Consider these approaches:

* 
Use software rendering (e.g., SwiftShader) for basic tests

* 
Implement a headless testing mode that doesn’t require a display

* 
Use cloud-based GPU instances for more comprehensive testing

Different platforms handle Vulkan loading differently. Ensure your build system correctly handles these differences:

* 
Windows: Vulkan-1.dll is typically loaded at runtime

* 
Linux: libvulkan.so.1 is loaded at runtime

* 
macOS: MoltenVK provides Vulkan support via Metal

Shader compilation can be a complex part of the build process. Consider these approaches:

* 
Pre-compile shaders during the build phase

* 
Include shader compilation in your CI pipeline to catch GLSL/SPIR-V errors early

* 
Use a shader management system that handles cross-platform differences

Testing Vulkan applications presents unique challenges. Here are some approaches to consider:

import std;
import vulkan_raii;

// A testable function using vk::raii
bool create_pipeline(vk::raii::Device& device,
                     vk::raii::RenderPass& render_pass,
                     vk::raii::PipelineLayout& layout,
                     vk::raii::Pipeline& out_pipeline) {
    try {
        // Pipeline creation code using RAII
        return true;
    } catch (vk::SystemError& err) {
        std::cerr 

For integration testing, consider creating a headless rendering mode that can run in CI environments:

import std;
import vulkan_raii;

class HeadlessRenderer {
public:
    HeadlessRenderer() {
        // Initialize Vulkan without surface
        init_vulkan();
    }

    bool render_frame() {
        // Render to an image without presenting
        try {
            // Rendering code
            return true;
        } catch (vk::SystemError& err) {
            std::cerr 

Once your application passes all tests, the final stage is packaging and distribution. Here are some considerations:

* 
Include the appropriate Vulkan loader for each platform

* 
Package shader files or pre-compiled SPIR-V

* 
Consider using platform-specific packaging tools:

Windows: NSIS, WiX, or MSIX

* 
Linux: AppImage, Flatpak, or .deb/.rpm packages

* 
macOS: DMG or App Store packages

Ensure your package includes or correctly handles all dependencies:

* 
Vulkan loader (or instructions to install it)

* 
Any required Vulkan extensions

* 
GPU driver requirements

Implement a versioning system that includes:

* 
Application version

* 
Minimum required Vulkan version

* 
Required extensions and their versions

A well-designed CI/CD pipeline is essential for maintaining quality and productivity when developing Vulkan applications. By automating building, testing, and packaging, you can focus more on developing features and less on manual processes.

In the next section, we’ll explore debugging tools for Vulkan applications, including the powerful VK_KHR_debug_utils extension and external tools like RenderDoc.

[Previous: Introduction](01_introduction.html) | [Next: Debugging with VK_KHR_debug_utils and RenderDoc](03_debugging_and_renderdoc.html)
