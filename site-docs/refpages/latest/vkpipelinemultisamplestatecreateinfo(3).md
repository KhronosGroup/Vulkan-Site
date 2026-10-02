# VkPipelineMultisampleStateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineMultisampleStateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineMultisampleStateCreateInfo - Structure specifying parameters of a newly created pipeline multisample state

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`rasterizationSamples` is a [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value
specifying the number of samples used in rasterization.
This value is ignored for the purposes of setting the number of samples
used in rasterization if the pipeline is created with the
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](VkDynamicState.html) dynamic state set, but
if [VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](VkDynamicState.html) dynamic state is not set, it
is still used to define the size of the `pSampleMask` array as
described below.

* 
`sampleShadingEnable` **can** be used to enable
[Sample Shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading).

* 
`minSampleShading` specifies a minimum fraction of sample shading if
`sampleShadingEnable` is [VK_TRUE](VK_TRUE.html).

* 
`pSampleMask` is a pointer to an array of `VkSampleMask`
values used in the [sample mask test](../../../../spec/latest/chapters/fragops.html#fragops-samplemask).

* 
`alphaToCoverageEnable` controls whether a temporary coverage value
is generated based on the alpha component of the fragment’s first color
output as specified in the [Multisample Coverage](../../../../spec/latest/chapters/fragops.html#fragops-covg)
section.

* 
`alphaToOneEnable` controls whether the alpha component of the
fragment’s first color output is replaced with one as described in
[Multisample Coverage](../../../../spec/latest/chapters/fragops.html#fragops-covg).

Each bit in the sample mask is associated with a unique
[sample index](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling-coverage-mask) as defined for the
[coverage mask](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling-coverage-mask).
Each bit b for mask word w in the sample mask corresponds to
sample index i, where i = 32 × w +  b.
`pSampleMask` has a length equal to ⌈
`rasterizationSamples` / 32 ⌉ words.

If `pSampleMask` is `NULL`, it is treated as if the mask has all bits
set to `1`.

Valid Usage

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-sampleShadingEnable-00784) VUID-VkPipelineMultisampleStateCreateInfo-sampleShadingEnable-00784

If the [`sampleRateShading`](../../../../spec/latest/chapters/features.html#features-sampleRateShading) feature
is not enabled, `sampleShadingEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-alphaToOneEnable-00785) VUID-VkPipelineMultisampleStateCreateInfo-alphaToOneEnable-00785

If the [`alphaToOne`](../../../../spec/latest/chapters/features.html#features-alphaToOne) feature is not enabled,
`alphaToOneEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-minSampleShading-00786) VUID-VkPipelineMultisampleStateCreateInfo-minSampleShading-00786

`minSampleShading` **must** be in the range [0,1]

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-rasterizationSamples-01415) VUID-VkPipelineMultisampleStateCreateInfo-rasterizationSamples-01415

If the `[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension is enabled,
and the [`coverageReductionMode`](../../../../spec/latest/chapters/features.html#features-coverageReductionMode)
feature is not enabled, or the `pNext` chain does not contain
`VkPipelineCoverageReductionStateCreateInfoNV`, or
`VkPipelineCoverageReductionStateCreateInfoNV`::`coverageReductionMode`
is not set to [VK_COVERAGE_REDUCTION_MODE_TRUNCATE_NV](VkCoverageReductionModeNV.html),
and the subpass has any color attachments, and
`rasterizationSamples` is greater than the number of color samples,
then [sample shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading) **must** not be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-sType-sType) VUID-VkPipelineMultisampleStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_MULTISAMPLE_STATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-pNext-pNext) VUID-VkPipelineMultisampleStateCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineCoverageModulationStateCreateInfoNV](VkPipelineCoverageModulationStateCreateInfoNV.html), [VkPipelineCoverageReductionStateCreateInfoNV](VkPipelineCoverageReductionStateCreateInfoNV.html), [VkPipelineCoverageToColorStateCreateInfoNV](VkPipelineCoverageToColorStateCreateInfoNV.html), or [VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html)

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-sType-unique) VUID-VkPipelineMultisampleStateCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-flags-zerobitmask) VUID-VkPipelineMultisampleStateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineMultisampleStateCreateInfo-rasterizationSamples-parameter) VUID-VkPipelineMultisampleStateCreateInfo-rasterizationSamples-parameter

 `rasterizationSamples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkBool32`, [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkPipelineMultisampleStateCreateFlags](VkPipelineMultisampleStateCreateFlags.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html), `VkSampleMask`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkPipelineMultisampleStateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
