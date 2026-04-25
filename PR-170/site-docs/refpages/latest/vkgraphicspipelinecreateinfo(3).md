# VkGraphicsPipelineCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGraphicsPipelineCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGraphicsPipelineCreateInfo - Structure specifying parameters of a newly created graphics pipeline

The `VkGraphicsPipelineCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkGraphicsPipelineCreateInfo {
    VkStructureType                                  sType;
    const void*                                      pNext;
    VkPipelineCreateFlags                            flags;
    uint32_t                                         stageCount;
    const VkPipelineShaderStageCreateInfo*           pStages;
    const VkPipelineVertexInputStateCreateInfo*      pVertexInputState;
    const VkPipelineInputAssemblyStateCreateInfo*    pInputAssemblyState;
    const VkPipelineTessellationStateCreateInfo*     pTessellationState;
    const VkPipelineViewportStateCreateInfo*         pViewportState;
    const VkPipelineRasterizationStateCreateInfo*    pRasterizationState;
    const VkPipelineMultisampleStateCreateInfo*      pMultisampleState;
    const VkPipelineDepthStencilStateCreateInfo*     pDepthStencilState;
    const VkPipelineColorBlendStateCreateInfo*       pColorBlendState;
    const VkPipelineDynamicStateCreateInfo*          pDynamicState;
    VkPipelineLayout                                 layout;
    VkRenderPass                                     renderPass;
    uint32_t                                         subpass;
    VkPipeline                                       basePipelineHandle;
    int32_t                                          basePipelineIndex;
} VkGraphicsPipelineCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html) specifying
how the pipeline will be generated.

* 
`stageCount` is the number of entries in the `pStages` array.

* 
`pStages` is a pointer to an array of `stageCount`
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) structures describing the set of
the shader stages to be included in the graphics pipeline.

* 
`pVertexInputState` is a pointer to a
[VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html) structure.
It is ignored if the pipeline includes a mesh shader stage.
It **can** be `NULL` if the pipeline is created with the
[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](VkDynamicState.html) dynamic state set.

* 
`pInputAssemblyState` is a pointer to a
[VkPipelineInputAssemblyStateCreateInfo](VkPipelineInputAssemblyStateCreateInfo.html) structure which determines
input assembly behavior for vertex shading, as described in [    Drawing Commands](../../../../spec/latest/chapters/drawing.html#drawing).
 If the
`[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is enabled, it **can** be
`NULL` if the pipeline is created with both
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](VkDynamicState.html), and
[VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](VkDynamicState.html) dynamic states set and
[    `dynamicPrimitiveTopologyUnrestricted`](../../../../spec/latest/chapters/limits.html#limits-dynamicPrimitiveTopologyUnrestricted) is [VK_TRUE](VK_TRUE.html).
It is ignored if the pipeline includes a mesh shader stage.

* 
`pTessellationState` is a pointer to a
[VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html) structure defining
tessellation state used by tessellation shaders.
It **can** be `NULL` if the pipeline is created with the
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](VkDynamicState.html) dynamic state set.

* 
`pViewportState` is a pointer to a
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html) structure defining viewport
state used when rasterization is enabled.
 If the
`[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is enabled, it **can** be
`NULL` if the pipeline is created with both
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html), and
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html) dynamic states set.

* 
`pRasterizationState` is a pointer to a
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) structure defining
rasterization state.
 If the
`[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is enabled, it **can** be
`NULL` if the pipeline is created with all of
[VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_POLYGON_MODE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_CULL_MODE](VkDynamicState.html), [VK_DYNAMIC_STATE_FRONT_FACE](VkDynamicState.html),
[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_DEPTH_BIAS](VkDynamicState.html), and [VK_DYNAMIC_STATE_LINE_WIDTH](VkDynamicState.html)
dynamic states set.

* 
`pMultisampleState` is a pointer to a
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html) structure defining
multisample state used when rasterization is enabled.
 If the
`[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is enabled, it **can** be
`NULL` if the pipeline is created with all of
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](VkDynamicState.html), and
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](VkDynamicState.html) dynamic states set,
and either the [alphaToOne](../../../../spec/latest/chapters/features.html#features-alphaToOne) feature is not
enabled or [VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](VkDynamicState.html) is set, in
which case
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)::`sampleShadingEnable` is
assumed to be [VK_FALSE](VK_FALSE.html).

* 
`pDepthStencilState` is a pointer to a
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) structure defining
depth/stencil state used when rasterization is enabled for depth or
stencil attachments accessed during rendering.
 If the
`[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is enabled, it **can** be
`NULL` if the pipeline is created with all of
[VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](VkDynamicState.html),
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_STENCIL_OP](VkDynamicState.html), and
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](VkDynamicState.html) dynamic states set.

* 
`pColorBlendState` is a pointer to a
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html) structure defining color blend
state used when rasterization is enabled for any color attachments
accessed during rendering.
 If the
`[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is enabled, it **can** be
`NULL` if the pipeline is created with all of
[VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html), and
[VK_DYNAMIC_STATE_BLEND_CONSTANTS](VkDynamicState.html) dynamic states set.

* 
`pDynamicState` is a pointer to a
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html) structure defining which
properties of the pipeline state object are dynamic and **can** be changed
independently of the pipeline state.
This **can** be `NULL`, which means no state in the pipeline is considered
dynamic.

* 
`layout` is the description of binding locations used by both the
    pipeline and descriptor sets used with the pipeline.
    If
    [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is greater than or
    equal to Vulkan 1.3
or
    [VK_KHR_maintenance4](VK_KHR_maintenance4.html) is enabled
    `layout` **must** not be accessed by the implementation outside of the
    duration of the command this structure is passed to.

* 
`renderPass` is a handle to a render pass object describing the
environment in which the pipeline will be used.
The pipeline **must** only be used with a render pass instance compatible
with the one provided.
See [Render Pass Compatibility](../../../../spec/latest/chapters/renderpass.html#renderpass-compatibility) for more
information.
The implementation **must** not access this object outside of the duration
of the command this structure is passed to.

* 
`subpass` is the index of the subpass in the render pass where this
pipeline will be used.

* 
`basePipelineHandle` is a pipeline to derive from.

* 
`basePipelineIndex` is an index into the `pCreateInfos`
parameter to use as a pipeline to derive from.

The parameters `basePipelineHandle` and `basePipelineIndex` are
described in more detail in [Pipeline Derivatives](../../../../spec/latest/chapters/pipelines.html#pipelines-pipeline-derivatives).

If any shader stage fails to compile,
the compile log will be reported back to the application, and
[VK_ERROR_INVALID_SHADER_NV](VkResult.html) will be generated.

|  | With `[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)`, it is possible that many of
| --- | --- |
the `VkGraphicsPipelineCreateInfo` members above **can** be `NULL` because
all their state is dynamic and therefore ignored.
This is optional so the application **can** still use a valid pointer if it
needs to set the `pNext` or `flags` fields to specify state for
other extensions. |

The state required for a graphics pipeline is divided into
[vertex input state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input),
[pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), [fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), and [fragment output state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output).

Vertex Input State
Vertex input state is defined by:

* 
[VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html)

* 
[VkPipelineInputAssemblyStateCreateInfo](VkPipelineInputAssemblyStateCreateInfo.html)

If
this pipeline specifies
[pre-rasterization state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization)
either directly or by including it as a pipeline library and its
`pStages` includes a vertex shader, this state **must** be specified to
create a [complete graphics pipeline](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete).

If a pipeline includes
[VK_GRAPHICS_PIPELINE_LIBRARY_VERTEX_INPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) in
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` either explicitly
or as a default, and either the conditions requiring this state for a
[complete graphics pipeline](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete) are met
or this pipeline does not specify
[pre-rasterization state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) in
any way, that pipeline **must** specify this state directly.

Pre-Rasterization Shader State
Pre-rasterization shader state is defined by:

* 
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) entries for:

Vertex shaders

* 
Tessellation control shaders

* 
Tessellation evaluation shaders

* 
Geometry shaders

* 
Task shaders

* 
Mesh shaders

Within the [VkPipelineLayout](VkPipelineLayout.html), all descriptor sets with
pre-rasterization shader bindings if
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html) was specified.

* 
If [VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html) was not
specified, the full pipeline layout **must** be specified.

[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)

[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)

[VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html)

[VkRenderPass](VkRenderPass.html) and `subpass` parameter

The `viewMask` parameter of [VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)
(formats are ignored)

[VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html)

[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)

Inclusion/omission of the
[VK_PIPELINE_CREATE_2_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](VkPipelineCreateFlagBits2.html) flag

This state **must** be specified to create a
[complete graphics pipeline](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete).

If either the `pNext` chain includes a
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html) structure with
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html)
included in `flags`, or it is not specified and would default to include
that value, this state **must** be specified in the pipeline.

Fragment Shader State
Fragment shader state is defined by:

* 
A [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) entry for the fragment shader

* 
Within the [VkPipelineLayout](VkPipelineLayout.html), all descriptor sets with fragment
shader bindings if
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html) was specified.

If [VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html) was not
specified, the full pipeline layout **must** be specified.

[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)
if [sample shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading) is enabled or
`renderpass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html)

[VkRenderPass](VkRenderPass.html) and `subpass` parameter

The `viewMask` parameter of [VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)
(formats are ignored)

[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)

[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)

[VkPipelineRepresentativeFragmentTestStateCreateInfoNV](VkPipelineRepresentativeFragmentTestStateCreateInfoNV.html)

Inclusion/omission of the
[VK_PIPELINE_RASTERIZATION_STATE_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineCreateFlagBits.html)
flag

Inclusion/omission of the
[VK_PIPELINE_RASTERIZATION_STATE_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](VkPipelineCreateFlagBits.html)
flag

[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)

Inclusion/omission of the
[VK_PIPELINE_CREATE_2_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](VkPipelineCreateFlagBits2.html) flag

The `customResolve` parameter of [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html).
Formats are ignored, and not including the structure behaves identically
to setting `customResolve` to [VK_FALSE](VK_FALSE.html), unlike in
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output).

If
a pipeline specifies
[pre-rasterization state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization)
either directly or by including it as a pipeline library and
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html)
or [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](VkDynamicState.html) is used,
this state **must** be specified to create a
[complete graphics pipeline](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete).

If a pipeline includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) in
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` either explicitly
or as a default, and either the conditions requiring this state for a
[complete graphics pipeline](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete) are met
or this pipeline does not specify
[pre-rasterization state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) in
any way, that pipeline **must** specify this state directly.

Fragment Output State
Fragment output state is defined by:

* 
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html)

* 
[VkRenderPass](VkRenderPass.html) and `subpass` parameter

* 
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)

* 
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)

* 
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html)

* 
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html)

* 
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)

* 
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)

* 
Inclusion/omission of the
[VK_PIPELINE_CREATE_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkPipelineCreateFlagBits.html) and
[VK_PIPELINE_CREATE_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkPipelineCreateFlagBits.html)
flags

* 
Inclusion/omission of the
[VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT](VkPipelineCreateFlagBits2.html) flag

* 
[VkRenderingAttachmentLocationInfo](VkRenderingAttachmentLocationInfo.html)

If
a pipeline specifies
[pre-rasterization state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization)
either directly or by including it as a pipeline library and
`rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html)
or [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](VkDynamicState.html) is used,
this state **must** be specified to create a
[complete graphics pipeline](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete).

If a pipeline includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) in
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` either explicitly
or as a default, and either the conditions requiring this state for a
[complete graphics pipeline](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete) are met
or this pipeline does not specify
[pre-rasterization state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) in
any way, that pipeline **must** specify this state directly.

Dynamic State
Dynamic state values set via `pDynamicState` **must** be ignored if the
state they correspond to is not otherwise statically set by one of the state
subsets used to create the pipeline.
Additionally, setting dynamic state values **must** not modify whether state in
a linked library is static or dynamic; this is set and unchangeable when the
library is created.
For example, if a pipeline only included
[pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), then any dynamic state value corresponding to depth or stencil
testing has no effect.
Any linked library that has dynamic state enabled that same dynamic state
**must** also be enabled in all the other linked libraries to which that
dynamic state applies.

Complete Graphics Pipelines
A complete graphics pipeline always includes
[pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), with other subsets included depending on that state as specified in
the above sections.

Graphics Pipeline Library Layouts
If different subsets are linked together with pipeline layouts created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html), the final
effective pipeline layout is effectively the union of the linked pipeline
layouts.
When binding descriptor sets for this pipeline, the pipeline layout used
**must** be compatible with this union.
This pipeline layout **can** be overridden when linking with
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](VkPipelineCreateFlagBits.html) by providing a
[VkPipelineLayout](VkPipelineLayout.html) that is [compatible](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility) with
this union other than
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html), or when linking
without [VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](VkPipelineCreateFlagBits.html) by providing
a [VkPipelineLayout](VkPipelineLayout.html) that is fully
[compatible](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility) with this union.

If the `pNext` chain includes a [VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html)
structure, [VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html)::`flags` from that
structure is used instead of `flags` from this structure.

Valid Usage

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-09497) VUID-VkGraphicsPipelineCreateInfo-None-09497

