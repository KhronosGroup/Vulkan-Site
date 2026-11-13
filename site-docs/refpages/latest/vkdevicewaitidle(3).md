# vkDeviceWaitIdle(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDeviceWaitIdle.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDeviceWaitIdle - Wait for a device to become idle

To wait on the host for the completion of outstanding queue operations for
all queues on a given logical device, call:

// Provided by VK_VERSION_1_0
VkResult vkDeviceWaitIdle(
    VkDevice                                    device);

* 
`device` is the logical device to idle.

`vkDeviceWaitIdle` is equivalent to calling `vkQueueWaitIdle` for
all queues owned by `device`.

Valid Usage (Implicit)

* 
[](#VUID-vkDeviceWaitIdle-device-parameter) VUID-vkDeviceWaitIdle-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

Host Synchronization

* 
Host access to all `VkQueue` objects created from `device`
that are not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](VkDeviceQueueCreateFlagBits.html)
             **must** be externally synchronized

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkDeviceWaitIdle).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
