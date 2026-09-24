# VkPresentRegionKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentRegionKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentRegionKHR - Structure containing rectangular region changed by vkQueuePresentKHR for a given VkImage

For a given image and swapchain, the region to present is specified by the
`VkPresentRegionKHR` structure, which is defined as:

// Provided by VK_KHR_incremental_present
typedef struct VkPresentRegionKHR {
    uint32_t                 rectangleCount;
    const VkRectLayerKHR*    pRectangles;
} VkPresentRegionKHR;

* 
`rectangleCount` is the number of rectangles in `pRectangles`,
or zero if the entire image has changed and should be presented.

* 
`pRectangles` is either `NULL` or a pointer to an array of
`VkRectLayerKHR` structures.
The `VkRectLayerKHR` structure is the framebuffer coordinates, plus
layer, of a portion of a presentable image that has changed and **must** be
presented.
If non-`NULL`, each entry in `pRectangles` is a rectangle of the
given image that has changed since the last image was presented to the
given swapchain.
The rectangles **must** be specified relative to
[VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`currentTransform`, regardless of
the swapchain’s `preTransform`.
The presentation engine will apply the `preTransform` transformation
to the rectangles, along with any further transformation it applies to
the image content.

Valid Usage (Implicit)

* 
[](#VUID-VkPresentRegionKHR-pRectangles-parameter) VUID-VkPresentRegionKHR-pRectangles-parameter

 If `rectangleCount` is not `0`, and `pRectangles` is not `NULL`, `pRectangles` **must** be a valid pointer to an array of `rectangleCount` valid [VkRectLayerKHR](VkRectLayerKHR.html) structures

[VK_KHR_incremental_present](VK_KHR_incremental_present.html), [VkPresentRegionsKHR](VkPresentRegionsKHR.html), [VkRectLayerKHR](VkRectLayerKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentRegionKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
