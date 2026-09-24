# vkGetDeviceQueue(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceQueue.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceQueue - Get a queue handle from a device

To retrieve a handle to a [VkQueue](VkQueue.html) object, call:

// Provided by VK_VERSION_1_0
void vkGetDeviceQueue(
    VkDevice                                    device,
    uint32_t                                    queueFamilyIndex,
    uint32_t                                    queueIndex,
    VkQueue*                                    pQueue);

* 
`device` is the logical device that owns the queue.

* 
`queueFamilyIndex` is the index of the queue family to which the
queue belongs.

* 
`queueIndex` is the index within this queue family of the queue to
retrieve.

* 
`pQueue` is a pointer to a [VkQueue](VkQueue.html) object that will be filled
with the handle for the requested queue.

`vkGetDeviceQueue` **must** only be used to get queues that were created
with the `flags` parameter of [VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html) set to zero.
To get queues that were created with a non-zero `flags` parameter use
[vkGetDeviceQueue2](vkGetDeviceQueue2.html).

Valid Usage

* 
[](#VUID-vkGetDeviceQueue-queueFamilyIndex-00384) VUID-vkGetDeviceQueue-queueFamilyIndex-00384

`queueFamilyIndex` **must** be one of the queue family indices
specified when `device` was created, via the
[VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html) structure

* 
[](#VUID-vkGetDeviceQueue-queueIndex-00385) VUID-vkGetDeviceQueue-queueIndex-00385

`queueIndex` **must** be less than the value of
[VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html)::`queueCount` for the queue family
indicated by `queueFamilyIndex` when `device` was created

* 
[](#VUID-vkGetDeviceQueue-flags-01841) VUID-vkGetDeviceQueue-flags-01841

[VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html)::`flags` **must** have been zero when
`device` was created

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceQueue-device-parameter) VUID-vkGetDeviceQueue-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceQueue-pQueue-parameter) VUID-vkGetDeviceQueue-pQueue-parameter

 `pQueue` **must** be a valid pointer to a [VkQueue](VkQueue.html) handle

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#vkGetDeviceQueue).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
