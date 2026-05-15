# VkRenderingAttachmentInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderingAttachmentInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderingAttachmentInfo - Structure specifying attachment information

The `VkRenderingAttachmentInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkRenderingAttachmentInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkImageView              imageView;
    VkImageLayout            imageLayout;
    VkResolveModeFlagBits    resolveMode;
    VkImageView              resolveImageView;
    VkImageLayout            resolveImageLayout;
    VkAttachmentLoadOp       loadOp;
    VkAttachmentStoreOp      storeOp;
    VkClearValue             clearValue;
} VkRenderingAttachmentInfo;

// Provided by VK_KHR_dynamic_rendering
// Equivalent to VkRenderingAttachmentInfo
typedef VkRenderingAttachmentInfo VkRenderingAttachmentInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageView` is the image view that will be used for rendering.

* 
`imageLayout` is the layout that `imageView` will be in during
rendering.

* 
`resolveMode` is a [VkResolveModeFlagBits](VkResolveModeFlagBits.html) value defining how
data written to `imageView` will be resolved into
`resolveImageView`.

* 
`resolveImageView` is an image view used to write resolved data at
the end of rendering.

* 
`resolveImageLayout` is the layout that `resolveImageView` will
be in during rendering.

* 
`loadOp` is a [VkAttachmentLoadOp](VkAttachmentLoadOp.html) value defining the
[load operation](../../../../spec/latest/chapters/renderpass.html#renderpass-load-operations) for the attachment.

* 
`storeOp` is a [VkAttachmentStoreOp](VkAttachmentStoreOp.html) value defining the
[store operation](../../../../spec/latest/chapters/renderpass.html#renderpass-store-operations) for the attachment.

* 
`clearValue` is a [VkClearValue](VkClearValue.html) structure defining values used
to clear `imageView` when `loadOp` is
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html).

Values in `imageView` are loaded and stored according to the values of
`loadOp` and `storeOp`, within the render area
for each device
specified in [VkRenderingInfo](VkRenderingInfo.html).
If `imageView` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
and `resolveMode` is not
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html),
other members of this structure are ignored; writes to this attachment will
be discarded, and no [load](../../../../spec/latest/chapters/renderpass.html#renderpass-load-operations),
[store](../../../../spec/latest/chapters/renderpass.html#renderpass-store-operations), or [multisample resolve](../../../../spec/latest/chapters/renderpass.html#renderpass-resolve-operations) operations will be performed.

If `resolveMode` is [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), then
`resolveImageView` is ignored.
If `resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), and
`resolveImageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), a
[render pass multisample resolve operation](../../../../spec/latest/chapters/renderpass.html#renderpass-resolve-operations)
is defined for the attachment subresource.
If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html), and the
[`nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) limit is [VK_TRUE](VK_TRUE.html),
values are only **undefined** once [load operations](../../../../spec/latest/chapters/renderpass.html#renderpass-load-operations) have completed.

The contents of a resolve attachment within the render area become
**undefined** at the time [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html) is called if all of
the following conditions are true:

* 
[VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](VkRenderingFlagBits.html) is set.

* 
The attachment sets `resolveMode` to
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](VkResolveModeFlagBits.html).

This affects color, depth, and stencil attachments.
In addition, there is an implicit [store operation](../../../../spec/latest/chapters/renderpass.html#renderpass-store-operations) of [VK_ATTACHMENT_STORE_OP_STORE](VkAttachmentStoreOp.html) for these attachments.

|  | The resolve mode and store operation are independent; it is valid to write
| --- | --- |
both resolved and unresolved values, and equally valid to discard the
unresolved values while writing the resolved ones. |

Store and resolve operations are only performed at the end of a render pass
instance that does not specify the [VK_RENDERING_SUSPENDING_BIT_KHR](VkRenderingFlagBits.html)
flag.
If the [VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](VkRenderingFlagBits.html) is specified and an
attachment uses the [VK_RESOLVE_MODE_CUSTOM_BIT_EXT](VkResolveModeFlagBits.html) resolve mode, the
resolve attachment will only be written by draws recorded following a call
to [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html).

Load operations are only performed at the beginning of a render pass
instance that does not specify the [VK_RENDERING_RESUMING_BIT_KHR](VkRenderingFlagBits.html) flag.

Image contents at the end of a suspended render pass instance remain defined
for access by a resuming render pass instance.

If the [`nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) limit is [VK_TRUE](VK_TRUE.html),
and `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html), values in the
color attachment will be loaded from the resolve attachment at the start of
rendering, and **may** also be reloaded any time after a resolve occurs or the
resolve attachment is written to; if this occurs it **must** happen-before any
writes to the color attachment are performed which happen-after the resolve
that triggers this.
If any color component in the external format is subsampled, values will be
read from the nearest sample in the image when they are loaded.

Valid Usage

* 
[](#VUID-VkRenderingAttachmentInfo-imageView-06129) VUID-VkRenderingAttachmentInfo-imageView-06129

    If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and has a non-integer
    color format, `resolveMode` **must** be [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html) or
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](VkResolveModeFlagBits.html) or
    [VK_RESOLVE_MODE_AVERAGE_BIT](VkResolveModeFlagBits.html)

* 
[](#VUID-VkRenderingAttachmentInfo-imageView-06130) VUID-VkRenderingAttachmentInfo-imageView-06130

    If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and has an integer color
    format, `resolveMode` **must** be [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html) or
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](VkResolveModeFlagBits.html) or
    [VK_RESOLVE_MODE_SAMPLE_ZERO_BIT](VkResolveModeFlagBits.html)

* 
[](#VUID-VkRenderingAttachmentInfo-imageView-06861) VUID-VkRenderingAttachmentInfo-imageView-06861

If all of the following are true:

`imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
`resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

* 
the `pNext` chain of [VkRenderingInfo](VkRenderingInfo.html) does not include a
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html) structure with the
`multisampledRenderToSingleSampledEnable` field equal to
[VK_TRUE](VK_TRUE.html)

`imageView` **must** not have a sample count of [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06862) VUID-VkRenderingAttachmentInfo-imageView-06862

If all of the following are true:

* 
`imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
`resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

* 
the `pNext` chain of [VkRenderingInfo](VkRenderingInfo.html) does not include a
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html) structure with the
`multisampledRenderToSingleSampledEnable` field equal to
[VK_TRUE](VK_TRUE.html)

`resolveImageView` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06863) VUID-VkRenderingAttachmentInfo-imageView-06863

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `resolveMode` is not
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), the `pNext` chain of
[VkRenderingInfo](VkRenderingInfo.html) includes a
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html) structure with the
`multisampledRenderToSingleSampledEnable` field equal to
[VK_TRUE](VK_TRUE.html), and `imageView` has a sample count of
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html), `resolveImageView` **must** be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

[](#VUID-VkRenderingAttachmentInfo-None-12256) VUID-VkRenderingAttachmentInfo-None-12256

If all of the following are true:

* 
`imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
`imageView` has a sample count of [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
the `pNext` chain of [VkRenderingInfo](VkRenderingInfo.html) includes a
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html) structure with the
`multisampledRenderToSingleSampledEnable` field equal to
[VK_TRUE](VK_TRUE.html)

then `resolveMode` **must** not be [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06864) VUID-VkRenderingAttachmentInfo-imageView-06864

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `resolveImageView`
is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and `resolveMode` is not
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), `resolveImageView` **must** have a sample
count of [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06865) VUID-VkRenderingAttachmentInfo-imageView-06865

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `resolveImageView`
is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and `resolveMode` is
neither [VK_RESOLVE_MODE_CUSTOM_BIT_EXT](VkResolveModeFlagBits.html) nor
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), `imageView` and `resolveImageView`
**must** have the same [VkFormat](VkFormat.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06135) VUID-VkRenderingAttachmentInfo-imageView-06135

    If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageLayout` **must**
    not be [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html),
    [VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html),
    [VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html),
    [VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html), or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](VkImageLayout.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06136) VUID-VkRenderingAttachmentInfo-imageView-06136

    If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and `resolveMode` is
    not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), `resolveImageLayout` **must** not be
    [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html),
    [VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
    [VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html),
    [VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html),
    [VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html), or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](VkImageLayout.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06137) VUID-VkRenderingAttachmentInfo-imageView-06137

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and `resolveMode` is
not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), `resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06138) VUID-VkRenderingAttachmentInfo-imageView-06138

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageLayout` **must**
not be [VK_IMAGE_LAYOUT_SHADING_RATE_OPTIMAL_NV](VkImageLayout.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06139) VUID-VkRenderingAttachmentInfo-imageView-06139

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and `resolveMode` is
not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), `resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_SHADING_RATE_OPTIMAL_NV](VkImageLayout.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06140) VUID-VkRenderingAttachmentInfo-imageView-06140

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageLayout` **must**
not be [VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT](VkImageLayout.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06141) VUID-VkRenderingAttachmentInfo-imageView-06141

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and `resolveMode` is
not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), `resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT](VkImageLayout.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06142) VUID-VkRenderingAttachmentInfo-imageView-06142

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and `resolveMode` is
not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), `resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06143) VUID-VkRenderingAttachmentInfo-imageView-06143

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageLayout` **must**
not be
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06144) VUID-VkRenderingAttachmentInfo-imageView-06144

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and `resolveMode` is
not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), `resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-10780) VUID-VkRenderingAttachmentInfo-imageView-10780

If [feedback loop is enabled](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) for the
attachment identified by `imageView`, then `imageView` **must**
have been created with a `usage` value including
[VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkImageUsageFlagBits.html), either
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html), and either
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06145) VUID-VkRenderingAttachmentInfo-imageView-06145

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageLayout` **must**
not be [VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](VkImageLayout.html)

