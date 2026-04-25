# vkCmdSetRenderingAttachmentLocations(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetRenderingAttachmentLocations.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetRenderingAttachmentLocations - Set color attachment location mappings for a command buffer

To set the fragment output location mappings during rendering, call:

// Provided by VK_VERSION_1_4
void vkCmdSetRenderingAttachmentLocations(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingAttachmentLocationInfo*    pLocationInfo);

// Provided by VK_KHR_dynamic_rendering_local_read
// Equivalent to vkCmdSetRenderingAttachmentLocations
void vkCmdSetRenderingAttachmentLocationsKHR(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingAttachmentLocationInfo*    pLocationInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pLocationInfo` is a [VkRenderingAttachmentLocationInfo](VkRenderingAttachmentLocationInfo.html)
structure indicating the new mappings.

This command sets the attachment location mappings for subsequent drawing
commands, and **must** match the mappings provided to the bound pipeline,
if one is bound,
which **can** be set by chaining [VkRenderingAttachmentLocationInfo](VkRenderingAttachmentLocationInfo.html) to
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html).

Until this command is called, mappings in the command buffer state are
treated as each color attachment specified in [vkCmdBeginRendering](vkCmdBeginRendering.html)
having a location equal to its index in
[VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments`.
This state is reset whenever [vkCmdBeginRendering](vkCmdBeginRendering.html) is called.

Valid Usage

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-dynamicRenderingLocalRead-09509) VUID-vkCmdSetRenderingAttachmentLocations-dynamicRenderingLocalRead-09509

[`dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead)
**must** be enabled

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-pLocationInfo-09510) VUID-vkCmdSetRenderingAttachmentLocations-pLocationInfo-09510

`pLocationInfo->colorAttachmentCount` **must** be equal to the value of
[VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` used to begin the
current render pass instance

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-09511) VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-09511

The current render pass instance **must** have been started or resumed by
[vkCmdBeginRendering](vkCmdBeginRendering.html) in this `commandBuffer`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-parameter) VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-pLocationInfo-parameter) VUID-vkCmdSetRenderingAttachmentLocations-pLocationInfo-parameter

 `pLocationInfo` **must** be a valid pointer to a valid [VkRenderingAttachmentLocationInfo](VkRenderingAttachmentLocationInfo.html) structure

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-recording) VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-cmdpool) VUID-vkCmdSetRenderingAttachmentLocations-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-renderpass) VUID-vkCmdSetRenderingAttachmentLocations-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdSetRenderingAttachmentLocations-videocoding) VUID-vkCmdSetRenderingAttachmentLocations-videocoding

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

Secondary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetRenderingAttachmentLocations is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkCommandBuffer](VkCommandBuffer.html), [VkRenderingAttachmentLocationInfo](VkRenderingAttachmentLocationInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/interfaces.html#vkCmdSetRenderingAttachmentLocations).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
