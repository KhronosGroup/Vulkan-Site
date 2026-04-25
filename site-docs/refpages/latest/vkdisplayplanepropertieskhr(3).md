# VkDisplayPlanePropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayPlanePropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayPlanePropertiesKHR - Structure describing display plane properties

The `VkDisplayPlanePropertiesKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplayPlanePropertiesKHR {
    VkDisplayKHR    currentDisplay;
    uint32_t        currentStackIndex;
} VkDisplayPlanePropertiesKHR;

* 
`currentDisplay` is the handle of the display the plane is currently
associated with.
If the plane is not currently attached to any displays, this will be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html).

* 
`currentStackIndex` is the current z-order of the plane.
This will be between 0 and the value returned by
`vkGetPhysicalDeviceDisplayPlanePropertiesKHR` in
`pPropertyCount`.

[VK_KHR_display](VK_KHR_display.html), [VkDisplayKHR](VkDisplayKHR.html), [VkDisplayPlaneProperties2KHR](VkDisplayPlaneProperties2KHR.html), [vkGetPhysicalDeviceDisplayPlanePropertiesKHR](vkGetPhysicalDeviceDisplayPlanePropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayPlanePropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
