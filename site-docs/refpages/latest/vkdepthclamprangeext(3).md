# VkDepthClampRangeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDepthClampRangeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDepthClampRangeEXT - Structure specifying a depth clamp range

The `VkDepthClampRangeEXT` structure is defined as:

// Provided by VK_EXT_depth_clamp_control
typedef struct VkDepthClampRangeEXT {
    float    minDepthClamp;
    float    maxDepthClamp;
} VkDepthClampRangeEXT;

* 
`minDepthClamp` sets zmin in the depth clamp range of the
viewport.

* 
`maxDepthClamp` sets zmax in the depth clamp range of the
viewport.

Valid Usage

* 
[](#VUID-VkDepthClampRangeEXT-pDepthClampRange-00999) VUID-VkDepthClampRangeEXT-pDepthClampRange-00999

`minDepthClamp` **must** be less than or equal to `maxDepthClamp`

* 
[](#VUID-VkDepthClampRangeEXT-pDepthClampRange-09648) VUID-VkDepthClampRangeEXT-pDepthClampRange-09648

If the `[VK_EXT_depth_range_unrestricted](VK_EXT_depth_range_unrestricted.html)` extension is not
enabled,
`minDepthClamp` **must** be greater than or equal to `0.0`

* 
[](#VUID-VkDepthClampRangeEXT-pDepthClampRange-09649) VUID-VkDepthClampRangeEXT-pDepthClampRange-09649

If the `[VK_EXT_depth_range_unrestricted](VK_EXT_depth_range_unrestricted.html)` extension is not
enabled,
`maxDepthClamp` **must** be less than or equal to `1.0`

[VK_EXT_depth_clamp_control](VK_EXT_depth_clamp_control.html), [VkPipelineViewportDepthClampControlCreateInfoEXT](VkPipelineViewportDepthClampControlCreateInfoEXT.html), [vkCmdSetDepthClampRangeEXT](vkCmdSetDepthClampRangeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkDepthClampRangeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
