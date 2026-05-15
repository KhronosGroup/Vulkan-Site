# vkWaitSemaphores(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkWaitSemaphores.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkWaitSemaphores - Wait for timeline semaphores on the host

To wait for a set of semaphores created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html) to reach particular counter values on the
host, call:

// Provided by VK_VERSION_1_2
VkResult vkWaitSemaphores(
    VkDevice                                    device,
    const VkSemaphoreWaitInfo*                  pWaitInfo,
    uint64_t                                    timeout);

// Provided by VK_KHR_timeline_semaphore
// Equivalent to vkWaitSemaphores
VkResult vkWaitSemaphoresKHR(
    VkDevice                                    device,
    const VkSemaphoreWaitInfo*                  pWaitInfo,
    uint64_t                                    timeout);

* 
`device` is the logical device that owns the semaphores.

* 
`pWaitInfo` is a pointer to a [VkSemaphoreWaitInfo](VkSemaphoreWaitInfo.html) structure
containing information about the wait condition.

* 
`timeout` is the timeout period in units of nanoseconds.
`timeout` is adjusted to the closest value allowed by the
implementation-dependent timeout accuracy, which **may** be substantially
longer than one nanosecond, and **may** be longer than the requested
period.

If the condition is satisfied when `vkWaitSemaphores` is called, then
`vkWaitSemaphores` returns immediately.
If the condition is not satisfied at the time `vkWaitSemaphores` is
called, then `vkWaitSemaphores` will block and wait until the condition
is satisfied or the `timeout` has expired, whichever is sooner.

If `timeout` is zero, then `vkWaitSemaphores` does not wait, but
simply returns information about the current state of the semaphores.
[VK_TIMEOUT](VkResult.html) will be returned in this case if the condition is not
satisfied, even though no actual wait was performed.

If the condition is satisfied before the `timeout` has expired,
`vkWaitSemaphores` returns [VK_SUCCESS](VkResult.html).
Otherwise, `vkWaitSemaphores` returns [VK_TIMEOUT](VkResult.html) after the
`timeout` has expired.

If device loss occurs (see [Lost Device](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-lost-device)) before
the timeout has expired, `vkWaitSemaphores` **must** return in finite time
with either [VK_SUCCESS](VkResult.html) or [VK_ERROR_DEVICE_LOST](VkResult.html).

Valid Usage (Implicit)

* 
[](#VUID-vkWaitSemaphores-device-parameter) VUID-vkWaitSemaphores-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkWaitSemaphores-pWaitInfo-parameter) VUID-vkWaitSemaphores-pWaitInfo-parameter

 `pWaitInfo` **must** be a valid pointer to a valid [VkSemaphoreWaitInfo](VkSemaphoreWaitInfo.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

* 
[VK_TIMEOUT](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkDevice](VkDevice.html), [VkSemaphoreWaitInfo](VkSemaphoreWaitInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkWaitSemaphores).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