[](#VUID-VkRenderingAttachmentInfo-imageView-06146) VUID-VkRenderingAttachmentInfo-imageView-06146

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and `resolveMode` is
not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), `resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](VkImageLayout.html)

[](#VUID-VkRenderingAttachmentInfo-externalFormatResolve-09323) VUID-VkRenderingAttachmentInfo-externalFormatResolve-09323

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is not enabled, `resolveMode` **must** not be
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html)

[](#VUID-VkRenderingAttachmentInfo-resolveMode-09324) VUID-VkRenderingAttachmentInfo-resolveMode-09324

If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html),
`resolveImageView` **must** be a valid image view

[](#VUID-VkRenderingAttachmentInfo-nullColorAttachmentWithExternalFormatResolve-09325) VUID-VkRenderingAttachmentInfo-nullColorAttachmentWithExternalFormatResolve-09325

If the [    `nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) property is
[VK_TRUE](VK_TRUE.html) and `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html),
`resolveImageView` **must** have been created with an image with a
`samples` value of [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

[](#VUID-VkRenderingAttachmentInfo-resolveMode-09326) VUID-VkRenderingAttachmentInfo-resolveMode-09326

If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html),
`resolveImageView` **must** have been created with an external format
specified by [VkExternalFormatANDROID](VkExternalFormatANDROID.html)

[](#VUID-VkRenderingAttachmentInfo-resolveMode-09327) VUID-VkRenderingAttachmentInfo-resolveMode-09327

If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html),
`resolveImageView` **must** have been created with a
`subresourceRange.layerCount` of `1`

[](#VUID-VkRenderingAttachmentInfo-resolveMode-09328) VUID-VkRenderingAttachmentInfo-resolveMode-09328

If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html) and
[    `nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) is [VK_TRUE](VK_TRUE.html),
`imageView` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

