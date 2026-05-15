# VK_EXT_shader_64bit_indexing(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_64bit_indexing.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_64bit_indexing](#VK_EXT_shader_64bit_indexing)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_64bit_indexing - device extension

**Name String**

`VK_EXT_shader_64bit_indexing`

**Extension Type**

Device extension

**Registered Extension Number**

628

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
[SPV_EXT_shader_64bit_indexing](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_shader_64bit_indexing.html)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_64bit_indexing] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_shader_64bit_indexing extension*)

**Extension Proposal**

[VK_EXT_shader_64bit_indexing](../../../../features/latest/features/proposals/VK_EXT_shader_64bit_indexing.html)

**Last Modified Date**

2025-05-02

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_shader_64bit_indexing`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GL_EXT_shader_64bit_indexing.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension relaxes the maxStorageBufferRange limit, allowing more than
4GB to be accessed through a buffer binding (or through a buffer device
address).
It adds pipeline and shader creation flags that request 64-bit addressing
support, and [defines](../../../../spec/latest/appendices/spirvenv.html#spirvenv-64bindexing) which addressing calculations
use 64 bits of range.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShader64BitIndexingFeaturesEXT](VkPhysicalDeviceShader64BitIndexingFeaturesEXT.html)

* 
`VK_EXT_SHADER_64BIT_INDEXING_EXTENSION_NAME`

* 
`VK_EXT_SHADER_64BIT_INDEXING_SPEC_VERSION`

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](VkPipelineCreateFlagBits2.html)

Extending [VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html):

* 
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_64_BIT_INDEXING_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2025-05-02 (Jeff Bolz)

Initial revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_64bit_indexing).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
