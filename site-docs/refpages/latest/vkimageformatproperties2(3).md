# VkImageFormatProperties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageFormatProperties2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageFormatProperties2 - Structure specifying an image format properties

The `VkImageFormatProperties2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkImageFormatProperties2 {
    VkStructureType            sType;
    void*                      pNext;
    VkImageFormatProperties    imageFormatProperties;
} VkImageFormatProperties2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkImageFormatProperties2
typedef VkImageFormatProperties2 VkImageFormatProperties2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.
The `pNext` chain of `VkImageFormatProperties2` is used to allow
the specification of additional capabilities to be returned from
`vkGetPhysicalDeviceImageFormatProperties2`.

* 
`imageFormatProperties` is a [VkImageFormatProperties](VkImageFormatProperties.html) structure
in which capabilities are returned.

If the combination of parameters to
`vkGetPhysicalDeviceImageFormatProperties2` is not supported by the
implementation for use in [vkCreateImage](vkCreateImage.html), then all members of
`imageFormatProperties` will be filled with zero.

|  | Filling `imageFormatProperties` with zero for unsupported formats is an
| --- | --- |
exception to the usual rule that output structures have **undefined** contents
on error.
This exception was unintentional, but is preserved for backwards
compatibility.
This exception only applies to `imageFormatProperties`, not `sType`,
`pNext`, or any structures chained from `pNext`. |

Valid Usage (Implicit)

* 
[](#VUID-VkImageFormatProperties2-sType-sType) VUID-VkImageFormatProperties2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_FORMAT_PROPERTIES_2](VkStructureType.html)

* 
[](#VUID-VkImageFormatProperties2-pNext-pNext) VUID-VkImageFormatProperties2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAndroidHardwareBufferUsageANDROID](VkAndroidHardwareBufferUsageANDROID.html), [VkExternalImageFormatProperties](VkExternalImageFormatProperties.html), [VkFilterCubicImageViewImageFormatPropertiesEXT](VkFilterCubicImageViewImageFormatPropertiesEXT.html), [VkHostImageCopyDevicePerformanceQuery](VkHostImageCopyDevicePerformanceQuery.html), [VkImageCompressionPropertiesEXT](VkImageCompressionPropertiesEXT.html), [VkNativeBufferUsageOHOS](VkNativeBufferUsageOHOS.html), [VkSamplerYcbcrConversionImageFormatProperties](VkSamplerYcbcrConversionImageFormatProperties.html), [VkSubsampledImageFormatPropertiesEXT](VkSubsampledImageFormatPropertiesEXT.html), or [VkTextureLODGatherFormatPropertiesAMD](VkTextureLODGatherFormatPropertiesAMD.html)

* 
[](#VUID-VkImageFormatProperties2-sType-unique) VUID-VkImageFormatProperties2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkImageFormatProperties](VkImageFormatProperties.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html), [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkImageFormatProperties2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
