# VkImportMemoryHostPointerInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportMemoryHostPointerInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportMemoryHostPointerInfoEXT - Import memory from a host pointer

To import memory from a host pointer, add a
[VkImportMemoryHostPointerInfoEXT](#) structure to the `pNext` chain of
the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure.
The `VkImportMemoryHostPointerInfoEXT` structure is defined as:

// Provided by VK_EXT_external_memory_host
typedef struct VkImportMemoryHostPointerInfoEXT {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalMemoryHandleTypeFlagBits    handleType;
    void*                                 pHostPointer;
} VkImportMemoryHostPointerInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the handle type.

* 
`pHostPointer` is the host pointer to import from.

Importing memory from a host pointer shares ownership of the memory between
the host and the Vulkan implementation.
The application **can** continue to access the memory through the host pointer
but it is the application’s responsibility to synchronize device and
non-device access to the payload as defined in
[Host Access to Device Memory Objects](../../../../spec/latest/chapters/memory.html#memory-device-hostaccess).

Applications **can** import the same payload into multiple instances of Vulkan
and multiple times into a given Vulkan instance.
However, implementations **may** fail to import the same payload multiple times
into a given physical device due to platform constraints.

Importing memory from a particular host pointer **may** not be possible due to
additional platform-specific restrictions beyond the scope of this
specification in which case the implementation **must** fail the memory import
operation with the error code [VK_ERROR_INVALID_EXTERNAL_HANDLE_KHR](VkResult.html).

Whether device memory objects imported from a host pointer hold a reference
to their payload is **undefined**.
As such, the application **must** ensure that the imported memory range remains
valid and accessible for the lifetime of the imported memory object.

Implementations **may** support importing host pointers for memory types which
are not host-visible.
In this case, after a successful call to [vkAllocateMemory](vkAllocateMemory.html), the memory
range imported from `pHostPointer` **must** not be accessed by the
application until the [VkDeviceMemory](VkDeviceMemory.html) has been destroyed.
Memory contents for the host memory becomes **undefined** on import, and is
left **undefined** after the [VkDeviceMemory](VkDeviceMemory.html) has been destroyed.
Applications **must** also not access host memory which is mapped to the same
physical memory as `pHostPointer`, but mapped to a different host
pointer while the [VkDeviceMemory](VkDeviceMemory.html) handle is valid.
Implementations running on general-purpose operating systems **should** not
support importing host pointers for memory types which are not host-visible.

|  | Using host pointers to back non-host visible allocations is a
| --- | --- |
platform-specific use case, and applications should not attempt to do this
unless instructed by the platform. |

Valid Usage

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-handleType-01747) VUID-VkImportMemoryHostPointerInfoEXT-handleType-01747

If `handleType` is not `0`, it **must** be supported for import, as
reported in [VkExternalMemoryProperties](VkExternalMemoryProperties.html)

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-handleType-01748) VUID-VkImportMemoryHostPointerInfoEXT-handleType-01748

If `handleType` is not `0`, it **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-pHostPointer-01749) VUID-VkImportMemoryHostPointerInfoEXT-pHostPointer-01749

`pHostPointer` **must** be a pointer aligned to an integer multiple of
`VkPhysicalDeviceExternalMemoryHostPropertiesEXT`::`minImportedHostPointerAlignment`

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-handleType-01750) VUID-VkImportMemoryHostPointerInfoEXT-handleType-01750

If `handleType` is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html),
`pHostPointer` **must** be a pointer to `allocationSize` number of
bytes of host memory, where `allocationSize` is the member of the
`VkMemoryAllocateInfo` structure this structure is chained to

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-handleType-01751) VUID-VkImportMemoryHostPointerInfoEXT-handleType-01751

If `handleType` is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html),
`pHostPointer` **must** be a pointer to `allocationSize` number of
bytes of host mapped foreign memory, where `allocationSize` is the
member of the `VkMemoryAllocateInfo` structure this structure is
chained to

Valid Usage (Implicit)

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-sType-sType) VUID-VkImportMemoryHostPointerInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_MEMORY_HOST_POINTER_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-handleType-parameter) VUID-VkImportMemoryHostPointerInfoEXT-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-pHostPointer-parameter) VUID-VkImportMemoryHostPointerInfoEXT-pHostPointer-parameter

 `pHostPointer` **must** be a pointer value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_EXT_external_memory_host](VK_EXT_external_memory_host.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkImportMemoryHostPointerInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
