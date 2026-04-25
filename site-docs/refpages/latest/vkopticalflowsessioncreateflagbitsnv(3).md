# VkOpticalFlowSessionCreateFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpticalFlowSessionCreateFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpticalFlowSessionCreateFlagBitsNV - Bits specifying flags for optical flow session

Bits which **can** be set in
[VkOpticalFlowSessionCreateInfoNV](VkOpticalFlowSessionCreateInfoNV.html)::`flags`, controlling optical
flow session operations, are:

// Provided by VK_NV_optical_flow
typedef enum VkOpticalFlowSessionCreateFlagBitsNV {
    VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_HINT_BIT_NV = 0x00000001,
    VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_COST_BIT_NV = 0x00000002,
    VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_GLOBAL_FLOW_BIT_NV = 0x00000004,
    VK_OPTICAL_FLOW_SESSION_CREATE_ALLOW_REGIONS_BIT_NV = 0x00000008,
    VK_OPTICAL_FLOW_SESSION_CREATE_BOTH_DIRECTIONS_BIT_NV = 0x00000010,
} VkOpticalFlowSessionCreateFlagBitsNV;

* 
[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_HINT_BIT_NV](#) specifies that a
[VkImageView](VkImageView.html) with external flow vectors will be used as hints in
performing the motion search and **must** be bound to
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_HINT_NV](VkOpticalFlowSessionBindingPointNV.html).

* 
[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_COST_BIT_NV](#) specifies that
the cost for the forward flow is generated in a [VkImageView](VkImageView.html) which
**must** be bound to [VK_OPTICAL_FLOW_SESSION_BINDING_POINT_COST_NV](VkOpticalFlowSessionBindingPointNV.html).
Additionally, if
[VK_OPTICAL_FLOW_SESSION_CREATE_BOTH_DIRECTIONS_BIT_NV](#) is also set,
the cost for backward flow is generated in a [VkImageView](VkImageView.html) which
**must** be bound to
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_BACKWARD_COST_NV](VkOpticalFlowSessionBindingPointNV.html).
The cost is the confidence level of the flow vector for each grid in the
frame.
The Cost implies how (in)accurate the flow vector is.
Higher cost value implies the flow vector to be less accurate and
vice-versa.

* 
[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_GLOBAL_FLOW_BIT_NV](#) specifies
that a global flow vector is estimated from forward flow in a single
pixel [VkImageView](VkImageView.html) which **must** be bound to
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_GLOBAL_FLOW_NV](VkOpticalFlowSessionBindingPointNV.html).

* 
[VK_OPTICAL_FLOW_SESSION_CREATE_ALLOW_REGIONS_BIT_NV](#) specifies that
regions of interest **can** be specified in
[VkOpticalFlowExecuteInfoNV](VkOpticalFlowExecuteInfoNV.html).

* 
[VK_OPTICAL_FLOW_SESSION_CREATE_BOTH_DIRECTIONS_BIT_NV](#) specifies
that backward flow is generated in addition to forward flow which is
always generated.

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkOpticalFlowSessionCreateFlagsNV](VkOpticalFlowSessionCreateFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#VkOpticalFlowSessionCreateFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
