# VkDisplayPresentInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayPresentInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayPresentInfoKHR - Structure describing parameters of a queue presentation to a swapchain

The `VkDisplayPresentInfoKHR` structure is defined as:

// Provided by VK_KHR_display_swapchain
typedef struct VkDisplayPresentInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkRect2D           srcRect;
    VkRect2D           dstRect;
    VkBool32           persistent;
} VkDisplayPresentInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcRect` is a rectangular region of pixels to present.
It **must** be a subset of the image being presented.
If `VkDisplayPresentInfoKHR` is not specified, this region will be
assumed to be the entire presentable image.

* 
`dstRect` is a rectangular region within the visible region of the
swapchain’s display mode.
If `VkDisplayPresentInfoKHR` is not specified, this region will be
assumed to be the entire visible region of the swapchain’s mode.
If the specified rectangle is a subset of the display mode’s visible
region, content from display planes below the swapchain’s plane will be
visible outside the rectangle.
If there are no planes below the swapchain’s, the area outside the
specified rectangle will be black.
If portions of the specified rectangle are outside of the display’s
visible region, pixels mapping only to those portions of the rectangle
will be discarded.

* 
`persistent`: If this is [VK_TRUE](VK_TRUE.html), the display engine will
enable buffered mode on displays that support it.
This allows the display engine to stop sending content to the display
until a new image is presented.
The display will instead maintain a copy of the last presented image.
This allows less power to be used, but **may** increase presentation
latency.
If `VkDisplayPresentInfoKHR` is not specified, persistent mode will
not be used.

If the extent of the `srcRect` and `dstRect` are not equal, the
presented pixels will be scaled accordingly.

Valid Usage

* 
[](#VUID-VkDisplayPresentInfoKHR-srcRect-01257) VUID-VkDisplayPresentInfoKHR-srcRect-01257

`srcRect` **must** specify a rectangular region that is a subset of the
image being presented

* 
[](#VUID-VkDisplayPresentInfoKHR-dstRect-01258) VUID-VkDisplayPresentInfoKHR-dstRect-01258

`dstRect` **must** specify a rectangular region that is a subset of the
`visibleRegion` parameter of the display mode the swapchain being
presented uses

* 
[](#VUID-VkDisplayPresentInfoKHR-persistentContent-01259) VUID-VkDisplayPresentInfoKHR-persistentContent-01259

If the `persistentContent` member of the
`VkDisplayPropertiesKHR` structure returned by
`vkGetPhysicalDeviceDisplayPropertiesKHR` for the display the
present operation targets is [VK_FALSE](VK_FALSE.html), then `persistent` **must**
be [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayPresentInfoKHR-sType-sType) VUID-VkDisplayPresentInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_PRESENT_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](VkPresentInfoKHR.html)

[VK_KHR_display_swapchain](VK_KHR_display_swapchain.html), `VkBool32`, [VkRect2D](VkRect2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayPresentInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
