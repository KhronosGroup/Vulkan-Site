# VK_KHR_shader_subgroup_extended_types(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_subgroup_extended_types.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_subgroup_extended_types](#VK_KHR_shader_subgroup_extended_types)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_shader_subgroup_extended_types - device extension

**Name String**

`VK_KHR_shader_subgroup_extended_types`

**Extension Type**

Device extension

**Registered Extension Number**

176

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Neil Henning [sheredom](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_subgroup_extended_types] @sheredom%0A*Here describe the issue or question you have about the VK_KHR_shader_subgroup_extended_types extension*)

**Last Modified Date**

2019-01-08

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_shader_subgroup_extended_types`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_shader_subgroup_extended_types.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Jan-Harald Fredriksen, Arm

* 
Neil Henning, AMD

* 
Daniel Koch, NVIDIA

* 
Jeff Leger, Qualcomm

* 
Graeme Leese, Broadcom

* 
David Neto, Google

* 
Daniel Rakos, AMD

This extension enables the Non Uniform Group Operations in SPIR-V to support
8-bit integer, 16-bit integer, 64-bit integer, 16-bit floating-point, and
vectors of these types.

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderSubgroupExtendedTypesFeaturesKHR](VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures.html)

* 
`VK_KHR_SHADER_SUBGROUP_EXTENDED_TYPES_EXTENSION_NAME`

* 
`VK_KHR_SHADER_SUBGROUP_EXTENDED_TYPES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_EXTENDED_TYPES_FEATURES_KHR](VkStructureType.html)

* 
Revision 1, 2019-01-08 (Neil Henning)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_subgroup_extended_types).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
