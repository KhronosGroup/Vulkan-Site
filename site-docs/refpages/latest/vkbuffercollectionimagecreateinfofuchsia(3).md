# VkBufferCollectionImageCreateInfoFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferCollectionImageCreateInfoFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferCollectionImageCreateInfoFUCHSIA - Create a VkBufferCollectionFUCHSIA-compatible VkImage

The `VkBufferCollectionImageCreateInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkBufferCollectionImageCreateInfoFUCHSIA {
    VkStructureType              sType;
    const void*                  pNext;
    VkBufferCollectionFUCHSIA    collection;
    uint32_t                     index;
} VkBufferCollectionImageCreateInfoFUCHSIA;

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
[](#VUID-VkBufferCollectionImageCreateInfoFUCHSIA-index-06391) VUID-VkBufferCollectionImageCreateInfoFUCHSIA-index-06391

`index` **must** be less than
[VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html)::`bufferCount`

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCollectionImageCreateInfoFUCHSIA-sType-sType) VUID-VkBufferCollectionImageCreateInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_COLLECTION_IMAGE_CREATE_INFO_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkBufferCollectionImageCreateInfoFUCHSIA-collection-parameter) VUID-VkBufferCollectionImageCreateInfoFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) handle

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferCollectionImageCreateInfoFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
