# VkImageMemoryBarrier(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageMemoryBarrier.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageMemoryBarrier - Structure specifying the parameters of an image memory barrier

The `VkImageMemoryBarrier` structure is defined as:

|  | This functionality is superseded by [VkImageMemoryBarrier2](../../../../spec/latest/chapters/synchronization.html#VkImageMemoryBarrier2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkImageMemoryBarrier {
    VkStructureType            sType;
    const void*                pNext;
    VkAccessFlags              srcAccessMask;
    VkAccessFlags              dstAccessMask;
    VkImageLayout              oldLayout;
    VkImageLayout              newLayout;
    uint32_t                   srcQueueFamilyIndex;
    uint32_t                   dstQueueFamilyIndex;
    VkImage                    image;
    VkImageSubresourceRange    subresourceRange;
} VkImageMemoryBarrier;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcAccessMask` is a bitmask of [VkAccessFlagBits](VkAccessFlagBits.html) specifying a
[source access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks).

* 
`dstAccessMask` is a bitmask of [VkAccessFlagBits](VkAccessFlagBits.html) specifying a
[destination access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks).

* 
`oldLayout` is the old layout in an
[image layout transition](../../../../spec/latest/chapters/synchronization.html#synchronization-image-layout-transitions).

* 
`newLayout` is the new layout in an
[image layout transition](../../../../spec/latest/chapters/synchronization.html#synchronization-image-layout-transitions).

* 
`srcQueueFamilyIndex` is the source queue family for a
[queue family ownership transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).

* 
`dstQueueFamilyIndex` is the destination queue family for a
[queue family ownership transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).

* 
`image` is a handle to the image affected by this barrier.

* 
`subresourceRange` describes the [image    subresource range](../../../../spec/latest/chapters/resources.html#resources-image-views) within `image` that is affected by this barrier.

The first [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) is
limited to access to memory through the specified image subresource range,
via access types in the [source access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks)
specified by `srcAccessMask`.
If `srcAccessMask` includes [VK_ACCESS_HOST_WRITE_BIT](VkAccessFlagBits.html), memory
writes performed by that access type are also made visible, as that access
type is not performed through a resource.

The second [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) is
limited to access to memory through the specified image subresource range,
via access types in the [destination access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks) specified by `dstAccessMask`.
If `dstAccessMask` includes [VK_ACCESS_HOST_WRITE_BIT](VkAccessFlagBits.html) or
[VK_ACCESS_HOST_READ_BIT](VkAccessFlagBits.html), available memory writes are also made visible
to accesses of those types, as those access types are not performed through
a resource.

If `srcQueueFamilyIndex` is not equal to `dstQueueFamilyIndex`, and
`srcQueueFamilyIndex` is equal to the current queue family, then the
memory barrier defines a [queue family release operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-release) for the specified image subresource range, and
if `dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](VkDependencyFlagBits.html),
the second synchronization scope of the calling command does not apply to
this operation.

