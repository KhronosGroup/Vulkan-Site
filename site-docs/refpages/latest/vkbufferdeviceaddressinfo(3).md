# VkBufferDeviceAddressInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferDeviceAddressInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferDeviceAddressInfo - Structure specifying the buffer to query an address for

The `VkBufferDeviceAddressInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkBufferDeviceAddressInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           buffer;
} VkBufferDeviceAddressInfo;

// Provided by VK_KHR_buffer_device_address
// Equivalent to VkBufferDeviceAddressInfo
typedef VkBufferDeviceAddressInfo VkBufferDeviceAddressInfoKHR;

// Provided by VK_EXT_buffer_device_address
// Equivalent to VkBufferDeviceAddressInfo
typedef VkBufferDeviceAddressInfo VkBufferDeviceAddressInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` specifies the buffer whose address is being queried.

Valid Usage

* 
[](#VUID-VkBufferDeviceAddressInfo-buffer-02601) VUID-VkBufferDeviceAddressInfo-buffer-02601

`buffer` **must** have been created with the
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkBufferDeviceAddressInfo-sType-sType) VUID-VkBufferDeviceAddressInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_INFO](VkStructureType.html)

* 
[](#VUID-VkBufferDeviceAddressInfo-pNext-pNext) VUID-VkBufferDeviceAddressInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBufferDeviceAddressInfo-buffer-parameter) VUID-VkBufferDeviceAddressInfo-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

[VK_EXT_buffer_device_address](VK_EXT_buffer_device_address.html), [VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkBuffer](VkBuffer.html), [VkStructureType](VkStructureType.html), [vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html), [vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html), [vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html), [vkGetBufferOpaqueCaptureAddress](vkGetBufferOpaqueCaptureAddress.html), [vkGetBufferOpaqueCaptureAddress](vkGetBufferOpaqueCaptureAddress.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferDeviceAddressInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