If the `pNext` chain does not include a
[VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html) structure,
`flags` **must** be a valid combination of
[VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html) values

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-07984) VUID-VkGraphicsPipelineCreateInfo-flags-07984

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, and `basePipelineIndex` is -1, `basePipelineHandle` **must**
be a valid graphics `VkPipeline` handle

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-07985) VUID-VkGraphicsPipelineCreateInfo-flags-07985

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, and `basePipelineHandle` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`basePipelineIndex` **must** be a valid index into the calling
command’s `pCreateInfos` parameter

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-07986) VUID-VkGraphicsPipelineCreateInfo-flags-07986

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, `basePipelineIndex` **must** be -1 or `basePipelineHandle`
**must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-07987) VUID-VkGraphicsPipelineCreateInfo-layout-07987

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), a push constant range in `layout` **must** match
the shader stage

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-10069) VUID-VkGraphicsPipelineCreateInfo-layout-10069

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the block must be contained inside the push
constant range in `layout` that matches the stage

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-07988) VUID-VkGraphicsPipelineCreateInfo-layout-07988

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
and `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the corresponding
descriptor set in `layout` **must** match the shader stage

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-07990) VUID-VkGraphicsPipelineCreateInfo-layout-07990

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader,
`layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
and the descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html),
the corresponding descriptor set in `layout` **must** match the
descriptor type

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-07991) VUID-VkGraphicsPipelineCreateInfo-layout-07991

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
as an array and `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
corresponding descriptor binding used to create `layout` **must** have
a `descriptorCount` that is greater than or equal to the length of
the array

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-10391) VUID-VkGraphicsPipelineCreateInfo-None-10391

If a [resource variables](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
as an array of descriptors, then the descriptor type of that variable
**must** not be [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11798) VUID-VkGraphicsPipelineCreateInfo-flags-11798

If [shader64BitIndexing](../../../../spec/latest/chapters/features.html#features-shader64BitIndexing) feature is not
enabled, `flags` **must** not contain
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pipelineCreationCacheControl-02878) VUID-VkGraphicsPipelineCreateInfo-pipelineCreationCacheControl-02878

If the [    `pipelineCreationCacheControl`](../../../../spec/latest/chapters/features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pipelineProtectedAccess-07368) VUID-VkGraphicsPipelineCreateInfo-pipelineProtectedAccess-07368

If the [    `pipelineProtectedAccess`](../../../../spec/latest/chapters/features.html#features-pipelineProtectedAccess) feature is not enabled, `flags`
**must** not include [VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-07369) VUID-VkGraphicsPipelineCreateInfo-flags-07369

`flags` **must** not include both
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) and
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11311) VUID-VkGraphicsPipelineCreateInfo-flags-11311

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), `layout` **must**
be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11312) VUID-VkGraphicsPipelineCreateInfo-flags-11312

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), all shader variables
in the [shader resource interface](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) with a
`DescriptorSet` and `Binding` decoration **must** have a mapping
declared in
[VkShaderDescriptorSetAndBindingMappingInfoEXT](VkShaderDescriptorSetAndBindingMappingInfoEXT.html)::pMappings

* 
[](#VUID-VkGraphicsPipelineCreateInfo-stage-02096) VUID-VkGraphicsPipelineCreateInfo-stage-02096

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) the `stage` member of one element
of `pStages` **must** be [VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html)
or [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-02095) VUID-VkGraphicsPipelineCreateInfo-pStages-02095

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) the geometric shader stages provided in
`pStages` **must** be either from the mesh shading pipeline
(`stage` is [VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html) or
[VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html)) or from the primitive shading
pipeline (`stage` is [VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](VkShaderStageFlagBits.html), or
[VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html))

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-09631) VUID-VkGraphicsPipelineCreateInfo-pStages-09631

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and `pStages` contains both
[VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html) and
[VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html), then the mesh shader’s entry point
**must** not declare a variable with a `DrawIndex` `BuiltIn`
decoration

* 
[](#VUID-VkGraphicsPipelineCreateInfo-TaskNV-07063) VUID-VkGraphicsPipelineCreateInfo-TaskNV-07063

The shader stages for [VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html) or
[VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html) **must** use either the `TaskNV` and
`MeshNV` `Execution` `Model` or the `TaskEXT` and `MeshEXT`
`Execution` `Model`, but **must** not use both

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00729) VUID-VkGraphicsPipelineCreateInfo-pStages-00729

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes a
tessellation control shader stage, it **must** include a tessellation
evaluation shader stage

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00730) VUID-VkGraphicsPipelineCreateInfo-pStages-00730

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes a
tessellation evaluation shader stage, it **must** include a tessellation
control shader stage

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-09022) VUID-VkGraphicsPipelineCreateInfo-pStages-09022

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes a
tessellation control shader stage,
and the `[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is not enabled
or the [VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](VkDynamicState.html) dynamic state is
not set,
`pTessellationState` **must** be a valid pointer to a valid
[VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pTessellationState-09023) VUID-VkGraphicsPipelineCreateInfo-pTessellationState-09023

If `pTessellationState` is not `NULL` it **must** be a pointer to a
valid [VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00732) VUID-VkGraphicsPipelineCreateInfo-pStages-00732

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes tessellation
shader stages, the shader code of at least one stage **must** contain an
`OpExecutionMode` instruction specifying the type of subdivision in
the pipeline

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00733) VUID-VkGraphicsPipelineCreateInfo-pStages-00733

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes tessellation
shader stages, and the shader code of both stages contain an
`OpExecutionMode` instruction specifying the type of subdivision in
the pipeline, they **must** both specify the same subdivision mode

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00734) VUID-VkGraphicsPipelineCreateInfo-pStages-00734

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes tessellation
shader stages, the shader code of at least one stage **must** contain an
`OpExecutionMode` instruction specifying the output patch size in the
pipeline

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00735) VUID-VkGraphicsPipelineCreateInfo-pStages-00735

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes tessellation
shader stages, and the shader code of both contain an
`OpExecutionMode` instruction specifying the out patch size in the
pipeline, they **must** both specify the same patch size

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-08888) VUID-VkGraphicsPipelineCreateInfo-pStages-08888

