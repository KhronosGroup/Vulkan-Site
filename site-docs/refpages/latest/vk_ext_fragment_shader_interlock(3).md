# VK_EXT_fragment_shader_interlock(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_fragment_shader_interlock.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_fragment_shader_interlock](#VK_EXT_fragment_shader_interlock)
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

VK_EXT_fragment_shader_interlock - device extension

**Name String**

`VK_EXT_fragment_shader_interlock`

**Extension Type**

Device extension

**Registered Extension Number**

252

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
[SPV_EXT_fragment_shader_interlock](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_fragment_shader_interlock.html)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_fragment_shader_interlock] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_fragment_shader_interlock extension*)

**Last Modified Date**

2019-05-02

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_ARB_fragment_shader_interlock`](https://registry.khronos.org/OpenGL/extensions/ARB/ARB_fragment_shader_interlock.txt)

**Contributors**

* 
Daniel Koch, NVIDIA

* 
Graeme Leese, Broadcom

* 
Jan-Harald Fredriksen, Arm

* 
Faith Ekstrand, Intel

* 
Jeff Bolz, NVIDIA

* 
Ruihao Zhang, Qualcomm

* 
Slawomir Grajewski, Intel

* 
Spencer Fricke, Samsung

This extension adds support for the `FragmentShaderPixelInterlockEXT`,
`FragmentShaderSampleInterlockEXT`, and
`FragmentShaderShadingRateInterlockEXT` capabilities from the
`SPV_EXT_fragment_shader_interlock` extension to Vulkan.

Enabling these capabilities provides a critical section for fragment shaders
to avoid overlapping pixels being processed at the same time, and certain
guarantees about the ordering of fragment shader invocations of fragments of
overlapping pixels.

This extension can be useful for algorithms that need to access per-pixel
data structures via shader loads and stores.
Algorithms using this extension can access per-pixel data structures in
critical sections without other invocations accessing the same per-pixel
data.
Additionally, the ordering guarantees are useful for cases where the API
ordering of fragments is meaningful.
For example, applications may be able to execute programmable blending
operations in the fragment shader, where the destination buffer is read via
image loads and the final value is written via image stores.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT](VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT.html)

* 
`VK_EXT_FRAGMENT_SHADER_INTERLOCK_EXTENSION_NAME`

* 
`VK_EXT_FRAGMENT_SHADER_INTERLOCK_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_INTERLOCK_FEATURES_EXT](VkStructureType.html)

* 
[    `FragmentShaderInterlockEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-FragmentShaderSampleInterlockEXT)

* 
[    `FragmentShaderPixelInterlockEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-FragmentShaderPixelInterlockEXT)

* 
[    `FragmentShaderShadingRateInterlockEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-FragmentShaderShadingRateInterlockEXT)

* 
Revision 1, 2019-05-24 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_fragment_shader_interlock).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
