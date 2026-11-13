# VkPhysicalDeviceVideoMaintenance1FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVideoMaintenance1FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVideoMaintenance1FeaturesKHR - Structure describing the video maintenance features that can be supported by an implementation

The `VkPhysicalDeviceVideoMaintenance1FeaturesKHR` structure is defined
as:

// Provided by VK_KHR_video_maintenance1
typedef struct VkPhysicalDeviceVideoMaintenance1FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoMaintenance1;
} VkPhysicalDeviceVideoMaintenance1FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoMaintenance1` indicates that
the implementation supports the following:

The new buffer creation flag
[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkBufferCreateFlagBits.html).

* 
The new image creation flag
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkImageCreateFlagBits.html).

* 
The new video session creation flag
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html).

If the `VkPhysicalDeviceVideoMaintenance1FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVideoMaintenance1FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoMaintenance1FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoMaintenance1FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_MAINTENANCE_1_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_video_maintenance1](VK_KHR_video_maintenance1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVideoMaintenance1FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
