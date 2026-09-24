# vkCmdSetPerformanceOverrideINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetPerformanceOverrideINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetPerformanceOverrideINTEL - Performance override settings

Some applications might want measure the effect of a set of commands with a
different settings.
It is possible to override a particular settings using :

// Provided by VK_INTEL_performance_query
VkResult vkCmdSetPerformanceOverrideINTEL(
    VkCommandBuffer                             commandBuffer,
    const VkPerformanceOverrideInfoINTEL*       pOverrideInfo);

* 
`commandBuffer` is the command buffer where the override takes
place.

* 
`pOverrideInfo` is a pointer to a
[VkPerformanceOverrideInfoINTEL](VkPerformanceOverrideInfoINTEL.html) structure selecting the parameter
to override.

Valid Usage

* 
[](#VUID-vkCmdSetPerformanceOverrideINTEL-pOverrideInfo-02736) VUID-vkCmdSetPerformanceOverrideINTEL-pOverrideInfo-02736

`pOverrideInfo` **must** not be used with a
[VkPerformanceOverrideTypeINTEL](VkPerformanceOverrideTypeINTEL.html) that is not reported available by
`vkGetPerformanceParameterINTEL`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetPerformanceOverrideINTEL-commandBuffer-parameter) VUID-vkCmdSetPerformanceOverrideINTEL-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetPerformanceOverrideINTEL-pOverrideInfo-parameter) VUID-vkCmdSetPerformanceOverrideINTEL-pOverrideInfo-parameter

 `pOverrideInfo` **must** be a valid pointer to a valid [VkPerformanceOverrideInfoINTEL](VkPerformanceOverrideInfoINTEL.html) structure

* 
[](#VUID-vkCmdSetPerformanceOverrideINTEL-commandBuffer-recording) VUID-vkCmdSetPerformanceOverrideINTEL-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetPerformanceOverrideINTEL-commandBuffer-cmdpool) VUID-vkCmdSetPerformanceOverrideINTEL-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetPerformanceOverrideINTEL-videocoding) VUID-vkCmdSetPerformanceOverrideINTEL-videocoding

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

VK_QUEUE_TRANSFER_BIT | State |

Conditional Rendering

vkCmdSetPerformanceOverrideINTEL is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

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

[VK_INTEL_performance_query](VK_INTEL_performance_query.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPerformanceOverrideInfoINTEL](VkPerformanceOverrideInfoINTEL.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkCmdSetPerformanceOverrideINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
