# VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM - Structure specifying Y′CBCR degamma parameters

Applications **can** enable sRGB to linear conversion for the R, G, and B
components of a Y′CBCR image during [sampling](../../../../spec/latest/chapters/textures.html#textures-YCbCr-degamma) by
including `VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM` structure
in the `pNext` chain of [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html).

The `VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM` structure is
defined as:

// Provided by VK_QCOM_ycbcr_degamma
typedef struct VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           enableYDegamma;
    VkBool32           enableCbCrDegamma;
} VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`enableYDegamma` indicates [sRGB to    linear](../../../../spec/latest/chapters/textures.html#textures-YCbCr-degamma) conversion is enabled for the G component.

* 
`enableCbCrDegamma` indicates [sRGB to    linear](../../../../spec/latest/chapters/textures.html#textures-YCbCr-degamma) conversion is enabled for the R and B components.

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM-sType-sType) VUID-VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_YCBCR_DEGAMMA_CREATE_INFO_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html)

[VK_QCOM_ycbcr_degamma](VK_QCOM_ycbcr_degamma.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
