# vkGetPhysicalDeviceExternalImageFormatPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceExternalImageFormatPropertiesNV - Determine image capabilities compatible with external memory handle types

To determine the image capabilities compatible with an external memory
handle type, call:

// Provided by VK_NV_external_memory_capabilities
VkResult vkGetPhysicalDeviceExternalImageFormatPropertiesNV(
    VkPhysicalDevice                            physicalDevice,
    VkFormat                                    format,
    VkImageType                                 type,
    VkImageTiling                               tiling,
    VkImageUsageFlags                           usage,
    VkImageCreateFlags                          flags,
    VkExternalMemoryHandleTypeFlagsNV           externalHandleType,
    VkExternalImageFormatPropertiesNV*          pExternalImageFormatProperties);

* 
`physicalDevice` is the physical device from which to query the
image capabilities

* 
`format` is the image format, corresponding to
[VkImageCreateInfo](VkImageCreateInfo.html)::`format`.

* 
`type` is the image type, corresponding to
[VkImageCreateInfo](VkImageCreateInfo.html)::`imageType`.

* 
`tiling` is the image tiling, corresponding to
[VkImageCreateInfo](VkImageCreateInfo.html)::`tiling`.

* 
`usage` is the intended usage of the image, corresponding to
[VkImageCreateInfo](VkImageCreateInfo.html)::`usage`.

* 
`flags` is a bitmask describing additional parameters of the image,
corresponding to [VkImageCreateInfo](VkImageCreateInfo.html)::`flags`.

* 
`externalHandleType` is either one of the bits from
[VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html), or 0.

* 
`pExternalImageFormatProperties` is a pointer to a
[VkExternalImageFormatPropertiesNV](VkExternalImageFormatPropertiesNV.html) structure in which capabilities
are returned.

If `externalHandleType` is 0,
`pExternalImageFormatProperties->imageFormatProperties` will return the
same values as a call to [vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html), and
the other members of `pExternalImageFormatProperties` will all be 0.
Otherwise, they are filled in as described for
[VkExternalImageFormatPropertiesNV](VkExternalImageFormatPropertiesNV.html).

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-externalHandleType-07721) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-externalHandleType-07721

`externalHandleType` **must** not have more than one bit set

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-format-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-type-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-type-parameter

 `type` **must** be a valid [VkImageType](VkImageType.html) value

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-tiling-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-tiling-parameter

 `tiling` **must** be a valid [VkImageTiling](VkImageTiling.html) value

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-usage-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) values

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-usage-requiredbitmask) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-flags-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-flags-parameter

 `flags` **must** be a valid combination of [VkImageCreateFlagBits](VkImageCreateFlagBits.html) values

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-externalHandleType-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-externalHandleType-parameter

 `externalHandleType` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html) values

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-pExternalImageFormatProperties-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-pExternalImageFormatProperties-parameter

 `pExternalImageFormatProperties` **must** be a valid pointer to a [VkExternalImageFormatPropertiesNV](VkExternalImageFormatPropertiesNV.html) structure

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

[VK_NV_external_memory_capabilities](VK_NV_external_memory_capabilities.html), [VkExternalImageFormatPropertiesNV](VkExternalImageFormatPropertiesNV.html), [VkExternalMemoryHandleTypeFlagsNV](VkExternalMemoryHandleTypeFlagsNV.html), [VkFormat](VkFormat.html), [VkImageCreateFlags](VkImageCreateFlags.html), [VkImageTiling](VkImageTiling.html), [VkImageType](VkImageType.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#vkGetPhysicalDeviceExternalImageFormatPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
