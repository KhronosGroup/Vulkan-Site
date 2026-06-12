# VkStridedDeviceAddressRangeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkStridedDeviceAddressRangeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkStridedDeviceAddressRangeKHR - Structure specifying a device address range with a stride

A strided device address range is defined by the structure:

// Provided by VK_KHR_copy_memory_indirect, VK_KHR_device_address_commands
typedef struct VkStridedDeviceAddressRangeKHR {
    VkDeviceAddress    address;
    VkDeviceSize       size;
    VkDeviceSize       stride;
} VkStridedDeviceAddressRangeKHR;

* 
`address` is a `VkDeviceAddress` specifying the start of the
range.

* 
`size` is a `VkDeviceSize` specifying the size of the range.

* 
`stride` is a `VkDeviceSize` specifying the stride of
elements over the range.

Valid Usage

* 
[](#VUID-VkStridedDeviceAddressRangeKHR-size-11411) VUID-VkStridedDeviceAddressRangeKHR-size-11411

If `size` is not 0, `address` **must** not be 0

* 
[](#VUID-VkStridedDeviceAddressRangeKHR-address-11365) VUID-VkStridedDeviceAddressRangeKHR-address-11365

The sum of `address` and `size` **must** be less than or equal to
the sum of an address retrieved from a [VkBuffer](VkBuffer.html) and the value of
[VkBufferCreateInfo](VkBufferCreateInfo.html)::`size` used to create that [VkBuffer](VkBuffer.html)

* 
[](#VUID-VkStridedDeviceAddressRangeKHR-stride-10957) VUID-VkStridedDeviceAddressRangeKHR-stride-10957

`stride` **must** be less than or equal to `size`

Valid Usage (Implicit)

* 
[](#VUID-VkStridedDeviceAddressRangeKHR-address-parameter) VUID-VkStridedDeviceAddressRangeKHR-address-parameter

 If `address` is not `0`, `address` **must** be a valid `VkDeviceAddress` value

[VK_KHR_copy_memory_indirect](VK_KHR_copy_memory_indirect.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkBindVertexBuffer3InfoKHR](VkBindVertexBuffer3InfoKHR.html), [VkCopyMemoryIndirectInfoKHR](VkCopyMemoryIndirectInfoKHR.html), [VkCopyMemoryToImageIndirectInfoKHR](VkCopyMemoryToImageIndirectInfoKHR.html), `VkDeviceAddress`, `VkDeviceSize`, [VkDrawIndirect2InfoKHR](VkDrawIndirect2InfoKHR.html), [VkDrawIndirectCount2InfoKHR](VkDrawIndirectCount2InfoKHR.html), [vkCmdCopyQueryPoolResultsToMemoryKHR](vkCmdCopyQueryPoolResultsToMemoryKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkStridedDeviceAddressRangeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
