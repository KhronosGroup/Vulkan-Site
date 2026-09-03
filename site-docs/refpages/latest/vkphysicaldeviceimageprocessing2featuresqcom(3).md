# VkPhysicalDeviceImageProcessing2FeaturesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceImageProcessing2FeaturesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceImageProcessing2FeaturesQCOM - Structure describing image processing features that can be supported by an implementation

The `VkPhysicalDeviceImageProcessing2FeaturesQCOM` structure is defined
as:

// Provided by VK_QCOM_image_processing2
typedef struct VkPhysicalDeviceImageProcessing2FeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           textureBlockMatch2;
} VkPhysicalDeviceImageProcessing2FeaturesQCOM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `textureBlockMatch2` indicates that
the implementation supports shader modules that declare the
`TextureBlockMatch2QCOM` capability.

If the `VkPhysicalDeviceImageProcessing2FeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceImageProcessing2FeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageProcessing2FeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceImageProcessing2FeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_2_FEATURES_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_QCOM_image_processing2](VK_QCOM_image_processing2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceImageProcessing2FeaturesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
