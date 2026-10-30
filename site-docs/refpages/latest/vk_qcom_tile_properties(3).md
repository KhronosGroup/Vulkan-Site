# VK_QCOM_tile_properties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_tile_properties.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_tile_properties](#VK_QCOM_tile_properties)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_tile_properties - device extension

**Name String**

`VK_QCOM_tile_properties`

**Extension Type**

Device extension

**Registered Extension Number**

485

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_dynamic_rendering

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_tile_properties] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_tile_properties extension*)

**Extension Proposal**

[VK_QCOM_tile_properties](../../../../features/latest/features/proposals/VK_QCOM_tile_properties.html)

**Last Modified Date**

2022-07-11

**Interactions and External Dependencies**

* 
This extension interacts with `[VK_EXT_subpass_merge_feedback](VK_EXT_subpass_merge_feedback.html)`

**Contributors**

* 
Jonathan Wicks, Qualcomm Technologies, Inc.

* 
Jonathan Tinkham, Qualcomm Technologies, Inc.

* 
Arpit Agarwal, Qualcomm Technologies, Inc.

* 
Jeff Leger, Qualcomm Technologies, Inc.

This extension allows an application to query the tile properties.
This extension supports both renderpasses and dynamic rendering.

* 
[vkGetDynamicRenderingTilePropertiesQCOM](vkGetDynamicRenderingTilePropertiesQCOM.html)

* 
[vkGetFramebufferTilePropertiesQCOM](vkGetFramebufferTilePropertiesQCOM.html)

* 
[VkTilePropertiesQCOM](VkTilePropertiesQCOM.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceTilePropertiesFeaturesQCOM](VkPhysicalDeviceTilePropertiesFeaturesQCOM.html)

If [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
[VkRenderingInfoKHR](VkRenderingInfo.html)

* 
`VK_QCOM_TILE_PROPERTIES_EXTENSION_NAME`

* 
`VK_QCOM_TILE_PROPERTIES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_PROPERTIES_FEATURES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TILE_PROPERTIES_QCOM](VkStructureType.html)

* 
Revision 1, 2022-07-11 (Arpit Agarwal)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_tile_properties).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
