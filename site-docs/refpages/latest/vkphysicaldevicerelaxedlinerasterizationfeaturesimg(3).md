# VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG - Structure describing relaxed line rasterization features that can be supported by an implementation

The `VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG` structure is
defined as:

// Provided by VK_IMG_relaxed_line_rasterization
typedef struct VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           relaxedLineRasterization;
} VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `relaxedLineRasterization`
indicates that the implementation supports relaxed line rasterization
control.

If the `VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG-sType-sType) VUID-VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RELAXED_LINE_RASTERIZATION_FEATURES_IMG](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_IMG_relaxed_line_rasterization](VK_IMG_relaxed_line_rasterization.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
