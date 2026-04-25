# VkSparseMemoryBind(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSparseMemoryBind.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSparseMemoryBind - Structure specifying a sparse memory bind operation

The `VkSparseMemoryBind` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSparseMemoryBind {
    VkDeviceSize               resourceOffset;
    VkDeviceSize               size;
    VkDeviceMemory             memory;
    VkDeviceSize               memoryOffset;
    VkSparseMemoryBindFlags    flags;
} VkSparseMemoryBind;

* 
`resourceOffset` is the offset into the resource.

* 
`size` is the size of the memory region to be bound.

* 
`memory` is the [VkDeviceMemory](VkDeviceMemory.html) object that the range of the
resource is bound to.
If `memory` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the range is unbound.

* 
`memoryOffset` is the offset into the [VkDeviceMemory](VkDeviceMemory.html) object to
bind the resource range to.
If `memory` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), this value is ignored.

* 
`flags` is a bitmask of [VkSparseMemoryBindFlagBits](VkSparseMemoryBindFlagBits.html) specifying
usage of the binding operation.

The *binding range* [`resourceOffset`, `resourceOffset` + 
`size`) has different constraints based on `flags`.
If `flags` contains [VK_SPARSE_MEMORY_BIND_METADATA_BIT](VkSparseMemoryBindFlagBits.html), the
binding range **must** be within the mip tail region of the metadata aspect.
This metadata region is defined by:

metadataRegion = [base, base + 
`imageMipTailSize`)

base = `imageMipTailOffset` + 
`imageMipTailStride` × n

and `imageMipTailOffset`, `imageMipTailSize`, and
`imageMipTailStride` values are from the
[VkSparseImageMemoryRequirements](VkSparseImageMemoryRequirements.html) corresponding to the metadata aspect
of the image, and n is a valid array layer index for the image,

`imageMipTailStride` is considered to be zero for aspects where
`VkSparseImageMemoryRequirements`::`formatProperties.flags` contains
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](VkSparseImageFormatFlagBits.html).

If `flags` does not contain [VK_SPARSE_MEMORY_BIND_METADATA_BIT](VkSparseMemoryBindFlagBits.html),
the binding range **must** be within the range
[0,[VkMemoryRequirements](VkMemoryRequirements.html)::`size`).

Valid Usage

* 
[](#VUID-VkSparseMemoryBind-memory-01096) VUID-VkSparseMemoryBind-memory-01096

If `memory` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `memory` and
`memoryOffset` **must** match the memory requirements of the resource,
as described in section [Resource Memory Association](../../../../spec/latest/chapters/resources.html#resources-association)

* 
[](#VUID-VkSparseMemoryBind-resourceOffset-09491) VUID-VkSparseMemoryBind-resourceOffset-09491

If the resource being bound is a `VkBuffer`, `resourceOffset`,
`memoryOffset` and `size` **must** be an integer multiple of the
`alignment` of the [VkMemoryRequirements](VkMemoryRequirements.html) structure returned
from a call to [vkGetBufferMemoryRequirements](vkGetBufferMemoryRequirements.html) with the buffer
resource

* 
[](#VUID-VkSparseMemoryBind-resourceOffset-09492) VUID-VkSparseMemoryBind-resourceOffset-09492

If the resource being bound is a `VkImage`, `resourceOffset` and
`memoryOffset` **must** be an integer multiple of the `alignment`
of the [VkMemoryRequirements](VkMemoryRequirements.html) structure returned from a call to
[vkGetImageMemoryRequirements](vkGetImageMemoryRequirements.html) with the image resource

* 
[](#VUID-VkSparseMemoryBind-memory-01097) VUID-VkSparseMemoryBind-memory-01097

If `memory` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `memory` **must** not have
been created with a memory type that reports
[VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](VkMemoryPropertyFlagBits.html) bit set

* 
[](#VUID-VkSparseMemoryBind-size-01098) VUID-VkSparseMemoryBind-size-01098

`size` **must** be greater than `0`

* 
[](#VUID-VkSparseMemoryBind-resourceOffset-01099) VUID-VkSparseMemoryBind-resourceOffset-01099

`resourceOffset` **must** be less than the size of the resource

* 
[](#VUID-VkSparseMemoryBind-size-01100) VUID-VkSparseMemoryBind-size-01100

`size` **must** be less than or equal to the size of the resource minus
`resourceOffset`

* 
[](#VUID-VkSparseMemoryBind-memoryOffset-01101) VUID-VkSparseMemoryBind-memoryOffset-01101

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-VkSparseMemoryBind-size-01102) VUID-VkSparseMemoryBind-size-01102

`size` **must** be less than or equal to the size of `memory` minus
`memoryOffset`

* 
[](#VUID-VkSparseMemoryBind-memory-02730) VUID-VkSparseMemoryBind-memory-02730

If `memory` was created with
[VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` not equal to `0`, at
least one handle type it contained **must** also have been set in
[VkExternalMemoryBufferCreateInfo](VkExternalMemoryBufferCreateInfo.html)::`handleTypes` or
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes` when the
resource was created

* 
[](#VUID-VkSparseMemoryBind-memory-02731) VUID-VkSparseMemoryBind-memory-02731

If `memory` was created by a memory import operation, the external
handle type of the imported memory **must** also have been set in
[VkExternalMemoryBufferCreateInfo](VkExternalMemoryBufferCreateInfo.html)::`handleTypes` or
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes` when the
resource was created

Valid Usage (Implicit)

* 
[](#VUID-VkSparseMemoryBind-memory-parameter) VUID-VkSparseMemoryBind-memory-parameter

 If `memory` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-VkSparseMemoryBind-flags-parameter) VUID-VkSparseMemoryBind-flags-parameter

 `flags` **must** be a valid combination of [VkSparseMemoryBindFlagBits](VkSparseMemoryBindFlagBits.html) values

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`, [VkSparseBufferMemoryBindInfo](VkSparseBufferMemoryBindInfo.html), [VkSparseImageOpaqueMemoryBindInfo](VkSparseImageOpaqueMemoryBindInfo.html), [VkSparseMemoryBindFlags](VkSparseMemoryBindFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkSparseMemoryBind).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
