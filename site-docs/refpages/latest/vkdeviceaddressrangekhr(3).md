# VkDeviceAddressRangeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceAddressRangeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceAddressRangeKHR - Structure specifying a device address range

A device address range indicates a sized range of device memory.

// Provided by VK_KHR_device_address_commands
typedef struct VkDeviceAddressRangeKHR {
    VkDeviceAddress    address;
    VkDeviceSize       size;
} VkDeviceAddressRangeKHR;

// Provided by VK_EXT_descriptor_heap
// Equivalent to VkDeviceAddressRangeKHR
typedef VkDeviceAddressRangeKHR VkDeviceAddressRangeEXT;

* 
`address` is 0 or a `VkDeviceAddress` specifying the start of
the range.

* 
`size` is a `VkDeviceSize` specifying the size of the range.

Valid Usage

* 
[](#VUID-VkDeviceAddressRangeKHR-size-11411) VUID-VkDeviceAddressRangeKHR-size-11411

If `size` is not 0, `address` **must** not be 0

* 
[](#VUID-VkDeviceAddressRangeKHR-address-11365) VUID-VkDeviceAddressRangeKHR-address-11365

The sum of `address` and `size` **must** be less than or equal to
the sum of an address retrieved from a [VkBuffer](VkBuffer.html) and the value of
[VkBufferCreateInfo](VkBufferCreateInfo.html)::`size` used to create that [VkBuffer](VkBuffer.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceAddressRangeKHR-address-parameter) VUID-VkDeviceAddressRangeKHR-address-parameter

 If `address` is not `0`, `address` **must** be a valid `VkDeviceAddress` value

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAccelerationStructureCreateInfo2KHR](VkAccelerationStructureCreateInfo2KHR.html), [VkBindHeapInfoEXT](VkBindHeapInfoEXT.html), [VkBindIndexBuffer3InfoKHR](VkBindIndexBuffer3InfoKHR.html), [VkBindTransformFeedbackBuffer2InfoEXT](VkBindTransformFeedbackBuffer2InfoEXT.html), [VkConditionalRenderingBeginInfo2EXT](VkConditionalRenderingBeginInfo2EXT.html), `VkDeviceAddress`, [VkDeviceMemoryCopyKHR](VkDeviceMemoryCopyKHR.html), [VkDeviceMemoryImageCopyKHR](VkDeviceMemoryImageCopyKHR.html), `VkDeviceSize`, [VkDispatchIndirect2InfoKHR](VkDispatchIndirect2InfoKHR.html), [VkDrawIndirectCount2InfoKHR](VkDrawIndirectCount2InfoKHR.html), [VkMemoryMarkerInfoAMD](VkMemoryMarkerInfoAMD.html), [VkMemoryRangeBarrierKHR](VkMemoryRangeBarrierKHR.html), [VkResourceDescriptorDataEXT](VkResourceDescriptorDataEXT.html), [VkTexelBufferDescriptorInfoEXT](VkTexelBufferDescriptorInfoEXT.html), [vkCmdFillMemoryKHR](vkCmdFillMemoryKHR.html), [vkCmdUpdateMemoryKHR](vkCmdUpdateMemoryKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkDeviceAddressRangeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
