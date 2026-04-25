# vkCmdBindPipelineShaderGroupNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindPipelineShaderGroupNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindPipelineShaderGroupNV - Bind a pipeline object

For pipelines that were created with the support of multiple shader groups
(see [Graphics Pipeline Shader Groups](../../../../spec/latest/chapters/pipelines.html#graphics-shadergroups)), the regular
`vkCmdBindPipeline` command will bind Shader Group `0`.
To explicitly bind a shader group use:

// Provided by VK_NV_device_generated_commands
void vkCmdBindPipelineShaderGroupNV(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipeline                                  pipeline,
    uint32_t                                    groupIndex);

* 
`commandBuffer` is the command buffer that the pipeline will be
bound to.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](VkPipelineBindPoint.html) value specifying
the bind point to which the pipeline will be bound.

* 
`pipeline` is the pipeline to be bound.

* 
`groupIndex` is the shader group to be bound.

Valid Usage

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-groupIndex-02893) VUID-vkCmdBindPipelineShaderGroupNV-groupIndex-02893

`groupIndex` **must** be `0` or less than the effective
[VkGraphicsPipelineShaderGroupsCreateInfoNV](VkGraphicsPipelineShaderGroupsCreateInfoNV.html)::`groupCount`
including the referenced pipelines

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-pipelineBindPoint-02894) VUID-vkCmdBindPipelineShaderGroupNV-pipelineBindPoint-02894

The `pipelineBindPoint` **must** be
[VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-groupIndex-02895) VUID-vkCmdBindPipelineShaderGroupNV-groupIndex-02895

The same restrictions as [vkCmdBindPipeline](vkCmdBindPipeline.html) apply as if the bound
pipeline was created only with the Shader Group from the
`groupIndex` information

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-deviceGeneratedCommands-02896) VUID-vkCmdBindPipelineShaderGroupNV-deviceGeneratedCommands-02896

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-commandBuffer-parameter) VUID-vkCmdBindPipelineShaderGroupNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-pipelineBindPoint-parameter) VUID-vkCmdBindPipelineShaderGroupNV-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](VkPipelineBindPoint.html) value

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-pipeline-parameter) VUID-vkCmdBindPipelineShaderGroupNV-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-commandBuffer-recording) VUID-vkCmdBindPipelineShaderGroupNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-commandBuffer-cmdpool) VUID-vkCmdBindPipelineShaderGroupNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-videocoding) VUID-vkCmdBindPipelineShaderGroupNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-commonparent) VUID-vkCmdBindPipelineShaderGroupNV-commonparent

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

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindPipelineShaderGroupNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPipeline](VkPipeline.html), [VkPipelineBindPoint](VkPipelineBindPoint.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkCmdBindPipelineShaderGroupNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
