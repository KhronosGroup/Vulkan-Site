# VkAccelerationStructureCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureCreateInfoKHR - Structure specifying the parameters of a newly created acceleration structure object

The `VkAccelerationStructureCreateInfoKHR` structure is defined as:

|  | This functionality is superseded by [VkAccelerationStructureCreateInfo2KHR](../../../../spec/latest/chapters/resources.html#VkAccelerationStructureCreateInfo2KHR). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-buffer-commands) for more information. |
| --- | --- |

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureCreateInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    VkAccelerationStructureCreateFlagsKHR    createFlags;
    VkBuffer                                 buffer;
    VkDeviceSize                             offset;
    VkDeviceSize                             size;
    VkAccelerationStructureTypeKHR           type;
    VkDeviceAddress                          deviceAddress;
} VkAccelerationStructureCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`createFlags` is a bitmask of
[VkAccelerationStructureCreateFlagBitsKHR](VkAccelerationStructureCreateFlagBitsKHR.html) specifying additional
creation parameters of the acceleration structure.

* 
`buffer` is the buffer on which the acceleration structure will be
stored.

* 
`offset` is an offset in bytes from the base address of the buffer
at which the acceleration structure will be stored, and **must** be a
multiple of `256`.

* 
`size` is the size required for the acceleration structure.

* 
`type` is a [VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html) value specifying
the type of acceleration structure that will be created.

* 
`deviceAddress` is the device address requested for the acceleration
structure, obtained from
[vkGetAccelerationStructureDeviceAddressKHR](vkGetAccelerationStructureDeviceAddressKHR.html), if the
[    `accelerationStructureCaptureReplay`](../../../../spec/latest/chapters/features.html#features-accelerationStructureCaptureReplay) feature is being used.
If `deviceAddress` is zero, no specific address is requested.

Applications **should** avoid creating acceleration structures with
application-provided addresses and implementation-provided addresses in the
same process, to reduce the likelihood of
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](VkResult.html) errors.

|  | The expected usage for this is that a trace capture/replay tool will add the
| --- | --- |
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html) flag to all buffers
that use [VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html), and will add
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html) to all buffers used as
storage for an acceleration structure where `deviceAddress` is not zero.
This also means that the tool will need to add
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](VkMemoryAllocateFlagBits.html) to memory allocations to allow
the flag to be set where the application may not have otherwise required it.
During capture the tool will save the queried opaque device addresses in the
trace.
During replay, the buffers will be created specifying the original address
so any address values stored in the trace data will remain valid.

Implementations are expected to separate such buffers in the GPU address
space so normal allocations will avoid using these addresses.
Applications and tools should avoid mixing application-provided and
implementation-provided addresses for buffers created with
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html), to avoid address
space allocation conflicts. |

Applications **should** create an acceleration structure with a specific
[VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html) other than
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html).

|  | [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html) is intended to be used by
| --- | --- |
API translation layers.
This can be used at acceleration structure creation time in cases where the
actual acceleration structure type (top or bottom) is not yet known.
The actual acceleration structure type must be specified as
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](VkAccelerationStructureTypeKHR.html) when the build is
performed. |

If the acceleration structure will be the target of a build operation, the
required size for an acceleration structure **can** be queried with
[vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html).
If the acceleration structure is going to be the target of a compacting
copy, [vkCmdWriteAccelerationStructuresPropertiesKHR](vkCmdWriteAccelerationStructuresPropertiesKHR.html) or
[vkWriteAccelerationStructuresPropertiesKHR](vkWriteAccelerationStructuresPropertiesKHR.html) **can** be used to obtain the
compacted size required.

If the acceleration structure will be the target of a build operation with
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) it **must** include
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](VkAccelerationStructureCreateFlagBitsKHR.html) in `createFlags`
and include [VkAccelerationStructureMotionInfoNV](VkAccelerationStructureMotionInfoNV.html) as an extension
structure in `pNext` with the number of instances as metadata for the
object.

Valid Usage

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-03612) VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-03612

If `deviceAddress` is not zero, `createFlags` **must** include
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](VkAccelerationStructureCreateFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-09488) VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-09488

