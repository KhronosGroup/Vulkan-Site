# VK_KHR_shader_untyped_pointers(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_untyped_pointers.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_untyped_pointers](#VK_KHR_shader_untyped_pointers)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_shader_untyped_pointers - device extension

**Name String**

`VK_KHR_shader_untyped_pointers`

**Extension Type**

Device extension

**Registered Extension Number**

388

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

**SPIR-V Dependencies**

* 
[SPV_KHR_untyped_pointers](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_untyped_pointers.html)

**Contact**

* 
Alan Baker [alan-baker](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_untyped_pointers] @alan-baker%0A*Here describe the issue or question you have about the VK_KHR_shader_untyped_pointers extension*)

**Extension Proposal**

[VK_KHR_shader_untyped_pointers](../../../../features/latest/features/proposals/VK_KHR_shader_untyped_pointers.html)

**Last Modified Date**

2024-03-26

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
Requires the
[`SPV_KHR_untyped_pointers`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_untyped_pointers.html)
SPIR-V extension.

**Contributors**

* 
Alan Baker, Google

* 
Jan-Harald Fredriksen, Arm

* 
Tom Olson, Arm

* 
Spencer Fricke, LunarG

* 
Shahbaz Youssefi, Google

* 
Tobias Hector, AMD

This extension adds Vulkan support for the
[`SPV_KHR_untyped_pointers`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_untyped_pointers.html) SPIR-V
extension.
It provides an alternative to strongly-typed pointers.
Untyped pointers allow shader authors to reinterpret data accessed through
memory and atomic instructions versus the data type declared in the variable
without extra conversion instructions.
Untyped pointers also provide an efficient translation from templated
load/store operations in high-level languages and simplify shaders that
support operations, but not storage, on smaller data types (e.g. 16-bit
floating-point types).

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderUntypedPointersFeaturesKHR](VkPhysicalDeviceShaderUntypedPointersFeaturesKHR.html)

* 
`VK_KHR_SHADER_UNTYPED_POINTERS_EXTENSION_NAME`

* 
`VK_KHR_SHADER_UNTYPED_POINTERS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_UNTYPED_POINTERS_FEATURES_KHR](VkStructureType.html)

* 
Revision 1, 2024-03-26 (Alan Baker)

Internal draft version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_untyped_pointers).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
