# VkImageCompressionFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageCompressionFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageCompressionFlagBitsEXT - Bitmask specifying image compression controls

Possible values of [VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)::`flags`,
specifying compression controls for an image, are:

// Provided by VK_EXT_image_compression_control
typedef enum VkImageCompressionFlagBitsEXT {
    VK_IMAGE_COMPRESSION_DEFAULT_EXT = 0,
    VK_IMAGE_COMPRESSION_FIXED_RATE_DEFAULT_EXT = 0x00000001,
    VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT = 0x00000002,
    VK_IMAGE_COMPRESSION_DISABLED_EXT = 0x00000004,
} VkImageCompressionFlagBitsEXT;

* 
[VK_IMAGE_COMPRESSION_DEFAULT_EXT](#) specifies that the default image
compression setting is used.
Implementations **must** not apply fixed-rate compression.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_DEFAULT_EXT](#) specifies that the
implementation **may** choose any supported fixed-rate compression setting
in an implementation-defined manner based on the properties of the
image.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](#) specifies that
fixed-rate compression **may** be used and that the allowed compression
rates are specified by
[VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)::`pFixedRateFlags`.

* 
[VK_IMAGE_COMPRESSION_DISABLED_EXT](#) specifies that all lossless and
fixed-rate compression **should** be disabled.

If [VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)::`flags` is
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](#), then the `i`th
member of the `pFixedRateFlags` array specifies the allowed compression
rates for the image’s `i`th plane.

|  | If [VK_IMAGE_COMPRESSION_DISABLED_EXT](#) is included in
| --- | --- |
[VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)::`flags`, both lossless and
fixed-rate compression will be disabled.
This is likely to have a negative impact on performance and is only intended
to be used for debugging purposes. |

[VK_EXT_image_compression_control](VK_EXT_image_compression_control.html), [VkImageCompressionFlagsEXT](VkImageCompressionFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageCompressionFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
