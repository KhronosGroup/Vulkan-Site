# VkDataGraphOpticalFlowImageFormatInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphOpticalFlowImageFormatInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphOpticalFlowImageFormatInfoARM - Structure describing data graph optical flow image format info

The [VkDataGraphOpticalFlowImageFormatInfoARM](#) structure is defined as:

// Provided by VK_ARM_data_graph_optical_flow
typedef struct VkDataGraphOpticalFlowImageFormatInfoARM {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkDataGraphOpticalFlowImageUsageFlagsARM    usage;
} VkDataGraphOpticalFlowImageFormatInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `usage` is a bitmask of
[VkDataGraphOpticalFlowImageUsageFlagBitsARM](VkDataGraphOpticalFlowImageUsageFlagBitsARM.html) describing the
intended optical flow usage of the image.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphOpticalFlowImageFormatInfoARM-sType-sType) VUID-VkDataGraphOpticalFlowImageFormatInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_OPTICAL_FLOW_IMAGE_FORMAT_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphOpticalFlowImageFormatInfoARM-usage-parameter) VUID-VkDataGraphOpticalFlowImageFormatInfoARM-usage-parameter

 `usage` **must** be a valid combination of [VkDataGraphOpticalFlowImageUsageFlagBitsARM](VkDataGraphOpticalFlowImageUsageFlagBitsARM.html) values

* 
[](#VUID-VkDataGraphOpticalFlowImageFormatInfoARM-usage-requiredbitmask) VUID-VkDataGraphOpticalFlowImageFormatInfoARM-usage-requiredbitmask

 `usage` **must** not be `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphOpticalFlowImageUsageFlagsARM](VkDataGraphOpticalFlowImageUsageFlagsARM.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM](vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphOpticalFlowImageFormatInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
