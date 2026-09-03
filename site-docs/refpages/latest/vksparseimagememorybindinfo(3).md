# VkSparseImageMemoryBindInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSparseImageMemoryBindInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSparseImageMemoryBindInfo - Structure specifying sparse image memory bind information

Memory **can** be bound to sparse image blocks of `VkImage` objects created
with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html) flag using the following
structure:

// Provided by VK_VERSION_1_0
typedef struct VkSparseImageMemoryBindInfo {
    VkImage                           image;
    uint32_t                          bindCount;
    const VkSparseImageMemoryBind*    pBinds;
} VkSparseImageMemoryBindInfo;

* 
`image` is the [VkImage](VkImage.html) object to be bound

* 
`bindCount` is the number of [VkSparseImageMemoryBind](VkSparseImageMemoryBind.html)
structures in `pBinds` array

* 
`pBinds` is a pointer to an array of [VkSparseImageMemoryBind](VkSparseImageMemoryBind.html)
structures

Valid Usage

* 
[](#VUID-VkSparseImageMemoryBindInfo-subresource-01722) VUID-VkSparseImageMemoryBindInfo-subresource-01722

The `subresource.mipLevel` member of each element of `pBinds`
**must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `image` was created

* 
[](#VUID-VkSparseImageMemoryBindInfo-subresource-01723) VUID-VkSparseImageMemoryBindInfo-subresource-01723

The `subresource.arrayLayer` member of each element of `pBinds`
**must** be less than the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `image` was created

* 
[](#VUID-VkSparseImageMemoryBindInfo-subresource-01106) VUID-VkSparseImageMemoryBindInfo-subresource-01106

The `subresource.aspectMask` member of each element of `pBinds`
**must** be valid for the `format` specified in [VkImageCreateInfo](VkImageCreateInfo.html)
when `image` was created

* 
[](#VUID-VkSparseImageMemoryBindInfo-image-02901) VUID-VkSparseImageMemoryBindInfo-image-02901

`image` **must** have been created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html) set

Valid Usage (Implicit)

* 
[](#VUID-VkSparseImageMemoryBindInfo-image-parameter) VUID-VkSparseImageMemoryBindInfo-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkSparseImageMemoryBindInfo-pBinds-parameter) VUID-VkSparseImageMemoryBindInfo-pBinds-parameter

 `pBinds` **must** be a valid pointer to an array of `bindCount` valid [VkSparseImageMemoryBind](VkSparseImageMemoryBind.html) structures

* 
[](#VUID-VkSparseImageMemoryBindInfo-bindCount-arraylength) VUID-VkSparseImageMemoryBindInfo-bindCount-arraylength

 `bindCount` **must** be greater than `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBindSparseInfo](VkBindSparseInfo.html), [VkImage](VkImage.html), [VkSparseImageMemoryBind](VkSparseImageMemoryBind.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkSparseImageMemoryBindInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
