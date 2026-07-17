# vkCmdConvertCooperativeVectorMatrixNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdConvertCooperativeVectorMatrixNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdConvertCooperativeVectorMatrixNV - Convert a cooperative vector matrix from one layout and type to another

To convert a matrix to another layout and type, call:

// Provided by VK_NV_cooperative_vector
void vkCmdConvertCooperativeVectorMatrixNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    infoCount,
    const VkConvertCooperativeVectorMatrixInfoNV* pInfos);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`infoCount` is the number of layout conversions to perform.

* 
`pInfos` is a pointer to an array of
[VkConvertCooperativeVectorMatrixInfoNV](VkConvertCooperativeVectorMatrixInfoNV.html) structures containing
information about the layout conversion.

This command does the same conversions as
[vkConvertCooperativeVectorMatrixNV](vkConvertCooperativeVectorMatrixNV.html), but executes on the device.
One conversion is performed for each of the `infoCount` elements of
`pInfos`.

This command’s execution is synchronized using
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](VkPipelineStageFlagBits2.html).

Valid Usage

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10083) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10083

For each element of `pInfo`, `srcData.deviceAddress` **must** be a
valid `VkDeviceAddress`

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10895) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10895

For each element of `pInfo`, `dstData.deviceAddress` **must** be a
valid `VkDeviceAddress`

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10084) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10084

For each element of `pInfo`, `srcData.deviceAddress` **must** be 64
byte aligned

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10085) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10085

For each element of `pInfo`, `dstData.deviceAddress` **must** be 64
byte aligned

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10086) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10086

For each element of `pInfo`, `srcSize` **must** be large enough to
contain the source matrix, based either on the standard matrix layout or
based on the size filled out by [vkConvertCooperativeVectorMatrixNV](vkConvertCooperativeVectorMatrixNV.html)

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10087) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10087

For each element of `pInfo`, the value pointed to by `pDstSize`
**must** be large enough to contain the destination matrix, based either on
the standard matrix layout or based on the size filled out by
[vkConvertCooperativeVectorMatrixNV](vkConvertCooperativeVectorMatrixNV.html)

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-None-10088) VUID-vkCmdConvertCooperativeVectorMatrixNV-None-10088

Memory accessed by the sources and destinations of all of the
conversions **must** not overlap

Valid Usage (Implicit)

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-commandBuffer-parameter) VUID-vkCmdConvertCooperativeVectorMatrixNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfos-parameter) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfos-parameter

 `pInfos` **must** be a valid pointer to an array of `infoCount` valid [VkConvertCooperativeVectorMatrixInfoNV](VkConvertCooperativeVectorMatrixInfoNV.html) structures

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-commandBuffer-recording) VUID-vkCmdConvertCooperativeVectorMatrixNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-commandBuffer-cmdpool) VUID-vkCmdConvertCooperativeVectorMatrixNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-renderpass) VUID-vkCmdConvertCooperativeVectorMatrixNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-suspended) VUID-vkCmdConvertCooperativeVectorMatrixNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-videocoding) VUID-vkCmdConvertCooperativeVectorMatrixNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-infoCount-arraylength) VUID-vkCmdConvertCooperativeVectorMatrixNV-infoCount-arraylength

 `infoCount` **must** be greater than `0`

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

vkCmdConvertCooperativeVectorMatrixNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_cooperative_vector](VK_NV_cooperative_vector.html), [VkCommandBuffer](VkCommandBuffer.html), [VkConvertCooperativeVectorMatrixInfoNV](VkConvertCooperativeVectorMatrixInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkCmdConvertCooperativeVectorMatrixNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
