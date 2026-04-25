# vkCmdBindDescriptorBufferEmbeddedSamplersEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindDescriptorBufferEmbeddedSamplersEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindDescriptorBufferEmbeddedSamplersEXT - Setting embedded immutable samplers offsets in a command buffer

To bind an embedded immutable sampler set to a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkCmdBindDescriptorBufferEmbeddedSamplersEXT(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipelineLayout                            layout,
    uint32_t                                    set);

* 
`commandBuffer` is the command buffer that the embedded immutable
samplers will be bound to.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](VkPipelineBindPoint.html) indicating the
type of the pipeline that will use the embedded immutable samplers.

* 
`layout` is a [VkPipelineLayout](VkPipelineLayout.html) object used to program the
bindings.

* 
`set` is the number of the set to be bound.

`vkCmdBindDescriptorBufferEmbeddedSamplersEXT` binds the embedded immutable
samplers in `set` of `layout` to `set` for the command buffer
for subsequent [bound pipeline commands](../../../../spec/latest/chapters/pipelines.html#pipelines-bindpoint-commands) set
by `pipelineBindPoint`.
Any previous binding to this set by [vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html)
or this command is overwritten.
Any sets that were last bound by a call to [vkCmdBindDescriptorSets](vkCmdBindDescriptorSets.html) are
invalidated upon calling this command.
Other sets will also be invalidated upon calling this command if
`layout` differs from the pipeline layout used to bind those other sets,
as described in [Pipeline Layout Compatibility](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility).

Valid Usage

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-11295) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-11296) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-set-08070) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-set-08070

The [VkDescriptorSetLayout](VkDescriptorSetLayout.html) at index `set` when `layout` was
created **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)
bit set

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-set-08071) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-set-08071

`set` **must** be less than or equal to
[VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-None-08068) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-None-08068

The [`descriptorBuffer`](../../../../spec/latest/chapters/features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-pipelineBindPoint-08069) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-pipelineBindPoint-08069

`pipelineBindPoint` **must** be supported by the `commandBuffer`’s
parent `VkCommandPool`’s queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-pipelineBindPoint-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](VkPipelineBindPoint.html) value

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-layout-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-recording) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-cmdpool) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-videocoding) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commonparent) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commonparent

 Both of `commandBuffer`, and `layout` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindDescriptorBufferEmbeddedSamplersEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPipelineBindPoint](VkPipelineBindPoint.html), [VkPipelineLayout](VkPipelineLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#vkCmdBindDescriptorBufferEmbeddedSamplersEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
