# vkReleaseProfilingLockKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkReleaseProfilingLockKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkReleaseProfilingLockKHR - Releases the profiling lock

To release the profiling lock, call:

// Provided by VK_KHR_performance_query
void vkReleaseProfilingLockKHR(
    VkDevice                                    device);

* 
`device` is the logical device to cease profiling on.

Valid Usage

* 
[](#VUID-vkReleaseProfilingLockKHR-device-03235) VUID-vkReleaseProfilingLockKHR-device-03235

The profiling lock of `device` **must** have been held via a previous
successful call to [vkAcquireProfilingLockKHR](vkAcquireProfilingLockKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkReleaseProfilingLockKHR-device-parameter) VUID-vkReleaseProfilingLockKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

[VK_KHR_performance_query](VK_KHR_performance_query.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkReleaseProfilingLockKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
