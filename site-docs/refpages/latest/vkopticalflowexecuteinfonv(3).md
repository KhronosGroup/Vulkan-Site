# VkOpticalFlowExecuteInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpticalFlowExecuteInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpticalFlowExecuteInfoNV - Structure specifying parameters of an optical flow vector calculation

The [VkOpticalFlowExecuteInfoNV](#) structure is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkOpticalFlowExecuteInfoNV {
    VkStructureType                sType;
    void*                          pNext;
    VkOpticalFlowExecuteFlagsNV    flags;
    uint32_t                       regionCount;
    const VkRect2D*                pRegions;
} VkOpticalFlowExecuteInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` are the [VkOpticalFlowExecuteFlagsNV](VkOpticalFlowExecuteFlagsNV.html) used for this
command.

* 
`regionCount` is the number of regions of interest specified in
`pRegions`.

* 
`pRegions` is a pointer to `regionCount` `VkRect2D` regions
of interest.

Valid Usage

* 
[](#VUID-VkOpticalFlowExecuteInfoNV-regionCount-07593) VUID-VkOpticalFlowExecuteInfoNV-regionCount-07593

`regionCount` **must** be 0 if
[VK_OPTICAL_FLOW_SESSION_CREATE_ALLOW_REGIONS_BIT_NV](VkOpticalFlowSessionCreateFlagBitsNV.html) was not set
for `VkOpticalFlowSessionNV` on which this command is operating

Valid Usage (Implicit)

* 
[](#VUID-VkOpticalFlowExecuteInfoNV-sType-sType) VUID-VkOpticalFlowExecuteInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPTICAL_FLOW_EXECUTE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkOpticalFlowExecuteInfoNV-pNext-pNext) VUID-VkOpticalFlowExecuteInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkOpticalFlowExecuteInfoNV-flags-parameter) VUID-VkOpticalFlowExecuteInfoNV-flags-parameter

 `flags` **must** be a valid combination of [VkOpticalFlowExecuteFlagBitsNV](VkOpticalFlowExecuteFlagBitsNV.html) values

* 
[](#VUID-VkOpticalFlowExecuteInfoNV-pRegions-parameter) VUID-VkOpticalFlowExecuteInfoNV-pRegions-parameter

 If `regionCount` is not `0`, `pRegions` **must** be a valid pointer to an array of `regionCount` [VkRect2D](VkRect2D.html) structures

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkOpticalFlowExecuteFlagsNV](VkOpticalFlowExecuteFlagsNV.html), [VkRect2D](VkRect2D.html), [VkStructureType](VkStructureType.html), [vkCmdOpticalFlowExecuteNV](vkCmdOpticalFlowExecuteNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#VkOpticalFlowExecuteInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
