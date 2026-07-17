# vkGetFenceStatus(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetFenceStatus.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetFenceStatus - Return the status of a fence

To query the status of a fence from the host, call:

// Provided by VK_VERSION_1_0
VkResult vkGetFenceStatus(
    VkDevice                                    device,
    VkFence                                     fence);

* 
`device` is the logical device that owns the fence.

* 
`fence` is the handle of the fence to query.

Upon success, `vkGetFenceStatus` returns the status of the fence object,
with the following return codes:

| Status | Meaning |
| --- | --- |
| [VK_SUCCESS](VkResult.html) | The fence specified by `fence` is signaled. |
| [VK_NOT_READY](VkResult.html) | The fence specified by `fence` is unsignaled. |
| [VK_ERROR_DEVICE_LOST](VkResult.html) | The device has been lost.  See [Lost Device](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-lost-device). |

If a [queue submission](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-submission) command is pending
execution, then the value returned by this command **may** immediately be out
of date.

If the device has been lost (see [Lost Device](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-lost-device)),
`vkGetFenceStatus` **may** return any of the above status codes.
If the device has been lost and `vkGetFenceStatus` is called repeatedly,
it will eventually return either [VK_SUCCESS](VkResult.html) or
[VK_ERROR_DEVICE_LOST](VkResult.html).

Valid Usage (Implicit)

* 
[](#VUID-vkGetFenceStatus-device-parameter) VUID-vkGetFenceStatus-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetFenceStatus-fence-parameter) VUID-vkGetFenceStatus-fence-parameter

 `fence` **must** be a valid [VkFence](VkFence.html) handle

* 
[](#VUID-vkGetFenceStatus-fence-parent) VUID-vkGetFenceStatus-fence-parent

 `fence` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](VkResult.html)

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkFence](VkFence.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkGetFenceStatus).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
