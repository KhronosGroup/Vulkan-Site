# VkPhysicalDeviceImageProcessingPropertiesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceImageProcessingPropertiesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceImageProcessingPropertiesQCOM - Structure containing image processing properties

The `VkPhysicalDeviceImageProcessingPropertiesQCOM` structure is defined
as:

// Provided by VK_QCOM_image_processing
typedef struct VkPhysicalDeviceImageProcessingPropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxWeightFilterPhases;
    VkExtent2D         maxWeightFilterDimension;
    VkExtent2D         maxBlockMatchRegion;
    VkExtent2D         maxBoxFilterBlockSize;
} VkPhysicalDeviceImageProcessingPropertiesQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxWeightFilterPhases` is the
maximum value that **can** be specified for
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html)::`numPhases` in
[weight image sampling](../../../../spec/latest/chapters/textures.html#textures-weightimage-filterphases) operations.

* 
 `maxWeightFilterDimension` is a
[VkExtent2D](VkExtent2D.html) describing the largest dimensions (`width` and
`height`) that **can** be specified for
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html)::`filterSize`.

* 
 `maxBlockMatchRegion` is a
[VkExtent2D](VkExtent2D.html) describing the largest dimensions (`width` and
`height`) that **can** be specified for `blockSize` in
[block matching](../../../../spec/latest/chapters/textures.html#textures-blockmatch) operations.

* 
 `maxBoxFilterBlockSize` is a
[VkExtent2D](VkExtent2D.html) describing the maximum dimensions (`width` and
`height`) that **can** be specified for `blocksize` in
[box filter sampling](../../../../spec/latest/chapters/textures.html#textures-boxfilter) operations.

If the `VkPhysicalDeviceImageProcessingPropertiesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

These are properties of the image processing information of a physical
device.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageProcessingPropertiesQCOM-sType-sType) VUID-VkPhysicalDeviceImageProcessingPropertiesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_PROPERTIES_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_QCOM_image_processing](VK_QCOM_image_processing.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceImageProcessingPropertiesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
