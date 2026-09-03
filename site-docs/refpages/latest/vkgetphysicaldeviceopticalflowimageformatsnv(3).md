# vkGetPhysicalDeviceOpticalFlowImageFormatsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceOpticalFlowImageFormatsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceOpticalFlowImageFormatsNV - Query image formats for optical flow

To enumerate the supported image formats for a specific optical flow usage,
call:

// Provided by VK_NV_optical_flow
VkResult vkGetPhysicalDeviceOpticalFlowImageFormatsNV(
    VkPhysicalDevice                            physicalDevice,
    const VkOpticalFlowImageFormatInfoNV*       pOpticalFlowImageFormatInfo,
    uint32_t*                                   pFormatCount,
    VkOpticalFlowImageFormatPropertiesNV*       pImageFormatProperties);

* 
`physicalDevice` is the physical device being queried.

* 

`pOpticalFlowImageFormatInfo` is a pointer to a
[VkOpticalFlowImageFormatInfoNV](VkOpticalFlowImageFormatInfoNV.html) structure specifying the optical
flow usage for which information is returned.

* 
 `pFormatCount` is a
pointer to an integer related to the number of optical flow properties
available or queried, as described below.

* 

`pImageFormatProperties` is a pointer to an array of
[VkOpticalFlowImageFormatPropertiesNV](VkOpticalFlowImageFormatPropertiesNV.html) structures in which supported
formats and image parameters are returned.

If `pImageFormatProperties` is `NULL`, then the number of optical flow
properties supported for the given `physicalDevice` is returned in
`pFormatCount`.
Otherwise, `pFormatCount` **must** point to a variable set by the
application to the number of elements in the `pImageFormatProperties`
array, and on return the variable is overwritten with the number of values
actually written to `pImageFormatProperties`.
If the value of `pFormatCount` is less than the number of optical flow
properties supported, at most `pFormatCount` values will be written to
`pImageFormatProperties`, and [VK_INCOMPLETE](VkResult.html) will be returned
instead of [VK_SUCCESS](VkResult.html), to indicate that not all the available values
were returned.

Before creating an image to be used as an optical flow frame, obtain the
supported image creation parameters by querying with
[vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html) and
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) using one of the reported
formats and adding [VkOpticalFlowImageFormatInfoNV](VkOpticalFlowImageFormatInfoNV.html) to the `pNext`
chain of [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html).

When querying the parameters with
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) for images used for optical
flow operations, the [VkOpticalFlowImageFormatInfoNV](VkOpticalFlowImageFormatInfoNV.html)::`usage` field
**must** contain one or more of the bits defined in
[VkOpticalFlowUsageFlagBitsNV](VkOpticalFlowUsageFlagBitsNV.html).

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-pOpticalFlowImageFormatInfo-parameter) VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-pOpticalFlowImageFormatInfo-parameter

 `pOpticalFlowImageFormatInfo` **must** be a valid pointer to a valid [VkOpticalFlowImageFormatInfoNV](VkOpticalFlowImageFormatInfoNV.html) structure

* 
[](#VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-pFormatCount-parameter) VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-pFormatCount-parameter

 `pFormatCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-pImageFormatProperties-parameter) VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-pImageFormatProperties-parameter

 If the value referenced by `pFormatCount` is not `0`, and `pImageFormatProperties` is not `NULL`, `pImageFormatProperties` **must** be a valid pointer to an array of `pFormatCount` [VkOpticalFlowImageFormatPropertiesNV](VkOpticalFlowImageFormatPropertiesNV.html) structures

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_EXTENSION_NOT_PRESENT](VkResult.html)

* 
[VK_ERROR_FORMAT_NOT_SUPPORTED](VkResult.html)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

|  | [VK_FORMAT_B8G8R8A8_UNORM](VkFormat.html), [VK_FORMAT_R8_UNORM](VkFormat.html) and
| --- | --- |
[VK_FORMAT_G8_B8R8_2PLANE_420_UNORM](VkFormat.html) are initially supported for images
with [optical usage](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#opticalflow-usage)
[VK_OPTICAL_FLOW_USAGE_INPUT_BIT_NV](VkOpticalFlowUsageFlagBitsNV.html).

[VK_FORMAT_R16G16_SFIXED5_NV](VkFormat.html) is initially supported for images with
[optical flow usage](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#opticalflow-usage)
[VK_OPTICAL_FLOW_USAGE_OUTPUT_BIT_NV](VkOpticalFlowUsageFlagBitsNV.html),
[VK_OPTICAL_FLOW_USAGE_HINT_BIT_NV](VkOpticalFlowUsageFlagBitsNV.html) and
[VK_OPTICAL_FLOW_USAGE_GLOBAL_FLOW_BIT_NV](VkOpticalFlowUsageFlagBitsNV.html).

[VK_FORMAT_R8_UINT](VkFormat.html) and [VK_FORMAT_R32_UINT](VkFormat.html) are initially supported
for images with [optical flow usage](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#opticalflow-usage)
[VK_OPTICAL_FLOW_USAGE_COST_BIT_NV](VkOpticalFlowUsageFlagBitsNV.html).
It is recommended to use [VK_FORMAT_R8_UINT](VkFormat.html) because of the lower
bandwidth. |

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkOpticalFlowImageFormatInfoNV](VkOpticalFlowImageFormatInfoNV.html), [VkOpticalFlowImageFormatPropertiesNV](VkOpticalFlowImageFormatPropertiesNV.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#vkGetPhysicalDeviceOpticalFlowImageFormatsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
