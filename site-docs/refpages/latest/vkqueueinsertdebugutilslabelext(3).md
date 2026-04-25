# vkQueueInsertDebugUtilsLabelEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkQueueInsertDebugUtilsLabelEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkQueueInsertDebugUtilsLabelEXT - Insert a label into a queue

A single label can be inserted into a queue by calling:

// Provided by VK_EXT_debug_utils
void vkQueueInsertDebugUtilsLabelEXT(
    VkQueue                                     queue,
    const VkDebugUtilsLabelEXT*                 pLabelInfo);

* 
`queue` is the queue into which a debug label will be inserted.

* 
`pLabelInfo` is a pointer to a [VkDebugUtilsLabelEXT](VkDebugUtilsLabelEXT.html) structure
specifying parameters of the label to insert.

Valid Usage (Implicit)

* 
[](#VUID-vkQueueInsertDebugUtilsLabelEXT-queue-parameter) VUID-vkQueueInsertDebugUtilsLabelEXT-queue-parameter

 `queue` **must** be a valid [VkQueue](VkQueue.html) handle

* 
[](#VUID-vkQueueInsertDebugUtilsLabelEXT-pLabelInfo-parameter) VUID-vkQueueInsertDebugUtilsLabelEXT-pLabelInfo-parameter

 `pLabelInfo` **must** be a valid pointer to a valid [VkDebugUtilsLabelEXT](VkDebugUtilsLabelEXT.html) structure

Host Synchronization

* 
Host access to `queue` **must** be externally synchronized
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](VkDeviceQueueCreateFlagBits.html)

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | Any | - |

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkDebugUtilsLabelEXT](VkDebugUtilsLabelEXT.html), [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkQueueInsertDebugUtilsLabelEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