If the pipeline is being created with
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and [vertex input    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input) and `pStages` includes tessellation shader stages,
and either [VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](VkDynamicState.html) dynamic state is
not enabled or
[`dynamicPrimitiveTopologyUnrestricted`](../../../../spec/latest/chapters/limits.html#limits-dynamicPrimitiveTopologyUnrestricted)
is [VK_FALSE](VK_FALSE.html),
the `topology` member of `pInputAssembly` **must** be
[VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](VkPrimitiveTopology.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-topology-08889) VUID-VkGraphicsPipelineCreateInfo-topology-08889

If the pipeline is being created with
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and [vertex input    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input) and the `topology` member of `pInputAssembly` is
[VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](VkPrimitiveTopology.html),
and either [VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](VkDynamicState.html) dynamic state is
not enabled or
[`dynamicPrimitiveTopologyUnrestricted`](../../../../spec/latest/chapters/limits.html#limits-dynamicPrimitiveTopologyUnrestricted)
is [VK_FALSE](VK_FALSE.html),
then `pStages` **must** include tessellation shader stages

* 
[](#VUID-VkGraphicsPipelineCreateInfo-TessellationEvaluation-07723) VUID-VkGraphicsPipelineCreateInfo-TessellationEvaluation-07723

If the pipeline is being created with a `TessellationEvaluation`
`Execution` `Model`, no `Geometry` `Execution` `Model`, uses the
`PointMode` `Execution` `Mode`, and the
[    `shaderTessellationAndGeometryPointSize`](../../../../spec/latest/chapters/features.html#features-shaderTessellationAndGeometryPointSize) feature is enabled, a
`PointSize` decorated variable **must** be written to
if the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature is not
enabled

* 
[](#VUID-VkGraphicsPipelineCreateInfo-topology-08773) VUID-VkGraphicsPipelineCreateInfo-topology-08773

If the pipeline is being created with a `Vertex` `Execution` `Model` and
no `TessellationEvaluation` or `Geometry` `Execution` `Model`, and
the `topology` member of `pInputAssembly` is
[VK_PRIMITIVE_TOPOLOGY_POINT_LIST](VkPrimitiveTopology.html),
and either [VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](VkDynamicState.html) dynamic state is
not enabled or
[`dynamicPrimitiveTopologyUnrestricted`](../../../../spec/latest/chapters/limits.html#limits-dynamicPrimitiveTopologyUnrestricted)
is [VK_FALSE](VK_FALSE.html),
a `PointSize` decorated variable **must** be written to
if the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature is not
enabled

* 
[](#VUID-VkGraphicsPipelineCreateInfo-TessellationEvaluation-07724) VUID-VkGraphicsPipelineCreateInfo-TessellationEvaluation-07724

If the pipeline is being created with a `TessellationEvaluation`
`Execution` `Model`, no `Geometry` `Execution` `Model`, uses the
`PointMode` `Execution` `Mode`, and the
[    `shaderTessellationAndGeometryPointSize`](../../../../spec/latest/chapters/features.html#features-shaderTessellationAndGeometryPointSize) feature is not enabled, a
`PointSize` decorated variable **must** not be written to

* 
[](#VUID-VkGraphicsPipelineCreateInfo-shaderTessellationAndGeometryPointSize-08776) VUID-VkGraphicsPipelineCreateInfo-shaderTessellationAndGeometryPointSize-08776

If the pipeline is being created with a `Geometry` `Execution` `Model`,
uses the `OutputPoints` `Execution` `Mode`, and the
[    `shaderTessellationAndGeometryPointSize`](../../../../spec/latest/chapters/features.html#features-shaderTessellationAndGeometryPointSize) feature is enabled, a
`PointSize` decorated variable **must** be written to for every vertex
emitted
if the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature is not
enabled

* 
[](#VUID-VkGraphicsPipelineCreateInfo-Geometry-07726) VUID-VkGraphicsPipelineCreateInfo-Geometry-07726

If the pipeline is being created with a `Geometry` `Execution` `Model`,
uses the `OutputPoints` `Execution` `Mode`, and the
[    `shaderTessellationAndGeometryPointSize`](../../../../spec/latest/chapters/features.html#features-shaderTessellationAndGeometryPointSize) feature is not enabled, a
`PointSize` decorated variable **must** not be written to

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00738) VUID-VkGraphicsPipelineCreateInfo-pStages-00738

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes a geometry
shader stage, and does not include any tessellation shader stages, its
shader code **must** contain an `OpExecutionMode` instruction specifying
an input primitive type that is [    compatible](../../../../spec/latest/chapters/shaders.html#shaders-geometry-execution) with the primitive topology specified in
`pInputAssembly`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00739) VUID-VkGraphicsPipelineCreateInfo-pStages-00739

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes a geometry
shader stage, and also includes tessellation shader stages, its shader
code **must** contain an `OpExecutionMode` instruction specifying an
input primitive type that is [compatible](../../../../spec/latest/chapters/shaders.html#shaders-geometry-execution)
with the primitive topology that is output by the tessellation stages

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00740) VUID-VkGraphicsPipelineCreateInfo-pStages-00740

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
it includes both a fragment shader and a geometry shader, and the
fragment shader code reads from an input variable that is decorated with
`PrimitiveId`, then the geometry shader code **must** write to a
matching output variable, decorated with `PrimitiveId`, in all
execution paths

* 
[](#VUID-VkGraphicsPipelineCreateInfo-PrimitiveId-06264) VUID-VkGraphicsPipelineCreateInfo-PrimitiveId-06264

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), it includes a mesh shader and the
fragment shader code reads from an input variable that is decorated with
`PrimitiveId`, then the mesh shader code **must** write to a matching
output variable, decorated with `PrimitiveId`, in all execution paths

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06038) VUID-VkGraphicsPipelineCreateInfo-renderPass-06038

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and the pipeline is
being created with [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) the fragment shader **must** not read from any
input attachment that is defined as [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) in
`subpass`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00742) VUID-VkGraphicsPipelineCreateInfo-pStages-00742

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and multiple pre-rasterization shader
stages are included in `pStages`, the shader code for the entry
points identified by those `pStages` and the rest of the state
identified by this structure **must** adhere to the pipeline linking rules
described in the [Shader Interfaces](../../../../spec/latest/chapters/interfaces.html#interfaces) chapter

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-04889) VUID-VkGraphicsPipelineCreateInfo-None-04889

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
the fragment shader and last
[pre-rasterization shader    stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and any relevant state **must** adhere to the pipeline linking
rules described in the [Shader Interfaces](../../../../spec/latest/chapters/interfaces.html#interfaces) chapter

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06041) VUID-VkGraphicsPipelineCreateInfo-renderPass-06041

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the pipeline is
being created with [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), then for each color attachment in the
subpass, if the [potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features)
of the format of the corresponding attachment description do not contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](VkFormatFeatureFlagBits.html), then the
`blendEnable` member of the corresponding element of the
`pAttachments` member of `pColorBlendState` **must** be
[VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-07609) VUID-VkGraphicsPipelineCreateInfo-renderPass-07609

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [fragment    output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), the `pColorBlendState` pointer is not
`NULL`, the `attachmentCount` member of `pColorBlendState` is
not ignored, and the subpass uses color attachments, the
`attachmentCount` member of `pColorBlendState` **must** be equal to
the `colorAttachmentCount` used to create `subpass`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04130) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04130

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and `pViewportState->pViewports`
is not dynamic, then `pViewportState->pViewports` **must** be a valid
pointer to an array of `pViewportState->viewportCount` valid
`VkViewport` structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04131) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04131

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and `pViewportState->pScissors` is
not dynamic, then `pViewportState->pScissors` **must** be a valid
pointer to an array of `pViewportState->scissorCount` `VkRect2D`
structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-00749) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-00749

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and the [    `wideLines`](../../../../spec/latest/chapters/features.html#features-wideLines) feature is not enabled, and no element of the
`pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_LINE_WIDTH](VkDynamicState.html), the `lineWidth` member of
`pRasterizationState` **must** be `1.0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-rasterizerDiscardEnable-09024) VUID-VkGraphicsPipelineCreateInfo-rasterizerDiscardEnable-09024

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and
the [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](VkDynamicState.html) dynamic state is
enabled or
the `rasterizerDiscardEnable` member of `pRasterizationState` is
[VK_FALSE](VK_FALSE.html),
and [related dynamic state is not set](../../../../spec/latest/chapters/pipelines.html#pipelines-pViewportState-null),
`pViewportState` **must** be a valid pointer to a valid
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pViewportState-09025) VUID-VkGraphicsPipelineCreateInfo-pViewportState-09025

If `pViewportState` is not `NULL` it **must** be a valid pointer to a
valid [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pMultisampleState-09026) VUID-VkGraphicsPipelineCreateInfo-pMultisampleState-09026

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output),
and the `[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is not enabled
or any of the [VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](VkDynamicState.html), or
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](VkDynamicState.html) dynamic states is
not set, or the [alphaToOne](../../../../spec/latest/chapters/features.html#features-alphaToOne) feature is enabled
and [VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](VkDynamicState.html) is not set,
`pMultisampleState` **must** be a valid pointer to a valid
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pMultisampleState-09027) VUID-VkGraphicsPipelineCreateInfo-pMultisampleState-09027

If `pMultisampleState` is not `NULL` it **must** be a valid pointer to
a valid [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-alphaToCoverageEnable-08891) VUID-VkGraphicsPipelineCreateInfo-alphaToCoverageEnable-08891

If the pipeline is being created with
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
the
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)::`alphaToCoverageEnable`
is not ignored and is [VK_TRUE](VK_TRUE.html), then the
[Fragment Output Interface](../../../../spec/latest/chapters/interfaces.html#interfaces-fragmentoutput) **must** contain a
variable for the alpha `Component` word in `Location` 0 at
`Index` 0

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09028) VUID-VkGraphicsPipelineCreateInfo-renderPass-09028

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [fragment    shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), and `subpass` uses a depth/stencil attachment,
and [related dynamic state is not    set](../../../../spec/latest/chapters/pipelines.html#pipelines-pDepthStencilState-null),
`pDepthStencilState` **must** be a valid pointer to a valid
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDepthStencilState-09029) VUID-VkGraphicsPipelineCreateInfo-pDepthStencilState-09029

If `pDepthStencilState` is not `NULL` it **must** be a valid pointer to
a valid [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09030) VUID-VkGraphicsPipelineCreateInfo-renderPass-09030

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [fragment    output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and `subpass` uses color attachments,
and [related dynamic state is not    set](../../../../spec/latest/chapters/pipelines.html#pipelines-pColorBlendState-null),
`pColorBlendState` **must** be a valid pointer to a valid
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-00754) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-00754

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), the [    `depthBiasClamp`](../../../../spec/latest/chapters/features.html#features-depthBiasClamp) feature is not enabled, no element of the
`pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_DEPTH_BIAS](VkDynamicState.html), and the `depthBiasEnable` member
of `pRasterizationState` is [VK_TRUE](VK_TRUE.html), the `depthBiasClamp`
member of `pRasterizationState` **must** be `0.0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-02510) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-02510

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
the `[VK_EXT_depth_range_unrestricted](VK_EXT_depth_range_unrestricted.html)` extension is not enabled
and no element of the `pDynamicStates` member of `pDynamicState`
is [VK_DYNAMIC_STATE_DEPTH_BOUNDS](VkDynamicState.html), and the
`depthBoundsTestEnable` member of `pDepthStencilState` is
[VK_TRUE](VK_TRUE.html), the `minDepthBounds` and `maxDepthBounds` members
of `pDepthStencilState` **must** be between `0.0` and `1.0`, inclusive

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-10913) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-10913

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), no element of the `pDynamicStates` member
of `pDynamicState` is [VK_DYNAMIC_STATE_DEPTH_BOUNDS](VkDynamicState.html), and
`pDynamicStates` includes
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](VkDynamicState.html) or
the `depthBoundsTestEnable` member of `pDepthStencilState` is
[VK_TRUE](VK_TRUE.html), `minDepthBounds` **must** be less than or equal to
`maxDepthBounds`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07610) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07610

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) or [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and `rasterizationSamples` and
`sampleLocationsInfo` are not dynamic, and
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html)::`sampleLocationsEnable`
included in the `pNext` chain of `pMultisampleState` is
[VK_TRUE](VK_TRUE.html), `sampleLocationsInfo.sampleLocationGridSize.width`
**must** evenly divide
[VkMultisamplePropertiesEXT](VkMultisamplePropertiesEXT.html)::`maxSampleLocationGridSize.width`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](vkGetPhysicalDeviceMultisamplePropertiesEXT.html) with a
`samples` parameter equaling `rasterizationSamples`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07611) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07611

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) or [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and `rasterizationSamples` and
`sampleLocationsInfo` are not dynamic, and
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html)::`sampleLocationsEnable`
the included in the `pNext` chain of `pMultisampleState` is
[VK_TRUE](VK_TRUE.html) or [VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](VkDynamicState.html) is
used, `sampleLocationsInfo.sampleLocationGridSize.height` **must**
evenly divide
[VkMultisamplePropertiesEXT](VkMultisamplePropertiesEXT.html)::`maxSampleLocationGridSize.height`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](vkGetPhysicalDeviceMultisamplePropertiesEXT.html) with a
`samples` parameter equaling `rasterizationSamples`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07612) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07612

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) or [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and `rasterizationSamples` and
`sampleLocationsInfo` are not dynamic, and
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html)::`sampleLocationsEnable`
included in the `pNext` chain of `pMultisampleState` is
[VK_TRUE](VK_TRUE.html) or [VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](VkDynamicState.html) is
used, `sampleLocationsInfo.sampleLocationsPerPixel` **must** equal
`rasterizationSamples`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-sampleLocationsEnable-01524) VUID-VkGraphicsPipelineCreateInfo-sampleLocationsEnable-01524

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), and the `sampleLocationsEnable` member of a
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html) structure included in
the `pNext` chain of `pMultisampleState` is [VK_TRUE](VK_TRUE.html), the
fragment shader code **must** not statically use the extended instruction
`InterpolateAtSample`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-multisampledRenderToSingleSampled-06853) VUID-VkGraphicsPipelineCreateInfo-multisampledRenderToSingleSampled-06853

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and none of the
`[VK_AMD_mixed_attachment_samples](VK_AMD_mixed_attachment_samples.html)` extension, the
`[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension, or the
[    `multisampledRenderToSingleSampled`](../../../../spec/latest/chapters/features.html#features-multisampledRenderToSingleSampled) feature are enabled,
`rasterizationSamples` is not dynamic, and if `subpass` uses
color and/or depth/stencil attachments, then the
`rasterizationSamples` member of `pMultisampleState` **must** be
the same as the sample count for those subpass attachments

* 
[](#VUID-VkGraphicsPipelineCreateInfo-subpass-01505) VUID-VkGraphicsPipelineCreateInfo-subpass-01505

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and the
`[VK_AMD_mixed_attachment_samples](VK_AMD_mixed_attachment_samples.html)` extension is enabled,
`rasterizationSamples` is not dynamic, and if `subpass` uses
color and/or depth/stencil attachments, then the
`rasterizationSamples` member of `pMultisampleState` **must** equal
the maximum of the sample counts of those subpass attachments

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06854) VUID-VkGraphicsPipelineCreateInfo-renderPass-06854

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
`[VK_EXT_multisampled_render_to_single_sampled](VK_EXT_multisampled_render_to_single_sampled.html)` extension is
enabled, `rasterizationSamples` is not dynamic, and `subpass`
has a [VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html) structure
included in the [VkSubpassDescription2](VkSubpassDescription2.html)::`pNext` chain with
`multisampledRenderToSingleSampledEnable` equal to [VK_TRUE](VK_TRUE.html),
then the `rasterizationSamples` member of `pMultisampleState`
**must** be equal to
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html)::`rasterizationSamples`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-subpass-01411) VUID-VkGraphicsPipelineCreateInfo-subpass-01411

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), the
`[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension is enabled,
`rasterizationSamples` is not dynamic, and if `subpass` has a
depth/stencil attachment and depth test, stencil test, or depth bounds
test are enabled, then the `rasterizationSamples` member of
`pMultisampleState` **must** be the same as the sample count of the
depth/stencil attachment

* 
[](#VUID-VkGraphicsPipelineCreateInfo-subpass-01412) VUID-VkGraphicsPipelineCreateInfo-subpass-01412

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), the
`[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension is enabled,
`rasterizationSamples` is not dynamic, and if `subpass` has any
color attachments, then the `rasterizationSamples` member of
`pMultisampleState` **must** be greater than or equal to the sample
count for those subpass attachments

* 
[](#VUID-VkGraphicsPipelineCreateInfo-coverageReductionMode-02722) VUID-VkGraphicsPipelineCreateInfo-coverageReductionMode-02722

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), the [    `coverageReductionMode`](../../../../spec/latest/chapters/features.html#features-coverageReductionMode) feature is enabled, and
`rasterizationSamples` is not dynamic, the coverage reduction mode
specified by
[VkPipelineCoverageReductionStateCreateInfoNV](VkPipelineCoverageReductionStateCreateInfoNV.html)::`coverageReductionMode`,
the `rasterizationSamples` member of `pMultisampleState` and the
sample counts for the color and depth/stencil attachments (if the
subpass has them) **must** be a valid combination returned by
`vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-subpass-00758) VUID-VkGraphicsPipelineCreateInfo-subpass-00758

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `rasterizationSamples` is not
dynamic, and `subpass` does not use any color and/or depth/stencil
attachments, then the `rasterizationSamples` member of
`pMultisampleState` **must** follow the rules for a
[zero-attachment subpass](../../../../spec/latest/chapters/renderpass.html#renderpass-noattachments)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06046) VUID-VkGraphicsPipelineCreateInfo-renderPass-06046

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `subpass` **must** be
a valid subpass within `renderPass`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06047) VUID-VkGraphicsPipelineCreateInfo-renderPass-06047

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), `subpass` viewMask is not `0`, and
`multiviewTessellationShader` is not enabled, then `pStages`
**must** not include tessellation shaders

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06048) VUID-VkGraphicsPipelineCreateInfo-renderPass-06048

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), `subpass` viewMask is not `0`, and
`multiviewGeometryShader` is not enabled, then `pStages` **must**
not include a geometry shader

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06050) VUID-VkGraphicsPipelineCreateInfo-renderPass-06050

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and the pipeline is
being created with [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and `subpass` viewMask is not `0`,
then all of the shaders in the pipeline **must** not include variables
decorated with the `Layer` built-in decoration in their interfaces

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-07064) VUID-VkGraphicsPipelineCreateInfo-renderPass-07064

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), `subpass` viewMask is not `0`, and
`multiviewMeshShader` is not enabled, then `pStages` **must** not
include a mesh shader

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-12325) VUID-VkGraphicsPipelineCreateInfo-renderPass-12325

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), `pStages` include a mesh shader,
and `subpass` viewMask is not `0`, then the index of the most
significant bit in `viewMask` **must** be less than
[`maxMeshMultiviewViewCount`](../../../../spec/latest/chapters/limits.html#limits-maxMeshMultiviewViewCount)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-00764) VUID-VkGraphicsPipelineCreateInfo-flags-00764

`flags` **must** not contain the
[VK_PIPELINE_CREATE_DISPATCH_BASE_BIT](VkPipelineCreateFlagBits.html) flag

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-01565) VUID-VkGraphicsPipelineCreateInfo-pStages-01565

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) and an input attachment was referenced by an
`aspectMask` at `renderPass` creation time, the fragment shader
**must** only read from the aspects that were specified for that input
attachment

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-01688) VUID-VkGraphicsPipelineCreateInfo-layout-01688

The number of resources in `layout` accessible to each shader stage
that is used by the pipeline **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageResources`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-01715) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-01715

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and no element of the
`pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](VkDynamicState.html), and the
`viewportWScalingEnable` member of a
[VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html) structure, included in
the `pNext` chain of `pViewportState`, is [VK_TRUE](VK_TRUE.html), the
`pViewportWScalings` member of the
[VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html) **must** be a pointer to
an array of
[VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html)::`viewportCount`
valid [VkViewportWScalingNV](VkViewportWScalingNV.html) structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04056) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04056

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and no element of the
`pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_NV](VkDynamicState.html), and if
`pViewportState->pNext` chain includes a
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](VkPipelineViewportExclusiveScissorStateCreateInfoNV.html) structure, and
if its `exclusiveScissorCount` member is not `0`, then its
`pExclusiveScissors` member **must** be a valid pointer to an array of
`exclusiveScissorCount` [VkRect2D](VkRect2D.html) structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07854) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07854

If [VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_ENABLE_NV](VkDynamicState.html) is included in the
`pDynamicStates` array then the implementation **must** support at
least `specVersion` `2` of the `[VK_NV_scissor_exclusive](VK_NV_scissor_exclusive.html)`
extension

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04057) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04057

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and no element of the
`pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](VkDynamicState.html), and if
`pViewportState->pNext` chain includes a
[VkPipelineViewportShadingRateImageStateCreateInfoNV](VkPipelineViewportShadingRateImageStateCreateInfoNV.html) structure,
then its `pShadingRatePalettes` member **must** be a valid pointer to
an array of `viewportCount` valid [VkShadingRatePaletteNV](VkShadingRatePaletteNV.html)
structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04058) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04058

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and no element of the
`pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](VkDynamicState.html), and if `pNext` chain
includes a [VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html) structure,
and if its `discardRectangleCount` member is not `0`, then its
`pDiscardRectangles` member **must** be a valid pointer to an array of
`discardRectangleCount` [VkRect2D](VkRect2D.html) structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07855) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07855

