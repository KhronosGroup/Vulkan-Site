# vkGetAccelerationStructureDeviceAddressKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetAccelerationStructureDeviceAddressKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetAccelerationStructureDeviceAddressKHR - Query an address of an acceleration structure

To query the 64-bit device address for an acceleration structure, call:

// Provided by VK_KHR_acceleration_structure
VkDeviceAddress vkGetAccelerationStructureDeviceAddressKHR(
    VkDevice                                    device,
    const VkAccelerationStructureDeviceAddressInfoKHR* pInfo);

* 
`device` is the logical device that the acceleration structure was
created on.

* 
`pInfo` is a pointer to a
[VkAccelerationStructureDeviceAddressInfoKHR](VkAccelerationStructureDeviceAddressInfoKHR.html) structure specifying
the acceleration structure to retrieve an address for.

The 64-bit return value is an address of the acceleration structure, which
can be used for device and shader operations that involve acceleration
structures, such as
ray traversal and
acceleration structure building.

If the acceleration structure was created with
[vkCreateAccelerationStructure2KHR](vkCreateAccelerationStructure2KHR.html), the return value will be the same
address as `addressRange.address`.

If the acceleration structure was created with
[vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html) with a non-zero value of
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`deviceAddress`, the return
value will be the same address.

If the acceleration structure was created with a `type` of
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html), the returned address **must**
be consistent with the relative offset to other acceleration structures with
`type` [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html) allocated with
the same [VkBuffer](VkBuffer.html).
That is, the difference in returned addresses between the two **must** be the
same as the difference in offsets provided at acceleration structure
creation.

The returned address **must** be aligned to 256 bytes.

|  | For acceleration structures created with
| --- | --- |
[vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html), their device address **may** be
different from the buffer device address corresponding to the acceleration
structure’s start offset in its storage buffer for acceleration structure
types other than [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html). |

Valid Usage

* 
[](#VUID-vkGetAccelerationStructureDeviceAddressKHR-accelerationStructure-08935) VUID-vkGetAccelerationStructureDeviceAddressKHR-accelerationStructure-08935

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkGetAccelerationStructureDeviceAddressKHR-device-03504) VUID-vkGetAccelerationStructureDeviceAddressKHR-device-03504

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkGetAccelerationStructureDeviceAddressKHR-pInfo-09541) VUID-vkGetAccelerationStructureDeviceAddressKHR-pInfo-09541

If the buffer on which `pInfo->accelerationStructure` was placed is
non-sparse then it **must** be bound completely and contiguously to a
single `VkDeviceMemory` object

* 
[](#VUID-vkGetAccelerationStructureDeviceAddressKHR-pInfo-09542) VUID-vkGetAccelerationStructureDeviceAddressKHR-pInfo-09542

The buffer on which `pInfo->accelerationStructure` was placed **must**
have been created with the
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-vkGetAccelerationStructureDeviceAddressKHR-device-parameter) VUID-vkGetAccelerationStructureDeviceAddressKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetAccelerationStructureDeviceAddressKHR-pInfo-parameter) VUID-vkGetAccelerationStructureDeviceAddressKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkAccelerationStructureDeviceAddressInfoKHR](VkAccelerationStructureDeviceAddressInfoKHR.html) structure

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureDeviceAddressInfoKHR](VkAccelerationStructureDeviceAddressInfoKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetAccelerationStructureDeviceAddressKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
