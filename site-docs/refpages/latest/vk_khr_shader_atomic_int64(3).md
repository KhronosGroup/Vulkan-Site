# VK_KHR_shader_atomic_int64(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_atomic_int64.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_atomic_int64](#VK_KHR_shader_atomic_int64)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_shader_atomic_int64 - device extension

**Name String**

`VK_KHR_shader_atomic_int64`

**Extension Type**

Device extension

**Registered Extension Number**

181

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Aaron Hagan [ahagan](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_atomic_int64] @ahagan%0A*Here describe the issue or question you have about the VK_KHR_shader_atomic_int64 extension*)

**Last Modified Date**

2018-07-05

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_ARB_gpu_shader_int64`](https://registry.khronos.org/OpenGL/extensions/ARB/ARB_gpu_shader_int64.txt) and
[`GL_EXT_shader_atomic_int64`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GL_EXT_shader_atomic_int64.txt)

**Contributors**

* 
Aaron Hagan, AMD

* 
Daniel Rakos, AMD

* 
Jeff Bolz, NVIDIA

* 
Neil Henning, Codeplay

This extension advertises the SPIR-V **Int64Atomics** capability for Vulkan,
which allows a shader to contain 64-bit atomic operations on signed and
unsigned integers.
The supported operations include OpAtomicMin, OpAtomicMax, OpAtomicAnd,
OpAtomicOr, OpAtomicXor, OpAtomicAdd, OpAtomicExchange, and
OpAtomicCompareExchange.

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
However, if Vulkan 1.2 is supported and this extension is not, the
`shaderBufferInt64Atomics` capability is optional.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderAtomicInt64FeaturesKHR](VkPhysicalDeviceShaderAtomicInt64Features.html)

* 
`VK_KHR_SHADER_ATOMIC_INT64_EXTENSION_NAME`

* 
`VK_KHR_SHADER_ATOMIC_INT64_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_INT64_FEATURES_KHR](VkStructureType.html)

* 
[`Int64Atomics`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-Int64Atomics)

* 
Revision 1, 2018-07-05 (Aaron Hagan)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_atomic_int64).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
