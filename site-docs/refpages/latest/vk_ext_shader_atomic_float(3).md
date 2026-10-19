# VK_EXT_shader_atomic_float(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_atomic_float.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_atomic_float](#VK_EXT_shader_atomic_float)
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

VK_EXT_shader_atomic_float - device extension

**Name String**

`VK_EXT_shader_atomic_float`

**Extension Type**

Device extension

**Registered Extension Number**

261

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
Interacts with VkPhysicalDeviceShaderAtomicFloatFeaturesEXT::sparseImageFloat32AtomicAdd

* 
Interacts with VkPhysicalDeviceShaderAtomicFloatFeaturesEXT::sparseImageFloat32Atomics

**SPIR-V Dependencies**

* 
[SPV_EXT_shader_atomic_float_add](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_shader_atomic_float_add.html)

**Contact**

* 
Vikram Kushwaha [vkushwaha-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_atomic_float] @vkushwaha-nv%0A*Here describe the issue or question you have about the VK_EXT_shader_atomic_float extension*)

**Last Modified Date**

2020-07-15

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_shader_atomic_float`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_shader_atomic_float.txt)

**Contributors**

* 
Vikram Kushwaha, NVIDIA

* 
Jeff Bolz, NVIDIA

This extension allows a shader to contain floating-point atomic operations
on buffer, workgroup, and image memory.
It also advertises the SPIR-V `AtomicFloat32AddEXT` and
`AtomicFloat64AddEXT` capabilities that allows atomic addition on
floating-points numbers.
The supported operations include `OpAtomicFAddEXT`,
`OpAtomicExchange`, `OpAtomicLoad` and `OpAtomicStore`.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderAtomicFloatFeaturesEXT](VkPhysicalDeviceShaderAtomicFloatFeaturesEXT.html)

* 
`VK_EXT_SHADER_ATOMIC_FLOAT_EXTENSION_NAME`

* 
`VK_EXT_SHADER_ATOMIC_FLOAT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_FLOAT_FEATURES_EXT](VkStructureType.html)

* 
[    `AtomicFloat32AddEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-AtomicFloat32AddEXT)

* 
[    `AtomicFloat64AddEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-AtomicFloat64AddEXT)

* 
Revision 1, 2020-07-15 (Vikram Kushwaha)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_atomic_float).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
