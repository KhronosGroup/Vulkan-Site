# vkCmdEndRendering2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdEndRendering2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdEndRendering2KHR - End a dynamic render pass instance

To end a render pass instance, call:

// Provided by VK_KHR_maintenance10
void vkCmdEndRendering2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingEndInfoKHR*                pRenderingEndInfo);

// Provided by VK_EXT_fragment_density_map_offset
// Equivalent to vkCmdEndRendering2KHR
void vkCmdEndRendering2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingEndInfoKHR*                pRenderingEndInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pRenderingEndInfo` is `NULL` or a pointer to a
[VkRenderingEndInfoKHR](VkRenderingEndInfoKHR.html) structure containing information about how
the render pass will be ended.

If the value of `pRenderingInfo->flags` used to begin this render pass
instance included [VK_RENDERING_SUSPENDING_BIT](VkRenderingFlagBits.html), then this render pass
is suspended and will be resumed later in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

|  | There is no implicit ordering between separate render passes, even in the
| --- | --- |
same command buffer, and even when the attachments match.
Some applications rely on the continuation of
[rasterization order](../../../../spec/latest/chapters/primsrast.html#primsrast-order) between multiple render passes with
attachments defined in the same way, in order to perform non-rendering
operations (such as copies or compute operations) between draw calls, but
this has never been required by the specification.
There is also no explicit barrier currently in the API that provides the
guarantee that applications rely on without additional performance
penalties.

New applications should avoid relying on this ordering until an appropriate
barrier is added to the API.

Implementations where applications are performing this splitting are
encouraged to continue supporting this guarantee until a suitable barrier is
added to the API.

Existing applications relying on this ordering should expect that it will
continue working on platforms where it currently does.
Once a new extension adds support for a new barrier, developers are
encouraged to adapt their applications to use this when available. |

Valid Usage

* 
[](#VUID-vkCmdEndRendering2KHR-None-10610) VUID-vkCmdEndRendering2KHR-None-10610

The current render pass instance **must** have been begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html)

* 
[](#VUID-vkCmdEndRendering2KHR-commandBuffer-10611) VUID-vkCmdEndRendering2KHR-commandBuffer-10611

The current render pass instance **must** have been begun in
`commandBuffer`

* 
[](#VUID-vkCmdEndRendering2KHR-None-10612) VUID-vkCmdEndRendering2KHR-None-10612

This command **must** not be recorded when transform feedback is active

* 
[](#VUID-vkCmdEndRendering2KHR-None-10613) VUID-vkCmdEndRendering2KHR-None-10613

If `vkCmdBeginQuery`* was called within the render pass, the
corresponding `vkCmdEndQuery`* **must** have been called subsequently
within the same subpass

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndRendering2KHR-commandBuffer-parameter) VUID-vkCmdEndRendering2KHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdEndRendering2KHR-pRenderingEndInfo-parameter) VUID-vkCmdEndRendering2KHR-pRenderingEndInfo-parameter

 If `pRenderingEndInfo` is not `NULL`, `pRenderingEndInfo` **must** be a valid pointer to a valid [VkRenderingEndInfoKHR](VkRenderingEndInfoKHR.html) structure

* 
[](#VUID-vkCmdEndRendering2KHR-commandBuffer-recording) VUID-vkCmdEndRendering2KHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndRendering2KHR-commandBuffer-cmdpool) VUID-vkCmdEndRendering2KHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdEndRendering2KHR-renderpass) VUID-vkCmdEndRendering2KHR-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdEndRendering2KHR-suspended) VUID-vkCmdEndRendering2KHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndRendering2KHR-videocoding) VUID-vkCmdEndRendering2KHR-videocoding

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

Secondary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdEndRendering2KHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_fragment_density_map_offset](VK_EXT_fragment_density_map_offset.html), [VK_KHR_maintenance10](VK_KHR_maintenance10.html), [VkCommandBuffer](VkCommandBuffer.html), [VkRenderingEndInfoKHR](VkRenderingEndInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCmdEndRendering2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
