# vkCmdBindTransformFeedbackBuffers2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindTransformFeedbackBuffers2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindTransformFeedbackBuffers2EXT - Bind transform feedback memory ranges to a command buffer

To bind transform feedback memory ranges to a command buffer for use in
subsequent drawing commands, call:

// Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
void vkCmdBindTransformFeedbackBuffers2EXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstBinding,
    uint32_t                                    bindingCount,
    const VkBindTransformFeedbackBuffer2InfoEXT* pBindingInfos);

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
`pBindingInfos` is a pointer to an array of
[VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html) structures specifying the
ranges of memory to be used to capture transform feedback data.

Element i of `pBindingInfos` replaces the current state for the
transform feedback binding `firstBinding` +  i, for i in
[0,`bindingCount`).

Valid Usage

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-transformFeedback-02355) VUID-vkCmdBindTransformFeedbackBuffers2EXT-transformFeedback-02355

`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`transformFeedback`
**must** be enabled

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-firstBinding-02356) VUID-vkCmdBindTransformFeedbackBuffers2EXT-firstBinding-02356

`firstBinding` **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-firstBinding-02357) VUID-vkCmdBindTransformFeedbackBuffers2EXT-firstBinding-02357

The sum of `firstBinding` and `bindingCount` **must** be less than
or equal to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBuffers`

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-None-02365) VUID-vkCmdBindTransformFeedbackBuffers2EXT-None-02365

Transform feedback **must** not be active when the `vkCmdBindTransformFeedbackBuffers2EXT` command
is recorded

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-addressRange-13090) VUID-vkCmdBindTransformFeedbackBuffers2EXT-addressRange-13090

The `addressRange.address` member of all elements of
`pBindingInfos` **must** be a multiple of 4

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-addressRange-13091) VUID-vkCmdBindTransformFeedbackBuffers2EXT-addressRange-13091

The buffer that the `addressRange` of each element of
`pBindingInfos` was queried from **must** have been created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-addressRange-13092) VUID-vkCmdBindTransformFeedbackBuffers2EXT-addressRange-13092

The `addressRange.size` member of all elements of
`pBindingInfos` **must** be less than or equal to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBufferSize`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-commandBuffer-parameter) VUID-vkCmdBindTransformFeedbackBuffers2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-pBindingInfos-parameter) VUID-vkCmdBindTransformFeedbackBuffers2EXT-pBindingInfos-parameter

 If `pBindingInfos` is not `NULL`, `pBindingInfos` **must** be a valid pointer to an array of `bindingCount` valid [VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html) structures

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-commandBuffer-recording) VUID-vkCmdBindTransformFeedbackBuffers2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-commandBuffer-cmdpool) VUID-vkCmdBindTransformFeedbackBuffers2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-videocoding) VUID-vkCmdBindTransformFeedbackBuffers2EXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindTransformFeedbackBuffers2EXT-bindingCount-arraylength) VUID-vkCmdBindTransformFeedbackBuffers2EXT-bindingCount-arraylength

 If `pBindingInfos` is not `NULL`, `bindingCount` **must** be greater than `0`

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

vkCmdBindTransformFeedbackBuffers2EXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdBindTransformFeedbackBuffers2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
