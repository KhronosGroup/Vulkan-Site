# VkPhysicalDeviceImageViewImageFormatInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceImageViewImageFormatInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceImageViewImageFormatInfoEXT - Structure for providing image view type

The `VkPhysicalDeviceImageViewImageFormatInfoEXT` structure is defined
as:

// Provided by VK_EXT_filter_cubic
typedef struct VkPhysicalDeviceImageViewImageFormatInfoEXT {
    VkStructureType    sType;
    void*              pNext;
    VkImageViewType    imageViewType;
} VkPhysicalDeviceImageViewImageFormatInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageViewType` is a [VkImageViewType](VkImageViewType.html) value specifying the type
of the image view.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageViewImageFormatInfoEXT-sType-sType) VUID-VkPhysicalDeviceImageViewImageFormatInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_VIEW_IMAGE_FORMAT_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceImageViewImageFormatInfoEXT-imageViewType-parameter) VUID-VkPhysicalDeviceImageViewImageFormatInfoEXT-imageViewType-parameter

 `imageViewType` **must** be a valid [VkImageViewType](VkImageViewType.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

[VK_EXT_filter_cubic](VK_EXT_filter_cubic.html), [VkImageViewType](VkImageViewType.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkPhysicalDeviceImageViewImageFormatInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
