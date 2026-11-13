# VkPipelineCoverageReductionStateCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCoverageReductionStateCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCoverageReductionStateCreateInfoNV - Structure specifying parameters controlling coverage reduction

The `VkPipelineCoverageReductionStateCreateInfoNV` structure is defined
as:

// Provided by VK_NV_coverage_reduction_mode
typedef struct VkPipelineCoverageReductionStateCreateInfoNV {
    VkStructureType                                  sType;
    const void*                                      pNext;
    VkPipelineCoverageReductionStateCreateFlagsNV    flags;
    VkCoverageReductionModeNV                        coverageReductionMode;
} VkPipelineCoverageReductionStateCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`coverageReductionMode` is a [VkCoverageReductionModeNV](VkCoverageReductionModeNV.html) value
controlling how color sample coverage is generated from pixel coverage.

If this structure is not included in the `pNext` chain, or if the
extension is not enabled, the default coverage reduction mode is inferred as
follows:

* 
If the `[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension is enabled,
then it is as if the `coverageReductionMode` is
[VK_COVERAGE_REDUCTION_MODE_MERGE_NV](VkCoverageReductionModeNV.html).

* 
If the `[VK_AMD_mixed_attachment_samples](VK_AMD_mixed_attachment_samples.html)` extension is enabled,
then it is as if the `coverageReductionMode` is
[VK_COVERAGE_REDUCTION_MODE_TRUNCATE_NV](VkCoverageReductionModeNV.html).

* 
If both `[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` and
`[VK_AMD_mixed_attachment_samples](VK_AMD_mixed_attachment_samples.html)` are enabled, then the default
coverage reduction mode is implementation-dependent.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCoverageReductionStateCreateInfoNV-sType-sType) VUID-VkPipelineCoverageReductionStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_COVERAGE_REDUCTION_STATE_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkPipelineCoverageReductionStateCreateInfoNV-flags-zerobitmask) VUID-VkPipelineCoverageReductionStateCreateInfoNV-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineCoverageReductionStateCreateInfoNV-coverageReductionMode-parameter) VUID-VkPipelineCoverageReductionStateCreateInfoNV-coverageReductionMode-parameter

 `coverageReductionMode` **must** be a valid [VkCoverageReductionModeNV](VkCoverageReductionModeNV.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)

[VK_NV_coverage_reduction_mode](VK_NV_coverage_reduction_mode.html), [VkCoverageReductionModeNV](VkCoverageReductionModeNV.html), [VkPipelineCoverageReductionStateCreateFlagsNV](VkPipelineCoverageReductionStateCreateFlagsNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkPipelineCoverageReductionStateCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
