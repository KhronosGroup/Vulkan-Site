# VkSwapchainPresentModesCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainPresentModesCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainPresentModesCreateInfoKHR - All presentation modes usable by the swapchain

Applications **can** modify the presentation mode used by the swapchain on a
per-presentation basis.
However, all presentation modes the application intends to use with the
swapchain **must** be specified at swapchain creation time.
To specify more than one presentation mode when creating a swapchain,
include the `VkSwapchainPresentModesCreateInfoKHR` structure in the
`pNext` chain of the [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) structure.

The `VkSwapchainPresentModesCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain_maintenance1
typedef struct VkSwapchainPresentModesCreateInfoKHR {
    VkStructureType            sType;
    const void*                pNext;
    uint32_t                   presentModeCount;
    const VkPresentModeKHR*    pPresentModes;
} VkSwapchainPresentModesCreateInfoKHR;

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to VkSwapchainPresentModesCreateInfoKHR
typedef VkSwapchainPresentModesCreateInfoKHR VkSwapchainPresentModesCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentModeCount` is the number of presentation modes provided.

* 
`pPresentModes` is a list of presentation modes with
`presentModeCount` entries

Valid Usage

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-None-07762) VUID-VkSwapchainPresentModesCreateInfoKHR-None-07762

Each entry in pPresentModes **must** be one of the [VkPresentModeKHR](VkPresentModeKHR.html)
values returned by `vkGetPhysicalDeviceSurfacePresentModesKHR` for
the surface

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-presentModeFifoLatestReady-10160) VUID-VkSwapchainPresentModesCreateInfoKHR-presentModeFifoLatestReady-10160

If the [    `presentModeFifoLatestReady`](../../../../spec/latest/chapters/features.html#features-presentModeFifoLatestReady) feature is not enabled, pPresentModes
**must** not contain [VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VkPresentModeKHR.html)

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-pPresentModes-07763) VUID-VkSwapchainPresentModesCreateInfoKHR-pPresentModes-07763

The entries in pPresentModes **must** be a subset of the present modes
returned in
[VkSurfacePresentModeCompatibilityKHR](VkSurfacePresentModeCompatibilityKHR.html)::`pPresentModes`, given
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)::`presentMode` in
[VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html)

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-presentMode-07764) VUID-VkSwapchainPresentModesCreateInfoKHR-presentMode-07764

[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)::`presentMode` **must** be included in
`pPresentModes`

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-sType-sType) VUID-VkSwapchainPresentModesCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_MODES_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-pPresentModes-parameter) VUID-VkSwapchainPresentModesCreateInfoKHR-pPresentModes-parameter

 `pPresentModes` **must** be a valid pointer to an array of `presentModeCount` valid [VkPresentModeKHR](VkPresentModeKHR.html) values

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-presentModeCount-arraylength) VUID-VkSwapchainPresentModesCreateInfoKHR-presentModeCount-arraylength

 `presentModeCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

[VK_EXT_swapchain_maintenance1](VK_EXT_swapchain_maintenance1.html), [VK_KHR_swapchain_maintenance1](VK_KHR_swapchain_maintenance1.html), [VkPresentModeKHR](VkPresentModeKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainPresentModesCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
