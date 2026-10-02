# VkDeviceGroupCommandBufferBeginInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceGroupCommandBufferBeginInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceGroupCommandBufferBeginInfo - Set the initial device mask for a command buffer

If the `pNext` chain of [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html) includes a
`VkDeviceGroupCommandBufferBeginInfo` structure, then that structure
includes an initial device mask for the command buffer.

The `VkDeviceGroupCommandBufferBeginInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkDeviceGroupCommandBufferBeginInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           deviceMask;
} VkDeviceGroupCommandBufferBeginInfo;

// Provided by VK_KHR_device_group
// Equivalent to VkDeviceGroupCommandBufferBeginInfo
typedef VkDeviceGroupCommandBufferBeginInfo VkDeviceGroupCommandBufferBeginInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceMask` is the initial value of the command buffer’s device
mask.

The initial device mask also acts as an upper bound on the set of devices
that **can** ever be in the device mask in the command buffer.

If this structure is not present, the initial value of a command buffer’s
device mask includes all physical devices in the logical device when the
command buffer begins recording.

Valid Usage

* 
[](#VUID-VkDeviceGroupCommandBufferBeginInfo-deviceMask-00106) VUID-VkDeviceGroupCommandBufferBeginInfo-deviceMask-00106

`deviceMask` **must** be a valid device mask value

* 
[](#VUID-VkDeviceGroupCommandBufferBeginInfo-deviceMask-00107) VUID-VkDeviceGroupCommandBufferBeginInfo-deviceMask-00107

`deviceMask` **must** not be zero

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupCommandBufferBeginInfo-sType-sType) VUID-VkDeviceGroupCommandBufferBeginInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_COMMAND_BUFFER_BEGIN_INFO](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkDeviceGroupCommandBufferBeginInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
