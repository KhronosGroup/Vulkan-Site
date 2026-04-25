# VkPhysicalDevice4444FormatsFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevice4444FormatsFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevice4444FormatsFeaturesEXT - Structure describing additional 4444 formats supported by an implementation

The `VkPhysicalDevice4444FormatsFeaturesEXT` structure is defined as:

// Provided by VK_EXT_4444_formats
typedef struct VkPhysicalDevice4444FormatsFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           formatA4R4G4B4;
    VkBool32           formatA4B4G4R4;
} VkPhysicalDevice4444FormatsFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `formatA4R4G4B4` indicates that the
implementation **must** support using a [VkFormat](VkFormat.html) of
[VK_FORMAT_A4R4G4B4_UNORM_PACK16_EXT](VkFormat.html) with at least the following
[VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html)

 `formatA4B4G4R4` indicates that the
implementation **must** support using a [VkFormat](VkFormat.html) of
[VK_FORMAT_A4B4G4R4_UNORM_PACK16_EXT](VkFormat.html) with at least the following
[VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html)

If the `VkPhysicalDevice4444FormatsFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDevice4444FormatsFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevice4444FormatsFeaturesEXT-sType-sType) VUID-VkPhysicalDevice4444FormatsFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_4444_FORMATS_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

|  | Although the formats defined by the `[VK_EXT_4444_formats](VK_EXT_4444_formats.html)` extension
| --- | --- |
were promoted to Vulkan 1.3 as optional formats, the
[VkPhysicalDevice4444FormatsFeaturesEXT](#) structure was not promoted to
Vulkan 1.3. |

[VK_EXT_4444_formats](VK_EXT_4444_formats.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDevice4444FormatsFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
