# VkFilterCubicImageViewImageFormatPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFilterCubicImageViewImageFormatPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFilterCubicImageViewImageFormatPropertiesEXT - Structure for querying cubic filtering capabilities of an image view type

The `VkFilterCubicImageViewImageFormatPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_filter_cubic
typedef struct VkFilterCubicImageViewImageFormatPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           filterCubic;
    VkBool32           filterCubicMinmax;
} VkFilterCubicImageViewImageFormatPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`filterCubic` tells if image format, image type and image view type
**can** be used with cubic filtering.
This field is set by the implementation.
An application-specified value is ignored.

* 
`filterCubicMinmax` tells if image format, image type and image view
type **can** be used with cubic filtering and minmax filtering.
This field is set by the implementation.
An application-specified value is ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkFilterCubicImageViewImageFormatPropertiesEXT-sType-sType) VUID-VkFilterCubicImageViewImageFormatPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FILTER_CUBIC_IMAGE_VIEW_IMAGE_FORMAT_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](VkImageFormatProperties2.html)

Valid Usage

* 
[](#VUID-VkFilterCubicImageViewImageFormatPropertiesEXT-pNext-02627) VUID-VkFilterCubicImageViewImageFormatPropertiesEXT-pNext-02627

If the `pNext` chain of the [VkImageFormatProperties2](VkImageFormatProperties2.html) structure
includes a [VkFilterCubicImageViewImageFormatPropertiesEXT](#)
structure, the `pNext` chain of the
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) structure **must** include a
[VkPhysicalDeviceImageViewImageFormatInfoEXT](VkPhysicalDeviceImageViewImageFormatInfoEXT.html) structure with an
`imageViewType` that is compatible with `imageType`

[VK_EXT_filter_cubic](VK_EXT_filter_cubic.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