If `dstQueueFamilyIndex` is not equal to `srcQueueFamilyIndex`, and
`dstQueueFamilyIndex` is equal to the current queue family, then the
memory barrier defines a [queue family acquire operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-acquire) for the specified image subresource range, and
if `dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](VkDependencyFlagBits.html),
the first synchronization scope of the calling command does not apply to
this operation.

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is not
enabled or `oldLayout` is not equal to `newLayout`,
`oldLayout` and `newLayout` define an
[image layout transition](../../../../spec/latest/chapters/synchronization.html#synchronization-image-layout-transitions) for
the specified image subresource range.

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
enabled, `srcQueueFamilyIndex` and `dstQueueFamilyIndex` are equal,
and `oldLayout` and `newLayout` are also equal, the layout values
are ignored and the image contents are preserved regardless of the values of
`oldLayout`, `newLayout`, and the current layout of the image.

If `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) and the
[`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is enabled, the
`baseArrayLayer` and `layerCount` members of `subresourceRange`
specify the subset of slices of the 3D image affected by the memory barrier,
including the layout transition.
Any slices of a 3D image not included in `subresourceRange` are not
affected by the memory barrier and remain in their existing layout.

If `image` has a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) and the
image is *disjoint*, then including [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) in the
`aspectMask` member of `subresourceRange` is equivalent to including
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html), [VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html), and
(for three-plane formats only) [VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html).

Valid Usage

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01197) VUID-VkImageMemoryBarrier-oldLayout-01197

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` **must** be
[VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html) or the current layout of the image
subresources affected by the barrier

* 
[](#VUID-VkImageMemoryBarrier-newLayout-01198) VUID-VkImageMemoryBarrier-newLayout-01198

    If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `newLayout` **must** not be
    [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html) or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](VkImageLayout.html)

* 
[](#VUID-VkImageMemoryBarrier-image-09117) VUID-VkImageMemoryBarrier-image-09117

If `image` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `srcQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html),
[VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html),
or
a valid queue family

* 
[](#VUID-VkImageMemoryBarrier-image-09118) VUID-VkImageMemoryBarrier-image-09118

If `image` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `dstQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html),
[VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html),
or
a valid queue family

* 
[](#VUID-VkImageMemoryBarrier-None-09097) VUID-VkImageMemoryBarrier-None-09097

    
If
    the [VK_KHR_external_memory](VK_KHR_external_memory.html) extension is not enabled,
and
    the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
    the [VkInstance](VkInstance.html) is not greater than or equal to Version 1.1,
    `srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

* 
[](#VUID-VkImageMemoryBarrier-None-09098) VUID-VkImageMemoryBarrier-None-09098

    
If
    the [VK_KHR_external_memory](VK_KHR_external_memory.html) extension is not enabled,
and
    the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
    the [VkInstance](VkInstance.html) is not greater than or equal to Version 1.1,
    `dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-09099) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-09099

If the [VK_EXT_queue_family_foreign](VK_EXT_queue_family_foreign.html) extension is not enabled
`srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html)

* 
[](#VUID-VkImageMemoryBarrier-dstQueueFamilyIndex-09100) VUID-VkImageMemoryBarrier-dstQueueFamilyIndex-09100

If the [VK_EXT_queue_family_foreign](VK_EXT_queue_family_foreign.html) extension is not enabled
`dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html)

