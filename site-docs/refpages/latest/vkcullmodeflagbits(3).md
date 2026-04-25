# VkCullModeFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCullModeFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCullModeFlagBits - Bitmask controlling triangle culling

Once the orientation of triangles is determined, they are culled according
to the [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)::`cullMode` property
of the currently active pipeline.
Possible values are:

// Provided by VK_VERSION_1_0
typedef enum VkCullModeFlagBits {
    VK_CULL_MODE_NONE = 0,
    VK_CULL_MODE_FRONT_BIT = 0x00000001,
    VK_CULL_MODE_BACK_BIT = 0x00000002,
    VK_CULL_MODE_FRONT_AND_BACK = 0x00000003,
} VkCullModeFlagBits;

* 
[VK_CULL_MODE_NONE](#) specifies that no triangles are discarded

* 
[VK_CULL_MODE_FRONT_BIT](#) specifies that front-facing triangles are
discarded

* 
[VK_CULL_MODE_BACK_BIT](#) specifies that back-facing triangles are
discarded

* 
[VK_CULL_MODE_FRONT_AND_BACK](#) specifies that all triangles are
discarded.

Following culling, fragments are produced for any triangles which have not
been discarded.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCullModeFlags](VkCullModeFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkCullModeFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
