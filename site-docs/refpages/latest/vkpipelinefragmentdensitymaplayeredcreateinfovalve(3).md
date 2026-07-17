# VkPipelineFragmentDensityMapLayeredCreateInfoVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineFragmentDensityMapLayeredCreateInfoVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineFragmentDensityMapLayeredCreateInfoVALVE - Structure specifying layered fragment density map info

The `VkPipelineFragmentDensityMapLayeredCreateInfoVALVE` structure is
defined as:

// Provided by VK_VALVE_fragment_density_map_layered
typedef struct VkPipelineFragmentDensityMapLayeredCreateInfoVALVE {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           maxFragmentDensityMapLayers;
} VkPipelineFragmentDensityMapLayeredCreateInfoVALVE;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxFragmentDensityMapLayers` is the maximum number of layers which
can be used with a fragment density map.

Valid Usage

* 
[](#VUID-VkPipelineFragmentDensityMapLayeredCreateInfoVALVE-maxFragmentDensityMapLayers-10825) VUID-VkPipelineFragmentDensityMapLayeredCreateInfoVALVE-maxFragmentDensityMapLayers-10825

`maxFragmentDensityMapLayers` **must** be less than or equal to
[`maxFragmentDensityMapLayers`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentDensityMapLayers)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineFragmentDensityMapLayeredCreateInfoVALVE-sType-sType) VUID-VkPipelineFragmentDensityMapLayeredCreateInfoVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_FRAGMENT_DENSITY_MAP_LAYERED_CREATE_INFO_VALVE](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

[VK_VALVE_fragment_density_map_layered](VK_VALVE_fragment_density_map_layered.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineFragmentDensityMapLayeredCreateInfoVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
