# Tooling: Packaging and Distribution

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Tooling/06_packaging_and_distribution.html

## Table of Contents

- [Packaging and Distributing Vulkan Applications](#_packaging_and_distributing_vulkan_applications)
- [Packaging_and_Distributing_Vulkan_Applications](#_packaging_and_distributing_vulkan_applications)
- [Platform-Specific Packaging Considerations](#_platform_specific_packaging_considerations)
- [Platform-Specific_Packaging_Considerations](#_platform_specific_packaging_considerations)
- [Windows Packaging](#_windows_packaging)
- [Linux Packaging](#_linux_packaging)
- [macOS Packaging](#_macos_packaging)
- [Handling Vulkan Dependencies](#_handling_vulkan_dependencies)
- [Handling_Vulkan_Dependencies](#_handling_vulkan_dependencies)
- [Vulkan Loader](#_vulkan_loader)
- [Vulkan Layers and Extensions](#_vulkan_layers_and_extensions)
- [Vulkan_Layers_and_Extensions](#_vulkan_layers_and_extensions)
- [Shader Management](#_shader_management)
- [Automated Packaging with CI/CD](#_automated_packaging_with_cicd)
- [Automated_Packaging_with_CI/CD](#_automated_packaging_with_cicd)
- [Conclusion](#_conclusion)

## Content

After developing and testing your Vulkan application, the final step is to package and distribute it to users. This process involves preparing your application for different platforms, handling dependencies, and creating installers or packages that provide a smooth installation experience. In this section, we’ll explore the key considerations and techniques for packaging and distributing Vulkan applications.

Each platform has its own packaging formats and distribution mechanisms. Let’s explore the considerations for the major platforms:

On Windows, common packaging formats include:

* 
**Executable Installers**: Created with tools like NSIS (Nullsoft Scriptable Install System), Inno Setup, or WiX Toolset

* 
**MSIX Packages**: Modern Windows app packages that support clean installation and uninstallation

* 
**Portable Applications**: Self-contained applications that don’t require installation

Here’s an example of creating a basic NSIS installer script for a Vulkan application:

; Basic NSIS installer script for a Vulkan application

!include "MUI2.nsh"

Name "My Vulkan Application"
OutFile "MyVulkanApp_Installer.exe"
InstallDir "$PROGRAMFILES\MyVulkanApp"

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"

Section "Install"
  SetOutPath "$INSTDIR"

  ; Application files
  File "MyVulkanApp.exe"
  File "*.dll"
  File /r "shaders"
  File /r "assets"

  ; Vulkan Runtime
  File "vulkan-1.dll"

  ; Create uninstaller
  WriteUninstaller "$INSTDIR\Uninstall.exe"

  ; Create shortcuts
  CreateDirectory "$SMPROGRAMS\MyVulkanApp"
  CreateShortcut "$SMPROGRAMS\MyVulkanApp\MyVulkanApp.lnk" "$INSTDIR\MyVulkanApp.exe"
  CreateShortcut "$SMPROGRAMS\MyVulkanApp\Uninstall.lnk" "$INSTDIR\Uninstall.exe"
SectionEnd

Section "Uninstall"
  ; Remove application files
  Delete "$INSTDIR\MyVulkanApp.exe"
  Delete "$INSTDIR\*.dll"
  RMDir /r "$INSTDIR\shaders"
  RMDir /r "$INSTDIR\assets"

  ; Remove uninstaller
  Delete "$INSTDIR\Uninstall.exe"

  ; Remove shortcuts
  Delete "$SMPROGRAMS\MyVulkanApp\MyVulkanApp.lnk"
  Delete "$SMPROGRAMS\MyVulkanApp\Uninstall.lnk"
  RMDir "$SMPROGRAMS\MyVulkanApp"

  ; Remove install directory
  RMDir "$INSTDIR"
SectionEnd

On Linux, common packaging formats include:

* 
**DEB Packages**: For Debian-based distributions (Ubuntu, Debian, etc.)

* 
**RPM Packages**: For Red Hat-based distributions (Fedora, CentOS, etc.)

* 
**AppImage**: Self-contained applications that run on most Linux distributions

* 
**Flatpak**: Sandboxed applications with controlled access to system resources

* 
**Snap**: Universal Linux packages maintained by Canonical

Here’s an example of creating a basic AppImage for a Vulkan application:

#!/bin/bash
# Script to create an AppImage for a Vulkan application

# Create AppDir structure
mkdir -p AppDir/usr/bin
mkdir -p AppDir/usr/lib
mkdir -p AppDir/usr/share/applications
mkdir -p AppDir/usr/share/icons/hicolor/256x256/apps
mkdir -p AppDir/usr/share/metainfo

# Copy application binary
cp build/MyVulkanApp AppDir/usr/bin/

# Copy dependencies (excluding system libraries)
ldd build/MyVulkanApp | grep "=> /" | awk '{print $3}' | xargs -I{} cp -v {} AppDir/usr/lib/

# Copy Vulkan loader
cp /usr/lib/libvulkan.so.1 AppDir/usr/lib/

# Copy application data
cp -r assets AppDir/usr/share/MyVulkanApp/assets
cp -r shaders AppDir/usr/share/MyVulkanApp/shaders

# Create desktop file
cat > AppDir/usr/share/applications/MyVulkanApp.desktop  AppDir/usr/share/metainfo/MyVulkanApp.appdata.xml 

  com.example.MyVulkanApp
  My Vulkan Application
  A Vulkan-powered application
  
    
      My Vulkan Application is a high-performance graphics application
      built with the Vulkan API.
    

  
  https://example.com/MyVulkanApp
  
    
  

EOF

# Create AppRun script
cat > AppDir/AppRun 

On macOS, common packaging formats include:

* 
**Application Bundles (.app)**: The standard format for macOS applications

* 
**Disk Images (.dmg)**: Mountable disk images containing the application

* 
**Packages (.pkg)**: Installer packages for more complex installations

Here’s an example of creating a basic macOS application bundle structure for a Vulkan application using MoltenVK:

#!/bin/bash
# Script to create a macOS application bundle for a Vulkan application

# Create bundle structure
mkdir -p MyVulkanApp.app/Contents/MacOS
mkdir -p MyVulkanApp.app/Contents/Resources
mkdir -p MyVulkanApp.app/Contents/Frameworks

# Copy application binary
cp build/MyVulkanApp MyVulkanApp.app/Contents/MacOS/

# Copy MoltenVK framework
cp -R $VULKAN_SDK/macOS/Frameworks/MoltenVK.framework MyVulkanApp.app/Contents/Frameworks/

# Copy application resources
cp -r assets MyVulkanApp.app/Contents/Resources/assets
cp -r shaders MyVulkanApp.app/Contents/Resources/shaders
cp icon.icns MyVulkanApp.app/Contents/Resources/

# Create Info.plist
cat > MyVulkanApp.app/Contents/Info.plist 

    CFBundleExecutable
    MyVulkanApp
    CFBundleIconFile
    icon.icns
    CFBundleIdentifier
    com.example.MyVulkanApp
    CFBundleInfoDictionaryVersion
    6.0
    CFBundleName
    My Vulkan Application
    CFBundlePackageType
    APPL
    CFBundleShortVersionString
    1.0.0
    CFBundleVersion
    1
    NSHighResolutionCapable
    

EOF

# Create DMG (optional)
hdiutil create -volname "My Vulkan Application" -srcfolder MyVulkanApp.app -ov -format UDZO MyVulkanApp.dmg

One of the key considerations when packaging Vulkan applications is handling the Vulkan loader and any required extensions.

The Vulkan loader is the component that connects your application to the Vulkan implementation on the user’s system. There are different approaches to handling the loader:

**Rely on System-Installed Loader**: Require users to have the Vulkan SDK or drivers installed

**Bundle the Loader**: Include the Vulkan loader with your application

**Hybrid Approach**: Check for a system-installed loader and fall back to a bundled one if not found

Here’s an example of a hybrid approach:

import std;
import vulkan_raii;

class VulkanLoader {
public:
    static bool initialize() {
        try {
            // First, try to use the system-installed Vulkan loader
            if (try_system_loader()) {
                std::cout  0) ? count : 0);
        return exe_path.substr(0, exe_path.find_last_of("/"));
        #elif defined(__APPLE__)
        char path[PATH_MAX];
        uint32_t size = sizeof(path);
        if (_NSGetExecutablePath(path, &size) == 0) {
            std::string exe_path(path);
            return exe_path.substr(0, exe_path.find_last_of("/"));
        }
        return "";
        #endif
    }
};

If your application requires specific Vulkan layers or extensions, you need to handle them appropriately:

**Document Requirements**: Clearly document which extensions your application requires

**Check for Support**: Always check if required extensions are available before using them

**Provide Fallbacks**: Implement fallback behavior for missing extensions when possible

**Bundle Layers**: For development tools, consider bundling validation layers

Shaders are a critical part of Vulkan applications, and they need special consideration during packaging:

**Pre-Compile Shaders**: Package pre-compiled SPIR-V shaders rather than GLSL source

**Shader Versioning**: Implement a versioning system for shaders to handle updates

**Shader Optimization**: Consider optimizing shaders for different hardware targets

**Shader Caching**: Implement a shader cache to improve load times

Here’s an example of a shader management system for a packaged application:

import std;
import vulkan_raii;

class ShaderManager {
public:
    ShaderManager(vk::raii::Device& device) : device(device) {
        // Determine the shader directory based on the application's location
        shader_dir = get_application_directory() + "/shaders";

        // Create a shader module cache
        shader_cache.reserve(100); // Reserve space for up to 100 shader modules
    }

    vk::raii::ShaderModule load_shader(const std::string& name) {
        // Check if the shader is already in the cache
        auto it = shader_cache.find(name);
        if (it != shader_cache.end()) {
            return vk::raii::ShaderModule(nullptr, nullptr, nullptr); // Return a copy of the cached module
        }

        // Load the shader from the package
        std::string path = shader_dir + "/" + name + ".spv";
        std::vector code = read_file(path);

        // Create the shader module
        vk::ShaderModuleCreateInfo create_info{};
        create_info.setCodeSize(code.size());
        create_info.setPCode(reinterpret_cast(code.data()));

        // Create and cache the shader module
        vk::raii::ShaderModule module(device, create_info);
        shader_cache[name] = std::move(module);

        return vk::raii::ShaderModule(nullptr, nullptr, nullptr); // Return a copy of the cached module
    }

    void clear_cache() {
        shader_cache.clear();
    }

private:
    std::string get_application_directory() {
        // Platform-specific code to get the application directory
        // ...
        return "."; // Placeholder
    }

    std::vector read_file(const std::string& path) {
        std::ifstream file(path, std::ios::ate | std::ios::binary);
        if (!file.is_open()) {
            throw std::runtime_error("Failed to open shader file: " + path);
        }

        size_t file_size = static_cast(file.tellg());
        std::vector buffer(file_size);

        file.seekg(0);
        file.read(buffer.data(), file_size);
        file.close();

        return buffer;
    }

    vk::raii::Device& device;
    std::string shader_dir;
    std::unordered_map shader_cache;
};

As we discussed in the CI/CD section, automating the packaging process can save time and reduce errors. Here’s how to integrate packaging into your CI/CD pipeline:

**Build Matrix**: Set up a build matrix for different platforms and configurations

**Packaging Scripts**: Create scripts for each platform’s packaging process

**Version Management**: Automatically increment version numbers based on git tags or other criteria

**Artifact Storage**: Store packaged applications as build artifacts

**Release Automation**: Automate the release process to distribution platforms

Here’s an example of a GitHub Actions workflow that includes packaging:

name: Build and Package

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-package:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        include:
          - os: ubuntu-latest
            package-script: ./scripts/package_linux.sh
            artifact-name: MyVulkanApp-Linux
            artifact-path: MyVulkanApp-x86_64.AppImage
          - os: windows-latest
            package-script: .\scripts\package_windows.bat
            artifact-name: MyVulkanApp-Windows
            artifact-path: MyVulkanApp_Installer.exe
          - os: macos-latest
            package-script: ./scripts/package_macos.sh
            artifact-name: MyVulkanApp-macOS
            artifact-path: MyVulkanApp.dmg

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
      run: cmake -B ${{github.workspace}}/build -DCMAKE_BUILD_TYPE=Release

    - name: Build
      run: cmake --build ${{github.workspace}}/build --config Release

    - name: Package
      run: ${{ matrix.package-script }}

    - name: Upload Package
      uses: actions/upload-artifact@v3
      with:
        name: ${{ matrix.artifact-name }}
        path: ${{ matrix.artifact-path }}

  create-release:
    needs: build-and-package
    runs-on: ubuntu-latest
    steps:
    - name: Download all artifacts
      uses: actions/download-artifact@v3

    - name: Create Release
      uses: softprops/action-gh-release@v1
      with:
        files: |
          MyVulkanApp-Linux/MyVulkanApp-x86_64.AppImage
          MyVulkanApp-Windows/MyVulkanApp_Installer.exe
          MyVulkanApp-macOS/MyVulkanApp.dmg

Packaging and distribution are critical steps in the lifecycle of a Vulkan application. By carefully considering platform-specific requirements, handling dependencies appropriately, and automating the packaging process, you can ensure a smooth experience for your users across different platforms.

Remember that the goal of packaging is to make installation and updates as seamless as possible for your users. Invest time in creating a robust packaging and distribution system, and your users will benefit from a more professional and reliable application.

In the next and final section, we’ll summarize what we’ve learned throughout this chapter on tooling for Vulkan applications.

[Previous: Vulkan Extensions for Robustness](05_extensions.html) | [Next: Conclusion](07_conclusion.html)
