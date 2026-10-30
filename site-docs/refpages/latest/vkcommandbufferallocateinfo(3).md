# VkCommandBufferAllocateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandBufferAllocateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandBufferAllocateInfo - Structure specifying the allocation parameters for command buffer object

The `VkCommandBufferAllocateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkCommandBufferAllocateInfo {
    VkStructureType         sType;
    const void*             pNext;
    VkCommandPool           commandPool;
    VkCommandBufferLevel    level;
    uint32_t                commandBufferCount;
} VkCommandBufferAllocateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`commandPool` is the command pool from which the command buffers are
allocated.

* 
`level` is a [VkCommandBufferLevel](VkCommandBufferLevel.html) value specifying the command
buffer level.

* 
`commandBufferCount` is the number of command buffers to allocate
from the pool.

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferAllocateInfo-sType-sType) VUID-VkCommandBufferAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_ALLOCATE_INFO](VkStructureType.html)

* 
[](#VUID-VkCommandBufferAllocateInfo-pNext-pNext) VUID-VkCommandBufferAllocateInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCommandBufferAllocateInfo-commandPool-parameter) VUID-VkCommandBufferAllocateInfo-commandPool-parameter

 `commandPool` **must** be a valid [VkCommandPool](VkCommandPool.html) handle

* 
[](#VUID-VkCommandBufferAllocateInfo-level-parameter) VUID-VkCommandBufferAllocateInfo-level-parameter

 `level` **must** be a valid [VkCommandBufferLevel](VkCommandBufferLevel.html) value

Host Synchronization

* 
Host access to `commandPool` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBufferLevel](VkCommandBufferLevel.html), [VkCommandPool](VkCommandPool.html), [VkStructureType](VkStructureType.html), [vkAllocateCommandBuffers](vkAllocateCommandBuffers.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferAllocateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
