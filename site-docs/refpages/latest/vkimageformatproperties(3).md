# VkImageFormatProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageFormatProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageFormatProperties - Structure specifying an image format properties

The `VkImageFormatProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageFormatProperties {
    VkExtent3D            maxExtent;
    uint32_t              maxMipLevels;
    uint32_t              maxArrayLayers;
    VkSampleCountFlags    sampleCounts;
    VkDeviceSize          maxResourceSize;
} VkImageFormatProperties;

* 
`maxExtent` are the maximum image dimensions.
See the [Allowed Extent Values](../../../../spec/latest/chapters/capabilities.html#features-extentperimagetype) section
below for how these values are constrained by `type`.

* 
`maxMipLevels` is the maximum number of mipmap levels.
`maxMipLevels` **must** be equal to the number of levels in the
complete mipmap chain based on the `maxExtent.width`,
`maxExtent.height`, and `maxExtent.depth`, except
when one of the following conditions is true, in which case it **may**
instead be `1`:

`vkGetPhysicalDeviceImageFormatProperties`::`tiling` was
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`tiling` was
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html)

* 
the [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`pNext` chain included
a [VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html) structure with a handle
type included in the `handleTypes` member for which mipmap image
support is not required

* 
image `format` is one of the
[formats that require a     sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion)

* 
`flags` contains [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

`maxArrayLayers` is the maximum number of array layers.
`maxArrayLayers` **must** be no less than
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxImageArrayLayers`, except when one
of the following conditions is true, in which case it **may** instead be
`1`:

* 
`tiling` is [VK_IMAGE_TILING_LINEAR](VkImageTiling.html)

* 
`tiling` is [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html) and `type` is
[VK_IMAGE_TYPE_3D](VkImageType.html)

* 
`format` is one of the
[formats that require a     sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion)

If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), then
`maxArrayLayers` **must** not be 0.

`sampleCounts` is a bitmask of [VkSampleCountFlagBits](VkSampleCountFlagBits.html)
specifying all the supported sample counts for this image as described
[below](../../../../spec/latest/chapters/capabilities.html#features-supported-sample-counts).

`maxResourceSize` is an upper bound on the total image size in
bytes, inclusive of all image subresources.
Implementations **may** have an address space limit on total size of a
resource, which is advertised by this property.
`maxResourceSize` **must** be at least 231.

|  | There is no mechanism to query the size of an image before creating it, to
| --- | --- |
compare that size against `maxResourceSize`.
If an application attempts to create an image that exceeds this limit, the
creation will fail and [vkCreateImage](vkCreateImage.html) will return
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html).
While the advertised limit **must** be at least 231, it **may** not be possible
to create an image that approaches that size, particularly for
[VK_IMAGE_TYPE_1D](VkImageType.html). |

If the combination of parameters to
`vkGetPhysicalDeviceImageFormatProperties` is not supported by the
implementation for use in [vkCreateImage](vkCreateImage.html), then all members of
`VkImageFormatProperties` will be filled with zero.

|  | Filling `VkImageFormatProperties` with zero for unsupported formats is
| --- | --- |
an exception to the usual rule that output structures have **undefined**
contents on error.
This exception was unintentional, but is preserved for backwards
compatibility. |

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkDeviceSize`, [VkExtent3D](VkExtent3D.html), [VkExternalImageFormatPropertiesNV](VkExternalImageFormatPropertiesNV.html), [VkImageFormatProperties2](VkImageFormatProperties2.html), [VkSampleCountFlags](VkSampleCountFlags.html), [vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkImageFormatProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
