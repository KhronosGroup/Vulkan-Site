# VkOpticalFlowExecuteFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpticalFlowExecuteFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpticalFlowExecuteFlagBitsNV - Bits specifying flags for an optical flow vector calculation

Bits which **can** be set in [VkOpticalFlowExecuteInfoNV](VkOpticalFlowExecuteInfoNV.html)::`flags`,
controlling optical flow execution, are:

// Provided by VK_NV_optical_flow
typedef enum VkOpticalFlowExecuteFlagBitsNV {
    VK_OPTICAL_FLOW_EXECUTE_DISABLE_TEMPORAL_HINTS_BIT_NV = 0x00000001,
} VkOpticalFlowExecuteFlagBitsNV;

* 
[VK_OPTICAL_FLOW_EXECUTE_DISABLE_TEMPORAL_HINTS_BIT_NV](#) specifies
that temporal hints from previously generated flow vectors are not used.
If temporal hints are enabled, optical flow vectors from previous
[vkCmdOpticalFlowExecuteNV](vkCmdOpticalFlowExecuteNV.html) call are automatically used as hints for
the current [vkCmdOpticalFlowExecuteNV](vkCmdOpticalFlowExecuteNV.html) call, to take advantage of
temporal correlation in a video sequence.
Temporal hints should be disabled if there is a-priori knowledge of no
temporal correlation (e.g. a scene change, independent successive frame
pairs).

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkOpticalFlowExecuteFlagsNV](VkOpticalFlowExecuteFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#VkOpticalFlowExecuteFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
