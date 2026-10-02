# VkPhysicalDeviceVideoMaintenance2FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVideoMaintenance2FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVideoMaintenance2FeaturesKHR - Structure describing the video maintenance features that can be supported by an implementation

The `VkPhysicalDeviceVideoMaintenance2FeaturesKHR` structure is defined
as:

// Provided by VK_KHR_video_maintenance2
typedef struct VkPhysicalDeviceVideoMaintenance2FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoMaintenance2;
} VkPhysicalDeviceVideoMaintenance2FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoMaintenance2` specifies that
the implementation supports the following:

Support for issuing [video coding control](../../../../spec/latest/chapters/videocoding.html#video-coding-control)
commands against video decode sessions without a bound video session
parameters object.

* 
The new video session creation flag
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html) for
video decode sessions.

* 
Required support for the [rate control     mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) [VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html) for the
following video encode profiles:

[H.264 encode profiles](../../../../spec/latest/chapters/videocoding.html#encode-h264-profile);

* 
[H.265 encode profiles](../../../../spec/latest/chapters/videocoding.html#encode-h265-profile);

* 
[AV1 encode profiles](../../../../spec/latest/chapters/videocoding.html#encode-av1-profile).

Additional guarantees on Video Std parameters used with video encode
profiles that the implementations support without the need to
[override](../../../../spec/latest/chapters/videocoding.html#encode-overrides) them.

If the `VkPhysicalDeviceVideoMaintenance2FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVideoMaintenance2FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoMaintenance2FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoMaintenance2FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_MAINTENANCE_2_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_video_maintenance2](VK_KHR_video_maintenance2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVideoMaintenance2FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
