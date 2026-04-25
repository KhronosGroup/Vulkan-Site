# VK_ARM_shader_core_builtins(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_shader_core_builtins.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_shader_core_builtins](#VK_ARM_shader_core_builtins)
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

VK_ARM_shader_core_builtins - device extension

**Name String**

`VK_ARM_shader_core_builtins`

**Extension Type**

Device extension

**Registered Extension Number**

498

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_ARM_core_builtins](https://github.khronos.org/SPIRV-Registry/extensions/ARM/SPV_ARM_core_builtins.html)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_shader_core_builtins] @kpet%0A*Here describe the issue or question you have about the VK_ARM_shader_core_builtins extension*)

**Last Modified Date**

2022-10-05

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_ARM_shader_core_builtins`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/arm/GLSL_ARM_shader_core_builtins.txt)

**Contributors**

* 
Kevin Petit, Arm Ltd.

* 
Jan-Harald Fredriksen, Arm Ltd.

This extension provides the ability to determine device-specific properties
on Arm GPUs.
It exposes properties for the number of shader cores, the maximum number of
warps that can run on a shader core, and shader builtins to enable
invocations to identify which core and warp a shader invocation is executing
on.

This extension enables support for the SPIR-V `CoreBuiltinsARM`
capability.

These properties and built-ins can be used for debugging or performance
optimization purposes.
A typical optimization example would be to use `CoreIDARM` to select a
per-shader-core instance of a data structure in algorithms that use atomics
so as to reduce contention.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM](VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM](VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM.html)

* 
`VK_ARM_SHADER_CORE_BUILTINS_EXTENSION_NAME`

* 
`VK_ARM_SHADER_CORE_BUILTINS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_BUILTINS_FEATURES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_BUILTINS_PROPERTIES_ARM](VkStructureType.html)

* 
[`CoreCountARM`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-corecountarm)

* 
[`CoreMaxIDARM`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-coremaxidarm)

* 
[`CoreIDARM`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-coreidarm)

* 
[`WarpsMaxIDARM`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-warpmaxidarm)

* 
[`WarpIDARM`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-warpidarm)

* 
[`CoreBuiltinsARM`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-CoreBuiltinsARM)

None.

* 
Revision 1, 2022-10-05 (Kevin Petit)

Initial revision

Revision 2, 2022-10-26 (Kevin Petit)

* 
Add `shaderCoreMask` property

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_shader_core_builtins).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
