# VkSharedPresentSurfaceCapabilities2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSharedPresentSurfaceCapabilities2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSharedPresentSurfaceCapabilities2KHR - Structure describing capabilities of a surface for shared presentation

The `VkSharedPresentSurfaceCapabilities2KHR` structure is defined as:

// Provided by VK_KHR_extended_flags with VK_KHR_shared_presentable_image
typedef struct VkSharedPresentSurfaceCapabilities2KHR {
    VkStructureType          sType;
    void*                    pNext;
    VkImageUsageFlags2KHR    sharedPresentSupportedUsageFlags;
} VkSharedPresentSurfaceCapabilities2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sharedPresentSupportedUsageFlags` is a bitmask of
[VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html) representing the ways the application
**can** use the shared presentable image from a swapchain created with
[VkPresentModeKHR](VkPresentModeKHR.html) set to
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html) or
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html) for the surface on
the specified device.
[VK_IMAGE_USAGE_2_COLOR_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits2KHR.html) **must** be included in the
set but implementations **may** support additional usages.

This structure **can** be included in the `pNext` chain of
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html) to determine supported usage when using
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html) or
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html) presentation mode.

Valid Usage (Implicit)

* 
[](#VUID-VkSharedPresentSurfaceCapabilities2KHR-sType-sType) VUID-VkSharedPresentSurfaceCapabilities2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHARED_PRESENT_SURFACE_CAPABILITIES_2_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_KHR_extended_flags](VK_KHR_extended_flags.html), [VK_KHR_shared_presentable_image](VK_KHR_shared_presentable_image.html), [VkImageUsageFlags2KHR](VkImageUsageFlags2KHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSharedPresentSurfaceCapabilities2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
