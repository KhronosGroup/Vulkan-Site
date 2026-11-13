# VK_EXT_shader_float8(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_float8.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_float8](#VK_EXT_shader_float8)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_float8 - device extension

**Name String**

`VK_EXT_shader_float8`

**Extension Type**

Device extension

**Registered Extension Number**

568

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
[SPV_EXT_float8](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_float8.html)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_float8] @kpet%0A*Here describe the issue or question you have about the VK_EXT_shader_float8 extension*)

**Extension Proposal**

[VK_EXT_shader_float8](../../../../features/latest/features/proposals/VK_EXT_shader_float8.html)

**Last Modified Date**

2025-04-16

**IP Status**

No known IP claims.

**Contributors**

* 
Kévin Petit, Arm Ltd.

* 
Stu Smith, AMD

* 
Jeff Bolz, NVIDIA

* 
Craig Graham, Samsung

This extension enables support for 8-bit floating-point data types as
defined in SPV_EXT_float8.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderFloat8FeaturesEXT](VkPhysicalDeviceShaderFloat8FeaturesEXT.html)

* 
`VK_EXT_SHADER_FLOAT8_EXTENSION_NAME`

* 
`VK_EXT_SHADER_FLOAT8_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT8_FEATURES_EXT](VkStructureType.html)

If [VK_KHR_cooperative_matrix](VK_KHR_cooperative_matrix.html) is supported:

* 
Extending [VkComponentTypeKHR](VkComponentTypeKHR.html):

[VK_COMPONENT_TYPE_FLOAT8_E4M3_EXT](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_FLOAT8_E5M2_EXT](VkComponentTypeKHR.html)

* 
[Float8EXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-Float8EXT)

* 
[Float8CooperativeMatrixEXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-Float8CooperativeMatrixEXT)

1) Resolve interactions with the changes VK_KHR_shader_float16 makes to
rules for denorm flushing (always allowed by default for all FP formats).
How to describe the requirement to preserve subnormals?

+
**RESOLVED**: Subnormals are always preserved when converting FP8 values to
IEEE 754 binary 16.
In all other cases, subnormals may be flushed to zero.

+

* 
Revision 1, 2025-04-16 (Kévin Petit)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_float8).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
