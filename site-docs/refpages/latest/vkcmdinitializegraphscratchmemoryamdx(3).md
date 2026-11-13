# vkCmdInitializeGraphScratchMemoryAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdInitializeGraphScratchMemoryAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdInitializeGraphScratchMemoryAMDX - Initialize scratch memory for an execution graph

To initialize scratch memory for a particular execution graph, call:

// Provided by VK_AMDX_shader_enqueue
void vkCmdInitializeGraphScratchMemoryAMDX(
    VkCommandBuffer                             commandBuffer,
    VkPipeline                                  executionGraph,
    VkDeviceAddress                             scratch,
    VkDeviceSize                                scratchSize);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`executionGraph` is the execution graph pipeline to initialize the
scratch memory for.

* 
`scratch` is the address of scratch memory to be initialized.

* 
`scratchSize` is a range in bytes of scratch memory to be
initialized.

This command **must** be called before using `scratch` to dispatch the
bound execution graph pipeline.

Execution of this command **may** modify any memory locations in the range
[`scratch`,`scratch` + `scratchSize`).
Accesses to this memory range are performed in the
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html) pipeline stage with the
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](VkAccessFlagBits2.html) and
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](VkAccessFlagBits2.html) access flags.

If any portion of `scratch` is modified by any command other than
[vkCmdDispatchGraphAMDX](vkCmdDispatchGraphAMDX.html), [vkCmdDispatchGraphIndirectAMDX](vkCmdDispatchGraphIndirectAMDX.html),
[vkCmdDispatchGraphIndirectCountAMDX](vkCmdDispatchGraphIndirectCountAMDX.html), or
[vkCmdInitializeGraphScratchMemoryAMDX](#) with the same execution graph,
it **must** be reinitialized for the execution graph again before dispatching
against it.

Valid Usage

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratch-10185) VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratch-10185

`scratch` **must** be the device address of an allocated memory range
at least as large as `scratchSize`

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratchSize-10186) VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratchSize-10186

`scratchSize` **must** be greater than or equal to
[VkExecutionGraphPipelineScratchSizeAMDX](VkExecutionGraphPipelineScratchSizeAMDX.html)::`minSize` returned by
[vkGetExecutionGraphPipelineScratchSizeAMDX](vkGetExecutionGraphPipelineScratchSizeAMDX.html) for the bound execution
graph pipeline

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratch-09144) VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratch-09144

`scratch` **must** be a multiple of 64

Valid Usage (Implicit)

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-commandBuffer-parameter) VUID-vkCmdInitializeGraphScratchMemoryAMDX-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-executionGraph-parameter) VUID-vkCmdInitializeGraphScratchMemoryAMDX-executionGraph-parameter

 `executionGraph` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratch-parameter) VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratch-parameter

 `scratch` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-commandBuffer-recording) VUID-vkCmdInitializeGraphScratchMemoryAMDX-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-commandBuffer-cmdpool) VUID-vkCmdInitializeGraphScratchMemoryAMDX-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-suspended) VUID-vkCmdInitializeGraphScratchMemoryAMDX-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-videocoding) VUID-vkCmdInitializeGraphScratchMemoryAMDX-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-bufferlevel) VUID-vkCmdInitializeGraphScratchMemoryAMDX-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-commonparent) VUID-vkCmdInitializeGraphScratchMemoryAMDX-commonparent

 Both of `commandBuffer`, and `executionGraph` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdInitializeGraphScratchMemoryAMDX is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_AMDX_shader_enqueue](VK_AMDX_shader_enqueue.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceAddress`, `VkDeviceSize`, [VkPipeline](VkPipeline.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/executiongraphs.html#vkCmdInitializeGraphScratchMemoryAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
