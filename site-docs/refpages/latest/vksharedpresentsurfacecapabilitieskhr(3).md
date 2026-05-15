# VkSharedPresentSurfaceCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSharedPresentSurfaceCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSharedPresentSurfaceCapabilitiesKHR - Structure describing capabilities of a surface for shared presentation

The `VkSharedPresentSurfaceCapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_shared_presentable_image
typedef struct VkSharedPresentSurfaceCapabilitiesKHR {
    VkStructureType      sType;
    void*                pNext;
    VkImageUsageFlags    sharedPresentSupportedUsageFlags;
} VkSharedPresentSurfaceCapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sharedPresentSupportedUsageFlags` is a bitmask of
[VkImageUsageFlagBits](VkImageUsageFlagBits.html) representing the ways the application **can**
use the shared presentable image from a swapchain created with
[VkPresentModeKHR](VkPresentModeKHR.html) set to
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html) or
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html) for the surface on
the specified device.
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) **must** be included in the set
but implementations **may** support additional usages.

Valid Usage (Implicit)

* 
[](#VUID-VkSharedPresentSurfaceCapabilitiesKHR-sType-sType) VUID-VkSharedPresentSurfaceCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHARED_PRESENT_SURFACE_CAPABILITIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_KHR_shared_presentable_image](VK_KHR_shared_presentable_image.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSharedPresentSurfaceCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
