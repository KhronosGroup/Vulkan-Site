# VkViewportWScalingNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkViewportWScalingNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkViewportWScalingNV - Structure specifying a viewport

The `VkViewportWScalingNV` structure is defined as:

// Provided by VK_NV_clip_space_w_scaling
typedef struct VkViewportWScalingNV {
    float    xcoeff;
    float    ycoeff;
} VkViewportWScalingNV;

* 
`xcoeff` and `ycoeff` are the viewport’s W scaling factor for x
and y respectively.

[VK_NV_clip_space_w_scaling](VK_NV_clip_space_w_scaling.html), [VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html), [vkCmdSetViewportWScalingNV](vkCmdSetViewportWScalingNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#VkViewportWScalingNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
