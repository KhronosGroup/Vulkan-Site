# vkQueueEndDebugUtilsLabelEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkQueueEndDebugUtilsLabelEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkQueueEndDebugUtilsLabelEXT - Close a queue debug label region

A queue debug label region is closed by calling:

// Provided by VK_EXT_debug_utils
void vkQueueEndDebugUtilsLabelEXT(
    VkQueue                                     queue);

* 
`queue` is the queue in which a debug label region should be closed.

The calls to [vkQueueBeginDebugUtilsLabelEXT](vkQueueBeginDebugUtilsLabelEXT.html) and
[vkQueueEndDebugUtilsLabelEXT](#) **must** be matched and balanced.

Valid Usage

* 
[](#VUID-vkQueueEndDebugUtilsLabelEXT-None-01911) VUID-vkQueueEndDebugUtilsLabelEXT-None-01911

There **must** be an outstanding `vkQueueBeginDebugUtilsLabelEXT`
command prior to the `vkQueueEndDebugUtilsLabelEXT` on the queue

Valid Usage (Implicit)

* 
[](#VUID-vkQueueEndDebugUtilsLabelEXT-queue-parameter) VUID-vkQueueEndDebugUtilsLabelEXT-queue-parameter

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

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkQueueEndDebugUtilsLabelEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
