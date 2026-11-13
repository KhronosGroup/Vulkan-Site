# VkSamplerCubicWeightsCreateInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerCubicWeightsCreateInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerCubicWeightsCreateInfoQCOM - Structure specifying sampler cubic weights

The `VkSamplerCubicWeightsCreateInfoQCOM` structure is defined as:

// Provided by VK_QCOM_filter_cubic_weights
typedef struct VkSamplerCubicWeightsCreateInfoQCOM {
    VkStructureType             sType;
    const void*                 pNext;
    VkCubicFilterWeightsQCOM    cubicWeights;
} VkSamplerCubicWeightsCreateInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`cubicWeights` is a [VkCubicFilterWeightsQCOM](VkCubicFilterWeightsQCOM.html) value controlling
which cubic weights are used.

If the `pNext` chain of [VkSamplerCreateInfo](VkSamplerCreateInfo.html) includes a
`VkSamplerCubicWeightsCreateInfoQCOM` structure, then that structure
specifies which cubic weights are used.

If that structure is not present, `cubicWeights` is considered to be
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](VkCubicFilterWeightsQCOM.html).

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerCubicWeightsCreateInfoQCOM-sType-sType) VUID-VkSamplerCubicWeightsCreateInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_CUBIC_WEIGHTS_CREATE_INFO_QCOM](VkStructureType.html)

* 
[](#VUID-VkSamplerCubicWeightsCreateInfoQCOM-cubicWeights-parameter) VUID-VkSamplerCubicWeightsCreateInfoQCOM-cubicWeights-parameter

 `cubicWeights` **must** be a valid [VkCubicFilterWeightsQCOM](VkCubicFilterWeightsQCOM.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)

[VK_QCOM_filter_cubic_weights](VK_QCOM_filter_cubic_weights.html), [VkCubicFilterWeightsQCOM](VkCubicFilterWeightsQCOM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerCubicWeightsCreateInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
