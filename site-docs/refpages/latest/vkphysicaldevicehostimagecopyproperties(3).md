# VkPhysicalDeviceHostImageCopyProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceHostImageCopyProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceHostImageCopyProperties - Structure enumerating image layouts supported by an implementation for host memory copies

The `VkPhysicalDeviceHostImageCopyProperties` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceHostImageCopyProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           copySrcLayoutCount;
    VkImageLayout*     pCopySrcLayouts;
    uint32_t           copyDstLayoutCount;
    VkImageLayout*     pCopyDstLayouts;
    uint8_t            optimalTilingLayoutUUID[VK_UUID_SIZE];
    VkBool32           identicalMemoryTypeRequirements;
} VkPhysicalDeviceHostImageCopyProperties;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkPhysicalDeviceHostImageCopyProperties
typedef VkPhysicalDeviceHostImageCopyProperties VkPhysicalDeviceHostImageCopyPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`copySrcLayoutCount` is an integer related to the number of image
layouts for host copies from images available or queried, as described
below.

* 
`pCopySrcLayouts` is a pointer to an array of [VkImageLayout](VkImageLayout.html) in
which supported image layouts for use with host copy operations from
images are returned.

* 
`copyDstLayoutCount` is an integer related to the number of image
layouts for host copies to images available or queried, as described
below.

* 
`pCopyDstLayouts` is a pointer to an array of [VkImageLayout](VkImageLayout.html) in
which supported image layouts for use with host copy operations to
images are returned.

* 
`optimalTilingLayoutUUID` is an array of [VK_UUID_SIZE](VK_UUID_SIZE.html)
`uint8_t` values representing a universally unique identifier for the
implementation’s swizzling layout of images created with
[VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html).

* 
`identicalMemoryTypeRequirements` indicates that specifying the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) flag in
[VkImageCreateInfo](VkImageCreateInfo.html)::`usage` does not affect the memory type
requirements of the image.

If the `VkPhysicalDeviceHostImageCopyProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

If `pCopyDstLayouts` is `NULL`, then the number of image layouts that
are supported in [VkCopyMemoryToImageInfo](VkCopyMemoryToImageInfo.html)::`dstImageLayout` and
[VkCopyImageToImageInfo](VkCopyImageToImageInfo.html)::`dstImageLayout` is returned in
`copyDstLayoutCount`.
Otherwise, `copyDstLayoutCount` **must** be set by the application to the
number of elements in the `pCopyDstLayouts` array, and on return is
overwritten with the number of values actually written to
`pCopyDstLayouts`.
If the value of `copyDstLayoutCount` is less than the number of image
layouts that are supported, at most `copyDstLayoutCount` values will be
written to `pCopyDstLayouts`.
The implementation **must** include the [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) image
layout in `pCopyDstLayouts`.
If the [`unifiedImageLayouts`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayouts) feature
is supported, the implementation **must** include all the image layouts that
are interchangeable with [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) in
`pCopyDstLayouts`.

If `pCopySrcLayouts` is `NULL`, then the number of image layouts that
are supported in [VkCopyImageToMemoryInfo](VkCopyImageToMemoryInfo.html)::`srcImageLayout` and
[VkCopyImageToImageInfo](VkCopyImageToImageInfo.html)::`srcImageLayout` is returned in
`copySrcLayoutCount`.
Otherwise, `copySrcLayoutCount` **must** be set by the application to the
number of elements in the `pCopySrcLayouts` array, and on return is
overwritten with the number of values actually written to
`pCopySrcLayouts`.
If the value of `copySrcLayoutCount` is less than the number of image
layouts that are supported, at most `copySrcLayoutCount` values will be
written to `pCopySrcLayouts`.
The implementation **must** include the [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) image
layout in `pCopySrcLayouts`.
If the [`unifiedImageLayouts`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayouts) feature
is supported, the implementation **must** include all the image layouts that
are interchangeable with [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) in
`pCopySrcLayouts`.

The `optimalTilingLayoutUUID` value can be used to ensure compatible
data layouts when using the [VK_HOST_IMAGE_COPY_MEMCPY_BIT](VkHostImageCopyFlagBits.html) flag in
[vkCopyMemoryToImage](vkCopyMemoryToImage.html) and [vkCopyImageToMemory](vkCopyImageToMemory.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceHostImageCopyProperties-sType-sType) VUID-VkPhysicalDeviceHostImageCopyProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_PROPERTIES](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceHostImageCopyProperties-pCopySrcLayouts-parameter) VUID-VkPhysicalDeviceHostImageCopyProperties-pCopySrcLayouts-parameter

 If `copySrcLayoutCount` is not `0`, and `pCopySrcLayouts` is not `NULL`, `pCopySrcLayouts` **must** be a valid pointer to an array of `copySrcLayoutCount` [VkImageLayout](VkImageLayout.html) values

* 
[](#VUID-VkPhysicalDeviceHostImageCopyProperties-pCopyDstLayouts-parameter) VUID-VkPhysicalDeviceHostImageCopyProperties-pCopyDstLayouts-parameter

 If `copyDstLayoutCount` is not `0`, and `pCopyDstLayouts` is not `NULL`, `pCopyDstLayouts` **must** be a valid pointer to an array of `copyDstLayoutCount` [VkImageLayout](VkImageLayout.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkImageLayout](VkImageLayout.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceHostImageCopyProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
