# VkPipelineSampleLocationsStateCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineSampleLocationsStateCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineSampleLocationsStateCreateInfoEXT - Structure specifying sample locations for a pipeline

Applications **can** also control the sample locations used for rasterization.

If the `pNext` chain of the [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)
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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampleLocationsEnable` controls whether custom sample locations are
used.
If `sampleLocationsEnable` is [VK_FALSE](VK_FALSE.html), the default sample
locations are used and the values specified in `sampleLocationsInfo`
are ignored.

* 
`sampleLocationsInfo` is the sample locations to use during
rasterization if `sampleLocationsEnable` is [VK_TRUE](VK_TRUE.html) and the
graphics pipeline is not created with
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](VkDynamicState.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineSampleLocationsStateCreateInfoEXT-sType-sType) VUID-VkPipelineSampleLocationsStateCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_SAMPLE_LOCATIONS_STATE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPipelineSampleLocationsStateCreateInfoEXT-sampleLocationsInfo-parameter) VUID-VkPipelineSampleLocationsStateCreateInfoEXT-sampleLocationsInfo-parameter

 `sampleLocationsInfo` **must** be a valid [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)

[VK_EXT_sample_locations](VK_EXT_sample_locations.html), `VkBool32`, [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkPipelineSampleLocationsStateCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
