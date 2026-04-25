# VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR - Structure describing the video encode quantization map features that can be supported by an implementation

The `VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_video_encode_quantization_map
typedef struct VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoEncodeQuantizationMap;
} VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoEncodeQuantizationMap`
indicates that the implementation supports
[video encode quantization maps](../../../../spec/latest/chapters/videocoding.html#encode-quantization-map).

|  | Support for `videoEncodeQuantizationMap` does not indicate that all
| --- | --- |
video encode profiles support quantization maps.
Support for quantization maps for any specific video encode profile is
subject to video-profile-specific capabilities. |

If the `VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_QUANTIZATION_MAP_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
