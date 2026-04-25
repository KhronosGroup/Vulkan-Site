# VkPipelineRasterizationStateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineRasterizationStateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineRasterizationStateCreateInfo - Structure specifying parameters of a newly created pipeline rasterization state

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`depthClampEnable` controls whether to clamp the fragment’s depth
values as described in [Depth Test](../../../../spec/latest/chapters/fragops.html#fragops-depth).
If the pipeline is not created with
[VkPipelineRasterizationDepthClipStateCreateInfoEXT](VkPipelineRasterizationDepthClipStateCreateInfoEXT.html) present then
enabling depth clamp will also disable clipping primitives to the z
planes of the frustum as described in [    Primitive Clipping](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-clipping).
Otherwise depth clipping is controlled by the state set in
[VkPipelineRasterizationDepthClipStateCreateInfoEXT](VkPipelineRasterizationDepthClipStateCreateInfoEXT.html).

* 
`rasterizerDiscardEnable` controls whether primitives are discarded
immediately before the rasterization stage.

* 
`polygonMode` is the triangle rendering mode.
See [VkPolygonMode](VkPolygonMode.html).

* 
`cullMode` is the triangle facing direction used for primitive
culling.
See [VkCullModeFlagBits](VkCullModeFlagBits.html).

* 
`frontFace` is a [VkFrontFace](VkFrontFace.html) value specifying the front-facing
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
`pNext` chain of a [VkPipelineRasterizationStateCreateInfo](#)
structure.
This structure enables selecting the rasterization order to use when
rendering with the corresponding graphics pipeline as described in
[Rasterization Order](../../../../spec/latest/chapters/primsrast.html#primsrast-order).

Valid Usage

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-depthClampEnable-00782) VUID-VkPipelineRasterizationStateCreateInfo-depthClampEnable-00782

If the [`depthClamp`](../../../../spec/latest/chapters/features.html#features-depthClamp) feature is not enabled,
`depthClampEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-polygonMode-01507) VUID-VkPipelineRasterizationStateCreateInfo-polygonMode-01507

    If the [`fillModeNonSolid`](../../../../spec/latest/chapters/features.html#features-fillModeNonSolid) feature is
    not enabled, `polygonMode` **must** be [VK_POLYGON_MODE_FILL](VkPolygonMode.html)
or [VK_POLYGON_MODE_FILL_RECTANGLE_NV](VkPolygonMode.html)

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-polygonMode-01414) VUID-VkPipelineRasterizationStateCreateInfo-polygonMode-01414

If the `[VK_NV_fill_rectangle](VK_NV_fill_rectangle.html)` extension is not enabled,
`polygonMode` **must** not be [VK_POLYGON_MODE_FILL_RECTANGLE_NV](VkPolygonMode.html)

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-pointPolygons-04458) VUID-VkPipelineRasterizationStateCreateInfo-pointPolygons-04458

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`pointPolygons`
is [VK_FALSE](VK_FALSE.html), and `rasterizerDiscardEnable` is [VK_FALSE](VK_FALSE.html),
`polygonMode` **must** not be [VK_POLYGON_MODE_POINT](VkPolygonMode.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-sType-sType) VUID-VkPipelineRasterizationStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-pNext-pNext) VUID-VkPipelineRasterizationStateCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDepthBiasRepresentationInfoEXT](VkDepthBiasRepresentationInfoEXT.html), [VkPipelineRasterizationConservativeStateCreateInfoEXT](VkPipelineRasterizationConservativeStateCreateInfoEXT.html), [VkPipelineRasterizationDepthClipStateCreateInfoEXT](VkPipelineRasterizationDepthClipStateCreateInfoEXT.html), [VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html), [VkPipelineRasterizationProvokingVertexStateCreateInfoEXT](VkPipelineRasterizationProvokingVertexStateCreateInfoEXT.html), [VkPipelineRasterizationStateRasterizationOrderAMD](VkPipelineRasterizationStateRasterizationOrderAMD.html), or [VkPipelineRasterizationStateStreamCreateInfoEXT](VkPipelineRasterizationStateStreamCreateInfoEXT.html)

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-sType-unique) VUID-VkPipelineRasterizationStateCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-flags-zerobitmask) VUID-VkPipelineRasterizationStateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-polygonMode-parameter) VUID-VkPipelineRasterizationStateCreateInfo-polygonMode-parameter

 `polygonMode` **must** be a valid [VkPolygonMode](VkPolygonMode.html) value

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-cullMode-parameter) VUID-VkPipelineRasterizationStateCreateInfo-cullMode-parameter

 `cullMode` **must** be a valid combination of [VkCullModeFlagBits](VkCullModeFlagBits.html) values

* 
[](#VUID-VkPipelineRasterizationStateCreateInfo-frontFace-parameter) VUID-VkPipelineRasterizationStateCreateInfo-frontFace-parameter

 `frontFace` **must** be a valid [VkFrontFace](VkFrontFace.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkBool32`, [VkCullModeFlags](VkCullModeFlags.html), [VkFrontFace](VkFrontFace.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkPipelineRasterizationStateCreateFlags](VkPipelineRasterizationStateCreateFlags.html), [VkPolygonMode](VkPolygonMode.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkPipelineRasterizationStateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
