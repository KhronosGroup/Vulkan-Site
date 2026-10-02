# vkCmdSetViewportShadingRatePaletteNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetViewportShadingRatePaletteNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetViewportShadingRatePaletteNV - Set shading rate image palettes dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the per-viewport shading
rate image palettes, call:

// Provided by VK_NV_shading_rate_image
void vkCmdSetViewportShadingRatePaletteNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstViewport,
    uint32_t                                    viewportCount,
    const VkShadingRatePaletteNV*               pShadingRatePalettes);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstViewport` is the index of the first viewport whose shading
rate palette is updated by the command.

* 
`viewportCount` is the number of viewports whose shading rate
palettes are updated by the command.

* 
`pShadingRatePalettes` is a pointer to an array of
[VkShadingRatePaletteNV](VkShadingRatePaletteNV.html) structures defining the palette for each
viewport.

This command sets the per-viewport shading rate image palettes for
subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportShadingRateImageStateCreateInfoNV](VkPipelineViewportShadingRateImageStateCreateInfoNV.html)::`pShadingRatePalettes`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-None-02064) VUID-vkCmdSetViewportShadingRatePaletteNV-None-02064

The [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage) feature **must**
be enabled

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-firstViewport-02067) VUID-vkCmdSetViewportShadingRatePaletteNV-firstViewport-02067

The sum of `firstViewport` and `viewportCount` **must** be between
`1` and `VkPhysicalDeviceLimits`::`maxViewports`, inclusive

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-firstViewport-02068) VUID-vkCmdSetViewportShadingRatePaletteNV-firstViewport-02068

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `firstViewport` **must** be `0`

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-viewportCount-02069) VUID-vkCmdSetViewportShadingRatePaletteNV-viewportCount-02069

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `viewportCount` **must** be `1`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-commandBuffer-parameter) VUID-vkCmdSetViewportShadingRatePaletteNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-pShadingRatePalettes-parameter) VUID-vkCmdSetViewportShadingRatePaletteNV-pShadingRatePalettes-parameter

 `pShadingRatePalettes` **must** be a valid pointer to an array of `viewportCount` valid [VkShadingRatePaletteNV](VkShadingRatePaletteNV.html) structures

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-commandBuffer-recording) VUID-vkCmdSetViewportShadingRatePaletteNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-commandBuffer-cmdpool) VUID-vkCmdSetViewportShadingRatePaletteNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-videocoding) VUID-vkCmdSetViewportShadingRatePaletteNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-viewportCount-arraylength) VUID-vkCmdSetViewportShadingRatePaletteNV-viewportCount-arraylength

 `viewportCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetViewportShadingRatePaletteNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_shading_rate_image](VK_NV_shading_rate_image.html), [VkCommandBuffer](VkCommandBuffer.html), [VkShadingRatePaletteNV](VkShadingRatePaletteNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdSetViewportShadingRatePaletteNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
