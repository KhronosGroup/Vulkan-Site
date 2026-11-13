# vkAcquireProfilingLockKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkAcquireProfilingLockKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkAcquireProfilingLockKHR - Acquires the profiling lock

To record and submit a command buffer containing a performance query pool
the profiling lock **must** be held.
The profiling lock **must** be acquired prior to any call to
[vkBeginCommandBuffer](vkBeginCommandBuffer.html) that will be using a performance query pool.
The profiling lock **must** be held while any command buffer containing a
performance query pool is in the *recording*, *executable*, or *pending
state*.
To acquire the profiling lock, call:

// Provided by VK_KHR_performance_query
VkResult vkAcquireProfilingLockKHR(
    VkDevice                                    device,
    const VkAcquireProfilingLockInfoKHR*        pInfo);

* 
`device` is the logical device to profile.

* 
`pInfo` is a pointer to a [VkAcquireProfilingLockInfoKHR](VkAcquireProfilingLockInfoKHR.html)
structure containing information about how the profiling is to be
acquired.

Implementations **may** allow multiple actors to hold the profiling lock
concurrently.

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireProfilingLockKHR-device-parameter) VUID-vkAcquireProfilingLockKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkAcquireProfilingLockKHR-pInfo-parameter) VUID-vkAcquireProfilingLockKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkAcquireProfilingLockInfoKHR](VkAcquireProfilingLockInfoKHR.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

* 
[VK_TIMEOUT](VkResult.html)

[VK_KHR_performance_query](VK_KHR_performance_query.html), [VkAcquireProfilingLockInfoKHR](VkAcquireProfilingLockInfoKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkAcquireProfilingLockKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
