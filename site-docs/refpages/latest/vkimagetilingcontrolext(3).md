# VkImageTilingControlEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageTilingControlEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageTilingControlEXT - Specifies image tiling arrangement

Possible values of
[VkImageTilingControlCreateInfoEXT](VkImageTilingControlCreateInfoEXT.html)::`imageTiling`, specifying image
tiling arrangement, are:

// Provided by VK_EXT_image_tiling_control
typedef enum VkImageTilingControlEXT {
    VK_IMAGE_TILING_CONTROL_DEFAULT_EXT = 0,
    VK_IMAGE_TILING_CONTROL_MIN_SIZE_EXT = 1,
    VK_IMAGE_TILING_CONTROL_MAX_PERFORMANCE_EXT = 2,
} VkImageTilingControlEXT;

* 
[VK_IMAGE_TILING_CONTROL_DEFAULT_EXT](#) specifies that the image
tiling arrangement balances memory size requirements and memory access
performance.
It is the same selection as with the
[VkImageTilingControlCreateInfoEXT](VkImageTilingControlCreateInfoEXT.html) structure omitted from the
`pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html).

* 
[VK_IMAGE_TILING_CONTROL_MIN_SIZE_EXT](#) specifies that the image
tiling arrangement minimizes memory size requirements with reduced
consideration for memory access performance.

* 
[VK_IMAGE_TILING_CONTROL_MAX_PERFORMANCE_EXT](#) specifies that the
image tiling arrangement maximizes memory access performance with
reduced consideration for increases in memory size requirements.

These enumeration values only select the preferred tiling arrangement out of
the subset that the implementation supports, which is dependent on the other
image creation parameters.

There are cases where multiple enumeration values will result in the same
tiling arrangement, especially for images with extents that are multiples of
optimal tiling block sizes.
For these cases, no tradeoff exists for the image.

The memory size requirements of the image are less than or equal when using
[VK_IMAGE_TILING_CONTROL_MIN_SIZE_EXT](#).
However, there are no performance guarantees when using
[VK_IMAGE_TILING_CONTROL_MAX_PERFORMANCE_EXT](#) as image access times are
dependent on other variables such as the shader access pattern.

[VK_EXT_image_tiling_control](VK_EXT_image_tiling_control.html), [VkImageTilingControlCreateInfoEXT](VkImageTilingControlCreateInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageTilingControlEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
