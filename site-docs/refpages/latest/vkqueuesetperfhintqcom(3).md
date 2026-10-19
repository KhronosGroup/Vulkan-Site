# vkQueueSetPerfHintQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkQueueSetPerfHintQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkQueueSetPerfHintQCOM - Set a performance hint on a queue

To set a performance hint on a [VkQueue](VkQueue.html) object, call:

// Provided by VK_QCOM_queue_perf_hint
VkResult                   vkQueueSetPerfHintQCOM(
    VkQueue                                     queue,
    const VkPerfHintInfoQCOM*                   pPerfHintInfo);

* 
`queue` is the queue to set the performance hint on.

* 
`pPerfHintInfo` is a pointer to a [VkPerfHintInfoQCOM](VkPerfHintInfoQCOM.html)
structure, describing the performance hint to set.

Valid Usage

* 
[](#VUID-vkQueueSetPerfHintQCOM-queuePerfHint-12387) VUID-vkQueueSetPerfHintQCOM-queuePerfHint-12387

The [`queuePerfHint`](../../../../spec/latest/chapters/features.html#features-queuePerfHint) feature **must** be
enabled

* 
[](#VUID-vkQueueSetPerfHintQCOM-queue-12388) VUID-vkQueueSetPerfHintQCOM-queue-12388

`queue` **must** support at least one of the queue types specified in
[VkPhysicalDeviceQueuePerfHintPropertiesQCOM](VkPhysicalDeviceQueuePerfHintPropertiesQCOM.html)::`supportedQueues`

Valid Usage (Implicit)

* 
[](#VUID-vkQueueSetPerfHintQCOM-queue-parameter) VUID-vkQueueSetPerfHintQCOM-queue-parameter

 `queue` **must** be a valid [VkQueue](VkQueue.html) handle

* 
[](#VUID-vkQueueSetPerfHintQCOM-pPerfHintInfo-parameter) VUID-vkQueueSetPerfHintQCOM-pPerfHintInfo-parameter

 `pPerfHintInfo` **must** be a valid pointer to a valid [VkPerfHintInfoQCOM](VkPerfHintInfoQCOM.html) structure

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
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_QCOM_queue_perf_hint](VK_QCOM_queue_perf_hint.html), [VkPerfHintInfoQCOM](VkPerfHintInfoQCOM.html), [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#vkQueueSetPerfHintQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
