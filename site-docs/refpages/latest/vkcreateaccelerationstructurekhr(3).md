# vkCreateAccelerationStructureKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateAccelerationStructureKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateAccelerationStructureKHR - Create a new acceleration structure object

To create an acceleration structure using a buffer, call:

|  | This functionality is superseded by [vkCreateAccelerationStructure2KHR](../../../../spec/latest/chapters/resources.html#vkCreateAccelerationStructure2KHR). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-buffer-commands) for more information. |
| --- | --- |

// Provided by VK_KHR_acceleration_structure
VkResult vkCreateAccelerationStructureKHR(
    VkDevice                                    device,
    const VkAccelerationStructureCreateInfoKHR* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkAccelerationStructureKHR*                 pAccelerationStructure);

* 
`device` is the logical device that creates the acceleration
structure object.

* 
`pCreateInfo` is a pointer to a
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html) structure containing
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
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html).

The acceleration structure data is stored in the object referred to by
`VkAccelerationStructureCreateInfoKHR`::`buffer`.
Once memory has been bound to that buffer, it **must** be populated by
acceleration structure build or acceleration structure copy commands such as
[vkCmdBuildAccelerationStructuresKHR](vkCmdBuildAccelerationStructuresKHR.html),
[vkBuildAccelerationStructuresKHR](vkBuildAccelerationStructuresKHR.html),
[vkCmdCopyAccelerationStructureKHR](vkCmdCopyAccelerationStructureKHR.html), and
[vkCopyAccelerationStructureKHR](vkCopyAccelerationStructureKHR.html).

|  | The expected usage for a trace capture/replay tool is that it will serialize
| --- | --- |
and later deserialize the acceleration structure data using acceleration
structure copy commands.
During capture the tool will use
[vkCopyAccelerationStructureToMemoryKHR](vkCopyAccelerationStructureToMemoryKHR.html) or
[vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html) with a `mode` of
[VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR](VkCopyAccelerationStructureModeKHR.html), and
[vkCopyMemoryToAccelerationStructureKHR](vkCopyMemoryToAccelerationStructureKHR.html) or
[vkCmdCopyMemoryToAccelerationStructureKHR](vkCmdCopyMemoryToAccelerationStructureKHR.html) with a `mode` of
[VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR](VkCopyAccelerationStructureModeKHR.html) during replay. |

|  | Memory does not need to be bound to the underlying buffer when
| --- | --- |
[vkCreateAccelerationStructureKHR](#) is called. |

The input buffers passed to acceleration structure build commands will be
referenced by the implementation for the duration of the command.
After the command completes, the acceleration structure **may** hold a
reference to any acceleration structure specified by an active instance
contained therein.
Apart from this referencing, acceleration structures **must** be fully
self-contained.
The application **can** reuse or free any memory which was used by the command
as an input or as scratch without affecting the results of ray traversal.

Valid Usage

* 
[](#VUID-vkCreateAccelerationStructureKHR-accelerationStructure-03611) VUID-vkCreateAccelerationStructureKHR-accelerationStructure-03611

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCreateAccelerationStructureKHR-device-03489) VUID-vkCreateAccelerationStructureKHR-device-03489

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkCreateAccelerationStructureKHR-deviceAddress-03488) VUID-vkCreateAccelerationStructureKHR-deviceAddress-03488

If [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`deviceAddress` is
not zero, the [    `accelerationStructureCaptureReplay`](../../../../spec/latest/chapters/features.html#features-accelerationStructureCaptureReplay) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateAccelerationStructureKHR-device-parameter) VUID-vkCreateAccelerationStructureKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateAccelerationStructureKHR-pCreateInfo-parameter) VUID-vkCreateAccelerationStructureKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html) structure

* 
[](#VUID-vkCreateAccelerationStructureKHR-pAllocator-parameter) VUID-vkCreateAccelerationStructureKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateAccelerationStructureKHR-pAccelerationStructure-parameter) VUID-vkCreateAccelerationStructureKHR-pAccelerationStructure-parameter

 `pAccelerationStructure` **must** be a valid pointer to a [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-vkCreateAccelerationStructureKHR-device-queuecount) VUID-vkCreateAccelerationStructureKHR-device-queuecount

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

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkCreateAccelerationStructureKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
