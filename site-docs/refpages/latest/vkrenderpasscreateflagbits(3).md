# VkRenderPassCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassCreateFlagBits - Bitmask specifying additional properties of a render pass

Bits which **can** be set in [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)::`flags`,
describing additional properties of the render pass, are:

|  | This functionality is superseded by [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkRenderPassCreateFlagBits {
  // Provided by VK_QCOM_render_pass_transform
    VK_RENDER_PASS_CREATE_TRANSFORM_BIT_QCOM = 0x00000002,
  // Provided by VK_VALVE_fragment_density_map_layered
    VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE = 0x00000004,
} VkRenderPassCreateFlagBits;

* 
[VK_RENDER_PASS_CREATE_TRANSFORM_BIT_QCOM](#) specifies that the
created render pass is compatible with
[render pass transform](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-renderpass-transform).

* 
[VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](#)
specifies that the created render pass is usable with layered fragment
density maps.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkRenderPassCreateFlags](VkRenderPassCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
