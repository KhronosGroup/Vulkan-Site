# VK_NV_shader_sm_builtins(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_shader_sm_builtins.html

## Table of Contents

- [Name](#_name)
- [VK_NV_shader_sm_builtins](#VK_NV_shader_sm_builtins)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New or Modified Built-In Variables](#_new_or_modified_built_in_variables)
- [New_or_Modified_Built-In_Variables](#_new_or_modified_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_shader_sm_builtins - device extension

**Name String**

`VK_NV_shader_sm_builtins`

**Extension Type**

Device extension

**Registered Extension Number**

155

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_NV_shader_sm_builtins](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_shader_sm_builtins.html)

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_shader_sm_builtins] @dgkoch%0A*Here describe the issue or question you have about the VK_NV_shader_sm_builtins extension*)

**Last Modified Date**

2019-05-28

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_shader_sm_builtins`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_shader_sm_builtins.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Eric Werness, NVIDIA

This extension provides the ability to determine device-specific properties
on NVIDIA GPUs.
It provides the number of streaming multiprocessors (SMs), the maximum
number of warps (subgroups) that can run on an SM, and shader builtins to
enable invocations to identify which SM and warp a shader invocation is
executing on.

This extension enables support for the SPIR-V `ShaderSMBuiltinsNV`
capability.

These properties and built-ins **should** typically only be used for debugging
purposes.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderSMBuiltinsFeaturesNV](VkPhysicalDeviceShaderSMBuiltinsFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceShaderSMBuiltinsPropertiesNV](VkPhysicalDeviceShaderSMBuiltinsPropertiesNV.html)

* 
`VK_NV_SHADER_SM_BUILTINS_EXTENSION_NAME`

* 
`VK_NV_SHADER_SM_BUILTINS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SM_BUILTINS_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SM_BUILTINS_PROPERTIES_NV](VkStructureType.html)

* 
[`WarpsPerSMNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-warpspersmnv)

* 
[`SMCountNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-smcountnv)

* 
[`WarpIDNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-warpidnv)

* 
[`SMIDNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-smidnv)

* 
[    `ShaderSMBuiltinsNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ShaderSMBuiltinsNV)

What should we call this extension?

**RESOLVED**: `NV_shader_sm_builtins`.
Other options considered included:

* 
`NV_shader_smid` - but SMID is really easy to typo/confuse as SIMD.

* 
`NV_shader_sm_info` - but **Info** is typically reserved for input
structures

* 
Revision 1, 2019-05-28 (Daniel Koch)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_shader_sm_builtins).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
