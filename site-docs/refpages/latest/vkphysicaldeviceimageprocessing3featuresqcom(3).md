# VkPhysicalDeviceImageProcessing3FeaturesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceImageProcessing3FeaturesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceImageProcessing3FeaturesQCOM - Structure describing image processing features that can be supported by an implementation

The `VkPhysicalDeviceImageProcessing3FeaturesQCOM` structure is defined
as:

// Provided by VK_QCOM_image_processing3
typedef struct VkPhysicalDeviceImageProcessing3FeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           imageGatherLinear;
    VkBool32           imageGatherExtendedModes;
    VkBool32           blockMatchExtendedClampToEdge;
} VkPhysicalDeviceImageProcessing3FeaturesQCOM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `imageGatherLinear` indicates that
the implementation supports shader modules that declare the
`ImageGatherLinearQCOM` capability.

* 
 `imageGatherExtendedModes`
indicates that the implementation supports shader modules that declare
the `ImageGatherExtendedModesQCOM` capability.

* 

`blockMatchExtendedClampToEdge` indicates that the implementation
extends support for [VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](VkSamplerAddressMode.html) to both
input images of all [block matching operations](../../../../spec/latest/chapters/textures.html#textures-blockmatch).

If the `VkPhysicalDeviceImageProcessing3FeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceImageProcessing3FeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageProcessing3FeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceImageProcessing3FeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_3_FEATURES_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_QCOM_image_processing3](VK_QCOM_image_processing3.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceImageProcessing3FeaturesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
