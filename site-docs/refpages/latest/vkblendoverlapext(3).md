# VkBlendOverlapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBlendOverlapEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBlendOverlapEXT - Enumerant specifying the blend overlap parameter

The weighting functions p0, p1, and p2 are defined
in table [Advanced Blend Overlap Modes](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blend-advanced-overlap-modes).
In these functions, the A components of the source and destination colors
are taken to indicate the portion of the pixel covered by the fragment
(source) and the fragments previously accumulated in the pixel
(destination).
The functions p0, p1, and p2 approximate the
relative portion of the pixel covered by the intersection of the source and
destination, covered only by the source, and covered only by the
destination, respectively.

Possible values of
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html)::`blendOverlap`,
specifying the blend overlap functions, are:

// Provided by VK_EXT_blend_operation_advanced
typedef enum VkBlendOverlapEXT {
    VK_BLEND_OVERLAP_UNCORRELATED_EXT = 0,
    VK_BLEND_OVERLAP_DISJOINT_EXT = 1,
    VK_BLEND_OVERLAP_CONJOINT_EXT = 2,
} VkBlendOverlapEXT;

* 
[VK_BLEND_OVERLAP_UNCORRELATED_EXT](#) specifies that there is no
correlation between the source and destination coverage.

* 
[VK_BLEND_OVERLAP_CONJOINT_EXT](#) specifies that the source and
destination coverage are considered to have maximal overlap.

* 
[VK_BLEND_OVERLAP_DISJOINT_EXT](#) specifies that the source and
destination coverage are considered to have minimal overlap.

| Overlap Mode | Weighting Equations |
| --- | --- |
| [VK_BLEND_OVERLAP_UNCORRELATED_EXT](#) |  |
| [VK_BLEND_OVERLAP_CONJOINT_EXT](#) |  |
| [VK_BLEND_OVERLAP_DISJOINT_EXT](#) |  |

[VK_EXT_blend_operation_advanced](VK_EXT_blend_operation_advanced.html), [VkColorBlendAdvancedEXT](VkColorBlendAdvancedEXT.html), [VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#VkBlendOverlapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
