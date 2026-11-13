# VkDepthClampModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDepthClampModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDepthClampModeEXT - Modes that determine the depth clamp range

Possible values of
[VkPipelineViewportDepthClampControlCreateInfoEXT](VkPipelineViewportDepthClampControlCreateInfoEXT.html)::`depthClampMode`,
specifying which range should be used for depth clamping, are:

// Provided by VK_EXT_depth_clamp_control
typedef enum VkDepthClampModeEXT {
    VK_DEPTH_CLAMP_MODE_VIEWPORT_RANGE_EXT = 0,
    VK_DEPTH_CLAMP_MODE_USER_DEFINED_RANGE_EXT = 1,
} VkDepthClampModeEXT;

* 
[VK_DEPTH_CLAMP_MODE_VIEWPORT_RANGE_EXT](#) specifies that the depth
clamp range follows the viewport depth range.
The depth clamp range of each viewport will implicitly be set to
zmin = min(n,f) and zmax = max(n,f), where n and
f are the `minDepth` and `maxDepth` depth range values of
the viewport.

* 
[VK_DEPTH_CLAMP_MODE_USER_DEFINED_RANGE_EXT](#) specifies that a single
user-defined depth clamp range will be used for all viewports.
The user-defined depth clamp range is defined by the `minDepthClamp`
and `maxDepthClamp` members of [VkDepthClampRangeEXT](VkDepthClampRangeEXT.html).

[VK_EXT_depth_clamp_control](VK_EXT_depth_clamp_control.html), [VkPipelineViewportDepthClampControlCreateInfoEXT](VkPipelineViewportDepthClampControlCreateInfoEXT.html), [vkCmdSetDepthClampRangeEXT](vkCmdSetDepthClampRangeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkDepthClampModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
