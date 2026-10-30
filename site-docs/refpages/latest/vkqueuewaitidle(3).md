# vkQueueWaitIdle(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkQueueWaitIdle.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkQueueWaitIdle - Wait for a queue to become idle

To wait on the host for the completion of outstanding queue operations for a
given queue, call:

// Provided by VK_VERSION_1_0
VkResult vkQueueWaitIdle(
    VkQueue                                     queue);

* 
`queue` is the queue on which to wait.

`vkQueueWaitIdle` is equivalent to having submitted a valid fence to
every previously executed [queue submission command](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-submission) that accepts a fence, then waiting for all of those fences to
signal using [vkWaitForFences](vkWaitForFences.html) with an infinite timeout and
`waitAll` set to [VK_TRUE](VK_TRUE.html).

|  | Even though [vkQueuePresentKHR](vkQueuePresentKHR.html) does not have a fence parameter, it does
| --- | --- |
accept a fence through [VkSwapchainPresentFenceInfoEXT](VkSwapchainPresentFenceInfoKHR.html). |

Valid Usage (Implicit)

* 
[](#VUID-vkQueueWaitIdle-queue-parameter) VUID-vkQueueWaitIdle-queue-parameter

 `queue` **must** be a valid [VkQueue](VkQueue.html) handle

Host Synchronization

* 
Host access to `queue` **must** be externally synchronized
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](VkDeviceQueueCreateFlagBits.html)

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | Any | - |

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkQueueWaitIdle).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
