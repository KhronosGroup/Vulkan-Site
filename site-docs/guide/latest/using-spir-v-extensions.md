# Using SPIR-V Extensions

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/spirv_extensions.html

## Table of Contents

- [SPIR-V Extension Example](#_spir_v_extension_example)
- [SPIR-V_Extension_Example](#_spir_v_extension_example)
- [Steps for using SPIR-V features:](#steps-for-using-spriv-features)
- [Steps_for_using_SPIR-V_features:](#steps-for-using-spriv-features)
- [Check if SPIR-V feature is supported](#_check_if_spir_v_feature_is_supported)
- [Check_if_SPIR-V_feature_is_supported](#_check_if_spir_v_feature_is_supported)
- [Check for support then enable if needed](#_check_for_support_then_enable_if_needed)
- [Check_for_support_then_enable_if_needed](#_check_for_support_then_enable_if_needed)
- [Using high level shading language extensions](#_using_high_level_shading_language_extensions)
- [Using_high_level_shading_language_extensions](#_using_high_level_shading_language_extensions)

## Content

[SPIR-V](what_is_spirv.html) is the shader representation used at `vkCreateShaderModule` time. Just like Vulkan, [SPIR-V also has extensions](https://github.com/KhronosGroup/SPIRV-Guide/blob/master/chapters/extension_overview.md) and a [capabilities system](https://github.com/KhronosGroup/SPIRV-Guide/blob/master/chapters/capabilities.md).

It is important to remember that SPIR-V is an intermediate language and not an API, it relies on an API, such as Vulkan, to expose what features are available to the application at runtime. This chapter aims to explain how Vulkan, as a SPIR-V client API, interacts with the SPIR-V extensions and capabilities.

For this example, the [VK_KHR_8bit_storage](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_8bit_storage.html) and [SPV_KHR_8bit_storage](http://htmlpreview.github.io/?https://github.com/KhronosGroup/SPIRV-Registry/blob/main/extensions/KHR/SPV_KHR_8bit_storage.html) will be used to expose the `UniformAndStorageBuffer8BitAccess` capability. The following is what the SPIR-V disassembled looks like:

OpCapability Shader
OpCapability UniformAndStorageBuffer8BitAccess
OpExtension  "SPV_KHR_8bit_storage"

Make sure the SPIR-V extension and capability are available in Vulkan.

Check if the required Vulkan extension, features or version are supported.

If needed, enable the Vulkan extension and features.

If needed, see if there is a matching extension for the high-level shading language (ex. GLSL or HLSL) being used.

Breaking down each step in more detail:

Depending on the shader feature there might only be a `OpExtension` or `OpCapability` that is needed. For this example, the `UniformAndStorageBuffer8BitAccess` is part of the [SPV_KHR_8bit_storage](http://htmlpreview.github.io/?https://github.com/KhronosGroup/SPIRV-Registry/blob/main/extensions/KHR/SPV_KHR_8bit_storage.html) extension.

To check if the SPIR-V extension is supported take a look at the [Supported SPIR-V Extension Table](https://docs.vulkan.org/spec/latest/appendices/spirvenv.html#spirvenv-extensions) in the Vulkan Spec.

![spirv_extensions_8bit_extension](_images/spirv_extensions_8bit_extension.png)

Also, take a look at the [Supported SPIR-V Capabilities Table](https://docs.vulkan.org/spec/latest/appendices/spirvenv.html#spirvenv-capabilities) in the Vulkan Spec.

![spirv_extensions_8bit_capability](_images/spirv_extensions_8bit_capability.png)

|  | while it says `VkPhysicalDeviceVulkan12Features::uniformAndStorageBuffer8BitAccess` in the table, the `VkPhysicalDevice8BitStorageFeatures::uniformAndStorageBuffer8BitAccess` is an alias can be considered the same here. |
| --- | --- |

Luckily if you forget to check, the Vulkan Validation Layers has an [auto-generated validation](https://github.com/KhronosGroup/Vulkan-ValidationLayers/blob/main/layers/vulkan/generated/spirv_validation_helper.cpp) in place. Both the Validation Layers and the Vulkan Spec table are all based on the [./xml/vk.xml](https://github.com/KhronosGroup/Vulkan-Docs/blob/main/xml/vk.xml) file.

    

    
    

In this example, either `VK_KHR_8bit_storage` or a Vulkan 1.2 device is required.

If using a Vulkan 1.0 or 1.1 device, the `VK_KHR_8bit_storage` extension will need to be [supported and enabled](enabling_extensions.html#enabling-extensions) at device creation time.

Regardless of using the Vulkan extension or version, if required, an app still **must** make sure any matching Vulkan feature needed is [supported and enabled](enabling_features.html#enabling-extensions) at device creation time. Some SPIR-V extensions and capabilities don’t require a Vulkan feature, but this is all listed in the tables in the spec.

For this example, either the `VkPhysicalDeviceVulkan12Features::uniformAndStorageBuffer8BitAccess` or `VkPhysicalDevice8BitStorageFeatures::uniformAndStorageBuffer8BitAccess` feature must be supported and enabled.

For this example, GLSL has a [GL_EXT_shader_16bit_storage](https://github.com/KhronosGroup/GLSL/blob/master/extensions/ext/GL_EXT_shader_16bit_storage.txt) extension that includes the match `GL_EXT_shader_8bit_storage` extension in it.

Tools such as `glslang` and `SPIRV-Tools` will handle to make sure the matching `OpExtension` and `OpCapability` are used.
