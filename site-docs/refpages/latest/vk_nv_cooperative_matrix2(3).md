# VK_NV_cooperative_matrix2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_cooperative_matrix2.html

## Table of Contents

- [Name](#_name)
- [VK_NV_cooperative_matrix2](#VK_NV_cooperative_matrix2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
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

VK_NV_cooperative_matrix2 - device extension

**Name String**

`VK_NV_cooperative_matrix2`

**Extension Type**

Device extension

**Registered Extension Number**

594

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_cooperative_matrix](VK_KHR_cooperative_matrix.html)

**SPIR-V Dependencies**

* 
[SPV_NV_cooperative_matrix2](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_cooperative_matrix2.html)

* 
[SPV_NV_tensor_addressing](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_tensor_addressing.html)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_cooperative_matrix2] @jeffbolznv%0A*Here describe the issue or question you have about the VK_NV_cooperative_matrix2 extension*)

**Extension Proposal**

[VK_NV_cooperative_matrix2](../../../../features/latest/features/proposals/VK_NV_cooperative_matrix2.html)

**Last Modified Date**

2024-08-01

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_NV_cooperative_matrix2`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_cooperative_matrix2.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Karthik Vaidyanathan, NVIDIA

This extension adds several new features building on the cooperative matrix
types added in VK_KHR_cooperative_matrix.
The goal is to add and accelerate features beyond just simple GEMM kernels,
including adding support for type/use conversions, reductions, per-element
operations, and tensor addressing, and also to improve usability and
out-of-the-box performance by adding support for more flexible matrix sizes,
and workgroup scope matrices with compiler-managed staging through shared
memory.

The new functionality is defined by the
[`SPV_NV_tensor_addressing`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_tensor_addressing.html) and
[`SPV_NV_cooperative_matrix2`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_cooperative_matrix2.html)
SPIR-V extensions and can be used with the
[`GLSL_NV_cooperative_matrix2`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_cooperative_matrix2.txt)
GLSL extension.

This extension includes support for enumerating the matrix types and
dimensions that are supported by the implementation, and which specific
features are supported.

* 
[vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV](vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV.html)

* 
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](VkCooperativeMatrixFlexibleDimensionsPropertiesNV.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCooperativeMatrix2FeaturesNV](VkPhysicalDeviceCooperativeMatrix2FeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceCooperativeMatrix2PropertiesNV](VkPhysicalDeviceCooperativeMatrix2PropertiesNV.html)

* 
`VK_NV_COOPERATIVE_MATRIX_2_EXTENSION_NAME`

* 
`VK_NV_COOPERATIVE_MATRIX_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_FLEXIBLE_DIMENSIONS_PROPERTIES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_2_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_2_PROPERTIES_NV](VkStructureType.html)

* 
[TensorAddressingNV](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-TensorAddressingNV)

* 
[CooperativeMatrixReductionsNV](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixReductionsNV)

* 
[CooperativeMatrixConversionsNV](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixConversionsNV)

* 
[CooperativeMatrixPerElementOperationsNV](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixPerElementOperationsNV)

* 
[CooperativeMatrixTensorAddressingNV](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixTensorAddressingNV)

* 
[CooperativeMatrixBlockLoadsNV](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixBlockLoadsNV)

* 
Revision 1, 2024-08-01 (Jeff Bolz)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_cooperative_matrix2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
