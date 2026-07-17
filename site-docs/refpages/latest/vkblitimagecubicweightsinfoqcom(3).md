# VkBlitImageCubicWeightsInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBlitImageCubicWeightsInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBlitImageCubicWeightsInfoQCOM - Structure specifying image blit cubic weight info

The `VkBlitImageCubicWeightsInfoQCOM` structure is defined as:

// Provided by VK_QCOM_filter_cubic_weights
typedef struct VkBlitImageCubicWeightsInfoQCOM {
    VkStructureType             sType;
    const void*                 pNext;
    VkCubicFilterWeightsQCOM    cubicWeights;
} VkBlitImageCubicWeightsInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`cubicWeights` is a [VkCubicFilterWeightsQCOM](VkCubicFilterWeightsQCOM.html) value controlling
cubic filter weights for the blit.

Valid Usage (Implicit)

* 
[](#VUID-VkBlitImageCubicWeightsInfoQCOM-sType-sType) VUID-VkBlitImageCubicWeightsInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BLIT_IMAGE_CUBIC_WEIGHTS_INFO_QCOM](VkStructureType.html)

* 
[](#VUID-VkBlitImageCubicWeightsInfoQCOM-cubicWeights-parameter) VUID-VkBlitImageCubicWeightsInfoQCOM-cubicWeights-parameter

 `cubicWeights` **must** be a valid [VkCubicFilterWeightsQCOM](VkCubicFilterWeightsQCOM.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBlitImageInfo2](VkBlitImageInfo2.html)

[VK_QCOM_filter_cubic_weights](VK_QCOM_filter_cubic_weights.html), [VkCubicFilterWeightsQCOM](VkCubicFilterWeightsQCOM.html), [VkImageBlit2](VkImageBlit2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkBlitImageCubicWeightsInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
