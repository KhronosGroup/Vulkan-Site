# VK_NV_cooperative_vector(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_cooperative_vector.html

## Table of Contents

- [Name](#_name)
- [VK_NV_cooperative_vector](#VK_NV_cooperative_vector)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Unions](#_new_unions)
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

VK_NV_cooperative_vector - device extension

**Name String**

`VK_NV_cooperative_vector`

**Extension Type**

Device extension

**Registered Extension Number**

492

**Revision**

4

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_NV_cooperative_vector](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_cooperative_vector.html)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_cooperative_vector] @jeffbolznv%0A*Here describe the issue or question you have about the VK_NV_cooperative_vector extension*)

**Extension Proposal**

[VK_NV_cooperative_vector](../../../../features/latest/features/proposals/VK_NV_cooperative_vector.html)

**Last Modified Date**

2024-05-23

**Interactions and External Dependencies**

* 
This extension requires
[`SPV_NV_cooperative_vector`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_cooperative_vector.html)

* 
This extension provides API support for
[`GL_NV_cooperative_vector`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_cooperative_vector.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension adds support for using cooperative vector types in SPIR-V.
Unlike cooperative matrix types, a variable with a cooperative vector type
is logically stored in the invocation it belongs to, but they can cooperate
behind the scenes when performing matrix-vector multiplies.
Cooperative vectors do not require a fully occupied subgroup or uniform
control flow like cooperative matrices, although these do increase the
likelihood of being on the fast path.
And unlike normal vector types, they have arbitrary length and support a
relatively limited set of operations.
These types are intended to help accelerate the evaluation of small neural
networks, where each invocation is performing its own independent evaluation
of the network.

Cooperative vector types are defined by the
[`SPV_NV_cooperative_vector`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_cooperative_vector.html)
SPIR-V extension and can be used with the
[`GL_NV_cooperative_vector`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_cooperative_vector.txt)
GLSL extension.

This extension includes support for enumerating the combinations of types
that are supported by the implementation, and for converting matrix data to
and from an optimized opaque layout.

* 
[vkCmdConvertCooperativeVectorMatrixNV](vkCmdConvertCooperativeVectorMatrixNV.html)

* 
[vkConvertCooperativeVectorMatrixNV](vkConvertCooperativeVectorMatrixNV.html)

* 
[vkGetPhysicalDeviceCooperativeVectorPropertiesNV](vkGetPhysicalDeviceCooperativeVectorPropertiesNV.html)

* 
[VkConvertCooperativeVectorMatrixInfoNV](VkConvertCooperativeVectorMatrixInfoNV.html)

* 
[VkCooperativeVectorPropertiesNV](VkCooperativeVectorPropertiesNV.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCooperativeVectorFeaturesNV](VkPhysicalDeviceCooperativeVectorFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceCooperativeVectorPropertiesNV](VkPhysicalDeviceCooperativeVectorPropertiesNV.html)

* 
[VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html)

* 
[VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html)

* 
[VkComponentTypeKHR](VkComponentTypeKHR.html)

* 
[VkCooperativeVectorMatrixLayoutNV](VkCooperativeVectorMatrixLayoutNV.html)

* 
`VK_NV_COOPERATIVE_VECTOR_EXTENSION_NAME`

* 
`VK_NV_COOPERATIVE_VECTOR_SPEC_VERSION`

* 
Extending [VkComponentTypeKHR](VkComponentTypeKHR.html):

[VK_COMPONENT_TYPE_FLOAT_E4M3_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_FLOAT_E5M2_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_SINT8_PACKED_NV](VkComponentTypeKHR.html)

* 
[VK_COMPONENT_TYPE_UINT8_PACKED_NV](VkComponentTypeKHR.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](VkPipelineStageFlagBits2.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_CONVERT_COOPERATIVE_VECTOR_MATRIX_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COOPERATIVE_VECTOR_PROPERTIES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_VECTOR_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_VECTOR_PROPERTIES_NV](VkStructureType.html)

* 
[CooperativeVectorNV](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CooperativeVectorNV)

* 
Revision 4, 2024-05-23 (Jeff Bolz)

Add maxCooperativeVectorComponents

Revision 3, 2024-05-23 (Jeff Bolz)

* 
Add training functions

Revision 2, 2024-02-10 (Jeff Bolz)

* 
Add device-side matrix conversion

Revision 1, 2023-12-13 (Jeff Bolz)

* 
Initial revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_cooperative_vector).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