If [VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](VkDynamicState.html) is included in
the `pDynamicStates` array then the implementation **must** support at
least `specVersion` `2` of the `[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html)`
extension

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07856) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07856

If [VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](VkDynamicState.html) is included in the
`pDynamicStates` array then the implementation **must** support at
least `specVersion` `2` of the `[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html)`
extension

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-02097) VUID-VkGraphicsPipelineCreateInfo-pStages-02097

If the pipeline requires [    vertex input state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input), and `pVertexInputState` is not dynamic, then
`pVertexInputState` **must** be a valid pointer to a valid
[VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-Input-07904) VUID-VkGraphicsPipelineCreateInfo-Input-07904

If
the [    `vertexAttributeRobustness`](../../../../spec/latest/chapters/features.html#features-vertexAttributeRobustness) feature is not enabled, and
the [`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature is not
enabled, and
the pipeline is being created with
[vertex input state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input) and
`pVertexInputState` is not dynamic, then all variables with the
`Input` storage class decorated with `Location` in the `Vertex`
`Execution` `Model` `OpEntryPoint` **must** contain a location in
[VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html)::`location`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-Input-08733) VUID-VkGraphicsPipelineCreateInfo-Input-08733

If the pipeline requires [    vertex input state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input) and `pVertexInputState` is not dynamic, then
the numeric type associated with all `Input` variables of the
corresponding `Location` in the `Vertex` `Execution` `Model`
`OpEntryPoint` **must** be the same as
[VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html)::`format`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pVertexInputState-08929) VUID-VkGraphicsPipelineCreateInfo-pVertexInputState-08929

If the pipeline is being created with
[vertex input state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input) and
`pVertexInputState` is not dynamic, and
[VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html)::`format` has a 64-bit
component, then the scalar width associated with all `Input`
variables of the corresponding `Location` in the `Vertex`
`Execution` `Model` `OpEntryPoint` **must** be 64-bit

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pVertexInputState-08930) VUID-VkGraphicsPipelineCreateInfo-pVertexInputState-08930

If the pipeline is being created with
[vertex input state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input) and
`pVertexInputState` is not dynamic, and the scalar width associated
with a `Location` decorated `Input` variable in the `Vertex`
`Execution` `Model` `OpEntryPoint` is 64-bit, then the corresponding
[VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html)::`format` **must** have a
64-bit component

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pVertexInputState-09198) VUID-VkGraphicsPipelineCreateInfo-pVertexInputState-09198

If the pipeline is being created with
[vertex input state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input) and
`pVertexInputState` is not dynamic, and
[VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html)::`format` has a 64-bit
component, then all `Input` variables at the corresponding
`Location` in the `Vertex` `Execution` `Model` `OpEntryPoint`
**must** not use components that are not present in the format

* 
[](#VUID-VkGraphicsPipelineCreateInfo-dynamicPrimitiveTopologyUnrestricted-09031) VUID-VkGraphicsPipelineCreateInfo-dynamicPrimitiveTopologyUnrestricted-09031

If the pipeline requires [    vertex input state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input),
and [related dynamic state is not    set](../../../../spec/latest/chapters/pipelines.html#pipelines-pInputAssemblyState-null),
`pInputAssemblyState` **must** be a valid pointer to a valid
[VkPipelineInputAssemblyStateCreateInfo](VkPipelineInputAssemblyStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pInputAssemblyState-09032) VUID-VkGraphicsPipelineCreateInfo-pInputAssemblyState-09032

If `pInputAssemblyState` is not `NULL` it **must** be a valid pointer
to a valid [VkPipelineInputAssemblyStateCreateInfo](VkPipelineInputAssemblyStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-02317) VUID-VkGraphicsPipelineCreateInfo-pStages-02317

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), the `Xfb` execution mode **can** be
specified by no more than one shader stage in `pStages`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-02318) VUID-VkGraphicsPipelineCreateInfo-pStages-02318

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and any shader stage in `pStages`
specifies `Xfb` execution mode it **must** be the last
[pre-rasterization shader    stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-rasterizationStream-02319) VUID-VkGraphicsPipelineCreateInfo-rasterizationStream-02319

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and a
[VkPipelineRasterizationStateStreamCreateInfoEXT](VkPipelineRasterizationStateStreamCreateInfoEXT.html)::`rasterizationStream`
value other than zero is specified, all variables in the output
interface of the entry point being compiled decorated with
`Position`, `PointSize`, `ClipDistance`, or `CullDistance`
**must** be decorated with identical `Stream` values that match the
`rasterizationStream`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-rasterizationStream-02320) VUID-VkGraphicsPipelineCreateInfo-rasterizationStream-02320

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and
[VkPipelineRasterizationStateStreamCreateInfoEXT](VkPipelineRasterizationStateStreamCreateInfoEXT.html)::`rasterizationStream`
is zero, or not specified, all variables in the output interface of the
entry point being compiled decorated with `Position`, `PointSize`,
`ClipDistance`, or `CullDistance` **must** be decorated with a
`Stream` value of zero, or **must** not specify the `Stream`
decoration

* 
[](#VUID-VkGraphicsPipelineCreateInfo-geometryStreams-02321) VUID-VkGraphicsPipelineCreateInfo-geometryStreams-02321

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and the last
[pre-rasterization shader    stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) is a geometry shader, and that geometry shader uses the
`GeometryStreams` capability, then
`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`geometryStreams`
feature **must** be enabled

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-02322) VUID-VkGraphicsPipelineCreateInfo-None-02322

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and there are any mesh shader stages
in the pipeline there **must** not be any shader stage in the pipeline with
a `Xfb` execution mode

* 
[](#VUID-VkGraphicsPipelineCreateInfo-lineRasterizationMode-02766) VUID-VkGraphicsPipelineCreateInfo-lineRasterizationMode-02766

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and at least one of
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output) or [fragment shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), and `pMultisampleState` is not `NULL`, the
`lineRasterizationMode` member of a
[VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html) structure included in
the `pNext` chain of `pRasterizationState` is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](VkLineRasterizationMode.html) or
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](VkLineRasterizationMode.html), then the
`alphaToCoverageEnable`, `alphaToOneEnable`, and
`sampleShadingEnable` members of `pMultisampleState` **must** all
be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-stippledLineEnable-02767) VUID-VkGraphicsPipelineCreateInfo-stippledLineEnable-02767

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), the `stippledLineEnable` member of
[VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html) is [VK_TRUE](VK_TRUE.html), and
no element of the `pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_LINE_STIPPLE](VkDynamicState.html), then the `lineStippleFactor`
member of [VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html) **must** be in
the range [1,256]

* 
[](#VUID-VkGraphicsPipelineCreateInfo-shaderMeshEnqueue-10187) VUID-VkGraphicsPipelineCreateInfo-shaderMeshEnqueue-10187

If the [`shaderMeshEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderMeshEnqueue) feature is
not enabled, shaders specified by `pStages` **must** not declare the
`ShaderEnqueueAMDX` capability

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-10188) VUID-VkGraphicsPipelineCreateInfo-flags-10188

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html), shaders specified by
`pStages` **must** not declare the `ShaderEnqueueAMDX` capability

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-10189) VUID-VkGraphicsPipelineCreateInfo-pStages-10189

If any shader stages in `pStages` declare the `ShaderEnqueueAMDX`
capability, [VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](VkPipelineCreateFlagBits2.html) and
[VK_PIPELINE_CREATE_2_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits2.html) **must** be included in
`flags`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-10190) VUID-VkGraphicsPipelineCreateInfo-flags-10190

If [VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](VkPipelineCreateFlagBits2.html) is included in
`flags`, and the pipeline requires
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), there **must** not be a task or vertex shader specified in
`pStages`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-10191) VUID-VkGraphicsPipelineCreateInfo-flags-10191

If [VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](VkPipelineCreateFlagBits2.html) is included in
`flags`, all elements of
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` **must** have been
created with [VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03372) VUID-VkGraphicsPipelineCreateInfo-flags-03372

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03373) VUID-VkGraphicsPipelineCreateInfo-flags-03373

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03374) VUID-VkGraphicsPipelineCreateInfo-flags-03374

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03375) VUID-VkGraphicsPipelineCreateInfo-flags-03375

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03376) VUID-VkGraphicsPipelineCreateInfo-flags-03376

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03377) VUID-VkGraphicsPipelineCreateInfo-flags-03377

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03577) VUID-VkGraphicsPipelineCreateInfo-flags-03577

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-04947) VUID-VkGraphicsPipelineCreateInfo-flags-04947

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03378) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03378

    If
    the [`extendedDynamicState`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState)
    feature is not enabled,
and
    the minimum value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to
    create the [VkInstance](VkInstance.html) and `apiVersion` supported by the
    physical device is less than Version 1.3
    there **must** be no element of the `pDynamicStates` member of
    `pDynamicState` set to [VK_DYNAMIC_STATE_CULL_MODE](VkDynamicState.html),
    [VK_DYNAMIC_STATE_FRONT_FACE](VkDynamicState.html),
    [VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](VkDynamicState.html),
    [VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html),
    [VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html),
    [VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](VkDynamicState.html),
    [VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](VkDynamicState.html),
    [VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](VkDynamicState.html),
    [VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](VkDynamicState.html),
    [VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](VkDynamicState.html),
    [VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](VkDynamicState.html), or
    [VK_DYNAMIC_STATE_STENCIL_OP](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03379) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03379

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) is included in the
`pDynamicStates` array then `viewportCount` **must** be zero

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03380) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03380

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html) is included in the
`pDynamicStates` array then `scissorCount` **must** be zero

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04132) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04132

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) is included in the
`pDynamicStates` array then [VK_DYNAMIC_STATE_VIEWPORT](VkDynamicState.html) **must**
not be present

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04133) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04133

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html) is included in the
`pDynamicStates` array then [VK_DYNAMIC_STATE_SCISSOR](VkDynamicState.html) **must** not
be present

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07065) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07065

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and includes a mesh shader, there
**must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](VkDynamicState.html), or
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04868) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04868

    If
    the [`extendedDynamicState2`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState2)
    feature is not enabled,
and
    the minimum value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to
    create the [VkInstance](VkInstance.html) and `apiVersion` supported by the
    physical device is less than Version 1.3
    there **must** be no element of the `pDynamicStates` member of
    `pDynamicState` set to [VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](VkDynamicState.html),
    [VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](VkDynamicState.html), or
    [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04869) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04869

If the [    `extendedDynamicState2LogicOp`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState2LogicOp) feature is not enabled, there **must**
be no element of the `pDynamicStates` member of `pDynamicState`
set to [VK_DYNAMIC_STATE_LOGIC_OP_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04870) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04870

If the [    `extendedDynamicState2PatchControlPoints`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState2PatchControlPoints) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07066) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07066

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and includes a mesh shader, there
**must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](VkDynamicState.html), or
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-02877) VUID-VkGraphicsPipelineCreateInfo-flags-02877

If `flags` includes
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-02966) VUID-VkGraphicsPipelineCreateInfo-flags-02966

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and `flags` includes
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html), then all stages **must**
not specify `Xfb` execution mode

* 
[](#VUID-VkGraphicsPipelineCreateInfo-libraryCount-06648) VUID-VkGraphicsPipelineCreateInfo-libraryCount-06648

If the pipeline is not created with a
[complete set of state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete),
or [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`libraryCount` is not `0`,
[VkGraphicsPipelineShaderGroupsCreateInfoNV](VkGraphicsPipelineShaderGroupsCreateInfoNV.html)::`groupCount` and
[VkGraphicsPipelineShaderGroupsCreateInfoNV](VkGraphicsPipelineShaderGroupsCreateInfoNV.html)::`pipelineCount`
**must** be `0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-libraryCount-06649) VUID-VkGraphicsPipelineCreateInfo-libraryCount-06649

If the pipeline is created with a [    complete set of state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete),
and [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`libraryCount` is `0`,
and the `pNext` chain includes an instance of
[VkGraphicsPipelineShaderGroupsCreateInfoNV](VkGraphicsPipelineShaderGroupsCreateInfoNV.html),
[VkGraphicsPipelineShaderGroupsCreateInfoNV](VkGraphicsPipelineShaderGroupsCreateInfoNV.html)::`groupCount` **must**
be greater than `0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11000) VUID-VkGraphicsPipelineCreateInfo-flags-11000

If `flags` includes
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](VkPipelineCreateFlagBits2.html), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommands)
feature **must** be enabled

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11001) VUID-VkGraphicsPipelineCreateInfo-flags-11001

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and `flags` includes
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](VkPipelineCreateFlagBits2.html), then all stages
**must** not specify `Xfb` execution mode

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04494) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04494

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`fragmentSize.width`
**must** be greater than or equal to `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04495) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04495

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`fragmentSize.height`
**must** be greater than or equal to `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04496) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04496

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`fragmentSize.width`
**must** be a power-of-two value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04497) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04497

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`fragmentSize.height`
**must** be a power-of-two value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04498) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04498

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`fragmentSize.width`
**must** be less than or equal to `4`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04499) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04499

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`fragmentSize.height`
**must** be less than or equal to `4`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04500) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04500

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`, and the
[    `pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) feature is not enabled,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`fragmentSize.width`
and
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`fragmentSize.height`
**must** both be equal to `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06567) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06567

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`combinerOps`[0]
**must** be a valid [VkFragmentShadingRateCombinerOpKHR](VkFragmentShadingRateCombinerOpKHR.html) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06568) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06568

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`combinerOps`[1]
**must** be a valid [VkFragmentShadingRateCombinerOpKHR](VkFragmentShadingRateCombinerOpKHR.html) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04501) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04501

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`, and the
[    `primitiveFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-primitiveFragmentShadingRate) feature is not enabled,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`combinerOps`[0]
**must** be [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](VkFragmentShadingRateCombinerOpKHR.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04502) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04502

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`, and the
[    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) feature is not enabled,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`combinerOps`[1]
**must** be [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](VkFragmentShadingRateCombinerOpKHR.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-primitiveFragmentShadingRateWithMultipleViewports-04503) VUID-VkGraphicsPipelineCreateInfo-primitiveFragmentShadingRateWithMultipleViewports-04503

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and the
[    `primitiveFragmentShadingRateWithMultipleViewports`](../../../../spec/latest/chapters/limits.html#limits-primitiveFragmentShadingRateWithMultipleViewports) limit is not
supported, [VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`, and
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)::`viewportCount` is greater
than `1`, entry points specified in `pStages` **must** not write to the
`PrimitiveShadingRateKHR` built-in

