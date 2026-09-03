# VkPastPresentationTimingEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPastPresentationTimingEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPastPresentationTimingEXT - Structure containing timing information about a previously-presented image

The `VkPastPresentationTimingEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPastPresentationTimingEXT {
    VkStructureType           sType;
    void*                     pNext;
    uint64_t                  presentId;
    uint64_t                  targetTime;
    uint32_t                  presentStageCount;
    VkPresentStageTimeEXT*    pPresentStages;
    VkTimeDomainKHR           timeDomain;
    uint64_t                  timeDomainId;
    VkBool32                  reportComplete;
} VkPastPresentationTimingEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentId` is zero or a value that was given to a previous
`vkQueuePresentKHR` command via
[VkPresentId2KHR](VkPresentId2KHR.html)::`pPresentIds`.

* 
`targetTime` is the application-provided target absolute time or
duration of the associated presentation request in
[VkPresentTimingInfoEXT](VkPresentTimingInfoEXT.html)::`targetTime`.

* 
`presentStageCount` is a count of items contained in
`pPresentStages`.

* 
`pPresentStages` a pointer to an array of
[VkPresentStageTimeEXT](VkPresentStageTimeEXT.html) providing timing information for the
presentation request associated with `presentId`.

* 
`timeDomain` is the time domain used by the presentation engine to
report times in `pPresentStages`.

* 
`timeDomainId` is the id associated with `timeDomain`.

* 
`reportComplete` is [VK_TRUE](VK_TRUE.html) if the presentation engine has
reported all the requested results in `pPresentStages`.

When calling [vkGetPastPresentationTimingEXT](vkGetPastPresentationTimingEXT.html), the implementation sets
`presentStageCount` to the number of present stages it has written
results for.
If [VK_PAST_PRESENTATION_TIMING_ALLOW_PARTIAL_RESULTS_BIT_EXT](VkPastPresentationTimingFlagBitsEXT.html) was
specified in [VkPastPresentationTimingInfoEXT](VkPastPresentationTimingInfoEXT.html)::`flags`, the
implementation **may** return an incomplete report containing fewer present
stage results than were queried by the associated presentation request.
Otherwise, results for all the present stages queried by the presentation
request are written by the implementation.

Timing information for some present stages **may** have a time value of 0,
indicating that results for that present stage are not available.

For systems with multiple entities operating within the presentation engine,
such as multiple displays, `pPresentStages` will return timing results
for one entity which has been affected by the presentation.

`timeDomainId` **may** be different than the time domain that was specified
in `VkPresentTimingInfoEXT`::`timeDomainId` if the requirements for
using this time domain could not be met at the time the presentation engine
processed the presentation request.
In such a case, the presentation engine **may** pick a time domain to fall back
to, if one is available, and report results in that domain.
Applications **can** continue to use this fallback time domain in future
`vkQueuePresentKHR` calls, or they **can** call
[vkGetSwapchainTimeDomainPropertiesEXT](vkGetSwapchainTimeDomainPropertiesEXT.html) to choose from the currently
supported time domains.

Valid Usage (Implicit)

* 
[](#VUID-VkPastPresentationTimingEXT-sType-sType) VUID-VkPastPresentationTimingEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PAST_PRESENTATION_TIMING_EXT](VkStructureType.html)

* 
[](#VUID-VkPastPresentationTimingEXT-pNext-pNext) VUID-VkPastPresentationTimingEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_present_timing](VK_EXT_present_timing.html), `VkBool32`, [VkPastPresentationTimingPropertiesEXT](VkPastPresentationTimingPropertiesEXT.html), [VkPresentStageTimeEXT](VkPresentStageTimeEXT.html), [VkStructureType](VkStructureType.html), [VkTimeDomainKHR](VkTimeDomainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPastPresentationTimingEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
