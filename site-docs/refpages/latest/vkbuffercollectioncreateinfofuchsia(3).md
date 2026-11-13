# VkBufferCollectionCreateInfoFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferCollectionCreateInfoFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferCollectionCreateInfoFUCHSIA - Structure specifying desired parameters to create the buffer collection

The `VkBufferCollectionCreateInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkBufferCollectionCreateInfoFUCHSIA {
    VkStructureType    sType;
    const void*        pNext;
    zx_handle_t        collectionToken;
} VkBufferCollectionCreateInfoFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`collectionToken` is a `zx_handle_t` containing the Sysmem
client’s buffer collection token

Valid Usage

* 
[](#VUID-VkBufferCollectionCreateInfoFUCHSIA-collectionToken-06393) VUID-VkBufferCollectionCreateInfoFUCHSIA-collectionToken-06393

`collectionToken` **must** be a valid `zx_handle_t` to a Zircon
channel allocated from Sysmem
(`fuchsia.sysmem.Allocator`/AllocateSharedCollection) with
`ZX_DEFAULT_CHANNEL_RIGHTS` rights

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCollectionCreateInfoFUCHSIA-sType-sType) VUID-VkBufferCollectionCreateInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_COLLECTION_CREATE_INFO_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkBufferCollectionCreateInfoFUCHSIA-pNext-pNext) VUID-VkBufferCollectionCreateInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkStructureType](VkStructureType.html), [vkCreateBufferCollectionFUCHSIA](vkCreateBufferCollectionFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferCollectionCreateInfoFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
