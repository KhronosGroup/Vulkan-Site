# vkCmdUpdatePipelineIndirectBufferNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdUpdatePipelineIndirectBufferNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdUpdatePipelineIndirectBufferNV - Update the indirect compute pipeline’s metadata

To save a compute pipeline’s metadata at a device address call:

// Provided by VK_NV_device_generated_commands_compute
void vkCmdUpdatePipelineIndirectBufferNV(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipeline                                  pipeline);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](VkPipelineBindPoint.html) value specifying
the type of pipeline whose metadata will be saved.

* 
`pipeline` is the pipeline whose metadata will be saved.

`vkCmdUpdatePipelineIndirectBufferNV` is only allowed outside of a
render pass.
This command is treated as a “transfer” operation for the purposes of
synchronization barriers.
The writes to the address **must** be synchronized using stages
[VK_PIPELINE_STAGE_2_COPY_BIT](VkPipelineStageFlagBits2.html) and
[VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits.html) and with access masks
[VK_ACCESS_MEMORY_WRITE_BIT](VkAccessFlagBits.html) and
[VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_NV](VkAccessFlagBits.html) respectively before using the
results in preprocessing.

Valid Usage

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-pipelineBindPoint-09018) VUID-vkCmdUpdatePipelineIndirectBufferNV-pipelineBindPoint-09018

`pipelineBindPoint` **must** be [VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html)

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-pipeline-09019) VUID-vkCmdUpdatePipelineIndirectBufferNV-pipeline-09019

`pipeline` **must** have been created with
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html) flag set

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-pipeline-09020) VUID-vkCmdUpdatePipelineIndirectBufferNV-pipeline-09020

`pipeline` **must** have been created with
[VkComputePipelineIndirectBufferInfoNV](VkComputePipelineIndirectBufferInfoNV.html) structure specifying a valid
address where its metadata will be saved

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-deviceGeneratedComputePipelines-09021) VUID-vkCmdUpdatePipelineIndirectBufferNV-deviceGeneratedComputePipelines-09021

The [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-commandBuffer-parameter) VUID-vkCmdUpdatePipelineIndirectBufferNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-pipelineBindPoint-parameter) VUID-vkCmdUpdatePipelineIndirectBufferNV-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](VkPipelineBindPoint.html) value

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-pipeline-parameter) VUID-vkCmdUpdatePipelineIndirectBufferNV-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-commandBuffer-recording) VUID-vkCmdUpdatePipelineIndirectBufferNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-commandBuffer-cmdpool) VUID-vkCmdUpdatePipelineIndirectBufferNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-renderpass) VUID-vkCmdUpdatePipelineIndirectBufferNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-suspended) VUID-vkCmdUpdatePipelineIndirectBufferNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-videocoding) VUID-vkCmdUpdatePipelineIndirectBufferNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-commonparent) VUID-vkCmdUpdatePipelineIndirectBufferNV-commonparent

 Both of `commandBuffer`, and `pipeline` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdUpdatePipelineIndirectBufferNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_device_generated_commands_compute](VK_NV_device_generated_commands_compute.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPipeline](VkPipeline.html), [VkPipelineBindPoint](VkPipelineBindPoint.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkCmdUpdatePipelineIndirectBufferNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
