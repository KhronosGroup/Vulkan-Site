# VkImageType(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageType.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageType - Specifies the type of an image object

Possible values of [VkImageCreateInfo](VkImageCreateInfo.html)::`imageType`, specifying the
basic dimensionality of an image, are:

// Provided by VK_VERSION_1_0
typedef enum VkImageType {
    VK_IMAGE_TYPE_1D = 0,
    VK_IMAGE_TYPE_2D = 1,
    VK_IMAGE_TYPE_3D = 2,
} VkImageType;

* 
[VK_IMAGE_TYPE_1D](#) specifies a one-dimensional image.

* 
[VK_IMAGE_TYPE_2D](#) specifies a two-dimensional image.

* 
[VK_IMAGE_TYPE_3D](#) specifies a three-dimensional image.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html), [VkPhysicalDeviceSparseImageFormatInfo2](VkPhysicalDeviceSparseImageFormatInfo2.html), [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html), [vkGetPhysicalDeviceExternalImageFormatPropertiesNV](vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html), [vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html), [vkGetPhysicalDeviceSparseImageFormatProperties](vkGetPhysicalDeviceSparseImageFormatProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageType).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
