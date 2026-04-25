# vkGetPhysicalDeviceSparseImageFormatProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceSparseImageFormatProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceSparseImageFormatProperties - Retrieve properties of an image format applied to sparse images

`vkGetPhysicalDeviceSparseImageFormatProperties` returns an array of
[VkSparseImageFormatProperties](VkSparseImageFormatProperties.html).
Each element describes properties for one set of image aspects that are
bound simultaneously for a `VkImage` created with the provided image
creation parameters.
This is usually one element for each aspect in the image, but for
interleaved depth/stencil images there is only one element describing the
combined aspects.

|  | This functionality is superseded by [vkGetPhysicalDeviceSparseImageFormatProperties2](../../../../spec/latest/chapters/sparsemem.html#vkGetPhysicalDeviceSparseImageFormatProperties2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetPhysicalDeviceSparseImageFormatProperties(
    VkPhysicalDevice                            physicalDevice,
    VkFormat                                    format,
    VkImageType                                 type,
    VkSampleCountFlagBits                       samples,
    VkImageUsageFlags                           usage,
    VkImageTiling                               tiling,
    uint32_t*                                   pPropertyCount,
    VkSparseImageFormatProperties*              pProperties);

* 
`physicalDevice` is the physical device from which to query the
sparse image format properties.

* 
`format` is the image format.

* 
`type` is the dimensionality of the image.

* 
`samples` is a [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value specifying the
number of samples per texel.

* 
`usage` is a bitmask describing the intended usage of the image.

* 
`tiling` is the tiling arrangement of the texel blocks in memory.

* 
`pPropertyCount` is a pointer to an integer related to the number of
sparse format properties available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkSparseImageFormatProperties](VkSparseImageFormatProperties.html) structures.

If `pProperties` is `NULL`, then the number of sparse format properties
available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pPropertyCount` is less than the number of sparse format properties
available, at most `pPropertyCount` structures will be written.

If [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html) is not supported for the given
arguments, `pPropertyCount` will be zero upon return, and no data will
be written to `pProperties`.

Multiple aspects are returned for depth/stencil images that are implemented
as separate planes by the implementation.
The depth and stencil data planes each have unique
`VkSparseImageFormatProperties` data.

Depth/stencil images with depth and stencil data interleaved into a single
plane will return a single `VkSparseImageFormatProperties` structure
with the `aspectMask` set to [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) |
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html).

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-samples-01094) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-samples-01094

`samples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value that is
set in `VkImageFormatProperties`::`sampleCounts` returned by
`vkGetPhysicalDeviceImageFormatProperties` with `format`,
`type`, `tiling`, and `usage` equal to those in this command

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-format-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-type-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-type-parameter

 `type` **must** be a valid [VkImageType](VkImageType.html) value

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-samples-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-samples-parameter

 `samples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-usage-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) values

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-usage-requiredbitmask) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-tiling-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-tiling-parameter

 `tiling` **must** be a valid [VkImageTiling](VkImageTiling.html) value

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-pProperties-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkSparseImageFormatProperties](VkSparseImageFormatProperties.html) structures

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkFormat](VkFormat.html), [VkImageTiling](VkImageTiling.html), [VkImageType](VkImageType.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html), [VkSparseImageFormatProperties](VkSparseImageFormatProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#vkGetPhysicalDeviceSparseImageFormatProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
