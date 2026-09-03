# VkPhysicalDeviceSamplerYcbcrConversionFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSamplerYcbcrConversionFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSamplerYcbcrConversionFeatures - Structure describing Y′CBCR conversion features that can be supported by an implementation

The `VkPhysicalDeviceSamplerYcbcrConversionFeatures` structure is
defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceSamplerYcbcrConversionFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           samplerYcbcrConversion;
} VkPhysicalDeviceSamplerYcbcrConversionFeatures;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkPhysicalDeviceSamplerYcbcrConversionFeatures
typedef VkPhysicalDeviceSamplerYcbcrConversionFeatures VkPhysicalDeviceSamplerYcbcrConversionFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`samplerYcbcrConversion` specifies whether the implementation
supports [sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion).
If `samplerYcbcrConversion` is [VK_FALSE](VK_FALSE.html), sampler Y′CBCR
conversion is not supported, and samplers using sampler Y′CBCR
conversion **must** not be used.

If the `VkPhysicalDeviceSamplerYcbcrConversionFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceSamplerYcbcrConversionFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSamplerYcbcrConversionFeatures-sType-sType) VUID-VkPhysicalDeviceSamplerYcbcrConversionFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_YCBCR_CONVERSION_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceSamplerYcbcrConversionFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
