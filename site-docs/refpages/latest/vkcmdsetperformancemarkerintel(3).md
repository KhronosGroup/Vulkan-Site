# vkCmdSetPerformanceMarkerINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetPerformanceMarkerINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetPerformanceMarkerINTEL - Markers

To help associate query results with a particular point at which an
application emitted commands, markers can be set into the command buffers
with the call:

// Provided by VK_INTEL_performance_query
VkResult vkCmdSetPerformanceMarkerINTEL(
    VkCommandBuffer                             commandBuffer,
    const VkPerformanceMarkerInfoINTEL*         pMarkerInfo);

The last marker set onto a command buffer before the end of a query will be
part of the query result.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetPerformanceMarkerINTEL-commandBuffer-parameter) VUID-vkCmdSetPerformanceMarkerINTEL-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetPerformanceMarkerINTEL-pMarkerInfo-parameter) VUID-vkCmdSetPerformanceMarkerINTEL-pMarkerInfo-parameter

 `pMarkerInfo` **must** be a valid pointer to a valid [VkPerformanceMarkerInfoINTEL](VkPerformanceMarkerInfoINTEL.html) structure

* 
[](#VUID-vkCmdSetPerformanceMarkerINTEL-commandBuffer-recording) VUID-vkCmdSetPerformanceMarkerINTEL-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetPerformanceMarkerINTEL-commandBuffer-cmdpool) VUID-vkCmdSetPerformanceMarkerINTEL-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetPerformanceMarkerINTEL-suspended) VUID-vkCmdSetPerformanceMarkerINTEL-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdSetPerformanceMarkerINTEL-videocoding) VUID-vkCmdSetPerformanceMarkerINTEL-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action

State |

Conditional Rendering

vkCmdSetPerformanceMarkerINTEL is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

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

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPerformanceMarkerInfoINTEL](VkPerformanceMarkerInfoINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkCmdSetPerformanceMarkerINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
