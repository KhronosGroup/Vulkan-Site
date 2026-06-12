# vkGetPhysicalDeviceImageFormatProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceImageFormatProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceImageFormatProperties - Lists physical device’s image format capabilities

To query additional capabilities specific to image types, call:

|  | This functionality is superseded by [vkGetPhysicalDeviceImageFormatProperties2](../../../../spec/latest/chapters/capabilities.html#vkGetPhysicalDeviceImageFormatProperties2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VkResult vkGetPhysicalDeviceImageFormatProperties(
    VkPhysicalDevice                            physicalDevice,
    VkFormat                                    format,
    VkImageType                                 type,
    VkImageTiling                               tiling,
    VkImageUsageFlags                           usage,
    VkImageCreateFlags                          flags,
    VkImageFormatProperties*                    pImageFormatProperties);

* 
`physicalDevice` is the physical device from which to query the
image capabilities.

* 
`format` is a [VkFormat](VkFormat.html) value specifying the image format,
corresponding to [VkImageCreateInfo](VkImageCreateInfo.html)::`format`.

* 
`type` is a [VkImageType](VkImageType.html) value specifying the image type,
corresponding to [VkImageCreateInfo](VkImageCreateInfo.html)::`imageType`.

* 
`tiling` is a [VkImageTiling](VkImageTiling.html) value specifying the image tiling,
corresponding to [VkImageCreateInfo](VkImageCreateInfo.html)::`tiling`.

* 
`usage` is a bitmask of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) specifying the
intended usage of the image, corresponding to
[VkImageCreateInfo](VkImageCreateInfo.html)::`usage`.

* 
`flags` is a bitmask of [VkImageCreateFlagBits](VkImageCreateFlagBits.html) specifying
additional parameters of the image, corresponding to
[VkImageCreateInfo](VkImageCreateInfo.html)::`flags`.

* 
`pImageFormatProperties` is a pointer to a
[VkImageFormatProperties](VkImageFormatProperties.html) structure in which capabilities are
returned.

The `format`, `type`, `tiling`, `usage`, and `flags`
parameters correspond to parameters that would be consumed by
[vkCreateImage](vkCreateImage.html) (as members of [VkImageCreateInfo](VkImageCreateInfo.html)).

If `format` is not a supported image format, or if the combination of
`format`, `type`, `tiling`, `usage`, and `flags` is not
supported for images, then `vkGetPhysicalDeviceImageFormatProperties`
returns [VK_ERROR_FORMAT_NOT_SUPPORTED](VkResult.html).

The limitations on an image format that are reported by
`vkGetPhysicalDeviceImageFormatProperties` have the following property:
if `usage1` and `usage2` of type [VkImageUsageFlags](VkImageUsageFlags.html) are such that
the bits set in `usage1` are a subset of the bits set in `usage2`, and
`flags1` and `flags2` of type [VkImageCreateFlags](VkImageCreateFlags.html) are such that
the bits set in `flags1` are a subset of the bits set in `flags2`,
then the limitations for `usage1` and `flags1` **must** be no more strict
than the limitations for `usage2` and `flags2`, for all values of
`format`, `type`, and `tiling`.

If the [`hostImageCopy`](../../../../spec/latest/chapters/features.html#features-hostImageCopy) feature is supported,
and:

* 
`usage` includes [VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html), and

* 
`flags` does not include any of
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](VkImageCreateFlagBits.html)

Then the result of calls to `vkGetPhysicalDeviceImageFormatProperties`
with identical parameters except for the inclusion of
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) in `usage` **must** be identical.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-tiling-02248) VUID-vkGetPhysicalDeviceImageFormatProperties-tiling-02248

`tiling` **must** not be [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html).
(Use [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) instead)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-format-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-type-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-type-parameter

 `type` **must** be a valid [VkImageType](VkImageType.html) value

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-tiling-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-tiling-parameter

 `tiling` **must** be a valid [VkImageTiling](VkImageTiling.html) value

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-usage-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) values

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-usage-requiredbitmask) VUID-vkGetPhysicalDeviceImageFormatProperties-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-flags-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-flags-parameter

 `flags` **must** be a valid combination of [VkImageCreateFlagBits](VkImageCreateFlagBits.html) values

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-pImageFormatProperties-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-pImageFormatProperties-parameter

 `pImageFormatProperties` **must** be a valid pointer to a [VkImageFormatProperties](VkImageFormatProperties.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FORMAT_NOT_SUPPORTED](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkFormat](VkFormat.html), [VkImageCreateFlags](VkImageCreateFlags.html), [VkImageFormatProperties](VkImageFormatProperties.html), [VkImageTiling](VkImageTiling.html), [VkImageType](VkImageType.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#vkGetPhysicalDeviceImageFormatProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
