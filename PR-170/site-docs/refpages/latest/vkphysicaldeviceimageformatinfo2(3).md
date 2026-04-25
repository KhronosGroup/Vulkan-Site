# VkPhysicalDeviceImageFormatInfo2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceImageFormatInfo2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceImageFormatInfo2 - Structure specifying image creation parameters

The `VkPhysicalDeviceImageFormatInfo2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceImageFormatInfo2 {
    VkStructureType       sType;
    const void*           pNext;
    VkFormat              format;
    VkImageType           type;
    VkImageTiling         tiling;
    VkImageUsageFlags     usage;
    VkImageCreateFlags    flags;
} VkPhysicalDeviceImageFormatInfo2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkPhysicalDeviceImageFormatInfo2
typedef VkPhysicalDeviceImageFormatInfo2 VkPhysicalDeviceImageFormatInfo2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.
The `pNext` chain of `VkPhysicalDeviceImageFormatInfo2` is used
to provide additional image parameters to
`vkGetPhysicalDeviceImageFormatProperties2`.

* 
`format` is a [VkFormat](VkFormat.html) value indicating the image format,
corresponding to [VkImageCreateInfo](VkImageCreateInfo.html)::`format`.

* 
`type` is a [VkImageType](VkImageType.html) value indicating the image type,
corresponding to [VkImageCreateInfo](VkImageCreateInfo.html)::`imageType`.

* 
`tiling` is a [VkImageTiling](VkImageTiling.html) value indicating the image tiling,
corresponding to [VkImageCreateInfo](VkImageCreateInfo.html)::`tiling`.

* 
`usage` is a bitmask of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) indicating the
intended usage of the image, corresponding to
[VkImageCreateInfo](VkImageCreateInfo.html)::`usage`.

* 
`flags` is a bitmask of [VkImageCreateFlagBits](VkImageCreateFlagBits.html) indicating
additional parameters of the image, corresponding to
[VkImageCreateInfo](VkImageCreateInfo.html)::`flags`.

The members of `VkPhysicalDeviceImageFormatInfo2` correspond to the
arguments to [vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html), with
`sType` and `pNext` added for extensibility.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-tiling-02249) VUID-VkPhysicalDeviceImageFormatInfo2-tiling-02249

`tiling` **must** be [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html) if
and only if the `pNext` chain includes
[VkPhysicalDeviceImageDrmFormatModifierInfoEXT](VkPhysicalDeviceImageDrmFormatModifierInfoEXT.html)

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-tiling-02313) VUID-VkPhysicalDeviceImageFormatInfo2-tiling-02313

If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html) and
`flags` contains [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html), then the
`pNext` chain **must** include a [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)
structure with non-zero `viewFormatCount`

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-sType-sType) VUID-VkPhysicalDeviceImageFormatInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_FORMAT_INFO_2](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-pNext-pNext) VUID-VkPhysicalDeviceImageFormatInfo2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkImageCompressionControlEXT](VkImageCompressionControlEXT.html), [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html), [VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html), [VkOpticalFlowImageFormatInfoNV](VkOpticalFlowImageFormatInfoNV.html), [VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html), [VkPhysicalDeviceImageDrmFormatModifierInfoEXT](VkPhysicalDeviceImageDrmFormatModifierInfoEXT.html), [VkPhysicalDeviceImageViewImageFormatInfoEXT](VkPhysicalDeviceImageViewImageFormatInfoEXT.html), or [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-sType-unique) VUID-VkPhysicalDeviceImageFormatInfo2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-format-parameter) VUID-VkPhysicalDeviceImageFormatInfo2-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-type-parameter) VUID-VkPhysicalDeviceImageFormatInfo2-type-parameter

 `type` **must** be a valid [VkImageType](VkImageType.html) value

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-tiling-parameter) VUID-VkPhysicalDeviceImageFormatInfo2-tiling-parameter

 `tiling` **must** be a valid [VkImageTiling](VkImageTiling.html) value

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-usage-parameter) VUID-VkPhysicalDeviceImageFormatInfo2-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) values

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-usage-requiredbitmask) VUID-VkPhysicalDeviceImageFormatInfo2-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-flags-parameter) VUID-VkPhysicalDeviceImageFormatInfo2-flags-parameter

 `flags` **must** be a valid combination of [VkImageCreateFlagBits](VkImageCreateFlagBits.html) values

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkFormat](VkFormat.html), [VkImageCreateFlags](VkImageCreateFlags.html), [VkImageTiling](VkImageTiling.html), [VkImageType](VkImageType.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html), [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkPhysicalDeviceImageFormatInfo2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
