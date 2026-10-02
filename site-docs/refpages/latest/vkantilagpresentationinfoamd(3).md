# VkAntiLagPresentationInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAntiLagPresentationInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAntiLagPresentationInfoAMD - Structure specifying information about stage

The `VkAntiLagPresentationInfoAMD` structure is defined as:

// Provided by VK_AMD_anti_lag
typedef struct VkAntiLagPresentationInfoAMD {
    VkStructureType      sType;
    void*                pNext;
    VkAntiLagStageAMD    stage;
    uint64_t             frameIndex;
} VkAntiLagPresentationInfoAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stage` is a [VkAntiLagStageAMD](VkAntiLagStageAMD.html) value specifying the current
application stage.

* 
`frameIndex` is set just before the application processes input data
([VK_ANTI_LAG_STAGE_INPUT_AMD](VkAntiLagStageAMD.html)).
The same `frameIndex` value **should** be set before the frame with
current input data will be presented by [vkQueuePresentKHR](vkQueuePresentKHR.html)
([VK_ANTI_LAG_STAGE_PRESENT_AMD](VkAntiLagStageAMD.html)).
This **should** be done for each frame.

This structure specifies information about the presentation stage for which
anti-lag parameters are being set.

Valid Usage (Implicit)

* 
[](#VUID-VkAntiLagPresentationInfoAMD-sType-sType) VUID-VkAntiLagPresentationInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANTI_LAG_PRESENTATION_INFO_AMD](VkStructureType.html)

* 
[](#VUID-VkAntiLagPresentationInfoAMD-stage-parameter) VUID-VkAntiLagPresentationInfoAMD-stage-parameter

 `stage` **must** be a valid [VkAntiLagStageAMD](VkAntiLagStageAMD.html) value

[VK_AMD_anti_lag](VK_AMD_anti_lag.html), [VkAntiLagDataAMD](VkAntiLagDataAMD.html), [VkAntiLagStageAMD](VkAntiLagStageAMD.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkAntiLagPresentationInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
