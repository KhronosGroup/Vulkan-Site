# VK_EXT_shader_image_atomic_int64(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_image_atomic_int64.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_image_atomic_int64](#VK_EXT_shader_image_atomic_int64)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_image_atomic_int64 - device extension

**Name String**

`VK_EXT_shader_image_atomic_int64`

**Extension Type**

Device extension

**Registered Extension Number**

235

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_EXT_shader_image_int64](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_shader_image_int64.html)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_image_atomic_int64] @tobski%0A*Here describe the issue or question you have about the VK_EXT_shader_image_atomic_int64 extension*)

**Last Modified Date**

2020-07-14

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_shader_image_int64`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_shader_image_int64.txt)

**Contributors**

* 
Matthaeus Chajdas, AMD

* 
Graham Wihlidal, Epic Games

* 
Tobias Hector, AMD

* 
Jeff Bolz, Nvidia

* 
Faith Ekstrand, Intel

This extension extends existing 64-bit integer atomic support to enable
these operations on images as well.

When working with large 2- or 3-dimensional data sets (e.g. rasterization or
screen-space effects), image accesses are generally more efficient than
equivalent buffer accesses.
This extension allows applications relying on 64-bit integer atomics in this
manner to quickly improve performance with only relatively minor code
changes.

64-bit integer atomic support is guaranteed for optimally tiled images with
the [VK_FORMAT_R64_UINT](VkFormat.html) and [VK_FORMAT_R64_SINT](VkFormat.html) formats.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT](VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT.html)

* 
`VK_EXT_SHADER_IMAGE_ATOMIC_INT64_EXTENSION_NAME`

* 
`VK_EXT_SHADER_IMAGE_ATOMIC_INT64_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_IMAGE_ATOMIC_INT64_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2020-07-14 (Tobias Hector)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_image_atomic_int64).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
