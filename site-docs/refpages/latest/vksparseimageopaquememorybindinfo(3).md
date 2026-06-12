# VkSparseImageOpaqueMemoryBindInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSparseImageOpaqueMemoryBindInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSparseImageOpaqueMemoryBindInfo - Structure specifying sparse image opaque memory bind information

Memory is bound to opaque regions of `VkImage` objects created with the
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html) flag using the following structure:

// Provided by VK_VERSION_1_0
typedef struct VkSparseImageOpaqueMemoryBindInfo {
    VkImage                      image;
    uint32_t                     bindCount;
    const VkSparseMemoryBind*    pBinds;
} VkSparseImageOpaqueMemoryBindInfo;

* 
`image` is the [VkImage](VkImage.html) object to be bound.

* 
`bindCount` is the number of [VkSparseMemoryBind](VkSparseMemoryBind.html) structures in
the `pBinds` array.

* 
`pBinds` is a pointer to an array of [VkSparseMemoryBind](VkSparseMemoryBind.html)
structures.

|  | This structure is normally used to bind memory to fully-resident sparse
| --- | --- |
images or for mip tail regions of partially resident images.
However, it **can** also be used to bind memory for the entire binding range of
partially resident images.

If the `pBinds`[i].flags of an element *i* of `pBinds` does not
contain [VK_SPARSE_MEMORY_BIND_METADATA_BIT](VkSparseMemoryBindFlagBits.html), the `resourceOffset`
is in the range [0, [VkMemoryRequirements](VkMemoryRequirements.html)::`size`), This
range includes data from all aspects of the image, including metadata.
For most implementations this will probably mean that the
`resourceOffset` is a simple device address offset within the resource.
It is possible for an application to bind a range of memory that includes
both resource data and metadata.
However, the application would not know what part of the image the memory is
used for, or if any range is being used for metadata.

If the `pBinds`[i].flags of an element *i* of `pBinds` contains
[VK_SPARSE_MEMORY_BIND_METADATA_BIT](VkSparseMemoryBindFlagBits.html), the binding range specified **must**
be within the mip tail region of the metadata aspect.
In this case the `resourceOffset` is not **required** to be a simple device
address offset within the resource.
However, it *is* defined to be within [`imageMipTailOffset`,
`imageMipTailOffset` +  `imageMipTailSize`) for the metadata
aspect.
See [VkSparseMemoryBind](VkSparseMemoryBind.html) for the full constraints on binding region with
this flag present. |

Valid Usage

* 
[](#VUID-VkSparseImageOpaqueMemoryBindInfo-pBinds-01103) VUID-VkSparseImageOpaqueMemoryBindInfo-pBinds-01103

If the `flags` member of any element of `pBinds` contains
[VK_SPARSE_MEMORY_BIND_METADATA_BIT](VkSparseMemoryBindFlagBits.html), the binding range defined
**must** be within the mip tail region of the metadata aspect of
`image`

Valid Usage (Implicit)

* 
[](#VUID-VkSparseImageOpaqueMemoryBindInfo-image-parameter) VUID-VkSparseImageOpaqueMemoryBindInfo-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkSparseImageOpaqueMemoryBindInfo-pBinds-parameter) VUID-VkSparseImageOpaqueMemoryBindInfo-pBinds-parameter

 `pBinds` **must** be a valid pointer to an array of `bindCount` valid [VkSparseMemoryBind](VkSparseMemoryBind.html) structures

* 
[](#VUID-VkSparseImageOpaqueMemoryBindInfo-bindCount-arraylength) VUID-VkSparseImageOpaqueMemoryBindInfo-bindCount-arraylength

 `bindCount` **must** be greater than `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBindSparseInfo](VkBindSparseInfo.html), [VkImage](VkImage.html), [VkSparseMemoryBind](VkSparseMemoryBind.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkSparseImageOpaqueMemoryBindInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
