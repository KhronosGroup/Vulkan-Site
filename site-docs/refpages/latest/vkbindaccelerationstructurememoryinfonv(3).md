# VkBindAccelerationStructureMemoryInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindAccelerationStructureMemoryInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindAccelerationStructureMemoryInfoNV - Structure specifying acceleration structure memory binding

The `VkBindAccelerationStructureMemoryInfoNV` structure is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkBindAccelerationStructureMemoryInfoNV {
    VkStructureType              sType;
    const void*                  pNext;
    VkAccelerationStructureNV    accelerationStructure;
    VkDeviceMemory               memory;
    VkDeviceSize                 memoryOffset;
    uint32_t                     deviceIndexCount;
    const uint32_t*              pDeviceIndices;
} VkBindAccelerationStructureMemoryInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructure` is the acceleration structure to be attached
to memory.

* 
`memory` is a `VkDeviceMemory` object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the region of memory that is
to be bound to the acceleration structure.
The number of bytes returned in the
[VkMemoryRequirements](VkMemoryRequirements.html)::`size` member in `memory`, starting
from `memoryOffset` bytes, will be bound to the specified
acceleration structure.

* 
`deviceIndexCount` is the number of elements in
`pDeviceIndices`.

* 
`pDeviceIndices` is a pointer to an array of device indices.

Valid Usage

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-accelerationStructure-03620) VUID-VkBindAccelerationStructureMemoryInfoNV-accelerationStructure-03620

`accelerationStructure` **must** not already be backed by a memory
object

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-memoryOffset-03621) VUID-VkBindAccelerationStructureMemoryInfoNV-memoryOffset-03621

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-memory-03622) VUID-VkBindAccelerationStructureMemoryInfoNV-memory-03622

`memory` **must** have been allocated using one of the memory types
allowed in the `memoryTypeBits` member of the
[VkMemoryRequirements](VkMemoryRequirements.html) structure returned from a call to
[vkGetAccelerationStructureMemoryRequirementsNV](vkGetAccelerationStructureMemoryRequirementsNV.html) with
`accelerationStructure` and `type` of
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_OBJECT_NV](VkAccelerationStructureMemoryRequirementsTypeNV.html)

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-memoryOffset-03623) VUID-VkBindAccelerationStructureMemoryInfoNV-memoryOffset-03623

`memoryOffset` **must** be an integer multiple of the `alignment`
member of the [VkMemoryRequirements](VkMemoryRequirements.html) structure returned from a call
to [vkGetAccelerationStructureMemoryRequirementsNV](vkGetAccelerationStructureMemoryRequirementsNV.html) with
`accelerationStructure` and `type` of
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_OBJECT_NV](VkAccelerationStructureMemoryRequirementsTypeNV.html)

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-size-03624) VUID-VkBindAccelerationStructureMemoryInfoNV-size-03624

The `size` member of the `VkMemoryRequirements` structure
returned from a call to
[vkGetAccelerationStructureMemoryRequirementsNV](vkGetAccelerationStructureMemoryRequirementsNV.html) with
`accelerationStructure` and `type` of
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_OBJECT_NV](VkAccelerationStructureMemoryRequirementsTypeNV.html) **must**
be less than or equal to the size of `memory` minus
`memoryOffset`

Valid Usage (Implicit)

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-sType-sType) VUID-VkBindAccelerationStructureMemoryInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_ACCELERATION_STRUCTURE_MEMORY_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-pNext-pNext) VUID-VkBindAccelerationStructureMemoryInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-accelerationStructure-parameter) VUID-VkBindAccelerationStructureMemoryInfoNV-accelerationStructure-parameter

 `accelerationStructure` **must** be a valid [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handle

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-memory-parameter) VUID-VkBindAccelerationStructureMemoryInfoNV-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-pDeviceIndices-parameter) VUID-VkBindAccelerationStructureMemoryInfoNV-pDeviceIndices-parameter

 If `deviceIndexCount` is not `0`, `pDeviceIndices` **must** be a valid pointer to an array of `deviceIndexCount` `uint32_t` values

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-commonparent) VUID-VkBindAccelerationStructureMemoryInfoNV-commonparent

 Both of `accelerationStructure`, and `memory` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureNV](VkAccelerationStructureNV.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkBindAccelerationStructureMemoryNV](vkBindAccelerationStructureMemoryNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBindAccelerationStructureMemoryInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
