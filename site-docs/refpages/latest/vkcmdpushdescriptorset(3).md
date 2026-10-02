# vkCmdPushDescriptorSet(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdPushDescriptorSet.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdPushDescriptorSet - Pushes descriptor updates into a command buffer

To push descriptor updates into a command buffer, call:

// Provided by VK_VERSION_1_4
void vkCmdPushDescriptorSet(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipelineLayout                            layout,
    uint32_t                                    set,
    uint32_t                                    descriptorWriteCount,
    const VkWriteDescriptorSet*                 pDescriptorWrites);

// Provided by VK_KHR_push_descriptor
// Equivalent to vkCmdPushDescriptorSet
void vkCmdPushDescriptorSetKHR(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipelineLayout                            layout,
    uint32_t                                    set,
    uint32_t                                    descriptorWriteCount,
    const VkWriteDescriptorSet*                 pDescriptorWrites);

* 
`commandBuffer` is the command buffer that the descriptors will be
recorded in.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](VkPipelineBindPoint.html) indicating the
type of the pipeline that will use the descriptors.
There is a separate set of push descriptor bindings for each pipeline
type, so binding one does not disturb the others.

* 
`layout` is a [VkPipelineLayout](VkPipelineLayout.html) object used to program the
bindings.

* 
`set` is the set number of the descriptor set in the pipeline layout
that will be updated.

* 
`descriptorWriteCount` is the number of elements in the
`pDescriptorWrites` array.

* 
`pDescriptorWrites` is a pointer to an array of
[VkWriteDescriptorSet](VkWriteDescriptorSet.html) structures describing the descriptors to be
updated.

*Push descriptors* are a small bank of descriptors whose storage is
internally managed by the command buffer rather than being written into a
descriptor set and later bound to a command buffer.
Push descriptors allow for incremental updates of descriptors without
managing the lifetime of descriptor sets.

When a command buffer begins recording, all push descriptors are **undefined**.
Push descriptors **can** be updated incrementally and cause shaders to use the
updated descriptors for subsequent [bound pipeline commands](../../../../spec/latest/chapters/pipelines.html#pipelines-bindpoint-commands) with the pipeline type set by `pipelineBindPoint`
until the descriptor is overwritten, or else until the set is disturbed as
described in [Pipeline Layout Compatibility](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility).
When the set is disturbed or push descriptors with a different descriptor
set layout are set, all push descriptors are **undefined**.

Push descriptors that are [statically used](../../../../spec/latest/chapters/shaders.html#shaders-staticuse) by a
pipeline **must** not be **undefined** at the time that a drawing or dispatching
command is recorded to execute using that pipeline.
This includes immutable sampler descriptors, which **must** be pushed before
they are accessed by a pipeline (the immutable samplers are pushed, rather
than the samplers in `pDescriptorWrites`).
Push descriptors that are not statically used **can** remain **undefined**.

Push descriptors do not use dynamic offsets.
Instead, the corresponding non-dynamic descriptor types **can** be used and the
`offset` member of [VkDescriptorBufferInfo](VkDescriptorBufferInfo.html) **can** be changed each
time the descriptor is written.

Each element of `pDescriptorWrites` is interpreted as in
[VkWriteDescriptorSet](VkWriteDescriptorSet.html), except the `dstSet` member is ignored.

To push an immutable sampler, use a [VkWriteDescriptorSet](VkWriteDescriptorSet.html) with
`dstBinding` and `dstArrayElement` selecting the immutable sampler’s
binding.
If the descriptor type is [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html), the
`pImageInfo` parameter is ignored and the immutable sampler is taken
from the push descriptor set layout in the pipeline layout.
If the descriptor type is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html),
the `sampler` member of the `pImageInfo` parameter is ignored and
the immutable sampler is taken from the push descriptor set layout in the
pipeline layout.

Valid Usage

* 
[](#VUID-vkCmdPushDescriptorSet-commandBuffer-11295) VUID-vkCmdPushDescriptorSet-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSet-commandBuffer-11296) VUID-vkCmdPushDescriptorSet-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSet-set-00364) VUID-vkCmdPushDescriptorSet-set-00364

`set` **must** be less than
[VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-vkCmdPushDescriptorSet-set-00365) VUID-vkCmdPushDescriptorSet-set-00365

`set` **must** be the unique set number in the pipeline layout that
uses a descriptor set layout that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[](#VUID-vkCmdPushDescriptorSet-pDescriptorWrites-06494) VUID-vkCmdPushDescriptorSet-pDescriptorWrites-06494

For each element i where
`pDescriptorWrites`[i].`descriptorType` is
[VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html),
`pDescriptorWrites`[i].`pImageInfo` **must** be a valid pointer to
an array of `pDescriptorWrites`[i].`descriptorCount` valid
`VkDescriptorImageInfo` structures

* 
[](#VUID-vkCmdPushDescriptorSet-pipelineBindPoint-00363) VUID-vkCmdPushDescriptorSet-pipelineBindPoint-00363

`pipelineBindPoint` **must** be supported by the `commandBuffer`’s
parent `VkCommandPool`’s queue family

* 
[](#VUID-vkCmdPushDescriptorSet-None-10356) VUID-vkCmdPushDescriptorSet-None-10356

If the [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html) extension is not enabled,
[`pushDescriptor`](../../../../spec/latest/chapters/features.html#features-pushDescriptor) **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushDescriptorSet-commandBuffer-parameter) VUID-vkCmdPushDescriptorSet-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdPushDescriptorSet-pipelineBindPoint-parameter) VUID-vkCmdPushDescriptorSet-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](VkPipelineBindPoint.html) value

* 
[](#VUID-vkCmdPushDescriptorSet-layout-parameter) VUID-vkCmdPushDescriptorSet-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-vkCmdPushDescriptorSet-pDescriptorWrites-parameter) VUID-vkCmdPushDescriptorSet-pDescriptorWrites-parameter

 `pDescriptorWrites` **must** be a valid pointer to an array of `descriptorWriteCount` valid [VkWriteDescriptorSet](VkWriteDescriptorSet.html) structures

* 
[](#VUID-vkCmdPushDescriptorSet-commandBuffer-recording) VUID-vkCmdPushDescriptorSet-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushDescriptorSet-commandBuffer-cmdpool) VUID-vkCmdPushDescriptorSet-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdPushDescriptorSet-videocoding) VUID-vkCmdPushDescriptorSet-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdPushDescriptorSet-descriptorWriteCount-arraylength) VUID-vkCmdPushDescriptorSet-descriptorWriteCount-arraylength

 `descriptorWriteCount` **must** be greater than `0`

* 
[](#VUID-vkCmdPushDescriptorSet-commonparent) VUID-vkCmdPushDescriptorSet-commonparent

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

vkCmdPushDescriptorSet is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_push_descriptor](VK_KHR_push_descriptor.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPipelineBindPoint](VkPipelineBindPoint.html), [VkPipelineLayout](VkPipelineLayout.html), [VkWriteDescriptorSet](VkWriteDescriptorSet.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkCmdPushDescriptorSet).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
