# VkPresentTimingInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentTimingInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentTimingInfoEXT - Specifies per-present timing information

The `VkPresentTimingInfoEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPresentTimingInfoEXT {
    VkStructureType                sType;
    const void*                    pNext;
    VkPresentTimingInfoFlagsEXT    flags;
    uint64_t                       targetTime;
    uint64_t                       timeDomainId;
    VkPresentStageFlagsEXT         presentStageQueries;
    VkPresentStageFlagsEXT         targetTimeDomainPresentStage;
} VkPresentTimingInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPresentTimingInfoFlagBitsEXT](VkPresentTimingInfoFlagBitsEXT.html)
specifying options for how to interpret the timing information.

* 
`targetTime` is zero or a value specifying the target present time
or duration, in nanoseconds, of the presentation request.

* 
`timeDomainId` is the id of the time domain used to specify the
absolute target present time and the timing results obtained in a
subsequent [vkGetPastPresentationTimingEXT](vkGetPastPresentationTimingEXT.html) call for the current
presentation request.

* 
`presentStageQueries` is zero or a valid
[VkPresentStageFlagsEXT](VkPresentStageFlagsEXT.html) value indicating which present stages the
presentation engine will collect timing information for.

* 
`targetTimeDomainPresentStage` is a valid
[VkPresentStageFlagsEXT](VkPresentStageFlagsEXT.html) specifying a single present stage used to
interpret `targetTime`.

If `targetTime` is not zero, the implementation attempts to align the
[VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_VISIBLE_BIT_EXT](VkPresentStageFlagBitsEXT.html) present stage of
that presentation request with the time specified in `targetTime`
according to the time domain used.
If [VK_PRESENT_TIMING_INFO_PRESENT_AT_NEAREST_REFRESH_CYCLE_BIT_EXT](VkPresentTimingInfoFlagBitsEXT.html) is
not set in `flags`, it indicates that the application would strictly
prefer the image to not be visible before `targetTime` has lapsed.

If `targetTime` is not zero and `timeDomainId` is associated with a
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](VkTimeDomainKHR.html) time domain,
`targetTimeDomainPresentStage` is used to specify which present stage’s
time domain `targetTime` is specified for.
Otherwise, `targetTimeDomainPresentStage` is ignored.

If `presentStageQueries` is not zero, a slot in the swapchain’s internal
results queue is reserved to hold the requested present timing data until
the application retrieves them.
If no slots are available, presentation fails and returns
[VK_ERROR_PRESENT_TIMING_QUEUE_FULL_EXT](VkResult.html).

|  | Some platforms, due to hardware or system limitations, **may** not be able to
| --- | --- |
accurately time `targetTime` with the actual physical event of the image
becoming visible on the display.
However, those timing capabilities **may** still be useful and result in
improved animation quality.

As such, the [`presentAtAbsoluteTime`](../../../../spec/latest/chapters/features.html#features-presentAtAbsoluteTime)
and [`presentAtRelativeTime`](../../../../spec/latest/chapters/features.html#features-presentAtRelativeTime) features
do not provide a strict guarantee regarding the completion of the
[VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_VISIBLE_BIT_EXT](VkPresentStageFlagBitsEXT.html) present stage
relative to the `targetTime`, and implementations **must** strive to make
it as consistent and accurate as possible. |

|  | Applications that specify an absolute present time **should** regularly rebase
| --- | --- |
their calculations for their next target time on the feedback from
[vkGetPastPresentationTimingEXT](vkGetPastPresentationTimingEXT.html) to compensate for accumulated precision
errors or potential clock drift.
It is recommended that when targeting the time of a vertical blanking
period, applications set
[VK_PRESENT_TIMING_INFO_PRESENT_AT_NEAREST_REFRESH_CYCLE_BIT_EXT](VkPresentTimingInfoFlagBitsEXT.html) to
allow the implementation to compensate for small precision errors that may
cause an image to be displayed one refresh cycle later than intended.

Some implementations **may** not provide timing data for the
[VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_VISIBLE_BIT_EXT](VkPresentStageFlagBitsEXT.html) present stage.
Applications **should** use the supported present stage nearest to it to
compute a desired target presentation time. |

Valid Usage

* 
[](#VUID-VkPresentTimingInfoEXT-targetTime-12236) VUID-VkPresentTimingInfoEXT-targetTime-12236

If `targetTime` is not zero and `flags` does not contain
[VK_PRESENT_TIMING_INFO_PRESENT_AT_RELATIVE_TIME_BIT_EXT](VkPresentTimingInfoFlagBitsEXT.html), the
[`presentAtAbsoluteTime`](../../../../spec/latest/chapters/features.html#features-presentAtAbsoluteTime) feature
**must** be enabled and the `presentAtAbsoluteTimeSupported` member of
the `VkPresentTimingSurfaceCapabilitiesEXT` returned by
`vkGetPhysicalDeviceSurfaceCapabilities2KHR` for the surface
associated with the swapchain **must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkPresentTimingInfoEXT-targetTime-12237) VUID-VkPresentTimingInfoEXT-targetTime-12237

If `targetTime` is not zero and `flags` contains
[VK_PRESENT_TIMING_INFO_PRESENT_AT_RELATIVE_TIME_BIT_EXT](VkPresentTimingInfoFlagBitsEXT.html), the
[`presentAtRelativeTime`](../../../../spec/latest/chapters/features.html#features-presentAtRelativeTime) feature
**must** be enabled and the `presentAtRelativeTimeSupported` member of
the `VkPresentTimingSurfaceCapabilitiesEXT` returned by
`vkGetPhysicalDeviceSurfaceCapabilities2KHR` for the surface
associated with the swapchain **must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkPresentTimingInfoEXT-timeDomainId-12238) VUID-VkPresentTimingInfoEXT-timeDomainId-12238

If `timeDomainId` is associated with a
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](VkTimeDomainKHR.html) time domain, and
`targetTime` is not zero, `targetTimeDomainPresentStage` **must**
be a single `VkPresentStageFlagsEXT` value

* 
[](#VUID-VkPresentTimingInfoEXT-timeDomainId-12400) VUID-VkPresentTimingInfoEXT-timeDomainId-12400

`timeDomainId` **must** be an id previously returned by
[vkGetSwapchainTimeDomainPropertiesEXT](vkGetSwapchainTimeDomainPropertiesEXT.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPresentTimingInfoEXT-sType-sType) VUID-VkPresentTimingInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_TIMING_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPresentTimingInfoEXT-pNext-pNext) VUID-VkPresentTimingInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPresentTimingInfoEXT-flags-parameter) VUID-VkPresentTimingInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkPresentTimingInfoFlagBitsEXT](VkPresentTimingInfoFlagBitsEXT.html) values

* 
[](#VUID-VkPresentTimingInfoEXT-presentStageQueries-parameter) VUID-VkPresentTimingInfoEXT-presentStageQueries-parameter

 `presentStageQueries` **must** be a valid combination of [VkPresentStageFlagBitsEXT](VkPresentStageFlagBitsEXT.html) values

* 
[](#VUID-VkPresentTimingInfoEXT-targetTimeDomainPresentStage-parameter) VUID-VkPresentTimingInfoEXT-targetTimeDomainPresentStage-parameter

 `targetTimeDomainPresentStage` **must** be a valid combination of [VkPresentStageFlagBitsEXT](VkPresentStageFlagBitsEXT.html) values

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkPresentStageFlagsEXT](VkPresentStageFlagsEXT.html), [VkPresentTimingInfoFlagsEXT](VkPresentTimingInfoFlagsEXT.html), [VkPresentTimingsInfoEXT](VkPresentTimingsInfoEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentTimingInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
