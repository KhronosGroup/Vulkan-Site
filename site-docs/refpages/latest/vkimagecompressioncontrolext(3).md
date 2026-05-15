# VkImageCompressionControlEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageCompressionControlEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageCompressionControlEXT - Specify image compression properties

If the `pNext` list of [VkImageCreateInfo](VkImageCreateInfo.html) includes a
`VkImageCompressionControlEXT` structure, then that structure describes
compression controls for this image.

The `VkImageCompressionControlEXT` structure is defined as:

// Provided by VK_EXT_image_compression_control
typedef struct VkImageCompressionControlEXT {
    VkStructureType                         sType;
    const void*                             pNext;
    VkImageCompressionFlagsEXT              flags;
    uint32_t                                compressionControlPlaneCount;
    VkImageCompressionFixedRateFlagsEXT*    pFixedRateFlags;
} VkImageCompressionControlEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkImageCompressionFlagBitsEXT](VkImageCompressionFlagBitsEXT.html)
describing compression controls for the image.

* 
`compressionControlPlaneCount` is the number of entries in the
`pFixedRateFlags` array.

* 
`pFixedRateFlags` is `NULL` or a pointer to an array of
[VkImageCompressionFixedRateFlagsEXT](VkImageCompressionFixedRateFlagsEXT.html) bitfields describing allowed
fixed-rate compression rates of each image plane.
It is ignored if `flags` does not include
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](VkImageCompressionFlagBitsEXT.html).

If enabled, fixed-rate compression is done in an implementation-defined
manner and **may** be applied at block granularity.
In that case, a write to an individual texel **may** modify the value of other
texels in the same block.

Valid Usage

* 
[](#VUID-VkImageCompressionControlEXT-flags-06747) VUID-VkImageCompressionControlEXT-flags-06747

`flags` **must** be one of [VK_IMAGE_COMPRESSION_DEFAULT_EXT](VkImageCompressionFlagBitsEXT.html),
[VK_IMAGE_COMPRESSION_FIXED_RATE_DEFAULT_EXT](VkImageCompressionFlagBitsEXT.html),
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](VkImageCompressionFlagBitsEXT.html), or
[VK_IMAGE_COMPRESSION_DISABLED_EXT](VkImageCompressionFlagBitsEXT.html)

* 
[](#VUID-VkImageCompressionControlEXT-flags-06748) VUID-VkImageCompressionControlEXT-flags-06748

If `flags` includes
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](VkImageCompressionFlagBitsEXT.html),
`pFixedRateFlags` **must** not be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-VkImageCompressionControlEXT-sType-sType) VUID-VkImageCompressionControlEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_COMPRESSION_CONTROL_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

* 
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

|  | Some combinations of compression properties may not be supported.
| --- | --- |
For example, some implementations may not support different fixed-rate
compression rates per plane of a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) and will not be able to enable fixed-rate compression for any plane
if the requested rates differ. |

[VK_EXT_image_compression_control](VK_EXT_image_compression_control.html), [VkImageCompressionFixedRateFlagsEXT](VkImageCompressionFixedRateFlagsEXT.html), [VkImageCompressionFlagsEXT](VkImageCompressionFlagsEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageCompressionControlEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
