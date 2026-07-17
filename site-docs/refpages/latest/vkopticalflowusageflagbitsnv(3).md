# VkOpticalFlowUsageFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpticalFlowUsageFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpticalFlowUsageFlagBitsNV - Bits specifying usage for optical flow operations

Bits which **can** be set in [VkOpticalFlowImageFormatInfoNV](VkOpticalFlowImageFormatInfoNV.html)::`usage`,
controlling optical flow usage, are:

// Provided by VK_NV_optical_flow
typedef enum VkOpticalFlowUsageFlagBitsNV {
    VK_OPTICAL_FLOW_USAGE_UNKNOWN_NV = 0,
    VK_OPTICAL_FLOW_USAGE_INPUT_BIT_NV = 0x00000001,
    VK_OPTICAL_FLOW_USAGE_OUTPUT_BIT_NV = 0x00000002,
    VK_OPTICAL_FLOW_USAGE_HINT_BIT_NV = 0x00000004,
    VK_OPTICAL_FLOW_USAGE_COST_BIT_NV = 0x00000008,
    VK_OPTICAL_FLOW_USAGE_GLOBAL_FLOW_BIT_NV = 0x00000010,
} VkOpticalFlowUsageFlagBitsNV;

* 
[VK_OPTICAL_FLOW_USAGE_INPUT_BIT_NV](#) specifies that the image **can**
be used as input or reference frame for an optical flow operation.

* 
[VK_OPTICAL_FLOW_USAGE_OUTPUT_BIT_NV](#) specifies that the image **can**
be used as output flow vector map for an optical flow operation.

* 
[VK_OPTICAL_FLOW_USAGE_HINT_BIT_NV](#) specifies that the image **can** be
used as hint flow vector map for an optical flow operation.

* 
[VK_OPTICAL_FLOW_USAGE_COST_BIT_NV](#) specifies that the image **can** be
used as output cost map for an optical flow operation.

* 
[VK_OPTICAL_FLOW_USAGE_GLOBAL_FLOW_BIT_NV](#) specifies that the image
**can** be used as global flow vector for an optical flow operation.

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkOpticalFlowUsageFlagsNV](VkOpticalFlowUsageFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#VkOpticalFlowUsageFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
