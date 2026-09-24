# VkBufferCollectionFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferCollectionFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferCollectionFUCHSIA - Opaque handle to a buffer collection object

Fuchsia’s FIDL-based Sysmem service interoperates with Vulkan via the
`[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html)` extension.

A buffer collection is a set of one or more buffers which were allocated
together as a group and which all have the same properties.
These properties describe the buffers' internal representation, such as its
dimensions and memory layout.
This ensures that all of the buffers can be used interchangeably by tasks
that require swapping among multiple buffers, such as double-buffered
graphics rendering.

On Fuchsia, the Sysmem service uses buffer collections as a core construct
in its design.

Buffer collections are represented by `VkBufferCollectionFUCHSIA`
handles:

// Provided by VK_FUCHSIA_buffer_collection
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkBufferCollectionFUCHSIA)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkBufferCollectionBufferCreateInfoFUCHSIA](VkBufferCollectionBufferCreateInfoFUCHSIA.html), [VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html), [VkImportMemoryBufferCollectionFUCHSIA](VkImportMemoryBufferCollectionFUCHSIA.html), [vkCreateBufferCollectionFUCHSIA](vkCreateBufferCollectionFUCHSIA.html), [vkDestroyBufferCollectionFUCHSIA](vkDestroyBufferCollectionFUCHSIA.html), [vkGetBufferCollectionPropertiesFUCHSIA](vkGetBufferCollectionPropertiesFUCHSIA.html), [vkSetBufferCollectionBufferConstraintsFUCHSIA](vkSetBufferCollectionBufferConstraintsFUCHSIA.html), [vkSetBufferCollectionImageConstraintsFUCHSIA](vkSetBufferCollectionImageConstraintsFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferCollectionFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
