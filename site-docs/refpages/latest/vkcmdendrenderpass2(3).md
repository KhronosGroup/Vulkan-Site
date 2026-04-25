# vkCmdEndRenderPass2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdEndRenderPass2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdEndRenderPass2 - End the current render pass

To record a command to end a render pass instance after recording the
commands for the last subpass, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
void vkCmdEndRenderPass2(
    VkCommandBuffer                             commandBuffer,
    const VkSubpassEndInfo*                     pSubpassEndInfo);

// Provided by VK_KHR_create_renderpass2
// Equivalent to vkCmdEndRenderPass2
void vkCmdEndRenderPass2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkSubpassEndInfo*                     pSubpassEndInfo);

* 
`commandBuffer` is the command buffer in which to end the current
render pass instance.

* 
`pSubpassEndInfo` is a pointer to a [VkSubpassEndInfo](VkSubpassEndInfo.html) structure
containing information about how the last subpass will be ended.

`vkCmdEndRenderPass2` is semantically identical to
[vkCmdEndRenderPass](vkCmdEndRenderPass.html), except that it is extensible.

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
[](#VUID-vkCmdEndRenderPass2-None-03103) VUID-vkCmdEndRenderPass2-None-03103

The current subpass index **must** be equal to the number of subpasses in
the render pass minus one

* 
[](#VUID-vkCmdEndRenderPass2-None-02352) VUID-vkCmdEndRenderPass2-None-02352

This command **must** not be recorded when transform feedback is active

* 
[](#VUID-vkCmdEndRenderPass2-None-06171) VUID-vkCmdEndRenderPass2-None-06171

The current render pass instance **must** not have been begun with
[vkCmdBeginRendering](vkCmdBeginRendering.html)

* 
[](#VUID-vkCmdEndRenderPass2-None-07005) VUID-vkCmdEndRenderPass2-None-07005

If `vkCmdBeginQuery`* was called within a subpass of the render
pass, the corresponding `vkCmdEndQuery`* **must** have been called
subsequently within the same subpass

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndRenderPass2-commandBuffer-parameter) VUID-vkCmdEndRenderPass2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdEndRenderPass2-pSubpassEndInfo-parameter) VUID-vkCmdEndRenderPass2-pSubpassEndInfo-parameter

 `pSubpassEndInfo` **must** be a valid pointer to a valid [VkSubpassEndInfo](VkSubpassEndInfo.html) structure

* 
[](#VUID-vkCmdEndRenderPass2-commandBuffer-recording) VUID-vkCmdEndRenderPass2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndRenderPass2-commandBuffer-cmdpool) VUID-vkCmdEndRenderPass2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdEndRenderPass2-renderpass) VUID-vkCmdEndRenderPass2-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdEndRenderPass2-suspended) VUID-vkCmdEndRenderPass2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndRenderPass2-videocoding) VUID-vkCmdEndRenderPass2-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdEndRenderPass2-bufferlevel) VUID-vkCmdEndRenderPass2-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State

Synchronization |

Conditional Rendering

vkCmdEndRenderPass2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkCommandBuffer](VkCommandBuffer.html), [VkSubpassEndInfo](VkSubpassEndInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCmdEndRenderPass2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
