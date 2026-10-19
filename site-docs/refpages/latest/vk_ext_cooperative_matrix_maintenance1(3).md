# VK_EXT_cooperative_matrix_maintenance1(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_cooperative_matrix_maintenance1.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_cooperative_matrix_maintenance1](#VK_EXT_cooperative_matrix_maintenance1)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_cooperative_matrix_maintenance1 - device extension

**Name String**

`VK_EXT_cooperative_matrix_maintenance1`

**Extension Type**

Device extension

**Registered Extension Number**

660

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_cooperative_matrix](VK_KHR_cooperative_matrix.html)

**SPIR-V Dependencies**

* 
[SPV_EXT_cooperative_matrix_maintenance1](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_cooperative_matrix_maintenance1.html)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_cooperative_matrix_maintenance1] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_cooperative_matrix_maintenance1 extension*)

**Extension Proposal**

[VK_EXT_cooperative_matrix_maintenance1](../../../../features/latest/features/proposals/VK_EXT_cooperative_matrix_maintenance1.html)

**Last Modified Date**

2026-06-05

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_cooperative_matrix_maintenance1`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_cooperative_matrix_maintenance1.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Karthik Vaidyanathan, NVIDIA

* 
Matthew Netsch, Qualcomm Technologies, Inc

* 
Mariusz Merecki, Intel

* 
Kévin Petit, Arm Ltd.

This extension adds several new features building on the cooperative matrix
types added in VK_KHR_cooperative_matrix.
The goal is to add and accelerate features beyond just simple GEMM kernels,
including adding support for type/use conversions, reductions, per-element
operations, and conversion of an element index to a matrix coordinate.

The new functionality is defined by the
[`SPV_EXT_cooperative_matrix_maintenance1`](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_cooperative_matrix_maintenance1.html)
SPIR-V extension and can be used with the
[`GLSL_EXT_cooperative_matrix_maintenance1`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_cooperative_matrix_maintenance1.txt)
GLSL extension.

This extension also provides a new command to query the properties of
cooperative matrices, which can be easily extended by other extensions in
the future.
The new query also includes inputs for the desired subgroup size and (when
used together with extensions that support workgroup scope cooperative
matrices, such as VK_NV_cooperative_matrix2) the number of invocations in
the local workgroup, allowing implementations to expose properties that are
optimal or compatible only with specific subgroup sizes or local workgroup
sizes.

* 
[vkGetPhysicalDeviceCooperativeMatrixProperties2EXT](vkGetPhysicalDeviceCooperativeMatrixProperties2EXT.html)

* 
[VkCooperativeMatrixProperties2EXT](VkCooperativeMatrixProperties2EXT.html)

* 
[VkPhysicalDeviceCooperativeMatrixInfo2EXT](VkPhysicalDeviceCooperativeMatrixInfo2EXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT](VkPhysicalDeviceCooperativeMatrixMaintenance1FeaturesEXT.html)

* 
[VkCooperativeMatrixFlagBitsEXT](VkCooperativeMatrixFlagBitsEXT.html)

* 
[VkCooperativeMatrixFlagsEXT](VkCooperativeMatrixFlagsEXT.html)

* 
`VK_EXT_COOPERATIVE_MATRIX_MAINTENANCE_1_EXTENSION_NAME`

* 
`VK_EXT_COOPERATIVE_MATRIX_MAINTENANCE_1_SPEC_VERSION`

* 
Extending [VkCooperativeMatrixFlagBitsEXT](VkCooperativeMatrixFlagBitsEXT.html):

[VK_COOPERATIVE_MATRIX_SATURATING_ACCUMULATION_BIT_EXT](VkCooperativeMatrixFlagBitsEXT.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_PROPERTIES_2_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_INFO_2_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_MAINTENANCE_1_FEATURES_EXT](VkStructureType.html)

* 
[CooperativeMatrixReductionsEXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixReductionsEXT)

* 
[CooperativeMatrixConversionsEXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixConversionsEXT)

* 
[CooperativeMatrixPerElementOperationsEXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixPerElementOperationsEXT)

* 
[CooperativeMatrixGetCoordinateEXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixGetCoordinateEXT)

* 
Revision 1, 2025-10-14 (Jeff Bolz)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_cooperative_matrix_maintenance1).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
