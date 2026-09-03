# VkScreenBufferPropertiesQNX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkScreenBufferPropertiesQNX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkScreenBufferPropertiesQNX - Properties of External Memory QNX Screen Buffers

The `VkScreenBufferPropertiesQNX` structure returned is defined as:

// Provided by VK_QNX_external_memory_screen_buffer
typedef struct VkScreenBufferPropertiesQNX {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       allocationSize;
    uint32_t           memoryTypeBits;
} VkScreenBufferPropertiesQNX;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`allocationSize` is the size of the external memory.

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified Screen buffer **can** be imported as.

Valid Usage (Implicit)

* 
[](#VUID-VkScreenBufferPropertiesQNX-sType-sType) VUID-VkScreenBufferPropertiesQNX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SCREEN_BUFFER_PROPERTIES_QNX](VkStructureType.html)

* 
[](#VUID-VkScreenBufferPropertiesQNX-pNext-pNext) VUID-VkScreenBufferPropertiesQNX-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkScreenBufferFormatPropertiesQNX](VkScreenBufferFormatPropertiesQNX.html)

* 
[](#VUID-VkScreenBufferPropertiesQNX-sType-unique) VUID-VkScreenBufferPropertiesQNX-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_QNX_external_memory_screen_buffer](VK_QNX_external_memory_screen_buffer.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkGetScreenBufferPropertiesQNX](vkGetScreenBufferPropertiesQNX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkScreenBufferPropertiesQNX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
