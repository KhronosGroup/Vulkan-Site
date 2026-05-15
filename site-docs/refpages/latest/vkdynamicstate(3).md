# VkDynamicState(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDynamicState.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDynamicState - Indicate which dynamic state is taken from dynamic state commands

The source of different pieces of dynamic state is specified by the
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates` property of the
currently active pipeline, each of whose elements **must** be one of the
values:

// Provided by VK_VERSION_1_0
typedef enum VkDynamicState {
    VK_DYNAMIC_STATE_VIEWPORT = 0,
    VK_DYNAMIC_STATE_SCISSOR = 1,
    VK_DYNAMIC_STATE_LINE_WIDTH = 2,
    VK_DYNAMIC_STATE_DEPTH_BIAS = 3,
    VK_DYNAMIC_STATE_BLEND_CONSTANTS = 4,
    VK_DYNAMIC_STATE_DEPTH_BOUNDS = 5,
    VK_DYNAMIC_STATE_STENCIL_COMPARE_MASK = 6,
    VK_DYNAMIC_STATE_STENCIL_WRITE_MASK = 7,
    VK_DYNAMIC_STATE_STENCIL_REFERENCE = 8,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_CULL_MODE = 1000267000,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_FRONT_FACE = 1000267001,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY = 1000267002,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT = 1000267003,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT = 1000267004,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE = 1000267005,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE = 1000267006,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE = 1000267007,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_DEPTH_COMPARE_OP = 1000267008,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE = 1000267009,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE = 1000267010,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_STENCIL_OP = 1000267011,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE = 1000377001,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE = 1000377002,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE = 1000377004,
  // Provided by VK_VERSION_1_4
    VK_DYNAMIC_STATE_LINE_STIPPLE = 1000259000,
  // Provided by VK_NV_clip_space_w_scaling
    VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV = 1000087000,
  // Provided by VK_EXT_discard_rectangles
    VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT = 1000099000,
  // Provided by VK_EXT_discard_rectangles
    VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT = 1000099001,
  // Provided by VK_EXT_discard_rectangles
    VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT = 1000099002,
  // Provided by VK_EXT_sample_locations
    VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT = 1000143000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR = 1000347000,
  // Provided by VK_NV_shading_rate_image
    VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV = 1000164004,
  // Provided by VK_NV_shading_rate_image
    VK_DYNAMIC_STATE_VIEWPORT_COARSE_SAMPLE_ORDER_NV = 1000164006,
  // Provided by VK_NV_scissor_exclusive
    VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_ENABLE_NV = 1000205000,
  // Provided by VK_NV_scissor_exclusive
    VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_NV = 1000205001,
  // Provided by VK_KHR_fragment_shading_rate
    VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR = 1000226000,
  // Provided by VK_EXT_vertex_input_dynamic_state
    VK_DYNAMIC_STATE_VERTEX_INPUT_EXT = 1000352000,
  // Provided by VK_EXT_extended_dynamic_state2
    VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT = 1000377000,
  // Provided by VK_EXT_extended_dynamic_state2
    VK_DYNAMIC_STATE_LOGIC_OP_EXT = 1000377003,
  // Provided by VK_EXT_color_write_enable
    VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT = 1000381000,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT = 1000455003,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_POLYGON_MODE_EXT = 1000455004,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT = 1000455005,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_SAMPLE_MASK_EXT = 1000455006,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT = 1000455007,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT = 1000455008,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT = 1000455009,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT = 1000455010,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT = 1000455011,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT = 1000455012,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_KHR_maintenance2 or VK_VERSION_1_1
    VK_DYNAMIC_STATE_TESSELLATION_DOMAIN_ORIGIN_EXT = 1000455002,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_transform_feedback
    VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT = 1000455013,
  // Provided by VK_EXT_conservative_rasterization with VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT = 1000455014,
  // Provided by VK_EXT_conservative_rasterization with VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT = 1000455015,
  // Provided by VK_EXT_depth_clip_enable with VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT = 1000455016,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_sample_locations
    VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT = 1000455017,
  // Provided by VK_EXT_blend_operation_advanced with VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT = 1000455018,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_provoking_vertex
    VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT = 1000455019,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_line_rasterization
    VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT = 1000455020,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_line_rasterization
    VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT = 1000455021,
  // Provided by VK_EXT_depth_clip_control with VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT = 1000455022,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_clip_space_w_scaling
    VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_ENABLE_NV = 1000455023,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_viewport_swizzle
    VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV = 1000455024,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_fragment_coverage_to_color
    VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV = 1000455025,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_fragment_coverage_to_color
    VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_LOCATION_NV = 1000455026,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_framebuffer_mixed_samples
    VK_DYNAMIC_STATE_COVERAGE_MODULATION_MODE_NV = 1000455027,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_framebuffer_mixed_samples
    VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV = 1000455028,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_framebuffer_mixed_samples
    VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_NV = 1000455029,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_shading_rate_image
    VK_DYNAMIC_STATE_SHADING_RATE_IMAGE_ENABLE_NV = 1000455030,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_representative_fragment_test
    VK_DYNAMIC_STATE_REPRESENTATIVE_FRAGMENT_TEST_ENABLE_NV = 1000455031,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_coverage_reduction_mode
    VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV = 1000455032,
  // Provided by VK_EXT_attachment_feedback_loop_dynamic_state
    VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT = 1000524000,
  // Provided by VK_EXT_depth_clamp_control
    VK_DYNAMIC_STATE_DEPTH_CLAMP_RANGE_EXT = 1000582000,
  // Provided by VK_EXT_line_rasterization
    VK_DYNAMIC_STATE_LINE_STIPPLE_EXT = VK_DYNAMIC_STATE_LINE_STIPPLE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_CULL_MODE_EXT = VK_DYNAMIC_STATE_CULL_MODE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_FRONT_FACE_EXT = VK_DYNAMIC_STATE_FRONT_FACE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY_EXT = VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT_EXT = VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT_EXT = VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE_EXT = VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE_EXT = VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE_EXT = VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_DEPTH_COMPARE_OP_EXT = VK_DYNAMIC_STATE_DEPTH_COMPARE_OP,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE_EXT = VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE_EXT = VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_STENCIL_OP_EXT = VK_DYNAMIC_STATE_STENCIL_OP,
  // Provided by VK_EXT_extended_dynamic_state2
    VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE_EXT = VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE,
  // Provided by VK_EXT_extended_dynamic_state2
    VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE_EXT = VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE,
  // Provided by VK_EXT_extended_dynamic_state2
    VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE_EXT = VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE,
  // Provided by VK_KHR_line_rasterization
    VK_DYNAMIC_STATE_LINE_STIPPLE_KHR = VK_DYNAMIC_STATE_LINE_STIPPLE,
} VkDynamicState;

* 
[VK_DYNAMIC_STATE_VIEWPORT](#) specifies that the `pViewports`
state in [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html) will be ignored and
**must** be set dynamically with [vkCmdSetViewport](vkCmdSetViewport.html) before any drawing
commands.
The number of viewports used by a pipeline is still specified by the
`viewportCount` member of [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html).

* 
[VK_DYNAMIC_STATE_SCISSOR](#) specifies that the `pScissors` state
in [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html) will be ignored and **must** be
set dynamically with [vkCmdSetScissor](vkCmdSetScissor.html) before any drawing commands.
The number of scissor rectangles used by a pipeline is still specified
by the `scissorCount` member of
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html).

* 
[VK_DYNAMIC_STATE_LINE_WIDTH](#) specifies that the `lineWidth`
state in [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) will be ignored
and **must** be set dynamically with [vkCmdSetLineWidth](vkCmdSetLineWidth.html) before any
drawing commands that generate line primitives for the rasterizer.

* 
[VK_DYNAMIC_STATE_DEPTH_BIAS](#) specifies that
    any instance of [VkDepthBiasRepresentationInfoEXT](VkDepthBiasRepresentationInfoEXT.html) included in the
    `pNext` chain of [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) as
    well as
    the `depthBiasConstantFactor`, `depthBiasClamp` and
    `depthBiasSlopeFactor` states in
    [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) will be ignored and **must**
    be set dynamically with [vkCmdSetDepthBias](vkCmdSetDepthBias.html)
or [vkCmdSetDepthBias2EXT](vkCmdSetDepthBias2EXT.html)
    before any draws are performed with [depth    bias enabled](../../../../spec/latest/chapters/primsrast.html#primsrast-depthbias-enable).

* 
[VK_DYNAMIC_STATE_BLEND_CONSTANTS](#) specifies that the
`blendConstants` state in [VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html)
will be ignored and **must** be set dynamically with
[vkCmdSetBlendConstants](vkCmdSetBlendConstants.html) before any draws are performed with a
pipeline state with `VkPipelineColorBlendAttachmentState` member
`blendEnable` set to [VK_TRUE](VK_TRUE.html) and any of the blend functions
using a constant blend color.

* 
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](#) specifies that the
`minDepthBounds` and `maxDepthBounds` states of
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) will be ignored and **must** be
set dynamically with [vkCmdSetDepthBounds](vkCmdSetDepthBounds.html) before any draws are
performed with a pipeline state with
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) member
`depthBoundsTestEnable` set to [VK_TRUE](VK_TRUE.html).

* 
[VK_DYNAMIC_STATE_STENCIL_COMPARE_MASK](#) specifies that the
`compareMask` state in [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html)
for both `front` and `back` will be ignored and **must** be set
dynamically with [vkCmdSetStencilCompareMask](vkCmdSetStencilCompareMask.html) before any draws are
performed with a pipeline state with
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) member
`stencilTestEnable` set to [VK_TRUE](VK_TRUE.html)

* 
[VK_DYNAMIC_STATE_STENCIL_WRITE_MASK](#) specifies that the
`writeMask` state in [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) for
both `front` and `back` will be ignored and **must** be set
dynamically with [vkCmdSetStencilWriteMask](vkCmdSetStencilWriteMask.html) before any draws are
performed with a pipeline state with
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) member
`stencilTestEnable` set to [VK_TRUE](VK_TRUE.html)

* 
[VK_DYNAMIC_STATE_STENCIL_REFERENCE](#) specifies that the
`reference` state in [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) for
both `front` and `back` will be ignored and **must** be set
dynamically with [vkCmdSetStencilReference](vkCmdSetStencilReference.html) before any draws are
performed with a pipeline state with
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) member
`stencilTestEnable` set to [VK_TRUE](VK_TRUE.html)

* 
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](#) specifies that the
`pViewportWScalings` state in
[VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html) will be ignored and
**must** be set dynamically with [vkCmdSetViewportWScalingNV](vkCmdSetViewportWScalingNV.html) before
any draws are performed with a pipeline state with
[VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html) member
`viewportScalingEnable` set to [VK_TRUE](VK_TRUE.html)

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](#) specifies that the
`pDiscardRectangles` state in
[VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html) will be ignored and
**must** be set dynamically with [vkCmdSetDiscardRectangleEXT](vkCmdSetDiscardRectangleEXT.html) before
any draw or clear commands.

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](#) specifies that the
presence of the [VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html)
structure in the [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) chain with a
`discardRectangleCount` greater than zero does not implicitly enable
discard rectangles and they **must** be enabled dynamically with
[vkCmdSetDiscardRectangleEnableEXT](vkCmdSetDiscardRectangleEnableEXT.html) before any draw commands.
This is available on implementations that support at least
`specVersion` `2` of the `[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html)`
extension.

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](#) specifies that the
`discardRectangleMode` state in
[VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html) will be ignored and
**must** be set dynamically with [vkCmdSetDiscardRectangleModeEXT](vkCmdSetDiscardRectangleModeEXT.html)
before any draw commands.
This is available on implementations that support at least
`specVersion` `2` of the `[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html)`
extension.

* 
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](#) specifies that the
`sampleLocationsInfo` state in
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html) will be ignored and
**must** be set dynamically with [vkCmdSetSampleLocationsEXT](vkCmdSetSampleLocationsEXT.html) before
any draw or clear commands.
Enabling custom sample locations is still indicated by the
`sampleLocationsEnable` member of
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html).

* 
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_NV](#) specifies that the
`pExclusiveScissors` state in
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](VkPipelineViewportExclusiveScissorStateCreateInfoNV.html) will be
ignored and **must** be set dynamically with
[vkCmdSetExclusiveScissorNV](vkCmdSetExclusiveScissorNV.html) before any drawing commands.

* 
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_ENABLE_NV](#) specifies that the
exclusive scissors **must** be explicitly enabled with
[vkCmdSetExclusiveScissorEnableNV](vkCmdSetExclusiveScissorEnableNV.html) and the
`exclusiveScissorCount` value in
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](VkPipelineViewportExclusiveScissorStateCreateInfoNV.html) will not
implicitly enable them.
This is available on implementations that support at least
`specVersion` `2` of the `[VK_NV_scissor_exclusive](VK_NV_scissor_exclusive.html)` extension.

* 
[VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](#) specifies that
the `pShadingRatePalettes` state in
[VkPipelineViewportShadingRateImageStateCreateInfoNV](VkPipelineViewportShadingRateImageStateCreateInfoNV.html) will be
ignored and **must** be set dynamically with
[vkCmdSetViewportShadingRatePaletteNV](vkCmdSetViewportShadingRatePaletteNV.html) before any drawing commands.

* 
[VK_DYNAMIC_STATE_VIEWPORT_COARSE_SAMPLE_ORDER_NV](#) specifies that
the coarse sample order state in
[VkPipelineViewportCoarseSampleOrderStateCreateInfoNV](VkPipelineViewportCoarseSampleOrderStateCreateInfoNV.html) will be
ignored and **must** be set dynamically with
[vkCmdSetCoarseSampleOrderNV](vkCmdSetCoarseSampleOrderNV.html) before any drawing commands.

* 
[VK_DYNAMIC_STATE_LINE_STIPPLE](#) specifies that the
`lineStippleFactor` and `lineStipplePattern` state in
[VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html) will be ignored and
**must** be set dynamically with [vkCmdSetLineStipple](vkCmdSetLineStipple.html) before any draws
are performed with a pipeline state with
[VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html) member
`stippledLineEnable` set to [VK_TRUE](VK_TRUE.html).

* 
[VK_DYNAMIC_STATE_CULL_MODE](#) specifies that the `cullMode` state
in [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) will be ignored and
**must** be set dynamically with [vkCmdSetCullMode](vkCmdSetCullMode.html) before any drawing
commands.

* 
[VK_DYNAMIC_STATE_FRONT_FACE](#) specifies that the `frontFace`
state in [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) will be ignored
and **must** be set dynamically with [vkCmdSetFrontFace](vkCmdSetFrontFace.html) before any
drawing commands.

* 
[VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](#) specifies that the
`topology` state in [VkPipelineInputAssemblyStateCreateInfo](VkPipelineInputAssemblyStateCreateInfo.html)
only specifies the [topology class](../../../../spec/latest/chapters/drawing.html#drawing-primitive-topology-class),
and the specific topology order and adjacency **must** be set dynamically
with [vkCmdSetPrimitiveTopology](vkCmdSetPrimitiveTopology.html) before any drawing commands.

* 
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](#) specifies that the
`viewportCount` and `pViewports` state in
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html) will be ignored and **must** be set
dynamically with [vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html) before any draw call.

* 
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](#) specifies that the
`scissorCount` and `pScissors` state in
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html) will be ignored and **must** be set
dynamically with [vkCmdSetScissorWithCount](vkCmdSetScissorWithCount.html) before any draw call.

* 
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](#) specifies that the
`stride` state in [VkVertexInputBindingDescription](VkVertexInputBindingDescription.html) will be
ignored and **must** be set dynamically with [vkCmdBindVertexBuffers2](vkCmdBindVertexBuffers2.html)
before any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](#) specifies that the
`depthTestEnable` state in
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) will be ignored and **must** be
set dynamically with [vkCmdSetDepthTestEnable](vkCmdSetDepthTestEnable.html) before any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](#) specifies that the
`depthWriteEnable` state in
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) will be ignored and **must** be
set dynamically with [vkCmdSetDepthWriteEnable](vkCmdSetDepthWriteEnable.html) before any draw
call.

* 
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](#) specifies that the
`depthCompareOp` state in
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) will be ignored and **must** be
set dynamically with [vkCmdSetDepthCompareOp](vkCmdSetDepthCompareOp.html) before any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](#) specifies that the
`depthBoundsTestEnable` state in
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) will be ignored and **must** be
set dynamically with [vkCmdSetDepthBoundsTestEnable](vkCmdSetDepthBoundsTestEnable.html) before any draw
call.

* 
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](#) specifies that the
`stencilTestEnable` state in
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) will be ignored and **must** be
set dynamically with [vkCmdSetStencilTestEnable](vkCmdSetStencilTestEnable.html) before any draw
call.

* 
[VK_DYNAMIC_STATE_STENCIL_OP](#) specifies that the `failOp`,
`passOp`, `depthFailOp`, and `compareOp` states in
`VkPipelineDepthStencilStateCreateInfo` for both `front` and
`back` will be ignored and **must** be set dynamically with
[vkCmdSetStencilOp](vkCmdSetStencilOp.html) before any draws are performed with a pipeline
state with `VkPipelineDepthStencilStateCreateInfo` member
`stencilTestEnable` set to [VK_TRUE](VK_TRUE.html)

* 
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](#) specifies that the
`patchControlPoints` state in
[VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html) will be ignored and **must** be
set dynamically with [vkCmdSetPatchControlPointsEXT](vkCmdSetPatchControlPointsEXT.html) before any
drawing commands.

* 
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](#) specifies that the
`rasterizerDiscardEnable` state in
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) will be ignored and **must**
be set dynamically with [vkCmdSetRasterizerDiscardEnable](vkCmdSetRasterizerDiscardEnable.html) before any
drawing commands.

* 
[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](#) specifies that the
`depthBiasEnable` state in
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) will be ignored and **must**
be set dynamically with [vkCmdSetDepthBiasEnable](vkCmdSetDepthBiasEnable.html) before any drawing
commands.

* 
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](#) specifies that the `logicOp`
state in [VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html) will be ignored and
**must** be set dynamically with [vkCmdSetLogicOpEXT](vkCmdSetLogicOpEXT.html) before any
drawing commands.

* 
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](#) specifies that the
`primitiveRestartEnable` state in
[VkPipelineInputAssemblyStateCreateInfo](VkPipelineInputAssemblyStateCreateInfo.html) will be ignored and **must**
be set dynamically with [vkCmdSetPrimitiveRestartEnable](vkCmdSetPrimitiveRestartEnable.html) before any
drawing commands.

* 
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#) specifies that state in
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)
and [VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)
will be ignored and **must** be set dynamically with
[vkCmdSetFragmentShadingRateKHR](vkCmdSetFragmentShadingRateKHR.html)
or [vkCmdSetFragmentShadingRateEnumNV](vkCmdSetFragmentShadingRateEnumNV.html)
before any drawing commands.

* 
[VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](#) specifies
that the default stack size computation for the pipeline will be ignored
and **must** be set dynamically with
[vkCmdSetRayTracingPipelineStackSizeKHR](vkCmdSetRayTracingPipelineStackSizeKHR.html) before any ray tracing
calls are performed.

* 
[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](#) specifies that the
`pVertexInputState` state will be ignored and **must** be set
dynamically with [vkCmdSetVertexInputEXT](vkCmdSetVertexInputEXT.html) before any drawing
commands

* 
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](#) specifies that the
`pColorWriteEnables` state in
[VkPipelineColorWriteCreateInfoEXT](VkPipelineColorWriteCreateInfoEXT.html) will be ignored and **must** be set
dynamically with [vkCmdSetColorWriteEnableEXT](vkCmdSetColorWriteEnableEXT.html) before any draw call.

* 
[VK_DYNAMIC_STATE_TESSELLATION_DOMAIN_ORIGIN_EXT](#) specifies that the
`domainOrigin` state in
[VkPipelineTessellationDomainOriginStateCreateInfo](VkPipelineTessellationDomainOriginStateCreateInfo.html) will be ignored
and **must** be set dynamically with
[vkCmdSetTessellationDomainOriginEXT](vkCmdSetTessellationDomainOriginEXT.html) before any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](#) specifies that the
`depthClampEnable` state in
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) will be ignored and **must**
be set dynamically with [vkCmdSetDepthClampEnableEXT](vkCmdSetDepthClampEnableEXT.html) before any
draw call.

* 
[VK_DYNAMIC_STATE_POLYGON_MODE_EXT](#) specifies that the
`polygonMode` state in [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)
will be ignored and **must** be set dynamically with
[vkCmdSetPolygonModeEXT](vkCmdSetPolygonModeEXT.html) before any draw call.

* 
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](#) specifies that the
`rasterizationSamples` state in
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html) will be ignored and **must** be
set dynamically with [vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html) before any
draw call.

* 
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](#) specifies that the
`pSampleMask` state in [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)
will be ignored and **must** be set dynamically with
[vkCmdSetSampleMaskEXT](vkCmdSetSampleMaskEXT.html) before any draw call.

* 
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](#) specifies that the
`alphaToCoverageEnable` state in
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html) will be ignored and **must** be
set dynamically with [vkCmdSetAlphaToCoverageEnableEXT](vkCmdSetAlphaToCoverageEnableEXT.html) before any
draw call.

* 
[VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](#) specifies that the
`alphaToOneEnable` state in
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html) will be ignored and **must** be
set dynamically with [vkCmdSetAlphaToOneEnableEXT](vkCmdSetAlphaToOneEnableEXT.html) before any draw
call.

* 
[VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](#) specifies that the
`logicOpEnable` state in [VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html)
will be ignored and **must** be set dynamically with
[vkCmdSetLogicOpEnableEXT](vkCmdSetLogicOpEnableEXT.html) before any draw call.

* 
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](#) specifies that the
`blendEnable` state in [VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)
will be ignored and **must** be set dynamically with
[vkCmdSetColorBlendEnableEXT](vkCmdSetColorBlendEnableEXT.html) before any draw call.

* 
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](#) specifies that the
`srcColorBlendFactor`, `dstColorBlendFactor`,
`colorBlendOp`, `srcAlphaBlendFactor`,
`dstAlphaBlendFactor`, and `alphaBlendOp` states in
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html) will be ignored and **must** be
set dynamically with [vkCmdSetColorBlendEquationEXT](vkCmdSetColorBlendEquationEXT.html) before any draw
call.

* 
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](#) specifies that the
`colorWriteMask` state in [VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)
will be ignored and **must** be set dynamically with
[vkCmdSetColorWriteMaskEXT](vkCmdSetColorWriteMaskEXT.html) before any draw call.

* 
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](#) specifies that the
`rasterizationStream` state in
[VkPipelineRasterizationStateStreamCreateInfoEXT](VkPipelineRasterizationStateStreamCreateInfoEXT.html) will be ignored
and **must** be set dynamically with [vkCmdSetRasterizationStreamEXT](vkCmdSetRasterizationStreamEXT.html)
before any draw call.

* 
[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](#) specifies
that the `conservativeRasterizationMode` state in
[VkPipelineRasterizationConservativeStateCreateInfoEXT](VkPipelineRasterizationConservativeStateCreateInfoEXT.html) will be
ignored and **must** be set dynamically with
[vkCmdSetConservativeRasterizationModeEXT](vkCmdSetConservativeRasterizationModeEXT.html) before any draw call.

* 
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](#) specifies
that the `extraPrimitiveOverestimationSize` state in
[VkPipelineRasterizationConservativeStateCreateInfoEXT](VkPipelineRasterizationConservativeStateCreateInfoEXT.html) will be
ignored and **must** be set dynamically with
[vkCmdSetExtraPrimitiveOverestimationSizeEXT](vkCmdSetExtraPrimitiveOverestimationSizeEXT.html) before any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](#) specifies that the
`depthClipEnable` state in
[VkPipelineRasterizationDepthClipStateCreateInfoEXT](VkPipelineRasterizationDepthClipStateCreateInfoEXT.html) will be ignored
and **must** be set dynamically with [vkCmdSetDepthClipEnableEXT](vkCmdSetDepthClipEnableEXT.html)
before any draw call.

* 
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](#) specifies that the
`sampleLocationsEnable` state in
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html) will be ignored and
**must** be set dynamically with [vkCmdSetSampleLocationsEnableEXT](vkCmdSetSampleLocationsEnableEXT.html)
before any draw call.

* 
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](#) specifies that the
`colorBlendOp` state in [VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html),
and `srcPremultiplied`, `dstPremultiplied`, and
`blendOverlap` states in
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html) will be ignored and
**must** be set dynamically with [vkCmdSetColorBlendAdvancedEXT](vkCmdSetColorBlendAdvancedEXT.html) before
any draw call.

* 
[VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT](#) specifies that the
`provokingVertexMode` state in
[VkPipelineRasterizationProvokingVertexStateCreateInfoEXT](VkPipelineRasterizationProvokingVertexStateCreateInfoEXT.html) will be
ignored and **must** be set dynamically with
[vkCmdSetProvokingVertexModeEXT](vkCmdSetProvokingVertexModeEXT.html) before any draw call.

* 
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](#) specifies that the
`lineRasterizationMode` state in
[VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html) will be ignored and
**must** be set dynamically with [vkCmdSetLineRasterizationModeEXT](vkCmdSetLineRasterizationModeEXT.html)
before any draw call.

* 
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](#) specifies that the
`stippledLineEnable` state in
[VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html) will be ignored and
**must** be set dynamically with [vkCmdSetLineStippleEnableEXT](vkCmdSetLineStippleEnableEXT.html) before
any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT](#) specifies that
the `negativeOneToOne` state in
[VkPipelineViewportDepthClipControlCreateInfoEXT](VkPipelineViewportDepthClipControlCreateInfoEXT.html) will be ignored
and **must** be set dynamically with
[vkCmdSetDepthClipNegativeOneToOneEXT](vkCmdSetDepthClipNegativeOneToOneEXT.html) before any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_CLAMP_RANGE_EXT](#) specifies that the
`depthClampMode` and `pDepthClampRange` state in
[VkPipelineViewportDepthClampControlCreateInfoEXT](VkPipelineViewportDepthClampControlCreateInfoEXT.html) will be ignored
and **must** be set dynamically with [vkCmdSetDepthClampRangeEXT](vkCmdSetDepthClampRangeEXT.html)
before any draw call.

* 
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_ENABLE_NV](#) specifies that the
`viewportWScalingEnable` state in
[VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html) will be ignored and
**must** be set dynamically with [vkCmdSetViewportWScalingEnableNV](vkCmdSetViewportWScalingEnableNV.html)
before any draw call.

* 
[VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](#) specifies that the
`viewportCount`, and `pViewportSwizzles` states in
[VkPipelineViewportSwizzleStateCreateInfoNV](VkPipelineViewportSwizzleStateCreateInfoNV.html) will be ignored and
**must** be set dynamically with [vkCmdSetViewportSwizzleNV](vkCmdSetViewportSwizzleNV.html) before any
draw call.

* 
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](#) specifies that the
`coverageToColorEnable` state in
[VkPipelineCoverageToColorStateCreateInfoNV](VkPipelineCoverageToColorStateCreateInfoNV.html) will be ignored and
**must** be set dynamically with [vkCmdSetCoverageToColorEnableNV](vkCmdSetCoverageToColorEnableNV.html)
before any draw call.

* 
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_LOCATION_NV](#) specifies that the
`coverageToColorLocation` state in
[VkPipelineCoverageToColorStateCreateInfoNV](VkPipelineCoverageToColorStateCreateInfoNV.html) will be ignored and
**must** be set dynamically with [vkCmdSetCoverageToColorLocationNV](vkCmdSetCoverageToColorLocationNV.html)
before any draw call.

* 
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_MODE_NV](#) specifies that the
`coverageModulationMode` state in
[VkPipelineCoverageModulationStateCreateInfoNV](VkPipelineCoverageModulationStateCreateInfoNV.html) will be ignored and
**must** be set dynamically with [vkCmdSetCoverageModulationModeNV](vkCmdSetCoverageModulationModeNV.html)
before any draw call.

* 
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV](#) specifies
that the `coverageModulationTableEnable` state in
[VkPipelineCoverageModulationStateCreateInfoNV](VkPipelineCoverageModulationStateCreateInfoNV.html) will be ignored and
**must** be set dynamically with
[vkCmdSetCoverageModulationTableEnableNV](vkCmdSetCoverageModulationTableEnableNV.html) before any draw call.

* 
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_NV](#) specifies that the
`coverageModulationTableCount`, and `pCoverageModulationTable`
states in [VkPipelineCoverageModulationStateCreateInfoNV](VkPipelineCoverageModulationStateCreateInfoNV.html) will be
ignored and **must** be set dynamically with
[vkCmdSetCoverageModulationTableNV](vkCmdSetCoverageModulationTableNV.html) before any draw call.

* 
[VK_DYNAMIC_STATE_SHADING_RATE_IMAGE_ENABLE_NV](#) specifies that the
`shadingRateImageEnable` state in
[VkPipelineViewportShadingRateImageStateCreateInfoNV](VkPipelineViewportShadingRateImageStateCreateInfoNV.html) will be
ignored and **must** be set dynamically with
[vkCmdSetShadingRateImageEnableNV](vkCmdSetShadingRateImageEnableNV.html) before any draw call.

* 
[VK_DYNAMIC_STATE_REPRESENTATIVE_FRAGMENT_TEST_ENABLE_NV](#) specifies
that the `representativeFragmentTestEnable` state in
[VkPipelineRepresentativeFragmentTestStateCreateInfoNV](VkPipelineRepresentativeFragmentTestStateCreateInfoNV.html) will be
ignored and **must** be set dynamically with
[vkCmdSetRepresentativeFragmentTestEnableNV](vkCmdSetRepresentativeFragmentTestEnableNV.html) before any draw call.

* 
[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](#) specifies that the
`coverageReductionMode` state in
[VkPipelineCoverageReductionStateCreateInfoNV](VkPipelineCoverageReductionStateCreateInfoNV.html) will be ignored and
**must** be set dynamically with [vkCmdSetCoverageReductionModeNV](vkCmdSetCoverageReductionModeNV.html)
before any draw call.

* 
[VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT](#) specifies
that the [VK_PIPELINE_CREATE_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkPipelineCreateFlagBits.html)
and
[VK_PIPELINE_CREATE_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkPipelineCreateFlagBits.html)
flags will be ignored and **must** be set dynamically with
[vkCmdSetAttachmentFeedbackLoopEnableEXT](vkCmdSetAttachmentFeedbackLoopEnableEXT.html) before any draw call.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkDynamicState).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
