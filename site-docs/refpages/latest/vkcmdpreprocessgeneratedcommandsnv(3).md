# vkCmdPreprocessGeneratedCommandsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdPreprocessGeneratedCommandsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdPreprocessGeneratedCommandsNV - Performs preprocessing for generated commands

Commands **can** be preprocessed prior execution using the following command:

// Provided by VK_NV_device_generated_commands
void vkCmdPreprocessGeneratedCommandsNV(
    VkCommandBuffer                             commandBuffer,
    const VkGeneratedCommandsInfoNV*            pGeneratedCommandsInfo);

* 
`commandBuffer` is the command buffer which does the preprocessing.

* 
`pGeneratedCommandsInfo` is a pointer to a
[VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html) structure containing parameters
affecting the preprocessing step.

Valid Usage

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-02974) VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-02974

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-pGeneratedCommandsInfo-02927) VUID-vkCmdPreprocessGeneratedCommandsNV-pGeneratedCommandsInfo-02927

`pGeneratedCommandsInfo->indirectCommandsLayout` **must** have been
created with the
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_NV](VkIndirectCommandsLayoutUsageFlagBitsNV.html) bit
set

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-deviceGeneratedCommands-02928) VUID-vkCmdPreprocessGeneratedCommandsNV-deviceGeneratedCommands-02928

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-parameter) VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-pGeneratedCommandsInfo-parameter) VUID-vkCmdPreprocessGeneratedCommandsNV-pGeneratedCommandsInfo-parameter

 `pGeneratedCommandsInfo` **must** be a valid pointer to a valid [VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html) structure

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-recording) VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-cmdpool) VUID-vkCmdPreprocessGeneratedCommandsNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-renderpass) VUID-vkCmdPreprocessGeneratedCommandsNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-suspended) VUID-vkCmdPreprocessGeneratedCommandsNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsNV-videocoding) VUID-vkCmdPreprocessGeneratedCommandsNV-videocoding

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

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdPreprocessGeneratedCommandsNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkCommandBuffer](VkCommandBuffer.html), [VkGeneratedCommandsInfoNV](VkGeneratedCommandsInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
