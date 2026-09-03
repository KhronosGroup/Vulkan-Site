# VK_NV_cooperative_matrix_decode_vector(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_cooperative_matrix_decode_vector.html

## Table of Contents

- [Name](#_name)
- [VK_NV_cooperative_matrix_decode_vector](#VK_NV_cooperative_matrix_decode_vector)
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

VK_NV_cooperative_matrix_decode_vector - device extension

**Name String**

`VK_NV_cooperative_matrix_decode_vector`

**Extension Type**

Device extension

**Registered Extension Number**

690

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_NV_cooperative_matrix2](VK_NV_cooperative_matrix2.html)

**SPIR-V Dependencies**

* 
[SPV_NV_cooperative_matrix_decode_vector](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_cooperative_matrix_decode_vector.html)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_cooperative_matrix_decode_vector] @jeffbolznv%0A*Here describe the issue or question you have about the VK_NV_cooperative_matrix_decode_vector extension*)

**Extension Proposal**

[VK_NV_cooperative_matrix_decode_vector](../../../../features/latest/features/proposals/VK_NV_cooperative_matrix_decode_vector.html)

**Last Modified Date**

2026-04-30

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_NV_cooperative_matrix_decode_vector`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_cooperative_matrix_decode_vector.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension adds a device feature for the SPIR-V
`CooperativeMatrixDecodeVectorNV` capability and the
[`SPV_NV_cooperative_matrix_decode_vector`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_cooperative_matrix_decode_vector.html)
SPIR-V extension.

When enabled, shaders may use an optional **decode vector** operand with
`OpCooperativeMatrixLoadTensorNV` (see that SPIR-V extension) to load
multiple block-adjacent elements per decode callback invocation.

An implementation **must** also support
[VkPhysicalDeviceCooperativeMatrix2FeaturesNV](VkPhysicalDeviceCooperativeMatrix2FeaturesNV.html)::`cooperativeMatrixBlockLoads`
when exposing this extension.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV](VkPhysicalDeviceCooperativeMatrixDecodeVectorFeaturesNV.html)

* 
`VK_NV_COOPERATIVE_MATRIX_DECODE_VECTOR_EXTENSION_NAME`

* 
`VK_NV_COOPERATIVE_MATRIX_DECODE_VECTOR_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_DECODE_VECTOR_FEATURES_NV](VkStructureType.html)

* 
[CooperativeMatrixDecodeVectorNV](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixDecodeVectorNV)

* 
Revision 1, 2026-04-30 (Jeff Bolz)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_cooperative_matrix_decode_vector).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
