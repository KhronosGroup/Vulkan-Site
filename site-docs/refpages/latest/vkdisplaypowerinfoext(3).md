# VkDisplayPowerInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayPowerInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayPowerInfoEXT - Describe the power state of a display

The `VkDisplayPowerInfoEXT` structure is defined as:

// Provided by VK_EXT_display_control
typedef struct VkDisplayPowerInfoEXT {
    VkStructureType           sType;
    const void*               pNext;
    VkDisplayPowerStateEXT    powerState;
} VkDisplayPowerInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`powerState` is a [VkDisplayPowerStateEXT](VkDisplayPowerStateEXT.html) value specifying the
new power state of the display.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayPowerInfoEXT-sType-sType) VUID-VkDisplayPowerInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_POWER_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDisplayPowerInfoEXT-pNext-pNext) VUID-VkDisplayPowerInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDisplayPowerInfoEXT-powerState-parameter) VUID-VkDisplayPowerInfoEXT-powerState-parameter

 `powerState` **must** be a valid [VkDisplayPowerStateEXT](VkDisplayPowerStateEXT.html) value

[VK_EXT_display_control](VK_EXT_display_control.html), [VkDisplayPowerStateEXT](VkDisplayPowerStateEXT.html), [VkStructureType](VkStructureType.html), [vkDisplayPowerControlEXT](vkDisplayPowerControlEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayPowerInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
