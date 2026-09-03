# VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT - Structure describing whether rendering to VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16 formats can be supported by an implementation

The `VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_rgba10x6_formats
typedef struct VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           formatRgba10x6WithoutYCbCrSampler;
} VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`formatRgba10x6WithoutYCbCrSampler` indicates that
[VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16](VkFormat.html) **can** be used with a
`VkImageView` with `subresourceRange.aspectMask` equal to
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) without a [    sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) enabled.

If the `VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RGBA10X6_FORMATS_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_rgba10x6_formats](VK_EXT_rgba10x6_formats.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
