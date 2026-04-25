# vkCmdCudaLaunchKernelNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCudaLaunchKernelNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCudaLaunchKernelNV - Dispatch compute work items

To record a CUDA kernel launch, call:

// Provided by VK_NV_cuda_kernel_launch
void vkCmdCudaLaunchKernelNV(
    VkCommandBuffer                             commandBuffer,
    const VkCudaLaunchInfoNV*                   pLaunchInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pLaunchInfo` is a pointer to a [VkCudaLaunchInfoNV](VkCudaLaunchInfoNV.html) structure
in which the grid (similar to workgroup) dimension, function handle and
related arguments are defined.

When the command is executed, a global workgroup consisting of
`gridDimX` × `gridDimY` × `gridDimZ` local
workgroups is assembled.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCudaLaunchKernelNV-commandBuffer-parameter) VUID-vkCmdCudaLaunchKernelNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCudaLaunchKernelNV-pLaunchInfo-parameter) VUID-vkCmdCudaLaunchKernelNV-pLaunchInfo-parameter

 `pLaunchInfo` **must** be a valid pointer to a valid [VkCudaLaunchInfoNV](VkCudaLaunchInfoNV.html) structure

* 
[](#VUID-vkCmdCudaLaunchKernelNV-commandBuffer-recording) VUID-vkCmdCudaLaunchKernelNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCudaLaunchKernelNV-commandBuffer-cmdpool) VUID-vkCmdCudaLaunchKernelNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCudaLaunchKernelNV-suspended) VUID-vkCmdCudaLaunchKernelNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCudaLaunchKernelNV-videocoding) VUID-vkCmdCudaLaunchKernelNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdCudaLaunchKernelNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_cuda_kernel_launch](VK_NV_cuda_kernel_launch.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCudaLaunchInfoNV](VkCudaLaunchInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/dispatch.html#vkCmdCudaLaunchKernelNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
