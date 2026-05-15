# Rasterization

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/primsrast.html

## Table of Contents

- [Discarding Primitives Before Rasterization](#primsrast-discard)
- [Discarding_Primitives_Before_Rasterization](#primsrast-discard)
- [Controlling the Vertex Stream Used for Rasterization](#primsrast-stream)
- [Controlling_the_Vertex_Stream_Used_for_Rasterization](#primsrast-stream)
- [Rasterization Order](#primsrast-order)
- [Multisampling](#primsrast-multisampling)
- [Custom Sample Locations](#primsrast-samplelocations)
- [Custom_Sample_Locations](#primsrast-samplelocations)
- [Fragment Shading Rates](#primsrast-fragment-shading-rate)
- [Fragment_Shading_Rates](#primsrast-fragment-shading-rate)
- [Pipeline Fragment Shading Rate](#primsrast-fragment-shading-rate-pipeline)
- [Pipeline_Fragment_Shading_Rate](#primsrast-fragment-shading-rate-pipeline)
- [Primitive Fragment Shading Rate](#primsrast-fragment-shading-rate-primitive)
- [Primitive_Fragment_Shading_Rate](#primsrast-fragment-shading-rate-primitive)
- [Attachment Fragment Shading Rate](#primsrast-fragment-shading-rate-attachment)
- [Attachment_Fragment_Shading_Rate](#primsrast-fragment-shading-rate-attachment)
- [Combining the Fragment Shading Rates](#primsrast-fragment-shading-rate-combining)
- [Combining_the_Fragment_Shading_Rates](#primsrast-fragment-shading-rate-combining)
- [Extended Fragment Shading Rates](#_extended_fragment_shading_rates)
- [Extended_Fragment_Shading_Rates](#_extended_fragment_shading_rates)
- [Shading Rate Image](#primsrast-shading-rate-image)
- [Shading_Rate_Image](#primsrast-shading-rate-image)
- [Sample Shading](#primsrast-sampleshading)
- [Barycentric Interpolation](#primsrast-barycentric)
- [Points](#primsrast-points)
- [Basic Point Rasterization](#primsrast-points-basic)
- [Basic_Point_Rasterization](#primsrast-points-basic)
- [Line Segments](#primsrast-lines)
- [Basic Line Segment Rasterization](#primsrast-lines-basic)
- [Basic_Line_Segment_Rasterization](#primsrast-lines-basic)
- [Bresenham Line Segment Rasterization](#primsrast-lines-bresenham)
- [Bresenham_Line_Segment_Rasterization](#primsrast-lines-bresenham)
- [Line Stipple](#primsrast-lines-stipple)
- [Smooth Lines](#primsrast-lines-smooth)
- [Polygons](#primsrast-polygons)
- [Basic Polygon Rasterization](#primsrast-polygons-basic)
- [Basic_Polygon_Rasterization](#primsrast-polygons-basic)
- [Polygon Mode](#primsrast-polygonmode)
- [Depth Bias](#primsrast-depthbias)
- [Depth Bias Enable](#primsrast-depthbias-enable)
- [Depth_Bias_Enable](#primsrast-depthbias-enable)
- [Depth Bias Computation](#primsrast-depthbias-computation)
- [Depth_Bias_Computation](#primsrast-depthbias-computation)
- [Conservative Rasterization](#primsrast-conservativeraster)

## Content

Rasterization is the process by which a primitive is converted to a
two-dimensional image.
Each discrete location of this image contains associated data such as depth,
color, or other attributes.

Rasterizing a primitive begins by determining which squares of an integer
grid in framebuffer coordinates are occupied by the primitive, and assigning
one or more depth values to each such square.
This process is described below for points, lines, and polygons.

A grid square, including its (x,y) framebuffer coordinates, z
(depth), and associated data added by fragment shaders, is called a
fragment.
A fragment is located by its upper left corner, which lies on integer grid
coordinates.

Rasterization operations also refer to a fragment’s sample locations, which
are offset by fractional values from its upper left corner.
The rasterization rules for points, lines, and triangles involve testing
whether each sample location is inside the primitive.
Fragments need not actually be square, and rasterization rules are not
affected by the aspect ratio of fragments.
Display of non-square grids, however, will cause rasterized points and line
segments to appear fatter in one direction than the other.

We assume that fragments are square, since it simplifies antialiasing and
texturing.
After rasterization, fragments are processed by [fragment operations](fragops.html#fragops).

Several factors affect rasterization, including the members of
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo) and
[VkPipelineMultisampleStateCreateInfo](#VkPipelineMultisampleStateCreateInfo).

The `VkPipelineRasterizationStateCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineRasterizationStateCreateInfo {
    VkStructureType                            sType;
    const void*                                pNext;
    VkPipelineRasterizationStateCreateFlags    flags;
    VkBool32                                   depthClampEnable;
    VkBool32                                   rasterizerDiscardEnable;
    VkPolygonMode                              polygonMode;
    VkCullModeFlags                            cullMode;
    VkFrontFace                                frontFace;
    VkBool32                                   depthBiasEnable;
    float                                      depthBiasConstantFactor;
    float                                      depthBiasClamp;
    float                                      depthBiasSlopeFactor;
    float                                      lineWidth;
} VkPipelineRasterizationStateCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`depthClampEnable` controls whether to clamp the fragment’s depth
values as described in [Depth Test](fragops.html#fragops-depth).
If the pipeline is not created with
[VkPipelineRasterizationDepthClipStateCreateInfoEXT](#VkPipelineRasterizationDepthClipStateCreateInfoEXT) present then
enabling depth clamp will also disable clipping primitives to the z
planes of the frustum as described in [    Primitive Clipping](vertexpostproc.html#vertexpostproc-clipping).
Otherwise depth clipping is controlled by the state set in
[VkPipelineRasterizationDepthClipStateCreateInfoEXT](#VkPipelineRasterizationDepthClipStateCreateInfoEXT).

* 
`rasterizerDiscardEnable` controls whether primitives are discarded
immediately before the rasterization stage.

* 
`polygonMode` is the triangle rendering mode.
See [VkPolygonMode](#VkPolygonMode).

* 
`cullMode` is the triangle facing direction used for primitive
culling.
See [VkCullModeFlagBits](#VkCullModeFlagBits).

* 
`frontFace` is a [VkFrontFace](#VkFrontFace) value specifying the front-facing
triangle orientation to be used for culling.

* 
`depthBiasEnable` controls whether to bias fragment depth values.

* 
`depthBiasConstantFactor` is a scalar factor controlling the
constant depth value added to each fragment.

* 
`depthBiasClamp` is the maximum (or minimum) depth bias of a
fragment.

* 
`depthBiasSlopeFactor` is a scalar factor applied to a fragment’s
slope in depth bias calculations.

* 
`lineWidth` is the width of rasterized line segments.

The application **can** also add a
`VkPipelineRasterizationStateRasterizationOrderAMD` structure to the
`pNext` chain of a [VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)
structure.
This structure enables selecting the rasterization order to use when
rendering with the corresponding graphics pipeline as described in
[Rasterization Order](#primsrast-order).

Valid Usage

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-depthClampEnable-00782) VUID-VkPipelineRasterizationStateCreateInfo-depthClampEnable-00782

If the [`depthClamp`](features.html#features-depthClamp) feature is not enabled,
`depthClampEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-polygonMode-01507) VUID-VkPipelineRasterizationStateCreateInfo-polygonMode-01507

    If the [`fillModeNonSolid`](features.html#features-fillModeNonSolid) feature is
    not enabled, `polygonMode` **must** be [VK_POLYGON_MODE_FILL](#VkPolygonMode)
or [VK_POLYGON_MODE_FILL_RECTANGLE_NV](#VkPolygonMode)

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-polygonMode-01414) VUID-VkPipelineRasterizationStateCreateInfo-polygonMode-01414

If the `[VK_NV_fill_rectangle](../appendices/extensions.html#VK_NV_fill_rectangle)` extension is not enabled,
`polygonMode` **must** not be [VK_POLYGON_MODE_FILL_RECTANGLE_NV](#VkPolygonMode)

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-pointPolygons-04458) VUID-VkPipelineRasterizationStateCreateInfo-pointPolygons-04458

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`pointPolygons`
is [VK_FALSE](fundamentals.html#VK_FALSE), and `rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE),
`polygonMode` **must** not be [VK_POLYGON_MODE_POINT](#VkPolygonMode)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-sType-sType) VUID-VkPipelineRasterizationStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-pNext-pNext) VUID-VkPipelineRasterizationStateCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDepthBiasRepresentationInfoEXT](#VkDepthBiasRepresentationInfoEXT), [VkPipelineRasterizationConservativeStateCreateInfoEXT](#VkPipelineRasterizationConservativeStateCreateInfoEXT), [VkPipelineRasterizationDepthClipStateCreateInfoEXT](#VkPipelineRasterizationDepthClipStateCreateInfoEXT), [VkPipelineRasterizationLineStateCreateInfo](#VkPipelineRasterizationLineStateCreateInfo), [VkPipelineRasterizationProvokingVertexStateCreateInfoEXT](vertexpostproc.html#VkPipelineRasterizationProvokingVertexStateCreateInfoEXT), [VkPipelineRasterizationStateRasterizationOrderAMD](#VkPipelineRasterizationStateRasterizationOrderAMD), or [VkPipelineRasterizationStateStreamCreateInfoEXT](#VkPipelineRasterizationStateStreamCreateInfoEXT)

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-sType-unique) VUID-VkPipelineRasterizationStateCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-flags-zerobitmask) VUID-VkPipelineRasterizationStateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-polygonMode-parameter) VUID-VkPipelineRasterizationStateCreateInfo-polygonMode-parameter

 `polygonMode` **must** be a valid [VkPolygonMode](#VkPolygonMode) value

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-cullMode-parameter) VUID-VkPipelineRasterizationStateCreateInfo-cullMode-parameter

 `cullMode` **must** be a valid combination of [VkCullModeFlagBits](#VkCullModeFlagBits) values

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-frontFace-parameter) VUID-VkPipelineRasterizationStateCreateInfo-frontFace-parameter

 `frontFace` **must** be a valid [VkFrontFace](#VkFrontFace) value

// Provided by VK_VERSION_1_0
typedef VkFlags VkPipelineRasterizationStateCreateFlags;

`VkPipelineRasterizationStateCreateFlags` is a bitmask type for setting
a mask, but is currently reserved for future use.

If the `pNext` chain of [VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)
includes a `VkPipelineRasterizationDepthClipStateCreateInfoEXT`
structure, then that structure controls whether depth clipping is enabled or
disabled.

The `VkPipelineRasterizationDepthClipStateCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_depth_clip_enable
typedef struct VkPipelineRasterizationDepthClipStateCreateInfoEXT {
    VkStructureType                                        sType;
    const void*                                            pNext;
    VkPipelineRasterizationDepthClipStateCreateFlagsEXT    flags;
    VkBool32                                               depthClipEnable;
} VkPipelineRasterizationDepthClipStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`depthClipEnable` controls whether depth clipping is enabled as
described in [Primitive Clipping](vertexpostproc.html#vertexpostproc-clipping).

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationDepthClipStateCreateInfoEXT-sType-sType) VUID-VkPipelineRasterizationDepthClipStateCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_DEPTH_CLIP_STATE_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineRasterizationDepthClipStateCreateInfoEXT-flags-zerobitmask) VUID-VkPipelineRasterizationDepthClipStateCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)

// Provided by VK_EXT_depth_clip_enable
typedef VkFlags VkPipelineRasterizationDepthClipStateCreateFlagsEXT;

`VkPipelineRasterizationDepthClipStateCreateFlagsEXT` is a bitmask type
for setting a mask, but is currently reserved for future use.

The `VkPipelineMultisampleStateCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineMultisampleStateCreateInfo {
    VkStructureType                          sType;
    const void*                              pNext;
    VkPipelineMultisampleStateCreateFlags    flags;
    VkSampleCountFlagBits                    rasterizationSamples;
    VkBool32                                 sampleShadingEnable;
    float                                    minSampleShading;
    const VkSampleMask*                      pSampleMask;
    VkBool32                                 alphaToCoverageEnable;
    VkBool32                                 alphaToOneEnable;
} VkPipelineMultisampleStateCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`rasterizationSamples` is a [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value
specifying the number of samples used in rasterization.
This value is ignored for the purposes of setting the number of samples
used in rasterization if the pipeline is created with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](pipelines.html#VkDynamicState) dynamic state set, but
if [VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](pipelines.html#VkDynamicState) dynamic state is not set, it
is still used to define the size of the `pSampleMask` array as
described below.

* 
`sampleShadingEnable` **can** be used to enable
[Sample Shading](#primsrast-sampleshading).

* 
`minSampleShading` specifies a minimum fraction of sample shading if
`sampleShadingEnable` is [VK_TRUE](fundamentals.html#VK_TRUE).

* 
`pSampleMask` is a pointer to an array of `VkSampleMask`
values used in the [sample mask test](fragops.html#fragops-samplemask).

* 
`alphaToCoverageEnable` controls whether a temporary coverage value
is generated based on the alpha component of the fragment’s first color
output as specified in the [Multisample Coverage](fragops.html#fragops-covg)
section.

* 
`alphaToOneEnable` controls whether the alpha component of the
fragment’s first color output is replaced with one as described in
[Multisample Coverage](fragops.html#fragops-covg).

Each bit in the sample mask is associated with a unique
[sample index](#primsrast-multisampling-coverage-mask) as defined for the
[coverage mask](#primsrast-multisampling-coverage-mask).
Each bit b for mask word w in the sample mask corresponds to
sample index i, where i = 32 × w +  b.
`pSampleMask` has a length equal to ⌈
`rasterizationSamples` / 32 ⌉ words.

If `pSampleMask` is `NULL`, it is treated as if the mask has all bits
set to `1`.

Valid Usage

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-sampleShadingEnable-00784) VUID-VkPipelineMultisampleStateCreateInfo-sampleShadingEnable-00784

If the [`sampleRateShading`](features.html#features-sampleRateShading) feature
is not enabled, `sampleShadingEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-alphaToOneEnable-00785) VUID-VkPipelineMultisampleStateCreateInfo-alphaToOneEnable-00785

If the [`alphaToOne`](features.html#features-alphaToOne) feature is not enabled,
`alphaToOneEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-minSampleShading-00786) VUID-VkPipelineMultisampleStateCreateInfo-minSampleShading-00786

`minSampleShading` **must** be in the range [0,1]

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-rasterizationSamples-01415) VUID-VkPipelineMultisampleStateCreateInfo-rasterizationSamples-01415

If the `[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
and the [`coverageReductionMode`](features.html#features-coverageReductionMode)
feature is not enabled, or the `pNext` chain does not contain
`VkPipelineCoverageReductionStateCreateInfoNV`, or
`VkPipelineCoverageReductionStateCreateInfoNV`::`coverageReductionMode`
is not set to [VK_COVERAGE_REDUCTION_MODE_TRUNCATE_NV](fragops.html#VkCoverageReductionModeNV),
and the subpass has any color attachments, and
`rasterizationSamples` is greater than the number of color samples,
then [sample shading](#primsrast-sampleshading) **must** not be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-sType-sType) VUID-VkPipelineMultisampleStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_MULTISAMPLE_STATE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-pNext-pNext) VUID-VkPipelineMultisampleStateCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineCoverageModulationStateCreateInfoNV](fragops.html#VkPipelineCoverageModulationStateCreateInfoNV), [VkPipelineCoverageReductionStateCreateInfoNV](fragops.html#VkPipelineCoverageReductionStateCreateInfoNV), [VkPipelineCoverageToColorStateCreateInfoNV](fragops.html#VkPipelineCoverageToColorStateCreateInfoNV), or [VkPipelineSampleLocationsStateCreateInfoEXT](#VkPipelineSampleLocationsStateCreateInfoEXT)

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-sType-unique) VUID-VkPipelineMultisampleStateCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-flags-zerobitmask) VUID-VkPipelineMultisampleStateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-rasterizationSamples-parameter) VUID-VkPipelineMultisampleStateCreateInfo-rasterizationSamples-parameter

 `rasterizationSamples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value

// Provided by VK_VERSION_1_0
typedef VkFlags VkPipelineMultisampleStateCreateFlags;

`VkPipelineMultisampleStateCreateFlags` is a bitmask type for setting a
mask, but is currently reserved for future use.

The elements of the sample mask array are of type `VkSampleMask`,
each representing 32 bits of coverage information:

// Provided by VK_VERSION_1_0
typedef uint32_t VkSampleMask;

Rasterization only generates fragments which cover one or more pixels inside
the framebuffer.
Pixels outside the framebuffer are never considered covered in the fragment.
Fragments which would be produced by application of any of the primitive
rasterization rules described below but which lie outside the framebuffer
are not produced, nor are they processed by any later stage of the pipeline,
including any of the [fragment operations](fragops.html#fragops).

Surviving fragments are processed by fragment shaders.
Fragment shaders determine associated data for fragments, and **can** also
modify or replace their assigned depth values.

Primitives are discarded before rasterization if the
`rasterizerDiscardEnable` member of
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo) is enabled.
When enabled, primitives are discarded after they are processed by the last
active shader stage in the pipeline before rasterization.

To [dynamically enable](pipelines.html#pipelines-dynamic-state) whether primitives are
discarded before the rasterization stage, call:

// Provided by VK_VERSION_1_3
void vkCmdSetRasterizerDiscardEnable(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    rasterizerDiscardEnable);

// Provided by VK_EXT_extended_dynamic_state2, VK_EXT_shader_object
// Equivalent to vkCmdSetRasterizerDiscardEnable
void vkCmdSetRasterizerDiscardEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    rasterizerDiscardEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`rasterizerDiscardEnable` controls whether primitives are discarded
immediately before the rasterization stage.

This command sets the discard enable for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`rasterizerDiscardEnable`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetRasterizerDiscardEnable-None-08970) VUID-vkCmdSetRasterizerDiscardEnable-None-08970

At least one of the following **must** be true:

the [`extendedDynamicState2`](features.html#features-extendedDynamicState2)
feature is enabled

* 
the [`shaderObject`](features.html#features-shaderObject) feature is enabled

* 
the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
the [VkInstance](initialization.html#VkInstance) parent of `commandBuffer` is greater than or
equal to Version 1.3

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetRasterizerDiscardEnable-commandBuffer-parameter) VUID-vkCmdSetRasterizerDiscardEnable-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetRasterizerDiscardEnable-commandBuffer-recording) VUID-vkCmdSetRasterizerDiscardEnable-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetRasterizerDiscardEnable-commandBuffer-cmdpool) VUID-vkCmdSetRasterizerDiscardEnable-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetRasterizerDiscardEnable-videocoding) VUID-vkCmdSetRasterizerDiscardEnable-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetRasterizerDiscardEnable is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

By default vertex data output from the last
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) are directed to vertex stream zero.
Geometry shaders **can** emit primitives to multiple independent vertex
streams.
Each vertex emitted by the geometry shader is directed at one of the vertex
streams.
As vertices are received on each vertex stream, they are arranged into
primitives of the type specified by the geometry shader output primitive
type.
The shading language instructions `OpEndPrimitive` and
`OpEndStreamPrimitive` **can** be used to end the primitive being assembled
on a given vertex stream and start a new empty primitive of the same type.
An implementation supports up to
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackStreams`
streams, which is at least 1.
The individual streams are numbered 0 through
`maxTransformFeedbackStreams` minus 1.
There is no requirement on the order of the streams to which vertices are
emitted, and the number of vertices emitted to each vertex stream **can** be
completely independent, subject only to the
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackStreamDataSize`
and
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackBufferDataSize`
limits.
The primitives output from all vertex streams are passed to the transform
feedback stage to be captured to transform feedback buffers in the manner
specified by the last
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader’s `XfbBuffer`, `XfbStride`, and `Offsets`
decorations on the output interface variables in the graphics pipeline.
To use a vertex stream other than zero, or to use multiple streams, the
`GeometryStreams` capability **must** be specified.

By default, the primitives output from vertex stream zero are rasterized.
If the implementation supports the
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](limits.html#VkPhysicalDeviceTransformFeedbackPropertiesEXT)::`transformFeedbackRasterizationStreamSelect`
property it is possible to rasterize a vertex stream other than zero.

By default, geometry shaders that emit vertices to multiple vertex streams
are limited to using only the `OutputPoints` output primitive type.
If the implementation supports the
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](limits.html#VkPhysicalDeviceTransformFeedbackPropertiesEXT)::`transformFeedbackStreamsLinesTriangles`
property it is possible to emit `OutputLineStrip` or
`OutputTriangleStrip` in addition to `OutputPoints`.

The vertex stream used for rasterization is specified by adding a
`VkPipelineRasterizationStateStreamCreateInfoEXT` structure to the
`pNext` chain of a [VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)
structure.

The `VkPipelineRasterizationStateStreamCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_transform_feedback
typedef struct VkPipelineRasterizationStateStreamCreateInfoEXT {
    VkStructureType                                     sType;
    const void*                                         pNext;
    VkPipelineRasterizationStateStreamCreateFlagsEXT    flags;
    uint32_t                                            rasterizationStream;
} VkPipelineRasterizationStateStreamCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`rasterizationStream` is the vertex stream selected for
rasterization.

If this structure is not present, `rasterizationStream` is assumed to be
zero.

Valid Usage

* 
[](#VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-geometryStreams-02324) VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-geometryStreams-02324

`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`geometryStreams`
**must** be enabled

* 
[](#VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-rasterizationStream-02325) VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-rasterizationStream-02325

`rasterizationStream` **must** be less than
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](limits.html#VkPhysicalDeviceTransformFeedbackPropertiesEXT)::`maxTransformFeedbackStreams`

* 
[](#VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-rasterizationStream-02326) VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-rasterizationStream-02326

`rasterizationStream` **must** be zero if
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`transformFeedbackRasterizationStreamSelect`
is [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-sType-sType) VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_STREAM_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-flags-zerobitmask) VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)

// Provided by VK_EXT_transform_feedback
typedef VkFlags VkPipelineRasterizationStateStreamCreateFlagsEXT;

`VkPipelineRasterizationStateStreamCreateFlagsEXT` is a bitmask type for
setting a mask, but is currently reserved for future use.

To [dynamically set](pipelines.html#pipelines-dynamic-state) the
`rasterizationStream` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_transform_feedback, VK_EXT_shader_object with VK_EXT_transform_feedback
void vkCmdSetRasterizationStreamEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    rasterizationStream);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`rasterizationStream` specifies the `rasterizationStream` state.

This command sets the `rasterizationStream` state for subsequent drawing
commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationStateStreamCreateInfoEXT](#VkPipelineRasterizationStateStreamCreateInfoEXT)::`rasterizationStream`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetRasterizationStreamEXT-None-09423) VUID-vkCmdSetRasterizationStreamEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3RasterizationStream`](#features-extendedDynamicState3RasterizationStream) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetRasterizationStreamEXT-transformFeedback-07411) VUID-vkCmdSetRasterizationStreamEXT-transformFeedback-07411

The [`transformFeedback`](features.html#features-transformFeedback) feature
**must** be enabled

[](#VUID-vkCmdSetRasterizationStreamEXT-rasterizationStream-07412) VUID-vkCmdSetRasterizationStreamEXT-rasterizationStream-07412

`rasterizationStream` **must** be less than
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](limits.html#VkPhysicalDeviceTransformFeedbackPropertiesEXT)::`maxTransformFeedbackStreams`

[](#VUID-vkCmdSetRasterizationStreamEXT-rasterizationStream-07413) VUID-vkCmdSetRasterizationStreamEXT-rasterizationStream-07413

`rasterizationStream` **must** be zero if
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`transformFeedbackRasterizationStreamSelect`
is [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetRasterizationStreamEXT-commandBuffer-parameter) VUID-vkCmdSetRasterizationStreamEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetRasterizationStreamEXT-commandBuffer-recording) VUID-vkCmdSetRasterizationStreamEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetRasterizationStreamEXT-commandBuffer-cmdpool) VUID-vkCmdSetRasterizationStreamEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetRasterizationStreamEXT-videocoding) VUID-vkCmdSetRasterizationStreamEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetRasterizationStreamEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Within a subpass of a [render pass instance](renderpass.html#renderpass), for a given
(x,y,layer,sample) sample location, the following operations are guaranteed
to execute in *rasterization order*, for each separate primitive that
includes that sample location:

[Fragment operations](fragops.html#fragops), in the order defined

[Blending](framebuffer.html#framebuffer-blending), [logic    operations](framebuffer.html#framebuffer-logicop), and color writes

Execution of these operations for each primitive in a subpass occurs in
an order determined by the application.

The rasterization order to use for a graphics pipeline is specified by
adding a `VkPipelineRasterizationStateRasterizationOrderAMD` structure
to the `pNext` chain of a [VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)
structure.

The `VkPipelineRasterizationStateRasterizationOrderAMD` structure is
defined as:

// Provided by VK_AMD_rasterization_order
typedef struct VkPipelineRasterizationStateRasterizationOrderAMD {
    VkStructureType            sType;
    const void*                pNext;
    VkRasterizationOrderAMD    rasterizationOrder;
} VkPipelineRasterizationStateRasterizationOrderAMD;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`rasterizationOrder` is a [VkRasterizationOrderAMD](#VkRasterizationOrderAMD) value
specifying the primitive rasterization order to use.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationStateRasterizationOrderAMD-sType-sType) VUID-VkPipelineRasterizationStateRasterizationOrderAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_RASTERIZATION_ORDER_AMD](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineRasterizationStateRasterizationOrderAMD-rasterizationOrder-parameter) VUID-VkPipelineRasterizationStateRasterizationOrderAMD-rasterizationOrder-parameter

 `rasterizationOrder` **must** be a valid [VkRasterizationOrderAMD](#VkRasterizationOrderAMD) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)

If the `[VK_AMD_rasterization_order](../appendices/extensions.html#VK_AMD_rasterization_order)` device extension is not enabled
or the application does not request a particular rasterization order through
specifying a `VkPipelineRasterizationStateRasterizationOrderAMD`
structure then the rasterization order used by the graphics pipeline
defaults to [VK_RASTERIZATION_ORDER_STRICT_AMD](#VkRasterizationOrderAMD).

Possible values of
[VkPipelineRasterizationStateRasterizationOrderAMD](#VkPipelineRasterizationStateRasterizationOrderAMD)::`rasterizationOrder`,
specifying the primitive rasterization order, are:

// Provided by VK_AMD_rasterization_order
typedef enum VkRasterizationOrderAMD {
    VK_RASTERIZATION_ORDER_STRICT_AMD = 0,
    VK_RASTERIZATION_ORDER_RELAXED_AMD = 1,
} VkRasterizationOrderAMD;

* 
[VK_RASTERIZATION_ORDER_STRICT_AMD](#VkRasterizationOrderAMD) specifies that operations for
each primitive in a subpass **must** occur in [    primitive order](drawing.html#drawing-primitive-order).

* 
[VK_RASTERIZATION_ORDER_RELAXED_AMD](#VkRasterizationOrderAMD) specifies that operations for
each primitive in a subpass **may** not occur in [    primitive order](drawing.html#drawing-primitive-order).

Multisampling is a mechanism to antialias all Vulkan primitives: points,
lines, and polygons.
The technique is to sample all primitives multiple times at each pixel.
Each sample in each framebuffer attachment has storage for a color, depth,
and/or stencil value, such that per-fragment operations apply to each sample
independently.
The color sample values **can** be later *resolved* to a single color (see
[Resolving Multisample Images](copies.html#copies-resolve) and the [Render Pass](renderpass.html#renderpass) chapter for more details on how to resolve multisample images to
non-multisample images).

Vulkan defines rasterization rules for single-sample modes in a way that is
equivalent to a multisample mode with a single sample in the center of each
fragment.

Each fragment includes a [coverage mask](#primsrast-multisampling-coverage-mask) with a single bit for each sample in the fragment, and a number of
depth values and associated data for each sample.

It is understood that each pixel has `rasterizationSamples` locations
associated with it.
These locations are exact positions, rather than regions or areas, and each
is referred to as a sample point.
The sample points associated with a pixel **must** be located inside or on the
boundary of the unit square that is considered to bound the pixel.
Furthermore, the relative locations of sample points **may** be identical for
each pixel in the framebuffer, or they **may** differ.

If the render pass has a fragment density map attachment, each fragment only
has `rasterizationSamples` locations associated with it regardless of
how many pixels are covered in the fragment area.
Fragment sample locations are defined as if the fragment had an area of
(1,1) and its sample points **must** be located within these bounds.
Their actual location in the framebuffer is calculated by scaling the sample
location by the fragment area.
Attachments with storage for multiple samples per pixel are located at the
pixel sample locations.
Otherwise, the fragment’s sample locations are generally used for evaluation
of associated data and fragment operations.

If the current pipeline includes a fragment shader with one or more
variables in its interface decorated with `Sample` and `Input`, the
data associated with those variables will be assigned independently for each
sample.
The values for each sample **must** be evaluated at the location of the sample.
The data associated with any other variables not decorated with `Sample`
and `Input` need not be evaluated independently for each sample.

A *coverage mask* is generated for each fragment, based on which samples
within that fragment are determined to be within the area of the primitive
that generated the fragment.

Single pixel fragments
and multi-pixel fragments defined by a
[fragment density map](renderpass.html#renderpass-fragmentdensitymapattachment)
have one set of samples.
Multi-pixel fragments defined by a [shading rate image](#primsrast-shading-rate-image) have one set of samples per pixel.
Multi-pixel fragments defined by setting the
[fragment shading rate](#primsrast-fragment-shading-rate) have one set of
samples per pixel.
Each set of samples has a number of samples determined by
[VkPipelineMultisampleStateCreateInfo](#VkPipelineMultisampleStateCreateInfo)::`rasterizationSamples`.
Each sample in a set is assigned a unique *sample index* i in the
range [0, `rasterizationSamples`).

To [dynamically set](pipelines.html#pipelines-dynamic-state) the
`rasterizationSamples`, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetRasterizationSamplesEXT(
    VkCommandBuffer                             commandBuffer,
    VkSampleCountFlagBits                       rasterizationSamples);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`rasterizationSamples` specifies `rasterizationSamples`.

This command sets the `rasterizationSamples` for subsequent drawing
commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineMultisampleStateCreateInfo](#VkPipelineMultisampleStateCreateInfo)::`rasterizationSamples` value
used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetRasterizationSamplesEXT-None-09423) VUID-vkCmdSetRasterizationSamplesEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3RasterizationSamples`](#features-extendedDynamicState3RasterizationSamples) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetRasterizationSamplesEXT-commandBuffer-parameter) VUID-vkCmdSetRasterizationSamplesEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetRasterizationSamplesEXT-rasterizationSamples-parameter) VUID-vkCmdSetRasterizationSamplesEXT-rasterizationSamples-parameter

 `rasterizationSamples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value

* 
[](#VUID-vkCmdSetRasterizationSamplesEXT-commandBuffer-recording) VUID-vkCmdSetRasterizationSamplesEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetRasterizationSamplesEXT-commandBuffer-cmdpool) VUID-vkCmdSetRasterizationSamplesEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetRasterizationSamplesEXT-videocoding) VUID-vkCmdSetRasterizationSamplesEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetRasterizationSamplesEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Each sample in a fragment is also assigned a unique *coverage index* j
in the range [0, n × `rasterizationSamples`), where n
is the number of sets in the fragment.
If the fragment contains a single set of samples, the *coverage index* is
always equal to the *sample index*.
If a [shading rate image](#primsrast-shading-rate-image) is used and a
fragment covers multiple pixels, the coverage index is determined as defined
by [VkPipelineViewportCoarseSampleOrderStateCreateInfoNV](#VkPipelineViewportCoarseSampleOrderStateCreateInfoNV) or
[vkCmdSetCoarseSampleOrderNV](#vkCmdSetCoarseSampleOrderNV).

If the [fragment shading rate](#primsrast-fragment-shading-rate) is set,
the coverage index j is determined as a function of the *pixel index*
p, the *sample index* i, and the number of rasterization samples
r as:

j = i + r × ((fw × fh) - 1 - p)

where the pixel index p is determined as a function of the pixel’s
framebuffer location (x,y) and the fragment size (fw,fh):

px = x % fw

py = y % fh

p = px + (py × fw)

The tables below illustrate the pixel index for multi-pixel fragments:

| 1x1 | 1x2 | 1x4 |
| --- | --- | --- |
| ![pixel index 1x1](../_images/pixel_index_1x1.svg) | ![pixel index 1x2](../_images/pixel_index_1x2.svg) | ![pixel index 1x4](../_images/pixel_index_1x4.svg) |

| 2x1 | 2x2 | 2x4 |
| --- | --- | --- |
| ![pixel index 2x1](../_images/pixel_index_2x1.svg) | ![pixel index 2x2](../_images/pixel_index_2x2.svg) | ![pixel index 2x4](../_images/pixel_index_2x4.svg) |

| 4x1 | 4x2 | 4x4 |
| --- | --- | --- |
| ![pixel index 4x1](../_images/pixel_index_4x1.svg) | ![pixel index 4x2](../_images/pixel_index_4x2.svg) | ![pixel index 4x4](../_images/pixel_index_4x4.svg) |

The coverage mask includes B bits packed into W words, defined
as:

B = n × `rasterizationSamples`

W = ⌈B/32⌉

Bit b in coverage mask word w is `1` if the sample with coverage
index j = 32×w + b is covered, and `0` otherwise.

If the `standardSampleLocations` member of [VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)
is [VK_TRUE](fundamentals.html#VK_TRUE), then the sample counts [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits),
[VK_SAMPLE_COUNT_2_BIT](limits.html#VkSampleCountFlagBits), [VK_SAMPLE_COUNT_4_BIT](limits.html#VkSampleCountFlagBits),
[VK_SAMPLE_COUNT_8_BIT](limits.html#VkSampleCountFlagBits), and [VK_SAMPLE_COUNT_16_BIT](limits.html#VkSampleCountFlagBits) have sample
locations as listed in the following table, with the ith entry in
the table corresponding to sample index i.
[VK_SAMPLE_COUNT_32_BIT](limits.html#VkSampleCountFlagBits) and [VK_SAMPLE_COUNT_64_BIT](limits.html#VkSampleCountFlagBits) do not have
standard sample locations.
Locations are defined relative to an origin in the upper left corner of the
fragment.

| Sample count | Sample Locations |
| --- | --- |
| [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) | (0.5,0.5) | ![sample count 1](../_images/sample_count_1.svg) |
| [VK_SAMPLE_COUNT_2_BIT](limits.html#VkSampleCountFlagBits) | (0.75,0.75)

      (0.25,0.25) | ![sample count 2](../_images/sample_count_2.svg) |
| [VK_SAMPLE_COUNT_4_BIT](limits.html#VkSampleCountFlagBits) | (0.375, 0.125)

      (0.875, 0.375)

      (0.125, 0.625)

      (0.625, 0.875) | ![sample count 4](../_images/sample_count_4.svg) |
| [VK_SAMPLE_COUNT_8_BIT](limits.html#VkSampleCountFlagBits) | (0.5625, 0.3125)

      (0.4375, 0.6875)

      (0.8125, 0.5625)

      (0.3125, 0.1875)

      (0.1875, 0.8125)

      (0.0625, 0.4375)

      (0.6875, 0.9375)

      (0.9375, 0.0625) | ![sample count 8](../_images/sample_count_8.svg) |
| [VK_SAMPLE_COUNT_16_BIT](limits.html#VkSampleCountFlagBits) | (0.5625, 0.5625)

      (0.4375, 0.3125)

      (0.3125, 0.625)

      (0.75,   0.4375)

      (0.1875, 0.375)

      (0.625,  0.8125)

      (0.8125, 0.6875)

      (0.6875, 0.1875)

      (0.375,  0.875)

      (0.5,    0.0625)

      (0.25,   0.125)

      (0.125,  0.75)

      (0.0,    0.5)

      (0.9375, 0.25)

      (0.875,  0.9375)

      (0.0625, 0.0) | ![sample count 16](../_images/sample_count_16.svg) |

Color images created with multiple samples per pixel use a compression
technique where there are two arrays of data associated with each pixel.
The first array contains one element per sample where each element stores an
index to the second array defining the *fragment mask* of the pixel.
The second array contains one element per *color fragment* and each element
stores a unique color value in the format of the image.
With this compression technique it is not always necessary to actually use
unique storage locations for each color sample: when multiple samples share
the same color value the fragment mask **may** have two samples referring to
the same color fragment.
The number of color fragments is determined by the `samples` member of
the [VkImageCreateInfo](resources.html#VkImageCreateInfo) structure used to create the image.
The `[VK_AMD_shader_fragment_mask](../appendices/extensions.html#VK_AMD_shader_fragment_mask)` device extension provides shader
instructions enabling the application to get direct access to the fragment
mask and the individual color fragment values.

![fragment mask](../_images/fragment_mask.svg)

Figure 1. Fragment Mask

Applications **can** also control the sample locations used for rasterization.

If the `pNext` chain of the [VkPipelineMultisampleStateCreateInfo](#VkPipelineMultisampleStateCreateInfo)
structure specified at pipeline creation time includes a
`VkPipelineSampleLocationsStateCreateInfoEXT` structure, then that
structure controls the sample locations used when rasterizing primitives
with the pipeline.

The `VkPipelineSampleLocationsStateCreateInfoEXT` structure is defined
as:

// Provided by VK_EXT_sample_locations
typedef struct VkPipelineSampleLocationsStateCreateInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    VkBool32                    sampleLocationsEnable;
    VkSampleLocationsInfoEXT    sampleLocationsInfo;
} VkPipelineSampleLocationsStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampleLocationsEnable` controls whether custom sample locations are
used.
If `sampleLocationsEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the default sample
locations are used and the values specified in `sampleLocationsInfo`
are ignored.

* 
`sampleLocationsInfo` is the sample locations to use during
rasterization if `sampleLocationsEnable` is [VK_TRUE](fundamentals.html#VK_TRUE) and the
graphics pipeline is not created with
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](pipelines.html#VkDynamicState).

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineSampleLocationsStateCreateInfoEXT-sType-sType) VUID-VkPipelineSampleLocationsStateCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_SAMPLE_LOCATIONS_STATE_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineSampleLocationsStateCreateInfoEXT-sampleLocationsInfo-parameter) VUID-VkPipelineSampleLocationsStateCreateInfoEXT-sampleLocationsInfo-parameter

 `sampleLocationsInfo` **must** be a valid [VkSampleLocationsInfoEXT](#VkSampleLocationsInfoEXT) structure

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineMultisampleStateCreateInfo](#VkPipelineMultisampleStateCreateInfo)

The `VkSampleLocationsInfoEXT` structure is defined as:

// Provided by VK_EXT_sample_locations
typedef struct VkSampleLocationsInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    VkSampleCountFlagBits         sampleLocationsPerPixel;
    VkExtent2D                    sampleLocationGridSize;
    uint32_t                      sampleLocationsCount;
    const VkSampleLocationEXT*    pSampleLocations;
} VkSampleLocationsInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampleLocationsPerPixel` is a [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value
specifying the number of sample locations per pixel.

* 
`sampleLocationGridSize` is the size of the sample location grid to
select custom sample locations for.

* 
`sampleLocationsCount` is the number of sample locations in
`pSampleLocations`.

* 
`pSampleLocations` is a pointer to an array of
`sampleLocationsCount` [VkSampleLocationEXT](#VkSampleLocationEXT) structures.

This structure **can** be used either to specify the sample locations to be
used for rendering or to specify the set of sample locations an image
subresource has been last rendered with for the purposes of layout
transitions of depth/stencil images created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](resources.html#VkImageCreateFlagBits).

The sample locations in `pSampleLocations` specify
`sampleLocationsPerPixel` number of sample locations for each pixel in
the grid of the size specified in `sampleLocationGridSize`.
The sample location for sample i at the pixel grid location
(x,y) is taken from `pSampleLocations`[(x +  y ×
`sampleLocationGridSize.width`) × `sampleLocationsPerPixel`
+  i].

If the render pass has a fragment density map, the implementation will
choose the sample locations for the fragment and the contents of
`pSampleLocations` **may** be ignored.

Valid Usage

* 
[](#VUID-VkSampleLocationsInfoEXT-sampleLocationsPerPixel-01526) VUID-VkSampleLocationsInfoEXT-sampleLocationsPerPixel-01526

`sampleLocationsPerPixel` **must** be a valid
[VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value that is set in
[VkPhysicalDeviceSampleLocationsPropertiesEXT](limits.html#VkPhysicalDeviceSampleLocationsPropertiesEXT)::`sampleLocationSampleCounts`

* 
[](#VUID-VkSampleLocationsInfoEXT-sampleLocationsCount-01527) VUID-VkSampleLocationsInfoEXT-sampleLocationsCount-01527

`sampleLocationsCount` **must** equal
`sampleLocationsPerPixel` ×
`sampleLocationGridSize.width` ×
`sampleLocationGridSize.height`

Valid Usage (Implicit)

* 
[](#VUID-VkSampleLocationsInfoEXT-sType-sType) VUID-VkSampleLocationsInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLE_LOCATIONS_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSampleLocationsInfoEXT-pSampleLocations-parameter) VUID-VkSampleLocationsInfoEXT-pSampleLocations-parameter

 If `sampleLocationsCount` is not `0`, `pSampleLocations` **must** be a valid pointer to an array of `sampleLocationsCount` [VkSampleLocationEXT](#VkSampleLocationEXT) structures

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageMemoryBarrier](synchronization.html#VkImageMemoryBarrier)

* 
[VkImageMemoryBarrier2](synchronization.html#VkImageMemoryBarrier2)

The `VkSampleLocationEXT` structure is defined as:

// Provided by VK_EXT_sample_locations
typedef struct VkSampleLocationEXT {
    float    x;
    float    y;
} VkSampleLocationEXT;

* 
`x` is the horizontal coordinate of the sample’s location.

* 
`y` is the vertical coordinate of the sample’s location.

The domain space of the sample location coordinates has an upper-left origin
within the pixel in framebuffer space.

The values specified in a `VkSampleLocationEXT` structure are always
clamped to the implementation-dependent sample location coordinate range
[`sampleLocationCoordinateRange`[0],`sampleLocationCoordinateRange`[1]]
that **can** be queried using
[VkPhysicalDeviceSampleLocationsPropertiesEXT](limits.html#VkPhysicalDeviceSampleLocationsPropertiesEXT).

To [dynamically set](pipelines.html#pipelines-dynamic-state) the
`sampleLocationsEnable` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_sample_locations, VK_EXT_sample_locations with VK_EXT_shader_object
void vkCmdSetSampleLocationsEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    sampleLocationsEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`sampleLocationsEnable` specifies the `sampleLocationsEnable`
state.

This command sets the `sampleLocationsEnable` state for subsequent
drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineSampleLocationsStateCreateInfoEXT](#VkPipelineSampleLocationsStateCreateInfoEXT)::`sampleLocationsEnable`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetSampleLocationsEnableEXT-None-09423) VUID-vkCmdSetSampleLocationsEnableEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3SampleLocationsEnable`](#features-extendedDynamicState3SampleLocationsEnable) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetSampleLocationsEnableEXT-commandBuffer-parameter) VUID-vkCmdSetSampleLocationsEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetSampleLocationsEnableEXT-commandBuffer-recording) VUID-vkCmdSetSampleLocationsEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetSampleLocationsEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetSampleLocationsEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetSampleLocationsEnableEXT-videocoding) VUID-vkCmdSetSampleLocationsEnableEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetSampleLocationsEnableEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To [dynamically set](pipelines.html#pipelines-dynamic-state) the sample locations used
for rasterization, call:

// Provided by VK_EXT_sample_locations
void vkCmdSetSampleLocationsEXT(
    VkCommandBuffer                             commandBuffer,
    const VkSampleLocationsInfoEXT*             pSampleLocationsInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pSampleLocationsInfo` is the sample locations state to set.

This command sets the custom sample locations for subsequent drawing
commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`, and when the
[VkPipelineSampleLocationsStateCreateInfoEXT](#VkPipelineSampleLocationsStateCreateInfoEXT)::`sampleLocationsEnable`
property of the bound graphics pipeline is [VK_TRUE](fundamentals.html#VK_TRUE).
Otherwise, this state is specified by the
[VkPipelineSampleLocationsStateCreateInfoEXT](#VkPipelineSampleLocationsStateCreateInfoEXT)::`sampleLocationsInfo`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetSampleLocationsEXT-variableSampleLocations-01530) VUID-vkCmdSetSampleLocationsEXT-variableSampleLocations-01530

If
[VkPhysicalDeviceSampleLocationsPropertiesEXT](limits.html#VkPhysicalDeviceSampleLocationsPropertiesEXT)::`variableSampleLocations`
is [VK_FALSE](fundamentals.html#VK_FALSE) then the current render pass **must** have been begun by
specifying a [VkRenderPassSampleLocationsBeginInfoEXT](renderpass.html#VkRenderPassSampleLocationsBeginInfoEXT) structure
whose `pPostSubpassSampleLocations` member contains an element with
a `subpassIndex` matching the current subpass index and the
`sampleLocationsInfo` member of that element **must** match the sample
locations state pointed to by `pSampleLocationsInfo`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetSampleLocationsEXT-commandBuffer-parameter) VUID-vkCmdSetSampleLocationsEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetSampleLocationsEXT-pSampleLocationsInfo-parameter) VUID-vkCmdSetSampleLocationsEXT-pSampleLocationsInfo-parameter

 `pSampleLocationsInfo` **must** be a valid pointer to a valid [VkSampleLocationsInfoEXT](#VkSampleLocationsInfoEXT) structure

* 
[](#VUID-vkCmdSetSampleLocationsEXT-commandBuffer-recording) VUID-vkCmdSetSampleLocationsEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetSampleLocationsEXT-commandBuffer-cmdpool) VUID-vkCmdSetSampleLocationsEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetSampleLocationsEXT-videocoding) VUID-vkCmdSetSampleLocationsEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetSampleLocationsEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The features advertised by
[VkPhysicalDeviceFragmentShadingRateFeaturesKHR](features.html#VkPhysicalDeviceFragmentShadingRateFeaturesKHR) allow an application to
control the [shading rate](../appendices/glossary.html#glossary-shading-rate) of a given fragment
shader invocation.

The fragment shading rate strongly interacts with [Multisampling](#primsrast-multisampling), and the set of available rates for an implementation **may**
be restricted by sample rate.

To query available shading rates, call:

// Provided by VK_KHR_fragment_shading_rate
VkResult vkGetPhysicalDeviceFragmentShadingRatesKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pFragmentShadingRateCount,
    VkPhysicalDeviceFragmentShadingRateKHR*     pFragmentShadingRates);

* 
`physicalDevice` is the handle to the physical device whose
properties will be queried.

* 
`pFragmentShadingRateCount` is a pointer to an integer related to
the number of fragment shading rates available or queried, as described
below.

* 
`pFragmentShadingRates` is either `NULL` or a pointer to an array of
[VkPhysicalDeviceFragmentShadingRateKHR](#VkPhysicalDeviceFragmentShadingRateKHR) structures.

If `pFragmentShadingRates` is `NULL`, then the number of fragment
shading rates available is returned in `pFragmentShadingRateCount`.
Otherwise, `pFragmentShadingRateCount` **must** point to a variable set by
the application to the number of elements in the `pFragmentShadingRates`
array, and on return the variable is overwritten with the number of
structures actually written to `pFragmentShadingRates`.
If `pFragmentShadingRateCount` is less than the number of fragment
shading rates available, at most `pFragmentShadingRateCount` structures
will be written, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the available fragment shading
rates were returned.

The returned array of fragment shading rates **must** be ordered from largest
`fragmentSize.width` value to smallest, and each set of fragment shading
rates with the same `fragmentSize.width` value **must** be ordered from
largest `fragmentSize.height` to smallest.
Any two entries in the array **must** not have the same `fragmentSize`
values.

For any entry in the array, the following rules also apply:

* 
The value of `fragmentSize.width` **must** be less than or equal to
[`maxFragmentSize.width`](limits.html#limits-maxFragmentSize).

* 
The value of `fragmentSize.width` **must** be greater than or equal to
`1`.

* 
The value of `fragmentSize.width` **must** be a power-of-two.

* 
The value of `fragmentSize.height` **must** be less than or equal to
[`maxFragmentSize.height`](limits.html#limits-maxFragmentSize).

* 
The value of `fragmentSize.height` **must** be greater than or equal to
`1`.

* 
The value of `fragmentSize.height` **must** be a power-of-two.

* 
The highest sample count in `sampleCounts` **must** be less than or
equal to [    `maxFragmentShadingRateRasterizationSamples`](limits.html#limits-maxFragmentShadingRateRasterizationSamples).

* 
The product of `fragmentSize.width`, `fragmentSize.height`, and
the highest sample count in `sampleCounts` **must** be less than or
equal to [    `maxFragmentShadingRateCoverageSamples`](limits.html#limits-maxFragmentShadingRateCoverageSamples).

Implementations **must** support at least the following shading rates:

| `sampleCounts` | `fragmentSize` |
| --- | --- |
| [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) \| [VK_SAMPLE_COUNT_4_BIT](limits.html#VkSampleCountFlagBits) | {2,2} |
| [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) \| [VK_SAMPLE_COUNT_4_BIT](limits.html#VkSampleCountFlagBits) | {2,1} |
| ~0 | {1,1} |

If [`framebufferColorSampleCounts`](limits.html#limits-framebufferColorSampleCounts), includes [VK_SAMPLE_COUNT_2_BIT](limits.html#VkSampleCountFlagBits),
the required rates **must** also include [VK_SAMPLE_COUNT_2_BIT](limits.html#VkSampleCountFlagBits).

|  | Including the {1,1} fragment size is done for completeness; it has no actual
| --- | --- |
effect on the support of rendering without setting the fragment size.
All sample counts
and render pass transforms
are supported for this rate. |

The returned set of fragment shading rates **must** be returned in the native
(rotated) coordinate system.
For rasterization using render pass `transform` not equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR), the application **must** transform
the returned fragment shading rates into the current (unrotated) coordinate
system to get the supported rates for that transform.

|  | For example, consider an implementation returning support for 4x2, but not
| --- | --- |
2x4 in the set of supported fragment shading rates.
This means that for transforms [VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR)
and [VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VK_KHR_surface/wsi.html#VkSurfaceTransformFlagBitsKHR), 2x4 is a supported rate,
but 4x2 is an unsupported rate. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceFragmentShadingRatesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceFragmentShadingRatesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceFragmentShadingRatesKHR-pFragmentShadingRateCount-parameter) VUID-vkGetPhysicalDeviceFragmentShadingRatesKHR-pFragmentShadingRateCount-parameter

 `pFragmentShadingRateCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceFragmentShadingRatesKHR-pFragmentShadingRates-parameter) VUID-vkGetPhysicalDeviceFragmentShadingRatesKHR-pFragmentShadingRates-parameter

 If the value referenced by `pFragmentShadingRateCount` is not `0`, and `pFragmentShadingRates` is not `NULL`, `pFragmentShadingRates` **must** be a valid pointer to an array of `pFragmentShadingRateCount` [VkPhysicalDeviceFragmentShadingRateKHR](#VkPhysicalDeviceFragmentShadingRateKHR) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkPhysicalDeviceFragmentShadingRateKHR` structure is defined as

// Provided by VK_KHR_fragment_shading_rate
typedef struct VkPhysicalDeviceFragmentShadingRateKHR {
    VkStructureType       sType;
    void*                 pNext;
    VkSampleCountFlags    sampleCounts;
    VkExtent2D            fragmentSize;
} VkPhysicalDeviceFragmentShadingRateKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampleCounts` is a bitmask of sample counts for which the shading
rate described by `fragmentSize` is supported.

* 
`fragmentSize` is a [VkExtent2D](fundamentals.html#VkExtent2D) describing the width and height
of a supported shading rate.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShadingRateKHR-sType-sType) VUID-VkPhysicalDeviceFragmentShadingRateKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceFragmentShadingRateKHR-pNext-pNext) VUID-VkPhysicalDeviceFragmentShadingRateKHR-pNext-pNext

 `pNext` **must** be `NULL`

Fragment shading rates **can** be set at three points, with the three rates
combined to determine the final shading rate.

The *pipeline fragment shading rate* **can** be set on a per-draw basis by
either setting the rate in a graphics pipeline, or dynamically via
[vkCmdSetFragmentShadingRateKHR](#vkCmdSetFragmentShadingRateKHR).

The `VkPipelineFragmentShadingRateStateCreateInfoKHR` structure is
defined as:

// Provided by VK_KHR_fragment_shading_rate
typedef struct VkPipelineFragmentShadingRateStateCreateInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExtent2D                            fragmentSize;
    VkFragmentShadingRateCombinerOpKHR    combinerOps[2];
} VkPipelineFragmentShadingRateStateCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fragmentSize` specifies a [VkExtent2D](fundamentals.html#VkExtent2D) structure containing the
fragment size used to define the pipeline fragment shading rate for
drawing commands using this pipeline.

* 
`combinerOps` specifies a [VkFragmentShadingRateCombinerOpKHR](#VkFragmentShadingRateCombinerOpKHR)
value determining how the
[pipeline](#primsrast-fragment-shading-rate-pipeline),
[primitive](#primsrast-fragment-shading-rate-primitive), and
[attachment shading rates](#primsrast-fragment-shading-rate-attachment)
are [combined](#primsrast-fragment-shading-rate-combining) for fragments
generated by drawing commands using the created pipeline.

If the `pNext` chain of [VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo) includes a
`VkPipelineFragmentShadingRateStateCreateInfoKHR` structure, then that
structure includes parameters controlling the pipeline fragment shading
rate.

If this structure is not present, `fragmentSize` is considered to be
equal to (1,1), and both elements of `combinerOps` are considered
to be equal to [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](#VkFragmentShadingRateCombinerOpKHR).

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineFragmentShadingRateStateCreateInfoKHR-sType-sType) VUID-VkPipelineFragmentShadingRateStateCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_FRAGMENT_SHADING_RATE_STATE_CREATE_INFO_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)

To [dynamically set](pipelines.html#pipelines-dynamic-state) the pipeline fragment
shading rate and combiner operation, call:

// Provided by VK_KHR_fragment_shading_rate
void vkCmdSetFragmentShadingRateKHR(
    VkCommandBuffer                             commandBuffer,
    const VkExtent2D*                           pFragmentSize,
    const VkFragmentShadingRateCombinerOpKHR    combinerOps[2]);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pFragmentSize` specifies the pipeline fragment shading rate for
subsequent drawing commands.

* 
`combinerOps` specifies a [VkFragmentShadingRateCombinerOpKHR](#VkFragmentShadingRateCombinerOpKHR)
determining how the
[pipeline](#primsrast-fragment-shading-rate-pipeline),
[primitive](#primsrast-fragment-shading-rate-primitive), and
[attachment shading rates](#primsrast-fragment-shading-rate-attachment)
are [combined](#primsrast-fragment-shading-rate-combining) for fragments
generated by subsequent drawing commands.

This command sets the pipeline fragment shading rate and combiner operation
for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineFragmentShadingRateStateCreateInfoKHR](#VkPipelineFragmentShadingRateStateCreateInfoKHR) values used to create
the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-pipelineFragmentShadingRate-04507) VUID-vkCmdSetFragmentShadingRateKHR-pipelineFragmentShadingRate-04507

If the [    `pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) feature is not enabled,
`pFragmentSize->width` **must** be `1`

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-pipelineFragmentShadingRate-04508) VUID-vkCmdSetFragmentShadingRateKHR-pipelineFragmentShadingRate-04508

If the [    `pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) feature is not enabled,
`pFragmentSize->height` **must** be `1`

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-pipelineFragmentShadingRate-04509) VUID-vkCmdSetFragmentShadingRateKHR-pipelineFragmentShadingRate-04509

One of the [    `pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate),
[    `primitiveFragmentShadingRate`](features.html#features-primitiveFragmentShadingRate), or
[    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features **must** be enabled

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-primitiveFragmentShadingRate-04510) VUID-vkCmdSetFragmentShadingRateKHR-primitiveFragmentShadingRate-04510

If the [    `primitiveFragmentShadingRate`](features.html#features-primitiveFragmentShadingRate) feature is not enabled,
`combinerOps`[0] **must** be
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](#VkFragmentShadingRateCombinerOpKHR)

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-attachmentFragmentShadingRate-04511) VUID-vkCmdSetFragmentShadingRateKHR-attachmentFragmentShadingRate-04511

If the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is not enabled,
`combinerOps`[1] **must** be
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](#VkFragmentShadingRateCombinerOpKHR)

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-fragmentSizeNonTrivialCombinerOps-04512) VUID-vkCmdSetFragmentShadingRateKHR-fragmentSizeNonTrivialCombinerOps-04512

If the [    `fragmentSizeNonTrivialCombinerOps`](limits.html#limits-fragmentShadingRateNonTrivialCombinerOps) limit is not supported,
elements of `combinerOps` **must** be either
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](#VkFragmentShadingRateCombinerOpKHR) or
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_REPLACE_KHR](#VkFragmentShadingRateCombinerOpKHR)

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-04513) VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-04513

`pFragmentSize->width` **must** be greater than or equal to `1`

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-04514) VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-04514

`pFragmentSize->height` **must** be greater than or equal to `1`

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-04515) VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-04515

`pFragmentSize->width` **must** be a power-of-two value

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-04516) VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-04516

`pFragmentSize->height` **must** be a power-of-two value

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-04517) VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-04517

`pFragmentSize->width` **must** be less than or equal to `4`

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-04518) VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-04518

`pFragmentSize->height` **must** be less than or equal to `4`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-commandBuffer-parameter) VUID-vkCmdSetFragmentShadingRateKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-parameter) VUID-vkCmdSetFragmentShadingRateKHR-pFragmentSize-parameter

 `pFragmentSize` **must** be a valid pointer to a valid [VkExtent2D](fundamentals.html#VkExtent2D) structure

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-combinerOps-parameter) VUID-vkCmdSetFragmentShadingRateKHR-combinerOps-parameter

 Each element of `combinerOps` **must** be a valid [VkFragmentShadingRateCombinerOpKHR](#VkFragmentShadingRateCombinerOpKHR) value

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-commandBuffer-recording) VUID-vkCmdSetFragmentShadingRateKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-commandBuffer-cmdpool) VUID-vkCmdSetFragmentShadingRateKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetFragmentShadingRateKHR-videocoding) VUID-vkCmdSetFragmentShadingRateKHR-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetFragmentShadingRateKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The *primitive fragment shading rate* **can** be set via the
[`PrimitiveShadingRateKHR`](interfaces.html#interfaces-builtin-variables-primitiveshadingrate) built-in in the last active
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization).
If the last [pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization) is using the `MeshEXT` `Execution` `Model`, the rate
associated with a given primitive is sourced from the value written to the
per-primitive `PrimitiveShadingRateKHR`.
Otherwise the
rate associated with a given primitive is sourced from the value written to
`PrimitiveShadingRateKHR` by that primitive’s
[provoking vertex](vertexpostproc.html#vertexpostproc-flatshading).

The *attachment shading rate* **can** be set by including
[VkFragmentShadingRateAttachmentInfoKHR](renderpass.html#VkFragmentShadingRateAttachmentInfoKHR) in a subpass to define a
*fragment shading rate attachment*.
Each pixel in the framebuffer is assigned an attachment fragment shading
rate by the corresponding texel in the fragment shading rate attachment,
according to:

x' = floor(x / regionx)

y' = floor(y / regiony)

where x' and y' are the coordinates of a texel in the fragment
shading rate attachment, x and y are the coordinates of the
pixel in the framebuffer, and regionx and regiony are the
size of the region each texel corresponds to, as defined by the
`shadingRateAttachmentTexelSize` member of
[VkFragmentShadingRateAttachmentInfoKHR](renderpass.html#VkFragmentShadingRateAttachmentInfoKHR).

If [multiview is enabled](renderpass.html#VkRenderPassMultiviewCreateInfo) and the shading
rate attachment has multiple layers, the shading rate attachment texel is
selected using layer =
[`ViewIndex`](interfaces.html#interfaces-builtin-variables-viewindex).
If [multiview is disabled](renderpass.html#VkRenderPassMultiviewCreateInfo), and both the
shading rate attachment and the framebuffer have multiple layers, the
shading rate attachment texel is selected using layer =
[`Layer`](interfaces.html#interfaces-builtin-variables-layer).
Otherwise, layer = 0.

The texel is [read from the fragment shading rate attachment image](images.html#images-reads) using image coordinates equal to (x',y',0,layer,0,0).
The fragment size is encoded into the first component of the result of that
operation as follows:

sizew = 2((texel/4)&3)

sizeh = 2(texel&3)

where texel is the value in the first component of the returned value,
and sizew and sizeh are the width and height of the fragment
size, decoded from the texel.

If no fragment shading rate attachment is specified, this size is calculated
as sizew = sizeh = 1.
Applications **must** not specify a width or height greater than 4 by this
method.

The *Fragment Shading Rate* enumeration in SPIR-V adheres to the above
encoding.

The final rate (Cxy') used for fragment shading **must** be one of the
rates returned by [vkGetPhysicalDeviceFragmentShadingRatesKHR](#vkGetPhysicalDeviceFragmentShadingRatesKHR) for the
sample count
and render pass transform
used by rasterization.

If any of the following conditions are met, Cxy' is set to
{1,1} by the implementation:

* 
If [Sample Shading](#primsrast-sampleshading) is enabled.

* 
The [    `fragmentShadingRateWithSampleMask`](limits.html#limits-fragmentShadingRateWithSampleMask) limit is not supported, and
[VkPipelineMultisampleStateCreateInfo](#VkPipelineMultisampleStateCreateInfo)::`pSampleMask` contains a
zero value in any bit used by fragment operations.

* 
The [    `fragmentShadingRateWithShaderSampleMask`](limits.html#limits-fragmentShadingRateWithShaderSampleMask) is not supported, and
the fragment shader has `SampleMask` in the input or output
interface.

* 
The [    `fragmentShadingRateWithShaderDepthStencilWrites`](limits.html#limits-fragmentShadingRateWithShaderDepthStencilWrites) limit is not
supported, and the fragment shader declares the `FragDepth`
or `FragStencilRefEXT`
built-in.

* 
The [    `fragmentShadingRateWithConservativeRasterization`](limits.html#limits-fragmentShadingRateWithConservativeRasterization) limit is not
supported, and
[VkPipelineRasterizationConservativeStateCreateInfoEXT](#VkPipelineRasterizationConservativeStateCreateInfoEXT)::`conservativeRasterizationMode`
is not [VK_CONSERVATIVE_RASTERIZATION_MODE_DISABLED_EXT](#VkConservativeRasterizationModeEXT).

* 
The [    `fragmentShadingRateWithFragmentShaderInterlock`](limits.html#limits-fragmentShadingRateWithFragmentShaderInterlock) limit is not
supported, and the fragment shader declares any of the
[fragment shader interlock](fragops.html#fragops-shader-interlock) execution modes.

* 
The [    `fragmentShadingRateWithCustomSampleLocations`](limits.html#limits-fragmentShadingRateWithCustomSampleLocations) limit is not
supported, and
[VkPipelineSampleLocationsStateCreateInfoEXT](#VkPipelineSampleLocationsStateCreateInfoEXT)::`sampleLocationsEnable`
is [VK_TRUE](fundamentals.html#VK_TRUE).

* 
The fragment shader declares any of the
`TileImageColorReadAccessEXT`, `TileImageDepthReadAccessEXT`, or
`TileImageStencilReadAccessEXT` capabilities.

Otherwise, each of the specified shading rates are combined and then used to
derive the value of Cxy'.
As there are three ways to specify shading rates, two combiner operations
are specified - between the
[pipeline](#primsrast-fragment-shading-rate-pipeline) and
[primitive](#primsrast-fragment-shading-rate-primitive) shading rates, and
between the result of that and the
[attachment shading rate](#primsrast-fragment-shading-rate-attachment).

The equation used for each combiner operation is defined by
[VkFragmentShadingRateCombinerOpKHR](#VkFragmentShadingRateCombinerOpKHR):

// Provided by VK_KHR_fragment_shading_rate
typedef enum VkFragmentShadingRateCombinerOpKHR {
    VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR = 0,
    VK_FRAGMENT_SHADING_RATE_COMBINER_OP_REPLACE_KHR = 1,
    VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MIN_KHR = 2,
    VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MAX_KHR = 3,
    VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MUL_KHR = 4,
} VkFragmentShadingRateCombinerOpKHR;

* 
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](#VkFragmentShadingRateCombinerOpKHR) specifies a combiner
operation of combine(Axy,Bxy) = Axy.

* 
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_REPLACE_KHR](#VkFragmentShadingRateCombinerOpKHR) specifies a
combiner operation of combine(Axy,Bxy) = Bxy.

* 
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MIN_KHR](#VkFragmentShadingRateCombinerOpKHR) specifies a combiner
operation of combine(Axy,Bxy) = min(Axy,Bxy).

* 
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MAX_KHR](#VkFragmentShadingRateCombinerOpKHR) specifies a combiner
operation of combine(Axy,Bxy) = max(Axy,Bxy).

* 
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MUL_KHR](#VkFragmentShadingRateCombinerOpKHR) specifies a combiner
operation of combine(Axy,Bxy) = Axy*Bxy.

where combine(Axy,Bxy) is the combine operation, and Axy
and Bxy are the inputs to the operation.

If [`fragmentShadingRateStrictMultiplyCombiner`](limits.html#limits-fragmentShadingRateStrictMultiplyCombiner) is [VK_FALSE](fundamentals.html#VK_FALSE), using
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MUL_KHR](#VkFragmentShadingRateCombinerOpKHR) with values of 1 for both
A and B in the same dimension results in the value 2 being produced for that
dimension.
See the definition of [`fragmentShadingRateStrictMultiplyCombiner`](limits.html#limits-fragmentShadingRateStrictMultiplyCombiner) for more information.

These operations are performed in a component-wise fashion.

This is used to generate a combined fragment area using the equation:

Cxy = combine(Axy,Bxy)

where Cxy is the combined fragment area result, and Axy and
Bxy are the fragment areas of the fragment shading rates being
combined.

Two combine operations are performed, first with Axy equal to the
[pipeline fragment shading rate](#primsrast-fragment-shading-rate-pipeline)
and Bxy equal to the [primitive fragment shading rate](#primsrast-fragment-shading-rate-primitive), with the combine() operation
selected by combinerOps[0].
A second combination is then performed, with Axy equal to the result
of the first combination and Bxy equal to the
[attachment fragment shading rate](#primsrast-fragment-shading-rate-attachment), with the combine() operation selected by combinerOps[1].
The result of the second combination is used as the final fragment shading
rate, reported via the [`ShadingRateKHR` built-in](interfaces.html#interfaces-builtin-variables-primitiveshadingrate).

Implementations **should** clamp the inputs to the combiner operations
Axy and Bxy, and **must**
do so if
`VkPhysicalDeviceMaintenance6Properties`::`fragmentShadingRateClampCombinerInputs`
is [VK_TRUE](fundamentals.html#VK_TRUE).
All implementations **must**
clamp the result of the second combiner operation.

A fragment shading rate Rxy representing any of Axy,
Bxy or Cxy is clamped as follows.
If Rxy is one of the rates returned by
[vkGetPhysicalDeviceFragmentShadingRatesKHR](#vkGetPhysicalDeviceFragmentShadingRatesKHR) for the sample count
and render pass transform
used by rasterization, the clamped shading rate Rxy' is Rxy.
Otherwise, the clamped shading rate is selected from the rates returned by
[vkGetPhysicalDeviceFragmentShadingRatesKHR](#vkGetPhysicalDeviceFragmentShadingRatesKHR) for the sample count
and render pass transform
used by rasterization.
From this list of supported rates, the following steps are applied in order,
to select a single value:

Keep only rates where Rx' ≤ Rx and Ry' ≤ Ry.

* 
Implementations **may** also keep rates where Rx' ≤ Ry and
Ry' ≤ Rx.

Keep only rates with the highest area (Rx' × Ry').

Keep only rates with the lowest aspect ratio (Rx' +  Ry').

In cases where a wide (e.g. 4x1) and tall (e.g. 1x4) rate remain, the
implementation **may** choose either rate.
However, it **must** choose this rate consistently for the same shading
rates,
render pass transform,
and combiner operations for the lifetime of the [VkDevice](devsandqueues.html#VkDevice).

The features advertised by
[VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV](features.html#VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV) provide support for
additional fragment shading rates beyond those specifying one fragment
shader invocation covering all pixels in a fragment whose size is indicated
by the fragment shading rate.

If the [`fragmentShadingRateEnums`](features.html#features-fragmentShadingRateEnums)
feature is enabled, fragment shading rates may be specified using the
[VkFragmentShadingRateNV](#VkFragmentShadingRateNV) enumerated type defined as:

// Provided by VK_NV_fragment_shading_rate_enums
typedef enum VkFragmentShadingRateNV {
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_PIXEL_NV = 0,
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_1X2_PIXELS_NV = 1,
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_2X1_PIXELS_NV = 4,
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_2X2_PIXELS_NV = 5,
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_2X4_PIXELS_NV = 6,
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_4X2_PIXELS_NV = 9,
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_4X4_PIXELS_NV = 10,
    VK_FRAGMENT_SHADING_RATE_2_INVOCATIONS_PER_PIXEL_NV = 11,
    VK_FRAGMENT_SHADING_RATE_4_INVOCATIONS_PER_PIXEL_NV = 12,
    VK_FRAGMENT_SHADING_RATE_8_INVOCATIONS_PER_PIXEL_NV = 13,
    VK_FRAGMENT_SHADING_RATE_16_INVOCATIONS_PER_PIXEL_NV = 14,
    VK_FRAGMENT_SHADING_RATE_NO_INVOCATIONS_NV = 15,
} VkFragmentShadingRateNV;

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_PIXEL_NV](#VkFragmentShadingRateNV) specifies a
fragment size of 1x1 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_1X2_PIXELS_NV](#VkFragmentShadingRateNV) specifies
a fragment size of 1x2 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_2X1_PIXELS_NV](#VkFragmentShadingRateNV) specifies
a fragment size of 2x1 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_2X2_PIXELS_NV](#VkFragmentShadingRateNV) specifies
a fragment size of 2x2 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_2X4_PIXELS_NV](#VkFragmentShadingRateNV) specifies
a fragment size of 2x4 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_4X2_PIXELS_NV](#VkFragmentShadingRateNV) specifies
a fragment size of 4x2 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_4X4_PIXELS_NV](#VkFragmentShadingRateNV) specifies
a fragment size of 4x4 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_2_INVOCATIONS_PER_PIXEL_NV](#VkFragmentShadingRateNV) specifies a
fragment size of 1x1 pixels, with two fragment shader invocations per
fragment.

* 
[VK_FRAGMENT_SHADING_RATE_4_INVOCATIONS_PER_PIXEL_NV](#VkFragmentShadingRateNV) specifies a
fragment size of 1x1 pixels, with four fragment shader invocations per
fragment.

* 
[VK_FRAGMENT_SHADING_RATE_8_INVOCATIONS_PER_PIXEL_NV](#VkFragmentShadingRateNV) specifies a
fragment size of 1x1 pixels, with eight fragment shader invocations per
fragment.

* 
[VK_FRAGMENT_SHADING_RATE_16_INVOCATIONS_PER_PIXEL_NV](#VkFragmentShadingRateNV) specifies a
fragment size of 1x1 pixels, with sixteen fragment shader invocations
per fragment.

* 
[VK_FRAGMENT_SHADING_RATE_NO_INVOCATIONS_NV](#VkFragmentShadingRateNV) specifies that any
portions of a primitive that use that shading rate should be discarded
without invoking any fragment shader.

To use the shading rates
[VK_FRAGMENT_SHADING_RATE_2_INVOCATIONS_PER_PIXEL_NV](#VkFragmentShadingRateNV),
[VK_FRAGMENT_SHADING_RATE_4_INVOCATIONS_PER_PIXEL_NV](#VkFragmentShadingRateNV),
[VK_FRAGMENT_SHADING_RATE_8_INVOCATIONS_PER_PIXEL_NV](#VkFragmentShadingRateNV), and
[VK_FRAGMENT_SHADING_RATE_16_INVOCATIONS_PER_PIXEL_NV](#VkFragmentShadingRateNV) as a pipeline,
primitive, or attachment shading rate, the
[`supersampleFragmentShadingRates`](features.html#features-supersampleFragmentShadingRates) feature **must** be enabled.
To use the shading rate [VK_FRAGMENT_SHADING_RATE_NO_INVOCATIONS_NV](#VkFragmentShadingRateNV) as
a pipeline, primitive, or attachment shading rate, the
[`noInvocationFragmentShadingRates`](features.html#features-noInvocationFragmentShadingRates) feature **must** be enabled.

When using fragment shading rate enums, the pipeline fragment shading rate
**can** be set on a per-draw basis by either setting the rate in a graphics
pipeline, or dynamically via [vkCmdSetFragmentShadingRateEnumNV](#vkCmdSetFragmentShadingRateEnumNV).

The `VkPipelineFragmentShadingRateEnumStateCreateInfoNV` structure is
defined as:

// Provided by VK_NV_fragment_shading_rate_enums
typedef struct VkPipelineFragmentShadingRateEnumStateCreateInfoNV {
    VkStructureType                       sType;
    const void*                           pNext;
    VkFragmentShadingRateTypeNV           shadingRateType;
    VkFragmentShadingRateNV               shadingRate;
    VkFragmentShadingRateCombinerOpKHR    combinerOps[2];
} VkPipelineFragmentShadingRateEnumStateCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shadingRateType` specifies a [VkFragmentShadingRateTypeNV](#VkFragmentShadingRateTypeNV)
value indicating whether fragment shading rates are specified using
fragment sizes or [VkFragmentShadingRateNV](#VkFragmentShadingRateNV) enums.

* 
`shadingRate` specifies a [VkFragmentShadingRateNV](#VkFragmentShadingRateNV) value
indicating the pipeline fragment shading rate.

* 
`combinerOps` specifies [VkFragmentShadingRateCombinerOpKHR](#VkFragmentShadingRateCombinerOpKHR)
values determining how the
[pipeline](#primsrast-fragment-shading-rate-pipeline),
[primitive](#primsrast-fragment-shading-rate-primitive), and
[attachment shading rates](#primsrast-fragment-shading-rate-attachment)
are [combined](#primsrast-fragment-shading-rate-combining) for fragments
generated by drawing commands using the created pipeline.

If the `pNext` chain of [VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo) includes a
`VkPipelineFragmentShadingRateEnumStateCreateInfoNV` structure, then
that structure includes parameters controlling the pipeline fragment shading
rate.

If this structure is not present, `shadingRateType` is considered to be
equal to [VK_FRAGMENT_SHADING_RATE_TYPE_FRAGMENT_SIZE_NV](#VkFragmentShadingRateTypeNV),
`shadingRate` is considered to be equal to
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_PIXEL_NV](#VkFragmentShadingRateNV), and both elements
of `combinerOps` are considered to be equal to
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](#VkFragmentShadingRateCombinerOpKHR).

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineFragmentShadingRateEnumStateCreateInfoNV-sType-sType) VUID-VkPipelineFragmentShadingRateEnumStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_FRAGMENT_SHADING_RATE_ENUM_STATE_CREATE_INFO_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)

The [VkFragmentShadingRateTypeNV](#VkFragmentShadingRateTypeNV) enumerated type specifies whether a
graphics pipeline gets its pipeline fragment shading rates and combiners
from the [VkPipelineFragmentShadingRateEnumStateCreateInfoNV](#VkPipelineFragmentShadingRateEnumStateCreateInfoNV) structure
or the [VkPipelineFragmentShadingRateStateCreateInfoKHR](#VkPipelineFragmentShadingRateStateCreateInfoKHR) structure.

// Provided by VK_NV_fragment_shading_rate_enums
typedef enum VkFragmentShadingRateTypeNV {
    VK_FRAGMENT_SHADING_RATE_TYPE_FRAGMENT_SIZE_NV = 0,
    VK_FRAGMENT_SHADING_RATE_TYPE_ENUMS_NV = 1,
} VkFragmentShadingRateTypeNV;

* 
[VK_FRAGMENT_SHADING_RATE_TYPE_FRAGMENT_SIZE_NV](#VkFragmentShadingRateTypeNV) specifies that a
graphics pipeline should obtain its pipeline fragment shading rate and
shading rate combiner state from the
[VkPipelineFragmentShadingRateStateCreateInfoKHR](#VkPipelineFragmentShadingRateStateCreateInfoKHR) structure and that
any state specified by the
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](#VkPipelineFragmentShadingRateEnumStateCreateInfoNV) structure
should be ignored.

* 
[VK_FRAGMENT_SHADING_RATE_TYPE_ENUMS_NV](#VkFragmentShadingRateTypeNV) specifies that a graphics
pipeline should obtain its pipeline fragment shading rate and shading
rate combiner state from the
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](#VkPipelineFragmentShadingRateEnumStateCreateInfoNV) structure and
that any state specified by the
[VkPipelineFragmentShadingRateStateCreateInfoKHR](#VkPipelineFragmentShadingRateStateCreateInfoKHR) structure should
be ignored.

To [dynamically set](pipelines.html#pipelines-dynamic-state) the pipeline fragment
shading rate and combiner operation, call:

// Provided by VK_NV_fragment_shading_rate_enums
void vkCmdSetFragmentShadingRateEnumNV(
    VkCommandBuffer                             commandBuffer,
    VkFragmentShadingRateNV                     shadingRate,
    const VkFragmentShadingRateCombinerOpKHR    combinerOps[2]);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`shadingRate` specifies a [VkFragmentShadingRateNV](#VkFragmentShadingRateNV) enum
indicating the pipeline fragment shading rate for subsequent drawing
commands.

* 
`combinerOps` specifies a [VkFragmentShadingRateCombinerOpKHR](#VkFragmentShadingRateCombinerOpKHR)
determining how the
[pipeline](#primsrast-fragment-shading-rate-pipeline),
[primitive](#primsrast-fragment-shading-rate-primitive), and
[attachment shading rates](#primsrast-fragment-shading-rate-attachment)
are [combined](#primsrast-fragment-shading-rate-combining) for fragments
generated by subsequent drawing commands.

This command sets the pipeline fragment shading rate and combiner operation
for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](#VkPipelineFragmentShadingRateEnumStateCreateInfoNV) values used to
create the currently active pipeline.

|  | This command allows specifying additional shading rates beyond those
| --- | --- |
supported by [vkCmdSetFragmentShadingRateKHR](#vkCmdSetFragmentShadingRateKHR).
For more information, refer to the
`[VK_NV_fragment_shading_rate_enums](../appendices/extensions.html#VK_NV_fragment_shading_rate_enums)` appendix. |

Valid Usage

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-pipelineFragmentShadingRate-04576) VUID-vkCmdSetFragmentShadingRateEnumNV-pipelineFragmentShadingRate-04576

If the [    `pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) feature is not enabled,
`shadingRate` **must** be
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_PIXEL_NV](#VkFragmentShadingRateNV)

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-supersampleFragmentShadingRates-04577) VUID-vkCmdSetFragmentShadingRateEnumNV-supersampleFragmentShadingRates-04577

If the [    `supersampleFragmentShadingRates`](features.html#features-supersampleFragmentShadingRates) feature is not enabled,
`shadingRate` **must** not be
[VK_FRAGMENT_SHADING_RATE_2_INVOCATIONS_PER_PIXEL_NV](#VkFragmentShadingRateNV),
[VK_FRAGMENT_SHADING_RATE_4_INVOCATIONS_PER_PIXEL_NV](#VkFragmentShadingRateNV),
[VK_FRAGMENT_SHADING_RATE_8_INVOCATIONS_PER_PIXEL_NV](#VkFragmentShadingRateNV), or
[VK_FRAGMENT_SHADING_RATE_16_INVOCATIONS_PER_PIXEL_NV](#VkFragmentShadingRateNV)

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-noInvocationFragmentShadingRates-04578) VUID-vkCmdSetFragmentShadingRateEnumNV-noInvocationFragmentShadingRates-04578

If the [    `noInvocationFragmentShadingRates`](features.html#features-noInvocationFragmentShadingRates) feature is not enabled,
`shadingRate` **must** not be
[VK_FRAGMENT_SHADING_RATE_NO_INVOCATIONS_NV](#VkFragmentShadingRateNV)

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-fragmentShadingRateEnums-04579) VUID-vkCmdSetFragmentShadingRateEnumNV-fragmentShadingRateEnums-04579

The [    `fragmentShadingRateEnums`](features.html#features-fragmentShadingRateEnums) feature **must** be enabled

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-pipelineFragmentShadingRate-04580) VUID-vkCmdSetFragmentShadingRateEnumNV-pipelineFragmentShadingRate-04580

One of the [    `pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate),
[    `primitiveFragmentShadingRate`](features.html#features-primitiveFragmentShadingRate), or
[    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features **must** be enabled

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-primitiveFragmentShadingRate-04581) VUID-vkCmdSetFragmentShadingRateEnumNV-primitiveFragmentShadingRate-04581

If the [    `primitiveFragmentShadingRate`](features.html#features-primitiveFragmentShadingRate) feature is not enabled,
`combinerOps`[0] **must** be
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](#VkFragmentShadingRateCombinerOpKHR)

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-attachmentFragmentShadingRate-04582) VUID-vkCmdSetFragmentShadingRateEnumNV-attachmentFragmentShadingRate-04582

If the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is not enabled,
`combinerOps`[1] **must** be
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](#VkFragmentShadingRateCombinerOpKHR)

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-fragmentSizeNonTrivialCombinerOps-04583) VUID-vkCmdSetFragmentShadingRateEnumNV-fragmentSizeNonTrivialCombinerOps-04583

If the [    `fragmentSizeNonTrivialCombinerOps`](limits.html#limits-fragmentShadingRateNonTrivialCombinerOps) limit is not supported,
elements of `combinerOps` **must** be either
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](#VkFragmentShadingRateCombinerOpKHR) or
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_REPLACE_KHR](#VkFragmentShadingRateCombinerOpKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-commandBuffer-parameter) VUID-vkCmdSetFragmentShadingRateEnumNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-shadingRate-parameter) VUID-vkCmdSetFragmentShadingRateEnumNV-shadingRate-parameter

 `shadingRate` **must** be a valid [VkFragmentShadingRateNV](#VkFragmentShadingRateNV) value

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-combinerOps-parameter) VUID-vkCmdSetFragmentShadingRateEnumNV-combinerOps-parameter

 Each element of `combinerOps` **must** be a valid [VkFragmentShadingRateCombinerOpKHR](#VkFragmentShadingRateCombinerOpKHR) value

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-commandBuffer-recording) VUID-vkCmdSetFragmentShadingRateEnumNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-commandBuffer-cmdpool) VUID-vkCmdSetFragmentShadingRateEnumNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetFragmentShadingRateEnumNV-videocoding) VUID-vkCmdSetFragmentShadingRateEnumNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetFragmentShadingRateEnumNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

When the [`supersampleFragmentShadingRates`](features.html#features-supersampleFragmentShadingRates) or
[`noInvocationFragmentShadingRates`](features.html#features-noInvocationFragmentShadingRates) features are enabled, the behavior
of the [shading rate combiner operations](#primsrast-fragment-shading-rate-combining) is extended to support the shading rates enabled by those
features.
Primitive and attachment shading rate values are interpreted as
[VkFragmentShadingRateNV](#VkFragmentShadingRateNV) values and the behavior of the combiners is
modified as follows:

* 
For [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MIN_KHR](#VkFragmentShadingRateCombinerOpKHR),
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MAX_KHR](#VkFragmentShadingRateCombinerOpKHR), and
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MUL_KHR](#VkFragmentShadingRateCombinerOpKHR), if either
Axy or Bxy is
[VK_FRAGMENT_SHADING_RATE_NO_INVOCATIONS_NV](#VkFragmentShadingRateNV),
combine(Axy,Bxy) produces a shading rate of
[VK_FRAGMENT_SHADING_RATE_NO_INVOCATIONS_NV](#VkFragmentShadingRateNV), regardless of the
other input shading rate.

* 
For [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MIN_KHR](#VkFragmentShadingRateCombinerOpKHR),
combine(Axy,Bxy) produces a shading rate whose fragment size
is the smaller of the fragment sizes of Axy and Bxy and
whose invocation count is the larger of the invocation counts of
Axy and Bxy.

* 
For [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MAX_KHR](#VkFragmentShadingRateCombinerOpKHR),
combine(Axy,Bxy) produces a shading rate whose fragment size
is the larger of the fragment sizes of Axy and Bxy and
whose invocation count is the smaller of the invocation counts of
Axy and Bxy.

* 
For [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MUL_KHR](#VkFragmentShadingRateCombinerOpKHR),
combine(Axy,Bxy) produces a shading rate whose fragment size
and invocation count is the product of the fragment sizes and invocation
counts, respectively, of Axy and Bxy.
If the resulting shading rate has both multiple pixels and multiple
invocations per fragment, an implementation **may** adjust the shading rate
by reducing both the pixel and invocation counts.

If the final shading rate from the combiners is
[VK_FRAGMENT_SHADING_RATE_NO_INVOCATIONS_NV](#VkFragmentShadingRateNV), no fragments will be
generated for any portion of a primitive using that shading rate.

If the final shading rate from the combiners specifies multiple fragment
shader invocations per fragment, the fragment will be processed with
multiple unique samples as in [sample shading](#primsrast-sampleshading),
where the total number the total number of invocations is taken from the
shading rate and then clamped to `rasterizationSamples` and
[`maxFragmentShadingRateInvocationCount`](limits.html#limits-maxFragmentShadingRateInvocationCount).

The [`shadingRateImage`](features.html#features-shadingRateImage) feature allows
pipelines to use a [shading rate image](../appendices/glossary.html#glossary-shading-rate-image) to
control the [fragment area](../appendices/glossary.html#glossary-fragment-area) and the minimum number
of fragment shader invocations launched for each fragment.
When the shading rate image is enabled, the rasterizer determines a base
[shading rate](../appendices/glossary.html#glossary-shading-rate) for each region of the framebuffer
covered by a primitive by fetching a value from the shading rate image and
translating it to a shading rate using a per-viewport shading rate palette.
This base shading rate is then adjusted to derive a final shading rate.
The final shading rate specifies the fragment area and fragment shader
invocation count to use for fragments generated in the region.

If the `pNext` chain of [VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo) includes
a `VkPipelineViewportShadingRateImageStateCreateInfoNV` structure, then
that structure includes parameters controlling the shading rate.

The `VkPipelineViewportShadingRateImageStateCreateInfoNV` structure is
defined as:

// Provided by VK_NV_shading_rate_image
typedef struct VkPipelineViewportShadingRateImageStateCreateInfoNV {
    VkStructureType                  sType;
    const void*                      pNext;
    VkBool32                         shadingRateImageEnable;
    uint32_t                         viewportCount;
    const VkShadingRatePaletteNV*    pShadingRatePalettes;
} VkPipelineViewportShadingRateImageStateCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shadingRateImageEnable` specifies whether shading rate image and
palettes are used during rasterization.

* 
`viewportCount` specifies the number of per-viewport palettes used
to translate values stored in shading rate images.

* 
`pShadingRatePalettes` is a pointer to an array of
[VkShadingRatePaletteNV](#VkShadingRatePaletteNV) structures defining the palette for each
viewport.
If the shading rate palette state is dynamic, this member is ignored.

If this structure is not present, `shadingRateImageEnable` is considered
to be [VK_FALSE](fundamentals.html#VK_FALSE), and the shading rate image and palettes are not used.

Valid Usage

* 
[](#VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-viewportCount-02054) VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-viewportCount-02054

If the [`multiViewport`](features.html#features-multiViewport) feature is not
enabled, `viewportCount` **must** be `0` or `1`

* 
[](#VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-viewportCount-02055) VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-viewportCount-02055

`viewportCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxViewports`

* 
[](#VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-shadingRateImageEnable-02056) VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-shadingRateImageEnable-02056

If `shadingRateImageEnable` is [VK_TRUE](fundamentals.html#VK_TRUE), `viewportCount`
**must** be greater or equal to the `viewportCount` member of
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-sType-sType) VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_SHADING_RATE_IMAGE_STATE_CREATE_INFO_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo)

When shading rate image usage is enabled in the bound pipeline, the pipeline
uses a shading rate image specified by the command:

// Provided by VK_NV_shading_rate_image
void vkCmdBindShadingRateImageNV(
    VkCommandBuffer                             commandBuffer,
    VkImageView                                 imageView,
    VkImageLayout                               imageLayout);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`imageView` is an image view handle specifying the shading rate
image.
`imageView` **may** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), which is equivalent to
specifying a view of an image filled with zero values.

* 
`imageLayout` is the layout that the image subresources accessible
from `imageView` will be in when the shading rate image is accessed.

Valid Usage

* 
[](#VUID-vkCmdBindShadingRateImageNV-None-02058) VUID-vkCmdBindShadingRateImageNV-None-02058

The [`shadingRateImage`](features.html#features-shadingRateImage) feature **must**
be enabled

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageView-02059) VUID-vkCmdBindShadingRateImageNV-imageView-02059

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** be a valid
[VkImageView](resources.html#VkImageView) handle of type [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageView-02060) VUID-vkCmdBindShadingRateImageNV-imageView-02060

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** have a format
of [VK_FORMAT_R8_UINT](formats.html#VkFormat)

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageView-02061) VUID-vkCmdBindShadingRateImageNV-imageView-02061

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** have been
created with the [VK_IMAGE_USAGE_SHADING_RATE_IMAGE_BIT_NV](resources.html#VkImageUsageFlagBits) usage
flag set

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageView-02062) VUID-vkCmdBindShadingRateImageNV-imageView-02062

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageLayout` **must**
match the actual [VkImageLayout](resources.html#VkImageLayout) of each subresource accessible from
`imageView` at the time the subresource is accessed

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageLayout-02063) VUID-vkCmdBindShadingRateImageNV-imageLayout-02063

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageLayout` **must**
be [VK_IMAGE_LAYOUT_SHADING_RATE_OPTIMAL_NV](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindShadingRateImageNV-commandBuffer-parameter) VUID-vkCmdBindShadingRateImageNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageView-parameter) VUID-vkCmdBindShadingRateImageNV-imageView-parameter

 If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageView` **must** be a valid [VkImageView](resources.html#VkImageView) handle

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageLayout-parameter) VUID-vkCmdBindShadingRateImageNV-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-vkCmdBindShadingRateImageNV-commandBuffer-recording) VUID-vkCmdBindShadingRateImageNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindShadingRateImageNV-commandBuffer-cmdpool) VUID-vkCmdBindShadingRateImageNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindShadingRateImageNV-videocoding) VUID-vkCmdBindShadingRateImageNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindShadingRateImageNV-commonparent) VUID-vkCmdBindShadingRateImageNV-commonparent

 Both of `commandBuffer`, and `imageView` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindShadingRateImageNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

When the shading rate image is enabled in the current pipeline, rasterizing
a primitive covering the pixel with coordinates (*x*,*y*) will fetch a
shading rate index value from the shading rate image bound by
`vkCmdBindShadingRateImageNV`.
If the shading rate image view has a type of [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType),
the lookup will use texel coordinates (*u*,*v*) where \(u =
\left\lfloor \frac{x}{twidth} \right\rfloor\), \(v = \left\lfloor
\frac{y}{theight} \right\rfloor\), and    and
   are the width and height of the implementation-dependent
[shading rate texel size](limits.html#limits-shadingRateTexelSize).
If the shading rate image view has a type of
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](resources.html#VkImageViewType), the lookup will use texel coordinates
(*u*,*v*) to extract a texel from the layer *l*, where *l* is the layer of
the framebuffer being rendered to.
If *l* is greater than or equal to the number of layers in the image view,
layer zero will be used.

If the bound shading rate image view is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and
contains a texel with coordinates (*u*,*v*) in layer *l* (if applicable),
the single unsigned integer component for that texel will be used as the
shading rate index.
If the (*u*,*v*) coordinate is outside the extents of the subresource used
by the shading rate image view, or if the image view is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the shading rate index is zero.
If the shading rate image view has multiple mipmap levels, the base level
identified by `VkImageSubresourceRange`::`baseMipLevel` will be
used.

A shading rate index is mapped to a base shading rate using a lookup table
called the shading rate image palette.
There is a separate palette for each viewport.
The number of entries in each palette is given by the
implementation-dependent [shading rate image palette size](limits.html#limits-shadingRatePaletteSize).

To [dynamically set](pipelines.html#pipelines-dynamic-state) the
`shadingRateImageEnable` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_NV_shading_rate_image, VK_EXT_shader_object with VK_NV_shading_rate_image
void vkCmdSetShadingRateImageEnableNV(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    shadingRateImageEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`shadingRateImageEnable` specifies the `shadingRateImageEnable`
state.

This command sets the `shadingRateImageEnable` state for subsequent
drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_SHADING_RATE_IMAGE_ENABLE_NV](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportShadingRateImageStateCreateInfoNV](#VkPipelineViewportShadingRateImageStateCreateInfoNV)::`shadingRateImageEnable`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetShadingRateImageEnableNV-None-09423) VUID-vkCmdSetShadingRateImageEnableNV-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ShadingRateImageEnable`](#features-extendedDynamicState3ShadingRateImageEnable) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetShadingRateImageEnableNV-commandBuffer-parameter) VUID-vkCmdSetShadingRateImageEnableNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetShadingRateImageEnableNV-commandBuffer-recording) VUID-vkCmdSetShadingRateImageEnableNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetShadingRateImageEnableNV-commandBuffer-cmdpool) VUID-vkCmdSetShadingRateImageEnableNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetShadingRateImageEnableNV-videocoding) VUID-vkCmdSetShadingRateImageEnableNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetShadingRateImageEnableNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To [dynamically set](pipelines.html#pipelines-dynamic-state) the per-viewport shading
rate image palettes, call:

// Provided by VK_NV_shading_rate_image
void vkCmdSetViewportShadingRatePaletteNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstViewport,
    uint32_t                                    viewportCount,
    const VkShadingRatePaletteNV*               pShadingRatePalettes);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstViewport` is the index of the first viewport whose shading
rate palette is updated by the command.

* 
`viewportCount` is the number of viewports whose shading rate
palettes are updated by the command.

* 
`pShadingRatePalettes` is a pointer to an array of
[VkShadingRatePaletteNV](#VkShadingRatePaletteNV) structures defining the palette for each
viewport.

This command sets the per-viewport shading rate image palettes for
subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportShadingRateImageStateCreateInfoNV](#VkPipelineViewportShadingRateImageStateCreateInfoNV)::`pShadingRatePalettes`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-None-02064) VUID-vkCmdSetViewportShadingRatePaletteNV-None-02064

The [`shadingRateImage`](features.html#features-shadingRateImage) feature **must**
be enabled

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-firstViewport-02067) VUID-vkCmdSetViewportShadingRatePaletteNV-firstViewport-02067

The sum of `firstViewport` and `viewportCount` **must** be between
`1` and `VkPhysicalDeviceLimits`::`maxViewports`, inclusive

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-firstViewport-02068) VUID-vkCmdSetViewportShadingRatePaletteNV-firstViewport-02068

If the [`multiViewport`](features.html#features-multiViewport) feature is not
enabled, `firstViewport` **must** be `0`

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-viewportCount-02069) VUID-vkCmdSetViewportShadingRatePaletteNV-viewportCount-02069

If the [`multiViewport`](features.html#features-multiViewport) feature is not
enabled, `viewportCount` **must** be `1`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-commandBuffer-parameter) VUID-vkCmdSetViewportShadingRatePaletteNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-pShadingRatePalettes-parameter) VUID-vkCmdSetViewportShadingRatePaletteNV-pShadingRatePalettes-parameter

 `pShadingRatePalettes` **must** be a valid pointer to an array of `viewportCount` valid [VkShadingRatePaletteNV](#VkShadingRatePaletteNV) structures

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-commandBuffer-recording) VUID-vkCmdSetViewportShadingRatePaletteNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-commandBuffer-cmdpool) VUID-vkCmdSetViewportShadingRatePaletteNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-videocoding) VUID-vkCmdSetViewportShadingRatePaletteNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetViewportShadingRatePaletteNV-viewportCount-arraylength) VUID-vkCmdSetViewportShadingRatePaletteNV-viewportCount-arraylength

 `viewportCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetViewportShadingRatePaletteNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkShadingRatePaletteNV` structure specifies to contents of a single
shading rate image palette and is defined as:

// Provided by VK_NV_shading_rate_image
typedef struct VkShadingRatePaletteNV {
    uint32_t                              shadingRatePaletteEntryCount;
    const VkShadingRatePaletteEntryNV*    pShadingRatePaletteEntries;
} VkShadingRatePaletteNV;

* 
`shadingRatePaletteEntryCount` specifies the number of entries in
the shading rate image palette.

* 
`pShadingRatePaletteEntries` is a pointer to an array of
[VkShadingRatePaletteEntryNV](#VkShadingRatePaletteEntryNV) enums defining the shading rate for
each palette entry.

Valid Usage

* 
[](#VUID-VkShadingRatePaletteNV-shadingRatePaletteEntryCount-02071) VUID-VkShadingRatePaletteNV-shadingRatePaletteEntryCount-02071

`shadingRatePaletteEntryCount` **must** be between `1` and
`VkPhysicalDeviceShadingRateImagePropertiesNV`::`shadingRatePaletteSize`,
inclusive

Valid Usage (Implicit)

* 
[](#VUID-VkShadingRatePaletteNV-pShadingRatePaletteEntries-parameter) VUID-VkShadingRatePaletteNV-pShadingRatePaletteEntries-parameter

 `pShadingRatePaletteEntries` **must** be a valid pointer to an array of `shadingRatePaletteEntryCount` valid [VkShadingRatePaletteEntryNV](#VkShadingRatePaletteEntryNV) values

* 
[](#VUID-VkShadingRatePaletteNV-shadingRatePaletteEntryCount-arraylength) VUID-VkShadingRatePaletteNV-shadingRatePaletteEntryCount-arraylength

 `shadingRatePaletteEntryCount` **must** be greater than `0`

To determine the base shading rate image, a shading rate index *i* is mapped
to array element *i* in the array `pShadingRatePaletteEntries` for the
palette corresponding to the viewport used for the fragment.
If *i* is greater than or equal to the palette size
`shadingRatePaletteEntryCount`, the base shading rate is **undefined**.

The supported shading rate image palette entries are defined by
[VkShadingRatePaletteEntryNV](#VkShadingRatePaletteEntryNV):

// Provided by VK_NV_shading_rate_image
typedef enum VkShadingRatePaletteEntryNV {
    VK_SHADING_RATE_PALETTE_ENTRY_NO_INVOCATIONS_NV = 0,
    VK_SHADING_RATE_PALETTE_ENTRY_16_INVOCATIONS_PER_PIXEL_NV = 1,
    VK_SHADING_RATE_PALETTE_ENTRY_8_INVOCATIONS_PER_PIXEL_NV = 2,
    VK_SHADING_RATE_PALETTE_ENTRY_4_INVOCATIONS_PER_PIXEL_NV = 3,
    VK_SHADING_RATE_PALETTE_ENTRY_2_INVOCATIONS_PER_PIXEL_NV = 4,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_PIXEL_NV = 5,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_2X1_PIXELS_NV = 6,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_1X2_PIXELS_NV = 7,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_2X2_PIXELS_NV = 8,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_4X2_PIXELS_NV = 9,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_2X4_PIXELS_NV = 10,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_4X4_PIXELS_NV = 11,
} VkShadingRatePaletteEntryNV;

The following table indicates the width and height (in pixels) of each
fragment generated using the indicated shading rate, as well as the maximum
number of fragment shader invocations launched for each fragment.
When processing regions of a primitive that have a shading rate of
[VK_SHADING_RATE_PALETTE_ENTRY_NO_INVOCATIONS_NV](#VkShadingRatePaletteEntryNV), no fragments will be
generated in that region.

| Shading Rate | Width | Height | Invocations |
| --- | --- | --- | --- |
| [VK_SHADING_RATE_PALETTE_ENTRY_NO_INVOCATIONS_NV](#VkShadingRatePaletteEntryNV) | 0 | 0 | 0 |
| [VK_SHADING_RATE_PALETTE_ENTRY_16_INVOCATIONS_PER_PIXEL_NV](#VkShadingRatePaletteEntryNV) | 1 | 1 | 16 |
| [VK_SHADING_RATE_PALETTE_ENTRY_8_INVOCATIONS_PER_PIXEL_NV](#VkShadingRatePaletteEntryNV) | 1 | 1 | 8 |
| [VK_SHADING_RATE_PALETTE_ENTRY_4_INVOCATIONS_PER_PIXEL_NV](#VkShadingRatePaletteEntryNV) | 1 | 1 | 4 |
| [VK_SHADING_RATE_PALETTE_ENTRY_2_INVOCATIONS_PER_PIXEL_NV](#VkShadingRatePaletteEntryNV) | 1 | 1 | 2 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_PIXEL_NV](#VkShadingRatePaletteEntryNV) | 1 | 1 | 1 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_2X1_PIXELS_NV](#VkShadingRatePaletteEntryNV) | 2 | 1 | 1 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_1X2_PIXELS_NV](#VkShadingRatePaletteEntryNV) | 1 | 2 | 1 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_2X2_PIXELS_NV](#VkShadingRatePaletteEntryNV) | 2 | 2 | 1 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_4X2_PIXELS_NV](#VkShadingRatePaletteEntryNV) | 4 | 2 | 1 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_2X4_PIXELS_NV](#VkShadingRatePaletteEntryNV) | 2 | 4 | 1 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_4X4_PIXELS_NV](#VkShadingRatePaletteEntryNV) | 4 | 4 | 1 |

When the shading rate image is disabled, a shading rate of
[VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_PIXEL_NV](#VkShadingRatePaletteEntryNV) will be used
as the base shading rate.

Once a base shading rate has been established, it is adjusted to produce a
final shading rate.
First, if the base shading rate uses multiple pixels for each fragment, the
implementation **may** reduce the fragment area to ensure that the total number
of coverage samples for all pixels in a fragment does not exceed
[an implementation-dependent maximum](limits.html#limits-shadingRateMaxCoarseSamples).

If [sample shading](#primsrast-sampleshading) is active in the current
pipeline and would result in processing *n* (*n* > 1) unique samples per
fragment when the shading rate image is disabled, the shading rate is
adjusted in an implementation-dependent manner to increase the number of
fragment shader invocations spawned by the primitive.
If the shading rate indicates *fs* pixels per fragment and *fs* is greater
than *n*, the fragment area is adjusted so each fragment has approximately
   pixels.
Otherwise, if the shading rate indicates *ipf* invocations per fragment, the
fragment area will be adjusted to a single pixel with approximately
   invocations per fragment.

If sample shading occurs due to the use of a fragment shader input variable
decorated with `SampleId` or `SamplePosition`, the shading rate is
ignored.
Each fragment will have a single pixel and will spawn up to
`rasterizationSamples` fragment shader invocations, as when using
[sample shading](#primsrast-sampleshading) without a shading rate image.

Finally, if the shading rate specifies multiple fragment shader invocations
per fragment, the total number of invocations in the shading rate is clamped
to be no larger than `rasterizationSamples`.

When the final shading rate for a primitive covering pixel (*x*,*y*) has a
fragment area of   , the fragment for that pixel will
cover all pixels with coordinates (*x*',*y*') that satisfy the equations:

  

  

  

  

This combined fragment is considered to have multiple coverage samples; the
total number of samples in this fragment is given by \(samples = fw
\times fh \times rs\) where *rs* indicates the value of
`VkPipelineMultisampleStateCreateInfo`::`rasterizationSamples`
specified at pipeline creation time.
The set of coverage samples in the fragment is the union of the per-pixel
coverage samples in each of the fragment’s pixels The location and order of
coverage samples within each pixel in the combined fragment are assigned as
described in
[Multisampling](#primsrast-multisampling) and [Custom Sample Locations](#primsrast-samplelocations).
Each coverage sample in the set of pixels belonging to the combined fragment
is assigned a unique [coverage index](#primsrast-multisampling-coverage-mask) in the range [0,*samples*-1].
If the [`shadingRateCoarseSampleOrder`](features.html#features-shadingRateCoarseSampleOrder) feature is supported, the order of
coverage samples **can** be specified for each combination of fragment area and
coverage sample count.
If this feature is not supported, the sample order is
implementation-dependent.

If the `pNext` chain of [VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo) includes
a `VkPipelineViewportCoarseSampleOrderStateCreateInfoNV` structure, then
that structure includes parameters controlling the order of coverage samples
in fragments larger than one pixel.

The `VkPipelineViewportCoarseSampleOrderStateCreateInfoNV` structure is
defined as:

// Provided by VK_NV_shading_rate_image
typedef struct VkPipelineViewportCoarseSampleOrderStateCreateInfoNV {
    VkStructureType                       sType;
    const void*                           pNext;
    VkCoarseSampleOrderTypeNV             sampleOrderType;
    uint32_t                              customSampleOrderCount;
    const VkCoarseSampleOrderCustomNV*    pCustomSampleOrders;
} VkPipelineViewportCoarseSampleOrderStateCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampleOrderType` specifies the mechanism used to order coverage
samples in fragments larger than one pixel.

* 
`customSampleOrderCount` specifies the number of custom sample
orderings to use when ordering coverage samples.

* 
`pCustomSampleOrders` is a pointer to an array of
`customSampleOrderCount` [VkCoarseSampleOrderCustomNV](#VkCoarseSampleOrderCustomNV)
structures, each structure specifying the coverage sample order for a
single combination of fragment area and coverage sample count.

If this structure is not present, `sampleOrderType` is considered to be
[VK_COARSE_SAMPLE_ORDER_TYPE_DEFAULT_NV](#VkCoarseSampleOrderTypeNV).

If `sampleOrderType` is [VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV](#VkCoarseSampleOrderTypeNV), the
coverage sample order used for any combination of fragment area and coverage
sample count not enumerated in `pCustomSampleOrders` will be identical
to that used for [VK_COARSE_SAMPLE_ORDER_TYPE_DEFAULT_NV](#VkCoarseSampleOrderTypeNV).

If the pipeline was created with
[VK_DYNAMIC_STATE_VIEWPORT_COARSE_SAMPLE_ORDER_NV](pipelines.html#VkDynamicState), the contents of this
structure (if present) are ignored, and the coverage sample order is instead
specified by [vkCmdSetCoarseSampleOrderNV](#vkCmdSetCoarseSampleOrderNV).

Valid Usage

* 
[](#VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-sampleOrderType-02072) VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-sampleOrderType-02072

If `sampleOrderType` is not
[VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV](#VkCoarseSampleOrderTypeNV),
`customSamplerOrderCount` **must** be `0`

* 
[](#VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-pCustomSampleOrders-02234) VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-pCustomSampleOrders-02234

The array `pCustomSampleOrders` **must** not contain two structures
with matching values for both the `shadingRate` and
`sampleCount` members

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-sType-sType) VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_COARSE_SAMPLE_ORDER_STATE_CREATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-sampleOrderType-parameter) VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-sampleOrderType-parameter

 `sampleOrderType` **must** be a valid [VkCoarseSampleOrderTypeNV](#VkCoarseSampleOrderTypeNV) value

* 
[](#VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-pCustomSampleOrders-parameter) VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-pCustomSampleOrders-parameter

 If `customSampleOrderCount` is not `0`, `pCustomSampleOrders` **must** be a valid pointer to an array of `customSampleOrderCount` valid [VkCoarseSampleOrderCustomNV](#VkCoarseSampleOrderCustomNV) structures

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo)

The type [VkCoarseSampleOrderTypeNV](#VkCoarseSampleOrderTypeNV) specifies the technique used to
order coverage samples in fragments larger than one pixel, and is defined
as:

// Provided by VK_NV_shading_rate_image
typedef enum VkCoarseSampleOrderTypeNV {
    VK_COARSE_SAMPLE_ORDER_TYPE_DEFAULT_NV = 0,
    VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV = 1,
    VK_COARSE_SAMPLE_ORDER_TYPE_PIXEL_MAJOR_NV = 2,
    VK_COARSE_SAMPLE_ORDER_TYPE_SAMPLE_MAJOR_NV = 3,
} VkCoarseSampleOrderTypeNV;

* 
[VK_COARSE_SAMPLE_ORDER_TYPE_DEFAULT_NV](#VkCoarseSampleOrderTypeNV) specifies that coverage
samples will be ordered in an implementation-dependent manner.

* 
[VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV](#VkCoarseSampleOrderTypeNV) specifies that coverage
samples will be ordered according to the array of custom orderings
provided in either the `pCustomSampleOrders` member of
`VkPipelineViewportCoarseSampleOrderStateCreateInfoNV` or the
`pCustomSampleOrders` member of [vkCmdSetCoarseSampleOrderNV](#vkCmdSetCoarseSampleOrderNV).

* 
[VK_COARSE_SAMPLE_ORDER_TYPE_PIXEL_MAJOR_NV](#VkCoarseSampleOrderTypeNV) specifies that coverage
samples will be ordered sequentially, sorted first by pixel coordinate
(in row-major order) and then by
[sample index](#primsrast-multisampling-coverage-mask).

* 
[VK_COARSE_SAMPLE_ORDER_TYPE_SAMPLE_MAJOR_NV](#VkCoarseSampleOrderTypeNV) specifies that
coverage samples will be ordered sequentially, sorted first by
[sample index](#primsrast-multisampling-coverage-mask) and then by
pixel coordinate (in row-major order).

When using a coarse sample order of
[VK_COARSE_SAMPLE_ORDER_TYPE_PIXEL_MAJOR_NV](#VkCoarseSampleOrderTypeNV) for a fragment with an
upper-left corner of    with a width of \(fw
\times fh\) and    samples per pixel,
[coverage index](#primsrast-multisampling-coverage-mask)    of
the fragment will be assigned to [sample index](#primsrast-multisampling-coverage-mask)    of pixel    as follows:

  

  

When using a coarse sample order of
[VK_COARSE_SAMPLE_ORDER_TYPE_SAMPLE_MAJOR_NV](#VkCoarseSampleOrderTypeNV),
[coverage index](#primsrast-multisampling-coverage-mask)   
will be assigned as follows:

  

  

The `VkCoarseSampleOrderCustomNV` structure is defined as:

// Provided by VK_NV_shading_rate_image
typedef struct VkCoarseSampleOrderCustomNV {
    VkShadingRatePaletteEntryNV        shadingRate;
    uint32_t                           sampleCount;
    uint32_t                           sampleLocationCount;
    const VkCoarseSampleLocationNV*    pSampleLocations;
} VkCoarseSampleOrderCustomNV;

* 
`shadingRate` is a shading rate palette entry that identifies the
fragment width and height for the combination of fragment area and
per-pixel coverage sample count to control.

* 
`sampleCount` identifies the per-pixel coverage sample count for the
combination of fragment area and coverage sample count to control.

* 
`sampleLocationCount` specifies the number of sample locations in
the custom ordering.

* 
`pSampleLocations` is a pointer to an array of
[VkCoarseSampleLocationNV](#VkCoarseSampleLocationNV) structures specifying the location of
each sample in the custom ordering.

The `VkCoarseSampleOrderCustomNV` structure is used with a coverage
sample ordering type of [VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV](#VkCoarseSampleOrderTypeNV) to
specify the order of coverage samples for one combination of fragment width,
fragment height, and coverage sample count.

When using a custom sample ordering, element *j* in `pSampleLocations`
specifies a specific pixel location and
[sample index](#primsrast-multisampling-coverage-mask) that corresponds to
[coverage index](#primsrast-multisampling-coverage-mask) *j* in the
multi-pixel fragment.

Valid Usage

* 
[](#VUID-VkCoarseSampleOrderCustomNV-shadingRate-02073) VUID-VkCoarseSampleOrderCustomNV-shadingRate-02073

`shadingRate` **must** be a shading rate that generates fragments with
more than one pixel

* 
[](#VUID-VkCoarseSampleOrderCustomNV-sampleCount-02074) VUID-VkCoarseSampleOrderCustomNV-sampleCount-02074

`sampleCount` **must** correspond to a sample count enumerated in
[VkSampleCountFlags](limits.html#VkSampleCountFlags) whose corresponding bit is set in
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`framebufferNoAttachmentsSampleCounts`

* 
[](#VUID-VkCoarseSampleOrderCustomNV-sampleLocationCount-02075) VUID-VkCoarseSampleOrderCustomNV-sampleLocationCount-02075

`sampleLocationCount` **must** be equal to the product of
`sampleCount`, the fragment width for `shadingRate`, and the
fragment height for `shadingRate`

* 
[](#VUID-VkCoarseSampleOrderCustomNV-sampleLocationCount-02076) VUID-VkCoarseSampleOrderCustomNV-sampleLocationCount-02076

`sampleLocationCount` **must** be less than or equal to the value of
`VkPhysicalDeviceShadingRateImagePropertiesNV`::`shadingRateMaxCoarseSamples`

* 
[](#VUID-VkCoarseSampleOrderCustomNV-pSampleLocations-02077) VUID-VkCoarseSampleOrderCustomNV-pSampleLocations-02077

The array `pSampleLocations` **must** contain exactly one entry for
every combination of valid values for `pixelX`, `pixelY`, and
`sample` in the structure [VkCoarseSampleOrderCustomNV](#VkCoarseSampleOrderCustomNV)

Valid Usage (Implicit)

* 
[](#VUID-VkCoarseSampleOrderCustomNV-shadingRate-parameter) VUID-VkCoarseSampleOrderCustomNV-shadingRate-parameter

 `shadingRate` **must** be a valid [VkShadingRatePaletteEntryNV](#VkShadingRatePaletteEntryNV) value

* 
[](#VUID-VkCoarseSampleOrderCustomNV-pSampleLocations-parameter) VUID-VkCoarseSampleOrderCustomNV-pSampleLocations-parameter

 `pSampleLocations` **must** be a valid pointer to an array of `sampleLocationCount` [VkCoarseSampleLocationNV](#VkCoarseSampleLocationNV) structures

* 
[](#VUID-VkCoarseSampleOrderCustomNV-sampleLocationCount-arraylength) VUID-VkCoarseSampleOrderCustomNV-sampleLocationCount-arraylength

 `sampleLocationCount` **must** be greater than `0`

The `VkCoarseSampleLocationNV` structure identifies a specific pixel and
[sample index](#primsrast-multisampling-coverage-mask) for one of the
coverage samples in a fragment that is larger than one pixel.
This structure is defined as:

// Provided by VK_NV_shading_rate_image
typedef struct VkCoarseSampleLocationNV {
    uint32_t    pixelX;
    uint32_t    pixelY;
    uint32_t    sample;
} VkCoarseSampleLocationNV;

* 
`pixelX` is added to the x coordinate of the upper-leftmost pixel of
each fragment to identify the pixel containing the coverage sample.

* 
`pixelY` is added to the y coordinate of the upper-leftmost pixel of
each fragment to identify the pixel containing the coverage sample.

* 
`sample` is the number of the coverage sample in the pixel
identified by `pixelX` and `pixelY`.

Valid Usage

* 
[](#VUID-VkCoarseSampleLocationNV-pixelX-02078) VUID-VkCoarseSampleLocationNV-pixelX-02078

`pixelX` **must** be less than the width (in pixels) of the fragment

* 
[](#VUID-VkCoarseSampleLocationNV-pixelY-02079) VUID-VkCoarseSampleLocationNV-pixelY-02079

`pixelY` **must** be less than the height (in pixels) of the fragment

* 
[](#VUID-VkCoarseSampleLocationNV-sample-02080) VUID-VkCoarseSampleLocationNV-sample-02080

`sample` **must** be less than the number of coverage samples in each
pixel belonging to the fragment

To [dynamically set](pipelines.html#pipelines-dynamic-state) the order of coverage
samples in fragments larger than one pixel, call:

// Provided by VK_NV_shading_rate_image
void vkCmdSetCoarseSampleOrderNV(
    VkCommandBuffer                             commandBuffer,
    VkCoarseSampleOrderTypeNV                   sampleOrderType,
    uint32_t                                    customSampleOrderCount,
    const VkCoarseSampleOrderCustomNV*          pCustomSampleOrders);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`sampleOrderType` specifies the mechanism used to order coverage
samples in fragments larger than one pixel.

* 
`customSampleOrderCount` specifies the number of custom sample
orderings to use when ordering coverage samples.

* 
`pCustomSampleOrders` is a pointer to an array of
[VkCoarseSampleOrderCustomNV](#VkCoarseSampleOrderCustomNV) structures, each structure specifying
the coverage sample order for a single combination of fragment area and
coverage sample count.

If `sampleOrderType` is [VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV](#VkCoarseSampleOrderTypeNV), the
coverage sample order used for any combination of fragment area and coverage
sample count not enumerated in `pCustomSampleOrders` will be identical
to that used for [VK_COARSE_SAMPLE_ORDER_TYPE_DEFAULT_NV](#VkCoarseSampleOrderTypeNV).

This command sets the order of coverage samples for subsequent drawing
commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VIEWPORT_COARSE_SAMPLE_ORDER_NV](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportCoarseSampleOrderStateCreateInfoNV](#VkPipelineViewportCoarseSampleOrderStateCreateInfoNV) values used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-sampleOrderType-02081) VUID-vkCmdSetCoarseSampleOrderNV-sampleOrderType-02081

If `sampleOrderType` is not
[VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV](#VkCoarseSampleOrderTypeNV),
`customSamplerOrderCount` **must** be `0`

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-pCustomSampleOrders-02235) VUID-vkCmdSetCoarseSampleOrderNV-pCustomSampleOrders-02235

The array `pCustomSampleOrders` **must** not contain two structures
with matching values for both the `shadingRate` and
`sampleCount` members

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-commandBuffer-parameter) VUID-vkCmdSetCoarseSampleOrderNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-sampleOrderType-parameter) VUID-vkCmdSetCoarseSampleOrderNV-sampleOrderType-parameter

 `sampleOrderType` **must** be a valid [VkCoarseSampleOrderTypeNV](#VkCoarseSampleOrderTypeNV) value

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-pCustomSampleOrders-parameter) VUID-vkCmdSetCoarseSampleOrderNV-pCustomSampleOrders-parameter

 If `customSampleOrderCount` is not `0`, `pCustomSampleOrders` **must** be a valid pointer to an array of `customSampleOrderCount` valid [VkCoarseSampleOrderCustomNV](#VkCoarseSampleOrderCustomNV) structures

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-commandBuffer-recording) VUID-vkCmdSetCoarseSampleOrderNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-commandBuffer-cmdpool) VUID-vkCmdSetCoarseSampleOrderNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-videocoding) VUID-vkCmdSetCoarseSampleOrderNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetCoarseSampleOrderNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

If the final shading rate for a primitive covering pixel (*x*,*y*) results
in *n* invocations per pixel (*n* > 1), *n* separate fragment shader
invocations will be generated for the fragment.
Each coverage sample in the fragment will be assigned to one of the *n*
fragment shader invocations in an implementation-dependent manner.
The outputs from the [fragment output interface](interfaces.html#interfaces-fragmentoutput) of each shader invocation will be broadcast to all of the
framebuffer samples associated with the invocation.
If none of the coverage samples associated with a fragment shader invocation
is covered by a primitive, the implementation **may** discard the fragment
shader invocation for those samples.

If the final shading rate for a primitive covering pixel (*x*,*y*) results
in a fragment containing multiple pixels, a single set of fragment shader
invocations will be generated for all pixels in the combined fragment.
Outputs from the [fragment output interface](interfaces.html#interfaces-fragmentoutput)
will be broadcast to all covered framebuffer samples belonging to the
fragment.
If the fragment shader executes code discarding the fragment, none of the
samples of the fragment will be updated.

Sample shading **can** be used to specify a minimum number of unique samples to
process for each fragment.
If sample shading is enabled, an implementation **must** invoke the fragment
shader at least max(⌈
[VkPipelineMultisampleStateCreateInfo](#VkPipelineMultisampleStateCreateInfo)::`minSampleShading` ×
[VkPipelineMultisampleStateCreateInfo](#VkPipelineMultisampleStateCreateInfo)::`rasterizationSamples`
⌉, 1) times per fragment.
If [VkPipelineMultisampleStateCreateInfo](#VkPipelineMultisampleStateCreateInfo)::`sampleShadingEnable` is
[VK_TRUE](fundamentals.html#VK_TRUE), sample shading is enabled.

If a fragment shader entry point [statically uses](shaders.html#shaders-staticuse) an
input variable decorated with a `BuiltIn` of `SampleId` or
`SamplePosition`, sample shading is enabled and a value of `1.0` is used
instead of `minSampleShading`.
If a fragment shader entry point [statically uses](shaders.html#shaders-staticuse) an
input variable decorated with `Sample`, sample shading **may** be enabled
and a value of `1.0` will be used instead of `minSampleShading` if it
is.
If the `[VK_AMD_mixed_attachment_samples](../appendices/extensions.html#VK_AMD_mixed_attachment_samples)` extension is enabled and the
subpass uses color attachments, the `samples` value used to create each
color attachment is used instead of `rasterizationSamples`.

|  | If a shader decorates an input variable with `Sample` and that value
| --- | --- |
meaningfully impacts the output of a shader, sample shading will be enabled
to ensure that the input is in fact interpolated per-sample.
This is inherent to the specification and not spelled out here - if an
application simply declares such a variable it is implementation-defined
whether sample shading is enabled or not.
It is possible to see the effects of this by using atomics in the shader or
using a pipeline statistics query to query the number of fragment
invocations, even if the shader itself does not use any per-sample
variables. |

If there are fewer fragment invocations than [covered samples](fragops.html#fragops),
implementations **may** include those samples in fragment shader invocations in
any manner as long as covered samples are all shaded at least once, and each
invocation that is not a [helper invocation](shaders.html#shaders-helper-invocations)
covers at least one sample.

When the [`fragmentShaderBarycentric`](features.html#features-fragmentShaderBarycentric) feature is enabled, the `PerVertexKHR`
[interpolation decoration](shaders.html#shaders-interpolation-decorations) **can** be used
with fragment shader inputs to indicate that the decorated inputs do not
have associated data in the fragment.
Such inputs **can** only be accessed in a fragment shader using an array index
whose value (0, 1, or 2) identifies one of the vertices of the primitive
that produced the fragment.
Reads of per-vertex values for missing vertices, such as the third vertex of
a line primitive, will return values from the valid vertex with the highest
index.
This means that the per-vertex values of indices 1 and 2 for point
primitives will be equal to those of index 0, and the per-vertex values of
index 2 for line primitives will be equal to those of index 1.

When [tessellation](tessellation.html#tessellation), [geometry shading](geometry.html#geometry), and
[mesh shading](VK_NV_mesh_shader/mesh.html#mesh)
are not active, fragment shader inputs decorated with `PerVertexKHR` will
take values from one of the vertices of the primitive that produced the
fragment, identified by the extra index provided in SPIR-V code accessing
the input.
If the *n* vertices passed to a draw call are numbered 0 through *n*-1, and
the point, line, and triangle primitives produced by the draw call are
numbered with consecutive integers beginning with zero, the following table
indicates the original vertex numbers used
when the [provoking vertex mode](vertexpostproc.html#vertexpostproc-flatshading) is
[VK_PROVOKING_VERTEX_MODE_FIRST_VERTEX_EXT](vertexpostproc.html#VkProvokingVertexModeEXT)
for index values of 0, 1, and 2.
If an input decorated with `PerVertexKHR` is accessed with any other
vertex index value, or is accessed while rasterizing a polygon when the
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`polygonMode` property of
the currently active pipeline is not [VK_POLYGON_MODE_FILL](#VkPolygonMode), an
**undefined** value is returned.

| Primitive Topology | Vertex 0 | Vertex 1 | Vertex 2 |
| --- | --- | --- | --- |
| [VK_PRIMITIVE_TOPOLOGY_POINT_LIST](drawing.html#VkPrimitiveTopology) | i | i | i |
| [VK_PRIMITIVE_TOPOLOGY_LINE_LIST](drawing.html#VkPrimitiveTopology) | 2i | 2i+1 | 2i+1 |
| [VK_PRIMITIVE_TOPOLOGY_LINE_STRIP](drawing.html#VkPrimitiveTopology) | i | i+1 | i+1 |
| [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST](drawing.html#VkPrimitiveTopology) | 3i | 3i+1 | 3i+2 |
| [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP](drawing.html#VkPrimitiveTopology) (even) | i | i+1 | i+2 |
| [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP](drawing.html#VkPrimitiveTopology) (odd) | i | i+2 | i+1 |
| [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_FAN](drawing.html#VkPrimitiveTopology) | i+1 | i+2 | 0 |
| [VK_PRIMITIVE_TOPOLOGY_LINE_LIST_WITH_ADJACENCY](drawing.html#VkPrimitiveTopology) | 4i+1 | 4i+2 | 4i+2 |
| [VK_PRIMITIVE_TOPOLOGY_LINE_STRIP_WITH_ADJACENCY](drawing.html#VkPrimitiveTopology) | i+1 | i+2 | i+2 |
| [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_WITH_ADJACENCY](drawing.html#VkPrimitiveTopology) | 6i | 6i+2 | 6i+4 |
| [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_WITH_ADJACENCY](drawing.html#VkPrimitiveTopology) (even) | 2i | 2i+2 | 2i+4 |
| [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_WITH_ADJACENCY](drawing.html#VkPrimitiveTopology) (odd) | 2i | 2i+4 | 2i+2 |

When the provoking vertex mode is
[VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT](vertexpostproc.html#VkProvokingVertexModeEXT), the original vertex numbers
used are the same as above except as indicated in the table below.

| Primitive Topology | Vertex 0 | Vertex 1 | Vertex 2 |
| --- | --- | --- | --- |
| [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP](drawing.html#VkPrimitiveTopology) (odd, and
`triStripVertexOrderIndependentOfProvokingVertex` of
[VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR](limits.html#VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR) is [VK_FALSE](fundamentals.html#VK_FALSE)) | i+1 | i | i+2 |
| [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_FAN](drawing.html#VkPrimitiveTopology) | 0 | i+1 | i+2 |
| [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_WITH_ADJACENCY](drawing.html#VkPrimitiveTopology) (odd) | 2i+2 | 2i | 2i+4 |

When geometry
or mesh
shading is active, primitives processed by fragment shaders are assembled
from the vertices emitted by the geometry
or mesh
shader.
In this case, the vertices used for fragment shader inputs decorated with
`PerVertexKHR` are derived by treating the primitives produced by the
shader as though they were specified by a draw call and consulting
[the table above](#primsrast-barycentric-order-table).

When using tessellation without geometry shading, the tessellator produces
primitives in an implementation-dependent manner.
While there is no defined vertex ordering for inputs decorated with
`PerVertexKHR`, the vertex ordering used in this case will be consistent
with the ordering used to derive the values of inputs decorated with
`BaryCoordKHR` or `BaryCoordNoPerspKHR`.

Fragment shader inputs decorated with `BaryCoordKHR` or
`BaryCoordNoPerspKHR` hold three-component vectors with barycentric
weights that indicate the location of the fragment relative to the
screen-space locations of vertices of its primitive.
For point primitives, such variables are always assigned the value
(1,0,0).
For [line](#primsrast-lines-basic) primitives, the built-ins are obtained
by interpolating an attribute whose values for the vertices numbered 0 and 1
are (1,0,0) and (0,1,0), respectively.
For [polygon](#primsrast-polygons-basic) primitives, the built-ins are
obtained by interpolating an attribute whose values for the vertices
numbered 0, 1, and 2 are (1,0,0), (0,1,0), and (0,0,1),
respectively.
For `BaryCoordKHR`, the values are obtained using perspective
interpolation.
For `BaryCoordNoPerspKHR`, the values are obtained using linear
interpolation.
The values of `BaryCoordKHR` and `BaryCoordNoPerspKHR` are **undefined**
while rasterizing a polygon when the
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`polygonMode` property of
the currently active pipeline is not [VK_POLYGON_MODE_FILL](#VkPolygonMode).

A point is drawn by generating a set of fragments in the shape of a square
centered around the vertex of the point.
Each vertex has an associated point size controlling the width/height of
that square.
The point size is taken from the (potentially clipped) shader built-in
`PointSize` written by:

* 
the geometry shader, if active;

* 
the tessellation evaluation shader, if active and no geometry shader is
active;

* 
the vertex shader, otherwise

and clamped to the implementation-dependent point size range
[`pointSizeRange`[0],`pointSizeRange`[1]].
The value written to `PointSize` **must** be greater than zero.
If the [`maintenance5`](features.html#features-maintenance5) feature is enabled, and
a value is not written to `PointSize`, the point size takes a default
value of 1.0.

Not all point sizes need be supported, but the size 1.0 **must** be supported.
The range of supported sizes and the size of evenly-spaced gradations within
that range are implementation-dependent.
The range and gradations are obtained from the `pointSizeRange` and
`pointSizeGranularity` members of [VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits).
If, for instance, the size range is from 0.1 to 2.0 and the gradation size
is 0.1, then the sizes 0.1, 0.2, …​, 1.9, 2.0 are supported.
Additional point sizes **may** also be supported.
There is no requirement that these sizes be equally spaced.
If an unsupported size is requested, the nearest supported size is used
instead.

Further, if the render pass has a fragment density map attachment, point
size **may** be rounded by the implementation to a multiple of the fragment’s
width or height.

Point rasterization produces a fragment for each fragment area group of
framebuffer pixels with one or more sample points that intersect a region
centered at the point’s (xf,yf).
This region is a square with side equal to the current point size.
Coverage bits that correspond to sample points that intersect the region are
1, other coverage bits are 0.
All fragments produced in rasterizing a point are assigned the same
associated data, which are those of the vertex corresponding to the point.
However, the fragment shader built-in `PointCoord` contains point sprite
texture coordinates.
The s and t point sprite texture coordinates vary from zero to
one across the point horizontally left-to-right and vertically
top-to-bottom, respectively.
The following formulas are used to evaluate s and t:

  

  

  

  

where size is the point’s size; (xp,yp) is the location at which
the point sprite coordinates are evaluated - this **may** be the framebuffer
coordinates of the fragment center, or the location of a sample; and
(xf,yf) is the exact, unrounded framebuffer coordinate of the
vertex for the point.

Line segment rasterization options are controlled by the
[VkPipelineRasterizationLineStateCreateInfo](#VkPipelineRasterizationLineStateCreateInfo) structure.

The `VkPipelineRasterizationLineStateCreateInfo` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPipelineRasterizationLineStateCreateInfo {
    VkStructureType            sType;
    const void*                pNext;
    VkLineRasterizationMode    lineRasterizationMode;
    VkBool32                   stippledLineEnable;
    uint32_t                   lineStippleFactor;
    uint16_t                   lineStipplePattern;
} VkPipelineRasterizationLineStateCreateInfo;

// Provided by VK_KHR_line_rasterization
// Equivalent to VkPipelineRasterizationLineStateCreateInfo
typedef VkPipelineRasterizationLineStateCreateInfo VkPipelineRasterizationLineStateCreateInfoKHR;

// Provided by VK_EXT_line_rasterization
// Equivalent to VkPipelineRasterizationLineStateCreateInfo
typedef VkPipelineRasterizationLineStateCreateInfo VkPipelineRasterizationLineStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`lineRasterizationMode` is a [VkLineRasterizationMode](#VkLineRasterizationMode) value
selecting the style of line rasterization.

* 
`stippledLineEnable` enables [stippled    line rasterization](#primsrast-lines-stipple).

* 
`lineStippleFactor` is the repeat factor used in stippled line
rasterization.

* 
`lineStipplePattern` is the bit pattern used in stippled line
rasterization.

If `stippledLineEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the values of
`lineStippleFactor` and `lineStipplePattern` are ignored.

Valid Usage

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-02768) VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-02768

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](#VkLineRasterizationModeEXT), then the
[`rectangularLines`](features.html#features-rectangularLines) feature **must** be
enabled

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-02769) VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-02769

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](#VkLineRasterizationModeEXT), then the
[`bresenhamLines`](features.html#features-bresenhamLines) feature **must** be
enabled

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-02770) VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-02770

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](#VkLineRasterizationModeEXT), then the
[`smoothLines`](features.html#features-smoothLines) feature **must** be enabled

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02771) VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02771

If `stippledLineEnable` is [VK_TRUE](fundamentals.html#VK_TRUE) and
`lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](#VkLineRasterizationModeEXT), then the
[`stippledRectangularLines`](features.html#features-stippledRectangularLines)
feature **must** be enabled

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02772) VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02772

If `stippledLineEnable` is [VK_TRUE](fundamentals.html#VK_TRUE) and
`lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](#VkLineRasterizationModeEXT), then the
[`stippledBresenhamLines`](features.html#features-stippledBresenhamLines)
feature **must** be enabled

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02773) VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02773

If `stippledLineEnable` is [VK_TRUE](fundamentals.html#VK_TRUE) and
`lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](#VkLineRasterizationModeEXT), then the
[`stippledSmoothLines`](features.html#features-stippledSmoothLines) feature
**must** be enabled

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02774) VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02774

If `stippledLineEnable` is [VK_TRUE](fundamentals.html#VK_TRUE) and
`lineRasterizationMode` is [VK_LINE_RASTERIZATION_MODE_DEFAULT](#VkLineRasterizationModeEXT),
then the [    `stippledRectangularLines`](features.html#features-stippledRectangularLines) feature **must** be enabled and
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`strictLines` **must** be [VK_TRUE](fundamentals.html#VK_TRUE)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-sType-sType) VUID-VkPipelineRasterizationLineStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_LINE_STATE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-parameter) VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-parameter

 `lineRasterizationMode` **must** be a valid [VkLineRasterizationMode](#VkLineRasterizationMode) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)

Possible values of
[VkPipelineRasterizationLineStateCreateInfo](#VkPipelineRasterizationLineStateCreateInfo)::`lineRasterizationMode`,
specifying the line rasterization mode, are:

// Provided by VK_VERSION_1_4
typedef enum VkLineRasterizationMode {
    VK_LINE_RASTERIZATION_MODE_DEFAULT = 0,
    VK_LINE_RASTERIZATION_MODE_RECTANGULAR = 1,
    VK_LINE_RASTERIZATION_MODE_BRESENHAM = 2,
    VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH = 3,
  // Provided by VK_EXT_line_rasterization
    VK_LINE_RASTERIZATION_MODE_DEFAULT_EXT = VK_LINE_RASTERIZATION_MODE_DEFAULT,
  // Provided by VK_EXT_line_rasterization
    VK_LINE_RASTERIZATION_MODE_RECTANGULAR_EXT = VK_LINE_RASTERIZATION_MODE_RECTANGULAR,
  // Provided by VK_EXT_line_rasterization
    VK_LINE_RASTERIZATION_MODE_BRESENHAM_EXT = VK_LINE_RASTERIZATION_MODE_BRESENHAM,
  // Provided by VK_EXT_line_rasterization
    VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH_EXT = VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH,
  // Provided by VK_KHR_line_rasterization
    VK_LINE_RASTERIZATION_MODE_DEFAULT_KHR = VK_LINE_RASTERIZATION_MODE_DEFAULT,
  // Provided by VK_KHR_line_rasterization
    VK_LINE_RASTERIZATION_MODE_RECTANGULAR_KHR = VK_LINE_RASTERIZATION_MODE_RECTANGULAR,
  // Provided by VK_KHR_line_rasterization
    VK_LINE_RASTERIZATION_MODE_BRESENHAM_KHR = VK_LINE_RASTERIZATION_MODE_BRESENHAM,
  // Provided by VK_KHR_line_rasterization
    VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH_KHR = VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH,
} VkLineRasterizationMode;

// Provided by VK_KHR_line_rasterization
// Equivalent to VkLineRasterizationMode
typedef VkLineRasterizationMode VkLineRasterizationModeKHR;

// Provided by VK_EXT_line_rasterization
// Equivalent to VkLineRasterizationMode
typedef VkLineRasterizationMode VkLineRasterizationModeEXT;

* 
[VK_LINE_RASTERIZATION_MODE_DEFAULT](#VkLineRasterizationModeEXT) is equivalent to
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](#VkLineRasterizationModeEXT) if
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`strictLines` is [VK_TRUE](fundamentals.html#VK_TRUE),
otherwise lines are drawn as non-`strictLines` parallelograms.
Both of these modes are defined in [Basic Line    Segment Rasterization](#primsrast-lines-basic).

* 
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](#VkLineRasterizationModeEXT) specifies lines drawn as if
they were rectangles extruded from the line

* 
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](#VkLineRasterizationModeEXT) specifies lines drawn by
determining which pixel diamonds the line intersects and exits, as
defined in [Bresenham Line Segment    Rasterization](#primsrast-lines-bresenham).

* 
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](#VkLineRasterizationModeEXT) specifies lines
drawn if they were rectangles extruded from the line, with alpha
falloff, as defined in [Smooth Lines](#primsrast-lines-smooth).

To [dynamically set](pipelines.html#pipelines-dynamic-state) the
`lineRasterizationMode` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_line_rasterization, VK_EXT_line_rasterization with VK_EXT_shader_object
void vkCmdSetLineRasterizationModeEXT(
    VkCommandBuffer                             commandBuffer,
    VkLineRasterizationModeEXT                  lineRasterizationMode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`lineRasterizationMode` specifies the `lineRasterizationMode`
state.

This command sets the `lineRasterizationMode` state for subsequent
drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationLineStateCreateInfo](#VkPipelineRasterizationLineStateCreateInfo)::`lineRasterizationMode`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetLineRasterizationModeEXT-None-09423) VUID-vkCmdSetLineRasterizationModeEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3LineRasterizationMode`](#features-extendedDynamicState3LineRasterizationMode) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-07418) VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-07418

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](#VkLineRasterizationModeEXT), then the
[`rectangularLines`](features.html#features-rectangularLines) feature **must** be
enabled

[](#VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-07419) VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-07419

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](#VkLineRasterizationModeEXT), then the
[`bresenhamLines`](features.html#features-bresenhamLines) feature **must** be
enabled

[](#VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-07420) VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-07420

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](#VkLineRasterizationModeEXT), then the
[`smoothLines`](features.html#features-smoothLines) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetLineRasterizationModeEXT-commandBuffer-parameter) VUID-vkCmdSetLineRasterizationModeEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-parameter) VUID-vkCmdSetLineRasterizationModeEXT-lineRasterizationMode-parameter

 `lineRasterizationMode` **must** be a valid [VkLineRasterizationModeEXT](#VkLineRasterizationModeEXT) value

* 
[](#VUID-vkCmdSetLineRasterizationModeEXT-commandBuffer-recording) VUID-vkCmdSetLineRasterizationModeEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetLineRasterizationModeEXT-commandBuffer-cmdpool) VUID-vkCmdSetLineRasterizationModeEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetLineRasterizationModeEXT-videocoding) VUID-vkCmdSetLineRasterizationModeEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetLineRasterizationModeEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To [dynamically set](pipelines.html#pipelines-dynamic-state) the `stippledLineEnable`
state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_line_rasterization, VK_EXT_line_rasterization with VK_EXT_shader_object
void vkCmdSetLineStippleEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    stippledLineEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`stippledLineEnable` specifies the `stippledLineEnable` state.

This command sets the `stippledLineEnable` state for subsequent drawing
commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationLineStateCreateInfo](#VkPipelineRasterizationLineStateCreateInfo)::`stippledLineEnable`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetLineStippleEnableEXT-None-09423) VUID-vkCmdSetLineStippleEnableEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3LineStippleEnable`](#features-extendedDynamicState3LineStippleEnable) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetLineStippleEnableEXT-commandBuffer-parameter) VUID-vkCmdSetLineStippleEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetLineStippleEnableEXT-commandBuffer-recording) VUID-vkCmdSetLineStippleEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetLineStippleEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetLineStippleEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetLineStippleEnableEXT-videocoding) VUID-vkCmdSetLineStippleEnableEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetLineStippleEnableEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To [dynamically set](pipelines.html#pipelines-dynamic-state) the line width, call:

// Provided by VK_VERSION_1_0
void vkCmdSetLineWidth(
    VkCommandBuffer                             commandBuffer,
    float                                       lineWidth);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`lineWidth` is the width of rasterized line segments.

This command sets the line width for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with [VK_DYNAMIC_STATE_LINE_WIDTH](pipelines.html#VkDynamicState)
set in [VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`lineWidth` value used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetLineWidth-lineWidth-00788) VUID-vkCmdSetLineWidth-lineWidth-00788

If the [`wideLines`](features.html#features-wideLines) feature is not enabled,
`lineWidth` **must** be `1.0`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetLineWidth-commandBuffer-parameter) VUID-vkCmdSetLineWidth-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetLineWidth-commandBuffer-recording) VUID-vkCmdSetLineWidth-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetLineWidth-commandBuffer-cmdpool) VUID-vkCmdSetLineWidth-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetLineWidth-videocoding) VUID-vkCmdSetLineWidth-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetLineWidth is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Not all line widths need be supported for line segment rasterization, but
width 1.0 antialiased segments **must** be provided.
The range and gradations are obtained from the `lineWidthRange` and
`lineWidthGranularity` members of [VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits).
If, for instance, the size range is from 0.1 to 2.0 and the gradation size
is 0.1, then the sizes 0.1, 0.2, …​, 1.9, 2.0 are supported.
Additional line widths **may** also be supported.
There is no requirement that these widths be equally spaced.
If an unsupported width is requested, the nearest supported width is used
instead.

Further, if the render pass has a fragment density map attachment, line
width **may** be rounded by the implementation to a multiple of the fragment’s
width or height.

If the `lineRasterizationMode` member of
[VkPipelineRasterizationLineStateCreateInfo](#VkPipelineRasterizationLineStateCreateInfo) is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](#VkLineRasterizationModeEXT), rasterized
line segments produce fragments which intersect a rectangle centered on the
line segment.
Two of the edges are parallel to the specified line segment; each is at a
distance of one-half the current width from that segment in directions
perpendicular to the direction of the line.
The other two edges pass through the line endpoints and are perpendicular to
the direction of the specified line segment.
Coverage bits that correspond to sample points that intersect the rectangle
are 1, other coverage bits are 0.

Next we specify how the data associated with each rasterized fragment are
obtained.
Let **p**r = (xd, yd) be the framebuffer coordinates at which
associated data are evaluated.
This **may** be the center of a fragment or the location of a sample within the
fragment.
When `rasterizationSamples` is [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits), the fragment
center **must** be used.
Let **p**a = (xa, ya) and **p**b = (xb,yb) be
initial and final endpoints of the line segment, respectively.
Set

  

  

(Note that t = 0 at **p**a and t = 1 at **p**b.
Also note that this calculation projects the vector from **p**a to
**p**r onto the line, and thus computes the normalized distance of
the fragment along the line.)

If [`strictLines`](limits.html#limits-strictLines) is [VK_TRUE](fundamentals.html#VK_TRUE), line segments
are rasterized using perspective or linear interpolation.

*Perspective interpolation* for a line segment interpolates two values in a
manner that is correct when taking the perspective of the viewport into
consideration, by way of the line segment’s clip coordinates.
An interpolated value f can be determined by

  

  

where fa and fb are the data associated with the starting
and ending endpoints of the segment, respectively; wa and wb
are the clip w coordinates of the starting and ending endpoints of the
segment, respectively.

*Linear interpolation* for a line segment directly interpolates two values,
and an interpolated value f can be determined by

f = (1 - t) fa +  t fb

where fa and fb are the data associated with the starting
and ending endpoints of the segment, respectively.

The clip coordinate w for a sample is determined using perspective
interpolation.
The depth value z for a sample is determined using linear
interpolation.
Interpolation of fragment shader input values are determined by
[Interpolation decorations](shaders.html#shaders-interpolation-decorations).

The above description documents the preferred method of line rasterization,
and **must** be used when
`lineRasterizationMode` is [VK_LINE_RASTERIZATION_MODE_RECTANGULAR](#VkLineRasterizationModeEXT).

By default, when
`strictLines` is [VK_FALSE](fundamentals.html#VK_FALSE),
or the [`relaxedLineRasterization`](features.html#features-relaxedLineRasterization)
feature is enabled,
and when the `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_DEFAULT](#VkLineRasterizationModeEXT),
the edges of the lines are generated as a parallelogram surrounding the
original line.
The major axis is chosen by noting the axis in which there is the greatest
distance between the line start and end points.
If the difference is equal in both directions then the X axis is chosen as
the major axis.
Edges 2 and 3 are aligned to the minor axis and are centered on the
endpoints of the line as in [Figure 20. Non strict lines](#fig-non-strict-lines), and each is
`lineWidth` long.
Edges 0 and 1 are parallel to the line and connect the endpoints of edges 2
and 3.
Coverage bits that correspond to sample points that intersect the
parallelogram are 1, other coverage bits are 0.

Samples that fall exactly on the edge of the parallelogram follow the
polygon rasterization rules.

Interpolation occurs as if the parallelogram was decomposed into two
triangles where each pair of vertices at each end of the line has identical
attributes.

![non strict lines](../_images/non_strict_lines.svg)

Figure 2. Non strict lines

When
`strictLines` is [VK_FALSE](fundamentals.html#VK_FALSE)
or when the [`relaxedLineRasterization`](features.html#features-relaxedLineRasterization) feature is enabled,
and `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_DEFAULT_EXT](#VkLineRasterizationModeEXT)
implementations **may** deviate from the non-strict line algorithm described
above in the following ways:

* 
Implementations **may** instead interpolate each fragment according to the
formula in [Basic Line Segment Rasterization](#primsrast-lines-basic)
using the original line segment endpoints.

* 
Rasterization of non-antialiased non-strict line segments **may** be
performed using the rules defined in
[Bresenham Line Segment Rasterization](#primsrast-lines-bresenham).

If
`VkPhysicalDeviceMaintenance5Properties`::`nonStrictSinglePixelWideLinesUseParallelogram`
is [VK_TRUE](fundamentals.html#VK_TRUE),
the `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_DEFAULT_EXT](#VkLineRasterizationModeEXT),
and `strictLines` is [VK_FALSE](fundamentals.html#VK_FALSE), non-strict lines of width 1.0 are
rasterized as parallelograms, otherwise they are rasterized using
Bresenham’s algorithm.

If
`VkPhysicalDeviceMaintenance5Properties`::`nonStrictWideLinesUseParallelogram`
is [VK_TRUE](fundamentals.html#VK_TRUE),
the `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_DEFAULT_EXT](#VkLineRasterizationModeEXT),
and `strictLines` is [VK_FALSE](fundamentals.html#VK_FALSE), non-strict lines of width greater
than 1.0 are rasterized as parallelograms, otherwise they are rasterized
using Bresenham’s algorithm.

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](#VkLineRasterizationModeEXT), then the following rules replace
the line rasterization rules defined in [Basic Line Segment Rasterization](#primsrast-lines-basic).

Non-strict lines **may** also follow these rasterization rules for
non-antialiased lines.

If the [`relaxedLineRasterization`](features.html#features-relaxedLineRasterization)
feature is enabled,
and `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_DEFAULT_EXT](#VkLineRasterizationModeEXT)
implementations **must** follow these rasterization rules for non-antialised
lines of width 1.0.

Line segment rasterization begins by characterizing the segment as either
*x-major* or *y-major*.
x-major line segments have slope in the closed interval [-1,1]; all
other line segments are y-major (slope is determined by the segment’s
endpoints).
We specify rasterization only for x-major segments except in cases where the
modifications for y-major segments are not self-evident.

Ideally, Vulkan uses a *diamond-exit* rule to determine those fragments that
are produced by rasterizing a line segment.
For each fragment f with center at framebuffer coordinates xf
and yf, define a diamond-shaped region that is the intersection of
four half planes:

  

  

Essentially, a line segment starting at pa and ending at pb
produces those fragments f for which the segment intersects
Rf, except if pb is contained in Rf.

![bresenham](../_images/bresenham.svg)

Figure 3. Visualization of Bresenham’s algorithm

To avoid difficulties when an endpoint lies on a boundary of Rf we
(in principle) perturb the supplied endpoints by a tiny amount.
Let pa and pb have framebuffer coordinates (xa,
ya) and (xb, yb), respectively.
Obtain the perturbed endpoints pa' given by (xa, ya) -
(ε, ε2) and pb' given by (xb, yb) -
(ε, ε2).
Rasterizing the line segment starting at pa and ending at pb
produces those fragments f for which the segment starting at
pa' and ending on pb' intersects Rf, except if
pb' is contained in Rf.
ε is chosen to be so small that rasterizing the line segment
produces the same fragments when δ is substituted for
ε for any 0 .

When pa and pb lie on fragment centers, this
characterization of fragments reduces to Bresenham’s algorithm with one
modification: lines produced in this description are “half-open”, meaning
that the final fragment (corresponding to pb) is not drawn.
This means that when rasterizing a series of connected line segments, shared
endpoints will be produced only once rather than twice (as would occur with
Bresenham’s algorithm).

Implementations **may** use other line segment rasterization algorithms,
subject to the following rules:

* 
The coordinates of a fragment produced by the algorithm **must** not
deviate by more than one unit in either x or y framebuffer coordinates
from a corresponding fragment produced by the diamond-exit rule.

* 
The total number of fragments produced by the algorithm **must** not differ
from that produced by the diamond-exit rule by more than one.

* 
For an x-major line, two fragments that lie in the same
framebuffer-coordinate column **must** not be produced (for a y-major line,
two fragments that lie in the same framebuffer-coordinate row **must** not
be produced).

* 
If two line segments share a common endpoint, and both segments are
either x-major (both left-to-right or both right-to-left) or y-major
(both bottom-to-top or both top-to-bottom), then rasterizing both
segments **must** not produce duplicate fragments.
Fragments also **must** not be omitted so as to interrupt continuity of the
connected segments.

The actual width w of Bresenham lines is determined by rounding the
line width to the nearest integer, clamping it to the
implementation-dependent `lineWidthRange` (with both values rounded to
the nearest integer), then clamping it to be no less than 1.

Bresenham line segments of width other than one are rasterized by offsetting
them in the minor direction (for an x-major line, the minor direction is y,
and for a y-major line, the minor direction is x) and producing a row or
column of fragments in the minor direction.
If the line segment has endpoints given by (x0, y0) and
(x1, y1) in framebuffer coordinates, the segment with endpoints
   and \((x_1, y_1 -
\frac{w-1}{2})\) is rasterized, but instead of a single fragment, a column of
fragments of height w (a row of fragments of length w for a y-major segment)
is produced at each x (y for y-major) location.
The lowest fragment of this column is the fragment that would be produced by
rasterizing the segment of width 1 with the modified coordinates.

The preferred method of attribute interpolation for a wide line is to
generate the same attribute values for all fragments in the row or column
described above, as if the adjusted line was used for interpolation and
those values replicated to the other fragments, except for `FragCoord`
which is interpolated as usual.
Implementations **may** instead interpolate each fragment according to the
formula in [Basic Line Segment Rasterization](#primsrast-lines-basic), using
the original line segment endpoints.

When Bresenham lines are being rasterized, sample locations **may** all be
treated as being at the pixel center (this **may** affect attribute and depth
interpolation).

|  | The sample locations described above are **not** used for determining
| --- | --- |
coverage, they are only used for things like attribute interpolation.
The rasterization rules that determine coverage are defined in terms of
whether the line intersects **pixels**, as opposed to the point sampling rules
used for other primitive types.
So these rules are independent of the sample locations.
One consequence of this is that Bresenham lines cover the same pixels
regardless of the number of rasterization samples, and cover all samples in
those pixels (unless masked out or killed). |

If the `stippledLineEnable` member of
[VkPipelineRasterizationLineStateCreateInfo](#VkPipelineRasterizationLineStateCreateInfo) is [VK_TRUE](fundamentals.html#VK_TRUE), then
lines are rasterized with a *line stipple* determined by
`lineStippleFactor` and `lineStipplePattern`.
`lineStipplePattern` is an unsigned 16-bit integer that determines which
fragments are to be drawn or discarded when the line is rasterized.
`lineStippleFactor` is a count that is used to modify the effective line
stipple by causing each bit in `lineStipplePattern` to be used
`lineStippleFactor` times.

Line stippling discards certain fragments that are produced by
rasterization.
The masking is achieved using three parameters: the 16-bit line stipple
pattern *p*, the line stipple factor *r*, and an integer stipple counter
*s*.
Let

  

  

Then a fragment is produced if the *b*'th bit of *p* is 1, and discarded
otherwise.
The bits of *p* are numbered with 0 being the least significant and 15 being
the most significant.

The initial value of *s* is zero.
For [VK_LINE_RASTERIZATION_MODE_BRESENHAM](#VkLineRasterizationModeEXT) lines, *s* is incremented
after production of each fragment of a line segment (fragments are produced
in order, beginning at the starting point and working towards the ending
point).
For [VK_LINE_RASTERIZATION_MODE_RECTANGULAR](#VkLineRasterizationModeEXT) and
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](#VkLineRasterizationModeEXT) lines, the rectangular
region is subdivided into adjacent unit-length rectangles, and s is
incremented once for each rectangle.
Rectangles with a value of *s* such that the *b*'th bit of *p* is zero are
discarded.
If the last rectangle in a line segment is shorter than unit-length, then
the remainder **may** carry over to the next line segment in the line strip
using the same value of *s* (this is the preferred behavior, for the stipple
pattern to appear more consistent through the strip).

*s* is reset to 0 at the start of each strip (for line strips), and before
every line segment in a group of independent segments.

If the line segment has been clipped, then the value of *s* at the beginning
of the line segment is implementation-dependent.

To [dynamically set](pipelines.html#pipelines-dynamic-state) the line stipple state,
call:

// Provided by VK_VERSION_1_4
void vkCmdSetLineStipple(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    lineStippleFactor,
    uint16_t                                    lineStipplePattern);

// Provided by VK_KHR_line_rasterization
// Equivalent to vkCmdSetLineStipple
void vkCmdSetLineStippleKHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    lineStippleFactor,
    uint16_t                                    lineStipplePattern);

// Provided by VK_EXT_line_rasterization
// Equivalent to vkCmdSetLineStipple
void vkCmdSetLineStippleEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    lineStippleFactor,
    uint16_t                                    lineStipplePattern);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`lineStippleFactor` is the repeat factor used in stippled line
rasterization.

* 
`lineStipplePattern` is the bit pattern used in stippled line
rasterization.

This command sets the line stipple state for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_LINE_STIPPLE](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationLineStateCreateInfo](#VkPipelineRasterizationLineStateCreateInfo)::`lineStippleFactor`
and
[VkPipelineRasterizationLineStateCreateInfo](#VkPipelineRasterizationLineStateCreateInfo)::`lineStipplePattern`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetLineStipple-lineStippleFactor-02776) VUID-vkCmdSetLineStipple-lineStippleFactor-02776

`lineStippleFactor` **must** be in the range [1,256]

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetLineStipple-commandBuffer-parameter) VUID-vkCmdSetLineStipple-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetLineStipple-commandBuffer-recording) VUID-vkCmdSetLineStipple-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetLineStipple-commandBuffer-cmdpool) VUID-vkCmdSetLineStipple-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetLineStipple-videocoding) VUID-vkCmdSetLineStipple-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetLineStipple is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

If the `lineRasterizationMode` member of
[VkPipelineRasterizationLineStateCreateInfo](#VkPipelineRasterizationLineStateCreateInfo) is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](#VkLineRasterizationModeEXT), then lines are
considered to be rectangles using the same geometry as for
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](#VkLineRasterizationModeEXT) lines.
The rules for determining which pixels are covered are
implementation-dependent, and **may** include nearby pixels where no sample
locations are covered or where the rectangle does not intersect the pixel at
all.
For each pixel that is considered covered, the fragment computes a coverage
value that approximates the area of the intersection of the rectangle with
the pixel square, and this coverage value is multiplied into the color
location 0’s alpha value after fragment shading, as described in
[Multisample Coverage](fragops.html#fragops-covg).

|  | The details of the rasterization rules and area calculation are left
| --- | --- |
intentionally vague, to allow implementations to generate coverage and
values that are aesthetically pleasing. |

A polygon results from the decomposition of a triangle strip, triangle fan
or a series of independent triangles.
Like points and line segments, polygon rasterization is controlled by
several variables in the [VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)
structure.

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
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`frontFace` property of
the currently active pipeline.
Possible values are:

// Provided by VK_VERSION_1_0
typedef enum VkFrontFace {
    VK_FRONT_FACE_COUNTER_CLOCKWISE = 0,
    VK_FRONT_FACE_CLOCKWISE = 1,
} VkFrontFace;

* 
[VK_FRONT_FACE_COUNTER_CLOCKWISE](#VkFrontFace) specifies that a triangle with
positive area is considered front-facing.

* 
[VK_FRONT_FACE_CLOCKWISE](#VkFrontFace) specifies that a triangle with negative
area is considered front-facing.

Any triangle which is not front-facing is back-facing, including zero-area
triangles.

To [dynamically set](pipelines.html#pipelines-dynamic-state) the front face orientation,
call:

// Provided by VK_VERSION_1_3
void vkCmdSetFrontFace(
    VkCommandBuffer                             commandBuffer,
    VkFrontFace                                 frontFace);

// Provided by VK_EXT_extended_dynamic_state, VK_EXT_shader_object
// Equivalent to vkCmdSetFrontFace
void vkCmdSetFrontFaceEXT(
    VkCommandBuffer                             commandBuffer,
    VkFrontFace                                 frontFace);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`frontFace` is a [VkFrontFace](#VkFrontFace) value specifying the front-facing
triangle orientation to be used for culling.

This command sets the front face orientation for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with [VK_DYNAMIC_STATE_FRONT_FACE](pipelines.html#VkDynamicState)
set in [VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`frontFace` value used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetFrontFace-None-08971) VUID-vkCmdSetFrontFace-None-08971

At least one of the following **must** be true:

the [`extendedDynamicState`](features.html#features-extendedDynamicState)
feature is enabled

* 
the [`shaderObject`](features.html#features-shaderObject) feature is enabled

* 
the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
the [VkInstance](initialization.html#VkInstance) parent of `commandBuffer` is greater than or
equal to Version 1.3

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetFrontFace-commandBuffer-parameter) VUID-vkCmdSetFrontFace-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetFrontFace-frontFace-parameter) VUID-vkCmdSetFrontFace-frontFace-parameter

 `frontFace` **must** be a valid [VkFrontFace](#VkFrontFace) value

* 
[](#VUID-vkCmdSetFrontFace-commandBuffer-recording) VUID-vkCmdSetFrontFace-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetFrontFace-commandBuffer-cmdpool) VUID-vkCmdSetFrontFace-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetFrontFace-videocoding) VUID-vkCmdSetFrontFace-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetFrontFace is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Once the orientation of triangles is determined, they are culled according
to the [VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`cullMode` property
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
[VK_CULL_MODE_NONE](#VkCullModeFlagBits) specifies that no triangles are discarded

* 
[VK_CULL_MODE_FRONT_BIT](#VkCullModeFlagBits) specifies that front-facing triangles are
discarded

* 
[VK_CULL_MODE_BACK_BIT](#VkCullModeFlagBits) specifies that back-facing triangles are
discarded

* 
[VK_CULL_MODE_FRONT_AND_BACK](#VkCullModeFlagBits) specifies that all triangles are
discarded.

Following culling, fragments are produced for any triangles which have not
been discarded.

// Provided by VK_VERSION_1_0
typedef VkFlags VkCullModeFlags;

`VkCullModeFlags` is a bitmask type for setting a mask of zero or more
[VkCullModeFlagBits](#VkCullModeFlagBits).

To [dynamically set](pipelines.html#pipelines-dynamic-state) the cull mode, call:

// Provided by VK_VERSION_1_3
void vkCmdSetCullMode(
    VkCommandBuffer                             commandBuffer,
    VkCullModeFlags                             cullMode);

// Provided by VK_EXT_extended_dynamic_state, VK_EXT_shader_object
// Equivalent to vkCmdSetCullMode
void vkCmdSetCullModeEXT(
    VkCommandBuffer                             commandBuffer,
    VkCullModeFlags                             cullMode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`cullMode` specifies the cull mode property to use for drawing.

This command sets the cull mode for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with [VK_DYNAMIC_STATE_CULL_MODE](pipelines.html#VkDynamicState)
set in [VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`cullMode` value used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetCullMode-None-08971) VUID-vkCmdSetCullMode-None-08971

At least one of the following **must** be true:

the [`extendedDynamicState`](features.html#features-extendedDynamicState)
feature is enabled

* 
the [`shaderObject`](features.html#features-shaderObject) feature is enabled

* 
the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
the [VkInstance](initialization.html#VkInstance) parent of `commandBuffer` is greater than or
equal to Version 1.3

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetCullMode-commandBuffer-parameter) VUID-vkCmdSetCullMode-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetCullMode-cullMode-parameter) VUID-vkCmdSetCullMode-cullMode-parameter

 `cullMode` **must** be a valid combination of [VkCullModeFlagBits](#VkCullModeFlagBits) values

* 
[](#VUID-vkCmdSetCullMode-commandBuffer-recording) VUID-vkCmdSetCullMode-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetCullMode-commandBuffer-cmdpool) VUID-vkCmdSetCullMode-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetCullMode-videocoding) VUID-vkCmdSetCullMode-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetCullMode is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The rule for determining which fragments are produced by polygon
rasterization is called *point sampling*.
The two-dimensional projection obtained by taking the x and y framebuffer
coordinates of the polygon’s vertices is formed.
Fragments are produced for any fragment area groups of pixels for which any
sample points lie inside of this polygon.
Coverage bits that correspond to sample points that satisfy the point
sampling criteria are 1, other coverage bits are 0.
Special treatment is given to a sample whose sample location lies on a
polygon edge.
In such a case, if two polygons lie on either side of a common edge (with
identical endpoints) on which a sample point lies, then exactly one of the
polygons **must** result in a covered sample for that fragment during
rasterization.
As for the data associated with each fragment produced by rasterizing a
polygon, we begin by specifying how these values are produced for fragments
in a triangle.

*Barycentric coordinates* are a set of three numbers, a, b, and
c, each in the range [0,1], with a +  b +  c = 1.
These coordinates uniquely specify any point p within the triangle or
on the triangle’s boundary as

p = a pa +  b pb +  c pc

where pa, pb, and pc are the vertices of the
triangle.
a, b, and c are determined by:

  

  

where A(lmn) denotes the area in framebuffer coordinates of the
triangle with vertices l, m, and n.

Denote an associated datum at pa, pb, or pc as
fa, fb, or fc, respectively.

*Perspective interpolation* for a triangle interpolates three values in a
manner that is correct when taking the perspective of the viewport into
consideration, by way of the triangle’s clip coordinates.
An interpolated value f can be determined by

  

  

where wa, wb, and wc are the clip w
coordinates of pa, pb, and pc, respectively.
a, b, and c are the barycentric coordinates of the
location at which the data are produced.

*Linear interpolation* for a triangle directly interpolates three values,
and an interpolated value f can be determined by

f = a fa +  b fb +  c fc

where fa, fb, and fc are the data associated with
pa, pb, and pc, respectively.

The clip coordinate w for a sample is determined using perspective
interpolation.
The depth value z for a sample is determined using linear
interpolation.
Interpolation of fragment shader input values are determined by
[Interpolation decorations](shaders.html#shaders-interpolation-decorations).

For a polygon with more than three edges, such as are produced by clipping a
triangle, a convex combination of the values of the datum at the polygon’s
vertices **must** be used to obtain the value assigned to each fragment
produced by the rasterization algorithm.
That is, it **must** be the case that at every fragment

  

  

where n is the number of vertices in the polygon and fi is the
value of f at vertex i.
For each i, 0 ≤ ai ≤ 1 and
  .
The values of ai **may** differ from fragment to fragment, but at
vertex i, ai = 1 and aj = 0 for j ≠ i.

|  | One algorithm that achieves the required behavior is to triangulate a
| --- | --- |
polygon (without adding any vertices) and then treat each triangle
individually as already discussed.
A scan-line rasterizer that linearly interpolates data along each edge and
then linearly interpolates data across each horizontal span from edge to
edge also satisfies the restrictions (in this case the numerator and
denominator of [perspective interpolation](#triangle_perspective_interpolation) are iterated independently, and a division is performed for
each fragment). |

Possible values of the
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`polygonMode` property of
the currently active pipeline, specifying the method of rasterization for
polygons, are:

// Provided by VK_VERSION_1_0
typedef enum VkPolygonMode {
    VK_POLYGON_MODE_FILL = 0,
    VK_POLYGON_MODE_LINE = 1,
    VK_POLYGON_MODE_POINT = 2,
  // Provided by VK_NV_fill_rectangle
    VK_POLYGON_MODE_FILL_RECTANGLE_NV = 1000153000,
} VkPolygonMode;

* 
[VK_POLYGON_MODE_POINT](#VkPolygonMode) specifies that polygon vertices are drawn as
points.

* 
[VK_POLYGON_MODE_LINE](#VkPolygonMode) specifies that polygon edges are drawn as
line segments.

* 
[VK_POLYGON_MODE_FILL](#VkPolygonMode) specifies that polygons are rendered using
the polygon rasterization rules in this section.

* 
[VK_POLYGON_MODE_FILL_RECTANGLE_NV](#VkPolygonMode) specifies that polygons are
rendered using polygon rasterization rules, modified to consider a
sample within the primitive if the sample location is inside the
axis-aligned bounding box of the triangle after projection.
Note that the barycentric weights used in attribute interpolation **can**
extend outside the range [0,1] when these primitives are shaded.
Special treatment is given to a sample position on the boundary edge of
the bounding box.
In such a case, if two rectangles lie on either side of a common edge
(with identical endpoints) on which a sample position lies, then exactly
one of the triangles **must** produce a fragment that covers that sample
during rasterization.

Polygons rendered in [VK_POLYGON_MODE_FILL_RECTANGLE_NV](#VkPolygonMode) mode **may** be
clipped by the frustum or by user clip planes.
If clipping is applied, the triangle is culled rather than clipped.

Area calculation and facingness are determined for
[VK_POLYGON_MODE_FILL_RECTANGLE_NV](#VkPolygonMode) mode using the triangle’s vertices.

These modes affect only the final rasterization of polygons: in particular,
a polygon’s vertices are shaded and the polygon is clipped and possibly
culled before these modes are applied.

If `VkPhysicalDeviceMaintenance5Properties`::`polygonModePointSize`
is [VK_TRUE](fundamentals.html#VK_TRUE), the point size of the final rasterization of polygons is
taken from `PointSize` when [polygon mode](#primsrast-polygonmode) is
[VK_POLYGON_MODE_POINT](#VkPolygonMode).

Otherwise, if
`VkPhysicalDeviceMaintenance5Properties`::`polygonModePointSize` is
[VK_FALSE](fundamentals.html#VK_FALSE), the point size of the final rasterization of polygons is 1.0
when [polygon mode](#primsrast-polygonmode) is [VK_POLYGON_MODE_POINT](#VkPolygonMode).

To [dynamically set](pipelines.html#pipelines-dynamic-state) the polygon mode, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetPolygonModeEXT(
    VkCommandBuffer                             commandBuffer,
    VkPolygonMode                               polygonMode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`polygonMode` specifies polygon mode.

This command sets the polygon mode for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_POLYGON_MODE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`polygonMode` value used
to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetPolygonModeEXT-None-09423) VUID-vkCmdSetPolygonModeEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3PolygonMode`](#features-extendedDynamicState3PolygonMode) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetPolygonModeEXT-fillModeNonSolid-07424) VUID-vkCmdSetPolygonModeEXT-fillModeNonSolid-07424

    If the [`fillModeNonSolid`](features.html#features-fillModeNonSolid) feature is
    not enabled, `polygonMode` **must** be [VK_POLYGON_MODE_FILL](#VkPolygonMode)
or [VK_POLYGON_MODE_FILL_RECTANGLE_NV](#VkPolygonMode)

[](#VUID-vkCmdSetPolygonModeEXT-polygonMode-07425) VUID-vkCmdSetPolygonModeEXT-polygonMode-07425

If the `[VK_NV_fill_rectangle](../appendices/extensions.html#VK_NV_fill_rectangle)` extension is not enabled,
`polygonMode` **must** not be [VK_POLYGON_MODE_FILL_RECTANGLE_NV](#VkPolygonMode)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetPolygonModeEXT-commandBuffer-parameter) VUID-vkCmdSetPolygonModeEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetPolygonModeEXT-polygonMode-parameter) VUID-vkCmdSetPolygonModeEXT-polygonMode-parameter

 `polygonMode` **must** be a valid [VkPolygonMode](#VkPolygonMode) value

* 
[](#VUID-vkCmdSetPolygonModeEXT-commandBuffer-recording) VUID-vkCmdSetPolygonModeEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetPolygonModeEXT-commandBuffer-cmdpool) VUID-vkCmdSetPolygonModeEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetPolygonModeEXT-videocoding) VUID-vkCmdSetPolygonModeEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetPolygonModeEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The depth values of all fragments generated by the rasterization of a
polygon **can** be biased (offset) by a single depth bias value   
that is computed for that polygon.

The depth bias computation is enabled by the
`depthBiasEnable` set with [vkCmdSetDepthBiasEnable](#vkCmdSetDepthBiasEnable)
and `vkCmdSetDepthBiasEnableEXT`,
or the corresponding
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`depthBiasEnable` value
used to create the currently active pipeline.
If the depth bias enable is [VK_FALSE](fundamentals.html#VK_FALSE), no bias is applied and the
fragment’s depth values are unchanged.

To [dynamically enable](pipelines.html#pipelines-dynamic-state) whether to bias fragment
depth values, call:

// Provided by VK_VERSION_1_3
void vkCmdSetDepthBiasEnable(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    depthBiasEnable);

// Provided by VK_EXT_extended_dynamic_state2, VK_EXT_shader_object
// Equivalent to vkCmdSetDepthBiasEnable
void vkCmdSetDepthBiasEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    depthBiasEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`depthBiasEnable` controls whether to bias fragment depth values.

This command sets the depth bias enable for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`depthBiasEnable` value
used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetDepthBiasEnable-None-08970) VUID-vkCmdSetDepthBiasEnable-None-08970

At least one of the following **must** be true:

the [`extendedDynamicState2`](features.html#features-extendedDynamicState2)
feature is enabled

* 
the [`shaderObject`](features.html#features-shaderObject) feature is enabled

* 
the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
the [VkInstance](initialization.html#VkInstance) parent of `commandBuffer` is greater than or
equal to Version 1.3

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthBiasEnable-commandBuffer-parameter) VUID-vkCmdSetDepthBiasEnable-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetDepthBiasEnable-commandBuffer-recording) VUID-vkCmdSetDepthBiasEnable-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthBiasEnable-commandBuffer-cmdpool) VUID-vkCmdSetDepthBiasEnable-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetDepthBiasEnable-videocoding) VUID-vkCmdSetDepthBiasEnable-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDepthBiasEnable is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The depth bias depends on three parameters:

* 
`depthBiasSlopeFactor` scales the maximum depth slope m of the
polygon

* 
`depthBiasConstantFactor` scales the parameter r of the depth
attachment

* 
the scaled terms are summed to produce a value which is then clamped to
a minimum or maximum value specified by `depthBiasClamp`

`depthBiasSlopeFactor`, `depthBiasConstantFactor`, and
`depthBiasClamp` **can** each be positive, negative, or zero.
These parameters are set as described for [vkCmdSetDepthBias](#vkCmdSetDepthBias)
and [vkCmdSetDepthBias2EXT](#vkCmdSetDepthBias2EXT)
below.

The maximum depth slope m of a triangle is

  

  

where (xf, yf, zf) is a point on the triangle.
m **may** be approximated as

  

  

In a pipeline with a depth bias representation of
[VK_DEPTH_BIAS_REPRESENTATION_FLOAT_EXT](#VkDepthBiasRepresentationEXT), r, for the given
primitive is defined as

r = 1

Otherwise
r is the minimum resolvable difference that depends on the depth
attachment representation.
If `VkDepthBiasRepresentationInfoEXT`::`depthBiasExact` is
[VK_FALSE](fundamentals.html#VK_FALSE) it
is the smallest difference in a sample’s depth zf values that is
guaranteed to remain distinct throughout polygon rasterization and in the
depth attachment.
All pairs of fragments generated by the rasterization of two polygons with
otherwise identical vertices, but zf values that differ by r,
will have distinct depth values.

For fixed-point depth attachment representations,
or in a pipeline with a depth bias representation of
[VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORCE_UNORM_EXT](#VkDepthBiasRepresentationEXT),
r is constant throughout the range of the entire depth attachment.
If `VkDepthBiasRepresentationInfoEXT`::`depthBiasExact` is
[VK_TRUE](fundamentals.html#VK_TRUE), then its value **must** be

r = 2-n

Otherwise its value is implementation-dependent but **must** be at most

r = 2 × 2-n

where n is the number of bits used for the depth
aspect when using a fixed-point attachment, or the number of mantissa bits
plus one when using a floating-point attachment.

Otherwise for
floating-point depth attachment, there is no single minimum resolvable
difference.
In this case, the minimum resolvable difference for a given polygon is
dependent on the maximum exponent, e, in the range of z values
spanned by the primitive.
If n is the number of bits in the floating-point mantissa, the minimum
resolvable difference, r, for the given primitive is defined as

r = 2e-n

If a triangle is rasterized using the
[VK_POLYGON_MODE_FILL_RECTANGLE_NV](#VkPolygonMode) polygon mode, then this minimum
resolvable difference **may** not be resolvable for samples outside of the
triangle, where the depth is extrapolated.

If no depth attachment is present, r is **undefined**.

The bias value o for a polygon is

  

  

m is computed as described above.
If the depth attachment uses a fixed-point representation, m is a
function of depth values in the range [0,1], and o is applied to
depth values in the same range.

Depth bias is applied to triangle topology primitives received by the
rasterizer regardless of [polygon mode](#primsrast-polygonmode).
Depth bias **may** also be applied to line and point topology primitives
received by the rasterizer.

To [dynamically set](pipelines.html#pipelines-dynamic-state) the depth bias parameters,
call:

// Provided by VK_VERSION_1_0
void vkCmdSetDepthBias(
    VkCommandBuffer                             commandBuffer,
    float                                       depthBiasConstantFactor,
    float                                       depthBiasClamp,
    float                                       depthBiasSlopeFactor);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`depthBiasConstantFactor` is a scalar factor controlling the
constant depth value added to each fragment.

* 
`depthBiasClamp` is the maximum (or minimum) depth bias of a
fragment.

* 
`depthBiasSlopeFactor` is a scalar factor applied to a fragment’s
slope in depth bias calculations.

This command sets the depth bias parameters for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with [VK_DYNAMIC_STATE_DEPTH_BIAS](pipelines.html#VkDynamicState)
set in [VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the corresponding
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)::`depthBiasConstantFactor`,
`depthBiasClamp`, and `depthBiasSlopeFactor` values used to create
the currently active pipeline.

Calling this function is equivalent to calling `vkCmdSetDepthBias2EXT`
without a `VkDepthBiasRepresentationInfoEXT` in the pNext chain of
`VkDepthBiasInfoEXT`.

Valid Usage

* 
[](#VUID-vkCmdSetDepthBias-depthBiasClamp-00790) VUID-vkCmdSetDepthBias-depthBiasClamp-00790

If the [`depthBiasClamp`](features.html#features-depthBiasClamp) feature is not
enabled, `depthBiasClamp` **must** be `0.0`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthBias-commandBuffer-parameter) VUID-vkCmdSetDepthBias-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetDepthBias-commandBuffer-recording) VUID-vkCmdSetDepthBias-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthBias-commandBuffer-cmdpool) VUID-vkCmdSetDepthBias-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetDepthBias-videocoding) VUID-vkCmdSetDepthBias-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDepthBias is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkDepthBiasRepresentationInfoEXT` structure is defined as:

// Provided by VK_EXT_depth_bias_control
typedef struct VkDepthBiasRepresentationInfoEXT {
    VkStructureType                 sType;
    const void*                     pNext;
    VkDepthBiasRepresentationEXT    depthBiasRepresentation;
    VkBool32                        depthBiasExact;
} VkDepthBiasRepresentationInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`depthBiasRepresentation` is a [VkDepthBiasRepresentationEXT](#VkDepthBiasRepresentationEXT)
value specifying the depth bias representation.

* 
`depthBiasExact` specifies that the implementation is not allowed to
scale the depth bias value to ensure a minimum resolvable distance.

Valid Usage

* 
[](#VUID-VkDepthBiasRepresentationInfoEXT-leastRepresentableValueForceUnormRepresentation-08947) VUID-VkDepthBiasRepresentationInfoEXT-leastRepresentableValueForceUnormRepresentation-08947

If the [    `leastRepresentableValueForceUnormRepresentation`](features.html#features-leastRepresentableValueForceUnormRepresentation) feature is not
enabled, `depthBiasRepresentation` **must** not be
[VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORCE_UNORM_EXT](#VkDepthBiasRepresentationEXT)

* 
[](#VUID-VkDepthBiasRepresentationInfoEXT-floatRepresentation-08948) VUID-VkDepthBiasRepresentationInfoEXT-floatRepresentation-08948

If the [`floatRepresentation`](features.html#features-floatRepresentation)
feature is not enabled, `depthBiasRepresentation` **must** not be
[VK_DEPTH_BIAS_REPRESENTATION_FLOAT_EXT](#VkDepthBiasRepresentationEXT)

* 
[](#VUID-VkDepthBiasRepresentationInfoEXT-depthBiasExact-08949) VUID-VkDepthBiasRepresentationInfoEXT-depthBiasExact-08949

If the [`depthBiasExact`](features.html#features-depthBiasExact) feature is not
enabled, `depthBiasExact` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-VkDepthBiasRepresentationInfoEXT-sType-sType) VUID-VkDepthBiasRepresentationInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEPTH_BIAS_REPRESENTATION_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDepthBiasRepresentationInfoEXT-depthBiasRepresentation-parameter) VUID-VkDepthBiasRepresentationInfoEXT-depthBiasRepresentation-parameter

 `depthBiasRepresentation` **must** be a valid [VkDepthBiasRepresentationEXT](#VkDepthBiasRepresentationEXT) value

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDepthBiasInfoEXT](#VkDepthBiasInfoEXT)

* 
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)

Possible values of
[VkDepthBiasRepresentationInfoEXT](#VkDepthBiasRepresentationInfoEXT)::`depthBiasRepresentation`,
specifying the depth bias representation are:

// Provided by VK_EXT_depth_bias_control
typedef enum VkDepthBiasRepresentationEXT {
    VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORMAT_EXT = 0,
    VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORCE_UNORM_EXT = 1,
    VK_DEPTH_BIAS_REPRESENTATION_FLOAT_EXT = 2,
} VkDepthBiasRepresentationEXT;

* 
[VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORMAT_EXT](#VkDepthBiasRepresentationEXT)
specifies that the depth bias representation is a factor of the format’s
r as described in [Depth Bias Computation](#primsrast-depthbias-computation).

* 
[VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORCE_UNORM_EXT](#VkDepthBiasRepresentationEXT)
specifies that the depth bias representation is a factor of a constant
r defined by the bit-size or mantissa of the format as described
in [Depth Bias Computation](#primsrast-depthbias-computation).

* 
[VK_DEPTH_BIAS_REPRESENTATION_FLOAT_EXT](#VkDepthBiasRepresentationEXT) specifies that the depth
bias representation is a factor of constant r equal to 1.

The `VkDepthBiasInfoEXT` structure is defined as:

// Provided by VK_EXT_depth_bias_control
typedef struct VkDepthBiasInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    float              depthBiasConstantFactor;
    float              depthBiasClamp;
    float              depthBiasSlopeFactor;
} VkDepthBiasInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`depthBiasConstantFactor` is a scalar factor controlling the
constant depth value added to each fragment.

* 
`depthBiasClamp` is the maximum (or minimum) depth bias of a
fragment.

* 
`depthBiasSlopeFactor` is a scalar factor applied to a fragment’s
slope in depth bias calculations.

If `pNext` does not contain a [VkDepthBiasRepresentationInfoEXT](#VkDepthBiasRepresentationInfoEXT)
structure, then this command is equivalent to including a
[VkDepthBiasRepresentationInfoEXT](#VkDepthBiasRepresentationInfoEXT) with `depthBiasExact` set to
[VK_FALSE](fundamentals.html#VK_FALSE) and `depthBiasRepresentation` set to
[VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORMAT_EXT](#VkDepthBiasRepresentationEXT).

Valid Usage

* 
[](#VUID-VkDepthBiasInfoEXT-depthBiasClamp-08950) VUID-VkDepthBiasInfoEXT-depthBiasClamp-08950

If the [`depthBiasClamp`](features.html#features-depthBiasClamp) feature is not
enabled, `depthBiasClamp` **must** be `0.0`

Valid Usage (Implicit)

* 
[](#VUID-VkDepthBiasInfoEXT-sType-sType) VUID-VkDepthBiasInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEPTH_BIAS_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDepthBiasInfoEXT-pNext-pNext) VUID-VkDepthBiasInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDepthBiasRepresentationInfoEXT](#VkDepthBiasRepresentationInfoEXT)

* 
[](#VUID-VkDepthBiasInfoEXT-sType-unique) VUID-VkDepthBiasInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

To [dynamically set](pipelines.html#pipelines-dynamic-state) the depth bias parameters,
call:

// Provided by VK_EXT_depth_bias_control
void vkCmdSetDepthBias2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkDepthBiasInfoEXT*                   pDepthBiasInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pDepthBiasInfo` is a pointer to a [VkDepthBiasInfoEXT](#VkDepthBiasInfoEXT)
structure specifying depth bias parameters.

This command is functionally identical to [vkCmdSetDepthBias](#vkCmdSetDepthBias), but
includes extensible sub-structures that include `sType` and `pNext`
parameters, allowing them to be more easily extended.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthBias2EXT-commandBuffer-parameter) VUID-vkCmdSetDepthBias2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetDepthBias2EXT-pDepthBiasInfo-parameter) VUID-vkCmdSetDepthBias2EXT-pDepthBiasInfo-parameter

 `pDepthBiasInfo` **must** be a valid pointer to a valid [VkDepthBiasInfoEXT](#VkDepthBiasInfoEXT) structure

* 
[](#VUID-vkCmdSetDepthBias2EXT-commandBuffer-recording) VUID-vkCmdSetDepthBias2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthBias2EXT-commandBuffer-cmdpool) VUID-vkCmdSetDepthBias2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetDepthBias2EXT-videocoding) VUID-vkCmdSetDepthBias2EXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDepthBias2EXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

If the `pNext` chain of [VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)
includes a `VkPipelineRasterizationConservativeStateCreateInfoEXT`
structure, then that structure includes parameters controlling conservative
rasterization.

`VkPipelineRasterizationConservativeStateCreateInfoEXT` is defined as:

// Provided by VK_EXT_conservative_rasterization
typedef struct VkPipelineRasterizationConservativeStateCreateInfoEXT {
    VkStructureType                                           sType;
    const void*                                               pNext;
    VkPipelineRasterizationConservativeStateCreateFlagsEXT    flags;
    VkConservativeRasterizationModeEXT                        conservativeRasterizationMode;
    float                                                     extraPrimitiveOverestimationSize;
} VkPipelineRasterizationConservativeStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`conservativeRasterizationMode` is the conservative rasterization
mode to use.

* 
`extraPrimitiveOverestimationSize` is the extra size in pixels to
increase the generating primitive during conservative rasterization at
each of its edges in `X` and `Y` equally in screen space beyond the base
overestimation specified in
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`primitiveOverestimationSize`.
If `conservativeRasterizationMode` is not
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](#VkConservativeRasterizationModeEXT), this value is
ignored.

If this structure is not included in the `pNext` chain,
`conservativeRasterizationMode` is considered to be
[VK_CONSERVATIVE_RASTERIZATION_MODE_DISABLED_EXT](#VkConservativeRasterizationModeEXT), and conservative
rasterization is disabled.

Polygon rasterization **can** be made conservative by setting
`conservativeRasterizationMode` to
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](#VkConservativeRasterizationModeEXT) or
[VK_CONSERVATIVE_RASTERIZATION_MODE_UNDERESTIMATE_EXT](#VkConservativeRasterizationModeEXT) in
`VkPipelineRasterizationConservativeStateCreateInfoEXT`.

|  | If [`conservativePointAndLineRasterization`](limits.html#limits-conservativePointAndLineRasterization) is supported, conservative
| --- | --- |
rasterization can be applied to line and point primitives, otherwise it must
be disabled. |

Valid Usage

* 
[](#VUID-VkPipelineRasterizationConservativeStateCreateInfoEXT-extraPrimitiveOverestimationSize-01769) VUID-VkPipelineRasterizationConservativeStateCreateInfoEXT-extraPrimitiveOverestimationSize-01769

`extraPrimitiveOverestimationSize` **must** be in the range of `0.0` to
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`maxExtraPrimitiveOverestimationSize`
inclusive

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationConservativeStateCreateInfoEXT-sType-sType) VUID-VkPipelineRasterizationConservativeStateCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_CONSERVATIVE_STATE_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineRasterizationConservativeStateCreateInfoEXT-flags-zerobitmask) VUID-VkPipelineRasterizationConservativeStateCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineRasterizationConservativeStateCreateInfoEXT-conservativeRasterizationMode-parameter) VUID-VkPipelineRasterizationConservativeStateCreateInfoEXT-conservativeRasterizationMode-parameter

 `conservativeRasterizationMode` **must** be a valid [VkConservativeRasterizationModeEXT](#VkConservativeRasterizationModeEXT) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineRasterizationStateCreateInfo](#VkPipelineRasterizationStateCreateInfo)

// Provided by VK_EXT_conservative_rasterization
typedef VkFlags VkPipelineRasterizationConservativeStateCreateFlagsEXT;

`VkPipelineRasterizationConservativeStateCreateFlagsEXT` is a bitmask
type for setting a mask, but is currently reserved for future use.

Possible values of
[VkPipelineRasterizationConservativeStateCreateInfoEXT](#VkPipelineRasterizationConservativeStateCreateInfoEXT)::`conservativeRasterizationMode`,
specifying the conservative rasterization mode are:

// Provided by VK_EXT_conservative_rasterization
typedef enum VkConservativeRasterizationModeEXT {
    VK_CONSERVATIVE_RASTERIZATION_MODE_DISABLED_EXT = 0,
    VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT = 1,
    VK_CONSERVATIVE_RASTERIZATION_MODE_UNDERESTIMATE_EXT = 2,
} VkConservativeRasterizationModeEXT;

* 
[VK_CONSERVATIVE_RASTERIZATION_MODE_DISABLED_EXT](#VkConservativeRasterizationModeEXT) specifies that
conservative rasterization is disabled and rasterization proceeds as
normal.

* 
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](#VkConservativeRasterizationModeEXT) specifies that
conservative rasterization is enabled in overestimation mode.

* 
[VK_CONSERVATIVE_RASTERIZATION_MODE_UNDERESTIMATE_EXT](#VkConservativeRasterizationModeEXT) specifies
that conservative rasterization is enabled in underestimation mode.

To [dynamically set](pipelines.html#pipelines-dynamic-state) the
`conservativeRasterizationMode`, call:

// Provided by VK_EXT_conservative_rasterization with VK_EXT_extended_dynamic_state3, VK_EXT_conservative_rasterization with VK_EXT_shader_object
void vkCmdSetConservativeRasterizationModeEXT(
    VkCommandBuffer                             commandBuffer,
    VkConservativeRasterizationModeEXT          conservativeRasterizationMode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`conservativeRasterizationMode` specifies the
`conservativeRasterizationMode` state.

This command sets the `conservativeRasterizationMode` state for
subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationConservativeStateCreateInfoEXT](#VkPipelineRasterizationConservativeStateCreateInfoEXT)::`conservativeRasterizationMode`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetConservativeRasterizationModeEXT-None-09423) VUID-vkCmdSetConservativeRasterizationModeEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ConservativeRasterizationMode`](#features-extendedDynamicState3ConservativeRasterizationMode) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetConservativeRasterizationModeEXT-commandBuffer-parameter) VUID-vkCmdSetConservativeRasterizationModeEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetConservativeRasterizationModeEXT-conservativeRasterizationMode-parameter) VUID-vkCmdSetConservativeRasterizationModeEXT-conservativeRasterizationMode-parameter

 `conservativeRasterizationMode` **must** be a valid [VkConservativeRasterizationModeEXT](#VkConservativeRasterizationModeEXT) value

* 
[](#VUID-vkCmdSetConservativeRasterizationModeEXT-commandBuffer-recording) VUID-vkCmdSetConservativeRasterizationModeEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetConservativeRasterizationModeEXT-commandBuffer-cmdpool) VUID-vkCmdSetConservativeRasterizationModeEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetConservativeRasterizationModeEXT-videocoding) VUID-vkCmdSetConservativeRasterizationModeEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetConservativeRasterizationModeEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To [dynamically set](pipelines.html#pipelines-dynamic-state) the
`extraPrimitiveOverestimationSize`, call:

// Provided by VK_EXT_conservative_rasterization with VK_EXT_extended_dynamic_state3, VK_EXT_conservative_rasterization with VK_EXT_shader_object
void vkCmdSetExtraPrimitiveOverestimationSizeEXT(
    VkCommandBuffer                             commandBuffer,
    float                                       extraPrimitiveOverestimationSize);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`extraPrimitiveOverestimationSize` specifies the
`extraPrimitiveOverestimationSize`.

This command sets the `extraPrimitiveOverestimationSize` for subsequent
drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationConservativeStateCreateInfoEXT](#VkPipelineRasterizationConservativeStateCreateInfoEXT)::`extraPrimitiveOverestimationSize`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-None-09423) VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ExtraPrimitiveOverestimationSize`](#features-extendedDynamicState3ExtraPrimitiveOverestimationSize) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-extraPrimitiveOverestimationSize-07428) VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-extraPrimitiveOverestimationSize-07428

`extraPrimitiveOverestimationSize` **must** be in the range of `0.0` to
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`maxExtraPrimitiveOverestimationSize`
inclusive

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-commandBuffer-parameter) VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-commandBuffer-recording) VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-commandBuffer-cmdpool) VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-videocoding) VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetExtraPrimitiveOverestimationSizeEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

When overestimate conservative rasterization is enabled, rather than
evaluating coverage at individual sample locations, a determination is made
whether any portion of the pixel (including its edges and corners) is
covered by the primitive.
If any portion of the pixel is covered, then all bits of the
[coverage mask](#primsrast-multisampling-coverage-mask) for the fragment
corresponding to that pixel are enabled.
If the render pass has a fragment density map attachment and any bit of the
[coverage mask](#primsrast-multisampling-coverage-mask) for the fragment is
enabled, then all bits of the [coverage mask](#primsrast-multisampling-coverage-mask) for the fragment are enabled.

For the purposes of evaluating which pixels are covered by the primitive,
implementations **can** increase the size of the primitive by up to
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`primitiveOverestimationSize`
pixels at each of the primitive edges.
This **may** increase the number of fragments generated by this primitive and
represents an overestimation of the pixel coverage.

This overestimation size can be increased further by setting the
`extraPrimitiveOverestimationSize` value above `0.0` in steps of
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`extraPrimitiveOverestimationSizeGranularity`
up to and including
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`extraPrimitiveOverestimationSize`.
This **may** further increase the number of fragments generated by this
primitive.

The actual precision of the overestimation size used for conservative
rasterization **may** vary between implementations and produce results that
only approximate the `primitiveOverestimationSize` and
`extraPrimitiveOverestimationSizeGranularity` properties.
Implementations **may** especially vary these approximations when the render
pass has a fragment density map and the fragment area covers multiple
pixels.

For triangles if [VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](#VkConservativeRasterizationModeEXT)
is enabled, fragments will be generated if the primitive area covers any
portion of any pixel inside the fragment area, including their edges or
corners.
The tie-breaking rule described in [Basic Polygon Rasterization](#primsrast-polygons-basic) does not apply during conservative rasterization and
coverage is set for all fragments generated from shared edges of polygons.
Degenerate triangles that evaluate to zero area after rasterization, even
for pixels containing a vertex or edge of the zero-area polygon, will be
culled if
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`degenerateTrianglesRasterized`
is [VK_FALSE](fundamentals.html#VK_FALSE) or will generate fragments if
`degenerateTrianglesRasterized` is [VK_TRUE](fundamentals.html#VK_TRUE).
The fragment input values for these degenerate triangles take their
attribute and depth values from the provoking vertex.
Degenerate triangles are considered backfacing and the application **can**
enable backface culling if desired.
Triangles that are zero area before rasterization **may** be culled regardless.

For lines if [VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](#VkConservativeRasterizationModeEXT) is
enabled, and the implementation sets
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`conservativePointAndLineRasterization`
to [VK_TRUE](fundamentals.html#VK_TRUE), fragments will be generated if the line covers any portion
of any pixel inside the fragment area, including their edges or corners.
Degenerate lines that evaluate to zero length after rasterization will be
culled if
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`degenerateLinesRasterized`
is [VK_FALSE](fundamentals.html#VK_FALSE) or will generate fragments if
`degenerateLinesRasterized` is [VK_TRUE](fundamentals.html#VK_TRUE).
The fragments input values for these degenerate lines take their attribute
and depth values from the provoking vertex.
Lines that are zero length before rasterization **may** be culled regardless.

For points if [VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](#VkConservativeRasterizationModeEXT) is
enabled, and the implementation sets
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`conservativePointAndLineRasterization`
to [VK_TRUE](fundamentals.html#VK_TRUE), fragments will be generated if the point square covers any
portion of any pixel inside the fragment area, including their edges or
corners.

When underestimate conservative rasterization is enabled, rather than
evaluating coverage at individual sample locations, a determination is made
whether all of the pixel (including its edges and corners) is covered by the
primitive.
If the entire pixel is covered, then a fragment is generated with all bits
of its [coverage mask](#primsrast-multisampling-coverage-mask)
corresponding to the pixel enabled, otherwise the pixel is not considered
covered even if some portion of the pixel is covered.
The fragment is discarded if no pixels inside the fragment area are
considered covered.
If the render pass has a fragment density map attachment and any pixel
inside the fragment area is not considered covered, then the fragment is
discarded even if some pixels are considered covered.

For triangles, if [VK_CONSERVATIVE_RASTERIZATION_MODE_UNDERESTIMATE_EXT](#VkConservativeRasterizationModeEXT)
is enabled, fragments will only be generated if any pixel inside the
fragment area is fully covered by the generating primitive, including its
edges and corners.

For lines, if [VK_CONSERVATIVE_RASTERIZATION_MODE_UNDERESTIMATE_EXT](#VkConservativeRasterizationModeEXT) is
enabled, fragments will be generated if any pixel inside the fragment area,
including its edges and corners, are entirely covered by the line.

For points, if [VK_CONSERVATIVE_RASTERIZATION_MODE_UNDERESTIMATE_EXT](#VkConservativeRasterizationModeEXT) is
enabled, fragments will only be generated if the point square covers the
entirety of any pixel square inside the fragment area, including its edges
or corners.

If the render pass has a fragment density map and
[VK_CONSERVATIVE_RASTERIZATION_MODE_UNDERESTIMATE_EXT](#VkConservativeRasterizationModeEXT) is enabled,
fragments will only be generated if the entirety of all pixels inside the
fragment area are covered by the generating primitive, line, or point.

For both overestimate and underestimate conservative rasterization modes a
fragment has all of its pixel squares fully covered by the generating
primitive **must** set `FullyCoveredEXT` to [VK_TRUE](fundamentals.html#VK_TRUE) if the
implementation enables the
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`fullyCoveredFragmentShaderInputVariable`
feature.

When
the use of a [shading rate image](#primsrast-shading-rate-image)
or
setting the [fragment shading rate](#primsrast-fragment-shading-rate)
results in fragments covering multiple pixels, coverage for conservative
rasterization is still evaluated on a per-pixel basis and may result in
fragments with partial coverage.
For fragment shader inputs decorated with `FullyCoveredEXT`, a fragment
is considered fully covered if and only if all pixels in the fragment are
fully covered by the generating primitive.
