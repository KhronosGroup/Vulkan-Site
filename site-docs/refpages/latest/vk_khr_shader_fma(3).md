# VK_KHR_shader_fma(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_fma.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_fma](#VK_KHR_shader_fma)
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

VK_KHR_shader_fma - device extension

**Name String**

`VK_KHR_shader_fma`

**Extension Type**

Device extension

**Registered Extension Number**

580

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
[SPV_KHR_fma](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_fma.html)

**Contact**

* 
Graeme Leese [gnl21](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_fma] @gnl21%0A*Here describe the issue or question you have about the VK_KHR_shader_fma extension*)

**Extension Proposal**

[VK_KHR_shader_fma](../../../../features/latest/features/proposals/VK_KHR_shader_fma.html)

**Last Modified Date**

2025-06-10

**Contributors**

* 
Graeme Leese, Broadcom

This extension allows applications to use the SPV_KHR_fma extension to
obtain correctly-rounded results for fused-multiply add (fma) operations.

Fused-multiply add is a building block of many high-precision numerical
functions.
It provides better accuracy than separate operations, because of the removal
of the intermediate rounding step, and often costs less than the pair of
separate operations.

Vulkan currently exposes an fma primitive that can give the reduced cost,
but it is not guaranteed to be a fused operation, so the accuracy cannot be
relied on.
For applications which require the high accuracy, therefore, the operation
must be emulated or the algorithm changed so as not to require fma.
This is often vastly more costly, even though fma is supported in much of
the underlying hardware.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderFmaFeaturesKHR](VkPhysicalDeviceShaderFmaFeaturesKHR.html)

* 
`VK_KHR_SHADER_FMA_EXTENSION_NAME`

* 
`VK_KHR_SHADER_FMA_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FMA_FEATURES_KHR](VkStructureType.html)

* 
Revision 1, 2025-06-10 (Graeme Leese)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_fma).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
