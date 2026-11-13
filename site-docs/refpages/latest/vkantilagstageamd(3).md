# VkAntiLagStageAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAntiLagStageAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAntiLagStageAMD - Report the application stage

Possible values of [VkAntiLagPresentationInfoAMD](VkAntiLagPresentationInfoAMD.html)::`stage`,
specifying the current application stage, are:

// Provided by VK_AMD_anti_lag
typedef enum VkAntiLagStageAMD {
    VK_ANTI_LAG_STAGE_INPUT_AMD = 0,
    VK_ANTI_LAG_STAGE_PRESENT_AMD = 1,
} VkAntiLagStageAMD;

* 
[VK_ANTI_LAG_STAGE_INPUT_AMD](#) specifies the stage before processing
input.

* 
[VK_ANTI_LAG_STAGE_PRESENT_AMD](#) specifies the stage before
[vkQueuePresentKHR](vkQueuePresentKHR.html).

[VK_AMD_anti_lag](VK_AMD_anti_lag.html), [VkAntiLagPresentationInfoAMD](VkAntiLagPresentationInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkAntiLagStageAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
