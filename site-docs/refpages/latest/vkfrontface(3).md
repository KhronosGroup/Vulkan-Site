# VkFrontFace(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFrontFace.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFrontFace - Interpret polygon front-facing orientation

The first step of polygon rasterization is to determine whether the triangle
is *back-facing* or *front-facing*.
This determination is made based on the sign of the (clipped or unclipped)
polygon’s area computed in framebuffer coordinates.
One way to compute this area is:

  

  

where    and    are the x and y
framebuffer coordinates of the ith vertex of the n-vertex
polygon (vertices are numbered starting at zero for the purposes of this
computation) and i ⊕ 1 is (i +  1) mod n.

The interpretation of the sign of a is determined by the
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)::`frontFace` property of
the currently active pipeline.
Possible values are:

// Provided by VK_VERSION_1_0
typedef enum VkFrontFace {
    VK_FRONT_FACE_COUNTER_CLOCKWISE = 0,
    VK_FRONT_FACE_CLOCKWISE = 1,
} VkFrontFace;

* 
[VK_FRONT_FACE_COUNTER_CLOCKWISE](#) specifies that a triangle with
positive area is considered front-facing.

* 
[VK_FRONT_FACE_CLOCKWISE](#) specifies that a triangle with negative
area is considered front-facing.

Any triangle which is not front-facing is back-facing, including zero-area
triangles.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html), [vkCmdSetFrontFace](vkCmdSetFrontFace.html), [vkCmdSetFrontFace](vkCmdSetFrontFace.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkFrontFace).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
