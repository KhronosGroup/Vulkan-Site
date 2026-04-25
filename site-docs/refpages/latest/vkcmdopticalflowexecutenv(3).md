# vkCmdOpticalFlowExecuteNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdOpticalFlowExecuteNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdOpticalFlowExecuteNV - Calculate optical flow vectors

Default direction of flow estimation is forward which calculates the optical
flow from input frame to reference frame.
Optionally backward flow estimation can be additionally calculated.
An output flow vector (Vx, Vy) means that current pixel (x, y) of input
frame can be found at location (x+Vx, y+Vy) in reference frame.
A backward flow vector (Vx, Vy) means that current pixel (x, y) of reference
frame can be found at location (x+Vx, y+Vy) in input frame.

To calculate optical flow vectors from two input frames, call:

// Provided by VK_NV_optical_flow
void vkCmdOpticalFlowExecuteNV(
    VkCommandBuffer                             commandBuffer,
    VkOpticalFlowSessionNV                      session,
    const VkOpticalFlowExecuteInfoNV*           pExecuteInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`session` is the optical flow session object on which this command
is operating.

* 
`pExecuteInfo` Info is a pointer to a
[VkOpticalFlowExecuteInfoNV](VkOpticalFlowExecuteInfoNV.html).

Valid Usage (Implicit)

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-commandBuffer-parameter) VUID-vkCmdOpticalFlowExecuteNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-session-parameter) VUID-vkCmdOpticalFlowExecuteNV-session-parameter

 `session` **must** be a valid [VkOpticalFlowSessionNV](VkOpticalFlowSessionNV.html) handle

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-pExecuteInfo-parameter) VUID-vkCmdOpticalFlowExecuteNV-pExecuteInfo-parameter

 `pExecuteInfo` **must** be a valid pointer to a valid [VkOpticalFlowExecuteInfoNV](VkOpticalFlowExecuteInfoNV.html) structure

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-commandBuffer-recording) VUID-vkCmdOpticalFlowExecuteNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-commandBuffer-cmdpool) VUID-vkCmdOpticalFlowExecuteNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_OPTICAL_FLOW_BIT_NV](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-renderpass) VUID-vkCmdOpticalFlowExecuteNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-suspended) VUID-vkCmdOpticalFlowExecuteNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-videocoding) VUID-vkCmdOpticalFlowExecuteNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-commonparent) VUID-vkCmdOpticalFlowExecuteNV-commonparent

 Both of `commandBuffer`, and `session` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_OPTICAL_FLOW_BIT_NV | Action |

Conditional Rendering

vkCmdOpticalFlowExecuteNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkCommandBuffer](VkCommandBuffer.html), [VkOpticalFlowExecuteInfoNV](VkOpticalFlowExecuteInfoNV.html), [VkOpticalFlowSessionNV](VkOpticalFlowSessionNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#vkCmdOpticalFlowExecuteNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
