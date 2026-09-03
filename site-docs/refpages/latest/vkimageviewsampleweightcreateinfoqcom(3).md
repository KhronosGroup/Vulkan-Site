# VkImageViewSampleWeightCreateInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageViewSampleWeightCreateInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageViewSampleWeightCreateInfoQCOM - Structure describing weight sampling parameters for image view

If the `pNext` chain includes a
`VkImageViewSampleWeightCreateInfoQCOM` structure, then that structure
includes a parameter specifying the parameters for weight image views used
in [weight image sampling](../../../../spec/latest/chapters/textures.html#textures-weightimage).

The `VkImageViewSampleWeightCreateInfoQCOM` structure is defined as:

// Provided by VK_QCOM_image_processing
typedef struct VkImageViewSampleWeightCreateInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
    VkOffset2D         filterCenter;
    VkExtent2D         filterSize;
    uint32_t           numPhases;
} VkImageViewSampleWeightCreateInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`filterCenter` is a [VkOffset2D](VkOffset2D.html) describing the location of the
weight filter origin.

* 
`filterSize` is a [VkExtent2D](VkExtent2D.html) specifying weight filter
dimensions.

* 
`numPhases` is the number of sub-pixel filter phases.

The `filterCenter` specifies the origin or center of the filter kernel,
as described in [Weight Sampling Operation](../../../../spec/latest/chapters/textures.html#textures-weightimage-filteroperation).
The `numPhases` describes the number of sub-pixel filter phases as
described in [Weight Sampling Phases](../../../../spec/latest/chapters/textures.html#textures-weightimage-filterphases).

Valid Usage

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-filterSize-06958) VUID-VkImageViewSampleWeightCreateInfoQCOM-filterSize-06958

`filterSize.width` **must** be less than or equal to
[    `VkPhysicalDeviceImageProcessingPropertiesQCOM`::`maxWeightFilterDimension.width`](../../../../spec/latest/chapters/devsandqueues.html#limits-weightfilter-maxdimension)

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-filterSize-06959) VUID-VkImageViewSampleWeightCreateInfoQCOM-filterSize-06959

`filterSize.height` **must** be less than or equal to
[    `VkPhysicalDeviceImageProcessingPropertiesQCOM`::`maxWeightFilterDimension.height`](../../../../spec/latest/chapters/devsandqueues.html#limits-weightfilter-maxdimension)

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-filterCenter-06960) VUID-VkImageViewSampleWeightCreateInfoQCOM-filterCenter-06960

`filterCenter.x` **must** be less than or equal to
(filterSize.width - 1)

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-filterCenter-06961) VUID-VkImageViewSampleWeightCreateInfoQCOM-filterCenter-06961

`filterCenter.y` **must** be less than or equal to
(filterSize.height - 1)

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-numPhases-06962) VUID-VkImageViewSampleWeightCreateInfoQCOM-numPhases-06962

`numPhases` **must** be a power of two squared value (i.e., 1, 4, 16,
64, 256, etc.)

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-numPhases-06963) VUID-VkImageViewSampleWeightCreateInfoQCOM-numPhases-06963

`numPhases` **must** be less than or equal to
[    `VkPhysicalDeviceImageProcessingPropertiesQCOM`::`maxWeightFilterPhases`](../../../../spec/latest/chapters/devsandqueues.html#limits-weightfilter-phases)

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-sType-sType) VUID-VkImageViewSampleWeightCreateInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_SAMPLE_WEIGHT_CREATE_INFO_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)

[VK_QCOM_image_processing](VK_QCOM_image_processing.html), [VkExtent2D](VkExtent2D.html), [VkOffset2D](VkOffset2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageViewSampleWeightCreateInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
