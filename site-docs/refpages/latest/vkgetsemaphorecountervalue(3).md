# vkGetSemaphoreCounterValue(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetSemaphoreCounterValue.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetSemaphoreCounterValue - Query the current state of a timeline semaphore

To query the current counter value of a semaphore created with a
[VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html) from the host,
call:

// Provided by VK_VERSION_1_2
VkResult vkGetSemaphoreCounterValue(
    VkDevice                                    device,
    VkSemaphore                                 semaphore,
    uint64_t*                                   pValue);

// Provided by VK_KHR_timeline_semaphore
// Equivalent to vkGetSemaphoreCounterValue
VkResult vkGetSemaphoreCounterValueKHR(
    VkDevice                                    device,
    VkSemaphore                                 semaphore,
    uint64_t*                                   pValue);

* 
`device` is the logical device that owns the semaphore.

* 
`semaphore` is the handle of the semaphore to query.

* 
`pValue` is a pointer to a 64-bit integer value in which the current
counter value of the semaphore is returned.

|  | If a [queue submission](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-submission) command is pending
| --- | --- |
execution, then the value returned by this command **may** immediately be out
of date. |

Valid Usage

* 
[](#VUID-vkGetSemaphoreCounterValue-semaphore-03255) VUID-vkGetSemaphoreCounterValue-semaphore-03255

`semaphore` **must** have been created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetSemaphoreCounterValue-device-parameter) VUID-vkGetSemaphoreCounterValue-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetSemaphoreCounterValue-semaphore-parameter) VUID-vkGetSemaphoreCounterValue-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-vkGetSemaphoreCounterValue-pValue-parameter) VUID-vkGetSemaphoreCounterValue-pValue-parameter

 `pValue` **must** be a valid pointer to a `uint64_t` value

* 
[](#VUID-vkGetSemaphoreCounterValue-semaphore-parent) VUID-vkGetSemaphoreCounterValue-semaphore-parent

 `semaphore` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

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

[VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkDevice](VkDevice.html), [VkSemaphore](VkSemaphore.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkGetSemaphoreCounterValue).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
