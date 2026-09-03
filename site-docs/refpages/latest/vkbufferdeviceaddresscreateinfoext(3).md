# VkBufferDeviceAddressCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferDeviceAddressCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferDeviceAddressCreateInfoEXT - Request a specific address for a buffer

To request a specific device address for a buffer, add a
`VkBufferDeviceAddressCreateInfoEXT` structure to the `pNext` chain
of the [VkBufferCreateInfo](VkBufferCreateInfo.html) structure.
The `VkBufferDeviceAddressCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_buffer_device_address
typedef struct VkBufferDeviceAddressCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceAddress    deviceAddress;
} VkBufferDeviceAddressCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceAddress` is the device address requested for the buffer.

If `deviceAddress` is zero, no specific address is requested.

If `deviceAddress` is not zero, then it **must** be an address retrieved
from an identically created buffer on the same implementation.
The buffer **must** also be bound to an identically created
`VkDeviceMemory` object.

If this structure is not present, it is as if `deviceAddress` is zero.

Applications **should** avoid creating buffers with application-provided
addresses and implementation-provided addresses in the same process, to
reduce the likelihood of [VK_ERROR_INVALID_DEVICE_ADDRESS_EXT](VkResult.html) errors.

Valid Usage (Implicit)

* 
[](#VUID-VkBufferDeviceAddressCreateInfoEXT-sType-sType) VUID-VkBufferDeviceAddressCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkBufferDeviceAddressCreateInfoEXT-deviceAddress-parameter) VUID-VkBufferDeviceAddressCreateInfoEXT-deviceAddress-parameter

 If `deviceAddress` is not `0`, `deviceAddress` **must** be a valid `VkDeviceAddress` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](VkBufferCreateInfo.html)

[VK_EXT_buffer_device_address](VK_EXT_buffer_device_address.html), `VkDeviceAddress`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferDeviceAddressCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