* 
[](#VUID-VkImageMemoryBarrier-subresourceRange-01486) VUID-VkImageMemoryBarrier-subresourceRange-01486

`subresourceRange.baseMipLevel` **must** be less than the
`mipLevels` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

* 
[](#VUID-VkImageMemoryBarrier-subresourceRange-01724) VUID-VkImageMemoryBarrier-subresourceRange-01724

If `subresourceRange.levelCount` is not
[VK_REMAINING_MIP_LEVELS](VK_REMAINING_MIP_LEVELS.html), `subresourceRange.baseMipLevel`
+  `subresourceRange.levelCount` **must** be less than or equal to
the `mipLevels` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when
`image` was created

* 
[](#VUID-VkImageMemoryBarrier-subresourceRange-01488) VUID-VkImageMemoryBarrier-subresourceRange-01488

If `image` is not a 3D image or was created without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set, or the
[`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is not enabled,
`subresourceRange.baseArrayLayer` **must** be less than the
`arrayLayers` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

* 
[](#VUID-VkImageMemoryBarrier-maintenance9-10798) VUID-VkImageMemoryBarrier-maintenance9-10798

If the [`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is enabled
and `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set,
`subresourceRange.baseArrayLayer` **must** be less than the depth
computed from `baseMipLevel` and `extent.depth` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `image` was created, according to the
formula defined in [Image Mip Level    Sizing](../../../../spec/latest/chapters/resources.html#resources-image-mip-level-sizing)

* 
[](#VUID-VkImageMemoryBarrier-maintenance9-10799) VUID-VkImageMemoryBarrier-maintenance9-10799

If the [`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is enabled
and `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set and either
`subresourceRange.baseArrayLayer` is not equal to 0 or
`subresourceRange.layerCount` is not equal to
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), `subresourceRange.levelCount` **must**
be 1

* 
[](#VUID-VkImageMemoryBarrier-subresourceRange-01725) VUID-VkImageMemoryBarrier-subresourceRange-01725

If
`image` is not a 3D image or was created without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set, or the
[`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is not enabled,
and
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
`arrayLayers` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

* 
[](#VUID-VkImageMemoryBarrier-maintenance9-10800) VUID-VkImageMemoryBarrier-maintenance9-10800

If the [`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is enabled,
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), and `image` is a 3D image created
with [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set,
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
depth computed from `baseMipLevel` and `extent.depth` specified
in [VkImageCreateInfo](VkImageCreateInfo.html) when `image` was created, according to
the formula defined in [Image Mip    Level Sizing](../../../../spec/latest/chapters/resources.html#resources-image-mip-level-sizing)

* 
[](#VUID-VkImageMemoryBarrier-image-01932) VUID-VkImageMemoryBarrier-image-01932

If `image` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-VkImageMemoryBarrier-image-09241) VUID-VkImageMemoryBarrier-image-09241

If `image` has a color format
that is single-plane,
then the `aspectMask` member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageMemoryBarrier-image-09242) VUID-VkImageMemoryBarrier-image-09242

If `image` has a color format and is not *disjoint*, then the
`aspectMask` member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageMemoryBarrier-image-01672) VUID-VkImageMemoryBarrier-image-01672

If `image` has a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) and
the image is *disjoint*, then the `aspectMask` member of
`subresourceRange` **must** include at least one
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit or
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageMemoryBarrier-image-03320) VUID-VkImageMemoryBarrier-image-03320

If `image` has a depth/stencil format with both depth and stencil
and the [    `separateDepthStencilLayouts`](../../../../spec/latest/chapters/features.html#features-separateDepthStencilLayouts) feature is not enabled,
then the `aspectMask` member of `subresourceRange` **must** include
both [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) and
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageMemoryBarrier-image-03319) VUID-VkImageMemoryBarrier-image-03319

If `image` has a depth/stencil format with both depth and stencil
and the [    `separateDepthStencilLayouts`](../../../../spec/latest/chapters/features.html#features-separateDepthStencilLayouts) feature is enabled, then the
`aspectMask` member of `subresourceRange` **must** include either
or both [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) and
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageMemoryBarrier-image-10749) VUID-VkImageMemoryBarrier-image-10749

If `image` has a depth-only format then the `aspectMask` member
of `subresourceRange` **must** be [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageMemoryBarrier-image-10750) VUID-VkImageMemoryBarrier-image-10750

If `image` has a stencil-only format then the `aspectMask`
member of `subresourceRange` **must** be
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageMemoryBarrier-aspectMask-08702) VUID-VkImageMemoryBarrier-aspectMask-08702

If the `aspectMask` member of `subresourceRange` includes
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), `oldLayout` and `newLayout`
**must** not be one of [VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkImageMemoryBarrier-aspectMask-08703) VUID-VkImageMemoryBarrier-aspectMask-08703

If the `aspectMask` member of `subresourceRange` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), `oldLayout` and `newLayout`
**must** not be one of [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkImageMemoryBarrier-subresourceRange-09601) VUID-VkImageMemoryBarrier-subresourceRange-09601

`subresourceRange.aspectMask` **must** be valid for the `format`
the `image` was created with

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01208) VUID-VkImageMemoryBarrier-oldLayout-01208

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html) then `image` **must**
have been created with the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01209) VUID-VkImageMemoryBarrier-oldLayout-01209

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01210) VUID-VkImageMemoryBarrier-oldLayout-01210

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01211) VUID-VkImageMemoryBarrier-oldLayout-01211

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html) then `image` **must**
have been created with the [VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01212) VUID-VkImageMemoryBarrier-oldLayout-01212

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html) usage flag
set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01213) VUID-VkImageMemoryBarrier-oldLayout-01213

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag
set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-10767) VUID-VkImageMemoryBarrier-oldLayout-10767

If the [    zeroInitializeDeviceMemory](../../../../spec/latest/chapters/features.html#features-zeroInitializeDeviceMemory) feature is not enabled, `oldLayout`
**must** not be [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html)

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-10768) VUID-VkImageMemoryBarrier-oldLayout-10768

If `oldLayout` is [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html), then
all subresources **must** be included in the barrier

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01658) VUID-VkImageMemoryBarrier-oldLayout-01658

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-01659) VUID-VkImageMemoryBarrier-oldLayout-01659

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04065) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04065

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html) then `image` **must**
have been created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04066) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04066

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) then `image` **must**
have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04067) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04067

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) then `image` **must**
have been created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04068) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-04068

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) then `image` **must**
have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-synchronization2-07793) VUID-VkImageMemoryBarrier-synchronization2-07793

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `oldLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkImageMemoryBarrier-synchronization2-07794) VUID-VkImageMemoryBarrier-synchronization2-07794

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `newLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-03938) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-03938

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL](VkImageLayout.html), `image` **must** have been
created with the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-03939) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-03939

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL](VkImageLayout.html), `image` **must** have been
created with at least one of the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-02088) VUID-VkImageMemoryBarrier-oldLayout-02088

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html) then
`image` **must** have been created with the
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html) usage flag
set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07120) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07120

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07121) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07121

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07122) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07122

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07123) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07123

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07124) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07124

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07125) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07125

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](VkImageLayout.html) then `image` **must** have
been created with the [VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-10287) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-10287

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](VkImageLayout.html) then `image`
**must** have been created with the
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07006) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-07006

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html) then
`image` **must** have been created with either the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set, and
the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) usage flags set, and the
[VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkImageMemoryBarrier-attachmentFeedbackLoopLayout-07313) VUID-VkImageMemoryBarrier-attachmentFeedbackLoopLayout-07313

If the [    `attachmentFeedbackLoopLayout`](../../../../spec/latest/chapters/features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`newLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html)

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-09550) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-09550

If [layouts are not ignored](../../../../spec/latest/chapters/synchronization.html#synchronization-image-barrier-ignored-layout), `oldLayout` or `newLayout` is
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html) then `image` **must** have
been created with either the [VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html) usage flag
set, or with both the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage
flag and either of the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-VkImageMemoryBarrier-dynamicRenderingLocalRead-09551) VUID-VkImageMemoryBarrier-dynamicRenderingLocalRead-09551

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`oldLayout` **must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)

* 
[](#VUID-VkImageMemoryBarrier-dynamicRenderingLocalRead-09552) VUID-VkImageMemoryBarrier-dynamicRenderingLocalRead-09552

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`newLayout` **must** not be [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)

* 
[](#VUID-VkImageMemoryBarrier-None-09052) VUID-VkImageMemoryBarrier-None-09052

If
the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is not
enabled, and
`image` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), at least one of
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_IGNORED](VK_QUEUE_FAMILY_IGNORED.html)

* 
[](#VUID-VkImageMemoryBarrier-None-09053) VUID-VkImageMemoryBarrier-None-09053

If
the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is not
enabled, and
`image` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), `srcQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_IGNORED](VK_QUEUE_FAMILY_IGNORED.html)
or [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

* 
[](#VUID-VkImageMemoryBarrier-None-09054) VUID-VkImageMemoryBarrier-None-09054

If
the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is not
enabled, and
`image` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), `dstQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_IGNORED](VK_QUEUE_FAMILY_IGNORED.html)
or [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

* 
[](#VUID-VkImageMemoryBarrier-dstQueueFamilyIndex-12331) VUID-VkImageMemoryBarrier-dstQueueFamilyIndex-12331

If `dstQueueFamilyIndex` is [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html) and
`image` was created with
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](VkExternalMemoryHandleTypeFlagBits.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](VkExternalMemoryHandleTypeFlagBits.html) in
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes`,
`newLayout` **must** be [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-12332) VUID-VkImageMemoryBarrier-srcQueueFamilyIndex-12332

If `srcQueueFamilyIndex` is [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html) and
`image` was created with
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](VkExternalMemoryHandleTypeFlagBits.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](VkExternalMemoryHandleTypeFlagBits.html) in
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes`,
`oldLayout` **must** be [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html)

Valid Usage (Implicit)

* 
[](#VUID-VkImageMemoryBarrier-sType-sType) VUID-VkImageMemoryBarrier-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER](VkStructureType.html)

* 
[](#VUID-VkImageMemoryBarrier-pNext-pNext) VUID-VkImageMemoryBarrier-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExternalMemoryAcquireUnmodifiedEXT](VkExternalMemoryAcquireUnmodifiedEXT.html) or [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html)

* 
[](#VUID-VkImageMemoryBarrier-sType-unique) VUID-VkImageMemoryBarrier-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkImageMemoryBarrier-oldLayout-parameter) VUID-VkImageMemoryBarrier-oldLayout-parameter

 `oldLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkImageMemoryBarrier-newLayout-parameter) VUID-VkImageMemoryBarrier-newLayout-parameter

 `newLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkImageMemoryBarrier-image-parameter) VUID-VkImageMemoryBarrier-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkImageMemoryBarrier-subresourceRange-parameter) VUID-VkImageMemoryBarrier-subresourceRange-parameter

 `subresourceRange` **must** be a valid [VkImageSubresourceRange](VkImageSubresourceRange.html) structure

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAccessFlags](VkAccessFlags.html), [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html), [VkImageSubresourceRange](VkImageSubresourceRange.html), [VkStructureType](VkStructureType.html), [vkCmdPipelineBarrier](vkCmdPipelineBarrier.html), [vkCmdWaitEvents](vkCmdWaitEvents.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkImageMemoryBarrier).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
