# VkSubpassDescriptionFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubpassDescriptionFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubpassDescriptionFlagBits - Bitmask specifying usage of a subpass

Bits which **can** be set in [VkSubpassDescription](VkSubpassDescription.html)::`flags`,
specifying usage of the subpass, are:

|  | This functionality is superseded by [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkSubpassDescriptionFlagBits {
  // Provided by VK_NVX_multiview_per_view_attributes
    VK_SUBPASS_DESCRIPTION_PER_VIEW_ATTRIBUTES_BIT_NVX = 0x00000001,
  // Provided by VK_NVX_multiview_per_view_attributes
    VK_SUBPASS_DESCRIPTION_PER_VIEW_POSITION_X_ONLY_BIT_NVX = 0x00000002,
  // Provided by VK_QCOM_tile_shading
    VK_SUBPASS_DESCRIPTION_TILE_SHADING_APRON_BIT_QCOM = 0x00000100,
  // Provided by VK_EXT_rasterization_order_attachment_access
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT = 0x00000010,
  // Provided by VK_EXT_rasterization_order_attachment_access
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT = 0x00000020,
  // Provided by VK_EXT_rasterization_order_attachment_access
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT = 0x00000040,
  // Provided by VK_EXT_legacy_dithering
    VK_SUBPASS_DESCRIPTION_ENABLE_LEGACY_DITHERING_BIT_EXT = 0x00000080,
  // Provided by VK_EXT_custom_resolve
    VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT = 0x00000004,
  // Provided by VK_EXT_custom_resolve
    VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT = 0x00000008,
  // Provided by VK_QCOM_render_pass_shader_resolve
    VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_QCOM = VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT,
  // Provided by VK_QCOM_render_pass_shader_resolve
    VK_SUBPASS_DESCRIPTION_SHADER_RESOLVE_BIT_QCOM = VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT,
  // Provided by VK_ARM_rasterization_order_attachment_access
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_ARM = VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT,
  // Provided by VK_ARM_rasterization_order_attachment_access
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_ARM = VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT,
  // Provided by VK_ARM_rasterization_order_attachment_access
    VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_ARM = VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT,
} VkSubpassDescriptionFlagBits;

* 
[VK_SUBPASS_DESCRIPTION_PER_VIEW_ATTRIBUTES_BIT_NVX](#) specifies that
shaders compiled for this subpass write the attributes for all views in
a single invocation of each
[pre-rasterization shader    stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization).
All pipelines compiled against a subpass that includes this bit **must**
write per-view attributes to the `*PerViewNV[]` shader outputs, in
addition to the non-per-view (e.g. `Position`) outputs.

* 
[VK_SUBPASS_DESCRIPTION_PER_VIEW_POSITION_X_ONLY_BIT_NVX](#) specifies
that shaders compiled for this subpass use per-view positions which only
differ in value in the x component.
Per-view viewport mask **can** also be used.

* 
[VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT](#) specifies that the
framebuffer region is the fragment region, that is, the minimum region
dependencies are by pixel rather than by sample, such that any fragment
shader invocation **can** access any sample associated with that fragment
shader invocation.

* 
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](#) specifies that the
subpass performs shader resolve operations.

* 
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT](#)
specifies that this subpass supports pipelines created with
[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](VkPipelineColorBlendStateCreateFlagBits.html).

* 
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](#)
specifies that this subpass supports pipelines created with
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](VkPipelineDepthStencilStateCreateFlagBits.html).

* 
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](#)
specifies that this subpass supports pipelines created with
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](VkPipelineDepthStencilStateCreateFlagBits.html).

* 
[VK_SUBPASS_DESCRIPTION_ENABLE_LEGACY_DITHERING_BIT_EXT](#) specifies
that [Legacy Dithering](../../../../spec/latest/chapters/interfaces.html#interfaces-legacy-dithering) is enabled for
this subpass.

* 
[VK_SUBPASS_DESCRIPTION_TILE_SHADING_APRON_BIT_QCOM](#) specifies that
[apron regions](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading-aprons) **can** be read within
this subpass when [tile shading is enabled](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading).

|  | Shader resolve operations allow for custom resolve operations, but
| --- | --- |
overdrawing pixels **may** have a performance and/or power cost.
Furthermore, since the content of any depth stencil attachment or color
attachment is **undefined** at the beginning of a shader resolve subpass, any
depth testing, stencil testing, or blending operation which sources these
**undefined** values also has **undefined** result value. |

|  | There is no equivalent to
| --- | --- |
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT](#),
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](#),
or
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](#)
for render pass instances begun with [vkCmdBeginRendering](vkCmdBeginRendering.html).
For such render passes, only the corresponding pipeline flags are specified. |

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkSubpassDescriptionFlags](VkSubpassDescriptionFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkSubpassDescriptionFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
