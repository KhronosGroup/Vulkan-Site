# VkDisplayEventInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayEventInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayEventInfoEXT - Describe a display event to create

The `VkDisplayEventInfoEXT` structure is defined as:

// Provided by VK_EXT_display_control
typedef struct VkDisplayEventInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkDisplayEventTypeEXT    displayEvent;
} VkDisplayEventInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`displayEvent` is a [VkDisplayEventTypeEXT](VkDisplayEventTypeEXT.html) specifying when the
fence will be signaled.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayEventInfoEXT-sType-sType) VUID-VkDisplayEventInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_EVENT_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDisplayEventInfoEXT-pNext-pNext) VUID-VkDisplayEventInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDisplayEventInfoEXT-displayEvent-parameter) VUID-VkDisplayEventInfoEXT-displayEvent-parameter

 `displayEvent` **must** be a valid [VkDisplayEventTypeEXT](VkDisplayEventTypeEXT.html) value

[VK_EXT_display_control](VK_EXT_display_control.html), [VkDisplayEventTypeEXT](VkDisplayEventTypeEXT.html), [VkStructureType](VkStructureType.html), [vkRegisterDisplayEventEXT](vkRegisterDisplayEventEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkDisplayEventInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
