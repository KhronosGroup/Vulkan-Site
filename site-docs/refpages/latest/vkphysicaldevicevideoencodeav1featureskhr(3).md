# VkPhysicalDeviceVideoEncodeAV1FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVideoEncodeAV1FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVideoEncodeAV1FeaturesKHR - Structure describing the video encode AV1 features that can be supported by an implementation

The `VkPhysicalDeviceVideoEncodeAV1FeaturesKHR` structure is defined as:

// Provided by VK_KHR_video_encode_av1
typedef struct VkPhysicalDeviceVideoEncodeAV1FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoEncodeAV1;
} VkPhysicalDeviceVideoEncodeAV1FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoEncodeAV1` indicates that the
implementation supports [AV1 encode operations](../../../../spec/latest/chapters/videocoding.html#encode-av1).

If the `VkPhysicalDeviceVideoEncodeAV1FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVideoEncodeAV1FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoEncodeAV1FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoEncodeAV1FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_AV1_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVideoEncodeAV1FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
