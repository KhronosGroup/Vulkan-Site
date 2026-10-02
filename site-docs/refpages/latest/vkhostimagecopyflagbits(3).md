# VkHostImageCopyFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkHostImageCopyFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkHostImageCopyFlagBits - Bitmask specifying additional copy parameters

Bits which **can** be set in [VkCopyMemoryToImageInfo](VkCopyMemoryToImageInfo.html)::`flags`,
[VkCopyImageToMemoryInfo](VkCopyImageToMemoryInfo.html)::`flags`, and
[VkCopyImageToImageInfo](VkCopyImageToImageInfo.html)::`flags`, specifying additional copy
parameters are:

// Provided by VK_VERSION_1_4
typedef enum VkHostImageCopyFlagBits {
    VK_HOST_IMAGE_COPY_MEMCPY_BIT = 0x00000001,
  // VK_HOST_IMAGE_COPY_MEMCPY is a legacy alias
    VK_HOST_IMAGE_COPY_MEMCPY = VK_HOST_IMAGE_COPY_MEMCPY_BIT,
  // Provided by VK_EXT_host_image_copy
    VK_HOST_IMAGE_COPY_MEMCPY_BIT_EXT = VK_HOST_IMAGE_COPY_MEMCPY_BIT,
  // Provided by VK_EXT_host_image_copy
  // VK_HOST_IMAGE_COPY_MEMCPY_EXT is a legacy alias
    VK_HOST_IMAGE_COPY_MEMCPY_EXT = VK_HOST_IMAGE_COPY_MEMCPY_BIT,
} VkHostImageCopyFlagBits;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkHostImageCopyFlagBits
typedef VkHostImageCopyFlagBits VkHostImageCopyFlagBitsEXT;

* 
[VK_HOST_IMAGE_COPY_MEMCPY_BIT](#) specifies that no memory layout
swizzling is to be applied during data copy.
For copies between memory and images, this flag indicates that image
data in host memory is swizzled in exactly the same way as the image
data on the device.
Using this flag indicates that the implementations **may** use a simple
memory copy to transfer the data between the host memory and the device
memory.
The format of the swizzled data in host memory is platform dependent and
is not defined in this specification.

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkHostImageCopyFlags](VkHostImageCopyFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkHostImageCopyFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
