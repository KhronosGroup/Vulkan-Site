# VkCoverageReductionModeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCoverageReductionModeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCoverageReductionModeNV - Specify the coverage reduction mode

Possible values of
[VkPipelineCoverageReductionStateCreateInfoNV](VkPipelineCoverageReductionStateCreateInfoNV.html)::`coverageReductionMode`,
specifying how color sample coverage is generated from pixel coverage, are:

// Provided by VK_NV_coverage_reduction_mode
typedef enum VkCoverageReductionModeNV {
    VK_COVERAGE_REDUCTION_MODE_MERGE_NV = 0,
    VK_COVERAGE_REDUCTION_MODE_TRUNCATE_NV = 1,
} VkCoverageReductionModeNV;

* 
[VK_COVERAGE_REDUCTION_MODE_MERGE_NV](#) specifies that each color
sample will be associated with an implementation-dependent subset of
samples in the pixel coverage.
If any of those associated samples are covered, the color sample is
covered.

* 
[VK_COVERAGE_REDUCTION_MODE_TRUNCATE_NV](#) specifies that for color
samples present in the color attachments, a color sample is covered if
the pixel coverage sample with the same
[sample index](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling-coverage-mask) i is
covered; other pixel coverage samples are discarded.

[VK_NV_coverage_reduction_mode](VK_NV_coverage_reduction_mode.html), [VkFramebufferMixedSamplesCombinationNV](VkFramebufferMixedSamplesCombinationNV.html), [VkPipelineCoverageReductionStateCreateInfoNV](VkPipelineCoverageReductionStateCreateInfoNV.html), [vkCmdSetCoverageReductionModeNV](vkCmdSetCoverageReductionModeNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkCoverageReductionModeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
