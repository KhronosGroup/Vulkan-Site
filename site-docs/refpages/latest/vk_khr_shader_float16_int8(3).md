# VK_KHR_shader_float16_int8(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_float16_int8.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_float16_int8](#VK_KHR_shader_float16_int8)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_shader_float16_int8 - device extension

**Name String**

`VK_KHR_shader_float16_int8`

**Extension Type**

Device extension

**Registered Extension Number**

83

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Alexander Galazin [alegal-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_float16_int8] @alegal-arm%0A*Here describe the issue or question you have about the VK_KHR_shader_float16_int8 extension*)

**Last Modified Date**

2018-03-07

**Interactions and External Dependencies**

* 
This extension interacts with `[VK_KHR_8bit_storage](VK_KHR_8bit_storage.html)`

* 
This extension interacts with `[VK_KHR_16bit_storage](VK_KHR_16bit_storage.html)`

* 
This extension interacts with `[VK_KHR_shader_float_controls](VK_KHR_shader_float_controls.html)`

* 
This extension provides API support for
[`GL_EXT_shader_explicit_arithmetic_types`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GL_EXT_shader_explicit_arithmetic_types.txt)

**IP Status**

No known IP claims.

**Contributors**

* 
Alexander Galazin, Arm

* 
Jan-Harald Fredriksen, Arm

* 
Jeff Bolz, NVIDIA

* 
Graeme Leese, Broadcom

* 
Daniel Rakos, AMD

The `VK_KHR_shader_float16_int8` extension allows use of 16-bit
floating-point types and 8-bit integer types in shaders for arithmetic
operations.

It introduces two new optional features `shaderFloat16` and
`shaderInt8` which directly map to the `Float16` and the `Int8`
SPIR-V capabilities.
The `VK_KHR_shader_float16_int8` extension also specifies precision
requirements for half-precision floating-point SPIR-V operations.
This extension does not enable use of 8-bit integer types or 16-bit
floating-point types in any [shader input and output interfaces](../../../../spec/latest/chapters/interfaces.html#interfaces-iointerfaces) and therefore does not supersede the
`[VK_KHR_8bit_storage](VK_KHR_8bit_storage.html)` or `[VK_KHR_16bit_storage](VK_KHR_16bit_storage.html)` extensions.

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
However, if Vulkan 1.2 is supported and this extension is not, both the
`shaderFloat16` and `shaderInt8` capabilities are optional.
The original type, enum, and command names are still available as aliases of
the core functionality.

If Vulkan 1.4 is supported, support for the `shaderInt8` capability is
required.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFloat16Int8FeaturesKHR](VkPhysicalDeviceShaderFloat16Int8Features.html)

* 
[VkPhysicalDeviceShaderFloat16Int8FeaturesKHR](VkPhysicalDeviceShaderFloat16Int8Features.html)

* 
`VK_KHR_SHADER_FLOAT16_INT8_EXTENSION_NAME`

* 
`VK_KHR_SHADER_FLOAT16_INT8_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FLOAT16_INT8_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT16_INT8_FEATURES_KHR](VkStructureType.html)

* 
Revision 1, 2018-03-07 (Alexander Galazin)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_float16_int8).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