* 
[](#VUID-VkGraphicsPipelineCreateInfo-primitiveFragmentShadingRateWithMultipleViewports-04504) VUID-VkGraphicsPipelineCreateInfo-primitiveFragmentShadingRateWithMultipleViewports-04504

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and the
[    `primitiveFragmentShadingRateWithMultipleViewports`](../../../../spec/latest/chapters/limits.html#limits-primitiveFragmentShadingRateWithMultipleViewports) limit is not
supported, and entry points specified in `pStages` write to the
`ViewportIndex` built-in, they **must** not also write to the
`PrimitiveShadingRateKHR` built-in

* 
[](#VUID-VkGraphicsPipelineCreateInfo-primitiveFragmentShadingRateWithMultipleViewports-04505) VUID-VkGraphicsPipelineCreateInfo-primitiveFragmentShadingRateWithMultipleViewports-04505

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and the
[    `primitiveFragmentShadingRateWithMultipleViewports`](../../../../spec/latest/chapters/limits.html#limits-primitiveFragmentShadingRateWithMultipleViewports) limit is not
supported, and entry points specified in `pStages` write to the
`ViewportMaskNV` built-in, they **must** not also write to the
`PrimitiveShadingRateKHR` built-in

* 
[](#VUID-VkGraphicsPipelineCreateInfo-fragmentShadingRateNonTrivialCombinerOps-04506) VUID-VkGraphicsPipelineCreateInfo-fragmentShadingRateNonTrivialCombinerOps-04506

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
the [    `fragmentShadingRateNonTrivialCombinerOps`](../../../../spec/latest/chapters/limits.html#limits-fragmentShadingRateNonTrivialCombinerOps) limit is not supported,
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`, elements of
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`combinerOps`
**must** be [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](VkFragmentShadingRateCombinerOpKHR.html) or
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_REPLACE_KHR](VkFragmentShadingRateCombinerOpKHR.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-06569) VUID-VkGraphicsPipelineCreateInfo-None-06569

 If the pipeline requires [     fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)::`shadingRateType`
**must** be a valid [VkFragmentShadingRateTypeNV](VkFragmentShadingRateTypeNV.html) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06570) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06570

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)::`shadingRate`
**must** be a valid [VkFragmentShadingRateNV](VkFragmentShadingRateNV.html) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06571) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06571

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)::`combinerOps`[0]
**must** be a valid [VkFragmentShadingRateCombinerOpKHR](VkFragmentShadingRateCombinerOpKHR.html) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06572) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06572

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)::`combinerOps`[1]
**must** be a valid [VkFragmentShadingRateCombinerOpKHR](VkFragmentShadingRateCombinerOpKHR.html) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04569) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04569

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`, and the
[`fragmentShadingRateEnums`](../../../../spec/latest/chapters/features.html#features-fragmentShadingRateEnums)
feature is not enabled,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)::`shadingRateType`
**must** be equal to [VK_FRAGMENT_SHADING_RATE_TYPE_FRAGMENT_SIZE_NV](VkFragmentShadingRateTypeNV.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04570) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04570

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`, and the
[    `pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) feature is not enabled,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)::`shadingRate`
**must** be equal to
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_PIXEL_NV](VkFragmentShadingRateNV.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04571) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04571

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`, and the
[    `primitiveFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-primitiveFragmentShadingRate) feature is not enabled,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)::`combinerOps`[0]
**must** be [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](VkFragmentShadingRateCombinerOpKHR.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04572) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04572

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`, and the
[    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) feature is not enabled,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)::`combinerOps`[1]
**must** be [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](VkFragmentShadingRateCombinerOpKHR.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-fragmentShadingRateNonTrivialCombinerOps-04573) VUID-VkGraphicsPipelineCreateInfo-fragmentShadingRateNonTrivialCombinerOps-04573

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), and the
[    `fragmentShadingRateNonTrivialCombinerOps`](../../../../spec/latest/chapters/limits.html#limits-fragmentShadingRateNonTrivialCombinerOps) limit is not supported
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html) is not included in
`pDynamicState->pDynamicStates`, elements of
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)::`combinerOps`
**must** be [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](VkFragmentShadingRateCombinerOpKHR.html) or
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_REPLACE_KHR](VkFragmentShadingRateCombinerOpKHR.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-04574) VUID-VkGraphicsPipelineCreateInfo-None-04574

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), and the
[    `supersampleFragmentShadingRates`](../../../../spec/latest/chapters/features.html#features-supersampleFragmentShadingRates) feature is not enabled,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)::`shadingRate`
**must** not be equal to
[VK_FRAGMENT_SHADING_RATE_2_INVOCATIONS_PER_PIXEL_NV](VkFragmentShadingRateNV.html),
[VK_FRAGMENT_SHADING_RATE_4_INVOCATIONS_PER_PIXEL_NV](VkFragmentShadingRateNV.html),
[VK_FRAGMENT_SHADING_RATE_8_INVOCATIONS_PER_PIXEL_NV](VkFragmentShadingRateNV.html), or
[VK_FRAGMENT_SHADING_RATE_16_INVOCATIONS_PER_PIXEL_NV](VkFragmentShadingRateNV.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-04575) VUID-VkGraphicsPipelineCreateInfo-None-04575

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), and the
[    `noInvocationFragmentShadingRates`](../../../../spec/latest/chapters/features.html#features-noInvocationFragmentShadingRates) feature is not enabled,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)::`shadingRate`
**must** not be equal to [VK_FRAGMENT_SHADING_RATE_NO_INVOCATIONS_NV](VkFragmentShadingRateNV.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03578) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03578

All elements of the `pDynamicStates` member of `pDynamicState`
**must** not be [VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04807) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04807

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) and the
[`vertexInputDynamicState`](../../../../spec/latest/chapters/features.html#features-vertexInputDynamicState)
feature is not enabled, there **must** be no element of the
`pDynamicStates` member of `pDynamicState` set to
[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07067) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07067

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and includes a mesh shader, there
**must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04800) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04800

If the [`colorWriteEnable`](../../../../spec/latest/chapters/features.html#features-colorWriteEnable) feature is
not enabled, there **must** be no element of the `pDynamicStates`
member of `pDynamicState` set to
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-rasterizationSamples-04899) VUID-VkGraphicsPipelineCreateInfo-rasterizationSamples-04899

    If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), and
    the `[VK_QCOM_render_pass_shader_resolve](VK_QCOM_render_pass_shader_resolve.html)` extension
or
    the [`customResolve`](../../../../spec/latest/chapters/features.html#features-customResolve) feature
    is enabled, `rasterizationSamples` is not dynamic, and if subpass
    has any input attachments, and if the subpass description contains
    [VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT](VkSubpassDescriptionFlagBits.html), then the sample
    count of the input attachments **must** equal `rasterizationSamples`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-sampleShadingEnable-04900) VUID-VkGraphicsPipelineCreateInfo-sampleShadingEnable-04900

    If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), and
    the `[VK_QCOM_render_pass_shader_resolve](VK_QCOM_render_pass_shader_resolve.html)` extension
or
    the [`customResolve`](../../../../spec/latest/chapters/features.html#features-customResolve) feature
    is enabled, and if the subpass description contains
    [VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT](VkSubpassDescriptionFlagBits.html), then
    `sampleShadingEnable` **must** be false

* 
[](#VUID-VkGraphicsPipelineCreateInfo-dynamicRendering-06576) VUID-VkGraphicsPipelineCreateInfo-dynamicRendering-06576

If the [`dynamicRendering`](../../../../spec/latest/chapters/features.html#features-dynamicRendering) feature is
not enabled and the pipeline requires
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), [fragment shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), or [fragment    output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` **must** not be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-multiview-06577) VUID-VkGraphicsPipelineCreateInfo-multiview-06577

If the [`multiview`](../../../../spec/latest/chapters/features.html#features-multiview) feature is not enabled,
the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization),
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
or [fragment output    interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` **must** be `0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06578) VUID-VkGraphicsPipelineCreateInfo-renderPass-06578

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization),
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
or [fragment output    interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
index of the most significant bit in
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` **must** be less than
[`maxMultiviewViewCount`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxMultiviewViewCount)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06579) VUID-VkGraphicsPipelineCreateInfo-renderPass-06579

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`colorAttachmentCount` is not
0, [VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`pColorAttachmentFormats`
**must** be a valid pointer to an array of `colorAttachmentCount` valid
[VkFormat](VkFormat.html) values

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06580) VUID-VkGraphicsPipelineCreateInfo-renderPass-06580

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), each element of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`pColorAttachmentFormats` **must**
be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06582) VUID-VkGraphicsPipelineCreateInfo-renderPass-06582

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), and any element of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`pColorAttachmentFormats` is
not [VK_FORMAT_UNDEFINED](VkFormat.html), that format **must** be a format with
[potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)
or [VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06583) VUID-VkGraphicsPipelineCreateInfo-renderPass-06583

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html),
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`depthAttachmentFormat` **must**
be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06584) VUID-VkGraphicsPipelineCreateInfo-renderPass-06584

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html),
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`stencilAttachmentFormat` **must**
be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06585) VUID-VkGraphicsPipelineCreateInfo-renderPass-06585

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`depthAttachmentFormat` is not
[VK_FORMAT_UNDEFINED](VkFormat.html), it **must** be a format with
[potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06586) VUID-VkGraphicsPipelineCreateInfo-renderPass-06586

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`stencilAttachmentFormat` is
not [VK_FORMAT_UNDEFINED](VkFormat.html), it **must** be a format with
[potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06587) VUID-VkGraphicsPipelineCreateInfo-renderPass-06587

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`depthAttachmentFormat` is not
[VK_FORMAT_UNDEFINED](VkFormat.html), it **must** be a format that includes a depth
component

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06588) VUID-VkGraphicsPipelineCreateInfo-renderPass-06588

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`stencilAttachmentFormat` is
not [VK_FORMAT_UNDEFINED](VkFormat.html), it **must** be a format that includes a
stencil component

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06589) VUID-VkGraphicsPipelineCreateInfo-renderPass-06589

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html),
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`depthAttachmentFormat` is not
[VK_FORMAT_UNDEFINED](VkFormat.html), and
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`stencilAttachmentFormat` is
not [VK_FORMAT_UNDEFINED](VkFormat.html), `depthAttachmentFormat` **must** equal
`stencilAttachmentFormat`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09033) VUID-VkGraphicsPipelineCreateInfo-renderPass-09033

If `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [fragment    shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) and [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and either of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`depthAttachmentFormat` or
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`stencilAttachmentFormat` are
not [VK_FORMAT_UNDEFINED](VkFormat.html),
and the `[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is not enabled
or any of the [VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](VkDynamicState.html),
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_STENCIL_OP](VkDynamicState.html), or
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](VkDynamicState.html) dynamic states are not set,
`pDepthStencilState` **must** be a valid pointer to a valid
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDepthStencilState-09034) VUID-VkGraphicsPipelineCreateInfo-pDepthStencilState-09034

If `pDepthStencilState` is not `NULL` it **must** be a valid pointer to
a valid [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09035) VUID-VkGraphicsPipelineCreateInfo-renderPass-09035

If `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and the pipeline is being
created with [fragment    shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) but not [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output),
and the `[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is not
enabled, or any of the [VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](VkDynamicState.html),
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](VkDynamicState.html),
[VK_DYNAMIC_STATE_STENCIL_OP](VkDynamicState.html), or
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](VkDynamicState.html) dynamic states are not set,
`pDepthStencilState` **must** be a valid pointer to a valid
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDepthStencilState-09036) VUID-VkGraphicsPipelineCreateInfo-pDepthStencilState-09036

If `pDepthStencilState` is not `NULL` it **must** be a valid pointer to
a valid [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09037) VUID-VkGraphicsPipelineCreateInfo-renderPass-09037

If `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [fragment    output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and any element of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`pColorAttachmentFormats` is
not [VK_FORMAT_UNDEFINED](VkFormat.html),
and the `[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is not
enabled, or any of the [VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html), or
[VK_DYNAMIC_STATE_BLEND_CONSTANTS](VkDynamicState.html) dynamic states are not set,
`pColorBlendState` **must** be a valid pointer to a valid
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pColorBlendState-09038) VUID-VkGraphicsPipelineCreateInfo-pColorBlendState-09038

If `pColorBlendState` is not `NULL` it **must** be a valid pointer to a
valid [VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06055) VUID-VkGraphicsPipelineCreateInfo-renderPass-06055

If `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pColorBlendState` is
not dynamic, and the pipeline is being created with
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `pColorBlendState->attachmentCount` **must** be equal to
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`colorAttachmentCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-11504) VUID-VkGraphicsPipelineCreateInfo-renderPass-11504

If `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), a
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) is in the pNext chain, and the
pipeline is being created with
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), [VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`colorAttachmentCount`
**must** be equal to
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`colorAttachmentCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06057) VUID-VkGraphicsPipelineCreateInfo-renderPass-06057

If `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization),
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` is not `0`, and the
[`multiviewTessellationShader`](../../../../spec/latest/chapters/features.html#features-multiview-tess) feature
is not enabled, then `pStages` **must** not include tessellation
shaders

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06058) VUID-VkGraphicsPipelineCreateInfo-renderPass-06058

If `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization),
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` is not `0`, and the
[`multiviewGeometryShader`](../../../../spec/latest/chapters/features.html#features-multiview-gs) feature is not
enabled, then `pStages` **must** not include a geometry shader

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06059) VUID-VkGraphicsPipelineCreateInfo-renderPass-06059

If `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` is not `0`, all of
the shaders in the pipeline **must** not include variables decorated with
the `Layer` built-in decoration in their interfaces

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-07720) VUID-VkGraphicsPipelineCreateInfo-renderPass-07720

