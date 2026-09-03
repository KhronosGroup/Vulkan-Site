# VK_EXT_multi_draw(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_multi_draw.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_multi_draw](#VK_EXT_multi_draw)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New or Modified Built-In Variables](#_new_or_modified_built_in_variables)
- [New_or_Modified_Built-In_Variables](#_new_or_modified_built_in_variables)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_multi_draw - device extension

**Name String**

`VK_EXT_multi_draw`

**Extension Type**

Device extension

**Registered Extension Number**

393

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_multi_draw] @zmike%0A*Here describe the issue or question you have about the VK_EXT_multi_draw extension*)

**Last Modified Date**

2021-05-19

**Interactions and External Dependencies**

* 
Interacts with Vulkan 1.1.

* 
Interacts with `[VK_KHR_shader_draw_parameters](VK_KHR_shader_draw_parameters.html)`.

**IP Status**

No known IP claims.

**Contributors**

* 
Mike Blumenkrantz, VALVE

* 
Piers Daniell, NVIDIA

* 
Faith Ekstrand, INTEL

* 
Spencer Fricke, SAMSUNG

* 
Ricardo Garcia, IGALIA

* 
Jon Leech, KHRONOS

* 
Stu Smith, AMD

Processing multiple draw commands in sequence incurs measurable overhead
within drivers due to repeated state checks and updates during dispatch.
This extension enables passing the entire sequence of draws directly to the
driver in order to avoid any such overhead, using an array of
[VkMultiDrawInfoEXT](VkMultiDrawInfoEXT.html) or [VkMultiDrawIndexedInfoEXT](VkMultiDrawIndexedInfoEXT.html) structs with
`vkCmdDrawMultiEXT` or `vkCmdDrawMultiIndexedEXT`, respectively.
These functions could be used any time multiple draw commands are being
recorded without any state changes between them in order to maximize
performance.

* 
[vkCmdDrawMultiEXT](vkCmdDrawMultiEXT.html)

* 
[vkCmdDrawMultiIndexedEXT](vkCmdDrawMultiIndexedEXT.html)

* 
[VkMultiDrawIndexedInfoEXT](VkMultiDrawIndexedInfoEXT.html)

* 
[VkMultiDrawInfoEXT](VkMultiDrawInfoEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMultiDrawFeaturesEXT](VkPhysicalDeviceMultiDrawFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMultiDrawPropertiesEXT](VkPhysicalDeviceMultiDrawPropertiesEXT.html)

* 
`VK_EXT_MULTI_DRAW_EXTENSION_NAME`

* 
`VK_EXT_MULTI_DRAW_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTI_DRAW_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTI_DRAW_PROPERTIES_EXT](VkStructureType.html)

* 
(modified)`DrawIndex`

* 
Revision 1, 2021-01-20 (Mike Blumenkrantz)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_multi_draw).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
