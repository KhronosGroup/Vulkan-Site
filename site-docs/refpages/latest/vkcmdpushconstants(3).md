# vkCmdPushConstants(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdPushConstants.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdPushConstants - Update the values of push constants

To update push constants, call:

// Provided by VK_VERSION_1_0
void vkCmdPushConstants(
    VkCommandBuffer                             commandBuffer,
    VkPipelineLayout                            layout,
    VkShaderStageFlags                          stageFlags,
    uint32_t                                    offset,
    uint32_t                                    size,
    const void*                                 pValues);

* 
`commandBuffer` is the command buffer in which the push constant
update will be recorded.

* 
`layout` is the pipeline layout used to program the push constant
updates.

* 
`stageFlags` is a bitmask of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) specifying
the shader stages that will use the push constants in the updated range.

* 
`offset` is the start offset of the push constant range to update,
in units of bytes.

* 
`size` is the size of the push constant range to update, in units of
bytes.

* 
`pValues` is a pointer to an array of `size` bytes containing
the new push constant values.

When a command buffer begins recording, all push constant values are
**undefined**.
Reads of **undefined** push constant values by the executing shader return
**undefined** values.

Push constant values **can** be updated incrementally, causing shader stages in
`stageFlags` to read the new data from `pValues` for push constants
modified by this command, while still reading the previous data for push
constants not modified by this command.
When a [bound pipeline command](../../../../spec/latest/chapters/pipelines.html#pipelines-bindpoint-commands) is issued,
the bound pipeline’s layout **must** be compatible with the layouts used to set
the values of all push constants in the pipeline layout’s push constant
ranges, as described in [Pipeline Layout Compatibility](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility).
Binding a pipeline with a layout that is not compatible with the push
constant layout does not disturb the push constant values.

|  | As `stageFlags` needs to include all flags the relevant push constant
| --- | --- |
ranges were created with, any flags that are not supported by the queue
family that the [VkCommandPool](VkCommandPool.html) used to allocate `commandBuffer` was
created on are ignored. |

Valid Usage

* 
[](#VUID-vkCmdPushConstants-commandBuffer-11295) VUID-vkCmdPushConstants-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushConstants-commandBuffer-11296) VUID-vkCmdPushConstants-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushConstants-offset-01795) VUID-vkCmdPushConstants-offset-01795

For each byte in the range specified by `offset` and `size` and
for each shader stage in `stageFlags`, there **must** be a push
constant range in `layout` that includes that byte and that stage

* 
[](#VUID-vkCmdPushConstants-offset-01796) VUID-vkCmdPushConstants-offset-01796

For each byte in the range specified by `offset` and `size` and
for each push constant range that overlaps that byte, `stageFlags`
**must** include all stages in that push constant range’s
[VkPushConstantRange](VkPushConstantRange.html)::`stageFlags`

* 
[](#VUID-vkCmdPushConstants-offset-00368) VUID-vkCmdPushConstants-offset-00368

`offset` **must** be a multiple of `4`

* 
[](#VUID-vkCmdPushConstants-size-00369) VUID-vkCmdPushConstants-size-00369

`size` **must** be a multiple of `4`

* 
[](#VUID-vkCmdPushConstants-offset-00370) VUID-vkCmdPushConstants-offset-00370

`offset` **must** be less than
`VkPhysicalDeviceLimits`::`maxPushConstantsSize`

* 
[](#VUID-vkCmdPushConstants-size-00371) VUID-vkCmdPushConstants-size-00371

`size` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPushConstantsSize` minus
`offset`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushConstants-commandBuffer-parameter) VUID-vkCmdPushConstants-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdPushConstants-layout-parameter) VUID-vkCmdPushConstants-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-vkCmdPushConstants-stageFlags-parameter) VUID-vkCmdPushConstants-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) values

* 
[](#VUID-vkCmdPushConstants-stageFlags-requiredbitmask) VUID-vkCmdPushConstants-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

* 
[](#VUID-vkCmdPushConstants-pValues-parameter) VUID-vkCmdPushConstants-pValues-parameter

 `pValues` **must** be a valid pointer to an array of `size` bytes

* 
[](#VUID-vkCmdPushConstants-commandBuffer-recording) VUID-vkCmdPushConstants-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushConstants-commandBuffer-cmdpool) VUID-vkCmdPushConstants-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdPushConstants-videocoding) VUID-vkCmdPushConstants-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdPushConstants-size-arraylength) VUID-vkCmdPushConstants-size-arraylength

 `size` **must** be greater than `0`

* 
[](#VUID-vkCmdPushConstants-commonparent) VUID-vkCmdPushConstants-commonparent

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

vkCmdPushConstants is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPipelineLayout](VkPipelineLayout.html), [VkShaderStageFlags](VkShaderStageFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkCmdPushConstants).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
