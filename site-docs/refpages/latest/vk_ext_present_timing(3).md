# VK_EXT_present_timing(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_present_timing.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_present_timing](#VK_EXT_present_timing)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_present_timing - device extension

**Name String**

`VK_EXT_present_timing`

**Extension Type**

Device extension

**Registered Extension Number**

209

**Revision**

3

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

and

[VK_KHR_present_id2](VK_KHR_present_id2.html)

and

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html)

and

[VK_KHR_calibrated_timestamps](VK_KHR_calibrated_timestamps.html)

**Contact**

* 
Lionel Duc [nvlduc](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_present_timing] @nvlduc%0A*Here describe the issue or question you have about the VK_EXT_present_timing extension*)

**Extension Proposal**

[VK_EXT_present_timing](../../../../features/latest/features/proposals/VK_EXT_present_timing.html)

**Last Modified Date**

2024-10-09

**IP Status**

No known IP claims.

**Contributors**

* 
Ian Elliott, Google

* 
James Jones, NVIDIA

* 
Jeff Juliano, NVIDIA

* 
Daniel Rakos, AMD

* 
Daniel Stone, Collabora

* 
Daniel Vetter, Intel

* 
Aric Cyr, AMD

* 
Faith Ekstrand, Intel

* 
Nicolai Hähnle, AMD

* 
Alon Or-Bach, Samsung

* 
Niklas Smedberg, Unity Technologies

* 
Tobias Hector, AMD

* 
Lionel Duc, NVIDIA

* 
Lina Versace, Google

* 
Sebastian Wick, Red Hat

* 
Jakob Bornecrantz, Collabora

* 
David Kvasnica, NVIDIA

This device extension allows an application that uses the
`[VK_KHR_swapchain](VK_KHR_swapchain.html)` extension to obtain information about the
presentation engine’s display, to obtain timing information about each
present, and to schedule a present to happen no earlier than a desired time.
An application can use this to minimize various visual anomalies (e.g.
stuttering).

Traditional game and real-time animation applications need to correctly
position their geometry for when the presentable image will be presented to
the user.
To accomplish this, applications need various timing information about the
presentation engine’s display.
They need to know when presentable images were actually presented, and when
they could have been presented.
Applications also need to tell the presentation engine to display an image
no sooner than a given time.
This allows the application to avoid stuttering, so the animation looks
smooth to the user.

* 
[vkGetPastPresentationTimingEXT](vkGetPastPresentationTimingEXT.html)

* 
[vkGetSwapchainTimeDomainPropertiesEXT](vkGetSwapchainTimeDomainPropertiesEXT.html)

* 
[vkGetSwapchainTimingPropertiesEXT](vkGetSwapchainTimingPropertiesEXT.html)

* 
[vkSetSwapchainPresentTimingQueueSizeEXT](vkSetSwapchainPresentTimingQueueSizeEXT.html)

* 
[VkPastPresentationTimingEXT](VkPastPresentationTimingEXT.html)

* 
[VkPastPresentationTimingInfoEXT](VkPastPresentationTimingInfoEXT.html)

* 
[VkPastPresentationTimingPropertiesEXT](VkPastPresentationTimingPropertiesEXT.html)

* 
[VkPresentStageTimeEXT](VkPresentStageTimeEXT.html)

* 
[VkPresentTimingInfoEXT](VkPresentTimingInfoEXT.html)

* 
[VkSwapchainTimeDomainPropertiesEXT](VkSwapchainTimeDomainPropertiesEXT.html)

* 
[VkSwapchainTimingPropertiesEXT](VkSwapchainTimingPropertiesEXT.html)

* 
Extending [VkCalibratedTimestampInfoKHR](VkCalibratedTimestampInfoKHR.html):

[VkSwapchainCalibratedTimestampInfoEXT](VkSwapchainCalibratedTimestampInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDevicePresentTimingFeaturesEXT](VkPhysicalDevicePresentTimingFeaturesEXT.html)

Extending [VkPresentInfoKHR](VkPresentInfoKHR.html):

* 
[VkPresentTimingsInfoEXT](VkPresentTimingsInfoEXT.html)

Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

* 
[VkPresentTimingSurfaceCapabilitiesEXT](VkPresentTimingSurfaceCapabilitiesEXT.html)

