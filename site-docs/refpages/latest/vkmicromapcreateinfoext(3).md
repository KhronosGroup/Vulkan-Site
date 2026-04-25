# VkMicromapCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMicromapCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMicromapCreateInfoEXT - Structure specifying the parameters of a newly created micromap object

The `VkMicromapCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkMicromapCreateInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    VkMicromapCreateFlagsEXT    createFlags;
    VkBuffer                    buffer;
    VkDeviceSize                offset;
    VkDeviceSize                size;
    VkMicromapTypeEXT           type;
    VkDeviceAddress             deviceAddress;
} VkMicromapCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`createFlags` is a bitmask of [VkMicromapCreateFlagBitsEXT](VkMicromapCreateFlagBitsEXT.html)
specifying additional creation parameters of the micromap.

* 
`buffer` is the buffer on which the micromap will be stored.

* 
`offset` is an offset in bytes from the base address of the buffer
at which the micromap will be stored, and **must** be a multiple of `256`.

* 
`size` is the size required for the micromap.

* 
`type` is a [VkMicromapTypeEXT](VkMicromapTypeEXT.html) value specifying the type of
micromap that will be created.

* 
`deviceAddress` is the device address requested for the micromap if
the [`micromapCaptureReplay`](../../../../spec/latest/chapters/features.html#features-micromapCaptureReplay)
feature is being used.

If `deviceAddress` is zero, no specific address is requested.

If `deviceAddress` is not zero, `deviceAddress` **must** be an address
retrieved from an identically created micromap on the same implementation.
The micromap **must** also be placed on an identically created `buffer` and
at the same `offset`.

Applications **should** avoid creating micromaps with application-provided
addresses and implementation-provided addresses in the same process, to
reduce the likelihood of [VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](VkResult.html)
errors.

|  | The expected usage for this is that a trace capture/replay tool will add the
| --- | --- |
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html) flag to all buffers
that use [VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html), and will add
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html) to all buffers used as
storage for a micromap where `deviceAddress` is not zero.
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

If the micromap will be the target of a build operation, the required size
for a micromap **can** be queried with [vkGetMicromapBuildSizesEXT](vkGetMicromapBuildSizesEXT.html).

Valid Usage

* 
[](#VUID-VkMicromapCreateInfoEXT-deviceAddress-07433) VUID-VkMicromapCreateInfoEXT-deviceAddress-07433

If `deviceAddress` is not zero, `createFlags` **must** include
[VK_MICROMAP_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_EXT](VkMicromapCreateFlagBitsEXT.html)

* 
[](#VUID-VkMicromapCreateInfoEXT-createFlags-07434) VUID-VkMicromapCreateInfoEXT-createFlags-07434

If `createFlags` includes
[VK_MICROMAP_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_EXT](VkMicromapCreateFlagBitsEXT.html),
[VkPhysicalDeviceOpacityMicromapFeaturesEXT](VkPhysicalDeviceOpacityMicromapFeaturesEXT.html)::`micromapCaptureReplay`
**must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkMicromapCreateInfoEXT-buffer-07435) VUID-VkMicromapCreateInfoEXT-buffer-07435

`buffer` **must** have been created with the
[VK_BUFFER_USAGE_MICROMAP_STORAGE_BIT_EXT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkMicromapCreateInfoEXT-buffer-07436) VUID-VkMicromapCreateInfoEXT-buffer-07436

`buffer` **must** not have been created with
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkMicromapCreateInfoEXT-offset-07437) VUID-VkMicromapCreateInfoEXT-offset-07437

The sum of `offset` and `size` **must** be less than or equal to
the size of `buffer`

* 
[](#VUID-VkMicromapCreateInfoEXT-offset-07438) VUID-VkMicromapCreateInfoEXT-offset-07438

`offset` **must** be a multiple of `256` bytes

Valid Usage (Implicit)

* 
[](#VUID-VkMicromapCreateInfoEXT-sType-sType) VUID-VkMicromapCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MICROMAP_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkMicromapCreateInfoEXT-pNext-pNext) VUID-VkMicromapCreateInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMicromapCreateInfoEXT-createFlags-parameter) VUID-VkMicromapCreateInfoEXT-createFlags-parameter

 `createFlags` **must** be a valid combination of [VkMicromapCreateFlagBitsEXT](VkMicromapCreateFlagBitsEXT.html) values

* 
[](#VUID-VkMicromapCreateInfoEXT-buffer-parameter) VUID-VkMicromapCreateInfoEXT-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkMicromapCreateInfoEXT-type-parameter) VUID-VkMicromapCreateInfoEXT-type-parameter

 `type` **must** be a valid [VkMicromapTypeEXT](VkMicromapTypeEXT.html) value

* 
[](#VUID-VkMicromapCreateInfoEXT-deviceAddress-parameter) VUID-VkMicromapCreateInfoEXT-deviceAddress-parameter

 If `deviceAddress` is not `0`, `deviceAddress` **must** be a valid `VkDeviceAddress` value

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkBuffer](VkBuffer.html), `VkDeviceAddress`, `VkDeviceSize`, [VkMicromapCreateFlagsEXT](VkMicromapCreateFlagsEXT.html), [VkMicromapTypeEXT](VkMicromapTypeEXT.html), [VkStructureType](VkStructureType.html), [vkCreateMicromapEXT](vkCreateMicromapEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkMicromapCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
