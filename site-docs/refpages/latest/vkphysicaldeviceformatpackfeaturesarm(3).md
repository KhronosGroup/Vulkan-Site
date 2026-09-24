# VkPhysicalDeviceFormatPackFeaturesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFormatPackFeaturesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFormatPackFeaturesARM - Structure describing whether the additional formats feature is supported by an implementation

The `VkPhysicalDeviceFormatPackFeaturesARM` structure is defined as:

// Provided by VK_ARM_format_pack
typedef struct VkPhysicalDeviceFormatPackFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           formatPack;
} VkPhysicalDeviceFormatPackFeaturesARM;

This structure describes the following feature:

* 
 `formatPack` indicates that the
implementation **must** support using a [VkFormat](VkFormat.html) of
[VK_FORMAT_R10X6_UINT_PACK16_ARM](VkFormat.html),
[VK_FORMAT_R10X6G10X6_UINT_2PACK16_ARM](VkFormat.html),
[VK_FORMAT_R10X6G10X6B10X6A10X6_UINT_4PACK16_ARM](VkFormat.html),
[VK_FORMAT_R12X4_UINT_PACK16_ARM](VkFormat.html),
[VK_FORMAT_R12X4G12X4_UINT_2PACK16_ARM](VkFormat.html),
[VK_FORMAT_R12X4G12X4B12X4A12X4_UINT_4PACK16_ARM](VkFormat.html),
[VK_FORMAT_R14X2_UINT_PACK16_ARM](VkFormat.html),
[VK_FORMAT_R14X2G14X2_UINT_2PACK16_ARM](VkFormat.html), and
[VK_FORMAT_R14X2G14X2B14X2A14X2_UINT_4PACK16_ARM](VkFormat.html), with at least the
following [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_TRANSFER_DST_BIT](VkFormatFeatureFlagBits.html)

If the `VkPhysicalDeviceFormatPackFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceFormatPackFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFormatPackFeaturesARM-sType-sType) VUID-VkPhysicalDeviceFormatPackFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FORMAT_PACK_FEATURES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_ARM_format_pack](VK_ARM_format_pack.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceFormatPackFeaturesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
