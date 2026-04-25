# vkCmdBindDescriptorBuffersEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindDescriptorBuffersEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindDescriptorBuffersEXT - Binding descriptor buffers to a command buffer

To bind descriptor buffers to a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkCmdBindDescriptorBuffersEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    bufferCount,
    const VkDescriptorBufferBindingInfoEXT*     pBindingInfos);

* 
`commandBuffer` is the command buffer that the descriptor buffers
will be bound to.

* 
`bufferCount` is the number of elements in the `pBindingInfos`
array.

* 
`pBindingInfos` is a pointer to an array of
[VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html) structures.

`vkCmdBindDescriptorBuffersEXT` causes any offsets previously set by
[vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html) that use the bindings numbered
[`0`..
`bufferCount`-1] to be no longer valid for subsequent bound pipeline
commands.
Any previously bound buffers at binding points greater than or equal to
`bufferCount` are unbound.

Valid Usage

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-11295) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-11296) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-None-08047) VUID-vkCmdBindDescriptorBuffersEXT-None-08047

The [`descriptorBuffer`](../../../../spec/latest/chapters/features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-maxSamplerDescriptorBufferBindings-08048) VUID-vkCmdBindDescriptorBuffersEXT-maxSamplerDescriptorBufferBindings-08048

There **must** be no more than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`maxSamplerDescriptorBufferBindings`
elements in `pBindingInfos` with
[VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html)::`usage` containing
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-maxResourceDescriptorBufferBindings-08049) VUID-vkCmdBindDescriptorBuffersEXT-maxResourceDescriptorBufferBindings-08049

There **must** be no more than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`maxResourceDescriptorBufferBindings`
elements in `pBindingInfos` with
[VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html)::`usage` containing
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-None-08050) VUID-vkCmdBindDescriptorBuffersEXT-None-08050

There **must** be no more than `1` element in `pBindingInfos` with
[VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html)::`usage` containing
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-bufferCount-08051) VUID-vkCmdBindDescriptorBuffersEXT-bufferCount-08051

`bufferCount` **must** be less than or equal to
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`maxDescriptorBufferBindings`

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08053) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08053

For each element of `pBindingInfos`, the buffer from which
`address` was queried **must** have been created with the
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) usage flag set
if it contains sampler descriptor data

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08054) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08054

For each element of `pBindingInfos`, the buffer from which
`address` was queried **must** have been created with the
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) usage flag set
if it contains resource descriptor data

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08055) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08055

For each element of `pBindingInfos`, at least one buffer from which
`address` was queried must contain `usage`

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-09947) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-09947

For all elements of `pBindingInfos`, the buffer from which
`address` was queried **must** have been created with the
[VK_BUFFER_USAGE_2_DATA_GRAPH_FOREIGN_DESCRIPTOR_BIT_ARM](VkBufferUsageFlagBits2.html) usage flag
set if the command pool from which `commandBuffer` was allocated
from was created with any element of
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html)::pProcessingEngines with
`isForeign` set to [VK_TRUE](VK_TRUE.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-parameter) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-parameter) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-parameter

 `pBindingInfos` **must** be a valid pointer to an array of `bufferCount` valid [VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html) structures

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-recording) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-cmdpool) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-videocoding) VUID-vkCmdBindDescriptorBuffersEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-bufferCount-arraylength) VUID-vkCmdBindDescriptorBuffersEXT-bufferCount-arraylength

 `bufferCount` **must** be greater than `0`

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

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindDescriptorBuffersEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkCmdBindDescriptorBuffersEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
