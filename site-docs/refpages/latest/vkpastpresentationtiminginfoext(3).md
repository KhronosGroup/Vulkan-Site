# VkPastPresentationTimingInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPastPresentationTimingInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPastPresentationTimingInfoEXT - Structure specifying swapchain present timing query parameters

The `VkPastPresentationTimingInfoEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPastPresentationTimingInfoEXT {
    VkStructureType                     sType;
    const void*                         pNext;
    VkPastPresentationTimingFlagsEXT    flags;
    VkSwapchainKHR                      swapchain;
} VkPastPresentationTimingInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPastPresentationTimingFlagBitsEXT](VkPastPresentationTimingFlagBitsEXT.html)
specifying options for queries of past presentation timing information.

* 
`swapchain` is the swapchain to obtain presentation timing
information for.

Valid Usage (Implicit)

* 
[](#VUID-VkPastPresentationTimingInfoEXT-sType-sType) VUID-VkPastPresentationTimingInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PAST_PRESENTATION_TIMING_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPastPresentationTimingInfoEXT-pNext-pNext) VUID-VkPastPresentationTimingInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPastPresentationTimingInfoEXT-flags-parameter) VUID-VkPastPresentationTimingInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkPastPresentationTimingFlagBitsEXT](VkPastPresentationTimingFlagBitsEXT.html) values

* 
[](#VUID-VkPastPresentationTimingInfoEXT-swapchain-parameter) VUID-VkPastPresentationTimingInfoEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkPastPresentationTimingFlagsEXT](VkPastPresentationTimingFlagsEXT.html), [VkStructureType](VkStructureType.html), [VkSwapchainKHR](VkSwapchainKHR.html), [vkGetPastPresentationTimingEXT](vkGetPastPresentationTimingEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPastPresentationTimingInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
