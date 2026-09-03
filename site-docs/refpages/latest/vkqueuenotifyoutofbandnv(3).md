# vkQueueNotifyOutOfBandNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkQueueNotifyOutOfBandNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkQueueNotifyOutOfBandNV - Notify out of band queue

To mark a queue as *out of band*, so that all `vkQueueSubmit` calls on
the queue are ignored for latency evaluation, call:

// Provided by VK_NV_low_latency2
void vkQueueNotifyOutOfBandNV(
    VkQueue                                     queue,
    const VkOutOfBandQueueTypeInfoNV*           pQueueTypeInfo);

* 
`queue` is the VkQueue to be marked as out of band.

* 
`pQueueTypeInfo` is a pointer to a [VkOutOfBandQueueTypeInfoNV](VkOutOfBandQueueTypeInfoNV.html)
structure specifying the queue type.

Valid Usage (Implicit)

* 
[](#VUID-vkQueueNotifyOutOfBandNV-queue-parameter) VUID-vkQueueNotifyOutOfBandNV-queue-parameter

 `queue` **must** be a valid [VkQueue](VkQueue.html) handle

* 
[](#VUID-vkQueueNotifyOutOfBandNV-pQueueTypeInfo-parameter) VUID-vkQueueNotifyOutOfBandNV-pQueueTypeInfo-parameter

 `pQueueTypeInfo` **must** be a valid pointer to a valid [VkOutOfBandQueueTypeInfoNV](VkOutOfBandQueueTypeInfoNV.html) structure

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | Any | - |

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkOutOfBandQueueTypeInfoNV](VkOutOfBandQueueTypeInfoNV.html), [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkQueueNotifyOutOfBandNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
