# VkDrmFormatModifierPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDrmFormatModifierPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDrmFormatModifierPropertiesEXT - Structure specifying properties of a format when combined with a DRM format modifier

The [VkDrmFormatModifierPropertiesEXT](#) structure describes properties of
a [VkFormat](VkFormat.html) when that format is combined with a
[Linux DRM format modifier](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier).
These properties, like those of [VkFormatProperties2](VkFormatProperties2.html), are independent
of any particular image.

The [VkDrmFormatModifierPropertiesEXT](#) structure is defined as:

// Provided by VK_EXT_image_drm_format_modifier
typedef struct VkDrmFormatModifierPropertiesEXT {
    uint64_t                drmFormatModifier;
    uint32_t                drmFormatModifierPlaneCount;
    VkFormatFeatureFlags    drmFormatModifierTilingFeatures;
} VkDrmFormatModifierPropertiesEXT;

* 
`drmFormatModifier` is a *Linux DRM format modifier*.

* 
`drmFormatModifierPlaneCount` is the number of *memory planes* in
any image created with `format` and `drmFormatModifier`.
An image’s *memory planecount* is distinct from its *format planecount*,
as explained below.

* 
`drmFormatModifierTilingFeatures` is a bitmask of
[VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html) that are supported by any image created
with `format` and `drmFormatModifier`.

The returned `drmFormatModifierTilingFeatures` **must** contain at least
one bit.

The implementation **must** not return `DRM_FORMAT_MOD_INVALID` in
`drmFormatModifier`.

An image’s *memory planecount* (as returned by
`drmFormatModifierPlaneCount`) is distinct from its *format planecount*
(in the sense of [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar)).
In [VkImageAspectFlags](VkImageAspectFlags.html), each
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` represents a *memory plane*
and each `VK_IMAGE_ASPECT_PLANE*_i_*BIT` a *format plane*.

An image’s set of *format planes* is an ordered partition of the image’s
**content** into separable groups of format components.
The ordered partition is encoded in the name of each [VkFormat](VkFormat.html).
For example, [VK_FORMAT_G8_B8R8_2PLANE_420_UNORM](VkFormat.html) contains two *format
planes*; the first plane contains the green component and the second plane
contains the blue component and red component.
If the format name does not contain `PLANE`, then the format contains a
single plane; for example, [VK_FORMAT_R8G8B8A8_UNORM](VkFormat.html).
Some commands, such as [vkCmdCopyBufferToImage](vkCmdCopyBufferToImage.html), do not operate on all
format components in the image, but instead operate only on the *format
planes* explicitly chosen by the application and operate on each *format
plane* independently.

An image’s set of *memory planes* is an ordered partition of the image’s
**memory** rather than the image’s **content**.
Each *memory plane* is a contiguous range of memory.
The union of an image’s *memory planes* is not necessarily contiguous.

If an image is [linear](../../../../spec/latest/appendices/glossary.html#glossary-linear-resource), then the partition is
the same for *memory planes* and for *format planes*.
Therefore, if the returned `drmFormatModifier` is
`DRM_FORMAT_MOD_LINEAR`, then `drmFormatModifierPlaneCount` **must**
equal the *format planecount*, and `drmFormatModifierTilingFeatures`
**must** be identical to the
[VkFormatProperties2](VkFormatProperties2.html)::`formatProperties.linearTilingFeatures`
returned in the same `pNext` chain.

If an image is [non-linear](../../../../spec/latest/appendices/glossary.html#glossary-linear-resource), then the partition
of the image’s **memory** into *memory planes* is implementation-specific and
**may** be unrelated to the partition of the image’s **content** into *format
planes*.
For example, consider an image whose `format` is
[VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM](VkFormat.html), `tiling` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), whose `drmFormatModifier`
is not `DRM_FORMAT_MOD_LINEAR`, and `flags` lacks
[VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html).
The image has 3 *format planes*, and commands such
[vkCmdCopyBufferToImage](vkCmdCopyBufferToImage.html) act on each *format plane* independently as if
the data of each *format plane* were separable from the data of the other
planes.
In a straightforward implementation, the implementation **may** store the
image’s content in 3 adjacent *memory planes* where each *memory plane*
corresponds exactly to a *format plane*.
However, the implementation **may** also store the image’s content in a single
*memory plane* where all format components are combined using an
implementation-private block-compressed format; or the implementation **may**
store the image’s content in a collection of 7 adjacent *memory planes*
using an implementation-private sharding technique.
Because the image is non-linear and non-disjoint, the implementation has
much freedom when choosing the image’s placement in memory.

The *memory planecount* applies to function parameters and structures only
when the API specifies an explicit requirement on
`drmFormatModifierPlaneCount`.
In all other cases, the *memory planecount* is ignored.

[VK_EXT_image_drm_format_modifier](VK_EXT_image_drm_format_modifier.html), [VkDrmFormatModifierPropertiesListEXT](VkDrmFormatModifierPropertiesListEXT.html), [VkFormatFeatureFlags](VkFormatFeatureFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkDrmFormatModifierPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
