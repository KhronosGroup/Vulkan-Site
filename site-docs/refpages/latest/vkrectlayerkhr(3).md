# VkRectLayerKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRectLayerKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRectLayerKHR - Structure containing a rectangle, including layer, changed by vkQueuePresentKHR for a given VkImage

The `VkRectLayerKHR` structure is defined as:

// Provided by VK_KHR_incremental_present
typedef struct VkRectLayerKHR {
    VkOffset2D    offset;
    VkExtent2D    extent;
    uint32_t      layer;
} VkRectLayerKHR;

* 
`offset` is the origin of the rectangle, in pixels.

* 
`extent` is the size of the rectangle, in pixels.

* 
`layer` is the layer of the image.
For images with only one layer, the value of `layer` **must** be 0.

Some platforms allow the size of a surface to change, and then scale the
pixels of the image to fit the surface.
`VkRectLayerKHR` specifies pixels of the swapchain’s image(s), which
will be constant for the life of the swapchain.

Valid Usage

* 
[](#VUID-VkRectLayerKHR-offset-04864) VUID-VkRectLayerKHR-offset-04864

The sum of `offset` and `extent`, after being transformed
according to the `preTransform` member of the
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) structure, **must** be no greater than the
`imageExtent` member of the [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) structure
passed to [vkCreateSwapchainKHR](vkCreateSwapchainKHR.html)

* 
[](#VUID-VkRectLayerKHR-layer-01262) VUID-VkRectLayerKHR-layer-01262

`layer` **must** be less than the `imageArrayLayers` member of the
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) structure passed to
[vkCreateSwapchainKHR](vkCreateSwapchainKHR.html)

[VK_KHR_incremental_present](VK_KHR_incremental_present.html), [VkExtent2D](VkExtent2D.html), [VkOffset2D](VkOffset2D.html), [VkPresentRegionKHR](VkPresentRegionKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkRectLayerKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
