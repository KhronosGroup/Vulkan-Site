# VkOpticalFlowImageFormatPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpticalFlowImageFormatPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpticalFlowImageFormatPropertiesNV - Structure describing properties of an optical flow image format

The [VkOpticalFlowImageFormatPropertiesNV](#) structure is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkOpticalFlowImageFormatPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    VkFormat           format;
} VkOpticalFlowImageFormatPropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `format` is a [VkFormat](VkFormat.html) that specifies
the format that can be used with the specified optical flow image
usages.

Valid Usage (Implicit)

* 
[](#VUID-VkOpticalFlowImageFormatPropertiesNV-sType-sType) VUID-VkOpticalFlowImageFormatPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPTICAL_FLOW_IMAGE_FORMAT_PROPERTIES_NV](VkStructureType.html)

* 
[](#VUID-VkOpticalFlowImageFormatPropertiesNV-pNext-pNext) VUID-VkOpticalFlowImageFormatPropertiesNV-pNext-pNext

 `pNext` **must** be `NULL`

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceOpticalFlowImageFormatsNV](vkGetPhysicalDeviceOpticalFlowImageFormatsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#VkOpticalFlowImageFormatPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
