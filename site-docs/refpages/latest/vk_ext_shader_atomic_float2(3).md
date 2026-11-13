# VK_EXT_shader_atomic_float2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_atomic_float2.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_atomic_float2](#VK_EXT_shader_atomic_float2)
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

VK_EXT_shader_atomic_float2 - device extension

**Name String**

`VK_EXT_shader_atomic_float2`

**Extension Type**

Device extension

**Registered Extension Number**

274

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_EXT_shader_atomic_float](VK_EXT_shader_atomic_float.html)

**API Interactions**

* 
Interacts with VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT::sparseImageFloat32AtomicMinMax

**SPIR-V Dependencies**

* 
[SPV_EXT_shader_atomic_float16_add](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_shader_atomic_float16_add.html)

* 
[SPV_EXT_shader_atomic_float_min_max](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_shader_atomic_float_min_max.html)

**Contact**

* 
Faith Ekstrand [gfxstrand](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_atomic_float2] @gfxstrand%0A*Here describe the issue or question you have about the VK_EXT_shader_atomic_float2 extension*)

**Last Modified Date**

2020-08-14

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_shader_atomic_float2`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_shader_atomic_float2.txt)

**Contributors**

* 
Faith Ekstrand, Intel

This extension allows a shader to perform 16-bit floating-point atomic
operations on buffer and workgroup memory as well as floating-point atomic
minimum and maximum operations on buffer, workgroup, and image memory.
It advertises the SPIR-V `AtomicFloat16AddEXT` capability which allows
atomic add operations on 16-bit floating-point numbers and the SPIR-V
`AtomicFloat16MinMaxEXT`, `AtomicFloat32MinMaxEXT` and
`AtomicFloat64MinMaxEXT` capabilities which allow atomic minimum and
maximum operations on floating-point numbers.
The supported operations include `OpAtomicFAddEXT`, `OpAtomicFMinEXT`
and `OpAtomicFMaxEXT`.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT](VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT.html)

* 
`VK_EXT_SHADER_ATOMIC_FLOAT_2_EXTENSION_NAME`

* 
`VK_EXT_SHADER_ATOMIC_FLOAT_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_FLOAT_2_FEATURES_EXT](VkStructureType.html)

1) Should this extension add support for 16-bit image atomics?

**RESOLVED**: No.
While Vulkan supports creating storage images with
[VK_FORMAT_R16_SFLOAT](VkFormat.html) and doing load and store on them, the data in the
shader has a 32-bit representation.
Vulkan currently has no facility for even basic reading or writing such
images using 16-bit float values in the shader.
Adding such functionality would be required before 16-bit image atomics
would make sense and is outside the scope of this extension.

* 
[    `AtomicFloat32MinMaxEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-AtomicFloat16AddEXT)

* 
[    `AtomicFloat32MinMaxEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-AtomicFloat16MinMaxEXT)

* 
[    `AtomicFloat32MinMaxEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-AtomicFloat32MinMaxEXT)

* 
[    `AtomicFloat64MinMaxEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-AtomicFloat64MinMaxEXT)

* 
Revision 1, 2020-08-14 (Faith Ekstrand)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_atomic_float2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
