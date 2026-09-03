# VkImportScreenBufferInfoQNX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportScreenBufferInfoQNX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportScreenBufferInfoQNX - Import memory from a QNX Screen buffer

To import memory created outside of the current Vulkan instance from a QNX
Screen buffer, add a `VkImportScreenBufferInfoQNX` structure to the
`pNext` chain of the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure.
The `VkImportScreenBufferInfoQNX` structure is defined as:

// Provided by VK_QNX_external_memory_screen_buffer
typedef struct VkImportScreenBufferInfoQNX {
    VkStructureType           sType;
    const void*               pNext;
    struct _screen_buffer*    buffer;
} VkImportScreenBufferInfoQNX;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is a pointer to a `struct` `_screen_buffer`, the QNX
Screen buffer to import

The implementation **may** not acquire a reference to the imported Screen
buffer.
Therefore, the application **must** ensure that the object referred to by
`buffer` stays valid as long as the device memory to which it is
imported is being used.

Valid Usage

* 
[](#VUID-VkImportScreenBufferInfoQNX-buffer-08966) VUID-VkImportScreenBufferInfoQNX-buffer-08966

If `buffer` is not `NULL`, QNX Screen Buffers **must** be supported for
import, as reported by [VkExternalImageFormatProperties](VkExternalImageFormatProperties.html) or
[VkExternalBufferProperties](VkExternalBufferProperties.html)

* 
[](#VUID-VkImportScreenBufferInfoQNX-buffer-08967) VUID-VkImportScreenBufferInfoQNX-buffer-08967

`buffer` is not `NULL`, it **must** be a pointer to
[valid QNX Screen buffer](../../../../spec/latest/chapters/memory.html#memory-external-screen-buffer-validity)

Valid Usage (Implicit)

* 
[](#VUID-VkImportScreenBufferInfoQNX-sType-sType) VUID-VkImportScreenBufferInfoQNX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_SCREEN_BUFFER_INFO_QNX](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_QNX_external_memory_screen_buffer](VK_QNX_external_memory_screen_buffer.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkImportScreenBufferInfoQNX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
