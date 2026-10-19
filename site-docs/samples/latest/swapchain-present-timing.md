# Swapchain Present Timing

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/api/swapchain_present_timing/README.html

## Table of Contents

- [Extension Features](#_extension_features)
- [Swapchain Setup](#_swapchain_setup)
- [Timing Properties](#_timing_properties)
- [Time Domains](#_time_domains)
- [Timing Results Queue](#_timing_results_queue)
- [Timing_Results_Queue](#_timing_results_queue)
- [Collecting Presentation Timings Data](#_collecting_presentation_timings_data)
- [Collecting_Presentation_Timings_Data](#_collecting_presentation_timings_data)
- [Rendering & Presentation](#_rendering_presentation)
- [Rendering_&_Presentation](#_rendering_presentation)
- [Absolute vs. Relative Present Time](#_absolute_vs_relative_present_time)
- [Absolute_vs._Relative_Present_Time](#_absolute_vs_relative_present_time)
- [Adaptive Frame Pacing](#_adaptive_frame_pacing)
- [Adaptive_Frame_Pacing](#_adaptive_frame_pacing)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/api/swapchain_present_timing). |
| --- | --- |

Frame pacing is an important aspect of achieving smooth rendering and synchronization in real-time applications. This sample demonstrates how to use the VK_EXT_present_timing extension to implement frame pacing with time-based presentation.

The sample renders a circle moving linearly across the viewport, which is a good visual test for detecting micro-stutters and verifying smooth presentation. It queries past presentation timing information and uses the last known display time along with the swapchain’s refresh cycle duration to predict when the next frame should be presented.

Press 'P' on the keyboard to toggle the use of present timing feature. When present timing is disabled, animations will use the current CPU time during the application’s update routine to simulate geometry placement. This is a common approach in realtime applications and can exhibit visual artifacts when frame times are inconsistent, e.g. when rendering complex very dynamic scenes.

VK_EXT_present_timing exposes 3 features at the physical device level:

* 
`presentTiming` is required for the extension to be exposed, and allows the application to query past presentation timings.

* 
`presentAtAbsoluteTime` and `presentAtRelativeTime` allow applications to precisely control the time or duration of a presentation request.

However, hardware support is only one part of the requirements to access those features. Presentation capabilities can vary greatly depending on the kind of VkSurfaceKHR used, since they are in large part also dictated by the system APIs available to the implementation. Surface capabilities may then only expose a subset of the physical device’s and need to be queried as well to make sure the implementation can provide present timing features in its runtime environment.

In addition to the "present-at" features, surfaces capabilities also expose the present stages the implementation is able to provide timing information for. Present stages represent steps in common presentation pipelines, so that different systems which provide time measurements for different things under a vague "display time" term can still express them in a common framework. For example, some systems might be able to accurately measure the time at which the display actually lit pixels, while others can only report when the system made the image available for the display. Having access to timing information from multiple present stages can also be useful to figure out the latency of the presentation engine.

After creating a swapchain with a capable `VkSurfaceKHR` and the `VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT` flag bit, applications should first query important properties about the swapchain’s timing.

`VkSwapchainTimingPropertiesEXT` exposes a `refreshDuration` and a `refreshInterval` value. These two fields put together describe the behavior of the presentation engine:

* 
If both values are equal, the presentation engine is operating in a fixed refresh rate mode (FRR), and the value indicates the length of a refresh cycle in nanoseconds.

* 
If `refreshInterval` is `UINT64_MAX`, it means variable refresh rate (VRR) is active, and `refreshDuration` is the minimum duration of a refresh cycle achievable (i.e. the maximum framerate).

* 
If both values are different (but non-zero), then the presentation engine is operating in FRR mode, but with the ability to adjust its refresh duration by a factor of `refreshInterval` nanoseconds, sometimes referred to as Adaptive Refresh Rate (ARR).

* 
Finally, any value of zero means the implementation was not able to determine how the presentation engine operates.

In this example which has trivial rendering, we simply use the `refreshDuration` value as a fixed time interval, or default to a 60Hz refresh rate if that is not available.

The time values are all expressed in a time domain chosen by the application among a list of candidates exposed by the swapchain. `VK_EXT_present_timing` introduces new opaque time domains that are local to a given swapchain: `VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT`, which all implementations must support, and `VK_TIME_DOMAIN_SWAPCHAIN_LOCAL_EXT`.

Because these are opaque time domains, it is possible for an implementation to expose more than one of the same kind, for example when a window is moved from one display to another. For this reason, time domains are also assigned a unique id by the implementation.

* 
`VK_TIME_DOMAIN_SWAPCHAIN_LOCAL_EXT` refers to a time domain that is specific to a swapchain, but common across all present stages.

* 
`VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT` must be associated with both a swapchain and a present stage. This is useful on platforms where present stages might be handled by different hardware, each with their own time domain.

If available, choosing a wider time domain such as `VK_TIME_DOMAIN_DEVICE_KHR` can simplify the usage of the extension’s API.

Finally, the swapchain must be given the opportunity to allocate internal resources that are used to store the timing results until the application can collect them. This is done with `vkSetSwapchainPresentTimingQueueSizeEXT`. A common question is figuring out how much space to allocate. There is unfortunately no good way of figuring this out other than trying, as it depends on the latency of the presentation engine to fill those results, which cannot be known beforehand. In this example, we choose a multiple of the swapchain’s image count, betting on results to be available within a few frames.

If the internal timing results queue cannot hold any more data, calling `vkQueuePresentKHR` and requesting timing results returns a new error, `VK_ERROR_PRESENT_TIMING_QUEUE_FULL_EXT`. Applications can recover from this error by allocating more space in the queue, or stop results requests until more space has been made available.

Timing results are retrieved by the application by calling `vkGetPastPresentationTimingEXT`.

Results can be correlated to every `vkQueuePresentKHR` by using present IDs assigned with `VK_KHR_present_id2`. This allows applications to build a history of present timing statistics which can then be used to drive their frame pacing strategy. This sample shows an example of collecting those statistics, though it does not try to use them.

Unexpected system events, such as those triggered by power management-related features, can cause the presentation engine to change its behavior, for example by throttling the presentation rate. Such changes are communicated to the application via the `VkPastPresentationTimingPropertiesEXT::timingPropertiesCounter` when they are related to timing properties, and `VkPastPresentationTimingPropertiesEXT::timeDomainsCounter` when time domains are affected. These "counter" values should be checked against the last known value returned from `vkGetSwapchainTimingPropertiesEXT` and `vkGetSwapchainTimeDomainPropertiesEXT` respectively. If they do not match, applications should query those properties again.

`VK_EXT_present_timing` supports two methods for specifying when a frame should be presented:

* 
Absolute Time (`presentAtAbsoluteTime`): `VkPresentTimingInfoEXT::targetTime` represents a timestamp in the selected time domain at which the image should be displayed.

* 
Relative Time (`presentAtRelativeTime`): The `VkPresentTimingInfoEXT::targetTime` is the minimum duration the image should be visible.

This sample provides examples for both methods. To compute the absolute time, it adds the current refresh duration to the last available display time. For relative time, the sample simply uses the current refresh duration as well.

The `VK_PRESENT_TIMING_INFO_PRESENT_AT_NEAREST_REFRESH_CYCLE_BIT_EXT` flag instructs the implementation to align the requested time or duration to the nearest refresh cycle boundary. This is useful when working with fixed refresh rates, so that small errors in calculations won’t cause a presentation request to miss a full refresh cycle, causing in turn micro-stutters.

While this sample uses a fixed target duration, production applications can implement more sophisticated strategies by analyzing the present statistics:

* 
Latency detection: Compare `present_ready_time` (when GPU finished the queue operations enqueued by `vkQueuePresentKHR`) with `present_display_time` to measure the full presentation latency from the device’s perspective.

* 
Missed deadlines: Detect when `targetTime` is earlier than `present_display_time` by more than a full refresh cycle, indicating the frame missed its target.

* 
Headroom: Compare `present_ready_time` with `present_dequeued_time` to measure how much headroom is available. If consistently finishing early with enough headroom, the application may target a higher framerate.

* 
Micro-stutter Detection: Look for irregular spacing between consecutive `present_display_time` values
