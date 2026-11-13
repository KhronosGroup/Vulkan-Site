# VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR - Structure describing the video encode intra refresh features that can be supported by an implementation

The `VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_video_encode_intra_refresh
typedef struct VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoEncodeIntraRefresh;
} VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoEncodeIntraRefresh`
specifies that the implementation supports [video    encode intra refresh](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh).

|  | Support for `videoEncodeIntraRefresh` does not indicate that all video
| --- | --- |
encode profiles support intra refresh.
Support for intra refresh for any specific video encode profile is subject
to video-profile-specific capabilities. |

If the `VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_INTRA_REFRESH_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_video_encode_intra_refresh](VK_KHR_video_encode_intra_refresh.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
