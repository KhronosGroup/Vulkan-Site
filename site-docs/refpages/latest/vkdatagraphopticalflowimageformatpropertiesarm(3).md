# VkDataGraphOpticalFlowImageFormatPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphOpticalFlowImageFormatPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphOpticalFlowImageFormatPropertiesARM - Structure describing properties of an optical flow image format

The [VkDataGraphOpticalFlowImageFormatPropertiesARM](#) structure is
defined as:

// Provided by VK_ARM_data_graph_optical_flow
typedef struct VkDataGraphOpticalFlowImageFormatPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    VkFormat           format;
} VkDataGraphOpticalFlowImageFormatPropertiesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `format` is a [VkFormat](VkFormat.html) that
specifies the format that **can** be used with the specified optical flow
image usages.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphOpticalFlowImageFormatPropertiesARM-sType-sType) VUID-VkDataGraphOpticalFlowImageFormatPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_OPTICAL_FLOW_IMAGE_FORMAT_PROPERTIES_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphOpticalFlowImageFormatPropertiesARM-pNext-pNext) VUID-VkDataGraphOpticalFlowImageFormatPropertiesARM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM](vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphOpticalFlowImageFormatPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
