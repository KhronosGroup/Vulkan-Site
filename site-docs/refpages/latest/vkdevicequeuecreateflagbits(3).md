# VkDeviceQueueCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceQueueCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceQueueCreateFlagBits - Bitmask specifying behavior of the queue

Bits which **can** be set in [VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html)::`flags`,
specifying usage behavior of a queue, are:

// Provided by VK_VERSION_1_1
typedef enum VkDeviceQueueCreateFlagBits {
  // Provided by VK_VERSION_1_1
    VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT = 0x00000001,
  // Provided by VK_KHR_internally_synchronized_queues
    VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR = 0x00000004,
} VkDeviceQueueCreateFlagBits;

* 
[VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](#) specifies that the device
queue is a protected-capable queue.

* 
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](#) specifies
that the device queue is internally synchronized and does not require
external synchronization.

[VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDeviceQueueCreateFlags](VkDeviceQueueCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDeviceQueueCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
