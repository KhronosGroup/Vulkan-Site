# vkSignalSemaphore(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSignalSemaphore.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSignalSemaphore - Signal a timeline semaphore on the host

To signal a semaphore created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html) with a particular counter value, on the
host, call:

// Provided by VK_VERSION_1_2
VkResult vkSignalSemaphore(
    VkDevice                                    device,
    const VkSemaphoreSignalInfo*                pSignalInfo);

// Provided by VK_KHR_timeline_semaphore
// Equivalent to vkSignalSemaphore
VkResult vkSignalSemaphoreKHR(
    VkDevice                                    device,
    const VkSemaphoreSignalInfo*                pSignalInfo);

* 
`device` is the logical device that owns the semaphore.

* 
`pSignalInfo` is a pointer to a [VkSemaphoreSignalInfo](VkSemaphoreSignalInfo.html)
structure containing information about the signal operation.

When `vkSignalSemaphore` is executed on the host, it defines and
immediately executes a [*semaphore signal operation*](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling) which sets the timeline semaphore to the given value.

The first synchronization scope is defined by the host execution model, but
includes execution of `vkSignalSemaphore` on the host and anything that
happened-before it.

The second synchronization scope is empty.

Valid Usage (Implicit)

* 
[](#VUID-vkSignalSemaphore-device-parameter) VUID-vkSignalSemaphore-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSignalSemaphore-pSignalInfo-parameter) VUID-vkSignalSemaphore-pSignalInfo-parameter

 `pSignalInfo` **must** be a valid pointer to a valid [VkSemaphoreSignalInfo](VkSemaphoreSignalInfo.html) structure

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

[VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkDevice](VkDevice.html), [VkSemaphoreSignalInfo](VkSemaphoreSignalInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkSignalSemaphore).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
