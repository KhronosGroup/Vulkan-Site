# VkCommandBufferSubmitInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandBufferSubmitInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandBufferSubmitInfo - Structure specifying a command buffer submission

The `VkCommandBufferSubmitInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkCommandBufferSubmitInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkCommandBuffer    commandBuffer;
    uint32_t           deviceMask;
} VkCommandBufferSubmitInfo;

// Provided by VK_KHR_synchronization2
// Equivalent to VkCommandBufferSubmitInfo
typedef VkCommandBufferSubmitInfo VkCommandBufferSubmitInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`commandBuffer` is a [VkCommandBuffer](VkCommandBuffer.html) to be submitted for
execution.

* 
`deviceMask` is a bitmask indicating which devices in a device group
execute the command buffer.
A `deviceMask` of `0` is equivalent to setting all bits
corresponding to valid devices in the group to `1`.

Valid Usage

* 
[](#VUID-VkCommandBufferSubmitInfo-commandBuffer-03890) VUID-VkCommandBufferSubmitInfo-commandBuffer-03890

`commandBuffer` **must** not have been allocated with
[VK_COMMAND_BUFFER_LEVEL_SECONDARY](VkCommandBufferLevel.html)

* 
[](#VUID-VkCommandBufferSubmitInfo-deviceMask-03891) VUID-VkCommandBufferSubmitInfo-deviceMask-03891

If `deviceMask` is not `0`, it **must** be a valid device mask

* 
[](#VUID-VkCommandBufferSubmitInfo-commandBuffer-09445) VUID-VkCommandBufferSubmitInfo-commandBuffer-09445

If any render pass instance in `commandBuffer` was recorded with a
[VkRenderPassStripeBeginInfoARM](VkRenderPassStripeBeginInfoARM.html) structure in its pNext chain and
did not specify the [VK_RENDERING_RESUMING_BIT](VkRenderingFlagBits.html) flag, a
[VkRenderPassStripeSubmitInfoARM](VkRenderPassStripeSubmitInfoARM.html) **must** be included in the
`pNext` chain

* 
[](#VUID-VkCommandBufferSubmitInfo-pNext-09446) VUID-VkCommandBufferSubmitInfo-pNext-09446

If a [VkRenderPassStripeSubmitInfoARM](VkRenderPassStripeSubmitInfoARM.html) is included in the
`pNext` chain, the value of
[VkRenderPassStripeSubmitInfoARM](VkRenderPassStripeSubmitInfoARM.html)::`stripeSemaphoreInfoCount`
**must** be equal to the sum of the
[VkRenderPassStripeBeginInfoARM](VkRenderPassStripeBeginInfoARM.html)::`stripeInfoCount` parameters
provided to render pass instances recorded in `commandBuffer` that
did not specify the [VK_RENDERING_RESUMING_BIT](VkRenderingFlagBits.html) flag

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferSubmitInfo-sType-sType) VUID-VkCommandBufferSubmitInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_SUBMIT_INFO](VkStructureType.html)

* 
[](#VUID-VkCommandBufferSubmitInfo-pNext-pNext) VUID-VkCommandBufferSubmitInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkRenderPassStripeSubmitInfoARM](VkRenderPassStripeSubmitInfoARM.html)

* 
[](#VUID-VkCommandBufferSubmitInfo-sType-unique) VUID-VkCommandBufferSubmitInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkCommandBufferSubmitInfo-commandBuffer-parameter) VUID-VkCommandBufferSubmitInfo-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkStructureType](VkStructureType.html), [VkSubmitInfo2](VkSubmitInfo2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferSubmitInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
