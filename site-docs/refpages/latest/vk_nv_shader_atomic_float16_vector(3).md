# VK_NV_shader_atomic_float16_vector(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_shader_atomic_float16_vector.html

## Table of Contents

- [Name](#_name)
- [VK_NV_shader_atomic_float16_vector](#VK_NV_shader_atomic_float16_vector)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_shader_atomic_float16_vector - device extension

**Name String**

`VK_NV_shader_atomic_float16_vector`

**Extension Type**

Device extension

**Registered Extension Number**

564

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
[SPV_NV_shader_atomic_fp16_vector](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_shader_atomic_fp16_vector.html)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_shader_atomic_float16_vector] @jeffbolznv%0A*Here describe the issue or question you have about the VK_NV_shader_atomic_float16_vector extension*)

**Last Modified Date**

2024-02-03

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_shader_atomic_fp16_vector`](https://registry.khronos.org/OpenGL/extensions/NV/NV_shader_atomic_fp16_vector.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension allows a shader to perform atomic add, min, max, and exchange
operations on 2- and 4-component vectors of float16.
Buffer, workgroup, and image storage classes are all supported.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV](VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV.html)

* 
`VK_NV_SHADER_ATOMIC_FLOAT16_VECTOR_EXTENSION_NAME`

* 
`VK_NV_SHADER_ATOMIC_FLOAT16_VECTOR_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_FLOAT16_VECTOR_FEATURES_NV](VkStructureType.html)

None.

* 
[    `AtomicFloat16VectorNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-AtomicFloat16VectorNV)

* 
Revision 1, 2024-02-03 (Jeff Bolz)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_shader_atomic_float16_vector).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
