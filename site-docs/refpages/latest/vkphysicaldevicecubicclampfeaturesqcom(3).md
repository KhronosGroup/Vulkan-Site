# VkPhysicalDeviceCubicClampFeaturesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceCubicClampFeaturesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceCubicClampFeaturesQCOM - Structure describing cubic clamp features that can be supported by an implementation

The `VkPhysicalDeviceCubicClampFeaturesQCOM` structure is defined as:

// Provided by VK_QCOM_filter_cubic_clamp
typedef struct VkPhysicalDeviceCubicClampFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           cubicRangeClamp;
} VkPhysicalDeviceCubicClampFeaturesQCOM;

This structure describes the following features:

* 
 `cubicRangeClamp` indicates that the
implementation supports cubic filtering in combination with a
[texel range clamp](../../../../spec/latest/chapters/textures.html#textures-texel-range-clamp).

If the `VkPhysicalDeviceCubicClampFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceCubicClampFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCubicClampFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceCubicClampFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUBIC_CLAMP_FEATURES_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_QCOM_filter_cubic_clamp](VK_QCOM_filter_cubic_clamp.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceCubicClampFeaturesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
