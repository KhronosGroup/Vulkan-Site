# vkCmdBindTransformFeedbackBuffersEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindTransformFeedbackBuffersEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindTransformFeedbackBuffersEXT - Bind transform feedback buffers to a command buffer

To bind transform feedback buffers to a command buffer for use in subsequent
drawing commands, call:

|  | This functionality is superseded by [vkCmdBindTransformFeedbackBuffers2EXT](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdBindTransformFeedbackBuffers2EXT). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-buffer-commands) for more information. |
| --- | --- |

// Provided by VK_EXT_transform_feedback
void vkCmdBindTransformFeedbackBuffersEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstBinding,
    uint32_t                                    bindingCount,
    const VkBuffer*                             pBuffers,
    const VkDeviceSize*                         pOffsets,
    const VkDeviceSize*                         pSizes);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstBinding` is the index of the first transform feedback binding
whose state is updated by the command.

* 
`bindingCount` is the number of transform feedback bindings whose
state is updated by the command.

* 
`pBuffers` is a pointer to an array of buffer handles.

* 
`pOffsets` is a pointer to an array of buffer offsets.

* 
`pSizes` is `NULL` or a pointer to an array of `VkDeviceSize`
buffer sizes, specifying the maximum number of bytes to capture to the
corresponding transform feedback buffer.
If `pSizes` is `NULL`, it is equivalent to setting a `pSizes`
array where every element is [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html).

The values taken from elements i of `pBuffers`, `pOffsets` and
`pSizes` replace the current state for the transform feedback binding
`firstBinding` +  i, for i in [0,
`bindingCount`).
The transform feedback binding is updated to start at the offset indicated
by `pOffsets`[i] from the start of the buffer `pBuffers`[i].

When an element of `pSizes`[i] is [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), or `pSizes`
is `NULL`, the effective range is calculated by taking the size of
`pBuffers`[i] minus `pOffsets`[i].
Otherwise, the effective range is equal to the element in `pSizes`[i].

Valid Usage

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-transformFeedback-02355) VUID-vkCmdBindTransformFeedbackBuffersEXT-transformFeedback-02355

`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`transformFeedback`
**must** be enabled

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-firstBinding-02356) VUID-vkCmdBindTransformFeedbackBuffersEXT-firstBinding-02356

`firstBinding` **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-firstBinding-02357) VUID-vkCmdBindTransformFeedbackBuffersEXT-firstBinding-02357

The sum of `firstBinding` and `bindingCount` **must** be less than
or equal to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-None-02365) VUID-vkCmdBindTransformFeedbackBuffersEXT-None-02365

Transform feedback **must** not be active when the `vkCmdBindTransformFeedbackBuffersEXT` command
is recorded

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-02358) VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-02358

All elements of `pOffsets` **must** be less than the size of the
corresponding element in `pBuffers`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-02359) VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-02359

All elements of `pOffsets` **must** be a multiple of 4

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pBuffers-02360) VUID-vkCmdBindTransformFeedbackBuffersEXT-pBuffers-02360

All elements of `pBuffers` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-02363) VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-02363

All elements of `pOffsets` plus the
[effective size](../../../../spec/latest/chapters/vertexpostproc.html#transform-feedback-effective-size) of the element,
**must** be less than or equal to the size of the corresponding buffer in
`pBuffers`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pBuffers-02364) VUID-vkCmdBindTransformFeedbackBuffersEXT-pBuffers-02364

Each element of `pBuffers` that is non-sparse **must** be bound
completely and contiguously to a single `VkDeviceMemory` object

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-commandBuffer-parameter) VUID-vkCmdBindTransformFeedbackBuffersEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pBuffers-parameter) VUID-vkCmdBindTransformFeedbackBuffersEXT-pBuffers-parameter

 `pBuffers` **must** be a valid pointer to an array of `bindingCount` valid [VkBuffer](VkBuffer.html) handles

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-parameter) VUID-vkCmdBindTransformFeedbackBuffersEXT-pOffsets-parameter

 `pOffsets` **must** be a valid pointer to an array of `bindingCount` `VkDeviceSize` values

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-commandBuffer-recording) VUID-vkCmdBindTransformFeedbackBuffersEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-commandBuffer-cmdpool) VUID-vkCmdBindTransformFeedbackBuffersEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-videocoding) VUID-vkCmdBindTransformFeedbackBuffersEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-bindingCount-arraylength) VUID-vkCmdBindTransformFeedbackBuffersEXT-bindingCount-arraylength

 `bindingCount` **must** be greater than `0`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffersEXT-commonparent) VUID-vkCmdBindTransformFeedbackBuffersEXT-commonparent

 Both of `commandBuffer`, and the elements of `pBuffers` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdBindTransformFeedbackBuffersEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html), [VkBuffer](VkBuffer.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdBindTransformFeedbackBuffersEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