* 
[VkPastPresentationTimingFlagBitsEXT](VkPastPresentationTimingFlagBitsEXT.html)

* 
[VkPresentStageFlagBitsEXT](VkPresentStageFlagBitsEXT.html)

* 
[VkPresentTimingInfoFlagBitsEXT](VkPresentTimingInfoFlagBitsEXT.html)

* 
[VkPastPresentationTimingFlagsEXT](VkPastPresentationTimingFlagsEXT.html)

* 
[VkPresentStageFlagsEXT](VkPresentStageFlagsEXT.html)

* 
[VkPresentTimingInfoFlagsEXT](VkPresentTimingInfoFlagsEXT.html)

* 
`VK_EXT_PRESENT_TIMING_EXTENSION_NAME`

* 
`VK_EXT_PRESENT_TIMING_SPEC_VERSION`

* 
Extending [VkResult](VkResult.html):

[VK_ERROR_PRESENT_TIMING_QUEUE_FULL_EXT](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PAST_PRESENTATION_TIMING_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PAST_PRESENTATION_TIMING_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PAST_PRESENTATION_TIMING_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_TIMING_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PRESENT_TIMINGS_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PRESENT_TIMING_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PRESENT_TIMING_SURFACE_CAPABILITIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SWAPCHAIN_CALIBRATED_TIMESTAMP_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SWAPCHAIN_TIME_DOMAIN_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SWAPCHAIN_TIMING_PROPERTIES_EXT](VkStructureType.html)

Extending [VkSwapchainCreateFlagBitsKHR](VkSwapchainCreateFlagBitsKHR.html):

* 
[VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT](VkSwapchainCreateFlagBitsKHR.html)

Extending [VkTimeDomainKHR](VkTimeDomainKHR.html):

* 
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](VkTimeDomainKHR.html)

* 
[VK_TIME_DOMAIN_SWAPCHAIN_LOCAL_EXT](VkTimeDomainKHR.html)

1) How does the application determine refresh duration, quanta for change,
whether FRR vs. VRR, etc.

The query returns two values: 1) a refresh-cycle duration
(`refreshDuration`), and 2) an indication whether the timing is
currently fixed (FRR) or variable (VRR).
If `refreshDuration` is zero, the platform cannot supply these values
until after at least one [vkQueuePresentKHR](vkQueuePresentKHR.html) has been done, from this
time (e.g. if [vkQueuePresentKHR](vkQueuePresentKHR.html) has been previously called for this
swapchain, at least one additional call must be made).
After calling [vkQueuePresentKHR](vkQueuePresentKHR.html), the query can be repeated until
`refreshDuration` is non-zero, at which point the FRR vs. VRR indication
will also be valid.

If the presentation engine’s `refreshDuration` is a fixed value, the
application’s image present duration (IPD) should be a multiple of
`refreshDuration`.
That is, the quanta for changing the IPD is `refreshDuration`.
For example, if `refreshDuration` is 16.67ms, the IPD can be 16.67ms,
33.33ms, 50.0ms, etc.

If the presentation engine’s `refreshDuration` is variable,
`refreshDuration` is the minimum value of the application’s IPD, and the
IPD can be larger by any quanta that is meaningful to the application.
For example, if the `refreshDuration` is 10ms (i.e. the maximum refresh
rate is 100Hz), the application can choose an IPD of 11ms, 13.33ms, 13.5ms,
or 66.0ms; any value greater than or equal to 10ms is valid.
There may be negative consequences for choosing an IPD that is too high, as
the presentation engine may actually have a practical maximum
`refreshDuration`, where it needs to display the previous image again,
and during this time the presentation engine might delay displaying a
newly-presented image.

FRR displays on at least one platform (Wayland) are not necessarily fixed;
but can change over time.
For example, if a full-screen video player application is visible, the
display may operate at a 24Hz refresh cycle; and then later switch to 60Hz
when multiple windows are visible.

VRR displays on some platforms can also be seen as having different
characteristics over time.
For example, if an application’s window is full-screen-exclusive (i.e. no
other window or window system component is visible), the display can look
like a VRR display (however that is defined).
If the application’s window is not full-screen-exclusive (e.g. a normal
multi-window case), the display can look like an FRR display (i.e. because
the compositor is trying to treat all windows in a consistent manner).
A different issue will deal with how the timing characteristics can change
over time.

2) Do we return min/max values for refresh duration for VRR?

