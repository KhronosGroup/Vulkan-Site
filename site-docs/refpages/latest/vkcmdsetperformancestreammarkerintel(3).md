# vkCmdSetPerformanceStreamMarkerINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetPerformanceStreamMarkerINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetPerformanceStreamMarkerINTEL - Markers

When monitoring the behavior of an application within the dataset generated
by the entire set of applications running on the system, it is useful to
identify draw calls within a potentially huge amount of performance data.
To do so, application can generate stream markers that will be used to trace
back a particular draw call with a particular performance data item.

// Provided by VK_INTEL_performance_query
VkResult vkCmdSetPerformanceStreamMarkerINTEL(
    VkCommandBuffer                             commandBuffer,
    const VkPerformanceStreamMarkerInfoINTEL*   pMarkerInfo);

* 
`commandBuffer` is a [VkCommandBuffer](VkCommandBuffer.html) into which a stream
marker is added.

* 
`pMarkerInfo` is a pointer to a
[VkPerformanceStreamMarkerInfoINTEL](VkPerformanceStreamMarkerInfoINTEL.html) structure describing the marker
to insert.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetPerformanceStreamMarkerINTEL-commandBuffer-parameter) VUID-vkCmdSetPerformanceStreamMarkerINTEL-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetPerformanceStreamMarkerINTEL-pMarkerInfo-parameter) VUID-vkCmdSetPerformanceStreamMarkerINTEL-pMarkerInfo-parameter

 `pMarkerInfo` **must** be a valid pointer to a valid [VkPerformanceStreamMarkerInfoINTEL](VkPerformanceStreamMarkerInfoINTEL.html) structure

* 
[](#VUID-vkCmdSetPerformanceStreamMarkerINTEL-commandBuffer-recording) VUID-vkCmdSetPerformanceStreamMarkerINTEL-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetPerformanceStreamMarkerINTEL-commandBuffer-cmdpool) VUID-vkCmdSetPerformanceStreamMarkerINTEL-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetPerformanceStreamMarkerINTEL-suspended) VUID-vkCmdSetPerformanceStreamMarkerINTEL-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdSetPerformanceStreamMarkerINTEL-videocoding) VUID-vkCmdSetPerformanceStreamMarkerINTEL-videocoding

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

vkCmdSetPerformanceStreamMarkerINTEL is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

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

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPerformanceStreamMarkerInfoINTEL](VkPerformanceStreamMarkerInfoINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkCmdSetPerformanceStreamMarkerINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
