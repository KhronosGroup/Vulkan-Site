# VkOpticalFlowGridSizeFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpticalFlowGridSizeFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpticalFlowGridSizeFlagBitsNV - Bits specifying grid sizes for optical flow operations

Optical flow vectors are generated block-wise, one vector for each block of
NxN pixels (referred to as grid).

Bits which **can** be set in
[VkOpticalFlowSessionCreateInfoNV](VkOpticalFlowSessionCreateInfoNV.html)::`outputGridSize` and
[VkOpticalFlowSessionCreateInfoNV](VkOpticalFlowSessionCreateInfoNV.html)::`hintGridSize`, or which are
returned in
[VkPhysicalDeviceOpticalFlowPropertiesNV](VkPhysicalDeviceOpticalFlowPropertiesNV.html)::`supportedOutputGridSizes`
and
[VkPhysicalDeviceOpticalFlowPropertiesNV](VkPhysicalDeviceOpticalFlowPropertiesNV.html)::`supportedHintGridSizes`
controlling optical flow grid sizes, are:

// Provided by VK_NV_optical_flow
typedef enum VkOpticalFlowGridSizeFlagBitsNV {
    VK_OPTICAL_FLOW_GRID_SIZE_UNKNOWN_NV = 0,
    VK_OPTICAL_FLOW_GRID_SIZE_1X1_BIT_NV = 0x00000001,
    VK_OPTICAL_FLOW_GRID_SIZE_2X2_BIT_NV = 0x00000002,
    VK_OPTICAL_FLOW_GRID_SIZE_4X4_BIT_NV = 0x00000004,
    VK_OPTICAL_FLOW_GRID_SIZE_8X8_BIT_NV = 0x00000008,
} VkOpticalFlowGridSizeFlagBitsNV;

* 
[VK_OPTICAL_FLOW_GRID_SIZE_1X1_BIT_NV](#) specifies that grid is 1x1
pixel.

* 
[VK_OPTICAL_FLOW_GRID_SIZE_2X2_BIT_NV](#) specifies that grid is 2x2
pixel.

* 
[VK_OPTICAL_FLOW_GRID_SIZE_4X4_BIT_NV](#) specifies that grid is 4x4
pixel.

* 
[VK_OPTICAL_FLOW_GRID_SIZE_8X8_BIT_NV](#) specifies that grid is 8x8
pixel.

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkOpticalFlowGridSizeFlagsNV](VkOpticalFlowGridSizeFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#VkOpticalFlowGridSizeFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
