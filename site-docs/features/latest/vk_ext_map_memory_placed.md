# VK_EXT_map_memory_placed

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_map_memory_placed.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Dependencies](#_dependencies)
- [3.2. API Features](#_api_features)
- [3.2._API_Features](#_api_features)
- [4. Examples](#_examples)
- [5. Issues](#_issues)
- [5.1. How should the requested address be passed to vkMapMemory2KHR()?](#_how_should_the_requested_address_be_passed_to_vkmapmemory2khr)
- [5.1._How_should_the_requested_address_be_passed_to_vkMapMemory2KHR()?](#_how_should_the_requested_address_be_passed_to_vkmapmemory2khr)
- [5.2. What should happen if the implementation cannot place the memory map at the requested address?](#_what_should_happen_if_the_implementation_cannot_place_the_memory_map_at_the_requested_address)
- [5.2._What_should_happen_if_the_implementation_cannot_place_the_memory_map_at_the_requested_address?](#_what_should_happen_if_the_implementation_cannot_place_the_memory_map_at_the_requested_address)
- [5.3. How can an application atomically re-reserve the address range on unmap?](#_how_can_an_application_atomically_re_reserve_the_address_range_on_unmap)
- [5.3._How_can_an_application_atomically_re-reserve_the_address_range_on_unmap?](#_how_can_an_application_atomically_re_reserve_the_address_range_on_unmap)
- [5.4. Should a placed memory map replace existing maps in the specified range or fail if a map exists?](#_should_a_placed_memory_map_replace_existing_maps_in_the_specified_range_or_fail_if_a_map_exists)
- [5.4._Should_a_placed_memory_map_replace_existing_maps_in_the_specified_range_or_fail_if_a_map_exists?](#_should_a_placed_memory_map_replace_existing_maps_in_the_specified_range_or_fail_if_a_map_exists)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Dependencies](#_dependencies)
[3.2. API Features](#_api_features)

[4. Examples](#_examples)
[5. Issues](#_issues)

[5.1. How should the requested address be passed to `vkMapMemory2KHR()`?](#_how_should_the_requested_address_be_passed_to_vkmapmemory2khr)
[5.2. What should happen if the implementation cannot place the memory map at the requested address?](#_what_should_happen_if_the_implementation_cannot_place_the_memory_map_at_the_requested_address)
[5.3. How can an application atomically re-reserve the address range on unmap?](#_how_can_an_application_atomically_re_reserve_the_address_range_on_unmap)
[5.4. Should a placed memory map replace existing maps in the specified range or fail if a map exists?](#_should_a_placed_memory_map_replace_existing_maps_in_the_specified_range_or_fail_if_a_map_exists)

This document proposes adding support for application-controlled virtual address
placement of `VkDeviceMemory` maps.

There are certain cases in which it can be useful to directly control the
address used by a memory map operation.
One example of this is in emulation environments when the application under
emulation is 32-bit but the host userspace is 64-bit.
In order to avoid additional copies or address translation, the emulator
can choose an address in the lower 32 bits of the address space and request
that the map be placed there.

This functionality is already supported by the standard UNIX `mmap()`
system call which provides an address hint flag as its first parameter as
well as a `MAP_FIXED` flag which causes the `mmap()` to fail if it cannot
place the map in exactly that location.
This extension proposes to add similar functionality to `vkMapMemory()`.

It is possible to emulate this functionality using
VK_EXT_external_memory_host by creating a placed memory mapping in some
other way (such as a Linux memfd combined with conventional `mmap()`) and
then importing the resulting map via VK_EXT_external_memory_host.
However, this requires every mappable Vulkan memory allocation to be a host
pointer import which places restrictions available memory types and heaps
and may have significant performance costs.

One alternative approach to the emulation use case would be to add a
`VK_MEMORY_MAP_32BIT_ADDRESS_BIT_EXT` which does exactly what emulation
wants and places the map in the lower 32 bits.
This is equivalent to the Linux `MAP_32BIT` flag.
However, this is less flexible and may be difficult to implement on Arm
platforms where Linux `mmap()` does not support `MAP_32BIT` since drivers
are likely relying on `mmap()` to implement `vkMapMemory()`.

* 
VK_EXT_map_memory2

The following features are exposed by this extension:

typedef struct VkPhysicalDeviceMapMemoryPlacedFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           memoryMapPlaced;
    VkBool32           memoryMapRangePlaced;
    VkBool32           memoryUnmapReserve;
} VkPhysicalDeviceMapMemoryPlacedFeaturesEXT;

typedef struct VkPhysicalDeviceMapMemoryPlacedPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       minPlacedMemoryMapAlignment;
} VkPhysicalDeviceMapMemoryPlacedPropertiesEXT;

typedef enum VkMemoryMapFlagBits {
    VK_MEMORY_MAP_PLACED_BIT_EXT = 0x00000001,
} VkMemoryMapFlagBits;

typedef struct VkMemoryMapPlacedInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    void*              pPlacedAddress;
} VkMemoryMapPlacedInfoEXT;

typedef enum VkMemoryUnmapFlagBitsKHR {
    VK_MEMORY_UNMAP_RESERVE_BIT_EXT = 0x00000001,
} VkMemoryMapFlagBitsKHR;

`memoryMapPlaced` indicates support for placed memory maps

`memoryMapRangePlaced` indicates support for placed memory maps of
subranges of the `VkDeviceMemory` object.

`memoryUnmapReserve` indicates support for
`VK_MEMORY_UNMAP_RESERVE_BIT_EXT`.

When `VK_MEMORY_MAP_PLACED_BIT_EXT` is set in the `flags` member of
`VkMemoryMapInfoKHR` and a `VkMapMemoryPlacedInfoEXT` structure is included
in the `pNext` chain of `VkMemoryMapInfoKHR`, the implementation attempts
to place the map at the address specified by
`VkMapMemoryPlacedInfoEXT::pPlacedAddress`.
If the map cannot be placed exactly at the specified virtual address,
`vkMapMemory2KHR()` returns `VK_ERROR_MEMORY_MAP_FAILED`.

When `VK_MEMORY_UNMAP_RESERVE_BIT_EXT` is set in the `flags` member of
`VkMemoryUnmapInfoEXT`, the memory object will be unmapped but the
address range will remain reserved so that another call to `mmap()` or
`vkMapMemory()` will not reuse that address range without an address hint
or `VK_MEMORY_MAP_PLACED_BIT_EXT`, respectively.

The following example allocates a memory object and maps it in the lower 32
bit address space, using `mmap()` to select the address.

VkDeviceMemory mem;
const VkMemoryAllocateInfo allocInfo = {
    .sType = VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_INFO,
   .allocationSize = /* compute size */,
   .memoryTypeIndex = /* compute memory type */,
};
VK_CHECK(vkAllocateMemory(device, &allocInfo, NULL, &mem));

void *reserved = mmap(NULL, allocInfo.allocationSize, PROT_NONE,
                      MAP_ANONYMOUS | MAP_PRIVATE | MAP_32BIT, -1, 0);
CHECK(reserved != MAP_FAILED);

const VkMemoryMapPlacedInfoEXT mapPlacedInfo = {
    .sType = VK_STRUCTURE_TYPE_MEMORY_MAP_PLACED_INFO_EXT,
    .pPlacedAddress = reserved,
};
const VkMemoryMapInfoKHR mapInfo = {
    .sType = VK_STRUCTURE_TYPE_MEMORY_MAP_INFO_KHR,
    .pNext = &mapPlacedInfo,
    .memory = mem,
    .offset = 0,
    .size = VK_WHOLE_SIZE,
    .flags = VK_MEMORY_MAP_PLACED_BIT_EXT,
};
void *map;
VK_CHECK(vkMapMemory2KHR(device, &mapInfo, &map));
CHECK(map == reserved);

When `VK_MEMORY_MAP_PLACED_BIT_EXT` is passed to
`vkMapMemory2KHR()` and a `VkMemoryMapPlacedInfoEXT` structure is present
in the `pNext` chain, the implementation attempts to map to whatever
address is provided by `VkMemoryMapPlacedInfoEXT::pPlacedAddress`.

The memory object should be left unmapped and
`vkMapMemory2KHR` should return `VK_ERROR_MEMORY_MAP_FAILED`.

When `VK_MEMORY_UNMAP_RESERVE_BIT_EXT` is passed to
`vkUnmapMemory2KHR()`, the implementation unmaps the memory range in such a
way that the range is automatically re-reserved.
With `mmap()`, this is accomplished by simply mapping over the range with
another anonymous mapping.
However, allowing this with `vkMapMemory()` would break Vulkan’s concept of
when a memory object is or is not mapped.

It should replace existing maps.
If an application wants try-map behavior, it can get that by using mmap with
`MAP_ANONYMOUS` and an address and only call `vkMapMemory2KHR()` to do a
placed map if that succeeds.
Without replacement, there is no way for the application to atomically
exchange maps and prevent races between reservation and the final map.
Also, any attempt at a middle ground in which it might replace would make
the spec less well-defined.
