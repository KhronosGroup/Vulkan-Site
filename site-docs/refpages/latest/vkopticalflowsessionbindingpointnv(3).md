# VkOpticalFlowSessionBindingPointNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpticalFlowSessionBindingPointNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpticalFlowSessionBindingPointNV - Binding points of an optical flow session

The optical flow session binding points are defined with the following:

// Provided by VK_NV_optical_flow
typedef enum VkOpticalFlowSessionBindingPointNV {
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_UNKNOWN_NV = 0,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_INPUT_NV = 1,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_REFERENCE_NV = 2,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_HINT_NV = 3,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_FLOW_VECTOR_NV = 4,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_BACKWARD_FLOW_VECTOR_NV = 5,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_COST_NV = 6,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_BACKWARD_COST_NV = 7,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_GLOBAL_FLOW_NV = 8,
} VkOpticalFlowSessionBindingPointNV;

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_INPUT_NV](#) specifies the
binding point for the input frame.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_REFERENCE_NV](#) specifies the
binding point for the input reference frame.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_HINT_NV](#) specifies the
binding point for the optional external hint flow vectors.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_FLOW_VECTOR_NV](#) specifies the
binding point for output flow vectors of default forward flow
calculation.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_BACKWARD_FLOW_VECTOR_NV](#)
specifies the binding point for the optional output flow vector map of
optional backward flow calculation.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_COST_NV](#) specifies the
binding point for the optional output cost map of default forward flow
calculation.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_BACKWARD_COST_NV](#) specifies
the binding point for the optional output cost map of optional backward
flow calculation.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_GLOBAL_FLOW_NV](#) specifies the
binding point for the optional global flow value of default forward flow
calculation.

[VK_NV_optical_flow](VK_NV_optical_flow.html), [vkBindOpticalFlowSessionImageNV](vkBindOpticalFlowSessionImageNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#VkOpticalFlowSessionBindingPointNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