Return only the minimum value of refreshDuration for a VRR.

VRR displays have a minimum and maximum refresh rate, and therefore a
minimum and maximum refreshDuration.
It has been asserted that the display effectively does not have a minimum
refresh rate.
That is because if an application does not present soon enough, the display
hardware will automatically re-display the previous image.
However, when the display does that, an application cannot present a new
image for a certain period of time.
It is unclear about whether that period is large enough to cause visual
artifacts.

3) How to deal with changes in timing properties?

**RESOLVED**: The [VkPastPresentationTimingPropertiesEXT](VkPastPresentationTimingPropertiesEXT.html) structure that
is returned by [vkGetPastPresentationTimingEXT](vkGetPastPresentationTimingEXT.html) contains
`timeDomainsCounter`, which is incremented if the time domain enabled
for the swapchain is not currently available.

An example of why display timing properties can change is if a surface
changes from being a window that’s a subset of the display size, to becoming
full-screen-exclusive.
While the surface was a subset of the display, a compositor might enforce
fixed timings on the surface (e.g. FRR of 60Hz), where the presentation
engine might be free to allow VRR behavior of a full-screen-exclusive
surface.

It is possible that a full-screen-exclusive window can become temporarily
obscured (e.g. when a short-term dialog pops up).
In this case, the surface might use FRR timings while the dialog is visible
and VRR otherwise.

4) One Query for all Timing info vs. an initial query to determine FRR vs.
VRR, and then FRR-specific vs VRR-specific queries?

**RESOLVED**: Have one query, as described in issue 1, that can be called
whenever the application needs to obtain the timing properties of the
surface.

5) Query to determine time domain?

**RESOLVED**: Have a query to determine the time domain.
This extension defines a basic swapchain-local time domain.
Other extensions can add other platform-specific time domains.

6) What time to use for targetPresentTime for early images?

**RESOLVED**: Have no query for determining the current time in the PE’s time
domain; and do allow the special value of zero for targetPresentTime,
meaning that there is no target.

On some platforms, there is no way to determine the current time, nor to
determine surface timing properties until after at least one image has been
presented.

In such cases, the special value of zero allows the application to indicate
that timing feedback is desired, but that no targetPresentTime is requested.
Later, once the application has obtained feedback, it can specify
targetPresentTime by using the result’s actualPresentTime.

7) How long before an application’s request for new image duration is
honored?

Apparently, changes to some vendors' display hardware settings do not take
effect immediately.
It is not clear what settings, and therefore, it is not clear how to address
this issue.

8) Do we have a query for the anticipated latency from present to feedback?

**RESOLVED**: Do not provide a query for the feedback latency.

There is some amount of latency from when an application calls
vkQueuePresentKHR to when the image is displayed to the user, to when
feedback is available to the application on when the image was actually
displayed to the user.
The first time (from the call till the image is presented) generally doesn’t
matter, because the application will likely be providing a targetPresentTime
(i.e. the application may have some indication for how long this will be).
However, the latency between targetPresentTime until feedback is available
may be much longer.
For example, on Android on the 1st-generation Pixel phone (60Hz FRR
display), the latency was approximately 5 refresh cycles (83.33ms).
For higher-frequency displays, the latency may have a larger number of
refresh cycles.

9) Do we have a query(s) about the number of VkPastPresentationTimingEXT
structs to keep?

**RESOLVED**: Do not provide a query for the number of results the swapchain
is allowed to store before querying them with
vkGetPastPresentationTimingEXT.
Let the application specify that value with a dedicated API.

10) How is the SWAPCHAIN_LOCAL and STAGE_LOCAL time domain used with the
calibrated timestamps extension?

**RESOLVED**: Define a struct to chain into
VkCalibratedTimestampInfoEXT::pNext that specifies a swapchain and present
stage.

11) Should VK_PRESENT_MODE_FIFO_LATEST_READY_EXT be part of this extension,
or split out into its own extension?

**RESOLVED**: It is only tangentially related.
Split it out into its own extension and define the interaction here.

* 
Revision 1, 2018-05-11 (Ian Elliott)

Internal revisions.

Revision 2, 2022-11-30 (Lionel Duc)

* 
Rebase for public discussions.

Revision 3, 2024-10-09 (Lionel Duc)

* 
Public revisions.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_present_timing).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
