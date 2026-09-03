# vkCmdBeginShaderInstrumentationARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginShaderInstrumentationARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginShaderInstrumentationARM - Begin shader instrumentation

To begin shader instrumentation, call:

// Provided by VK_ARM_shader_instrumentation
void vkCmdBeginShaderInstrumentationARM(
    VkCommandBuffer                             commandBuffer,
    VkShaderInstrumentationARM                  instrumentation);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

* 
`instrumentation` is the handle of the shader instrumentation object
that will capture the metrics.

After beginning shader instrumentation, shader instrumentation is considered
*active* within the command buffer it was called in until shader
instrumentation is ended.

The shader instrumentation object has an implicit result index where the
per-shader metrics will be written.
The result index is set to 0 when the object is created by calling
`vkCreateShaderInstrumentationARM`, and incremented by `1` for each
draw, dispatch, and ray tracing command recorded while the shader
instrumentation object is active.

The result index is also incremented by `1` when
[vkCmdExecuteGeneratedCommandsEXT](vkCmdExecuteGeneratedCommandsEXT.html) is recorded.

While shader instrumentation is active, instrumented shaders write to the
instrumentation object.
These writes **must** be synchronized using the instrumented shader’s stage
with access mask [VK_ACCESS_2_SHADER_WRITE_BIT](VkAccessFlagBits2.html).
If no instrumentation object is bound, writes are discarded.

If a command buffer is submitted multiple times, the shader instrumented
metrics for all submissions will be aggregated in the instrumentation
object, unless the metrics are [cleared](../../../../spec/latest/chapters/shaders.html#shaders-instrumentation-clear)
between submissions.

Valid Usage

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-12375) VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-12375

This command **must** not be recorded while shader instrumentation is
active within `commandBuffer`

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-12376) VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-12376

`commandBuffer` **must** not be a protected command buffer

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-parameter) VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-instrumentation-parameter) VUID-vkCmdBeginShaderInstrumentationARM-instrumentation-parameter

 `instrumentation` **must** be a valid [VkShaderInstrumentationARM](VkShaderInstrumentationARM.html) handle

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-recording) VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-cmdpool) VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-suspended) VUID-vkCmdBeginShaderInstrumentationARM-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-videocoding) VUID-vkCmdBeginShaderInstrumentationARM-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-commonparent) VUID-vkCmdBeginShaderInstrumentationARM-commonparent

 Both of `commandBuffer`, and `instrumentation` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to `instrumentation` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdBeginShaderInstrumentationARM is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html), [VkCommandBuffer](VkCommandBuffer.html), [VkShaderInstrumentationARM](VkShaderInstrumentationARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkCmdBeginShaderInstrumentationARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
