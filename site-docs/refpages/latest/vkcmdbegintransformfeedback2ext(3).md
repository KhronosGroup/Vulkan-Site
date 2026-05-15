# vkCmdBeginTransformFeedback2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginTransformFeedback2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginTransformFeedback2EXT - Make transform feedback active in the command buffer

Transform feedback for specific transform feedback buffers is made active by
calling:

// Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
void vkCmdBeginTransformFeedback2EXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstCounterRange,
    uint32_t                                    counterRangeCount,
    const VkBindTransformFeedbackBuffer2InfoEXT* pCounterInfos);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstCounterRange` is the index of the first transform feedback
buffer corresponding to `pCounterInfos`[0].

* 
`counterRangeCount` is the size of the `pCounterRanges` array.

* 
`pCounterInfos` is `NULL` or a pointer to an array of
[VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html) structures defining memory
ranges containing counters used to resume transform feedback from a
previous location.

If `pCounterInfos` is `NULL`, it is equivalent to an array of
[VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html) structures with each element
having a `addressRange.size` of 0.

If the `addressRange.size` of an element of `pCounterInfos` at index
i is 0, transform feedback data written to `XfbBuffer` with a
`XFB` `Buffer` `Number` equal to the sum of i and
`firstCounterRange` will be written starting at an offset of 0 in the
bound transform feedback buffer.
If the `addressRange.size` of an element of `pCounterInfos` at index
i is not 0, it will instead be written starting at an offset equal to
the 32-bit value found at `pCounterInfos`[i].addressRange.address.

The active transform feedback buffers will capture primitives emitted from
the corresponding `XfbBuffer` in the bound graphics pipeline.
Any `XfbBuffer` emitted that does not output to an active transform
feedback buffer will not be captured.

Valid Usage

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-transformFeedback-02366) VUID-vkCmdBeginTransformFeedback2EXT-transformFeedback-02366

`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`transformFeedback`
**must** be enabled

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-None-02367) VUID-vkCmdBeginTransformFeedback2EXT-None-02367

Transform feedback **must** not be active

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-firstCounter-02368) VUID-vkCmdBeginTransformFeedback2EXT-firstCounter-02368

`firstCounterRange` **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-firstCounter-02369) VUID-vkCmdBeginTransformFeedback2EXT-firstCounter-02369

The sum of `firstCounterRange` and `counterRangeCount` **must** be less
than or equal to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-firstCounter-09630) VUID-vkCmdBeginTransformFeedback2EXT-firstCounter-09630

The sum of `firstCounterRange` and `counterRangeCount` **must** be less
than or equal to the number of transform feedback buffers bound by
[vkCmdBindTransformFeedbackBuffers2EXT](vkCmdBindTransformFeedbackBuffers2EXT.html)

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-None-06233) VUID-vkCmdBeginTransformFeedback2EXT-None-06233

If the [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is not
enabled, a
valid graphics pipeline **must** be bound to
[VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-None-04128) VUID-vkCmdBeginTransformFeedback2EXT-None-04128

The last
[pre-rasterization shader    stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) of the bound graphics pipeline **must** have been declared with the
`Xfb` execution mode

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-None-02373) VUID-vkCmdBeginTransformFeedback2EXT-None-02373

Transform feedback **must** not be made active in a render pass instance
with multiview enabled

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-None-10656) VUID-vkCmdBeginTransformFeedback2EXT-None-10656

This command **must** not be recorded when
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-pCounterInfos-13093) VUID-vkCmdBeginTransformFeedback2EXT-pCounterInfos-13093

Each element of `pCounterInfos` **must** have a `addressRange.size`
that is either 0 or greater than or equal to 4

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-pCounterInfos-13094) VUID-vkCmdBeginTransformFeedback2EXT-pCounterInfos-13094

For each element of `pCounterInfos` with a non-zero address, the
buffer the address was queried from **must** have been created with the
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) usage
flag set

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-commandBuffer-parameter) VUID-vkCmdBeginTransformFeedback2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-pCounterInfos-parameter) VUID-vkCmdBeginTransformFeedback2EXT-pCounterInfos-parameter

 If `counterRangeCount` is not `0`, and `pCounterInfos` is not `NULL`, `pCounterInfos` **must** be a valid pointer to an array of `counterRangeCount` valid [VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html) structures

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-commandBuffer-recording) VUID-vkCmdBeginTransformFeedback2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-commandBuffer-cmdpool) VUID-vkCmdBeginTransformFeedback2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-renderpass) VUID-vkCmdBeginTransformFeedback2EXT-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdBeginTransformFeedback2EXT-videocoding) VUID-vkCmdBeginTransformFeedback2EXT-videocoding

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

vkCmdBeginTransformFeedback2EXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdBeginTransformFeedback2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
