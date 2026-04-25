# VkAccelerationStructureCreateInfo2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureCreateInfo2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureCreateInfo2KHR - Structure specifying the parameters of a newly created acceleration structure object using a device address

The `VkAccelerationStructureCreateInfo2KHR` structure is defined as:

// Provided by VK_KHR_acceleration_structure with VK_KHR_device_address_commands
typedef struct VkAccelerationStructureCreateInfo2KHR {
    VkStructureType                          sType;
    const void*                              pNext;
    VkAccelerationStructureCreateFlagsKHR    createFlags;
    VkDeviceAddressRangeKHR                  addressRange;
    VkAddressCommandFlagsKHR                 addressFlags;
    VkAccelerationStructureTypeKHR           type;
} VkAccelerationStructureCreateInfo2KHR;

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
`addressRange` is a [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) structure defining
the size required for the acceleration structure and its starting
address.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining
the flags for the address range.

* 
`type` is a [VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html) value specifying
the type of acceleration structure that will be created.

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

During replay, if `createFlags` includes
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](VkAccelerationStructureCreateFlagBitsKHR.html),
`addressRange.address` **must** be an address used to create an identical
acceleration structure on the same implementation.
The address **must** be in the range of an identically created [VkBuffer](VkBuffer.html)
at the same offset.

Applications **should** avoid creating acceleration structures with
application-provided addresses and implementation-provided addresses in the
same process, to reduce the likelihood of
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](VkResult.html) errors.

|  | The expected usage for this is that a trace capture/replay tool will add the
| --- | --- |
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html) flag and
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html) to all buffers used as
storage for an acceleration structure with
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](VkAccelerationStructureCreateFlagBitsKHR.html)
included in `createFlags`.
This also means that the tool will need to add
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](VkMemoryAllocateFlagBits.html) to memory allocations to allow
the [VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html) flag to be set where the
application may not have otherwise required it.
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

If the acceleration structure will be the target of a build operation, the
required size for an acceleration structure **can** be queried with
[vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html).
If the acceleration structure is going to be the target of a copy,
[vkCmdWriteAccelerationStructuresPropertiesKHR](vkCmdWriteAccelerationStructuresPropertiesKHR.html) **can** be used to obtain
the size required depending on the type of copy.

If the acceleration structure will be the target of a build operation with
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) it **must** include
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](VkAccelerationStructureCreateFlagBitsKHR.html) in `createFlags`
and include [VkAccelerationStructureMotionInfoNV](VkAccelerationStructureMotionInfoNV.html) as an extension
structure in `pNext` with the number of instances as metadata for the
object.

Valid Usage

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13097) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13098) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13099) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressFlags-13100) VUID-VkAccelerationStructureCreateInfo2KHR-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13122) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13123) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressFlags-13101) VUID-VkAccelerationStructureCreateInfo2KHR-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13124) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13125) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11602) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11602

`addressRange.address` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11603) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11603

`addressRange` **must** specify a range within a valid address
retrieved from `buffer` that was created with a `usage` value
containing [VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](VkBufferUsageFlagBits.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11604) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11604

`addressRange` **must** specify a range within a valid address
retrieved from `buffer` that was not created with a `flags`
value containing [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11605) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11605

`addressRange.address` **must** be a multiple of `256` bytes

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-11606) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-11606

If the `address` member of `addressRange` was retrieved from a
[VkBuffer](VkBuffer.html) created with
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html),
`createFlags` **must** include
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](VkAccelerationStructureCreateFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-11607) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-11607

If the `address` member of `addressRange` was retrieved from a
[VkBuffer](VkBuffer.html) not created with
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html),
`createFlags` **must** not include
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](VkAccelerationStructureCreateFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11608) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11608

`addressRange.size` **must** be greater than zero

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-03613) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-03613

If `createFlags` includes
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](VkAccelerationStructureCreateFlagBitsKHR.html),
[VkPhysicalDeviceAccelerationStructureFeaturesKHR](VkPhysicalDeviceAccelerationStructureFeaturesKHR.html)::`accelerationStructureCaptureReplay`
**must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-04954) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-04954

If [VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](VkAccelerationStructureCreateFlagBitsKHR.html) is set in
`createFlags` and `type` is
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html), one member of the
`pNext` chain **must** be a pointer to a valid instance of
[VkAccelerationStructureMotionInfoNV](VkAccelerationStructureMotionInfoNV.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-04955) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-04955

If any geometry includes
`VkAccelerationStructureGeometryMotionTrianglesDataNV` then
`createFlags` **must** contain
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](VkAccelerationStructureCreateFlagBitsKHR.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-08108) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-08108

If `createFlags` includes
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkAccelerationStructureCreateFlagBitsKHR.html),
the [    `descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-pNext-08109) VUID-VkAccelerationStructureCreateInfo2KHR-pNext-08109

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) structure,
`createFlags` **must** contain
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkAccelerationStructureCreateFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-sType-sType) VUID-VkAccelerationStructureCreateInfo2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_2_KHR](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-pNext-pNext) VUID-VkAccelerationStructureCreateInfo2KHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-sType-unique) VUID-VkAccelerationStructureCreateInfo2KHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-parameter) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-parameter

 `createFlags` **must** be a valid combination of [VkAccelerationStructureCreateFlagBitsKHR](VkAccelerationStructureCreateFlagBitsKHR.html) values

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressFlags-parameter) VUID-VkAccelerationStructureCreateInfo2KHR-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-type-parameter) VUID-VkAccelerationStructureCreateInfo2KHR-type-parameter

 `type` **must** be a valid [VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html) value

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAccelerationStructureCreateFlagsKHR](VkAccelerationStructureCreateFlagsKHR.html), [VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkStructureType](VkStructureType.html), [vkCreateAccelerationStructure2KHR](vkCreateAccelerationStructure2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkAccelerationStructureCreateInfo2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
