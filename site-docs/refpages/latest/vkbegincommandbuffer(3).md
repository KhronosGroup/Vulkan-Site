# vkBeginCommandBuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkBeginCommandBuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkBeginCommandBuffer - Start recording a command buffer

To begin recording a command buffer, call:

// Provided by VK_VERSION_1_0
VkResult vkBeginCommandBuffer(
    VkCommandBuffer                             commandBuffer,
    const VkCommandBufferBeginInfo*             pBeginInfo);

* 
`commandBuffer` is the handle of the command buffer which is to be
put in the recording state.

* 
`pBeginInfo` is a pointer to a [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)
structure defining additional information about how the command buffer
begins recording.

Valid Usage

* 
[](#VUID-vkBeginCommandBuffer-commandBuffer-00049) VUID-vkBeginCommandBuffer-commandBuffer-00049

`commandBuffer` **must** not be in the [    recording or pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkBeginCommandBuffer-commandBuffer-00050) VUID-vkBeginCommandBuffer-commandBuffer-00050

If `commandBuffer` was allocated from a [VkCommandPool](VkCommandPool.html) which
did not have the [VK_COMMAND_POOL_CREATE_RESET_COMMAND_BUFFER_BIT](VkCommandPoolCreateFlagBits.html)
flag set, `commandBuffer` **must** be in the
[initial state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkBeginCommandBuffer-commandBuffer-00051) VUID-vkBeginCommandBuffer-commandBuffer-00051

If `commandBuffer` is a secondary command buffer, the
`pInheritanceInfo` member of `pBeginInfo` **must** be a valid
`VkCommandBufferInheritanceInfo` structure

* 
[](#VUID-vkBeginCommandBuffer-commandBuffer-00052) VUID-vkBeginCommandBuffer-commandBuffer-00052

If `commandBuffer` is a secondary command buffer and either the
`occlusionQueryEnable` member of the `pInheritanceInfo` member
of `pBeginInfo` is [VK_FALSE](VK_FALSE.html), or the
[`occlusionQueryPrecise`](../../../../spec/latest/chapters/features.html#features-occlusionQueryPrecise) feature
is not enabled, then `pBeginInfo->pInheritanceInfo→queryFlags`
**must** not contain [VK_QUERY_CONTROL_PRECISE_BIT](VkQueryControlFlagBits.html)

* 
[](#VUID-vkBeginCommandBuffer-commandBuffer-02840) VUID-vkBeginCommandBuffer-commandBuffer-02840

If `commandBuffer` is a primary command buffer, then
`pBeginInfo->flags` **must** not set both the
[VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](VkCommandBufferUsageFlagBits.html) and the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](VkCommandBufferUsageFlagBits.html) flags

Valid Usage (Implicit)

* 
[](#VUID-vkBeginCommandBuffer-commandBuffer-parameter) VUID-vkBeginCommandBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkBeginCommandBuffer-pBeginInfo-parameter) VUID-vkBeginCommandBuffer-pBeginInfo-parameter

 `pBeginInfo` **must** be a valid pointer to a valid [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html) structure

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#vkBeginCommandBuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
