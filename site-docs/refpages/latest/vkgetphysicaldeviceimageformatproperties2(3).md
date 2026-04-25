# vkGetPhysicalDeviceImageFormatProperties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceImageFormatProperties2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceImageFormatProperties2 - Lists physical device’s image format capabilities

To query additional capabilities specific to image types, call:

// Provided by VK_VERSION_1_1
VkResult vkGetPhysicalDeviceImageFormatProperties2(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceImageFormatInfo2*     pImageFormatInfo,
    VkImageFormatProperties2*                   pImageFormatProperties);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceImageFormatProperties2
VkResult vkGetPhysicalDeviceImageFormatProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceImageFormatInfo2*     pImageFormatInfo,
    VkImageFormatProperties2*                   pImageFormatProperties);

* 
`physicalDevice` is the physical device from which to query the
image capabilities.

* 
`pImageFormatInfo` is a pointer to a
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) structure describing the
parameters that would be consumed by [vkCreateImage](vkCreateImage.html).

* 
`pImageFormatProperties` is a pointer to a
[VkImageFormatProperties2](VkImageFormatProperties2.html) structure in which capabilities are
returned.

`vkGetPhysicalDeviceImageFormatProperties2` behaves similarly to
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html), with the ability to return
extended information in a `pNext` chain of output structures.

If the `pNext` chain of `pImageFormatInfo` includes a
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure with a `profileCount` member
greater than `0`, then this command returns format capabilities specific to
image types used in conjunction with the specified [video profiles](../../../../spec/latest/chapters/videocoding.html#video-profiles).
In this case, this command will return one of the
[video-profile-specific error codes](../../../../spec/latest/chapters/videocoding.html#video-profile-error-codes) if any of
the profiles specified via [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)::`pProfiles`
are not supported.
Furthermore, if [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`usage` includes
any image usage flag not supported by the specified video profiles, then
this command returns [VK_ERROR_IMAGE_USAGE_NOT_SUPPORTED_KHR](VkResult.html).

If the [`hostImageCopy`](../../../../spec/latest/chapters/features.html#features-hostImageCopy) feature is supported,
and:

* 
`pImageFormatInfo->usage` includes [VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html)

* 
`pImageFormatInfo->flags` does not include either of
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](VkImageCreateFlagBits.html)

* 
The `pNext` chain of `pImageFormatInfo` does not include a
[VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html) structure with non-zero
`handleType`

* 
`pImageFormatInfo->tiling` is not
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html)

Then the result of calls to `vkGetPhysicalDeviceImageFormatProperties2`
with identical parameters except for the inclusion of
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) in `pImageFormatInfo->usage`
**must** be identical.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties2-pNext-01868) VUID-vkGetPhysicalDeviceImageFormatProperties2-pNext-01868

If the `pNext` chain of `pImageFormatProperties` includes a
[VkAndroidHardwareBufferUsageANDROID](VkAndroidHardwareBufferUsageANDROID.html) structure, the `pNext`
chain of `pImageFormatInfo` **must** include a
[VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html) structure with
`handleType` set to
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties2-pNext-09004) VUID-vkGetPhysicalDeviceImageFormatProperties2-pNext-09004

If the `pNext` chain of `pImageFormatProperties` includes a
[VkHostImageCopyDevicePerformanceQuery](VkHostImageCopyDevicePerformanceQuery.html) structure,
`pImageFormatInfo->usage` **must** contain
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties2-pImageFormatInfo-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties2-pImageFormatInfo-parameter

 `pImageFormatInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) structure

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties2-pImageFormatProperties-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties2-pImageFormatProperties-parameter

 `pImageFormatProperties` **must** be a valid pointer to a [VkImageFormatProperties2](VkImageFormatProperties2.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FORMAT_NOT_SUPPORTED](VkResult.html)

* 
[VK_ERROR_IMAGE_USAGE_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

* 
[VK_ERROR_VIDEO_PICTURE_LAYOUT_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PROFILE_CODEC_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PROFILE_FORMAT_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PROFILE_OPERATION_NOT_SUPPORTED_KHR](VkResult.html)

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkImageFormatProperties2](VkImageFormatProperties2.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#vkGetPhysicalDeviceImageFormatProperties2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
