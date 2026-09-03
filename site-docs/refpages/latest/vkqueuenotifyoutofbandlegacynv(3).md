# vkQueueNotifyOutOfBandLegacyNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkQueueNotifyOutOfBandLegacyNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkQueueNotifyOutOfBandLegacyNV - Stub description of vkQueueNotifyOutOfBandLegacyNV

This is an undocumented legacy function and is superseded by the
[VK_NV_low_latency2](VK_NV_low_latency2.html) extension.

// Provided by VK_NV_low_latency
void vkQueueNotifyOutOfBandLegacyNV(
    VkQueue                                     queue,
    uint32_t                                    queueType);

Valid Usage (Implicit)

* 
[](#VUID-vkQueueNotifyOutOfBandLegacyNV-queue-parameter) VUID-vkQueueNotifyOutOfBandLegacyNV-queue-parameter

 `queue` **must** be a valid [VkQueue](VkQueue.html) handle

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | Any | - |

[VK_NV_low_latency](VK_NV_low_latency.html), [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#vkQueueNotifyOutOfBandLegacyNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
