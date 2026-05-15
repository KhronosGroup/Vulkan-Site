# VkBaseOutStructure(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBaseOutStructure.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBaseOutStructure - Base structure for a read-only pointer chain

The `VkBaseOutStructure` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkBaseOutStructure {
    VkStructureType               sType;
    struct VkBaseOutStructure*    pNext;
} VkBaseOutStructure;

* 
`sType` is the structure type of the structure being iterated
through.

* 
`pNext` is `NULL` or a pointer to the next structure in a structure
chain.

`VkBaseOutStructure` can be used to facilitate iterating through a
structure pointer chain that returns data back to the application.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBaseOutStructure](#), [VkStructureType](VkStructureType.html), [vkGetPipelinePropertiesEXT](vkGetPipelinePropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkBaseOutStructure).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
