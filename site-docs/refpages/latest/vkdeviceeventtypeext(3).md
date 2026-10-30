# VkDeviceEventTypeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceEventTypeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceEventTypeEXT - Events that can occur on a device object

Possible values of [VkDeviceEventInfoEXT](VkDeviceEventInfoEXT.html)::`deviceEvent`, specifying
when a fence will be signaled, are:

// Provided by VK_EXT_display_control
typedef enum VkDeviceEventTypeEXT {
    VK_DEVICE_EVENT_TYPE_DISPLAY_HOTPLUG_EXT = 0,
} VkDeviceEventTypeEXT;

* 
[VK_DEVICE_EVENT_TYPE_DISPLAY_HOTPLUG_EXT](#) specifies that the fence
is signaled when a display is plugged into or unplugged from the
specified device.
Applications **can** use this notification to determine when they need to
re-enumerate the available displays on a device.

[VK_EXT_display_control](VK_EXT_display_control.html), [VkDeviceEventInfoEXT](VkDeviceEventInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkDeviceEventTypeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
