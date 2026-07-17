# VkPastPresentationTimingPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPastPresentationTimingPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPastPresentationTimingPropertiesEXT - Structure containing details about a swapchain past presentation activity

The `VkPastPresentationTimingPropertiesEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPastPresentationTimingPropertiesEXT {
    VkStructureType                 sType;
    void*                           pNext;
    uint64_t                        timingPropertiesCounter;
    uint64_t                        timeDomainsCounter;
    uint32_t                        presentationTimingCount;
    VkPastPresentationTimingEXT*    pPresentationTimings;
} VkPastPresentationTimingPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`timingPropertiesCounter` is a 64-bit unsigned integer set by the
implementation to the current value of the swapchain’s internal timing
properties counter.

* 
`timeDomainsCounter` is a 64-bit unsigned integer set by the
implementation to the current value of the swapchain’s internal time
domains list counter.

* 
`presentationTimingCount` is an integer related to the number of
[VkPastPresentationTimingEXT](VkPastPresentationTimingEXT.html) structures available or queried, as
described below.

* 
`pPresentationTimings` is `NULL` or a pointer to an array of
[VkPastPresentationTimingEXT](VkPastPresentationTimingEXT.html) structures.

When calling [vkGetPastPresentationTimingEXT](vkGetPastPresentationTimingEXT.html), if
`pPresentationTimings` is `NULL`, then the number of available timing
records for the given `swapchain` is returned in
`presentationTimingCount`.
Otherwise, `presentationTimingCount` **must** specify the number of
elements in the `pPresentationTimings` array, and on return is
overwritten with the number of structures actually written to
`pPresentationTimings`.

if [VK_PAST_PRESENTATION_TIMING_ALLOW_PARTIAL_RESULTS_BIT_EXT](VkPastPresentationTimingFlagBitsEXT.html) is
specified in [VkPastPresentationTimingInfoEXT](VkPastPresentationTimingInfoEXT.html)::`flags`,
`vkGetPastPresentationTimingEXT` **may** return incomplete results,
containing only information for a subset of the requested present stages.
Further calls to `vkGetPastPresentationTimingEXT` will keep providing
all available results for a previously incomplete entry until it is
complete.

The implementation **must** return a [VkPastPresentationTimingEXT](VkPastPresentationTimingEXT.html) for
every [vkQueuePresentKHR](vkQueuePresentKHR.html) referencing `swapchain` where a non-zero
[VkPresentTimingInfoEXT](VkPresentTimingInfoEXT.html)::`presentStageQueries` was specified and at
least one present stage has available results.

Valid Usage (Implicit)

* 
[](#VUID-VkPastPresentationTimingPropertiesEXT-sType-sType) VUID-VkPastPresentationTimingPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PAST_PRESENTATION_TIMING_PROPERTIES_EXT](VkStructureType.html)

* 
[](#VUID-VkPastPresentationTimingPropertiesEXT-pNext-pNext) VUID-VkPastPresentationTimingPropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkPastPresentationTimingEXT](VkPastPresentationTimingEXT.html), [VkStructureType](VkStructureType.html), [vkGetPastPresentationTimingEXT](vkGetPastPresentationTimingEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPastPresentationTimingPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
