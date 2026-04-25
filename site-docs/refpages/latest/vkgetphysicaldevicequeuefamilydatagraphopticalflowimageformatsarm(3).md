# vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM - Query image formats for data graph optical flow

To enumerate the supported image formats for a specific data graph optical
flow usage, call:

// Provided by VK_ARM_data_graph_optical_flow
VkResult vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    const VkQueueFamilyDataGraphPropertiesARM*  pQueueFamilyDataGraphProperties,
    const VkDataGraphOpticalFlowImageFormatInfoARM* pOpticalFlowImageFormatInfo,
    uint32_t*                                   pFormatCount,
    VkDataGraphOpticalFlowImageFormatPropertiesARM* pImageFormatProperties);

* 
`physicalDevice` is the physical device being queried.

* 
`queueFamilyIndex` is the index of the queue family being queried.

* 
`pQueueFamilyDataGraphProperties` is a pointer to a
[VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html) structure that selects the
processing engine and operation set for which the properties are
queried.

* 
`pOpticalFlowImageFormatInfo` is a pointer to a
[VkDataGraphOpticalFlowImageFormatInfoARM](VkDataGraphOpticalFlowImageFormatInfoARM.html) structure specifying the
optical flow usage for which information is returned.

* 
`pFormatCount` is a pointer to an integer related to the number of
optical flow properties available or queried, as described below.

* 
`pImageFormatProperties` is a pointer to an array of
[VkDataGraphOpticalFlowImageFormatPropertiesARM](VkDataGraphOpticalFlowImageFormatPropertiesARM.html) structures in which
supported formats and image parameters are returned.

If `pImageFormatProperties` is `NULL`, then the number of optical flow
properties supported for the given `physicalDevice` is returned in
`pFormatCount`.
Otherwise, `pFormatCount` **must** point to a variable set by the user to
the number of elements in the `pImageFormatProperties` array, and on
return the variable is overwritten with the number of values actually
written to `pImageFormatProperties`.
If the value of `pFormatCount` is less than the number of optical flow
properties supported, at most `pFormatCount` values will be written to
`pImageFormatProperties`, and [VK_INCOMPLETE](VkResult.html) will be returned
instead of [VK_SUCCESS](VkResult.html), to indicate that not all the available values
were returned.
Before creating an image to be used as a optical flow image, obtain the
supported image creation parameters by querying with
[vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html) and
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) using one of the reported
formats and adding [VkDataGraphOpticalFlowImageFormatInfoARM](VkDataGraphOpticalFlowImageFormatInfoARM.html) to the
`pNext` chain of [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html).
When querying the parameters with
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) for images used for optical
flow operations, the
[VkDataGraphOpticalFlowImageFormatInfoARM](VkDataGraphOpticalFlowImageFormatInfoARM.html)::`usage` field should
contain one or more of the bits defined in
[VkDataGraphOpticalFlowImageUsageFlagBitsARM](VkDataGraphOpticalFlowImageUsageFlagBitsARM.html).

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM-pQueueFamilyDataGraphProperties-09965) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM-pQueueFamilyDataGraphProperties-09965

`pQueueFamilyDataGraphProperties` **must** point to a structure whose
`operation` member has its `name` member equal to `OpticalFlow`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM-physicalDevice-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM-pQueueFamilyDataGraphProperties-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM-pQueueFamilyDataGraphProperties-parameter

 `pQueueFamilyDataGraphProperties` **must** be a valid pointer to a valid [VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html) structure

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM-pOpticalFlowImageFormatInfo-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM-pOpticalFlowImageFormatInfo-parameter

 `pOpticalFlowImageFormatInfo` **must** be a valid pointer to a valid [VkDataGraphOpticalFlowImageFormatInfoARM](VkDataGraphOpticalFlowImageFormatInfoARM.html) structure

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM-pFormatCount-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM-pFormatCount-parameter

 `pFormatCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM-pImageFormatProperties-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM-pImageFormatProperties-parameter

 If the value referenced by `pFormatCount` is not `0`, and `pImageFormatProperties` is not `NULL`, `pImageFormatProperties` **must** be a valid pointer to an array of `pFormatCount` [VkDataGraphOpticalFlowImageFormatPropertiesARM](VkDataGraphOpticalFlowImageFormatPropertiesARM.html) structures

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

|  | [VK_FORMAT_B8G8R8A8_UNORM](VkFormat.html), [VK_FORMAT_R8G8B8A8_UNORM](VkFormat.html),
| --- | --- |
[VK_FORMAT_R8G8B8_UNORM](VkFormat.html), [VK_FORMAT_B8G8R8_UNORM](VkFormat.html),
[VK_FORMAT_R8_UNORM](VkFormat.html), and [VK_FORMAT_B10G11R11_UFLOAT_PACK32](VkFormat.html) are
initially supported for images with [optical flow usage](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#opticalflow-usageARM) [VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_INPUT_BIT_ARM](VkDataGraphOpticalFlowImageUsageFlagBitsARM.html).

[VK_FORMAT_R16G16_SFLOAT](VkFormat.html) is initially supported for images with
[optical flow usage](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#opticalflow-usageARM)
[VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_OUTPUT_BIT_ARM](VkDataGraphOpticalFlowImageUsageFlagBitsARM.html) and
[VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_HINT_BIT_ARM](VkDataGraphOpticalFlowImageUsageFlagBitsARM.html).

[VK_FORMAT_R16_UINT](VkFormat.html) is initially supported for images with
[optical flow usage](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#opticalflow-usageARM)
[VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_COST_BIT_ARM](VkDataGraphOpticalFlowImageUsageFlagBitsARM.html). |

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphOpticalFlowImageFormatInfoARM](VkDataGraphOpticalFlowImageFormatInfoARM.html), [VkDataGraphOpticalFlowImageFormatPropertiesARM](VkDataGraphOpticalFlowImageFormatPropertiesARM.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