If `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` is not `0`, and
`multiviewMeshShader` is not enabled, then `pStages` **must** not
include a mesh shader

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-12326) VUID-VkGraphicsPipelineCreateInfo-renderPass-12326

If `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), `pStages` include a mesh shader,
and [VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` is not `0`, then
the index of the most significant bit in `viewMask` **must** be less
than [    `maxMeshMultiviewViewCount`](../../../../spec/latest/chapters/limits.html#limits-maxMeshMultiviewViewCount)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06061) VUID-VkGraphicsPipelineCreateInfo-renderPass-06061

If
the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), and `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
fragment shaders in `pStages` **must** not include the
`InputAttachment` capability

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-08710) VUID-VkGraphicsPipelineCreateInfo-renderPass-08710

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) and `renderPass` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), fragment shaders in `pStages` **must** not
include any of the `TileImageColorReadAccessEXT`,
`TileImageDepthReadAccessEXT`, or `TileImageStencilReadAccessEXT`
capabilities

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06062) VUID-VkGraphicsPipelineCreateInfo-renderPass-06062

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output) and `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), for each color attachment format defined by the
`pColorAttachmentFormats` member of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html), if its
[potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) do not contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](VkFormatFeatureFlagBits.html), then the
`blendEnable` member of the corresponding element of the
`pAttachments` member of `pColorBlendState` **must** be
[VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06063) VUID-VkGraphicsPipelineCreateInfo-renderPass-06063

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output) and `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), if the `pNext` chain includes
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
`VkAttachmentSampleCountInfoNV`, the `colorAttachmentCount`
member of that structure **must** be equal to the value of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`colorAttachmentCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06591) VUID-VkGraphicsPipelineCreateInfo-flags-06591

If `pStages` includes a fragment shader stage, and the fragment
shader declares the `EarlyFragmentTests` execution mode, the
`flags` member of [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) **must**
not include
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](VkPipelineDepthStencilStateCreateFlagBits.html)
or
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](VkPipelineDepthStencilStateCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06482) VUID-VkGraphicsPipelineCreateInfo-flags-06482

If
the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and the `flags` member of
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html) includes
[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](VkPipelineColorBlendStateCreateFlagBits.html),
`renderPass` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-09526) VUID-VkGraphicsPipelineCreateInfo-None-09526

If
the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), and the `flags` member of
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) includes
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](VkPipelineDepthStencilStateCreateFlagBits.html)
or
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](VkPipelineDepthStencilStateCreateFlagBits.html),
`renderPass` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pColorAttachmentSamples-06592) VUID-VkGraphicsPipelineCreateInfo-pColorAttachmentSamples-06592

If the [fragment output    interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), elements of the `pColorAttachmentSamples` member
of [VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) **must** be valid
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) values

* 
[](#VUID-VkGraphicsPipelineCreateInfo-depthStencilAttachmentSamples-06593) VUID-VkGraphicsPipelineCreateInfo-depthStencilAttachmentSamples-06593

If the [fragment output    interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output) and the `depthStencilAttachmentSamples` member of
[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html) or
[VkAttachmentSampleCountInfoNV](VkAttachmentSampleCountInfoAMD.html) is not 0, it **must** be a valid
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09527) VUID-VkGraphicsPipelineCreateInfo-renderPass-09527

If the pipeline requires [    fragment output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the `flags` member of
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html) includes
[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](VkPipelineColorBlendStateCreateFlagBits.html)
`subpass` **must** have been created with
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT](VkSubpassDescriptionFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09528) VUID-VkGraphicsPipelineCreateInfo-renderPass-09528

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
and the `flags` member of
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) includes
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](VkPipelineDepthStencilStateCreateFlagBits.html),
`subpass` **must** have been created with
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](VkSubpassDescriptionFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09529) VUID-VkGraphicsPipelineCreateInfo-renderPass-09529

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
and the `flags` member of
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) includes
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](VkPipelineDepthStencilStateCreateFlagBits.html),
`subpass` **must** have been created with
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](VkSubpassDescriptionFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pipelineStageCreationFeedbackCount-06594) VUID-VkGraphicsPipelineCreateInfo-pipelineStageCreationFeedbackCount-06594

If
[VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html)::`pipelineStageCreationFeedbackCount`
is not `0`, it **must** be equal to `stageCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06595) VUID-VkGraphicsPipelineCreateInfo-renderPass-06595

If `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline is being
created with [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
and
[VkMultiviewPerViewAttributesInfoNVX](VkMultiviewPerViewAttributesInfoNVX.html)::`perViewAttributesPositionXOnly`
is [VK_TRUE](VK_TRUE.html) then
[VkMultiviewPerViewAttributesInfoNVX](VkMultiviewPerViewAttributesInfoNVX.html)::`perViewAttributes` **must**
also be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06596) VUID-VkGraphicsPipelineCreateInfo-flags-06596

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
only one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and an
element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes the other flag, the value of
[VkMultiviewPerViewAttributesInfoNVX](VkMultiviewPerViewAttributesInfoNVX.html)::`perViewAttributes`
specified in both this pipeline and the library **must** be equal

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06597) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06597

If one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), the value of
[VkMultiviewPerViewAttributesInfoNVX](VkMultiviewPerViewAttributesInfoNVX.html)::`perViewAttributes`
specified in both libraries **must** be equal

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06598) VUID-VkGraphicsPipelineCreateInfo-flags-06598

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
only one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and an
element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes the other flag, the value of
[VkMultiviewPerViewAttributesInfoNVX](VkMultiviewPerViewAttributesInfoNVX.html)::`perViewAttributesPositionXOnly`
specified in both this pipeline and the library **must** be equal

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06599) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06599

If one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), the value of
[VkMultiviewPerViewAttributesInfoNVX](VkMultiviewPerViewAttributesInfoNVX.html)::`perViewAttributesPositionXOnly`
specified in both libraries **must** be equal

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-06600) VUID-VkGraphicsPipelineCreateInfo-pStages-06600

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
`pStages` **must** be a valid pointer to an array of `stageCount`
valid [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-stageCount-09587) VUID-VkGraphicsPipelineCreateInfo-stageCount-09587

If the pipeline does not require
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or [fragment shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader), `stageCount` **must** be zero

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pRasterizationState-06601) VUID-VkGraphicsPipelineCreateInfo-pRasterizationState-06601

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization),
and [related dynamic state is not    set](../../../../spec/latest/chapters/pipelines.html#pipelines-pRasterizationState-null),
`pRasterizationState` **must** be a valid pointer to a valid
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pRasterizationState-09039) VUID-VkGraphicsPipelineCreateInfo-pRasterizationState-09039

If
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and
[related dynamic state is not set](../../../../spec/latest/chapters/pipelines.html#pipelines-pMultisampleState-null),
then `pMultisampleState` **must** be a valid pointer to a valid
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pRasterizationState-09040) VUID-VkGraphicsPipelineCreateInfo-pRasterizationState-09040

If `pRasterizationState` is not `NULL` it **must** be a valid pointer
to a valid [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-06602) VUID-VkGraphicsPipelineCreateInfo-layout-06602

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) or
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization),
and [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
`layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06603) VUID-VkGraphicsPipelineCreateInfo-renderPass-06603

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization),
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
or [fragment output    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output),
and `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`renderPass` **must** be a valid [VkRenderPass](VkRenderPass.html) handle

* 
[](#VUID-VkGraphicsPipelineCreateInfo-stageCount-09530) VUID-VkGraphicsPipelineCreateInfo-stageCount-09530

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), `stageCount` **must** be greater than
`0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-graphicsPipelineLibrary-06606) VUID-VkGraphicsPipelineCreateInfo-graphicsPipelineLibrary-06606

    If the [    `graphicsPipelineLibrary`](../../../../spec/latest/chapters/features.html#features-graphicsPipelineLibrary) feature is not enabled,
and if
    the [`shaderMeshEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderMeshEnqueue) feature is
    not enabled,
    `flags` **must** not include [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06608) VUID-VkGraphicsPipelineCreateInfo-flags-06608

If the [`shaderMeshEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderMeshEnqueue) feature is
not enabled, and
the pipeline is being created with
[all possible state subsets](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete),
`flags` **must** not include [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06609) VUID-VkGraphicsPipelineCreateInfo-flags-06609

If `flags` includes
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](VkPipelineCreateFlagBits.html), pipeline
libraries included via [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html) **must** have
been created with
[VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-09245) VUID-VkGraphicsPipelineCreateInfo-flags-09245

If `flags` includes
[VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](VkPipelineCreateFlagBits.html),
`flags` **must** also include [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06610) VUID-VkGraphicsPipelineCreateInfo-flags-06610

If `flags` includes
[VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](VkPipelineCreateFlagBits.html),
pipeline libraries included via [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)
**must** have been created with
[VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06611) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06611

Any pipeline libraries included via
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` **must** not include
any [state subset](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets) already defined by this
structure or defined by any other pipeline library in
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06612) VUID-VkGraphicsPipelineCreateInfo-flags-06612

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and an
element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes the other flag, and `layout` was not created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html), then the
`layout` used by this pipeline and the library **must** be *identically
defined*

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06613) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06613

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and the
`layout` specified by either library was not created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html), then the
`layout` used by each library **must** be
[identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06614) VUID-VkGraphicsPipelineCreateInfo-flags-06614

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), an element
of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` includes the
other subset, and `layout` was created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html), then the
`layout` used by the library **must** also have been created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06615) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06615

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and the
`layout` specified by either library was created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html), then the
`layout` used by both libraries **must** have been created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06616) VUID-VkGraphicsPipelineCreateInfo-flags-06616

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), an element
of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` includes the
other subset, and `layout` was created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html), elements of
the `pSetLayouts` array which `layout` was created with that are
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** be
[identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined) to the element at
the same index of `pSetLayouts` used to create the library’s
`layout`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06617) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06617

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and the
`layout` specified by either library was created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html), elements of
the `pSetLayouts` array which either `layout` was created with
that are not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** be
[identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined) to the element at
the same index of `pSetLayouts` used to create the other library’s
`layout`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06618) VUID-VkGraphicsPipelineCreateInfo-flags-06618

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and an
element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes the other flag, any descriptor set layout *N* specified by
`layout` in both this pipeline and the library which include
bindings accessed by shader stages in each **must** be *identically
defined*

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06619) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06619

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), any
descriptor set layout *N* specified by `layout` in both libraries
which include bindings accessed by shader stages in each **must** be
[identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06620) VUID-VkGraphicsPipelineCreateInfo-flags-06620

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and an
element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes the other flag, push constants specified in `layout` in
both this pipeline and the library which are available to shader stages
in each **must** be [identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06621) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06621

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), and
one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), push
constants specified in `layout` in both this pipeline and the
library which are available to shader stages in each **must** be
[identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06679) VUID-VkGraphicsPipelineCreateInfo-flags-06679

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), and
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), an element
of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` includes the
other subset, [VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html)
was not used, and any element of the `pSetLayouts` array when
`layout` was created and the corresponding element of the
`pSetLayouts` array used to create the library’s `layout` **must**
not both be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06681) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06681

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html) was not used,
and any element of the `pSetLayouts` array used to create each
library’s `layout` was [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the corresponding
element of the `pSetLayouts` array used to create the other
library’s `layout` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06756) VUID-VkGraphicsPipelineCreateInfo-flags-06756

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), an element
of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` includes the
other subset, and any element of the `pSetLayouts` array which
`layout` was created with was [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the
corresponding element of the `pSetLayouts` array used to create the
library’s `layout` **must** not have shader bindings for shaders in the
other subset

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06757) VUID-VkGraphicsPipelineCreateInfo-flags-06757

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), an element
of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` includes the
other subset, and any element of the `pSetLayouts` array used to
create the library’s `layout` was [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the
corresponding element of the `pSetLayouts` array used to create this
pipeline’s `layout` **must** not have shader bindings for shaders in
the other subset

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06758) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06758

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and any
element of the `pSetLayouts` array used to create each library’s
`layout` was [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the corresponding element of
the `pSetLayouts` array used to create the other library’s
`layout` **must** not have shader bindings for shaders in the other
subset

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06682) VUID-VkGraphicsPipelineCreateInfo-flags-06682

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), and
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes both
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), `layout`
**must** have been created with no elements of the `pSetLayouts` array
set to [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06683) VUID-VkGraphicsPipelineCreateInfo-flags-06683

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and `pRasterizationState->rasterizerDiscardEnable` is [VK_TRUE](VK_TRUE.html),
`layout` **must** have been created with no elements of the
`pSetLayouts` array set to [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06684) VUID-VkGraphicsPipelineCreateInfo-flags-06684

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes at
least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and an element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes one of the other flags, the value of `subpass` **must** be
equal to that used to create the library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06623) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06623

If one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes at least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and another element of
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` includes one of
the other flags, the value of `subpass` used to create each library
**must** be identical

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderpass-06624) VUID-VkGraphicsPipelineCreateInfo-renderpass-06624

