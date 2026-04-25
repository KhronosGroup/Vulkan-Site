# vkCreateAccelerationStructure2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateAccelerationStructure2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateAccelerationStructure2KHR - Create a new acceleration structure object using a device address

To create an acceleration structure using a device address, call:

// Provided by VK_KHR_acceleration_structure with VK_KHR_device_address_commands
VkResult vkCreateAccelerationStructure2KHR(
    VkDevice                                    device,
    const VkAccelerationStructureCreateInfo2KHR* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkAccelerationStructureKHR*                 pAccelerationStructure);

* 
`device` is the logical device that creates the acceleration
structure object.

* 
`pCreateInfo` is a pointer to a
[VkAccelerationStructureCreateInfo2KHR](VkAccelerationStructureCreateInfo2KHR.html) structure containing
parameters affecting creation of the acceleration structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pAccelerationStructure` is a pointer to a
`VkAccelerationStructureKHR` handle in which the resulting
acceleration structure object is returned.

Similar to other objects in Vulkan, the acceleration structure creation
merely creates an object with a specific “shape”.
The type and quantity of geometry that can be built into an acceleration
structure is determined by the parameters of
[VkAccelerationStructureCreateInfo2KHR](VkAccelerationStructureCreateInfo2KHR.html).

The acceleration structure data is stored in the object referred to by
`VkAccelerationStructureCreateInfo2KHR`::`addressRange.address`.

Once the `VkAccelerationStructureKHR` object has been created, it **must**
be populated by acceleration structure build or acceleration structure copy
commands such as [vkCmdBuildAccelerationStructuresKHR](vkCmdBuildAccelerationStructuresKHR.html) and
[vkCmdCopyAccelerationStructureKHR](vkCmdCopyAccelerationStructureKHR.html).
Acceleration structures created with this command **must** not be used by host
commands.

|  | The expected usage for a trace capture/replay tool is that it will serialize
| --- | --- |
and later deserialize the acceleration structure data using acceleration
structure copy commands.
During capture the tool will use
[vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html) with a `mode` of
[VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR](VkCopyAccelerationStructureModeKHR.html), and
[vkCmdCopyMemoryToAccelerationStructureKHR](vkCmdCopyMemoryToAccelerationStructureKHR.html) with a `mode` of
[VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR](VkCopyAccelerationStructureModeKHR.html) during replay. |

Valid Usage

* 
[](#VUID-vkCreateAccelerationStructure2KHR-accelerationStructure-03611) VUID-vkCreateAccelerationStructure2KHR-accelerationStructure-03611

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCreateAccelerationStructure2KHR-device-03489) VUID-vkCreateAccelerationStructure2KHR-device-03489

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkCreateAccelerationStructure2KHR-deviceAddressCommands-13086) VUID-vkCreateAccelerationStructure2KHR-deviceAddressCommands-13086

The [    `VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR`::`deviceAddressCommands`](../../../../spec/latest/chapters/features.html#features-deviceAddressCommands)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateAccelerationStructure2KHR-device-parameter) VUID-vkCreateAccelerationStructure2KHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateAccelerationStructure2KHR-pCreateInfo-parameter) VUID-vkCreateAccelerationStructure2KHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkAccelerationStructureCreateInfo2KHR](VkAccelerationStructureCreateInfo2KHR.html) structure

* 
[](#VUID-vkCreateAccelerationStructure2KHR-pAllocator-parameter) VUID-vkCreateAccelerationStructure2KHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateAccelerationStructure2KHR-pAccelerationStructure-parameter) VUID-vkCreateAccelerationStructure2KHR-pAccelerationStructure-parameter

 `pAccelerationStructure` **must** be a valid pointer to a [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-vkCreateAccelerationStructure2KHR-device-queuecount) VUID-vkCreateAccelerationStructure2KHR-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAccelerationStructureCreateInfo2KHR](VkAccelerationStructureCreateInfo2KHR.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkCreateAccelerationStructure2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
