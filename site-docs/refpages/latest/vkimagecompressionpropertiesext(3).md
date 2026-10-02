# VkImageCompressionPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageCompressionPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageCompressionPropertiesEXT - Compression properties of an image

To query the compression properties of an image, add a
[VkImageCompressionPropertiesEXT](#) structure to the `pNext` chain of
the [VkSubresourceLayout2](VkSubresourceLayout2.html) structure in a call to
[vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html).

To determine the compression rates that are supported for a given image
format, add a [VkImageCompressionPropertiesEXT](#) structure to the
`pNext` chain of the [VkImageFormatProperties2](VkImageFormatProperties2.html) structure in a call
to [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html).

|  | Since fixed-rate compression is disabled by default, the
| --- | --- |
[VkImageCompressionPropertiesEXT](#) structure passed to
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) will not indicate any
fixed-rate compression support unless a [VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)
structure is also included in the `pNext` chain of the
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) structure passed to the same command. |

The `VkImageCompressionPropertiesEXT` structure is defined as:

// Provided by VK_EXT_image_compression_control
typedef struct VkImageCompressionPropertiesEXT {
    VkStructureType                        sType;
    void*                                  pNext;
    VkImageCompressionFlagsEXT             imageCompressionFlags;
    VkImageCompressionFixedRateFlagsEXT    imageCompressionFixedRateFlags;
} VkImageCompressionPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageCompressionFlags` returns a value describing the compression
controls that apply to the image.
The value will be either [VK_IMAGE_COMPRESSION_DEFAULT_EXT](VkImageCompressionFlagBitsEXT.html) to
indicate no fixed-rate compression,
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](VkImageCompressionFlagBitsEXT.html) to indicate
fixed-rate compression, or [VK_IMAGE_COMPRESSION_DISABLED_EXT](VkImageCompressionFlagBitsEXT.html) to
indicate no compression.

* 
`imageCompressionFixedRateFlags` returns a
[VkImageCompressionFixedRateFlagsEXT](VkImageCompressionFixedRateFlagsEXT.html) value describing the
compression rates that apply to the specified aspect of the image.

Valid Usage (Implicit)

* 
[](#VUID-VkImageCompressionPropertiesEXT-sType-sType) VUID-VkImageCompressionPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_COMPRESSION_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](VkImageFormatProperties2.html)

* 
[VkSubresourceLayout2](VkSubresourceLayout2.html)

* 
[VkSurfaceFormat2KHR](VkSurfaceFormat2KHR.html)

[VK_EXT_image_compression_control](VK_EXT_image_compression_control.html), [VkImageCompressionFixedRateFlagsEXT](VkImageCompressionFixedRateFlagsEXT.html), [VkImageCompressionFlagsEXT](VkImageCompressionFlagsEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageCompressionPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
