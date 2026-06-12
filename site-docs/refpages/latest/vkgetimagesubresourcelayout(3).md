# vkGetImageSubresourceLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetImageSubresourceLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetImageSubresourceLayout - Retrieve information about an image subresource

To query the memory layout of an image subresource, call:

// Provided by VK_VERSION_1_0
void vkGetImageSubresourceLayout(
    VkDevice                                    device,
    VkImage                                     image,
    const VkImageSubresource*                   pSubresource,
    VkSubresourceLayout*                        pLayout);

* 
`device` is the logical device that owns the image.

* 
`image` is the image whose layout is being queried.

* 
`pSubresource` is a pointer to a [VkImageSubresource](VkImageSubresource.html) structure
selecting a specific image subresource from the image.

* 
`pLayout` is a pointer to a [VkSubresourceLayout](VkSubresourceLayout.html) structure in
which the layout is returned.

If the image is [linear](../../../../spec/latest/appendices/glossary.html#glossary-linear-resource), then the
returned layout is valid for [host access](../../../../spec/latest/chapters/memory.html#memory-device-hostaccess).

If the image’s
tiling is [VK_IMAGE_TILING_LINEAR](VkImageTiling.html) and its
format is a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then
`vkGetImageSubresourceLayout` describes one
*format plane*
of the image.
If the image’s tiling is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), then
`vkGetImageSubresourceLayout` describes one *memory plane* of the image.
If the image’s tiling is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html) and
the image is [non-linear](../../../../spec/latest/appendices/glossary.html#glossary-linear-resource), then the returned
layout has an implementation-dependent meaning; the vendor of the image’s
[DRM format modifier](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier) **may** provide
documentation that explains how to interpret the returned layout.

`vkGetImageSubresourceLayout` is invariant for the lifetime of a single
image.
However, the subresource layout of images in Android hardware buffer or QNX
Screen buffer external memory is not known until the image has been bound to
memory, so applications **must** not call [vkGetImageSubresourceLayout](#) for
such an image before it has been bound.

Valid Usage

* 
[](#VUID-vkGetImageSubresourceLayout-image-07790) VUID-vkGetImageSubresourceLayout-image-07790

`image` **must** have been created with `tiling` equal to
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html) or
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html)

* 
[](#VUID-vkGetImageSubresourceLayout-aspectMask-00997) VUID-vkGetImageSubresourceLayout-aspectMask-00997

The `aspectMask` member of `pSubresource` **must** only have a
single bit set

* 
[](#VUID-vkGetImageSubresourceLayout-mipLevel-01716) VUID-vkGetImageSubresourceLayout-mipLevel-01716

The `mipLevel` member of `pSubresource` **must** be less than the
`mipLevels` specified in `image`

* 
[](#VUID-vkGetImageSubresourceLayout-arrayLayer-01717) VUID-vkGetImageSubresourceLayout-arrayLayer-01717

The `arrayLayer` member of `pSubresource` **must** be less than the
`arrayLayers` specified in `image`

* 
[](#VUID-vkGetImageSubresourceLayout-format-08886) VUID-vkGetImageSubresourceLayout-format-08886

If `format` of the `image` is a color format
that is not a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar),
and `tiling` of the `image` is
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html) or [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), the
`aspectMask` member of `pSubresource` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkGetImageSubresourceLayout-format-04462) VUID-vkGetImageSubresourceLayout-format-04462

If `format` of the `image` has a depth component, the
`aspectMask` member of `pSubresource` **must** contain
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkGetImageSubresourceLayout-format-04463) VUID-vkGetImageSubresourceLayout-format-04463

If `format` of the `image` has a stencil component, the
`aspectMask` member of `pSubresource` **must** contain
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkGetImageSubresourceLayout-format-04464) VUID-vkGetImageSubresourceLayout-format-04464

If `format` of the `image` does not contain a stencil or
depth component, the `aspectMask` member of `pSubresource` **must**
not contain [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkGetImageSubresourceLayout-tiling-08717) VUID-vkGetImageSubresourceLayout-tiling-08717

If the `tiling` of the `image` is
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html) and has a [    multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then the `aspectMask` member of
`pSubresource` **must** be a single valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-vkGetImageSubresourceLayout-image-09432) VUID-vkGetImageSubresourceLayout-image-09432

If `image` was created with the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)
external memory handle type, then `image` **must** be bound to memory

* 
[](#VUID-vkGetImageSubresourceLayout-tiling-09433) VUID-vkGetImageSubresourceLayout-tiling-09433

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
[](#VUID-vkGetImageSubresourceLayout-device-parameter) VUID-vkGetImageSubresourceLayout-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetImageSubresourceLayout-image-parameter) VUID-vkGetImageSubresourceLayout-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkGetImageSubresourceLayout-pSubresource-parameter) VUID-vkGetImageSubresourceLayout-pSubresource-parameter

 `pSubresource` **must** be a valid pointer to a valid [VkImageSubresource](VkImageSubresource.html) structure

* 
[](#VUID-vkGetImageSubresourceLayout-pLayout-parameter) VUID-vkGetImageSubresourceLayout-pLayout-parameter

 `pLayout` **must** be a valid pointer to a [VkSubresourceLayout](VkSubresourceLayout.html) structure

* 
[](#VUID-vkGetImageSubresourceLayout-image-parent) VUID-vkGetImageSubresourceLayout-image-parent

 `image` **must** have been created, allocated, or retrieved from `device`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkImage](VkImage.html), [VkImageSubresource](VkImageSubresource.html), [VkSubresourceLayout](VkSubresourceLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetImageSubresourceLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
