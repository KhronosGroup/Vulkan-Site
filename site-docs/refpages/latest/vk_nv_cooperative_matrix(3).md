# VK_NV_cooperative_matrix(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_cooperative_matrix.html

## Table of Contents

- [Name](#_name)
- [VK_NV_cooperative_matrix](#VK_NV_cooperative_matrix)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_cooperative_matrix - device extension

**Name String**

`VK_NV_cooperative_matrix`

**Extension Type**

Device extension

**Registered Extension Number**

250

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_NV_cooperative_matrix](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_cooperative_matrix.html)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_cooperative_matrix] @jeffbolznv%0A*Here describe the issue or question you have about the VK_NV_cooperative_matrix extension*)

**Last Modified Date**

2019-02-05

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_cooperative_matrix`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_cooperative_matrix.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Markus Tavenrath, NVIDIA

* 
Daniel Koch, NVIDIA

This extension adds support for using cooperative matrix types in SPIR-V.
Cooperative matrix types are medium-sized matrices that are primarily
supported in compute shaders, where the storage for the matrix is spread
across all invocations in some scope (usually a subgroup) and those
invocations cooperate to efficiently perform matrix multiplies.

Cooperative matrix types are defined by the
[`SPV_NV_cooperative_matrix`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_cooperative_matrix.html)
SPIR-V extension and can be used with the
[`GL_NV_cooperative_matrix`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_cooperative_matrix.txt)
GLSL extension.

This extension includes support for enumerating the matrix types and
dimensions that are supported by the implementation.

* 
[vkGetPhysicalDeviceCooperativeMatrixPropertiesNV](vkGetPhysicalDeviceCooperativeMatrixPropertiesNV.html)

* 
[VkCooperativeMatrixPropertiesNV](VkCooperativeMatrixPropertiesNV.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCooperativeMatrixFeaturesNV](VkPhysicalDeviceCooperativeMatrixFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceCooperativeMatrixPropertiesNV](VkPhysicalDeviceCooperativeMatrixPropertiesNV.html)

* 
[VkComponentTypeNV](VkComponentTypeKHR.html)

* 
[VkScopeNV](VkScopeKHR.html)

* 
`VK_NV_COOPERATIVE_MATRIX_EXTENSION_NAME`

* 
`VK_NV_COOPERATIVE_MATRIX_SPEC_VERSION`

* 
Extending [VkComponentTypeKHR](VkComponentTypeKHR.html):

[VK_COMPONENT_TYPE_FLOAT16_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_FLOAT32_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_FLOAT64_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_SINT16_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_SINT32_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_SINT64_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_SINT8_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_UINT16_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_UINT32_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_UINT64_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_UINT8_NV](VkComponentTypeKHR.html)

Extending [VkScopeKHR](VkScopeKHR.html):

* 
[VK_SCOPE_DEVICE_NV](VkScopeKHR.html)

* 
[VK_SCOPE_QUEUE_FAMILY_NV](VkScopeKHR.html)

* 
[VK_SCOPE_SUBGROUP_NV](VkScopeKHR.html)

* 
[VK_SCOPE_WORKGROUP_NV](VkScopeKHR.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_PROPERTIES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_PROPERTIES_NV](VkStructureType.html)

* 
[    `CooperativeMatrixNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeMatrixNV)

(1) What matrix properties will be supported in practice?

**RESOLVED**: In NVIDIA’s initial implementation, we will support:

* 
AType = BType = fp16 CType = DType = fp16 MxNxK = 16x8x16 scope =
Subgroup

* 
AType = BType = fp16 CType = DType = fp16 MxNxK = 16x8x8 scope =
Subgroup

* 
AType = BType = fp16 CType = DType = fp32 MxNxK = 16x8x16 scope =
Subgroup

* 
AType = BType = fp16 CType = DType = fp32 MxNxK = 16x8x8 scope =
Subgroup

* 
Revision 1, 2019-02-05 (Jeff Bolz)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_cooperative_matrix).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
