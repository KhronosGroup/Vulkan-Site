# vkDestroyBufferCollectionFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyBufferCollectionFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyBufferCollectionFUCHSIA - Destroy a buffer collection

To release a [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html):

// Provided by VK_FUCHSIA_buffer_collection
void vkDestroyBufferCollectionFUCHSIA(
    VkDevice                                    device,
    VkBufferCollectionFUCHSIA                   collection,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that creates the
`VkBufferCollectionFUCHSIA`

* 
`collection` is the [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) handle

* 
`pAllocator` is a pointer to a [VkAllocationCallbacks](VkAllocationCallbacks.html) structure
controlling host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter

Valid Usage

* 
[](#VUID-vkDestroyBufferCollectionFUCHSIA-collection-06407) VUID-vkDestroyBufferCollectionFUCHSIA-collection-06407

[VkImage](VkImage.html) and [VkBuffer](VkBuffer.html) objects that referenced
`collection` upon creation by inclusion of a
[VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html) or
[VkBufferCollectionBufferCreateInfoFUCHSIA](VkBufferCollectionBufferCreateInfoFUCHSIA.html) chained to their
[VkImageCreateInfo](VkImageCreateInfo.html) or [VkBufferCreateInfo](VkBufferCreateInfo.html) structures
respectively, **may** outlive `collection`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyBufferCollectionFUCHSIA-device-parameter) VUID-vkDestroyBufferCollectionFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyBufferCollectionFUCHSIA-collection-parameter) VUID-vkDestroyBufferCollectionFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) handle

* 
[](#VUID-vkDestroyBufferCollectionFUCHSIA-pAllocator-parameter) VUID-vkDestroyBufferCollectionFUCHSIA-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyBufferCollectionFUCHSIA-collection-parent) VUID-vkDestroyBufferCollectionFUCHSIA-collection-parent

 `collection` **must** have been created, allocated, or retrieved from `device`

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkDestroyBufferCollectionFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