If `renderpass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes at
least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and an element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes one of the other flags, `renderPass` **must** be compatible
with that used to create the library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderpass-06625) VUID-VkGraphicsPipelineCreateInfo-renderpass-06625

If `renderpass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes at
least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and an element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes one of the other flags, the value of `renderPass` used to
create that library **must** also be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06626) VUID-VkGraphicsPipelineCreateInfo-flags-06626

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes at
least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), an
element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes one of the other flags, and `renderPass` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the value of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` used by this
pipeline and that specified by the library **must** be identical

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06627) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06627

If one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes at least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
another element of
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` includes one of
the other flags, and `renderPass` was [VK_NULL_HANDLE](VK_NULL_HANDLE.html) for both
libraries, the value of
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` set by each library
**must** be identical

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06628) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06628

If one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes at least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and another element of
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` includes one of
the other flags, the `renderPass` objects used to create each
library **must** be compatible or all equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderpass-06631) VUID-VkGraphicsPipelineCreateInfo-renderpass-06631

If `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline requires
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
and the `[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is not enabled
or any of the [VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](VkDynamicState.html), or
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](VkDynamicState.html) dynamic states is
not set, or the [alphaToOne](../../../../spec/latest/chapters/features.html#features-alphaToOne) feature is enabled
and [VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](VkDynamicState.html) is not set,
then `pMultisampleState` **must** be a valid pointer to a valid
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-Input-06632) VUID-VkGraphicsPipelineCreateInfo-Input-06632

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) with a fragment shader that either enables
[sample shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading) or decorates any variable in
the `Input` storage class with `Sample`,
and the `[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` extension is not enabled
or any of the [VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](VkDynamicState.html), or
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](VkDynamicState.html) dynamic states is
not set, or the [alphaToOne](../../../../spec/latest/chapters/features.html#features-alphaToOne) feature is enabled
and [VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](VkDynamicState.html) is not set,
then `pMultisampleState` **must** be a valid pointer to a valid
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11856) VUID-VkGraphicsPipelineCreateInfo-flags-11856

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) is included and
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` is
[VK_TRUE](VK_TRUE.html), and an element of
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` also includes
either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), the library
**must** also include [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) and the
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` specified by the
library **must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11857) VUID-VkGraphicsPipelineCreateInfo-flags-11857

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) is not included or
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` is
[VK_FALSE](VK_FALSE.html), and an element of
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` also includes
either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), either the
library **must** not include [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) or the
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` specified by the
library **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-customResolve-11858) VUID-VkGraphicsPipelineCreateInfo-customResolve-11858

If one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html) includes either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) is included and
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` is
[VK_TRUE](VK_TRUE.html), and another element of
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` also includes
either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), the other
library **must** also include [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) and the
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` specified by the
library **must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-customResolve-11859) VUID-VkGraphicsPipelineCreateInfo-customResolve-11859

If one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html) includes either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) is not included or
[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` is
[VK_FALSE](VK_FALSE.html), and another element of
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` also includes
either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), either the
other library **must** not include [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html) or
the [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)::`customResolve` specified by
the library **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06633) VUID-VkGraphicsPipelineCreateInfo-flags-06633

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) with a
`pMultisampleState` that was not `NULL`, and an element of
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` was created with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
`pMultisampleState` **must** be
[identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined) to that used to
create the library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06634) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06634

If an element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
was created with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) with a
`pMultisampleState` that was not `NULL`, and if
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
`pMultisampleState` **must** be
[identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined) to that used to
create the library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06635) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06635

If one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
was created with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) with a
`pMultisampleState` that was not `NULL`, and if a different element
of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` was created
with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
the `pMultisampleState` used to create each library **must** be
[identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06636) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06636

If one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
was created with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
a value of `pMultisampleState->sampleShadingEnable` equal
[VK_TRUE](VK_TRUE.html), and if a different element of
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` was created with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), the
`pMultisampleState` used to create each library **must** be
[identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06637) VUID-VkGraphicsPipelineCreateInfo-flags-06637

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
`pMultisampleState->sampleShadingEnable` is [VK_TRUE](VK_TRUE.html), and an
element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` was
created with [VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
`pMultisampleState` **must** be
[identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined) to that used to
create the library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-09567) VUID-VkGraphicsPipelineCreateInfo-pLibraries-09567

If one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
was created with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
a value of `pMultisampleState->sampleShadingEnable` equal
[VK_TRUE](VK_TRUE.html), and if
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
`pMultisampleState` **must** be
[identically defined](../../../../spec/latest/appendices/glossary.html#glossary-identically-defined) to that used to
create the library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06638) VUID-VkGraphicsPipelineCreateInfo-flags-06638

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
only one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and an
element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes the other flag, values specified in
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html) for both this
pipeline and that library **must** be identical

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06639) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06639

If one element of [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), values
specified in [VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html) for
both this pipeline and that library **must** be identical

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06640) VUID-VkGraphicsPipelineCreateInfo-flags-06640

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
`pStages` **must** be a valid pointer to an array of `stageCount`
valid [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06642) VUID-VkGraphicsPipelineCreateInfo-flags-06642

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), `layout`
**must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06643) VUID-VkGraphicsPipelineCreateInfo-flags-06643

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `renderPass` **must**
be a valid [VkRenderPass](VkRenderPass.html) handle

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06644) VUID-VkGraphicsPipelineCreateInfo-flags-06644

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
`stageCount` **must** be greater than `0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06645) VUID-VkGraphicsPipelineCreateInfo-flags-06645

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` is
non-zero, if `flags` includes
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](VkPipelineCreateFlagBits.html), any
libraries **must** have also been created with
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06646) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06646

If [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` includes more
than one library, and any library was created with
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](VkPipelineCreateFlagBits.html), all
libraries **must** have also been created with
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06647) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06647

If [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries` includes at
least one library,
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` is non-zero,
and any library was created with
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](VkPipelineCreateFlagBits.html),
`flags` **must** include
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-07826) VUID-VkGraphicsPipelineCreateInfo-None-07826

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
the pipeline includes a [complete    set of state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete), and there are no libraries included in
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html)::`pLibraries`, then
[VkPipelineLayout](VkPipelineLayout.html) **must** be a valid pipeline layout

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-07827) VUID-VkGraphicsPipelineCreateInfo-layout-07827

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
the pipeline includes a [complete    set of state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete) specified entirely by libraries, and each library was
created with a [VkPipelineLayout](VkPipelineLayout.html) created without
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html), then
`layout` **must** be [compatible](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility) with the
layouts in those libraries

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06729) VUID-VkGraphicsPipelineCreateInfo-flags-06729

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
`flags` includes
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](VkPipelineCreateFlagBits.html), the pipeline
includes a [complete set of    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete) specified entirely by libraries, and each library was created
with a [VkPipelineLayout](VkPipelineLayout.html) created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html), then
`layout` **must** be [compatible](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility) with the
union of the libraries' pipeline layouts other than the
inclusion/exclusion of
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06730) VUID-VkGraphicsPipelineCreateInfo-flags-06730

If
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
`flags` does not include
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](VkPipelineCreateFlagBits.html), the pipeline
includes a [complete set of    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete) specified entirely by libraries, and each library was created
with a [VkPipelineLayout](VkPipelineLayout.html) created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html), then
`layout` **must** be [compatible](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility) with the
union of the libraries' pipeline layouts

* 
[](#VUID-VkGraphicsPipelineCreateInfo-conservativePointAndLineRasterization-08892) VUID-VkGraphicsPipelineCreateInfo-conservativePointAndLineRasterization-08892

If [    `conservativePointAndLineRasterization`](../../../../spec/latest/chapters/limits.html#limits-conservativePointAndLineRasterization) is not supported and the
[effective rasterization input    topology](../../../../spec/latest/chapters/drawing.html#drawing-rasterization-input-topology) is in line or point topology class, then
[VkPipelineRasterizationConservativeStateCreateInfoEXT](VkPipelineRasterizationConservativeStateCreateInfoEXT.html)::`conservativeRasterizationMode`
**must** be [VK_CONSERVATIVE_RASTERIZATION_MODE_DISABLED_EXT](VkConservativeRasterizationModeEXT.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-06894) VUID-VkGraphicsPipelineCreateInfo-pStages-06894

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) but not
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
elements of `pStages` **must** not have `stage` set to
[VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-06895) VUID-VkGraphicsPipelineCreateInfo-pStages-06895

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) but not
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), elements of `pStages` **must** not have `stage` set to a
shader stage which participates in pre-rasterization

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-06896) VUID-VkGraphicsPipelineCreateInfo-pStages-06896

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), all elements of `pStages` **must**
have a `stage` set to a shader stage which participates in
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) or
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-stage-06897) VUID-VkGraphicsPipelineCreateInfo-stage-06897

If the pipeline requires [    fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) and/or
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), any value of `stage` **must** not be set in more than one
element of `pStages`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3TessellationDomainOrigin-07370) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3TessellationDomainOrigin-07370

If the [    `extendedDynamicState3TessellationDomainOrigin`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3TessellationDomainOrigin) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_TESSELLATION_DOMAIN_ORIGIN_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3DepthClampEnable-07371) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3DepthClampEnable-07371

If the [    `extendedDynamicState3DepthClampEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3DepthClampEnable) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3PolygonMode-07372) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3PolygonMode-07372

If the [    `extendedDynamicState3PolygonMode`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3PolygonMode) feature is not enabled, there
**must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_POLYGON_MODE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3RasterizationSamples-07373) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3RasterizationSamples-07373

If the [    `extendedDynamicState3RasterizationSamples`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3RasterizationSamples) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3SampleMask-07374) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3SampleMask-07374

If the [    `extendedDynamicState3SampleMask`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3SampleMask) feature is not enabled, there
**must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3AlphaToCoverageEnable-07375) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3AlphaToCoverageEnable-07375

If the [    `extendedDynamicState3AlphaToCoverageEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3AlphaToCoverageEnable) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3AlphaToOneEnable-07376) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3AlphaToOneEnable-07376

If the [    `extendedDynamicState3AlphaToOneEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3AlphaToOneEnable) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3LogicOpEnable-07377) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3LogicOpEnable-07377

If the [    `extendedDynamicState3LogicOpEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3LogicOpEnable) feature is not enabled, there
**must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorBlendEnable-07378) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorBlendEnable-07378

If the [    `extendedDynamicState3ColorBlendEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3ColorBlendEnable) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorBlendEquation-07379) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorBlendEquation-07379

If the [    `extendedDynamicState3ColorBlendEquation`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3ColorBlendEquation) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorWriteMask-07380) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorWriteMask-07380

If the [    `extendedDynamicState3ColorWriteMask`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3ColorWriteMask) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3RasterizationStream-07381) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3RasterizationStream-07381

If the [    `extendedDynamicState3RasterizationStream`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3RasterizationStream) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ConservativeRasterizationMode-07382) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ConservativeRasterizationMode-07382

If the [    `extendedDynamicState3ConservativeRasterizationMode`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3ConservativeRasterizationMode) feature is
not enabled, there **must** be no element of the `pDynamicStates`
member of `pDynamicState` set to
[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ExtraPrimitiveOverestimationSize-07383) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ExtraPrimitiveOverestimationSize-07383

If the [    `extendedDynamicState3ExtraPrimitiveOverestimationSize`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3ExtraPrimitiveOverestimationSize) feature is
not enabled, there **must** be no element of the `pDynamicStates`
member of `pDynamicState` set to
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-09639) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-09639

If the pipeline requires [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), `pDynamicState` includes
[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](VkDynamicState.html), and
`pDynamicState` does not include
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](VkDynamicState.html),
`pRasterizationState` **must** include a
[VkPipelineRasterizationConservativeStateCreateInfoEXT](VkPipelineRasterizationConservativeStateCreateInfoEXT.html) in its
`pNext` chain

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3DepthClipEnable-07384) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3DepthClipEnable-07384

If the [    `extendedDynamicState3DepthClipEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3DepthClipEnable) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3SampleLocationsEnable-07385) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3SampleLocationsEnable-07385

If the [    `extendedDynamicState3SampleLocationsEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3SampleLocationsEnable) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorBlendAdvanced-07386) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorBlendAdvanced-07386

If the [    `extendedDynamicState3ColorBlendAdvanced`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3ColorBlendAdvanced) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ProvokingVertexMode-07387) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ProvokingVertexMode-07387

If the [    `extendedDynamicState3ProvokingVertexMode`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3ProvokingVertexMode) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3LineRasterizationMode-07388) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3LineRasterizationMode-07388

If the [    `extendedDynamicState3LineRasterizationMode`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3LineRasterizationMode) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3LineStippleEnable-07389) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3LineStippleEnable-07389

If the [    `extendedDynamicState3LineStippleEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3LineStippleEnable) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3DepthClipNegativeOneToOne-07390) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3DepthClipNegativeOneToOne-07390

If the [    `extendedDynamicState3DepthClipNegativeOneToOne`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3DepthClipNegativeOneToOne) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ViewportWScalingEnable-07391) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ViewportWScalingEnable-07391

If the [    `extendedDynamicState3ViewportWScalingEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3ViewportWScalingEnable) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_ENABLE_NV](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ViewportSwizzle-07392) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ViewportSwizzle-07392

If the [    `extendedDynamicState3ViewportSwizzle`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3ViewportSwizzle) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageToColorEnable-07393) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageToColorEnable-07393

If the [    `extendedDynamicState3CoverageToColorEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3CoverageToColorEnable) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageToColorLocation-07394) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageToColorLocation-07394

