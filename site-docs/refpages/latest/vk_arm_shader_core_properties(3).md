# VK_ARM_shader_core_properties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_shader_core_properties.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_shader_core_properties](#VK_ARM_shader_core_properties)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_shader_core_properties - device extension

**Name String**

`VK_ARM_shader_core_properties`

**Extension Type**

Device extension

**Registered Extension Number**

416

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_shader_core_properties] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_ARM_shader_core_properties extension*)

**Last Modified Date**

2023-02-07

**IP Status**

No known IP claims.

**Contributors**

* 
Jan-Harald Fredriksen, Arm Ltd.

This extension provides the ability to determine device-specific performance
properties of Arm GPUs.

It exposes properties for the number of texel, pixel, and fused multiply-add
operations per clock per shader core.
This can be used in combination with the
`[VK_ARM_shader_core_builtins](VK_ARM_shader_core_builtins.html)` extension that provides the ability to
query the number of shader cores on the physical device.

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceShaderCorePropertiesARM](VkPhysicalDeviceShaderCorePropertiesARM.html)

* 
`VK_ARM_SHADER_CORE_PROPERTIES_EXTENSION_NAME`

* 
`VK_ARM_SHADER_CORE_PROPERTIES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_ARM](VkStructureType.html)

* 
Revision 1, 2023-02-07 (Jan-Harald Fredriksen)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_shader_core_properties).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
