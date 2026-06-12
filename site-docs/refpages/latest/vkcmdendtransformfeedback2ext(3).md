# vkCmdEndTransformFeedback2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdEndTransformFeedback2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdEndTransformFeedback2EXT - Make transform feedback inactive in the command buffer

Transform feedback for specific transform feedback buffers is made inactive
by calling:

// Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
void vkCmdEndTransformFeedback2EXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstCounterRange,
    uint32_t                                    counterRangeCount,
    const VkBindTransformFeedbackBuffer2InfoEXT* pCounterInfos);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstCounterBuffer` is the index of the first transform feedback
buffer corresponding to `pCounterInfos`[0].

* 
`counterRangeCount` is the size of the `pCounterInfos` array.

* 
`pCounterInfos` is `NULL` or a pointer to an array of
[VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html) structures defining memory
ranges used to write counters used to later resume transform feedback.

If `pCounterInfos` is `NULL`, it is equivalent to an array of
[VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html) structures with each element
having a `addressRange.size` of 0.

If the `addressRange.size` of an element of `pCounterInfos` at index
i is 0, no data is written to the address range.
If the `addressRange.size` of an element of `pCounterInfos` at index
i is not 0, the byte offset, where the next vertex data would be
written to in the transform feedback buffer at a binding equal to the sum of
i and `firstCounterBuffer`, is written to that range’s
`address`.

Valid Usage

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-transformFeedback-02374) VUID-vkCmdEndTransformFeedback2EXT-transformFeedback-02374

`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`transformFeedback`
**must** be enabled

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-None-02375) VUID-vkCmdEndTransformFeedback2EXT-None-02375

Transform feedback **must** be active

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-firstCounterBuffer-02376) VUID-vkCmdEndTransformFeedback2EXT-firstCounterBuffer-02376

`firstCounterBuffer` **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-firstCounterBuffer-02377) VUID-vkCmdEndTransformFeedback2EXT-firstCounterBuffer-02377

The sum of `firstCounterBuffer` and `counterRangeCount` **must** be
less than or equal to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-None-10657) VUID-vkCmdEndTransformFeedback2EXT-None-10657

This command **must** not be recorded when
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-pCounterInfos-13095) VUID-vkCmdEndTransformFeedback2EXT-pCounterInfos-13095

Each element of `pCounterInfos` **must** have a `addressRange.size`
that is either 0 or greater than or equal to 4

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-pCounterInfos-13096) VUID-vkCmdEndTransformFeedback2EXT-pCounterInfos-13096

For each element of `pCounterInfos` with a non-zero address, the
buffer the address was queried from **must** have been created with the
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) usage
flag set

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-commandBuffer-parameter) VUID-vkCmdEndTransformFeedback2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-pCounterInfos-parameter) VUID-vkCmdEndTransformFeedback2EXT-pCounterInfos-parameter

 If `counterRangeCount` is not `0`, and `pCounterInfos` is not `NULL`, `pCounterInfos` **must** be a valid pointer to an array of `counterRangeCount` valid [VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html) structures

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-commandBuffer-recording) VUID-vkCmdEndTransformFeedback2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-commandBuffer-cmdpool) VUID-vkCmdEndTransformFeedback2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-renderpass) VUID-vkCmdEndTransformFeedback2EXT-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdEndTransformFeedback2EXT-videocoding) VUID-vkCmdEndTransformFeedback2EXT-videocoding

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

vkCmdEndTransformFeedback2EXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdEndTransformFeedback2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
