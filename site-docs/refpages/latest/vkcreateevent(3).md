# vkCreateEvent(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateEvent.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateEvent - Create a new event object

To create an event, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateEvent(
    VkDevice                                    device,
    const VkEventCreateInfo*                    pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkEvent*                                    pEvent);

* 
`device` is the logical device that creates the event.

* 
`pCreateInfo` is a pointer to a [VkEventCreateInfo](VkEventCreateInfo.html) structure
containing information about how the event is to be created.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pEvent` is a pointer to a handle in which the resulting event
object is returned.

When created, the event object is in the unsignaled state.

Valid Usage

* 
[](#VUID-vkCreateEvent-device-09672) VUID-vkCreateEvent-device-09672

`device` **must** support at least one queue family with one of the
[VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html),
[VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html),
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) capabilities

* 
[](#VUID-vkCreateEvent-events-04468) VUID-vkCreateEvent-events-04468

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`events` is
[VK_FALSE](VK_FALSE.html), then the implementation does not support
[events](../../../../spec/latest/chapters/synchronization.html#synchronization-events), and [vkCreateEvent](#) **must** not be
used

Valid Usage (Implicit)

* 
[](#VUID-vkCreateEvent-device-parameter) VUID-vkCreateEvent-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateEvent-pCreateInfo-parameter) VUID-vkCreateEvent-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkEventCreateInfo](VkEventCreateInfo.html) structure

* 
[](#VUID-vkCreateEvent-pAllocator-parameter) VUID-vkCreateEvent-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateEvent-pEvent-parameter) VUID-vkCreateEvent-pEvent-parameter

 `pEvent` **must** be a valid pointer to a [VkEvent](VkEvent.html) handle

* 
[](#VUID-vkCreateEvent-device-queuecount) VUID-vkCreateEvent-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkEvent](VkEvent.html), [VkEventCreateInfo](VkEventCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkCreateEvent).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
