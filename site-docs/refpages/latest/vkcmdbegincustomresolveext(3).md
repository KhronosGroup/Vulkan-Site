# vkCmdBeginCustomResolveEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginCustomResolveEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginCustomResolveEXT - Begins a shader resolve operation

To begin resolving attachments using render pass draws, call:

// Provided by VK_EXT_custom_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
void vkCmdBeginCustomResolveEXT(
    VkCommandBuffer                             commandBuffer,
    const VkBeginCustomResolveInfoEXT*          pBeginCustomResolveInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pBeginCustomResolveInfo` is an optional struct with which to extend
functionality.

Following this call, any `resolveImageView` with `resolveMode` set
to [VK_RESOLVE_MODE_CUSTOM_BIT_EXT](VkResolveModeFlagBits.html) will be written by outputs which
would otherwise have written to the `imageView` image until the end of
the current render pass instance.

Following this call, the fragment area **may** be reduced to (1,1) if a
fragment density map is attached.
If this occurs, reads of input attachments mapped to a color, depth, or
stencil attachment return the value for the original larger fragment
containing the smaller fragment.
Reads of input attachments not mapped to a color, depth, or stencil
attachment use the new fragment area.

|  | Because the content of any depth/stencil resolve attachment as well as any
| --- | --- |
color resolve attachment is **undefined** at the beginning of a resolve
operation, any depth testing, stencil testing, or blending operation which
sources these **undefined** values also has **undefined** result value. |

During a custom resolve pass, multiple fragment invocations writing to the
same (x, y, layer,
view,
sample) coordinate, i.e. overdraw, will produce **undefined** behavior.

|  | Implementations are allowed to implement custom resolve attachment writes
| --- | --- |
through other mechanisms than framebuffer attachment writes, which would
normally obey rules of rasterization order. |

Valid Usage

* 
[](#VUID-vkCmdBeginCustomResolveEXT-commandBuffer-11517) VUID-vkCmdBeginCustomResolveEXT-commandBuffer-11517

The current render pass instance **must** have been started or resumed by
[vkCmdBeginRendering](vkCmdBeginRendering.html) in this `commandBuffer`

* 
[](#VUID-vkCmdBeginCustomResolveEXT-None-11518) VUID-vkCmdBeginCustomResolveEXT-None-11518

[vkCmdBeginCustomResolveEXT](#) **must** not have already been recorded in
the current render pass instance

* 
[](#VUID-vkCmdBeginCustomResolveEXT-None-11519) VUID-vkCmdBeginCustomResolveEXT-None-11519

The current render pass instance **must** have specified
[VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](VkRenderingFlagBits.html)

* 
[](#VUID-vkCmdBeginCustomResolveEXT-None-11520) VUID-vkCmdBeginCustomResolveEXT-None-11520

The current render pass instance **must** not have specified
[VK_RENDERING_SUSPENDING_BIT](VkRenderingFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginCustomResolveEXT-commandBuffer-parameter) VUID-vkCmdBeginCustomResolveEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginCustomResolveEXT-pBeginCustomResolveInfo-parameter) VUID-vkCmdBeginCustomResolveEXT-pBeginCustomResolveInfo-parameter

 If `pBeginCustomResolveInfo` is not `NULL`, `pBeginCustomResolveInfo` **must** be a valid pointer to a valid [VkBeginCustomResolveInfoEXT](VkBeginCustomResolveInfoEXT.html) structure

* 
[](#VUID-vkCmdBeginCustomResolveEXT-commandBuffer-recording) VUID-vkCmdBeginCustomResolveEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginCustomResolveEXT-commandBuffer-cmdpool) VUID-vkCmdBeginCustomResolveEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBeginCustomResolveEXT-renderpass) VUID-vkCmdBeginCustomResolveEXT-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdBeginCustomResolveEXT-suspended) VUID-vkCmdBeginCustomResolveEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginCustomResolveEXT-videocoding) VUID-vkCmdBeginCustomResolveEXT-videocoding

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

Secondary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdBeginCustomResolveEXT is affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_custom_resolve](VK_EXT_custom_resolve.html), [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkBeginCustomResolveInfoEXT](VkBeginCustomResolveInfoEXT.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginCustomResolveEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
