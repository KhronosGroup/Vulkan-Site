# VkPhysicalDeviceVideoDecodeVP9FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVideoDecodeVP9FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVideoDecodeVP9FeaturesKHR - Structure describing the video decode VP9 features that can be supported by an implementation

The `VkPhysicalDeviceVideoDecodeVP9FeaturesKHR` structure is defined as:

// Provided by VK_KHR_video_decode_vp9
typedef struct VkPhysicalDeviceVideoDecodeVP9FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoDecodeVP9;
} VkPhysicalDeviceVideoDecodeVP9FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoDecodeVP9` specifies that the
implementation supports [VP9 decode operations](../../../../spec/latest/chapters/videocoding.html#decode-vp9).

If the `VkPhysicalDeviceVideoDecodeVP9FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVideoDecodeVP9FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoDecodeVP9FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoDecodeVP9FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_DECODE_VP9_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_video_decode_vp9](VK_KHR_video_decode_vp9.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVideoDecodeVP9FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
