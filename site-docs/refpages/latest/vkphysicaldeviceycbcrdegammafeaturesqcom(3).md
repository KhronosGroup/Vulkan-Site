# VkPhysicalDeviceYcbcrDegammaFeaturesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceYcbcrDegammaFeaturesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceYcbcrDegammaFeaturesQCOM - Structure describing Y′CBCR degamma features that can be supported by an implementation

The `VkPhysicalDeviceYcbcrDegammaFeaturesQCOM` structure is defined as:

// Provided by VK_QCOM_ycbcr_degamma
typedef struct VkPhysicalDeviceYcbcrDegammaFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           ycbcrDegamma;
} VkPhysicalDeviceYcbcrDegammaFeaturesQCOM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `ycbcrDegamma` indicates whether the
implementation supports [Y′CBCR degamma](../../../../spec/latest/chapters/textures.html#textures-YCbCr-degamma).

If the `VkPhysicalDeviceYcbcrDegammaFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceYcbcrDegammaFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceYcbcrDegammaFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceYcbcrDegammaFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_YCBCR_DEGAMMA_FEATURES_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_QCOM_ycbcr_degamma](VK_QCOM_ycbcr_degamma.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceYcbcrDegammaFeaturesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
