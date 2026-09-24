# VK_AMD_shader_core_properties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_shader_core_properties2.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_shader_core_properties2](#VK_AMD_shader_core_properties2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_shader_core_properties2 - device extension

**Name String**

`VK_AMD_shader_core_properties2`

**Extension Type**

Device extension

**Registered Extension Number**

228

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_AMD_shader_core_properties](VK_AMD_shader_core_properties.html)

**Contact**

* 
Matthaeus G. Chajdas [anteru](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_shader_core_properties2] @anteru%0A*Here describe the issue or question you have about the VK_AMD_shader_core_properties2 extension*)

**Last Modified Date**

2019-07-26

**IP Status**

No known IP claims.

**Contributors**

* 
Matthaeus G. Chajdas, AMD

* 
Tobias Hector, AMD

This extension exposes additional shader core properties for a target
physical device through the `[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)`
extension.

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceShaderCoreProperties2AMD](VkPhysicalDeviceShaderCoreProperties2AMD.html)

* 
[VkShaderCorePropertiesFlagBitsAMD](VkShaderCorePropertiesFlagBitsAMD.html)

* 
[VkShaderCorePropertiesFlagsAMD](VkShaderCorePropertiesFlagsAMD.html)

* 
`VK_AMD_SHADER_CORE_PROPERTIES_2_EXTENSION_NAME`

* 
`VK_AMD_SHADER_CORE_PROPERTIES_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_2_AMD](VkStructureType.html)

None.

* 
Revision 1, 2019-07-26 (Matthaeus G. Chajdas)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_shader_core_properties2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
