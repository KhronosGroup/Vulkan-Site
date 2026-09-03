# VkPipelineRasterizationConservativeStateCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineRasterizationConservativeStateCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineRasterizationConservativeStateCreateInfoEXT - Structure specifying conservative raster state

If the `pNext` chain of [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)
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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

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
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](VkConservativeRasterizationModeEXT.html), this value is
ignored.

If this structure is not included in the `pNext` chain,
`conservativeRasterizationMode` is considered to be
[VK_CONSERVATIVE_RASTERIZATION_MODE_DISABLED_EXT](VkConservativeRasterizationModeEXT.html), and conservative
rasterization is disabled.

Polygon rasterization **can** be made conservative by setting
`conservativeRasterizationMode` to
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](VkConservativeRasterizationModeEXT.html) or
[VK_CONSERVATIVE_RASTERIZATION_MODE_UNDERESTIMATE_EXT](VkConservativeRasterizationModeEXT.html) in
`VkPipelineRasterizationConservativeStateCreateInfoEXT`.

|  | If [`conservativePointAndLineRasterization`](../../../../spec/latest/chapters/limits.html#limits-conservativePointAndLineRasterization) is supported, conservative
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

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_CONSERVATIVE_STATE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPipelineRasterizationConservativeStateCreateInfoEXT-flags-zerobitmask) VUID-VkPipelineRasterizationConservativeStateCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineRasterizationConservativeStateCreateInfoEXT-conservativeRasterizationMode-parameter) VUID-VkPipelineRasterizationConservativeStateCreateInfoEXT-conservativeRasterizationMode-parameter

 `conservativeRasterizationMode` **must** be a valid [VkConservativeRasterizationModeEXT](VkConservativeRasterizationModeEXT.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)

[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html), [VkConservativeRasterizationModeEXT](VkConservativeRasterizationModeEXT.html), [VkPipelineRasterizationConservativeStateCreateFlagsEXT](VkPipelineRasterizationConservativeStateCreateFlagsEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkPipelineRasterizationConservativeStateCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
