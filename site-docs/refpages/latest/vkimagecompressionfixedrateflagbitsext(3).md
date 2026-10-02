# VkImageCompressionFixedRateFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageCompressionFixedRateFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageCompressionFixedRateFlagBitsEXT - Bitmask specifying fixed rate image compression rates

Bits which **can** be set in
[VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)::`pFixedRateFlags`, specifying
allowed compression rates for an image plane, are:

// Provided by VK_EXT_image_compression_control
typedef enum VkImageCompressionFixedRateFlagBitsEXT {
    VK_IMAGE_COMPRESSION_FIXED_RATE_NONE_EXT = 0,
    VK_IMAGE_COMPRESSION_FIXED_RATE_1BPC_BIT_EXT = 0x00000001,
    VK_IMAGE_COMPRESSION_FIXED_RATE_2BPC_BIT_EXT = 0x00000002,
    VK_IMAGE_COMPRESSION_FIXED_RATE_3BPC_BIT_EXT = 0x00000004,
    VK_IMAGE_COMPRESSION_FIXED_RATE_4BPC_BIT_EXT = 0x00000008,
    VK_IMAGE_COMPRESSION_FIXED_RATE_5BPC_BIT_EXT = 0x00000010,
    VK_IMAGE_COMPRESSION_FIXED_RATE_6BPC_BIT_EXT = 0x00000020,
    VK_IMAGE_COMPRESSION_FIXED_RATE_7BPC_BIT_EXT = 0x00000040,
    VK_IMAGE_COMPRESSION_FIXED_RATE_8BPC_BIT_EXT = 0x00000080,
    VK_IMAGE_COMPRESSION_FIXED_RATE_9BPC_BIT_EXT = 0x00000100,
    VK_IMAGE_COMPRESSION_FIXED_RATE_10BPC_BIT_EXT = 0x00000200,
    VK_IMAGE_COMPRESSION_FIXED_RATE_11BPC_BIT_EXT = 0x00000400,
    VK_IMAGE_COMPRESSION_FIXED_RATE_12BPC_BIT_EXT = 0x00000800,
    VK_IMAGE_COMPRESSION_FIXED_RATE_13BPC_BIT_EXT = 0x00001000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_14BPC_BIT_EXT = 0x00002000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_15BPC_BIT_EXT = 0x00004000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_16BPC_BIT_EXT = 0x00008000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_17BPC_BIT_EXT = 0x00010000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_18BPC_BIT_EXT = 0x00020000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_19BPC_BIT_EXT = 0x00040000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_20BPC_BIT_EXT = 0x00080000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_21BPC_BIT_EXT = 0x00100000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_22BPC_BIT_EXT = 0x00200000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_23BPC_BIT_EXT = 0x00400000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_24BPC_BIT_EXT = 0x00800000,
} VkImageCompressionFixedRateFlagBitsEXT;

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_NONE_EXT](#) specifies that fixed-rate
compression **must** not be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_1BPC_BIT_EXT](#) specifies that
fixed-rate compression with a bitrate of [1,2) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_2BPC_BIT_EXT](#) specifies that
fixed-rate compression with a bitrate of [2,3) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_3BPC_BIT_EXT](#) specifies that
fixed-rate compression with a bitrate of [3,4) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_4BPC_BIT_EXT](#) specifies that
fixed-rate compression with a bitrate of [4,5) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_5BPC_BIT_EXT](#) specifies that
fixed-rate compression with a bitrate of [5,6) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_6BPC_BIT_EXT](#) specifies that
fixed-rate compression with a bitrate of [6,7) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_7BPC_BIT_EXT](#) specifies that
fixed-rate compression with a bitrate of [7,8) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_8BPC_BIT_EXT](#) specifies that
fixed-rate compression with a bitrate of [8,9) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_9BPC_BIT_EXT](#) specifies that
fixed-rate compression with a bitrate of [9,10) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_10BPC_BIT_EXT](#) specifies that
fixed-rate compression with a bitrate of [10,11) bits per
component **may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_11BPC_BIT_EXT](#) specifies that
fixed-rate compression with a bitrate of [11,12) bits per
component **may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_12BPC_BIT_EXT](#) specifies that
fixed-rate compression with a bitrate of at least 12 bits per component
**may** be used.

If the format has a different bit rate for different components,
[VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)::`pFixedRateFlags` describes the rate
of the component with the largest number of bits assigned to it, scaled pro
rata.
For example, to request that a [VK_FORMAT_A2R10G10B10_UNORM_PACK32](VkFormat.html)
format be stored at a rate of 8 bits per pixel, use
[VK_IMAGE_COMPRESSION_FIXED_RATE_2BPC_BIT_EXT](#) (10 bits for the largest
component, stored at quarter the original size, 2.5 bits, rounded down).

If `flags` includes [VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](VkImageCompressionFlagBitsEXT.html),
and multiple bits are set in
[VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)::`pFixedRateFlags` for a plane,
implementations **should** apply the lowest allowed bitrate that is supported.

|  | The choice of “bits per component” terminology was chosen so that the same
| --- | --- |
compression rate describes the same degree of compression applied to formats
that differ only in the number of components.
For example, [VK_FORMAT_R8G8_UNORM](VkFormat.html) compressed to half its original size
is a rate of 4 bits per component, 8 bits per pixel.
[VK_FORMAT_R8G8B8A8_UNORM](VkFormat.html) compressed to half *its* original size is 4
bits per component, 16 bits per pixel.
Both of these cases can be requested with
[VK_IMAGE_COMPRESSION_FIXED_RATE_4BPC_BIT_EXT](#). |

[VK_EXT_image_compression_control](VK_EXT_image_compression_control.html), [VkImageCompressionFixedRateFlagsEXT](VkImageCompressionFixedRateFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageCompressionFixedRateFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
