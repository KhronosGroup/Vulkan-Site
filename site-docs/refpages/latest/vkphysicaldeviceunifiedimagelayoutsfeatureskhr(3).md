# VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR - Structure describing whether the implementation provides unified image layouts

The `VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_unified_image_layouts
typedef struct VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           unifiedImageLayouts;
    VkBool32           unifiedImageLayoutsVideo;
} VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `unifiedImageLayouts` specifies
whether usage of [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html), where valid, incurs no
loss in efficiency.
Additionally, it indicates whether it **can** be used in place of
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html).

* 
 `unifiedImageLayoutsVideo`
specifies whether [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) can be used in place of
any of the following image layouts with no loss in efficiency.

[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](VkImageLayout.html)

If the `VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_UNIFIED_IMAGE_LAYOUTS_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_unified_image_layouts](VK_KHR_unified_image_layouts.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
