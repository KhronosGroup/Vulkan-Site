# VkDisplayEventTypeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayEventTypeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayEventTypeEXT - Events that can occur on a display object

Possible values of [VkDisplayEventInfoEXT](VkDisplayEventInfoEXT.html)::`displayEvent`,
specifying when a fence will be signaled, are:

// Provided by VK_EXT_display_control
typedef enum VkDisplayEventTypeEXT {
    VK_DISPLAY_EVENT_TYPE_FIRST_PIXEL_OUT_EXT = 0,
} VkDisplayEventTypeEXT;

* 
[VK_DISPLAY_EVENT_TYPE_FIRST_PIXEL_OUT_EXT](#) specifies that the fence
is signaled when the first pixel of the next display refresh cycle
leaves the display engine for the display.

[VK_EXT_display_control](VK_EXT_display_control.html), [VkDisplayEventInfoEXT](VkDisplayEventInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkDisplayEventTypeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
