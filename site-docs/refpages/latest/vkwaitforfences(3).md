# vkWaitForFences(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkWaitForFences.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkWaitForFences - Wait for one or more fences to become signaled

To wait for one or more fences to enter the signaled state on the host,
call:

// Provided by VK_VERSION_1_0
VkResult vkWaitForFences(
    VkDevice                                    device,
    uint32_t                                    fenceCount,
    const VkFence*                              pFences,
    VkBool32                                    waitAll,
    uint64_t                                    timeout);

* 
`device` is the logical device that owns the fences.

* 
`fenceCount` is the number of fences to wait on.

* 
`pFences` is a pointer to an array of `fenceCount` fence
handles.

* 
`waitAll` is the condition that **must** be satisfied to successfully
unblock the wait.
If `waitAll` is [VK_TRUE](VK_TRUE.html), then the condition is that all fences
in `pFences` are signaled.
Otherwise, the condition is that at least one fence in `pFences` is
signaled.

* 
`timeout` is the timeout period in units of nanoseconds.
`timeout` is adjusted to the closest value allowed by the
implementation-dependent timeout accuracy, which **may** be substantially
longer than one nanosecond, and **may** be longer than the requested
period.

If the condition is satisfied when `vkWaitForFences` is called, then
`vkWaitForFences` returns immediately.
If the condition is not satisfied at the time `vkWaitForFences` is
called, then `vkWaitForFences` will block and wait until the condition
is satisfied or the `timeout` has expired, whichever is sooner.

If `timeout` is zero, then `vkWaitForFences` does not wait, but
simply returns the current state of the fences.
[VK_TIMEOUT](VkResult.html) will be returned in this case if the condition is not
satisfied, even though no actual wait was performed.

If the condition is satisfied before the `timeout` has expired,
`vkWaitForFences` returns [VK_SUCCESS](VkResult.html).
Otherwise, `vkWaitForFences` returns [VK_TIMEOUT](VkResult.html) after the
`timeout` has expired.

If device loss occurs (see [Lost Device](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-lost-device)) before
the timeout has expired, `vkWaitForFences` **must** return in finite time
with either [VK_SUCCESS](VkResult.html) or [VK_ERROR_DEVICE_LOST](VkResult.html).

|  | While we guarantee that `vkWaitForFences` **must** return in finite time,
| --- | --- |
no guarantees are made that it returns immediately upon device loss.
However, the application can reasonably expect that the delay will be on the
order of seconds and that calling `vkWaitForFences` will not result in a
permanently (or seemingly permanently) dead process. |

Valid Usage (Implicit)

* 
[](#VUID-vkWaitForFences-device-parameter) VUID-vkWaitForFences-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkWaitForFences-pFences-parameter) VUID-vkWaitForFences-pFences-parameter

 `pFences` **must** be a valid pointer to an array of `fenceCount` valid [VkFence](VkFence.html) handles

* 
[](#VUID-vkWaitForFences-fenceCount-arraylength) VUID-vkWaitForFences-fenceCount-arraylength

 `fenceCount` **must** be greater than `0`

* 
[](#VUID-vkWaitForFences-pFences-parent) VUID-vkWaitForFences-pFences-parent

 Each element of `pFences` **must** have been created, allocated, or retrieved from `device`

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkBool32`, [VkDevice](VkDevice.html), [VkFence](VkFence.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkWaitForFences).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
