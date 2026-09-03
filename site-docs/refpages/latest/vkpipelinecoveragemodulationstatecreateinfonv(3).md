# VkPipelineCoverageModulationStateCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCoverageModulationStateCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCoverageModulationStateCreateInfoNV - Structure specifying parameters controlling coverage modulation

As part of coverage reduction, fragment color values **can** also be modulated
(multiplied) by a value that is a function of fraction of covered
rasterization samples associated with that color sample.

Pipeline state controlling coverage modulation is specified through the
members of the `VkPipelineCoverageModulationStateCreateInfoNV`
structure.

The `VkPipelineCoverageModulationStateCreateInfoNV` structure is defined
as:

// Provided by VK_NV_framebuffer_mixed_samples
typedef struct VkPipelineCoverageModulationStateCreateInfoNV {
    VkStructureType                                   sType;
    const void*                                       pNext;
    VkPipelineCoverageModulationStateCreateFlagsNV    flags;
    VkCoverageModulationModeNV                        coverageModulationMode;
    VkBool32                                          coverageModulationTableEnable;
    uint32_t                                          coverageModulationTableCount;
    const float*                                      pCoverageModulationTable;
} VkPipelineCoverageModulationStateCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`coverageModulationMode` is a [VkCoverageModulationModeNV](VkCoverageModulationModeNV.html) value
controlling which color components are modulated.

* 
`coverageModulationTableEnable` controls whether the modulation
factor is looked up from a table in `pCoverageModulationTable`.

* 
`coverageModulationTableCount` is the number of elements in
`pCoverageModulationTable`.

* 
`pCoverageModulationTable` is a table of modulation factors
containing a value for each number of covered samples.

If `coverageModulationTableEnable` is [VK_FALSE](VK_FALSE.html), then for each
color sample the associated bits of the pixel coverage are counted and
divided by the number of associated bits to produce a modulation factor
R in the range (0,1] (a value of zero would have been killed due
to a color coverage of 0).
Specifically:

* 
N = value of `rasterizationSamples`

* 
M = value of [VkAttachmentDescription](VkAttachmentDescription.html)::`samples` for any
color attachments

* 
R = popcount(associated coverage bits) / (N / M)

If `coverageModulationTableEnable` is [VK_TRUE](VK_TRUE.html), the value R
is computed using a programmable lookup table.
The lookup table has N / M elements, and the element of the table is
selected by:

* 
R = `pCoverageModulationTable`[popcount(associated coverage
bits)-1]

Note that the table does not have an entry for popcount(associated
coverage bits) = 0, because such samples would have been killed.

The values of `pCoverageModulationTable` **may** be rounded to an
implementation-dependent precision, which is at least as fine as 1 /
N, and clamped to [0,1].

For each color attachment with a floating-point or normalized color format,
each fragment output color value is replicated to M values which **can**
each be modulated (multiplied) by that color sample’s associated value of
R.
Which components are modulated is controlled by
`coverageModulationMode`.

If this structure is not included in the `pNext` chain, it is as if
`coverageModulationMode` is [VK_COVERAGE_MODULATION_MODE_NONE_NV](VkCoverageModulationModeNV.html).

If the [coverage reduction mode](../../../../spec/latest/chapters/fragops.html#fragops-coverage-reduction) is
[VK_COVERAGE_REDUCTION_MODE_TRUNCATE_NV](VkCoverageReductionModeNV.html), each color sample is
associated with only a single coverage sample.
In this case, it is as if `coverageModulationMode` is
[VK_COVERAGE_MODULATION_MODE_NONE_NV](VkCoverageModulationModeNV.html).

Valid Usage

* 
[](#VUID-VkPipelineCoverageModulationStateCreateInfoNV-coverageModulationTableEnable-01405) VUID-VkPipelineCoverageModulationStateCreateInfoNV-coverageModulationTableEnable-01405

If `coverageModulationTableEnable` is [VK_TRUE](VK_TRUE.html),
`coverageModulationTableCount` **must** be equal to the number of
rasterization samples divided by the number of color samples in the
subpass

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCoverageModulationStateCreateInfoNV-sType-sType) VUID-VkPipelineCoverageModulationStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_COVERAGE_MODULATION_STATE_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkPipelineCoverageModulationStateCreateInfoNV-flags-zerobitmask) VUID-VkPipelineCoverageModulationStateCreateInfoNV-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineCoverageModulationStateCreateInfoNV-coverageModulationMode-parameter) VUID-VkPipelineCoverageModulationStateCreateInfoNV-coverageModulationMode-parameter

 `coverageModulationMode` **must** be a valid [VkCoverageModulationModeNV](VkCoverageModulationModeNV.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)

[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html), `VkBool32`, [VkCoverageModulationModeNV](VkCoverageModulationModeNV.html), [VkPipelineCoverageModulationStateCreateFlagsNV](VkPipelineCoverageModulationStateCreateFlagsNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkPipelineCoverageModulationStateCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
