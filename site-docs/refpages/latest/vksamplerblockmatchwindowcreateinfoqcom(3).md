# VkSamplerBlockMatchWindowCreateInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerBlockMatchWindowCreateInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerBlockMatchWindowCreateInfoQCOM - Structure specifying the block match window parameters

The `VkSamplerBlockMatchWindowCreateInfoQCOM` structure is defined as:

// Provided by VK_QCOM_image_processing2
typedef struct VkSamplerBlockMatchWindowCreateInfoQCOM {
    VkStructureType                      sType;
    const void*                          pNext;
    VkExtent2D                           windowExtent;
    VkBlockMatchWindowCompareModeQCOM    windowCompareMode;
} VkSamplerBlockMatchWindowCreateInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`windowExtent` is a [VkExtent2D](VkExtent2D.html) specifying a the width and
height of the block match window.

* 
`windowCompareMode` is a [VkBlockMatchWindowCompareModeQCOM](VkBlockMatchWindowCompareModeQCOM.html)
specifying the compare mode.

Valid Usage

* 
[](#VUID-VkSamplerBlockMatchWindowCreateInfoQCOM-WindowExtent-09210) VUID-VkSamplerBlockMatchWindowCreateInfoQCOM-WindowExtent-09210

`WindowExtent` **must** not be larger than
[VkPhysicalDeviceImageProcessing2PropertiesQCOM](VkPhysicalDeviceImageProcessing2PropertiesQCOM.html)::`maxBlockMatchWindow`

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerBlockMatchWindowCreateInfoQCOM-sType-sType) VUID-VkSamplerBlockMatchWindowCreateInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_BLOCK_MATCH_WINDOW_CREATE_INFO_QCOM](VkStructureType.html)

* 
[](#VUID-VkSamplerBlockMatchWindowCreateInfoQCOM-windowCompareMode-parameter) VUID-VkSamplerBlockMatchWindowCreateInfoQCOM-windowCompareMode-parameter

 `windowCompareMode` **must** be a valid [VkBlockMatchWindowCompareModeQCOM](VkBlockMatchWindowCompareModeQCOM.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)

[VK_QCOM_image_processing2](VK_QCOM_image_processing2.html), [VkBlockMatchWindowCompareModeQCOM](VkBlockMatchWindowCompareModeQCOM.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerBlockMatchWindowCreateInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
