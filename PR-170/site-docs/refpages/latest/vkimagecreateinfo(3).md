# VkImageCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageCreateInfo - Structure specifying the parameters of a newly created image object

The `VkImageCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageCreateInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkImageCreateFlags       flags;
    VkImageType              imageType;
    VkFormat                 format;
    VkExtent3D               extent;
    uint32_t                 mipLevels;
    uint32_t                 arrayLayers;
    VkSampleCountFlagBits    samples;
    VkImageTiling            tiling;
    VkImageUsageFlags        usage;
    VkSharingMode            sharingMode;
    uint32_t                 queueFamilyIndexCount;
    const uint32_t*          pQueueFamilyIndices;
    VkImageLayout            initialLayout;
} VkImageCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkImageCreateFlagBits](VkImageCreateFlagBits.html) describing
additional parameters of the image.

* 
`imageType` is a [VkImageType](VkImageType.html) value specifying the basic
dimensionality of the image.
Layers in array textures do not count as a dimension for the purposes of
the image type.

* 
`format` is a [VkFormat](VkFormat.html) describing the format and type of the
texel blocks that will be contained in the image.

* 
`extent` is a [VkExtent3D](VkExtent3D.html) describing the number of
texels/pixels in each dimension of the base level.

* 
`mipLevels` describes the number of levels of detail available for
minified sampling of the image.

* 
`arrayLayers` is the number of layers in the image.

* 
`samples` is a [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value specifying the
number of [samples per texel](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling).

* 
`tiling` is a [VkImageTiling](VkImageTiling.html) value specifying the tiling
arrangement of the texel blocks in memory.

* 
`usage` is a bitmask of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) describing the
intended usage of the image.

* 
`sharingMode` is a [VkSharingMode](VkSharingMode.html) value specifying the sharing
mode of the image when it will be accessed by multiple queue families.

* 
`queueFamilyIndexCount` is the number of entries in the
`pQueueFamilyIndices` array.

* 
`pQueueFamilyIndices` is a pointer to an array of queue families
that will access this image.
It is ignored if `sharingMode` is not
[VK_SHARING_MODE_CONCURRENT](VkSharingMode.html).

* 
`initialLayout` is a [VkImageLayout](VkImageLayout.html) value specifying the
initial [VkImageLayout](VkImageLayout.html) of all image subresources of the image.
See [Image Layouts](../../../../spec/latest/chapters/resources.html#resources-image-layouts).

Images created with `tiling` equal to [VK_IMAGE_TILING_LINEAR](VkImageTiling.html) have
further restrictions on their limits and capabilities compared to images
created with `tiling` equal to [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html).
Creation of images with tiling [VK_IMAGE_TILING_LINEAR](VkImageTiling.html) **may** not be
supported unless other parameters meet all of the constraints:

* 
`imageType` is [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
`format` is not a depth/stencil format

* 
`mipLevels` is 1

* 
`arrayLayers` is 1

* 
`samples` is [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
`usage` only includes [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html) and/or
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html)

Images created with one of the [formats that require a sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion), have further
restrictions on their limits and capabilities compared to images created
with other formats.
Creation of images with a format requiring
[Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion) **may** not
be supported unless other parameters meet all of the constraints:

* 
`imageType` is [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
`mipLevels` is 1

* 
`arrayLayers` is 1, unless
the [`ycbcrImageArrays`](../../../../spec/latest/chapters/features.html#features-ycbcrImageArrays) feature is
enabled, or
otherwise indicated by
[VkImageFormatProperties](VkImageFormatProperties.html)::`maxArrayLayers`, as returned by
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html)

* 
`samples` is [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

Images created with the [VK_IMAGE_USAGE_TILE_MEMORY_BIT_QCOM](VkImageUsageFlagBits.html) usage flag
set have further restrictions on their limits and capabilities compared to
images created without this flag.
Creation of images with usage including
[VK_IMAGE_USAGE_TILE_MEMORY_BIT_QCOM](VkImageUsageFlagBits.html) **may** not be supported unless
parameters meet all of the constraints:

* 
`flags` is 0 or only includes [VK_IMAGE_CREATE_ALIAS_BIT](VkImageCreateFlagBits.html)

* 
`imageType` is [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
`mipLevels` is 1

* 
`arrayLayers` is 1

* 
`samples` is [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
`tiling` is [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html)

* 
`usage` includes [VK_IMAGE_USAGE_TILE_MEMORY_BIT_QCOM](VkImageUsageFlagBits.html) and any
valid combination of the following [VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html)

Implementations **may** support additional limits and capabilities beyond those
listed above.

To determine the set of valid `usage` bits for a given format, call
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html).

If the size of the resultant image would exceed `maxResourceSize`, then
[vkCreateImage](vkCreateImage.html) **must** fail and return
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html).
This failure **may** occur even when all image creation parameters satisfy
their valid usage requirements.

If the implementation reports [VK_TRUE](VK_TRUE.html) in
[VkPhysicalDeviceHostImageCopyProperties](VkPhysicalDeviceHostImageCopyProperties.html)::`identicalMemoryTypeRequirements`,
usage of [VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) **must** not affect the memory
type requirements of the image as described in
[Sparse Resource Memory Requirements](../../../../spec/latest/chapters/sparsemem.html#sparsememory-memory-requirements) and
[Resource Memory Association](../../../../spec/latest/chapters/resources.html#resources-association).

|  | For images created without the [VK_IMAGE_CREATE_EXTENDED_USAGE_BIT](VkImageCreateFlagBits.html) flag
| --- | --- |
set, a `usage` bit is valid if it is supported for the format the image
is created with.

For images created with [VK_IMAGE_CREATE_EXTENDED_USAGE_BIT](VkImageCreateFlagBits.html) a
`usage` bit is valid if it is supported for at least one of the formats
a `VkImageView` created from the image **can** have (see
[Image Views](../../../../spec/latest/chapters/resources.html#resources-image-views) for more detail). |

Image Creation Limits

Valid values for some image creation parameters are limited by a numerical
upper bound or by inclusion in a bitset.
For example, [VkImageCreateInfo](#)::`arrayLayers` is limited by
`imageCreateMaxArrayLayers`, defined below; and
[VkImageCreateInfo](#)::`samples` is limited by
`imageCreateSampleCounts`, also defined below.

Several limiting values are defined below, as well as assisting values from
which the limiting values are derived.
The limiting values are referenced by the relevant valid usage statements of
[VkImageCreateInfo](#).

* 
Let `uint64_t imageCreateDrmFormatModifiers[]` be the set of
[Linux DRM format modifiers](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier) that the
resultant image **may** have.

If `tiling` is not [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html),
then `imageCreateDrmFormatModifiers` is empty.

* 
If [VkImageCreateInfo](#)::`pNext` contains
[VkImageDrmFormatModifierExplicitCreateInfoEXT](VkImageDrmFormatModifierExplicitCreateInfoEXT.html), then
`imageCreateDrmFormatModifiers` contains exactly one modifier,
[VkImageDrmFormatModifierExplicitCreateInfoEXT](VkImageDrmFormatModifierExplicitCreateInfoEXT.html)::`drmFormatModifier`.

* 
If [VkImageCreateInfo](#)::`pNext` contains
[VkImageDrmFormatModifierListCreateInfoEXT](VkImageDrmFormatModifierListCreateInfoEXT.html), then
`imageCreateDrmFormatModifiers` contains the entire array
[VkImageDrmFormatModifierListCreateInfoEXT](VkImageDrmFormatModifierListCreateInfoEXT.html)::`pDrmFormatModifiers`.

Let `VkBool32 imageCreateMaybeLinear` indicate if the resultant image
may be [linear](../../../../spec/latest/appendices/glossary.html#glossary-linear-resource).

* 
If `tiling` is [VK_IMAGE_TILING_LINEAR](VkImageTiling.html), then
`imageCreateMaybeLinear` is [VK_TRUE](VK_TRUE.html).

* 
If `tiling` is [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), then
`imageCreateMaybeLinear` is [VK_FALSE](VK_FALSE.html).

* 
If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), then
`imageCreateMaybeLinear` is [VK_TRUE](VK_TRUE.html) if and only if
`imageCreateDrmFormatModifiers` contains
`DRM_FORMAT_MOD_LINEAR`.

Let `VkFormatFeatureFlags imageCreateFormatFeatures` be the set of valid
*format features* available during image creation.

* 
If `tiling` is [VK_IMAGE_TILING_LINEAR](VkImageTiling.html), then
`imageCreateFormatFeatures` is the value of
[VkFormatProperties](VkFormatProperties.html)::`linearTilingFeatures` found by calling
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html) with parameter `format`
equal to [VkImageCreateInfo](#)::`format`.

* 
If `tiling` is [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html),
and if the `pNext` chain includes no
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)
or
[VkExternalFormatQNX](VkExternalFormatQNX.html)
structure with non-zero `externalFormat`,
then `imageCreateFormatFeatures` is the value of
[VkFormatProperties](VkFormatProperties.html)::`optimalTilingFeatures` found by calling
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html) with parameter `format`
equal to [VkImageCreateInfo](#)::`format`.

* 
If `tiling` is [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), and if the
`pNext` chain includes a [VkExternalFormatANDROID](VkExternalFormatANDROID.html) structure
with non-zero `externalFormat`, then
`imageCreateFormatFeatures` is the value of
[VkAndroidHardwareBufferFormatPropertiesANDROID](VkAndroidHardwareBufferFormatPropertiesANDROID.html)::`formatFeatures`
obtained by [vkGetAndroidHardwareBufferPropertiesANDROID](vkGetAndroidHardwareBufferPropertiesANDROID.html) with a
matching `externalFormat` value.

* 
If `tiling` is [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), and if the
`pNext` chain includes a [VkExternalFormatQNX](VkExternalFormatQNX.html) structure with
non-zero `externalFormat`, then `imageCreateFormatFeatures` is
the value of
[VkScreenBufferFormatPropertiesQNX](VkScreenBufferFormatPropertiesQNX.html)::`formatFeatures` obtained
by [vkGetScreenBufferPropertiesQNX](vkGetScreenBufferPropertiesQNX.html) with a matching
`externalFormat` value.

* 
If the `pNext` chain includes a
[VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html) structure, then
`imageCreateFormatFeatures` is the value of
[VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html)::`formatFeatures` found
by calling [vkGetBufferCollectionPropertiesFUCHSIA](vkGetBufferCollectionPropertiesFUCHSIA.html) with a
parameter `collection` equal to
[VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html)::`collection`

* 
If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), then
the value of `imageCreateFormatFeatures` is found by calling
[vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html) with
[VkImageFormatProperties](VkImageFormatProperties.html)::`format` equal to
[VkImageCreateInfo](#)::`format` and with
[VkDrmFormatModifierPropertiesListEXT](VkDrmFormatModifierPropertiesListEXT.html) chained into
[VkFormatProperties2](VkFormatProperties2.html); by collecting all members of the returned
array
[VkDrmFormatModifierPropertiesListEXT](VkDrmFormatModifierPropertiesListEXT.html)::`pDrmFormatModifierProperties`
whose `drmFormatModifier` belongs to
`imageCreateDrmFormatModifiers`; and by taking the bitwise
intersection, over the collected array members, of
`drmFormatModifierTilingFeatures`.
(The resultant `imageCreateFormatFeatures` **may** be empty).

Let `VkImageFormatProperties2 imageCreateImageFormatPropertiesList[]` be
defined as follows.

* 
If [VkImageCreateInfo](#)::`pNext` contains no
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)
or
[VkExternalFormatQNX](VkExternalFormatQNX.html)
structure with non-zero `externalFormat`, then
`imageCreateImageFormatPropertiesList` is
the list of structures obtained by calling
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html), possibly multiple
times, as follows:

The parameters [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`format`,
`imageType`, `tiling`, `usage`, and `flags` **must** be
equal to those in [VkImageCreateInfo](#).

* 
If [VkImageCreateInfo](#)::`pNext` contains a
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html) structure whose
`handleTypes` is not `0`, then
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`pNext` **must** contain a
[VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html) structure whose
`handleType` is not `0`; and
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) **must** be called for
each handle type in
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes`, successively
setting
[VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html)::`handleType` on
each call.

