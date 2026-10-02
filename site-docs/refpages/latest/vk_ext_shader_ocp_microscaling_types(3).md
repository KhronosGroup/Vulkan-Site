# VK_EXT_shader_ocp_microscaling_types(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_ocp_microscaling_types.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_ocp_microscaling_types](#VK_EXT_shader_ocp_microscaling_types)
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

VK_EXT_shader_ocp_microscaling_types - device extension

**Name String**

`VK_EXT_shader_ocp_microscaling_types`

**Extension Type**

Device extension

**Registered Extension Number**

673

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
[SPV_EXT_ocp_microscaling_types](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_ocp_microscaling_types.html)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_ocp_microscaling_types] @kpet%0A*Here describe the issue or question you have about the VK_EXT_shader_ocp_microscaling_types extension*)

**Extension Proposal**

[VK_EXT_shader_ocp_microscaling_types](../../../../features/latest/features/proposals/VK_EXT_shader_ocp_microscaling_types.html)

**Last Modified Date**

2026-04-29

**IP Status**

No known IP claims.

**Contributors**

* 
Kévin Petit, Arm Ltd.

* 
Vikram Tarikere, Imagination Technologies

* 
Jeff Bolz, NVIDIA

* 
Craig Graham, Samsung

This extension enables support for the floating-point data types defined in
the Open Compute Project (OCP) Microscaling Formats specification.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT](VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT.html)

* 
`VK_EXT_SHADER_OCP_MICROSCALING_TYPES_EXTENSION_NAME`

* 
`VK_EXT_SHADER_OCP_MICROSCALING_TYPES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_OCP_MICROSCALING_TYPES_FEATURES_EXT](VkStructureType.html)

If [VK_KHR_cooperative_matrix](VK_KHR_cooperative_matrix.html) is supported:

* 
Extending [VkComponentTypeKHR](VkComponentTypeKHR.html):

[VK_COMPONENT_TYPE_FLOAT4_E2M1_EXT](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_FLOAT6_E2M3_EXT](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_FLOAT6_E3M2_EXT](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_FLOAT8_UNSIGNED_E8M0_EXT](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_MXINT8_EXT](VkComponentTypeKHR.html)

* 
[Float4EXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-Float4EXT)

* 
[Float6EXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-Float6EXT)

* 
[Float8UnsignedE8M0EXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-Float8UnsignedE8M0EXT)

* 
[MXInt8EXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-MXInt8EXT)

* 
[BitcastExtractEXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-BitcastExtractEXT)

1) How does this extension add support for microscaling?

**RESOLVED**: It does not directly do so.
This extension just introduces basic support for the data types used for
microscaling but it does not add any support for microscaled tensors or
operations on microscaled data.
Reading miscroscaled data and converting it to other formats such as FP16 or
FP32 can be implemented in shaders with the new types provided by this
extension but these new types cannot for example be used directly in matrix
multiplication operations.

2) What conversions to/from the newly-added types should be supported?

**RESOLVED**: This extension will only add conversions from the newly-added
types to a restricted list of existing larger floating-point types.
Conversions from existing types to the newly-added types would require
complex logic and are not expected to be as useful.
Conversions between integer types and the newly-added types are not expected
to be generally useful either.

* 
Revision 1, 2026-04-29 (Kévin Petit)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_ocp_microscaling_types).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
