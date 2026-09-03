# VkSysmemColorSpaceFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSysmemColorSpaceFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSysmemColorSpaceFUCHSIA - Structure describing the buffer collections color space

The `VkSysmemColorSpaceFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkSysmemColorSpaceFUCHSIA {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           colorSpace;
} VkSysmemColorSpaceFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`colorSpace` value of the Sysmem `ColorSpaceType`

Valid Usage

* 
[](#VUID-VkSysmemColorSpaceFUCHSIA-colorSpace-06402) VUID-VkSysmemColorSpaceFUCHSIA-colorSpace-06402

`colorSpace` **must** be a `ColorSpaceType` as defined in
`fuchsia.sysmem/image_formats.fidl`

Valid Usage (Implicit)

* 
[](#VUID-VkSysmemColorSpaceFUCHSIA-sType-sType) VUID-VkSysmemColorSpaceFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SYSMEM_COLOR_SPACE_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkSysmemColorSpaceFUCHSIA-pNext-pNext) VUID-VkSysmemColorSpaceFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html), [VkImageFormatConstraintsInfoFUCHSIA](VkImageFormatConstraintsInfoFUCHSIA.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkSysmemColorSpaceFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
