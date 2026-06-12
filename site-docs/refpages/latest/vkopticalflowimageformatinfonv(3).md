# VkOpticalFlowImageFormatInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpticalFlowImageFormatInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpticalFlowImageFormatInfoNV - Structure describing optical flow image format info

The [VkOpticalFlowImageFormatInfoNV](#) structure is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkOpticalFlowImageFormatInfoNV {
    VkStructureType              sType;
    const void*                  pNext;
    VkOpticalFlowUsageFlagsNV    usage;
} VkOpticalFlowImageFormatInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `usage` is a bitmask of
[VkOpticalFlowUsageFlagBitsNV](VkOpticalFlowUsageFlagBitsNV.html) describing the intended optical flow
usage of the image.

Valid Usage (Implicit)

* 
[](#VUID-VkOpticalFlowImageFormatInfoNV-sType-sType) VUID-VkOpticalFlowImageFormatInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPTICAL_FLOW_IMAGE_FORMAT_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkOpticalFlowImageFormatInfoNV-usage-parameter) VUID-VkOpticalFlowImageFormatInfoNV-usage-parameter

 `usage` **must** be a valid combination of [VkOpticalFlowUsageFlagBitsNV](VkOpticalFlowUsageFlagBitsNV.html) values

* 
[](#VUID-VkOpticalFlowImageFormatInfoNV-usage-requiredbitmask) VUID-VkOpticalFlowImageFormatInfoNV-usage-requiredbitmask

 `usage` **must** not be `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkOpticalFlowUsageFlagsNV](VkOpticalFlowUsageFlagsNV.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceOpticalFlowImageFormatsNV](vkGetPhysicalDeviceOpticalFlowImageFormatsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#VkOpticalFlowImageFormatInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
