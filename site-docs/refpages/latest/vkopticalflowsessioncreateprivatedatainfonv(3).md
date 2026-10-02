# VkOpticalFlowSessionCreatePrivateDataInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpticalFlowSessionCreatePrivateDataInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpticalFlowSessionCreatePrivateDataInfoNV - Structure for NV internal use only

The [VkOpticalFlowSessionCreatePrivateDataInfoNV](#) structure is for NV
internal use only and is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkOpticalFlowSessionCreatePrivateDataInfoNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           id;
    uint32_t           size;
    const void*        pPrivateData;
} VkOpticalFlowSessionCreatePrivateDataInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`id` is an identifier for data which is passed at a memory location
specified in
`VkOpticalFlowSessionCreatePrivateDataInfoNV`::`pPrivateData`.

* 
`size` is the size of data in bytes which is passed at a memory
location specified in
`VkOpticalFlowSessionCreatePrivateDataInfoNV`::`pPrivateData`.

* 
`pPrivateData` is a pointer to NV internal data.

Valid Usage (Implicit)

* 
[](#VUID-VkOpticalFlowSessionCreatePrivateDataInfoNV-sType-sType) VUID-VkOpticalFlowSessionCreatePrivateDataInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPTICAL_FLOW_SESSION_CREATE_PRIVATE_DATA_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkOpticalFlowSessionCreatePrivateDataInfoNV-pPrivateData-parameter) VUID-VkOpticalFlowSessionCreatePrivateDataInfoNV-pPrivateData-parameter

 `pPrivateData` **must** be a pointer value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkOpticalFlowSessionCreateInfoNV](VkOpticalFlowSessionCreateInfoNV.html)

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#VkOpticalFlowSessionCreatePrivateDataInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
