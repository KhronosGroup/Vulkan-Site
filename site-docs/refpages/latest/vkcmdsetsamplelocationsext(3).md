# vkCmdSetSampleLocationsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetSampleLocationsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetSampleLocationsEXT - Set sample locations dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the sample locations used
for rasterization, call:

// Provided by VK_EXT_sample_locations
void vkCmdSetSampleLocationsEXT(
    VkCommandBuffer                             commandBuffer,
    const VkSampleLocationsInfoEXT*             pSampleLocationsInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pSampleLocationsInfo` is the sample locations state to set.

This command sets the custom sample locations for subsequent drawing
commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`, and when the
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html)::`sampleLocationsEnable`
property of the bound graphics pipeline is [VK_TRUE](VK_TRUE.html).
Otherwise, this state is specified by the
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html)::`sampleLocationsInfo`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetSampleLocationsEXT-variableSampleLocations-01530) VUID-vkCmdSetSampleLocationsEXT-variableSampleLocations-01530

If
[VkPhysicalDeviceSampleLocationsPropertiesEXT](VkPhysicalDeviceSampleLocationsPropertiesEXT.html)::`variableSampleLocations`
is [VK_FALSE](VK_FALSE.html) then the current render pass **must** have been begun by
specifying a [VkRenderPassSampleLocationsBeginInfoEXT](VkRenderPassSampleLocationsBeginInfoEXT.html) structure
whose `pPostSubpassSampleLocations` member contains an element with
a `subpassIndex` matching the current subpass index and the
`sampleLocationsInfo` member of that element **must** match the sample
locations state pointed to by `pSampleLocationsInfo`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetSampleLocationsEXT-commandBuffer-parameter) VUID-vkCmdSetSampleLocationsEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetSampleLocationsEXT-pSampleLocationsInfo-parameter) VUID-vkCmdSetSampleLocationsEXT-pSampleLocationsInfo-parameter

 `pSampleLocationsInfo` **must** be a valid pointer to a valid [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html) structure

* 
[](#VUID-vkCmdSetSampleLocationsEXT-commandBuffer-recording) VUID-vkCmdSetSampleLocationsEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetSampleLocationsEXT-commandBuffer-cmdpool) VUID-vkCmdSetSampleLocationsEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetSampleLocationsEXT-videocoding) VUID-vkCmdSetSampleLocationsEXT-videocoding

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

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetSampleLocationsEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_sample_locations](VK_EXT_sample_locations.html), [VkCommandBuffer](VkCommandBuffer.html), [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdSetSampleLocationsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
