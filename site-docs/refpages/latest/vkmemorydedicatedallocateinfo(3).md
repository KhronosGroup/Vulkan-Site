# VkMemoryDedicatedAllocateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryDedicatedAllocateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryDedicatedAllocateInfo - Specify a dedicated memory allocation resource

If the `pNext` chain includes a `VkMemoryDedicatedAllocateInfo`
structure, then that structure includes a handle of the sole buffer or image
resource that the memory **can** be bound to.

The `VkMemoryDedicatedAllocateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkMemoryDedicatedAllocateInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
    VkBuffer           buffer;
} VkMemoryDedicatedAllocateInfo;

// Provided by VK_KHR_dedicated_allocation
// Equivalent to VkMemoryDedicatedAllocateInfo
typedef VkMemoryDedicatedAllocateInfo VkMemoryDedicatedAllocateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a handle of an image which this
memory will be bound to.

* 
`buffer` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a handle of a buffer which this
memory will be bound to.

Valid Usage

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-01432) VUID-VkMemoryDedicatedAllocateInfo-image-01432

At least one of `image` and `buffer` **must** be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-02964) VUID-VkMemoryDedicatedAllocateInfo-image-02964

    If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html)
    and the memory is not an imported
Android Hardware Buffer
or an imported
QNX Screen buffer
    , `VkMemoryAllocateInfo`::`allocationSize` **must** be greater than
    or equal to the `VkMemoryRequirements`::`size` of the image

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-01434) VUID-VkMemoryDedicatedAllocateInfo-image-01434

If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `image` **must** have been
created without [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html) set in
[VkImageCreateInfo](VkImageCreateInfo.html)::`flags`

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-buffer-02965) VUID-VkMemoryDedicatedAllocateInfo-buffer-02965

    If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html)
    and the memory is not an imported
Android Hardware Buffer
or an imported
QNX Screen buffer
    , `VkMemoryAllocateInfo`::`allocationSize` **must** be greater than
    or equal to the `VkMemoryRequirements`::`size` of the buffer

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-buffer-01436) VUID-VkMemoryDedicatedAllocateInfo-buffer-01436

If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `buffer` **must** have
been created without [VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html) set in
[VkBufferCreateInfo](VkBufferCreateInfo.html)::`flags`

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-01876) VUID-VkMemoryDedicatedAllocateInfo-image-01876

If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) defines a memory import operation with handle
type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](VkExternalMemoryHandleTypeFlagBits.html),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](VkExternalMemoryHandleTypeFlagBits.html),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](VkExternalMemoryHandleTypeFlagBits.html),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](VkExternalMemoryHandleTypeFlagBits.html),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT](VkExternalMemoryHandleTypeFlagBits.html), or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](VkExternalMemoryHandleTypeFlagBits.html), and the
external handle was created by the Vulkan API, then the memory being
imported **must** also be a dedicated image allocation and `image`
**must** be identical to the image associated with the imported memory

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-buffer-01877) VUID-VkMemoryDedicatedAllocateInfo-buffer-01877

If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) defines a memory import operation with handle
type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](VkExternalMemoryHandleTypeFlagBits.html),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](VkExternalMemoryHandleTypeFlagBits.html),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](VkExternalMemoryHandleTypeFlagBits.html),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](VkExternalMemoryHandleTypeFlagBits.html),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT](VkExternalMemoryHandleTypeFlagBits.html), or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](VkExternalMemoryHandleTypeFlagBits.html), and the
external handle was created by the Vulkan API, then the memory being
imported **must** also be a dedicated buffer allocation and `buffer`
**must** be identical to the buffer associated with the imported memory

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-01878) VUID-VkMemoryDedicatedAllocateInfo-image-01878

If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) defines a memory import operation with handle
type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](VkExternalMemoryHandleTypeFlagBits.html), the memory
being imported **must** also be a dedicated image allocation and
`image` **must** be identical to the image associated with the imported
memory

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-buffer-01879) VUID-VkMemoryDedicatedAllocateInfo-buffer-01879

If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) defines a memory import operation with handle
type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](VkExternalMemoryHandleTypeFlagBits.html), the memory
being imported **must** also be a dedicated buffer allocation and
`buffer` **must** be identical to the buffer associated with the
imported memory

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-01797) VUID-VkMemoryDedicatedAllocateInfo-image-01797

If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `image` **must** not have
been created with [VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) set in
[VkImageCreateInfo](VkImageCreateInfo.html)::`flags`

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-04751) VUID-VkMemoryDedicatedAllocateInfo-image-04751

If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) defines a memory import operation with handle
type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](VkExternalMemoryHandleTypeFlagBits.html), the
memory being imported **must** also be a dedicated image allocation and
`image` **must** be identical to the image associated with the imported
memory

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-buffer-04752) VUID-VkMemoryDedicatedAllocateInfo-buffer-04752

If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) defines a memory import operation with handle
type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](VkExternalMemoryHandleTypeFlagBits.html), the
memory being imported **must** also be a dedicated buffer allocation and
`buffer` **must** be identical to the buffer associated with the
imported memory

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-sType-sType) VUID-VkMemoryDedicatedAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO](VkStructureType.html)

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-parameter) VUID-VkMemoryDedicatedAllocateInfo-image-parameter

 If `image` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-buffer-parameter) VUID-VkMemoryDedicatedAllocateInfo-buffer-parameter

 If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-commonparent) VUID-VkMemoryDedicatedAllocateInfo-commonparent

 Both of `buffer`, and `image` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_KHR_dedicated_allocation](VK_KHR_dedicated_allocation.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkBuffer](VkBuffer.html), [VkImage](VkImage.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryDedicatedAllocateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
