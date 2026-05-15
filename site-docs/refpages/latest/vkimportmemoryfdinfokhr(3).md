# VkImportMemoryFdInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportMemoryFdInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportMemoryFdInfoKHR - Import memory created on the same physical device from a file descriptor

To import memory from a POSIX file descriptor handle, add a
[VkImportMemoryFdInfoKHR](#) structure to the `pNext` chain of the
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure.
The `VkImportMemoryFdInfoKHR` structure is defined as:

// Provided by VK_KHR_external_memory_fd
typedef struct VkImportMemoryFdInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalMemoryHandleTypeFlagBits    handleType;
    int                                   fd;
} VkImportMemoryFdInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the handle type of `fd`.

* 
`fd` is the external handle to import.

Importing memory from a file descriptor transfers ownership of the file
descriptor from the application to the Vulkan implementation.
The application **must** not perform any operations on the file descriptor
after a successful import.
The imported memory object holds a reference to its payload.

Applications **can** import the same payload into multiple instances of Vulkan,
into the same instance from which it was exported, and multiple times into a
given Vulkan instance.
In all cases, each import operation **must** create a distinct
`VkDeviceMemory` object.

Valid Usage

* 
[](#VUID-VkImportMemoryFdInfoKHR-handleType-09862) VUID-VkImportMemoryFdInfoKHR-handleType-09862

    If `handleType` is not `0`, it **must** be supported for import, as
    reported by
[VkExternalTensorPropertiesARM](VkExternalTensorPropertiesARM.html),
    [VkExternalImageFormatProperties](VkExternalImageFormatProperties.html) or
    [VkExternalBufferProperties](VkExternalBufferProperties.html)

* 
[](#VUID-VkImportMemoryFdInfoKHR-fd-00668) VUID-VkImportMemoryFdInfoKHR-fd-00668

The memory from which `fd` was exported **must** have been created on
the same underlying physical device as `device`

* 
[](#VUID-VkImportMemoryFdInfoKHR-handleType-00669) VUID-VkImportMemoryFdInfoKHR-handleType-00669

If `handleType` is not `0`, it **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](VkExternalMemoryHandleTypeFlagBits.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

* 
[](#VUID-VkImportMemoryFdInfoKHR-handleType-00670) VUID-VkImportMemoryFdInfoKHR-handleType-00670

If `handleType` is not `0`, `fd` **must** be a valid handle of the
type specified by `handleType`

* 
[](#VUID-VkImportMemoryFdInfoKHR-fd-01746) VUID-VkImportMemoryFdInfoKHR-fd-01746

The memory represented by `fd` **must** have been created from a
physical device and driver that is compatible with `device` and
`handleType`, as described in
[external memory handle    types compatibility](../../../../spec/latest/chapters/capabilities.html#external-memory-handle-types-compatibility)

* 
[](#VUID-VkImportMemoryFdInfoKHR-fd-01520) VUID-VkImportMemoryFdInfoKHR-fd-01520

`fd` **must** obey any requirements listed for `handleType` in
[external memory handle    types compatibility](../../../../spec/latest/chapters/capabilities.html#external-memory-handle-types-compatibility)

Valid Usage (Implicit)

* 
[](#VUID-VkImportMemoryFdInfoKHR-sType-sType) VUID-VkImportMemoryFdInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_MEMORY_FD_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkImportMemoryFdInfoKHR-handleType-parameter) VUID-VkImportMemoryFdInfoKHR-handleType-parameter

 If `handleType` is not `0`, `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_KHR_external_memory_fd](VK_KHR_external_memory_fd.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkImportMemoryFdInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
