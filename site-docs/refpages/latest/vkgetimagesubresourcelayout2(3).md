# vkGetImageSubresourceLayout2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetImageSubresourceLayout2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetImageSubresourceLayout2 - Retrieve information about an image subresource

To query the memory layout of an image subresource, call:

// Provided by VK_VERSION_1_4
void vkGetImageSubresourceLayout2(
    VkDevice                                    device,
    VkImage                                     image,
    const VkImageSubresource2*                  pSubresource,
    VkSubresourceLayout2*                       pLayout);

// Provided by VK_KHR_maintenance5
// Equivalent to vkGetImageSubresourceLayout2
void vkGetImageSubresourceLayout2KHR(
    VkDevice                                    device,
    VkImage                                     image,
    const VkImageSubresource2*                  pSubresource,
    VkSubresourceLayout2*                       pLayout);

// Provided by VK_EXT_host_image_copy, VK_EXT_image_compression_control
// Equivalent to vkGetImageSubresourceLayout2
void vkGetImageSubresourceLayout2EXT(
    VkDevice                                    device,
    VkImage                                     image,
    const VkImageSubresource2*                  pSubresource,
    VkSubresourceLayout2*                       pLayout);

* 
`device` is the logical device that owns the image.

* 
`image` is the image whose layout is being queried.

* 
`pSubresource` is a pointer to a [VkImageSubresource2](VkImageSubresource2.html) structure
selecting a specific image for the image subresource.

* 
`pLayout` is a pointer to a [VkSubresourceLayout2](VkSubresourceLayout2.html) structure in
which the layout is returned.

`vkGetImageSubresourceLayout2` behaves similarly to
[vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), with the ability to specify extended
inputs via chained input structures, and to return extended information via
chained output structures.

It is legal to call `vkGetImageSubresourceLayout2` with an `image`
created with `tiling` equal to [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), but the
members of [VkSubresourceLayout2](VkSubresourceLayout2.html)::`subresourceLayout` will have
**undefined** values in this case.

|  | Structures chained from [VkImageSubresource2](VkImageSubresource2.html)::`pNext` will also be
| --- | --- |
updated when `tiling` is equal to [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html). |

Valid Usage

* 
[](#VUID-vkGetImageSubresourceLayout2-aspectMask-00997) VUID-vkGetImageSubresourceLayout2-aspectMask-00997

The `aspectMask` member of `pSubresource` **must** only have a
single bit set

* 
[](#VUID-vkGetImageSubresourceLayout2-mipLevel-01716) VUID-vkGetImageSubresourceLayout2-mipLevel-01716

The `mipLevel` member of `pSubresource` **must** be less than the
`mipLevels` specified in `image`

* 
[](#VUID-vkGetImageSubresourceLayout2-arrayLayer-01717) VUID-vkGetImageSubresourceLayout2-arrayLayer-01717

The `arrayLayer` member of `pSubresource` **must** be less than the
`arrayLayers` specified in `image`

* 
[](#VUID-vkGetImageSubresourceLayout2-format-08886) VUID-vkGetImageSubresourceLayout2-format-08886

If `format` of the `image` is a color format
that is not a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar),
and `tiling` of the `image` is
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html) or [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), the
`aspectMask` member of `pSubresource` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkGetImageSubresourceLayout2-format-04462) VUID-vkGetImageSubresourceLayout2-format-04462

If `format` of the `image` has a depth component, the
`aspectMask` member of `pSubresource` **must** contain
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkGetImageSubresourceLayout2-format-04463) VUID-vkGetImageSubresourceLayout2-format-04463

If `format` of the `image` has a stencil component, the
`aspectMask` member of `pSubresource` **must** contain
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkGetImageSubresourceLayout2-format-04464) VUID-vkGetImageSubresourceLayout2-format-04464

If `format` of the `image` does not contain a stencil or
depth component, the `aspectMask` member of `pSubresource` **must**
not contain [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkGetImageSubresourceLayout2-tiling-08717) VUID-vkGetImageSubresourceLayout2-tiling-08717

If the `tiling` of the `image` is
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html) and has a [    multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then the `aspectMask` member of
`pSubresource` **must** be a single valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-vkGetImageSubresourceLayout2-image-09434) VUID-vkGetImageSubresourceLayout2-image-09434

If `image` was created with the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)
external memory handle type, then `image` **must** be bound to memory

* 
[](#VUID-vkGetImageSubresourceLayout2-tiling-09435) VUID-vkGetImageSubresourceLayout2-tiling-09435

If the `tiling` of the `image` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), then the `aspectMask`
member of `pSubresource` **must** be
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` and the index *i* **must**
be less than the
[VkDrmFormatModifierPropertiesEXT](VkDrmFormatModifierPropertiesEXT.html)::`drmFormatModifierPlaneCount`
associated with the image’s `format` and
[VkImageDrmFormatModifierPropertiesEXT](VkImageDrmFormatModifierPropertiesEXT.html)::`drmFormatModifier`

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageSubresourceLayout2-device-parameter) VUID-vkGetImageSubresourceLayout2-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetImageSubresourceLayout2-image-parameter) VUID-vkGetImageSubresourceLayout2-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkGetImageSubresourceLayout2-pSubresource-parameter) VUID-vkGetImageSubresourceLayout2-pSubresource-parameter

 `pSubresource` **must** be a valid pointer to a valid [VkImageSubresource2](VkImageSubresource2.html) structure

* 
[](#VUID-vkGetImageSubresourceLayout2-pLayout-parameter) VUID-vkGetImageSubresourceLayout2-pLayout-parameter

 `pLayout` **must** be a valid pointer to a [VkSubresourceLayout2](VkSubresourceLayout2.html) structure

* 
[](#VUID-vkGetImageSubresourceLayout2-image-parent) VUID-vkGetImageSubresourceLayout2-image-parent

 `image` **must** have been created, allocated, or retrieved from `device`

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_EXT_image_compression_control](VK_EXT_image_compression_control.html), [VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkDevice](VkDevice.html), [VkImage](VkImage.html), [VkImageSubresource2](VkImageSubresource2.html), [VkSubresourceLayout2](VkSubresourceLayout2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetImageSubresourceLayout2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
