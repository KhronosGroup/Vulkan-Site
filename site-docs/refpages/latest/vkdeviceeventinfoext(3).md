# VkDeviceEventInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceEventInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceEventInfoEXT - Describe a device event to create

The `VkDeviceEventInfoEXT` structure is defined as:

// Provided by VK_EXT_display_control
typedef struct VkDeviceEventInfoEXT {
    VkStructureType         sType;
    const void*             pNext;
    VkDeviceEventTypeEXT    deviceEvent;
} VkDeviceEventInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceEvent` is a [VkDeviceEventTypeEXT](VkDeviceEventTypeEXT.html) value specifying when
the fence will be signaled.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceEventInfoEXT-sType-sType) VUID-VkDeviceEventInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_EVENT_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDeviceEventInfoEXT-pNext-pNext) VUID-VkDeviceEventInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceEventInfoEXT-deviceEvent-parameter) VUID-VkDeviceEventInfoEXT-deviceEvent-parameter

 `deviceEvent` **must** be a valid [VkDeviceEventTypeEXT](VkDeviceEventTypeEXT.html) value

[VK_EXT_display_control](VK_EXT_display_control.html), [VkDeviceEventTypeEXT](VkDeviceEventTypeEXT.html), [VkStructureType](VkStructureType.html), [vkRegisterDeviceEventEXT](vkRegisterDeviceEventEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkDeviceEventInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
