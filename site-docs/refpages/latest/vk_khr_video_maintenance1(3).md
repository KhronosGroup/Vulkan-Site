# VK_KHR_video_maintenance1(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_maintenance1.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_maintenance1](#VK_KHR_video_maintenance1)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_video_maintenance1 - device extension

**Name String**

`VK_KHR_video_maintenance1`

**Extension Type**

Device extension

**Registered Extension Number**

516

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_video_queue](VK_KHR_video_queue.html)

**Contact**

* 
Daniel Rakos [aqnuep](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_video_maintenance1] @aqnuep%0A*Here describe the issue or question you have about the VK_KHR_video_maintenance1 extension*)

**Extension Proposal**

[VK_KHR_video_maintenance1](../../../../features/latest/features/proposals/VK_KHR_video_maintenance1.html)

**Last Modified Date**

2023-07-27

**IP Status**

No known IP claims.

**Contributors**

* 
Ahmed Abdelkhalek, AMD

* 
Aidan Fabius, Lynx

* 
Ping Liu, Intel

* 
Lynne Iribarren, Independent

* 
Srinath Kumarapuram, NVIDIA

* 
Tony Zlatinski, NVIDIA

* 
Daniel Rakos, RasterGrid

`VK_KHR_video_maintenance1` adds a collection of minor video coding
features, none of which would warrant an entire extension of their own.

The new features are as follows:

* 
Allow creating buffers that can be used in video coding operations,
independent of the used video profile, using the new buffer creation
flag [VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkBufferCreateFlagBits.html).

* 
Allow creating images that can be used as decode output or encode input
pictures, independent of the used video profile, using the new image
creation flag [VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkImageCreateFlagBits.html).

* 
Allow specifying queries used by video coding operations as part of the
video coding command parameters, instead of using begin/end query when
the video session is created using the new video session creation flag
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html).

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVideoMaintenance1FeaturesKHR](VkPhysicalDeviceVideoMaintenance1FeaturesKHR.html)

Extending [VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html), [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html):

* 
[VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html)

* 
`VK_KHR_VIDEO_MAINTENANCE_1_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_MAINTENANCE_1_SPEC_VERSION`

* 
Extending [VkBufferCreateFlagBits](VkBufferCreateFlagBits.html):

[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkBufferCreateFlagBits.html)

Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

* 
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkImageCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_MAINTENANCE_1_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_INLINE_QUERY_INFO_KHR](VkStructureType.html)

Extending [VkVideoSessionCreateFlagBitsKHR](VkVideoSessionCreateFlagBitsKHR.html):

* 
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
Revision 1, 2023-07-27 (Daniel Rakos)

internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_maintenance1).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
