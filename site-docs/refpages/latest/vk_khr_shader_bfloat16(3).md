# VK_KHR_shader_bfloat16(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_bfloat16.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_bfloat16](#VK_KHR_shader_bfloat16)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_shader_bfloat16 - device extension

**Name String**

`VK_KHR_shader_bfloat16`

**Extension Type**

Device extension

**Registered Extension Number**

142

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_KHR_cooperative_matrix

**SPIR-V Dependencies**

* 
[SPV_KHR_bfloat16](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_bfloat16.html)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_bfloat16] @tobski%0A*Here describe the issue or question you have about the VK_KHR_shader_bfloat16 extension*)

**Extension Proposal**

[VK_KHR_shader_bfloat16](../../../../features/latest/features/proposals/VK_KHR_shader_bfloat16.html)

**Last Modified Date**

2024-04-09

**IP Status**

No known IP claims.

**Contributors**

* 
Tobias Hector, AMD

* 
Stu Smith, AMD

* 
Jeff Bolz, Nvidia

* 
Kévin Petit, Arm

* 
David Neto, Google

* 
Graeme Leese, Broadcom

* 
Ruihao Zhang, Qualcomm

* 
Mark Sheppard, Imagination

* 
Ben Ashbaugh, Intel

* 
Dmitry Sidorov, Intel

* 
Victor Mustya, Intel

This extension enables support for bfloat16 (“brain float”) operations in
shaders as defined in `SPV_KHR_bfloat16`.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderBfloat16FeaturesKHR](VkPhysicalDeviceShaderBfloat16FeaturesKHR.html)

* 
`VK_KHR_SHADER_BFLOAT16_EXTENSION_NAME`

* 
`VK_KHR_SHADER_BFLOAT16_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_BFLOAT16_FEATURES_KHR](VkStructureType.html)

If [VK_KHR_cooperative_matrix](VK_KHR_cooperative_matrix.html) is supported:

* 
Extending [VkComponentTypeKHR](VkComponentTypeKHR.html):

[VK_COMPONENT_TYPE_BFLOAT16_KHR](VkComponentTypeKHR.html)

* 
[BFloat16TypeKHR](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-BFloat16TypeKHR)

* 
[BFloat16DotProductKHR](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-BFloat16DotProductKHR)

* 
[BFloat16CooperativeMatrixKHR](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-BFloat16CooperativeMatrixKHR)

* 
Revision 1, 2024-04-09 (Stu Smith)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_bfloat16).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