* 
If [VkImageCreateInfo](#)::`pNext` contains no
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html) structure, or contains a
structure whose `handleTypes` is `0`, then
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`pNext` **must** either
contain no [VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html) structure, or
contain a structure whose `handleType` is `0`.

* 
If [VkImageCreateInfo](#)::`pNext` contains a
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure then
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`pNext` **must** also contain
the same [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure on each call.

* 
If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html),
then:

[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`pNext` **must** contain a
[VkPhysicalDeviceImageDrmFormatModifierInfoEXT](VkPhysicalDeviceImageDrmFormatModifierInfoEXT.html) structure where
`sharingMode` is equal to
[VkImageCreateInfo](#)::`sharingMode`;

* 
if `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), then
`queueFamilyIndexCount` and `pQueueFamilyIndices` **must** be
equal to those in [VkImageCreateInfo](#);

* 
if `flags` contains [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html),
then the [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html) structure included in the
`pNext` chain of [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) **must** be
equivalent to the one included in the `pNext` chain of
[VkImageCreateInfo](#);

* 
if [VkImageCreateInfo](#)::`pNext` contains a
[VkImageCompressionControlEXT](VkImageCompressionControlEXT.html) structure, then the
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`pNext` chain **must**
contain an equivalent structure;

* 
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) **must** be called for
each modifier in `imageCreateDrmFormatModifiers`, successively
setting
[VkPhysicalDeviceImageDrmFormatModifierInfoEXT](VkPhysicalDeviceImageDrmFormatModifierInfoEXT.html)::`drmFormatModifier`
on each call.

If `tiling` is not [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html),
then [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`pNext` **must** contain
no [VkPhysicalDeviceImageDrmFormatModifierInfoEXT](VkPhysicalDeviceImageDrmFormatModifierInfoEXT.html) structure.

If any call to [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) returns
an error, then `imageCreateImageFormatPropertiesList` is defined
to be the empty list.

If [VkImageCreateInfo](#)::`pNext` contains a
[VkExternalFormatANDROID](VkExternalFormatANDROID.html) structure with non-zero
`externalFormat`, then `imageCreateImageFormatPropertiesList`
contains a single element where:

* 
`VkImageFormatProperties`::`maxMipLevels` is
⌊log2(max(`extent.width`, `extent.height`,
`extent.depth`))⌋ +  1.

* 
`VkImageFormatProperties`::`maxArrayLayers` is
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxImageArrayLayers`.

* 
Each component of `VkImageFormatProperties`::`maxExtent` is
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxImageDimension2D`.

* 
`VkImageFormatProperties`::`sampleCounts` contains exactly
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html).

Let `uint32_t imageCreateMaxMipLevels` be
the minimum value of [VkImageFormatProperties](VkImageFormatProperties.html)::`maxMipLevels`
in `imageCreateImageFormatPropertiesList`.
The value is **undefined** if `imageCreateImageFormatPropertiesList` is
empty.

Let `uint32_t imageCreateMaxArrayLayers` be
the minimum value of [VkImageFormatProperties](VkImageFormatProperties.html)::`maxArrayLayers`
in `imageCreateImageFormatPropertiesList`.
The value is **undefined** if `imageCreateImageFormatPropertiesList` is
empty.

Let `VkExtent3D imageCreateMaxExtent` be
the component-wise minimum over all
[VkImageFormatProperties](VkImageFormatProperties.html)::`maxExtent` values in
`imageCreateImageFormatPropertiesList`.
The value is **undefined** if `imageCreateImageFormatPropertiesList` is
empty.

Let `VkSampleCountFlags imageCreateSampleCounts` be
the intersection of each
[VkImageFormatProperties](VkImageFormatProperties.html)::`sampleCounts` in
`imageCreateImageFormatPropertiesList`.
The value is **undefined** if `imageCreateImageFormatPropertiesList` is
empty.

Let `VkVideoFormatPropertiesKHR videoFormatProperties[]` be defined as
follows.

* 
If [VkImageCreateInfo](#)::`pNext` contains a
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure, then `videoFormatProperties`
is the list of structures obtained by calling
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html) with
[VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html)::`imageUsage` equal to the
`usage` member of [VkImageCreateInfo](#) and
[VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html)::`pNext` containing the
same [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure chained to
[VkImageCreateInfo](#).

* 
If [VkImageCreateInfo](#)::`pNext` contains no
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure, then `videoFormatProperties`
is an empty list.

Let `VkBool32 supportedVideoFormat` indicate if the image parameters are
supported by the specified video profiles.

* 
`supportedVideoFormat` is [VK_TRUE](VK_TRUE.html) if there exists an element in
the `videoFormatProperties` list for which all of the following
conditions are true:

[VkImageCreateInfo](#)::`format` equals
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`format`.

* 
[VkImageCreateInfo](#)::`flags` only contains
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkImageCreateFlagBits.html) and/or
bits also set in
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`imageCreateFlags`.

* 
[VkImageCreateInfo](#)::`imageType` equals
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`imageType`.

* 
[VkImageCreateInfo](#)::`tiling` equals
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`imageTiling`.

* 
[VkImageCreateInfo](#)::`usage` only contains bits also set in
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)::`imageUsageFlags`, or
[VkImageCreateInfo](#)::`flags` includes
[VK_IMAGE_CREATE_EXTENDED_USAGE_BIT](VkImageCreateFlagBits.html).

Otherwise `supportedVideoFormat` is [VK_FALSE](VK_FALSE.html).

Valid Usage

* 
[](#VUID-VkImageCreateInfo-imageCreateMaxMipLevels-02251) VUID-VkImageCreateInfo-imageCreateMaxMipLevels-02251

Each of the following values (as described in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits)) **must** not be
**undefined** : `imageCreateMaxMipLevels`,
`imageCreateMaxArrayLayers`, `imageCreateMaxExtent`, and
`imageCreateSampleCounts`

* 
[](#VUID-VkImageCreateInfo-sharingMode-00941) VUID-VkImageCreateInfo-sharingMode-00941

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html),
`pQueueFamilyIndices` **must** be a valid pointer to an array of
`queueFamilyIndexCount` `uint32_t` values

* 
[](#VUID-VkImageCreateInfo-sharingMode-00942) VUID-VkImageCreateInfo-sharingMode-00942

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html),
`queueFamilyIndexCount` **must** be greater than `1`

* 
[](#VUID-VkImageCreateInfo-sharingMode-01420) VUID-VkImageCreateInfo-sharingMode-01420

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), each element
of `pQueueFamilyIndices` **must** be unique and **must** be less than
`pQueueFamilyPropertyCount` returned by either
[vkGetPhysicalDeviceQueueFamilyProperties](vkGetPhysicalDeviceQueueFamilyProperties.html) or
[vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html) for the
`physicalDevice` that was used to create `device`

* 
[](#VUID-VkImageCreateInfo-pNext-01974) VUID-VkImageCreateInfo-pNext-01974

If the `pNext` chain includes a [VkExternalFormatANDROID](VkExternalFormatANDROID.html)
structure, and its `externalFormat` member is non-zero the
`format` **must** be [VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-VkImageCreateInfo-pNext-01975) VUID-VkImageCreateInfo-pNext-01975

If the `pNext` chain does not include a
[VkExternalFormatANDROID](VkExternalFormatANDROID.html) structure, or does and its
`externalFormat` member is `0`, the `format` **must** not be
[VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-VkImageCreateInfo-extent-00944) VUID-VkImageCreateInfo-extent-00944

`extent.width` **must** be greater than `0`

* 
[](#VUID-VkImageCreateInfo-extent-00945) VUID-VkImageCreateInfo-extent-00945

`extent.height` **must** be greater than `0`

* 
[](#VUID-VkImageCreateInfo-extent-00946) VUID-VkImageCreateInfo-extent-00946

`extent.depth` **must** be greater than `0`

* 
[](#VUID-VkImageCreateInfo-mipLevels-00947) VUID-VkImageCreateInfo-mipLevels-00947

`mipLevels` **must** be greater than `0`

* 
[](#VUID-VkImageCreateInfo-arrayLayers-00948) VUID-VkImageCreateInfo-arrayLayers-00948

`arrayLayers` **must** be greater than `0`

* 
[](#VUID-VkImageCreateInfo-flags-00949) VUID-VkImageCreateInfo-flags-00949

If `flags` contains [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](VkImageCreateFlagBits.html),
`imageType` **must** be [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-VkImageCreateInfo-flags-08865) VUID-VkImageCreateInfo-flags-08865

If `flags` contains [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](VkImageCreateFlagBits.html),
`extent.width` and `extent.height` **must** be equal

* 
[](#VUID-VkImageCreateInfo-flags-08866) VUID-VkImageCreateInfo-flags-08866

If `flags` contains [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](VkImageCreateFlagBits.html),
`arrayLayers` **must** be greater than or equal to 6

* 
[](#VUID-VkImageCreateInfo-initialLayout-10765) VUID-VkImageCreateInfo-initialLayout-10765

If the [    zeroInitializeDeviceMemory](../../../../spec/latest/chapters/features.html#features-zeroInitializeDeviceMemory) feature is not enabled, `initialLayout`
**must** not be [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html)

* 
[](#VUID-VkImageCreateInfo-flags-02557) VUID-VkImageCreateInfo-flags-02557

If `flags` contains
[VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](VkImageUsageFlagBits.html), `imageType` **must**
be [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-VkImageCreateInfo-flags-00950) VUID-VkImageCreateInfo-flags-00950

If `flags` contains [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html),
`imageType` **must** be [VK_IMAGE_TYPE_3D](VkImageType.html)

* 
[](#VUID-VkImageCreateInfo-flags-09403) VUID-VkImageCreateInfo-flags-09403

If `flags` contains [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html),
`flags` **must** not include [VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](VkImageCreateFlagBits.html),
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html), or
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-flags-07755) VUID-VkImageCreateInfo-flags-07755

If `flags` contains
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](VkImageCreateFlagBits.html), `imageType` **must**
be [VK_IMAGE_TYPE_3D](VkImageType.html)

* 
[](#VUID-VkImageCreateInfo-imageType-10197) VUID-VkImageCreateInfo-imageType-10197

    If `flags` contains [VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](VkImageCreateFlagBits.html)
and either the [`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is not
enabled on the device or
[`image2DViewOf3DSparse`](../../../../spec/latest/chapters/limits.html#limits-image2DViewOf3DSparse) is
[VK_FALSE](VK_FALSE.html)
    , `flags` **must** not include
    [VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](VkImageCreateFlagBits.html),
    [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html), or
    [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-extent-02252) VUID-VkImageCreateInfo-extent-02252

`extent.width` **must** be less than or equal to
`imageCreateMaxExtent.width` (as defined in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits))

* 
[](#VUID-VkImageCreateInfo-extent-02253) VUID-VkImageCreateInfo-extent-02253

`extent.height` **must** be less than or equal to
`imageCreateMaxExtent.height` (as defined in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits))

* 
[](#VUID-VkImageCreateInfo-extent-02254) VUID-VkImageCreateInfo-extent-02254

`extent.depth` **must** be less than or equal to
`imageCreateMaxExtent.depth` (as defined in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits))

* 
[](#VUID-VkImageCreateInfo-imageType-00956) VUID-VkImageCreateInfo-imageType-00956

If `imageType` is [VK_IMAGE_TYPE_1D](VkImageType.html), both `extent.height`
and `extent.depth` **must** be `1`

* 
[](#VUID-VkImageCreateInfo-imageType-00957) VUID-VkImageCreateInfo-imageType-00957

If `imageType` is [VK_IMAGE_TYPE_2D](VkImageType.html), `extent.depth` **must**
be `1`

* 
[](#VUID-VkImageCreateInfo-mipLevels-00958) VUID-VkImageCreateInfo-mipLevels-00958

`mipLevels` **must** be less than or equal to the number of levels in
the complete mipmap chain based on `extent.width`,
`extent.height`, and `extent.depth`

* 
[](#VUID-VkImageCreateInfo-mipLevels-02255) VUID-VkImageCreateInfo-mipLevels-02255

`mipLevels` **must** be less than or equal to
`imageCreateMaxMipLevels` (as defined in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits))

* 
[](#VUID-VkImageCreateInfo-arrayLayers-02256) VUID-VkImageCreateInfo-arrayLayers-02256

`arrayLayers` **must** be less than or equal to
`imageCreateMaxArrayLayers` (as defined in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits))

* 
[](#VUID-VkImageCreateInfo-imageType-00961) VUID-VkImageCreateInfo-imageType-00961

If `imageType` is [VK_IMAGE_TYPE_3D](VkImageType.html), `arrayLayers` **must** be
`1`

* 
[](#VUID-VkImageCreateInfo-samples-02257) VUID-VkImageCreateInfo-samples-02257

If `samples` is not [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html), then
`imageType` **must** be [VK_IMAGE_TYPE_2D](VkImageType.html), `flags` **must** not
contain [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](VkImageCreateFlagBits.html), `mipLevels` **must**
be equal to `1`, and `imageCreateMaybeLinear` (as defined in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits)) **must** be
[VK_FALSE](VK_FALSE.html),

* 
[](#VUID-VkImageCreateInfo-samples-02558) VUID-VkImageCreateInfo-samples-02558

If `samples` is not [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html), `usage` **must**
not contain [VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-usage-00963) VUID-VkImageCreateInfo-usage-00963

If `usage` includes [VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
then bits other than [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html), and
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) **must** not be set

* 
[](#VUID-VkImageCreateInfo-usage-00964) VUID-VkImageCreateInfo-usage-00964

If `usage` includes [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html), `extent.width` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxFramebufferWidth`

* 
[](#VUID-VkImageCreateInfo-usage-00965) VUID-VkImageCreateInfo-usage-00965

If `usage` includes [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html), `extent.height` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxFramebufferHeight`

* 
[](#VUID-VkImageCreateInfo-fragmentDensityMapOffset-06514) VUID-VkImageCreateInfo-fragmentDensityMapOffset-06514

If the [    `fragmentDensityMapOffset`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMapOffset) feature is not enabled and `usage`
includes [VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](VkImageUsageFlagBits.html),
`extent.width` **must** be less than or equal to
  

* 
[](#VUID-VkImageCreateInfo-fragmentDensityMapOffset-06515) VUID-VkImageCreateInfo-fragmentDensityMapOffset-06515

If the [    `fragmentDensityMapOffset`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMapOffset) feature is not enabled and `usage`
includes [VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](VkImageUsageFlagBits.html),
`extent.height` **must** be less than or equal to
  

* 
[](#VUID-VkImageCreateInfo-usage-00966) VUID-VkImageCreateInfo-usage-00966

If `usage` includes [VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
`usage` **must** also contain at least one of
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-samples-02258) VUID-VkImageCreateInfo-samples-02258

`samples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value that is
set in `imageCreateSampleCounts` (as defined in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits))

* 
[](#VUID-VkImageCreateInfo-usage-00968) VUID-VkImageCreateInfo-usage-00968

If the [    `shaderStorageImageMultisample`](../../../../spec/latest/chapters/features.html#features-shaderStorageImageMultisample) feature is not enabled, and
`usage` contains [VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html), `samples`
**must** be [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-flags-00969) VUID-VkImageCreateInfo-flags-00969

If the [`sparseBinding`](../../../../spec/latest/chapters/features.html#features-sparseBinding) feature is not
enabled, `flags` **must** not contain
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-flags-01924) VUID-VkImageCreateInfo-flags-01924

If the [`sparseResidencyAliased`](../../../../spec/latest/chapters/features.html#features-sparseResidencyAliased)
feature is not enabled, `flags` **must** not contain
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-tiling-04121) VUID-VkImageCreateInfo-tiling-04121

If `tiling` is [VK_IMAGE_TILING_LINEAR](VkImageTiling.html), `flags` **must** not
contain [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-imageType-00970) VUID-VkImageCreateInfo-imageType-00970

If `imageType` is [VK_IMAGE_TYPE_1D](VkImageType.html), `flags` **must** not
contain [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-imageType-00971) VUID-VkImageCreateInfo-imageType-00971

If the [`sparseResidencyImage2D`](../../../../spec/latest/chapters/features.html#features-sparseResidencyImage2D)
feature is not enabled, and `imageType` is [VK_IMAGE_TYPE_2D](VkImageType.html),
`flags` **must** not contain [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-imageType-00972) VUID-VkImageCreateInfo-imageType-00972

If the [`sparseResidencyImage3D`](../../../../spec/latest/chapters/features.html#features-sparseResidencyImage3D)
feature is not enabled, and `imageType` is [VK_IMAGE_TYPE_3D](VkImageType.html),
`flags` **must** not contain [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-imageType-00973) VUID-VkImageCreateInfo-imageType-00973

If the [    `sparseResidency2Samples`](../../../../spec/latest/chapters/features.html#features-sparseResidency2Samples) feature is not enabled, `imageType`
is [VK_IMAGE_TYPE_2D](VkImageType.html), and `samples` is
[VK_SAMPLE_COUNT_2_BIT](VkSampleCountFlagBits.html), `flags` **must** not contain
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-imageType-00974) VUID-VkImageCreateInfo-imageType-00974

If the [    `sparseResidency4Samples`](../../../../spec/latest/chapters/features.html#features-sparseResidency4Samples) feature is not enabled, `imageType`
is [VK_IMAGE_TYPE_2D](VkImageType.html), and `samples` is
[VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html), `flags` **must** not contain
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-imageType-00975) VUID-VkImageCreateInfo-imageType-00975

If the [    `sparseResidency8Samples`](../../../../spec/latest/chapters/features.html#features-sparseResidency8Samples) feature is not enabled, `imageType`
is [VK_IMAGE_TYPE_2D](VkImageType.html), and `samples` is
[VK_SAMPLE_COUNT_8_BIT](VkSampleCountFlagBits.html), `flags` **must** not contain
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-imageType-00976) VUID-VkImageCreateInfo-imageType-00976

If the [    `sparseResidency16Samples`](../../../../spec/latest/chapters/features.html#features-sparseResidency16Samples) feature is not enabled, `imageType`
is [VK_IMAGE_TYPE_2D](VkImageType.html), and `samples` is
[VK_SAMPLE_COUNT_16_BIT](VkSampleCountFlagBits.html), `flags` **must** not contain
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-flags-00987) VUID-VkImageCreateInfo-flags-00987

If `flags` contains [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html) or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](VkImageCreateFlagBits.html), it **must** also contain
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-None-01925) VUID-VkImageCreateInfo-None-01925

If any of the bits [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](VkImageCreateFlagBits.html) are set,
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) **must** not also be set

* 
[](#VUID-VkImageCreateInfo-flags-01890) VUID-VkImageCreateInfo-flags-01890

If the [`protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory) feature is
not enabled, `flags` **must** not contain
[VK_IMAGE_CREATE_PROTECTED_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-None-01891) VUID-VkImageCreateInfo-None-01891

If any of the bits [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](VkImageCreateFlagBits.html) are set,
[VK_IMAGE_CREATE_PROTECTED_BIT](VkImageCreateFlagBits.html) **must** not also be set

* 
[](#VUID-VkImageCreateInfo-pNext-00988) VUID-VkImageCreateInfo-pNext-00988

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfoNV](VkExternalMemoryImageCreateInfoNV.html) structure, it **must** not contain
a [VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html) structure

* 
[](#VUID-VkImageCreateInfo-pNext-00990) VUID-VkImageCreateInfo-pNext-00990

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html) structure, its `handleTypes`
member **must** only contain bits that are also in
[VkExternalImageFormatProperties](VkExternalImageFormatProperties.html)::`externalMemoryProperties.compatibleHandleTypes`,
as returned by [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) with
`format`, `imageType`, `tiling`, `usage`, and
`flags` equal to those in this structure, and with a
[VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html) structure included in the
`pNext` chain, with a `handleType` equal to any one of the
handle types specified in
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes`

* 
[](#VUID-VkImageCreateInfo-pNext-00991) VUID-VkImageCreateInfo-pNext-00991

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfoNV](VkExternalMemoryImageCreateInfoNV.html) structure, its `handleTypes`
member **must** only contain bits that are also in
[VkExternalImageFormatPropertiesNV](VkExternalImageFormatPropertiesNV.html)::`externalMemoryFeatures.compatibleHandleTypes`,
as returned by [vkGetPhysicalDeviceExternalImageFormatPropertiesNV](vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html)
with `format`, `imageType`, `tiling`, `usage`, and
`flags` equal to those in this structure, and with
`externalHandleType` equal to any one of the handle types specified
in [VkExternalMemoryImageCreateInfoNV](VkExternalMemoryImageCreateInfoNV.html)::`handleTypes`

* 
[](#VUID-VkImageCreateInfo-physicalDeviceCount-01421) VUID-VkImageCreateInfo-physicalDeviceCount-01421

If the logical device was created with
[VkDeviceGroupDeviceCreateInfo](VkDeviceGroupDeviceCreateInfo.html)::`physicalDeviceCount` equal to
1, `flags` **must** not contain
[VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-flags-02259) VUID-VkImageCreateInfo-flags-02259

If `flags` contains
[VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](VkImageCreateFlagBits.html), then
`mipLevels` **must** be one, `arrayLayers` **must** be one,
`imageType` **must** be [VK_IMAGE_TYPE_2D](VkImageType.html), and
`imageCreateMaybeLinear` (as defined in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits)) **must** be
[VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkImageCreateInfo-flags-01572) VUID-VkImageCreateInfo-flags-01572

If `flags` contains
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html), then `format`
**must** be a [compressed image format](../../../../spec/latest/appendices/compressedtex.html#compressed_image_formats)

* 
[](#VUID-VkImageCreateInfo-flags-01573) VUID-VkImageCreateInfo-flags-01573

If `flags` contains
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html), then `flags`
**must** also contain [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-initialLayout-00993) VUID-VkImageCreateInfo-initialLayout-00993

    `initialLayout` **must** be [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html) or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](VkImageLayout.html)

* 
[](#VUID-VkImageCreateInfo-pNext-01443) VUID-VkImageCreateInfo-pNext-01443

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html) or
`VkExternalMemoryImageCreateInfoNV` structure whose
`handleTypes` member is not `0`, `initialLayout` **must** be
[VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html)

* 
[](#VUID-VkImageCreateInfo-format-06410) VUID-VkImageCreateInfo-format-06410

If the image `format` is one of the
[formats that require a    sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion), `mipLevels` **must** be 1

* 
[](#VUID-VkImageCreateInfo-format-06411) VUID-VkImageCreateInfo-format-06411

If the image `format` is one of the
[formats that require a    sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion), `samples` **must** be
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-format-06412) VUID-VkImageCreateInfo-format-06412

If the image `format` is one of the
[formats that require a    sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion), `imageType` **must** be
[VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-VkImageCreateInfo-imageCreateFormatFeatures-02260) VUID-VkImageCreateInfo-imageCreateFormatFeatures-02260

If `format` is a *multi-planar* format, and if
`imageCreateFormatFeatures` (as defined in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits)) does not
contain [VK_FORMAT_FEATURE_DISJOINT_BIT](VkFormatFeatureFlagBits.html), then `flags` **must** not
contain [VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-format-01577) VUID-VkImageCreateInfo-format-01577

If `format` is not a *multi-planar* format, and `flags` does not
include [VK_IMAGE_CREATE_ALIAS_BIT](VkImageCreateFlagBits.html), `flags` **must** not contain
[VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-format-04712) VUID-VkImageCreateInfo-format-04712

If `format` has a `_422` or `_420` suffix, `extent.width`
**must** be a multiple of 2

* 
[](#VUID-VkImageCreateInfo-format-04713) VUID-VkImageCreateInfo-format-04713

If `format` has a `_420` suffix, `extent.height` **must** be a
multiple of 2

* 
[](#VUID-VkImageCreateInfo-format-09583) VUID-VkImageCreateInfo-format-09583

If `format` is one of the `VK_FORMAT_PVRTC1_*_IMG` formats,
`extent.width` **must** be a power of 2

* 
[](#VUID-VkImageCreateInfo-format-09584) VUID-VkImageCreateInfo-format-09584

If `format` is one of the `VK_FORMAT_PVRTC1_*_IMG` formats,
`extent.height` **must** be a power of 2

* 
[](#VUID-VkImageCreateInfo-tiling-02261) VUID-VkImageCreateInfo-tiling-02261

If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), then
the `pNext` chain **must** include exactly one of
[VkImageDrmFormatModifierListCreateInfoEXT](VkImageDrmFormatModifierListCreateInfoEXT.html) or
[VkImageDrmFormatModifierExplicitCreateInfoEXT](VkImageDrmFormatModifierExplicitCreateInfoEXT.html) structures

* 
[](#VUID-VkImageCreateInfo-pNext-02262) VUID-VkImageCreateInfo-pNext-02262

If the `pNext` chain includes a
[VkImageDrmFormatModifierListCreateInfoEXT](VkImageDrmFormatModifierListCreateInfoEXT.html) or
[VkImageDrmFormatModifierExplicitCreateInfoEXT](VkImageDrmFormatModifierExplicitCreateInfoEXT.html) structure, then
`tiling` **must** be [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html)

* 
[](#VUID-VkImageCreateInfo-tiling-02353) VUID-VkImageCreateInfo-tiling-02353

If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html) and
`flags` contains [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html), then the
`pNext` chain **must** include a [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)
structure with non-zero `viewFormatCount`

* 
[](#VUID-VkImageCreateInfo-flags-01533) VUID-VkImageCreateInfo-flags-01533

If `flags` contains
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](VkImageCreateFlagBits.html)
`format` **must** be a depth or depth/stencil format

* 
[](#VUID-VkImageCreateInfo-pNext-02393) VUID-VkImageCreateInfo-pNext-02393

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html) structure whose `handleTypes`
member includes
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html),
`imageType` **must** be [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-VkImageCreateInfo-pNext-02394) VUID-VkImageCreateInfo-pNext-02394

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html) structure whose `handleTypes`
member includes
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html),
`mipLevels` **must** either be `1` or equal to the number of levels in
the complete mipmap chain based on `extent.width`,
`extent.height`, and `extent.depth`

* 
[](#VUID-VkImageCreateInfo-pNext-02396) VUID-VkImageCreateInfo-pNext-02396

If the `pNext` chain includes a [VkExternalFormatANDROID](VkExternalFormatANDROID.html)
structure whose `externalFormat` member is not `0`, `flags`
**must** not include [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-pNext-02397) VUID-VkImageCreateInfo-pNext-02397

If the `pNext` chain includes a [VkExternalFormatANDROID](VkExternalFormatANDROID.html)
structure whose `externalFormat` member is not `0`, `usage`
**must** not include any usages except
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-pNext-09457) VUID-VkImageCreateInfo-pNext-09457

If the `pNext` chain includes a [VkExternalFormatANDROID](VkExternalFormatANDROID.html)
structure whose `externalFormat` member is not `0`, and
[`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve) feature
is not enabled, `usage` **must** not include
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-pNext-02398) VUID-VkImageCreateInfo-pNext-02398

If the `pNext` chain includes a [VkExternalFormatANDROID](VkExternalFormatANDROID.html)
structure whose `externalFormat` member is not `0`, `tiling`
**must** be [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html)

* 
[](#VUID-VkImageCreateInfo-pNext-08951) VUID-VkImageCreateInfo-pNext-08951

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html) structure whose `handleTypes`
member includes
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](VkExternalMemoryHandleTypeFlagBits.html),
`imageType` **must** be [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-VkImageCreateInfo-pNext-08952) VUID-VkImageCreateInfo-pNext-08952

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html) structure whose `handleTypes`
member includes
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](VkExternalMemoryHandleTypeFlagBits.html),
`mipLevels` **must** either be `1` or equal to the number of levels in
the complete mipmap chain based on `extent.width`,
`extent.height`, and `extent.depth`

* 
[](#VUID-VkImageCreateInfo-pNext-08953) VUID-VkImageCreateInfo-pNext-08953

If the `pNext` chain includes a [VkExternalFormatQNX](VkExternalFormatQNX.html) structure
whose `externalFormat` member is not `0`, `flags` **must** not
include [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-pNext-08954) VUID-VkImageCreateInfo-pNext-08954

If the `pNext` chain includes a [VkExternalFormatQNX](VkExternalFormatQNX.html) structure
whose `externalFormat` member is not `0`, `usage` **must** not
include any usages except [VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-pNext-08955) VUID-VkImageCreateInfo-pNext-08955

If the `pNext` chain includes a [VkExternalFormatQNX](VkExternalFormatQNX.html) structure
whose `externalFormat` member is not `0`, `tiling` **must** be
[VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html)

* 
[](#VUID-VkImageCreateInfo-format-02795) VUID-VkImageCreateInfo-format-02795

If `format` is a depth-stencil format, `usage` includes
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html), and the `pNext`
chain includes a [VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html) structure, then its
[VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html)::`stencilUsage` member **must**
also include [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-format-02796) VUID-VkImageCreateInfo-format-02796

If `format` is a depth-stencil format, `usage` does not include
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html), and the `pNext`
chain includes a [VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html) structure, then its
[VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html)::`stencilUsage` member **must**
also not include [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-format-02797) VUID-VkImageCreateInfo-format-02797

If `format` is a depth-stencil format, `usage` includes
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](VkImageUsageFlagBits.html), and the `pNext` chain
includes a [VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html) structure, then its
[VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html)::`stencilUsage` member **must**
also include [VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-format-02798) VUID-VkImageCreateInfo-format-02798

If `format` is a depth-stencil format, `usage` does not include
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](VkImageUsageFlagBits.html), and the `pNext` chain
includes a [VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html) structure, then its
[VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html)::`stencilUsage` member **must**
also not include [VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-Format-02536) VUID-VkImageCreateInfo-Format-02536

If `Format` is a depth-stencil format and the `pNext` chain
includes a [VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html) structure with its
`stencilUsage` member including
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html), `extent.width` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxFramebufferWidth`

* 
[](#VUID-VkImageCreateInfo-format-02537) VUID-VkImageCreateInfo-format-02537

If `format` is a depth-stencil format and the `pNext` chain
includes a [VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html) structure with its
`stencilUsage` member including
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html), `extent.height` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxFramebufferHeight`

* 
[](#VUID-VkImageCreateInfo-format-02538) VUID-VkImageCreateInfo-format-02538

If the [    `shaderStorageImageMultisample`](../../../../spec/latest/chapters/features.html#features-shaderStorageImageMultisample) feature is not enabled,
`format` is a depth-stencil format and the `pNext` chain
includes a [VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html) structure with its
`stencilUsage` including [VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html),
`samples` **must** be [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-flags-02050) VUID-VkImageCreateInfo-flags-02050

If `flags` contains [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](VkImageCreateFlagBits.html),
`imageType` **must** be [VK_IMAGE_TYPE_2D](VkImageType.html) or
[VK_IMAGE_TYPE_3D](VkImageType.html)

* 
[](#VUID-VkImageCreateInfo-flags-02051) VUID-VkImageCreateInfo-flags-02051

If `flags` contains [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](VkImageCreateFlagBits.html), it
**must** not contain [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](VkImageCreateFlagBits.html) and the
`format` **must** not be a depth/stencil format

* 
[](#VUID-VkImageCreateInfo-flags-02052) VUID-VkImageCreateInfo-flags-02052

If `flags` contains [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](VkImageCreateFlagBits.html) and
`imageType` is [VK_IMAGE_TYPE_2D](VkImageType.html), `extent.width` and
`extent.height` **must** be greater than `1`

* 
[](#VUID-VkImageCreateInfo-flags-02053) VUID-VkImageCreateInfo-flags-02053

If `flags` contains [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](VkImageCreateFlagBits.html) and
`imageType` is [VK_IMAGE_TYPE_3D](VkImageType.html), `extent.width`,
`extent.height`, and `extent.depth` **must** be greater than `1`

* 
[](#VUID-VkImageCreateInfo-imageType-02082) VUID-VkImageCreateInfo-imageType-02082

If `usage` includes
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html),
`imageType` **must** be [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-VkImageCreateInfo-samples-02083) VUID-VkImageCreateInfo-samples-02083

If `usage` includes
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html),
`samples` **must** be [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-shadingRateImage-07727) VUID-VkImageCreateInfo-shadingRateImage-07727

If the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage) feature is
enabled and `usage` includes
[VK_IMAGE_USAGE_SHADING_RATE_IMAGE_BIT_NV](VkImageUsageFlagBits.html), `tiling` **must** be
[VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html)

* 
[](#VUID-VkImageCreateInfo-flags-02565) VUID-VkImageCreateInfo-flags-02565

If `flags` contains [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html),
`tiling` **must** be [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html)

* 
[](#VUID-VkImageCreateInfo-flags-02566) VUID-VkImageCreateInfo-flags-02566

If `flags` contains [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html),
`imageType` **must** be [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-VkImageCreateInfo-flags-02567) VUID-VkImageCreateInfo-flags-02567

If `flags` contains [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html),
`flags` **must** not contain [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-flags-02568) VUID-VkImageCreateInfo-flags-02568

If `flags` contains [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html),
`mipLevels` **must** be `1`

* 
[](#VUID-VkImageCreateInfo-usage-04992) VUID-VkImageCreateInfo-usage-04992

If `usage` includes [VK_IMAGE_USAGE_INVOCATION_MASK_BIT_HUAWEI](VkImageUsageFlagBits.html),
`tiling` **must** be [VK_IMAGE_TILING_LINEAR](VkImageTiling.html)

* 
[](#VUID-VkImageCreateInfo-imageView2DOn3DImage-04459) VUID-VkImageCreateInfo-imageView2DOn3DImage-04459

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`imageView2DOn3DImage`
is [VK_FALSE](VK_FALSE.html), `flags` **must** not contain
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-multisampleArrayImage-04460) VUID-VkImageCreateInfo-multisampleArrayImage-04460

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`multisampleArrayImage`
is [VK_FALSE](VK_FALSE.html), and `samples` is not [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html),
then `arrayLayers` **must** be `1`

* 
[](#VUID-VkImageCreateInfo-pNext-06722) VUID-VkImageCreateInfo-pNext-06722

If a [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html) structure was included in the
`pNext` chain and `format` is not a [    multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) and
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`viewFormatCount` is not zero,
then each format in
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`pViewFormats` **must** either be
compatible with the `format` as described in the
[compatibility table](../../../../spec/latest/chapters/formats.html#formats-compatibility) or, if `flags`
contains [VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html), be an
uncompressed format that is [    size-compatible](../../../../spec/latest/chapters/formats.html#formats-size-compatibility) with `format`

* 
[](#VUID-VkImageCreateInfo-pNext-10062) VUID-VkImageCreateInfo-pNext-10062

If a [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html) structure was included in the
`pNext` chain and `format` is a [    multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) and `flags` contains
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html) and
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`viewFormatCount` is not zero,
then each format in
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`pViewFormats` **must** be
compatible with the [VkFormat](VkFormat.html) for the plane of the image format

* 
[](#VUID-VkImageCreateInfo-flags-04738) VUID-VkImageCreateInfo-flags-04738

If `flags` does not contain [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html)
and the `pNext` chain includes a [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)
structure, then [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`viewFormatCount`
**must** be `0` or `1`

* 
[](#VUID-VkImageCreateInfo-usage-04815) VUID-VkImageCreateInfo-usage-04815

If `usage` includes [VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html),
and `flags` does not include
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkImageCreateFlagBits.html),
then the `pNext` chain **must** include a
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure with `profileCount`
greater than `0` and `pProfiles` including at least one
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure with a `videoCodecOperation`
member specifying a decode operation

* 
[](#VUID-VkImageCreateInfo-usage-04816) VUID-VkImageCreateInfo-usage-04816

If `usage` includes [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](VkImageUsageFlagBits.html),
and `flags` does not include
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkImageCreateFlagBits.html),
then the `pNext` chain **must** include a
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure with `profileCount`
greater than `0` and `pProfiles` including at least one
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure with a `videoCodecOperation`
member specifying an encode operation

* 
[](#VUID-VkImageCreateInfo-flags-08328) VUID-VkImageCreateInfo-flags-08328

If `flags` includes
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkImageCreateFlagBits.html), then
[`videoMaintenance1`](../../../../spec/latest/chapters/features.html#features-videoMaintenance1) **must** be enabled

* 
[](#VUID-VkImageCreateInfo-flags-08329) VUID-VkImageCreateInfo-flags-08329

If `flags` includes
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkImageCreateFlagBits.html) and `usage`
does not include [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html), then
`usage` **must** not include
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-flags-08331) VUID-VkImageCreateInfo-flags-08331

If `flags` includes
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkImageCreateFlagBits.html), then
`usage` **must** not include
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html),
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-pNext-06811) VUID-VkImageCreateInfo-pNext-06811

If the `pNext` chain includes a [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)
structure with `profileCount` greater than `0`, then
`supportedVideoFormat` **must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkImageCreateInfo-pNext-10784) VUID-VkImageCreateInfo-pNext-10784

If the `pNext` chain includes a [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)
structure and for any element of its `pProfiles` member
`videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
[`videoDecodeVP9`](../../../../spec/latest/chapters/features.html#features-videoDecodeVP9) feature **must** be
enabled

* 
[](#VUID-VkImageCreateInfo-pNext-10250) VUID-VkImageCreateInfo-pNext-10250

If the `pNext` chain includes a [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)
structure and for any element of its `pProfiles` member
`videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
[`videoEncodeAV1`](../../../../spec/latest/chapters/features.html#features-videoEncodeAV1) feature **must** be
enabled

* 
[](#VUID-VkImageCreateInfo-pNext-10920) VUID-VkImageCreateInfo-pNext-10920

If the `pNext` chain includes a
[VkVideoEncodeProfileRgbConversionInfoVALVE](VkVideoEncodeProfileRgbConversionInfoVALVE.html) structure, then the
[`videoEncodeRgbConversion`](../../../../spec/latest/chapters/features.html#features-videoEncodeRgbConversion)
feature **must** be enabled

* 
[](#VUID-VkImageCreateInfo-usage-10251) VUID-VkImageCreateInfo-usage-10251

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html), then the
[    `videoEncodeQuantizationMap`](../../../../spec/latest/chapters/features.html#features-videoEncodeQuantizationMap) feature **must** be enabled

* 
[](#VUID-VkImageCreateInfo-usage-10252) VUID-VkImageCreateInfo-usage-10252

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html), `imageType`
**must** be [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-VkImageCreateInfo-usage-10253) VUID-VkImageCreateInfo-usage-10253

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html), `samples`
**must** be [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-usage-10254) VUID-VkImageCreateInfo-usage-10254

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html), then the
`pNext` chain **must** include a [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)
structure with `profileCount` equal to `1` and `pProfiles`
pointing to a [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure with a
`videoCodecOperation` member specifying an encode operation

* 
[](#VUID-VkImageCreateInfo-usage-10255) VUID-VkImageCreateInfo-usage-10255

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html), then
[VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`flags` **must** include
[VK_VIDEO_ENCODE_CAPABILITY_QUANTIZATION_DELTA_MAP_BIT_KHR](VkVideoEncodeCapabilityFlagBitsKHR.html), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video
profile specified in the `pProfiles` member of the
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure included in the `pNext`
chain

* 
[](#VUID-VkImageCreateInfo-usage-10256) VUID-VkImageCreateInfo-usage-10256

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html), then
[VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`flags` **must** include
[VK_VIDEO_ENCODE_CAPABILITY_EMPHASIS_MAP_BIT_KHR](VkVideoEncodeCapabilityFlagBitsKHR.html), as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile
specified in the `pProfiles` member of the
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure included in the `pNext`
chain

* 
[](#VUID-VkImageCreateInfo-usage-10257) VUID-VkImageCreateInfo-usage-10257

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html),
`extent.width` **must** be less than or equal to
[VkVideoEncodeQuantizationMapCapabilitiesKHR](VkVideoEncodeQuantizationMapCapabilitiesKHR.html)::`maxQuantizationMapExtent.width`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile specified in the `pProfiles` member of the
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure included in the `pNext`
chain

* 
[](#VUID-VkImageCreateInfo-usage-10258) VUID-VkImageCreateInfo-usage-10258

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html),
`extent.height` **must** be less than or equal to
[VkVideoEncodeQuantizationMapCapabilitiesKHR](VkVideoEncodeQuantizationMapCapabilitiesKHR.html)::`maxQuantizationMapExtent.height`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
video profile specified in the `pProfiles` member of the
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure included in the `pNext`
chain

* 
[](#VUID-VkImageCreateInfo-pNext-06390) VUID-VkImageCreateInfo-pNext-06390

If the [VkImage](VkImage.html) is to be used to import memory from a
[VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), a
[VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html) structure **must** be
chained to `pNext`

* 
[](#VUID-VkImageCreateInfo-multisampledRenderToSingleSampled-06882) VUID-VkImageCreateInfo-multisampledRenderToSingleSampled-06882

If the [    `multisampledRenderToSingleSampled`](../../../../spec/latest/chapters/features.html#features-multisampledRenderToSingleSampled) feature is not enabled,
`flags` **must** not contain
[VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-flags-06883) VUID-VkImageCreateInfo-flags-06883

If `flags` contains
[VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](VkImageCreateFlagBits.html),
`samples` **must** be [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-pNext-06743) VUID-VkImageCreateInfo-pNext-06743

If the `pNext` chain includes a [VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)
structure, `format` is a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), and [VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)::`flags` includes
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](VkImageCompressionFlagBitsEXT.html), then
[VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)::`compressionControlPlaneCount`
**must** be equal to the number of planes in `format`

* 
[](#VUID-VkImageCreateInfo-pNext-06744) VUID-VkImageCreateInfo-pNext-06744

If the `pNext` chain includes a [VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)
structure, `format` is not a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), and [VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)::`flags` includes
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](VkImageCompressionFlagBitsEXT.html), then
[VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)::`compressionControlPlaneCount`
**must** be 1

* 
[](#VUID-VkImageCreateInfo-pNext-06746) VUID-VkImageCreateInfo-pNext-06746

If the `pNext` chain includes a [VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)
structure, it **must** not contain a
[VkImageDrmFormatModifierExplicitCreateInfoEXT](VkImageDrmFormatModifierExplicitCreateInfoEXT.html) structure

* 
[](#VUID-VkImageCreateInfo-flags-08104) VUID-VkImageCreateInfo-flags-08104

    If `flags` includes
    [VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html), the
    [    `descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBufferCaptureReplay)
or
    [    `descriptorHeapCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorHeapCaptureReplay)
 feature **must** be enabled

* 
[](#VUID-VkImageCreateInfo-pNext-08105) VUID-VkImageCreateInfo-pNext-08105

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) structure, `flags`
**must** contain
[VK_IMAGE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-pNext-06783) VUID-VkImageCreateInfo-pNext-06783

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure, its
`exportObjectType` member **must** be either
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html) or
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_IOSURFACE_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html)

* 
[](#VUID-VkImageCreateInfo-pNext-06784) VUID-VkImageCreateInfo-pNext-06784

If the `pNext` chain includes a [VkImportMetalTextureInfoEXT](VkImportMetalTextureInfoEXT.html)
structure its `plane` member **must** be
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html), [VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html), or
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-pNext-06785) VUID-VkImageCreateInfo-pNext-06785

If the `pNext` chain includes a [VkImportMetalTextureInfoEXT](VkImportMetalTextureInfoEXT.html)
structure and the image does not have a [    multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then
[VkImportMetalTextureInfoEXT](VkImportMetalTextureInfoEXT.html)::`plane` **must** be
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-pNext-06786) VUID-VkImageCreateInfo-pNext-06786

If the `pNext` chain includes a [VkImportMetalTextureInfoEXT](VkImportMetalTextureInfoEXT.html)
structure and the image has a [multi-planar    format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) with only two planes, then
[VkImportMetalTextureInfoEXT](VkImportMetalTextureInfoEXT.html)::`plane` **must** not be
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-imageCreateFormatFeatures-09048) VUID-VkImageCreateInfo-imageCreateFormatFeatures-09048

If `imageCreateFormatFeatures` (as defined in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits)) does not
contain [VK_FORMAT_FEATURE_2_HOST_IMAGE_TRANSFER_BIT](VkFormatFeatureFlagBits2.html), then
`usage` **must** not contain [VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-usage-10245) VUID-VkImageCreateInfo-usage-10245

If `usage` includes [VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html), then the
[`hostImageCopy`](../../../../spec/latest/chapters/features.html#features-hostImageCopy) feature **must** be enabled

* 
[](#VUID-VkImageCreateInfo-tileMemoryHeap-10766) VUID-VkImageCreateInfo-tileMemoryHeap-10766

If the [`tileMemoryHeap`](../../../../spec/latest/chapters/features.html#features-tileMemoryHeap) feature is not
enabled, `usage` **must** not include
[VK_IMAGE_USAGE_TILE_MEMORY_BIT_QCOM](VkImageUsageFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-pNext-09653) VUID-VkImageCreateInfo-pNext-09653

If the `pNext` chain contains a
[VkImageAlignmentControlCreateInfoMESA](VkImageAlignmentControlCreateInfoMESA.html) structure, `tiling`
**must** be [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html)

* 
[](#VUID-VkImageCreateInfo-pNext-09654) VUID-VkImageCreateInfo-pNext-09654

If the `pNext` chain contains a
[VkImageAlignmentControlCreateInfoMESA](VkImageAlignmentControlCreateInfoMESA.html) structure, it **must** not
contain a [VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html) structure

* 
[](#VUID-VkImageCreateInfo-tiling-09711) VUID-VkImageCreateInfo-tiling-09711

If `tiling` is VK_IMAGE_TILING_LINEAR then
[VK_IMAGE_USAGE_TENSOR_ALIASING_BIT_ARM](VkImageUsageFlagBits.html) **must** not be set in
`usage`

* 
[](#VUID-VkImageCreateInfo-None-12279) VUID-VkImageCreateInfo-None-12279

    If
Vulkan 1.3 is not supported and
    the [`ycbcr2plane444Formats`](../../../../spec/latest/chapters/features.html#features-ycbcr2plane444Formats)
    feature is not enabled, `format` **must** not be
    [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](VkFormat.html),
    [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](VkFormat.html),
    [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](VkFormat.html), or
    [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](VkFormat.html)

* 
[](#VUID-VkImageCreateInfo-flags-11281) VUID-VkImageCreateInfo-flags-11281

If [VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html)::pData is not `NULL`,
`flags` **must** contain
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkImageCreateInfo-pData-11286) VUID-VkImageCreateInfo-pData-11286

If `flags` contains
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html), and
[VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html)::`pData` is not `NULL`,
[VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html)::`pData->size` **must** be equal
to [    `imageCaptureReplayOpaqueDataSize`](../../../../spec/latest/chapters/limits.html#limits-imageCaptureReplayOpaqueDataSize)

Valid Usage (Implicit)

* 
[](#VUID-VkImageCreateInfo-sType-sType) VUID-VkImageCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkImageCreateInfo-pNext-pNext) VUID-VkImageCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html), [VkDedicatedAllocationImageCreateInfoNV](VkDedicatedAllocationImageCreateInfoNV.html), [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html), [VkExternalFormatANDROID](VkExternalFormatANDROID.html), [VkExternalFormatOHOS](VkExternalFormatOHOS.html), [VkExternalFormatQNX](VkExternalFormatQNX.html), [VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html), [VkExternalMemoryImageCreateInfoNV](VkExternalMemoryImageCreateInfoNV.html), [VkImageAlignmentControlCreateInfoMESA](VkImageAlignmentControlCreateInfoMESA.html), [VkImageCompressionControlEXT](VkImageCompressionControlEXT.html), [VkImageDrmFormatModifierExplicitCreateInfoEXT](VkImageDrmFormatModifierExplicitCreateInfoEXT.html), [VkImageDrmFormatModifierListCreateInfoEXT](VkImageDrmFormatModifierListCreateInfoEXT.html), [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html), [VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html), [VkImageSwapchainCreateInfoKHR](VkImageSwapchainCreateInfoKHR.html), [VkImportMetalIOSurfaceInfoEXT](VkImportMetalIOSurfaceInfoEXT.html), [VkImportMetalTextureInfoEXT](VkImportMetalTextureInfoEXT.html), [VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html), [VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html), [VkOpticalFlowImageFormatInfoNV](VkOpticalFlowImageFormatInfoNV.html), or [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)

* 
[](#VUID-VkImageCreateInfo-sType-unique) VUID-VkImageCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) or [VkImportMetalTextureInfoEXT](VkImportMetalTextureInfoEXT.html)

* 
[](#VUID-VkImageCreateInfo-flags-parameter) VUID-VkImageCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkImageCreateFlagBits](VkImageCreateFlagBits.html) values

* 
[](#VUID-VkImageCreateInfo-imageType-parameter) VUID-VkImageCreateInfo-imageType-parameter

 `imageType` **must** be a valid [VkImageType](VkImageType.html) value

* 
[](#VUID-VkImageCreateInfo-format-parameter) VUID-VkImageCreateInfo-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkImageCreateInfo-samples-parameter) VUID-VkImageCreateInfo-samples-parameter

 `samples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value

* 
[](#VUID-VkImageCreateInfo-tiling-parameter) VUID-VkImageCreateInfo-tiling-parameter

 `tiling` **must** be a valid [VkImageTiling](VkImageTiling.html) value

* 
[](#VUID-VkImageCreateInfo-usage-parameter) VUID-VkImageCreateInfo-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) values

* 
[](#VUID-VkImageCreateInfo-usage-requiredbitmask) VUID-VkImageCreateInfo-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-VkImageCreateInfo-sharingMode-parameter) VUID-VkImageCreateInfo-sharingMode-parameter

 `sharingMode` **must** be a valid [VkSharingMode](VkSharingMode.html) value

* 
[](#VUID-VkImageCreateInfo-initialLayout-parameter) VUID-VkImageCreateInfo-initialLayout-parameter

 `initialLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDeviceImageMemoryRequirements](VkDeviceImageMemoryRequirements.html), [VkDeviceImageSubresourceInfo](VkDeviceImageSubresourceInfo.html), [VkExtent3D](VkExtent3D.html), [VkFormat](VkFormat.html), [VkImageCreateFlags](VkImageCreateFlags.html), [VkImageFormatConstraintsInfoFUCHSIA](VkImageFormatConstraintsInfoFUCHSIA.html), [VkImageLayout](VkImageLayout.html), [VkImageTiling](VkImageTiling.html), [VkImageType](VkImageType.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html), [VkSharingMode](VkSharingMode.html), [VkStructureType](VkStructureType.html), [vkCreateImage](vkCreateImage.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
