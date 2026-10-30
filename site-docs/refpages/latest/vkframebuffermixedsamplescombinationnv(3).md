# VkFramebufferMixedSamplesCombinationNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFramebufferMixedSamplesCombinationNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFramebufferMixedSamplesCombinationNV - Structure specifying a supported sample count combination

The `VkFramebufferMixedSamplesCombinationNV` structure is defined as:

// Provided by VK_NV_coverage_reduction_mode
typedef struct VkFramebufferMixedSamplesCombinationNV {
    VkStructureType              sType;
    void*                        pNext;
    VkCoverageReductionModeNV    coverageReductionMode;
    VkSampleCountFlagBits        rasterizationSamples;
    VkSampleCountFlags           depthStencilSamples;
    VkSampleCountFlags           colorSamples;
} VkFramebufferMixedSamplesCombinationNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`coverageReductionMode` is a [VkCoverageReductionModeNV](VkCoverageReductionModeNV.html) value
specifying the coverage reduction mode.

* 
`rasterizationSamples` is a [VkSampleCountFlagBits](VkSampleCountFlagBits.html) specifying
the number of rasterization samples in the supported combination.

* 
`depthStencilSamples` specifies the number of samples in the depth
stencil attachment in the supported combination.
A value of 0 indicates the combination does not have a depth stencil
attachment.

* 
`colorSamples` specifies the number of color samples in a color
attachment in the supported combination.
A value of 0 indicates the combination does not have a color attachment.

Valid Usage (Implicit)

* 
[](#VUID-VkFramebufferMixedSamplesCombinationNV-sType-sType) VUID-VkFramebufferMixedSamplesCombinationNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FRAMEBUFFER_MIXED_SAMPLES_COMBINATION_NV](VkStructureType.html)

* 
[](#VUID-VkFramebufferMixedSamplesCombinationNV-pNext-pNext) VUID-VkFramebufferMixedSamplesCombinationNV-pNext-pNext

 `pNext` **must** be `NULL`

[VK_NV_coverage_reduction_mode](VK_NV_coverage_reduction_mode.html), [VkCoverageReductionModeNV](VkCoverageReductionModeNV.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html), [VkSampleCountFlags](VkSampleCountFlags.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV](vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkFramebufferMixedSamplesCombinationNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
