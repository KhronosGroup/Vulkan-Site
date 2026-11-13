# VkSamplerReductionModeCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerReductionModeCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerReductionModeCreateInfo - Structure specifying sampler reduction mode

The `VkSamplerReductionModeCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkSamplerReductionModeCreateInfo {
    VkStructureType           sType;
    const void*               pNext;
    VkSamplerReductionMode    reductionMode;
} VkSamplerReductionModeCreateInfo;

// Provided by VK_EXT_sampler_filter_minmax
// Equivalent to VkSamplerReductionModeCreateInfo
typedef VkSamplerReductionModeCreateInfo VkSamplerReductionModeCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`reductionMode` is a [VkSamplerReductionMode](VkSamplerReductionMode.html) value controlling
how texture filtering combines texel values.

If the `pNext` chain of [VkSamplerCreateInfo](VkSamplerCreateInfo.html) includes a
`VkSamplerReductionModeCreateInfo` structure, then that structure
includes a mode controlling how texture filtering combines texel values.

If this structure is not present, `reductionMode` is considered to be
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](VkSamplerReductionMode.html).

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerReductionModeCreateInfo-sType-sType) VUID-VkSamplerReductionModeCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_REDUCTION_MODE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkSamplerReductionModeCreateInfo-reductionMode-parameter) VUID-VkSamplerReductionModeCreateInfo-reductionMode-parameter

 `reductionMode` **must** be a valid [VkSamplerReductionMode](VkSamplerReductionMode.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)

[VK_EXT_sampler_filter_minmax](VK_EXT_sampler_filter_minmax.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkSamplerReductionMode](VkSamplerReductionMode.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerReductionModeCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
