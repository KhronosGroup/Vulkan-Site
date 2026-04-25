# VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT - Structure describing whether the implementation supports additional 2-plane 444 Y′CBCR formats

The `VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_ycbcr_2plane_444_formats
typedef struct VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           ycbcr2plane444Formats;
} VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `ycbcr2plane444Formats` indicates
that the implementation supports querying format features for, and
using, the following 2-plane 444 Y′CBCR formats:

[VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](VkFormat.html)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](VkFormat.html)

If the `VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_YCBCR_2_PLANE_444_FORMATS_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

|  | Although the formats defined by the `[VK_EXT_ycbcr_2plane_444_formats](VK_EXT_ycbcr_2plane_444_formats.html)`
| --- | --- |
were promoted to Vulkan 1.3 as optional formats, the
[VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT](#) structure was not
promoted to Vulkan 1.3. |

[VK_EXT_ycbcr_2plane_444_formats](VK_EXT_ycbcr_2plane_444_formats.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