If the [    `extendedDynamicState3CoverageToColorLocation`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3CoverageToColorLocation) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_LOCATION_NV](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageModulationMode-07395) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageModulationMode-07395

If the [    `extendedDynamicState3CoverageModulationMode`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3CoverageModulationMode) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_MODE_NV](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageModulationTableEnable-07396) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageModulationTableEnable-07396

If the [    `extendedDynamicState3CoverageModulationTableEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3CoverageModulationTableEnable) feature is
not enabled, there **must** be no element of the `pDynamicStates`
member of `pDynamicState` set to
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageModulationTable-07397) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageModulationTable-07397

If the [    `extendedDynamicState3CoverageModulationTable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3CoverageModulationTable) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_NV](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageReductionMode-07398) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageReductionMode-07398

If the [    `extendedDynamicState3CoverageReductionMode`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3CoverageReductionMode) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3RepresentativeFragmentTestEnable-07399) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3RepresentativeFragmentTestEnable-07399

If the [    `extendedDynamicState3RepresentativeFragmentTestEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3RepresentativeFragmentTestEnable) feature is
not enabled, there **must** be no element of the `pDynamicStates`
member of `pDynamicState` set to
[VK_DYNAMIC_STATE_REPRESENTATIVE_FRAGMENT_TEST_ENABLE_NV](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ShadingRateImageEnable-07400) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ShadingRateImageEnable-07400

If the [    `extendedDynamicState3ShadingRateImageEnable`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState3ShadingRateImageEnable) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_SHADING_RATE_IMAGE_ENABLE_NV](VkDynamicState.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-07401) VUID-VkGraphicsPipelineCreateInfo-flags-07401

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-07997) VUID-VkGraphicsPipelineCreateInfo-flags-07997

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07730) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07730

If the [    `multiviewPerViewViewports`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewViewports) feature is enabled, `renderpass`
is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline requires
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and no element of the `pDynamicStates` member of
`pDynamicState` is [VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html), then
the index of the most significant bit in each element of
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)::`pViewMasks` **must** be less
than `pViewportState->viewportCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07731) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07731

If the [    `multiviewPerViewViewports`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewViewports) feature is enabled, `renderpass`
is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline requires
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and no element of the `pDynamicStates` member of
`pDynamicState` is [VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html), then
the index of the most significant bit in each element of
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)::`pViewMasks` **must** be less
than `pViewportState->scissorCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-multiviewPerViewViewports-12249) VUID-VkGraphicsPipelineCreateInfo-multiviewPerViewViewports-12249

If the [    `multiviewPerViewViewports`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewViewports) feature is enabled, `renderpass`
is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline requires
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and no element of the `pDynamicStates` member of
`pDynamicState` is [VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html), then
the index of the most significant bit in
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` **must** be less than
`pViewportState->viewportCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-multiviewPerViewViewports-12250) VUID-VkGraphicsPipelineCreateInfo-multiviewPerViewViewports-12250

If the [    `multiviewPerViewViewports`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewViewports) feature is enabled, `renderpass`
is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline requires
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), and no element of the `pDynamicStates` member of
`pDynamicState` is [VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html), then
the index of the most significant bit in
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` **must** be less than
`pViewportState->scissorCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-08711) VUID-VkGraphicsPipelineCreateInfo-pStages-08711

If `pStages` includes a fragment shader stage,
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](VkDynamicState.html) is not set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`, and the
fragment shader declares the `EarlyFragmentTests` execution mode and
uses `OpDepthAttachmentReadEXT`, the `depthWriteEnable` member of
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-08712) VUID-VkGraphicsPipelineCreateInfo-pStages-08712

If `pStages` includes a fragment shader stage,
[VK_DYNAMIC_STATE_STENCIL_WRITE_MASK](VkDynamicState.html) is not set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`, and the
fragment shader declares the `EarlyFragmentTests` execution mode and
uses `OpStencilAttachmentReadEXT`, the value of
[VkStencilOpState](VkStencilOpState.html)::`writeMask` for both `front` and
`back` in [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) **must** be `0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-08744) VUID-VkGraphicsPipelineCreateInfo-renderPass-08744

If `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline requires
[fragment output state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output) or
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader),
the pipeline enables [sample shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading),
`rasterizationSamples` is not dynamic, and the `pNext` chain
includes a [VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html) structure,
`rasterizationSamples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html)
value that is set in `imageCreateSampleCounts` (as defined in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits)) for every
element of `depthAttachmentFormat`, `stencilAttachmentFormat`
and the `pColorAttachmentFormats` array which is not
[VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08897) VUID-VkGraphicsPipelineCreateInfo-flags-08897

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_VERTEX_INPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) is specified either in a library or by the inclusion of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and that state includes a vertex shader stage in `pStages`, the
pipeline **must** define [vertex    input state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08898) VUID-VkGraphicsPipelineCreateInfo-flags-08898

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_VERTEX_INPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) is not specified, the pipeline **must** define
[vertex input state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08899) VUID-VkGraphicsPipelineCreateInfo-flags-08899

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html),
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) is specified either in a library or by the inclusion of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and that state includes a vertex shader stage in `pStages`, the
pipeline **must** either define [    vertex input state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-vertex-input) or include that state in a linked pipeline library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08900) VUID-VkGraphicsPipelineCreateInfo-flags-08900

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html) the
pipeline **must** define [    pre-rasterization shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08901) VUID-VkGraphicsPipelineCreateInfo-flags-08901

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html), the pipeline **must** either
define [pre-rasterization    shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) or include that state in a linked pipeline library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08903) VUID-VkGraphicsPipelineCreateInfo-flags-08903

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) is specified either in a library or by the inclusion of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and that state
either includes [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](VkDynamicState.html) or
has `pRasterizationState->rasterizerDiscardEnable` set to
[VK_FALSE](VK_FALSE.html), the pipeline **must** define
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08904) VUID-VkGraphicsPipelineCreateInfo-flags-08904

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) is not specified, the pipeline **must** define
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08906) VUID-VkGraphicsPipelineCreateInfo-flags-08906

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) is specified either in a library or by the inclusion of
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and that state
either includes [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](VkDynamicState.html) or
has `pRasterizationState->rasterizerDiscardEnable` set to
[VK_FALSE](VK_FALSE.html), the pipeline **must** define
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08907) VUID-VkGraphicsPipelineCreateInfo-flags-08907

If [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html), and
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) is not specified, the pipeline **must** define
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08909) VUID-VkGraphicsPipelineCreateInfo-flags-08909

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html),
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) is specified either in a library or by the inclusion of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](VkGraphicsPipelineLibraryFlagBitsEXT.html),
and that state
either includes [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](VkDynamicState.html) or
has `pRasterizationState->rasterizerDiscardEnable` set to
[VK_FALSE](VK_FALSE.html), the pipeline **must** define
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output) and [fragment    shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader) or include those states in linked pipeline libraries

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-09043) VUID-VkGraphicsPipelineCreateInfo-None-09043

If
`pDynamicState->pDynamicStates` does not include
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html), and
the format of any color attachment is
[VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](VkFormat.html), the `colorWriteMask` member
of the corresponding element of `pColorBlendState->pAttachments`
**must** either include all of [VK_COLOR_COMPONENT_R_BIT](VkColorComponentFlagBits.html),
[VK_COLOR_COMPONENT_G_BIT](VkColorComponentFlagBits.html), and [VK_COLOR_COMPONENT_B_BIT](VkColorComponentFlagBits.html), or
none of them

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09301) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09301

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` is not `0`,
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`viewMask` **must** be `0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09304) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09304

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` is not `0`, and
`rasterizationSamples` is not dynamic,
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)::`rasterizationSamples`
**must** be `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09305) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09305

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` is not `0`, and
`blendEnable` is not dynamic, the `blendEnable` member of each
element of `pColorBlendState->pAttachments` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09306) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09306

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` is not `0`, and
`pDynamicState->pDynamicStates` does not include
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html),
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`fragmentSize.width`
**must** be `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09307) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09307

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` is not `0`, and
`pDynamicState->pDynamicStates` does not include
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html),
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`fragmentSize.height`
**must** be `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09308) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09308

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output) and [fragment    output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` is not `0`, the last
[pre-rasterization shader    stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) **must** not statically use a variable with the
`PrimitiveShadingRateKHR` built-in

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09309) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09309

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` is not `0`,
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`colorAttachmentCount` **must** be
`1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09310) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09310

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [fragment output    interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` is not `0`, the
fragment shader **must** not declare the `DepthReplacing` or
`StencilRefReplacingEXT` execution modes

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09313) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09313

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `subpass`
includes an external format resolve attachment, and
`rasterizationSamples` is not dynamic,
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)::`rasterizationSamples`
**must** be [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09314) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09314

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `subpass`
includes an external format resolve attachment, and `blendEnable` is
not dynamic, the `blendEnable` member of each element of
`pColorBlendState->pAttachments` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09315) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09315

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `subpass`
includes an external format resolve attachment, and
`pDynamicState->pDynamicStates` does not include
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html),
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`fragmentSize.width`
**must** be `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09316) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09316

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `subpass`
includes an external format resolve attachment, and
`pDynamicState->pDynamicStates` does not include
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](VkDynamicState.html),
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html)::`fragmentSize.height`
**must** be `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09317) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09317

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[pre-rasterization shader    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output) and [fragment    output interface state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), `renderPass` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
and `subpass` includes an external format resolve attachment, the
last [pre-rasterization    shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) **must** not statically use a variable with the
`PrimitiveShadingRateKHR` built-in

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09531) VUID-VkGraphicsPipelineCreateInfo-renderPass-09531

If the pipeline is being created with
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [fragment output    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), the value of `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html) is included,
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)::`colorAttachmentCount`
**must** be equal to
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`colorAttachmentCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09652) VUID-VkGraphicsPipelineCreateInfo-renderPass-09652

If the pipeline is being created with
[fragment shader state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-shader)
and [fragment output    state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output), the value of `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html) is not included, the fragment
shader **must** not contain any input attachments with a
`InputAttachmentIndex` greater than or equal to
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`colorAttachmentCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09532) VUID-VkGraphicsPipelineCreateInfo-renderPass-09532

If the pipeline is being created with
[fragment output state](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-fragment-output),
and the value of `renderPass` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
[VkRenderingAttachmentLocationInfo](VkRenderingAttachmentLocationInfo.html)::`colorAttachmentCount`
**must** be equal to
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)::`colorAttachmentCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11273) VUID-VkGraphicsPipelineCreateInfo-flags-11273

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11274) VUID-VkGraphicsPipelineCreateInfo-flags-11274

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), all
libraries linked to this pipeline **must** also not have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-12355) VUID-VkGraphicsPipelineCreateInfo-flags-12355

If `flags` includes
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-12356) VUID-VkGraphicsPipelineCreateInfo-flags-12356

If `flags` does not include
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html), all libraries linked
to this pipeline **must** also not have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-12357) VUID-VkGraphicsPipelineCreateInfo-flags-12357

If `flags` includes
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-12358) VUID-VkGraphicsPipelineCreateInfo-flags-12358

If `flags` does not include
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html), all libraries linked
to this pipeline **must** also not have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-12359) VUID-VkGraphicsPipelineCreateInfo-flags-12359

If `flags` includes
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-12360) VUID-VkGraphicsPipelineCreateInfo-flags-12360

If `flags` does not include
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html), all libraries linked
to this pipeline **must** also not have that flag set

Valid Usage (Implicit)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-sType-sType) VUID-VkGraphicsPipelineCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pNext-pNext) VUID-VkGraphicsPipelineCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html), [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html), [VkExternalFormatANDROID](VkExternalFormatANDROID.html), [VkExternalFormatOHOS](VkExternalFormatOHOS.html), [VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html), [VkGraphicsPipelineShaderGroupsCreateInfoNV](VkGraphicsPipelineShaderGroupsCreateInfoNV.html), [VkMultiviewPerViewAttributesInfoNVX](VkMultiviewPerViewAttributesInfoNVX.html), [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html), [VkPipelineCompilerControlCreateInfoAMD](VkPipelineCompilerControlCreateInfoAMD.html), [VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html), [VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html), [VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html), [VkPipelineFragmentDensityMapLayeredCreateInfoVALVE](VkPipelineFragmentDensityMapLayeredCreateInfoVALVE.html), [VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html), [VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html), [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html), [VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html), [VkPipelineRepresentativeFragmentTestStateCreateInfoNV](VkPipelineRepresentativeFragmentTestStateCreateInfoNV.html), [VkPipelineRobustnessCreateInfo](VkPipelineRobustnessCreateInfo.html), [VkRenderingAttachmentLocationInfo](VkRenderingAttachmentLocationInfo.html), or [VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-sType-unique) VUID-VkGraphicsPipelineCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-parameter) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-parameter

 If `pDynamicState` is not `NULL`, `pDynamicState` **must** be a valid pointer to a valid [VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-commonparent) VUID-VkGraphicsPipelineCreateInfo-commonparent

 Each of `basePipelineHandle`, `layout`, and `renderPass` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipeline](VkPipeline.html), [VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html), [VkPipelineCreateFlags](VkPipelineCreateFlags.html), [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html), [VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html), [VkPipelineInputAssemblyStateCreateInfo](VkPipelineInputAssemblyStateCreateInfo.html), [VkPipelineLayout](VkPipelineLayout.html), [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html), [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html), [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html), [VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html), [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html), [VkRenderPass](VkRenderPass.html), [VkStructureType](VkStructureType.html), [vkCreateGraphicsPipelines](vkCreateGraphicsPipelines.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkGraphicsPipelineCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
