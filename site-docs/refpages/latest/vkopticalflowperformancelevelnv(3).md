# VkOpticalFlowPerformanceLevelNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpticalFlowPerformanceLevelNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpticalFlowPerformanceLevelNV - Optical flow performance level types

Optical flow exposes performance levels which the application **can** choose
based on the desired performance and quality requirement.

The optical flow performance level types are defined with the following:

// Provided by VK_NV_optical_flow
typedef enum VkOpticalFlowPerformanceLevelNV {
    VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_UNKNOWN_NV = 0,
    VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_SLOW_NV = 1,
    VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_MEDIUM_NV = 2,
    VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_FAST_NV = 3,
} VkOpticalFlowPerformanceLevelNV;

* 
[VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_SLOW_NV](#) is a level with slower
performance but higher quality.

* 
[VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_MEDIUM_NV](#) is a level with medium
performance and medium quality.

* 
[VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_FAST_NV](#) is a preset with higher
performance but lower quality.

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkOpticalFlowSessionCreateInfoNV](VkOpticalFlowSessionCreateInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#VkOpticalFlowPerformanceLevelNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
