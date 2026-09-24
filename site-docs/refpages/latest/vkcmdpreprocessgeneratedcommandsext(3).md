# vkCmdPreprocessGeneratedCommandsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdPreprocessGeneratedCommandsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdPreprocessGeneratedCommandsEXT - Performs preprocessing for generated commands

Commands **can** be preprocessed prior execution using the following command:

// Provided by VK_EXT_device_generated_commands
void vkCmdPreprocessGeneratedCommandsEXT(
    VkCommandBuffer                             commandBuffer,
    const VkGeneratedCommandsInfoEXT*           pGeneratedCommandsInfo,
    VkCommandBuffer                             stateCommandBuffer);

* 
`commandBuffer` is the command buffer which does the preprocessing.

* 
`pGeneratedCommandsInfo` is a pointer to a
[VkGeneratedCommandsInfoEXT](VkGeneratedCommandsInfoEXT.html) structure containing parameters
affecting the preprocessing step.

* 
`stateCommandBuffer` is a command buffer from which to snapshot
current states affecting the preprocessing step.
When a graphics command action token is used, graphics state is
snapshotted.
When a compute action command token is used, compute state is
snapshotted.
When a ray tracing action command token is used, ray tracing state is
snapshotted.
It can be deleted at any time after this command has been recorded.

|  | `stateCommandBuffer` access is not synchronized by the driver, meaning
| --- | --- |
that this command buffer **must** not be modified between threads in an unsafe
manner. |

Valid Usage

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-11081) VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-11081

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-pGeneratedCommandsInfo-11082) VUID-vkCmdPreprocessGeneratedCommandsEXT-pGeneratedCommandsInfo-11082

`pGeneratedCommandsInfo`’s `indirectCommandsLayout` **must** have
been created with the
[VK_INDIRECT_COMMANDS_LAYOUT_USAGE_EXPLICIT_PREPROCESS_BIT_EXT](VkIndirectCommandsLayoutUsageFlagBitsEXT.html) bit
set

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-indirectCommandsLayout-11084) VUID-vkCmdPreprocessGeneratedCommandsEXT-indirectCommandsLayout-11084

If the token sequence of the passed
[VkGeneratedCommandsInfoEXT](VkGeneratedCommandsInfoEXT.html)::`indirectCommandsLayout` contains
a [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html) token, the
initial shader state of
[VkGeneratedCommandsInfoEXT](VkGeneratedCommandsInfoEXT.html)::`indirectExecutionSet` **must** be
bound on `stateCommandBuffer`

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-stateCommandBuffer-11138) VUID-vkCmdPreprocessGeneratedCommandsEXT-stateCommandBuffer-11138

`stateCommandBuffer` **must** be in the recording state

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-deviceGeneratedCommands-11087) VUID-vkCmdPreprocessGeneratedCommandsEXT-deviceGeneratedCommands-11087

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommands)
feature **must** be enabled

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-supportedIndirectCommandsShaderStages-11088) VUID-vkCmdPreprocessGeneratedCommandsEXT-supportedIndirectCommandsShaderStages-11088

Only stages specified in [](../../../../spec/latest/chapters/limits.html#limits-supportedIndirectCommandsShaderStages)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`supportedIndirectCommandsShaderStages`
**can** be set in `pGeneratedCommandsInfo->shaderStages`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-parameter) VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-pGeneratedCommandsInfo-parameter) VUID-vkCmdPreprocessGeneratedCommandsEXT-pGeneratedCommandsInfo-parameter

 `pGeneratedCommandsInfo` **must** be a valid pointer to a valid [VkGeneratedCommandsInfoEXT](VkGeneratedCommandsInfoEXT.html) structure

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-stateCommandBuffer-parameter) VUID-vkCmdPreprocessGeneratedCommandsEXT-stateCommandBuffer-parameter

 `stateCommandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-recording) VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-cmdpool) VUID-vkCmdPreprocessGeneratedCommandsEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-renderpass) VUID-vkCmdPreprocessGeneratedCommandsEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-suspended) VUID-vkCmdPreprocessGeneratedCommandsEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-videocoding) VUID-vkCmdPreprocessGeneratedCommandsEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-bufferlevel) VUID-vkCmdPreprocessGeneratedCommandsEXT-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

* 
[](#VUID-vkCmdPreprocessGeneratedCommandsEXT-commonparent) VUID-vkCmdPreprocessGeneratedCommandsEXT-commonparent

 Both of `commandBuffer`, and `stateCommandBuffer` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to `stateCommandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdPreprocessGeneratedCommandsEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkCommandBuffer](VkCommandBuffer.html), [VkGeneratedCommandsInfoEXT](VkGeneratedCommandsInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
