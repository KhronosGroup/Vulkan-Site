# VkSparseBufferMemoryBindInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSparseBufferMemoryBindInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSparseBufferMemoryBindInfo - Structure specifying a sparse buffer memory bind operation

Memory is bound to `VkBuffer` objects created with the
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html) flag using the following
structure:

// Provided by VK_VERSION_1_0
typedef struct VkSparseBufferMemoryBindInfo {
    VkBuffer                     buffer;
    uint32_t                     bindCount;
    const VkSparseMemoryBind*    pBinds;
} VkSparseBufferMemoryBindInfo;

* 
`buffer` is the [VkBuffer](VkBuffer.html) object to be bound.

* 
`bindCount` is the number of [VkSparseMemoryBind](VkSparseMemoryBind.html) structures in
the `pBinds` array.

* 
`pBinds` is a pointer to an array of [VkSparseMemoryBind](VkSparseMemoryBind.html)
structures.

Valid Usage (Implicit)

* 
[](#VUID-VkSparseBufferMemoryBindInfo-buffer-parameter) VUID-VkSparseBufferMemoryBindInfo-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-VkSparseBufferMemoryBindInfo-pBinds-parameter) VUID-VkSparseBufferMemoryBindInfo-pBinds-parameter

 `pBinds` **must** be a valid pointer to an array of `bindCount` valid [VkSparseMemoryBind](VkSparseMemoryBind.html) structures

* 
[](#VUID-VkSparseBufferMemoryBindInfo-bindCount-arraylength) VUID-VkSparseBufferMemoryBindInfo-bindCount-arraylength

 `bindCount` **must** be greater than `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBindSparseInfo](VkBindSparseInfo.html), [VkBuffer](VkBuffer.html), [VkSparseMemoryBind](VkSparseMemoryBind.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkSparseBufferMemoryBindInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
