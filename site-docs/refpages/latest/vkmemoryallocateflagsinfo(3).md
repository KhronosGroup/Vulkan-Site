# VkMemoryAllocateFlagsInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryAllocateFlagsInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryAllocateFlagsInfo - Structure controlling how many instances of memory will be allocated

If the `pNext` chain of [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) includes a
`VkMemoryAllocateFlagsInfo` structure, then that structure includes
flags and a device mask controlling how many instances of the memory will be
allocated.

The `VkMemoryAllocateFlagsInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkMemoryAllocateFlagsInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkMemoryAllocateFlags    flags;
    uint32_t                 deviceMask;
} VkMemoryAllocateFlagsInfo;

// Provided by VK_KHR_device_group
// Equivalent to VkMemoryAllocateFlagsInfo
typedef VkMemoryAllocateFlagsInfo VkMemoryAllocateFlagsInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkMemoryAllocateFlagBits](VkMemoryAllocateFlagBits.html) controlling
the allocation.

* 
`deviceMask` is a mask of physical devices in the logical device,
indicating that memory **must** be allocated on each device in the mask, if
[VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT](VkMemoryAllocateFlagBits.html) is set in `flags`.

If [VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT](VkMemoryAllocateFlagBits.html) is not set, the number of
instances allocated depends on whether
[VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](VkMemoryHeapFlagBits.html) is set in the memory heap.
If [VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](VkMemoryHeapFlagBits.html) is set, then memory is allocated
for every physical device in the logical device (as if `deviceMask` has
bits set for all device indices).
If [VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](VkMemoryHeapFlagBits.html) is not set, then a single
instance of memory is allocated (as if `deviceMask` is set to one).

On some implementations, allocations from a multi-instance heap **may** consume
memory on all physical devices even if the `deviceMask` excludes some
devices.
If [VkPhysicalDeviceGroupProperties](VkPhysicalDeviceGroupProperties.html)::`subsetAllocation` is
[VK_TRUE](VK_TRUE.html), then memory is only consumed for the devices in the device
mask.

|  | In practice, most allocations on a multi-instance heap will be allocated
| --- | --- |
across all physical devices.
Unicast allocation support is an optional optimization for a minority of
allocations. |

Valid Usage

* 
[](#VUID-VkMemoryAllocateFlagsInfo-deviceMask-00675) VUID-VkMemoryAllocateFlagsInfo-deviceMask-00675

If [VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT](VkMemoryAllocateFlagBits.html) is set, `deviceMask`
**must** be a valid device mask

* 
[](#VUID-VkMemoryAllocateFlagsInfo-deviceMask-00676) VUID-VkMemoryAllocateFlagsInfo-deviceMask-00676

If [VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT](VkMemoryAllocateFlagBits.html) is set, `deviceMask`
**must** not be zero

* 
[](#VUID-VkMemoryAllocateFlagsInfo-flags-10760) VUID-VkMemoryAllocateFlagsInfo-flags-10760

If the allocation is performing a memory import operation, then
`flags` **must** not contain
[VK_MEMORY_ALLOCATE_ZERO_INITIALIZE_BIT_EXT](VkMemoryAllocateFlagBits.html)

* 
[](#VUID-VkMemoryAllocateFlagsInfo-flags-10761) VUID-VkMemoryAllocateFlagsInfo-flags-10761

If the allocation uses protected memory, then `flags` **must** not
contain [VK_MEMORY_ALLOCATE_ZERO_INITIALIZE_BIT_EXT](VkMemoryAllocateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryAllocateFlagsInfo-sType-sType) VUID-VkMemoryAllocateFlagsInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_FLAGS_INFO](VkStructureType.html)

* 
[](#VUID-VkMemoryAllocateFlagsInfo-flags-parameter) VUID-VkMemoryAllocateFlagsInfo-flags-parameter

 `flags` **must** be a valid combination of [VkMemoryAllocateFlagBits](VkMemoryAllocateFlagBits.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkMemoryAllocateFlags](VkMemoryAllocateFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryAllocateFlagsInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
