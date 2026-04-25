# VkPresentRegionsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentRegionsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentRegionsKHR - Structure hint of rectangular regions changed by vkQueuePresentKHR

When the `[VK_KHR_incremental_present](VK_KHR_incremental_present.html)` extension is enabled,
additional fields **can** be specified that allow an application to specify
that only certain rectangular regions of the presentable images of a
swapchain are changed.
This is an optimization hint that a presentation engine **may** use to only
update the region of a surface that is actually changing.
The application still **must** ensure that all pixels of a presented image
contain the desired values, in case the presentation engine ignores this
hint.
An application **can** provide this hint by adding a `VkPresentRegionsKHR`
structure to the `pNext` chain of the `VkPresentInfoKHR` structure.

The `VkPresentRegionsKHR` structure is defined as:

// Provided by VK_KHR_incremental_present
typedef struct VkPresentRegionsKHR {
    VkStructureType              sType;
    const void*                  pNext;
    uint32_t                     swapchainCount;
    const VkPresentRegionKHR*    pRegions;
} VkPresentRegionsKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to by
this command.

* 
`pRegions` is `NULL` or a pointer to an array of
`VkPresentRegionKHR` elements with `swapchainCount` entries.
If not `NULL`, each element of `pRegions` contains the region that
has changed since the last present to the swapchain in the corresponding
entry in the `VkPresentInfoKHR`::`pSwapchains` array.

Valid Usage

* 
[](#VUID-VkPresentRegionsKHR-swapchainCount-01260) VUID-VkPresentRegionsKHR-swapchainCount-01260

`swapchainCount` **must** be the same value as
`VkPresentInfoKHR`::`swapchainCount`, where
`VkPresentInfoKHR` is included in the `pNext` chain of this
`VkPresentRegionsKHR` structure

Valid Usage (Implicit)

* 
[](#VUID-VkPresentRegionsKHR-sType-sType) VUID-VkPresentRegionsKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_REGIONS_KHR](VkStructureType.html)

* 
[](#VUID-VkPresentRegionsKHR-pRegions-parameter) VUID-VkPresentRegionsKHR-pRegions-parameter

 If `pRegions` is not `NULL`, `pRegions` **must** be a valid pointer to an array of `swapchainCount` valid [VkPresentRegionKHR](VkPresentRegionKHR.html) structures

* 
[](#VUID-VkPresentRegionsKHR-swapchainCount-arraylength) VUID-VkPresentRegionsKHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](VkPresentInfoKHR.html)

[VK_KHR_incremental_present](VK_KHR_incremental_present.html), [VkPresentRegionKHR](VkPresentRegionKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentRegionsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
