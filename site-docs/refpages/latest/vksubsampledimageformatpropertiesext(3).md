# VkSubsampledImageFormatPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubsampledImageFormatPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubsampledImageFormatPropertiesEXT - Structure specifying image descriptor count for subsampled images

To determine the number of image descriptors required to support a
subsampled image created with [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html), add
[VkSubsampledImageFormatPropertiesEXT](#) to the `pNext` chain of the
[VkImageFormatProperties2](VkImageFormatProperties2.html) structure in a call to
`vkGetPhysicalDeviceImageFormatProperties2`.

The `VkSubsampledImageFormatPropertiesEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap with VK_EXT_fragment_density_map
typedef struct VkSubsampledImageFormatPropertiesEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           subsampledImageDescriptorCount;
} VkSubsampledImageFormatPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`subsampledImageDescriptorCount` is the number of image descriptors
that the implementation uses to access the image.

Valid Usage (Implicit)

* 
[](#VUID-VkSubsampledImageFormatPropertiesEXT-sType-sType) VUID-VkSubsampledImageFormatPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBSAMPLED_IMAGE_FORMAT_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](VkImageFormatProperties2.html)

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkSubsampledImageFormatPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
