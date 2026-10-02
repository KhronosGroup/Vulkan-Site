# VkBindVideoSessionMemoryInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindVideoSessionMemoryInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindVideoSessionMemoryInfoKHR - Structure specifying memory bindings for a video session object

The `VkBindVideoSessionMemoryInfoKHR` structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkBindVideoSessionMemoryInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           memoryBindIndex;
    VkDeviceMemory     memory;
    VkDeviceSize       memoryOffset;
    VkDeviceSize       memorySize;
} VkBindVideoSessionMemoryInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryBindIndex` is the memory binding index to bind memory to.

* 
`memory` is the allocated device memory to be bound to the video
session’s memory binding with index `memoryBindIndex`.

* 
`memoryOffset` is the start offset of the region of `memory`
which is to be bound.

* 
`memorySize` is the size in bytes of the region of `memory`,
starting from `memoryOffset` bytes, to be bound.

Valid Usage

* 
[](#VUID-VkBindVideoSessionMemoryInfoKHR-memoryOffset-07201) VUID-VkBindVideoSessionMemoryInfoKHR-memoryOffset-07201

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-VkBindVideoSessionMemoryInfoKHR-memorySize-07202) VUID-VkBindVideoSessionMemoryInfoKHR-memorySize-07202

`memorySize` **must** be less than or equal to the size of `memory`
minus `memoryOffset`

Valid Usage (Implicit)

* 
[](#VUID-VkBindVideoSessionMemoryInfoKHR-sType-sType) VUID-VkBindVideoSessionMemoryInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_VIDEO_SESSION_MEMORY_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkBindVideoSessionMemoryInfoKHR-pNext-pNext) VUID-VkBindVideoSessionMemoryInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBindVideoSessionMemoryInfoKHR-memory-parameter) VUID-VkBindVideoSessionMemoryInfoKHR-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkBindVideoSessionMemoryKHR](vkBindVideoSessionMemoryKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkBindVideoSessionMemoryInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
