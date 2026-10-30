# VK_EXT_fragment_density_map_offset(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_fragment_density_map_offset.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_fragment_density_map_offset](#VK_EXT_fragment_density_map_offset)
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

VK_EXT_fragment_density_map_offset - device extension

**Name String**

`VK_EXT_fragment_density_map_offset`

**Extension Type**

Device extension

**Registered Extension Number**

620

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html)

and

     [VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html)

     or

     [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

and

     [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

     or

     [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)

**Contact**

* 
Connor Abbott [cwabbott0](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_fragment_density_map_offset] @cwabbott0%0A*Here describe the issue or question you have about the VK_EXT_fragment_density_map_offset extension*)

**Extension Proposal**

[VK_EXT_fragment_density_map_offset](../../../../features/latest/features/proposals/VK_EXT_fragment_density_map_offset.html)

**Last Modified Date**

2025-02-14

**Contributors**

* 
Connor Abbott, Valve Corporation

* 
Matthew Netsch, Qualcomm Technologies, Inc.

* 
Jonathan Wicks, Qualcomm Technologies, Inc.

* 
Jonathan Tinkham, Qualcomm Technologies, Inc.

* 
Jeff Leger, Qualcomm Technologies, Inc.

* 
Manan Katwala, Qualcomm Technologies, Inc.

* 
Mike Blumenkrantz, Valve Corporation

This extension allows an application to specify offsets to a fragment
density map attachment, changing the framebuffer location where density
values are applied to without having to regenerate the fragment density map.

* 
[vkCmdEndRendering2EXT](vkCmdEndRendering2KHR.html)

* 
[VkRenderingEndInfoEXT](VkRenderingEndInfoKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT](VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT](VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT.html)

Extending [VkSubpassEndInfo](VkSubpassEndInfo.html), [VkRenderingEndInfoKHR](VkRenderingEndInfoKHR.html):

* 
[VkRenderPassFragmentDensityMapOffsetEndInfoEXT](VkRenderPassFragmentDensityMapOffsetEndInfoEXT.html)

* 
`VK_EXT_FRAGMENT_DENSITY_MAP_OFFSET_EXTENSION_NAME`

* 
`VK_EXT_FRAGMENT_DENSITY_MAP_OFFSET_SPEC_VERSION`

* 
Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

[VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](VkImageCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_END_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_FRAGMENT_DENSITY_MAP_OFFSET_END_INFO_EXT](VkStructureType.html)

* 
Revision 1, 2025-02-14 (Connor Abbott)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_fragment_density_map_offset).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
