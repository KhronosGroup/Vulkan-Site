# VkImportMemoryMetalHandleInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportMemoryMetalHandleInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportMemoryMetalHandleInfoEXT - Import Metal memory created on the same physical device

To import memory from a Metal handle, add a
[VkImportMemoryMetalHandleInfoEXT](#) structure to the `pNext` chain of
the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure.

The `VkImportMemoryMetalHandleInfoEXT` structure is defined as:

// Provided by VK_EXT_external_memory_metal
typedef struct VkImportMemoryMetalHandleInfoEXT {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalMemoryHandleTypeFlagBits    handleType;
    void*                                 handle;
} VkImportMemoryMetalHandleInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the type of `handle` or `name`.

* 
`handle` is `NULL` or the external handle to import.

Importing memory object payloads from Metal handles shares the ownership of
the handle to the Vulkan implementation.

Applications **can** import the same payload into multiple instances of Vulkan,
into the same instance from which it was exported, and multiple times into a
given Vulkan instance.
In all cases, each import operation **must** create a distinct
`VkDeviceMemory` object.

Valid Usage

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-handleType-10408) VUID-VkImportMemoryMetalHandleInfoEXT-handleType-10408

If `handleType` is not `0`, it **must** be supported for import, as
reported by [VkExternalImageFormatProperties](VkExternalImageFormatProperties.html) or
[VkExternalBufferProperties](VkExternalBufferProperties.html)

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-handle-10409) VUID-VkImportMemoryMetalHandleInfoEXT-handle-10409

The memory from which `handle` was exported **must** have been created
on the same underlying physical device as `device`

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-handleType-10410) VUID-VkImportMemoryMetalHandleInfoEXT-handleType-10410

If `handleType` is not `0`, it **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-handleType-10411) VUID-VkImportMemoryMetalHandleInfoEXT-handleType-10411

If `handleType` is not `0` , `handle` **must** be a valid non-NULL
handle of the type specified by `handleType`

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-handle-10412) VUID-VkImportMemoryMetalHandleInfoEXT-handle-10412

`handle` **must** obey any requirements listed for `handleType` in
[external memory handle    types compatibility](../../../../spec/latest/chapters/capabilities.html#external-memory-handle-types-compatibility)

Valid Usage (Implicit)

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-sType-sType) VUID-VkImportMemoryMetalHandleInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_MEMORY_METAL_HANDLE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-handleType-parameter) VUID-VkImportMemoryMetalHandleInfoEXT-handleType-parameter

 If `handleType` is not `0`, `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_EXT_external_memory_metal](VK_EXT_external_memory_metal.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkImportMemoryMetalHandleInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
