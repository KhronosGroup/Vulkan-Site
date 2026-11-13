# VK_KHR_shader_clock(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_clock.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_clock](#VK_KHR_shader_clock)
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

VK_KHR_shader_clock - device extension

**Name String**

`VK_KHR_shader_clock`

**Extension Type**

Device extension

**Registered Extension Number**

182

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_shader_clock](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_shader_clock.html)

**Contact**

* 
Aaron Hagan [ahagan](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_clock] @ahagan%0A*Here describe the issue or question you have about the VK_KHR_shader_clock extension*)

**Last Modified Date**

2019-4-25

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_ARB_shader_clock`](https://registry.khronos.org/OpenGL/extensions/ARB/ARB_shader_clock.txt) and
[`GL_EXT_shader_realtime_clock`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GL_EXT_shader_realtime_clock.txt)

**Contributors**

* 
Aaron Hagan, AMD

* 
Daniel Koch, NVIDIA

This extension advertises the SPIR-V `ShaderClockKHR` capability for
Vulkan, which allows a shader to query a real-time or monotonically
incrementing counter at the subgroup level or across the device level.
The two valid SPIR-V scopes for `OpReadClockKHR` are `Subgroup` and
`Device`.

When using GLSL source-based shading languages, the `clockRealtime*EXT`()
timing functions map to the `OpReadClockKHR` instruction with a scope of
`Device`, and the `clock*ARB`() timing functions map to the
`OpReadClockKHR` instruction with a scope of `Subgroup`.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderClockFeaturesKHR](VkPhysicalDeviceShaderClockFeaturesKHR.html)

* 
`VK_KHR_SHADER_CLOCK_EXTENSION_NAME`

* 
`VK_KHR_SHADER_CLOCK_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CLOCK_FEATURES_KHR](VkStructureType.html)

* 
[`ShaderClockKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ShaderClockKHR)

* 
Revision 1, 2019-4-25 (Aaron Hagan)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_clock).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
