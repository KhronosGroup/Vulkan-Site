# VkMemoryZirconHandlePropertiesFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryZirconHandlePropertiesFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryZirconHandlePropertiesFUCHSIA - Structure specifying Zircon handle compatible external memory

The `VkMemoryZirconHandlePropertiesFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_external_memory
typedef struct VkMemoryZirconHandlePropertiesFUCHSIA {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           memoryTypeBits;
} VkMemoryZirconHandlePropertiesFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryTypeBits` a bitmask containing one bit set for every memory
type which the specified handle can be imported as.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryZirconHandlePropertiesFUCHSIA-sType-sType) VUID-VkMemoryZirconHandlePropertiesFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_ZIRCON_HANDLE_PROPERTIES_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkMemoryZirconHandlePropertiesFUCHSIA-pNext-pNext) VUID-VkMemoryZirconHandlePropertiesFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

[VK_FUCHSIA_external_memory](VK_FUCHSIA_external_memory.html), [VkStructureType](VkStructureType.html), [vkGetMemoryZirconHandlePropertiesFUCHSIA](vkGetMemoryZirconHandlePropertiesFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryZirconHandlePropertiesFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
