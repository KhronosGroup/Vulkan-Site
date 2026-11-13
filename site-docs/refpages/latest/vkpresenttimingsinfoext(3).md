# VkPresentTimingsInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentTimingsInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentTimingsInfoEXT - Array of VkPresentTimingInfoEXT to chain with VkPresentInfoKHR

When the [`presentAtAbsoluteTime`](../../../../spec/latest/chapters/features.html#features-presentAtAbsoluteTime) or
[`presentAtRelativeTime`](../../../../spec/latest/chapters/features.html#features-presentAtRelativeTime) feature is
enabled, an application **can** instruct the presentation engine to attempt to
display an image at a specified time, or for a minimum duration, by
including the `VkPresentTimingsInfoEXT` structure in the `pNext`
chain of the [VkPresentInfoKHR](VkPresentInfoKHR.html) structure.

The `VkPresentTimingsInfoEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPresentTimingsInfoEXT {
    VkStructureType                  sType;
    const void*                      pNext;
    uint32_t                         swapchainCount;
    const VkPresentTimingInfoEXT*    pTimingInfos;
} VkPresentTimingsInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to by
this command.

* 
`pTimingInfos` is `NULL` or a pointer to an array of
`VkPresentTimingInfoEXT` elements with `swapchainCount` entries.
If not `NULL`, each element of `pTimingInfos` contains timing
information for the presentation of the image corresponding to the entry
in the `VkPresentInfoKHR`::`pImageIndices` array.

Valid Usage

* 
[](#VUID-VkPresentTimingsInfoEXT-swapchainCount-12233) VUID-VkPresentTimingsInfoEXT-swapchainCount-12233

`swapchainCount` **must** be equal to
[VkPresentInfoKHR](VkPresentInfoKHR.html)::`swapchainCount`

* 
[](#VUID-VkPresentTimingsInfoEXT-pSwapchains-12234) VUID-VkPresentTimingsInfoEXT-pSwapchains-12234

All swapchains in [VkPresentInfoKHR](VkPresentInfoKHR.html)::`pSwapchains` **must** have
been created with the [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)::`flags` field
containing [VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT](VkSwapchainCreateFlagBitsKHR.html)

* 
[](#VUID-VkPresentTimingsInfoEXT-pSwapchains-12235) VUID-VkPresentTimingsInfoEXT-pSwapchains-12235

For each member of `VkPresentInfoKHR`::`pSwapchains`, if the
associated [VkPresentTimingInfoEXT](VkPresentTimingInfoEXT.html)::`targetTime` is not zero,
the swapchain’s current present mode **must** be
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VkPresentModeKHR.html),
[VK_PRESENT_MODE_FIFO_KHR](VkPresentModeKHR.html) or [VK_PRESENT_MODE_FIFO_RELAXED_KHR](VkPresentModeKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPresentTimingsInfoEXT-sType-sType) VUID-VkPresentTimingsInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_TIMINGS_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPresentTimingsInfoEXT-pTimingInfos-parameter) VUID-VkPresentTimingsInfoEXT-pTimingInfos-parameter

 If `pTimingInfos` is not `NULL`, `pTimingInfos` **must** be a valid pointer to an array of `swapchainCount` valid [VkPresentTimingInfoEXT](VkPresentTimingInfoEXT.html) structures

* 
[](#VUID-VkPresentTimingsInfoEXT-swapchainCount-arraylength) VUID-VkPresentTimingsInfoEXT-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](VkPresentInfoKHR.html)

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkPresentTimingInfoEXT](VkPresentTimingInfoEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentTimingsInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