[](#VUID-VkRenderingAttachmentInfo-resolveMode-09329) VUID-VkRenderingAttachmentInfo-resolveMode-09329

If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html) and
[    `nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) is [VK_FALSE](VK_FALSE.html),
`imageView` **must** be a valid [VkImageView](VkImageView.html)

[](#VUID-VkRenderingAttachmentInfo-resolveMode-09330) VUID-VkRenderingAttachmentInfo-resolveMode-09330

If `resolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html) and
[    `nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) is [VK_FALSE](VK_FALSE.html),
`imageView` **must** have a format equal to the value of
[VkAndroidHardwareBufferFormatResolvePropertiesANDROID](VkAndroidHardwareBufferFormatResolvePropertiesANDROID.html)::`colorAttachmentFormat`
as returned by a call to
[vkGetAndroidHardwareBufferPropertiesANDROID](vkGetAndroidHardwareBufferPropertiesANDROID.html) for the Android
hardware buffer that was used to create `resolveImageView`

[](#VUID-VkRenderingAttachmentInfo-resolveImageView-10728) VUID-VkRenderingAttachmentInfo-resolveImageView-10728

If `resolveImageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the underlying
resource must not be bound to a `VkDeviceMemory` object allocated
from a `VkMemoryHeap` with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property

[](#VUID-VkRenderingAttachmentInfo-pNext-11752) VUID-VkRenderingAttachmentInfo-pNext-11752

If the `pNext` chain includes a
[VkRenderingAttachmentFlagsInfoKHR](VkRenderingAttachmentFlagsInfoKHR.html) structure, and `flags`
includes
[VK_RENDERING_ATTACHMENT_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html) or
[VK_RENDERING_ATTACHMENT_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html),
`imageView` **must** have a format using sRGB encoding

[](#VUID-VkRenderingAttachmentInfo-pNext-11753) VUID-VkRenderingAttachmentInfo-pNext-11753

If the `pNext` chain includes a
[VkRenderingAttachmentFlagsInfoKHR](VkRenderingAttachmentFlagsInfoKHR.html) structure, and `flags`
includes
[VK_RENDERING_ATTACHMENT_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html) or
[VK_RENDERING_ATTACHMENT_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html),
`resolveMode` **must** be equal to [VK_RESOLVE_MODE_AVERAGE_BIT](VkResolveModeFlagBits.html)

[](#VUID-VkRenderingAttachmentInfo-pNext-11754) VUID-VkRenderingAttachmentInfo-pNext-11754

If the `pNext` chain includes a
[VkRenderingAttachmentFlagsInfoKHR](VkRenderingAttachmentFlagsInfoKHR.html) structure, and `flags`
includes
[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html),
`imageView` **must** have an image that was created with the
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingAttachmentInfo-sType-sType) VUID-VkRenderingAttachmentInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO](VkStructureType.html)

* 
[](#VUID-VkRenderingAttachmentInfo-pNext-pNext) VUID-VkRenderingAttachmentInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAttachmentFeedbackLoopInfoEXT](VkAttachmentFeedbackLoopInfoEXT.html) or [VkRenderingAttachmentFlagsInfoKHR](VkRenderingAttachmentFlagsInfoKHR.html)

* 
[](#VUID-VkRenderingAttachmentInfo-sType-unique) VUID-VkRenderingAttachmentInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRenderingAttachmentInfo-imageView-parameter) VUID-VkRenderingAttachmentInfo-imageView-parameter

 If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageView` **must** be a valid [VkImageView](VkImageView.html) handle

* 
[](#VUID-VkRenderingAttachmentInfo-imageLayout-parameter) VUID-VkRenderingAttachmentInfo-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkRenderingAttachmentInfo-resolveMode-parameter) VUID-VkRenderingAttachmentInfo-resolveMode-parameter

 If `resolveMode` is not `0`, `resolveMode` **must** be a valid [VkResolveModeFlagBits](VkResolveModeFlagBits.html) value

* 
[](#VUID-VkRenderingAttachmentInfo-resolveImageView-parameter) VUID-VkRenderingAttachmentInfo-resolveImageView-parameter

 If `resolveImageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `resolveImageView` **must** be a valid [VkImageView](VkImageView.html) handle

* 
[](#VUID-VkRenderingAttachmentInfo-resolveImageLayout-parameter) VUID-VkRenderingAttachmentInfo-resolveImageLayout-parameter

 `resolveImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkRenderingAttachmentInfo-loadOp-parameter) VUID-VkRenderingAttachmentInfo-loadOp-parameter

 `loadOp` **must** be a valid [VkAttachmentLoadOp](VkAttachmentLoadOp.html) value

* 
[](#VUID-VkRenderingAttachmentInfo-storeOp-parameter) VUID-VkRenderingAttachmentInfo-storeOp-parameter

 `storeOp` **must** be a valid [VkAttachmentStoreOp](VkAttachmentStoreOp.html) value

* 
[](#VUID-VkRenderingAttachmentInfo-clearValue-parameter) VUID-VkRenderingAttachmentInfo-clearValue-parameter

 `clearValue` **must** be a valid [VkClearValue](VkClearValue.html) union

* 
[](#VUID-VkRenderingAttachmentInfo-commonparent) VUID-VkRenderingAttachmentInfo-commonparent

 Both of `imageView`, and `resolveImageView` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkAttachmentLoadOp](VkAttachmentLoadOp.html), [VkAttachmentStoreOp](VkAttachmentStoreOp.html), [VkClearValue](VkClearValue.html), [VkImageLayout](VkImageLayout.html), [VkImageView](VkImageView.html), [VkRenderingInfo](VkRenderingInfo.html), [VkResolveModeFlagBits](VkResolveModeFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderingAttachmentInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