If `deviceAddress` is not zero, it **must** have been retrieved from an
identically created acceleration structure, except for `buffer` and
`deviceAddress`

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-09489) VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-09489

If `deviceAddress` is not zero, `buffer` **must** have been created
identically to the `buffer` used to create the acceleration
structure from which `deviceAddress` was retrieved, except for
[VkBufferOpaqueCaptureAddressCreateInfo](VkBufferOpaqueCaptureAddressCreateInfo.html)::`opaqueCaptureAddress`

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-09490) VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-09490

If `deviceAddress` is not zero, `buffer` **must** have been created
with a
[VkBufferOpaqueCaptureAddressCreateInfo](VkBufferOpaqueCaptureAddressCreateInfo.html)::`opaqueCaptureAddress`
that was retrieved from [vkGetBufferOpaqueCaptureAddress](vkGetBufferOpaqueCaptureAddress.html) for the
`buffer` that was used to create the acceleration structure from
which `deviceAddress` was retrieved

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-buffer-03614) VUID-VkAccelerationStructureCreateInfoKHR-buffer-03614

`buffer` **must** have been created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](VkBufferUsageFlagBits.html) usage flag
set

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-buffer-03615) VUID-VkAccelerationStructureCreateInfoKHR-buffer-03615

`buffer` **must** not have been created with
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-offset-03616) VUID-VkAccelerationStructureCreateInfoKHR-offset-03616

The sum of `offset` and `size` **must** be less than or equal to
the size of `buffer`

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-offset-03734) VUID-VkAccelerationStructureCreateInfoKHR-offset-03734

`offset` **must** be a multiple of `256` bytes

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-createFlags-03613) VUID-VkAccelerationStructureCreateInfoKHR-createFlags-03613

If `createFlags` includes
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](VkAccelerationStructureCreateFlagBitsKHR.html),
[VkPhysicalDeviceAccelerationStructureFeaturesKHR](VkPhysicalDeviceAccelerationStructureFeaturesKHR.html)::`accelerationStructureCaptureReplay`
**must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-createFlags-04954) VUID-VkAccelerationStructureCreateInfoKHR-createFlags-04954

If [VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](VkAccelerationStructureCreateFlagBitsKHR.html) is set in
`createFlags` and `type` is
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html), one member of the
`pNext` chain **must** be a pointer to a valid instance of
[VkAccelerationStructureMotionInfoNV](VkAccelerationStructureMotionInfoNV.html)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-createFlags-04955) VUID-VkAccelerationStructureCreateInfoKHR-createFlags-04955

If any geometry includes
`VkAccelerationStructureGeometryMotionTrianglesDataNV` then
`createFlags` **must** contain
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](VkAccelerationStructureCreateFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-createFlags-08108) VUID-VkAccelerationStructureCreateInfoKHR-createFlags-08108

If `createFlags` includes
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkAccelerationStructureCreateFlagBitsKHR.html),
the [    `descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-pNext-08109) VUID-VkAccelerationStructureCreateInfoKHR-pNext-08109

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) structure,
`createFlags` **must** contain
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkAccelerationStructureCreateFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-sType-sType) VUID-VkAccelerationStructureCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-pNext-pNext) VUID-VkAccelerationStructureCreateInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAccelerationStructureMotionInfoNV](VkAccelerationStructureMotionInfoNV.html) or [VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-sType-unique) VUID-VkAccelerationStructureCreateInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-createFlags-parameter) VUID-VkAccelerationStructureCreateInfoKHR-createFlags-parameter

 `createFlags` **must** be a valid combination of [VkAccelerationStructureCreateFlagBitsKHR](VkAccelerationStructureCreateFlagBitsKHR.html) values

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-buffer-parameter) VUID-VkAccelerationStructureCreateInfoKHR-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-type-parameter) VUID-VkAccelerationStructureCreateInfoKHR-type-parameter

 `type` **must** be a valid [VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html) value

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-parameter) VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-parameter

 If `deviceAddress` is not `0`, `deviceAddress` **must** be a valid `VkDeviceAddress` value

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureCreateFlagsKHR](VkAccelerationStructureCreateFlagsKHR.html), [VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html), [VkBuffer](VkBuffer.html), `VkDeviceAddress`, `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkAccelerationStructureCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
