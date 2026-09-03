# vkQueueSetPerformanceConfigurationINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkQueueSetPerformanceConfigurationINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkQueueSetPerformanceConfigurationINTEL - Set a performance query

To set a performance configuration, call:

// Provided by VK_INTEL_performance_query
VkResult vkQueueSetPerformanceConfigurationINTEL(
    VkQueue                                     queue,
    VkPerformanceConfigurationINTEL             configuration);

* 
`queue` is the queue on which the configuration will be used.

* 
`configuration` is the configuration to use.

Valid Usage (Implicit)

* 
[](#VUID-vkQueueSetPerformanceConfigurationINTEL-queue-parameter) VUID-vkQueueSetPerformanceConfigurationINTEL-queue-parameter

 `queue` **must** be a valid [VkQueue](VkQueue.html) handle

* 
[](#VUID-vkQueueSetPerformanceConfigurationINTEL-configuration-parameter) VUID-vkQueueSetPerformanceConfigurationINTEL-configuration-parameter

 `configuration` **must** be a valid [VkPerformanceConfigurationINTEL](VkPerformanceConfigurationINTEL.html) handle

* 
[](#VUID-vkQueueSetPerformanceConfigurationINTEL-commonparent) VUID-vkQueueSetPerformanceConfigurationINTEL-commonparent

 Both of `configuration`, and `queue` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_TOO_MANY_OBJECTS](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkPerformanceConfigurationINTEL](VkPerformanceConfigurationINTEL.html), [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkQueueSetPerformanceConfigurationINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
