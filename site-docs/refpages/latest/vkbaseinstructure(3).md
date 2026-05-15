# VkBaseInStructure(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBaseInStructure.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBaseInStructure - Base structure for a read-only pointer chain

The `VkBaseInStructure` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkBaseInStructure {
    VkStructureType                    sType;
    const struct VkBaseInStructure*    pNext;
} VkBaseInStructure;

* 
`sType` is the structure type of the structure being iterated
through.

* 
`pNext` is `NULL` or a pointer to the next structure in a structure
chain.

`VkBaseInStructure` can be used to facilitate iterating through a
read-only structure pointer chain.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBaseInStructure](#), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkBaseInStructure).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
