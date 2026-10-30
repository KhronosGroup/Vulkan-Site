# vkGetDeviceQueue2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceQueue2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceQueue2 - Get a queue handle from a device

To retrieve a handle to a [VkQueue](VkQueue.html) object with specific
[VkDeviceQueueCreateFlags](VkDeviceQueueCreateFlags.html) creation flags, call:

// Provided by VK_VERSION_1_1
void vkGetDeviceQueue2(
    VkDevice                                    device,
    const VkDeviceQueueInfo2*                   pQueueInfo,
    VkQueue*                                    pQueue);

* 
`device` is the logical device that owns the queue.

* 
`pQueueInfo` is a pointer to a [VkDeviceQueueInfo2](VkDeviceQueueInfo2.html) structure,
describing parameters of the device queue to be retrieved.

* 
`pQueue` is a pointer to a [VkQueue](VkQueue.html) object that will be filled
with the handle for the requested queue.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceQueue2-device-parameter) VUID-vkGetDeviceQueue2-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceQueue2-pQueueInfo-parameter) VUID-vkGetDeviceQueue2-pQueueInfo-parameter

 `pQueueInfo` **must** be a valid pointer to a valid [VkDeviceQueueInfo2](VkDeviceQueueInfo2.html) structure

* 
[](#VUID-vkGetDeviceQueue2-pQueue-parameter) VUID-vkGetDeviceQueue2-pQueue-parameter

 `pQueue` **must** be a valid pointer to a [VkQueue](VkQueue.html) handle

[VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDevice](VkDevice.html), [VkDeviceQueueInfo2](VkDeviceQueueInfo2.html), [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#vkGetDeviceQueue2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
