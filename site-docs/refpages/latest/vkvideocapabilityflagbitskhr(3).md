# VkVideoCapabilityFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoCapabilityFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoCapabilityFlagBitsKHR - Video decode and encode capability bits

Bits which **can** be set in [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`flags` are:

// Provided by VK_KHR_video_queue
typedef enum VkVideoCapabilityFlagBitsKHR {
    VK_VIDEO_CAPABILITY_PROTECTED_CONTENT_BIT_KHR = 0x00000001,
    VK_VIDEO_CAPABILITY_SEPARATE_REFERENCE_IMAGES_BIT_KHR = 0x00000002,
} VkVideoCapabilityFlagBitsKHR;

* 
[VK_VIDEO_CAPABILITY_PROTECTED_CONTENT_BIT_KHR](#) specifies that video
sessions support producing and consuming protected content.

* 

[VK_VIDEO_CAPABILITY_SEPARATE_REFERENCE_IMAGES_BIT_KHR](#) indicates
that the [video picture resources](../../../../spec/latest/chapters/videocoding.html#video-picture-resources) associated
with the [DPB slots](../../../../spec/latest/chapters/videocoding.html#dpb-slot) of a video session **can** be backed by
separate `VkImage` objects.
If this capability flag is not present, then all DPB slots of a video
session **must** be associated with video picture resources backed by the
same `VkImage` object (e.g. using different layers of the same
image).

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkVideoCapabilityFlagsKHR](VkVideoCapabilityFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoCapabilityFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
