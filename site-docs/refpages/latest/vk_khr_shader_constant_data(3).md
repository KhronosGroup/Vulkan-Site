# VK_KHR_shader_constant_data(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_constant_data.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_constant_data](#VK_KHR_shader_constant_data)
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

VK_KHR_shader_constant_data - device extension

**Name String**

`VK_KHR_shader_constant_data`

**Extension Type**

Device extension

**Registered Extension Number**

232

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_KHR_constant_data](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_constant_data.html)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_constant_data] @tobski%0A*Here describe the issue or question you have about the VK_KHR_shader_constant_data extension*)

**Extension Proposal**

[VK_KHR_shader_constant_data](../../../../features/latest/features/proposals/VK_KHR_shader_constant_data.html)

**Last Modified Date**

2026-03-18

**IP Status**

No known IP claims.

**Contributors**

* 
Tobias Hector, AMD

* 
Piers Daniell, Nvidia

* 
Craig Graham, Samsung

* 
Vikram Tarikere, IMG

This extension allows the use of the
[`SPV_KHR_constant_data`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_constant_data.html) extension in
SPIR-V shader modules which enables the specification and specialization of
arrays of constant data.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderConstantDataFeaturesKHR](VkPhysicalDeviceShaderConstantDataFeaturesKHR.html)

* 
`VK_KHR_SHADER_CONSTANT_DATA_EXTENSION_NAME`

* 
`VK_KHR_SHADER_CONSTANT_DATA_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CONSTANT_DATA_FEATURES_KHR](VkStructureType.html)

* 
[ConstantDataKHR](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ConstantDataKHR)

* 
Revision 1, 2024-10-30 (Tobias Hector)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_constant_data).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
