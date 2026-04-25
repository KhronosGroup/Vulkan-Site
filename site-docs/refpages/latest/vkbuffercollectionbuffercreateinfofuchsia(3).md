# VkBufferCollectionBufferCreateInfoFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferCollectionBufferCreateInfoFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferCollectionBufferCreateInfoFUCHSIA - Create a VkBufferCollectionFUCHSIA-compatible VkBuffer

The `VkBufferCollectionBufferCreateInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkBufferCollectionBufferCreateInfoFUCHSIA {
    VkStructureType              sType;
    const void*                  pNext;
    VkBufferCollectionFUCHSIA    collection;
    uint32_t                     index;
} VkBufferCollectionBufferCreateInfoFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`collection` is the [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) handle

* 
`index` is the index of the buffer in the buffer collection from
which the memory will be imported

Valid Usage

* 
[](#VUID-VkBufferCollectionBufferCreateInfoFUCHSIA-index-06388) VUID-VkBufferCollectionBufferCreateInfoFUCHSIA-index-06388

`index` **must** be less than
[VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html)::`bufferCount`

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCollectionBufferCreateInfoFUCHSIA-sType-sType) VUID-VkBufferCollectionBufferCreateInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_COLLECTION_BUFFER_CREATE_INFO_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkBufferCollectionBufferCreateInfoFUCHSIA-collection-parameter) VUID-VkBufferCollectionBufferCreateInfoFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) handle

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](VkBufferCreateInfo.html)

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferCollectionBufferCreateInfoFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
