# VK_KHR_video_queue(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_video_queue.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_video_queue](#VK_KHR_video_queue)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_video_queue - device extension

**Name String**

`VK_KHR_video_queue`

**Extension Type**

Device extension

**Registered Extension Number**

24

**Revision**

8

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_synchronization2](VK_KHR_synchronization2.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**Contact**

* 
Tony Zlatinski [tzlatinski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_video_queue] @tzlatinski%0A*Here describe the issue or question you have about the VK_KHR_video_queue extension*)

**Extension Proposal**

[VK_KHR_video_queue](../../../../features/latest/features/proposals/VK_KHR_video_queue.html)

**Last Modified Date**

2022-09-29

**IP Status**

No known IP claims.

**Contributors**

* 
Ahmed Abdelkhalek, AMD

* 
George Hao, AMD

* 
Jake Beju, AMD

* 
Piers Daniell, NVIDIA

* 
Srinath Kumarapuram, NVIDIA

* 
Tobias Hector, AMD

* 
Tony Zlatinski, NVIDIA

* 
Daniel Rakos, RasterGrid

This extension provides common APIs to enable exposing queue families with
support for video codec operations by introducing the following new object
types and related functionalities:

* 
Video session objects that represent and maintain the state needed to
perform video codec operations.

* 
Video session parameters objects that act as a container for codec
specific parameters.

In addition, it also introduces query commands that allow applications to
determine video coding related capabilities, and command buffer commands
that enable recording video coding operations against a video session.

This extension is to be used in conjunction with other extensions that
enable specific video coding operations.

* 
[VkVideoSessionKHR](VkVideoSessionKHR.html)

* 
[VkVideoSessionParametersKHR](VkVideoSessionParametersKHR.html)

* 
[vkBindVideoSessionMemoryKHR](vkBindVideoSessionMemoryKHR.html)

* 
[vkCmdBeginVideoCodingKHR](vkCmdBeginVideoCodingKHR.html)

* 
[vkCmdControlVideoCodingKHR](vkCmdControlVideoCodingKHR.html)

* 
[vkCmdEndVideoCodingKHR](vkCmdEndVideoCodingKHR.html)

* 
[vkCreateVideoSessionKHR](vkCreateVideoSessionKHR.html)

* 
[vkCreateVideoSessionParametersKHR](vkCreateVideoSessionParametersKHR.html)

* 
[vkDestroyVideoSessionKHR](vkDestroyVideoSessionKHR.html)

* 
[vkDestroyVideoSessionParametersKHR](vkDestroyVideoSessionParametersKHR.html)

* 
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html)

* 
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html)

* 
[vkGetVideoSessionMemoryRequirementsKHR](vkGetVideoSessionMemoryRequirementsKHR.html)

* 
[vkUpdateVideoSessionParametersKHR](vkUpdateVideoSessionParametersKHR.html)

* 
[VkBindVideoSessionMemoryInfoKHR](VkBindVideoSessionMemoryInfoKHR.html)

* 
[VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html)

* 
[VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html)

* 
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)

* 
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)

* 
[VkVideoEndCodingInfoKHR](VkVideoEndCodingInfoKHR.html)

* 
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)

* 
[VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html)

* 
[VkVideoReferenceSlotInfoKHR](VkVideoReferenceSlotInfoKHR.html)

* 
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)

* 
[VkVideoSessionMemoryRequirementsKHR](VkVideoSessionMemoryRequirementsKHR.html)

* 
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html)

* 
[VkVideoSessionParametersUpdateInfoKHR](VkVideoSessionParametersUpdateInfoKHR.html)

* 
Extending [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html), [VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkBufferCreateInfo](VkBufferCreateInfo.html):

[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)

Extending [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html):

* 
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

Extending [VkQueueFamilyProperties2](VkQueueFamilyProperties2.html):

* 
[VkQueueFamilyQueryResultStatusPropertiesKHR](VkQueueFamilyQueryResultStatusPropertiesKHR.html)

* 
[VkQueueFamilyVideoPropertiesKHR](VkQueueFamilyVideoPropertiesKHR.html)

* 
[VkQueryResultStatusKHR](VkQueryResultStatusKHR.html)

* 
[VkVideoCapabilityFlagBitsKHR](VkVideoCapabilityFlagBitsKHR.html)

* 
[VkVideoChromaSubsamplingFlagBitsKHR](VkVideoChromaSubsamplingFlagBitsKHR.html)

* 
[VkVideoCodecOperationFlagBitsKHR](VkVideoCodecOperationFlagBitsKHR.html)

* 
[VkVideoCodingControlFlagBitsKHR](VkVideoCodingControlFlagBitsKHR.html)

* 
[VkVideoComponentBitDepthFlagBitsKHR](VkVideoComponentBitDepthFlagBitsKHR.html)

* 
[VkVideoSessionCreateFlagBitsKHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
[VkVideoBeginCodingFlagsKHR](VkVideoBeginCodingFlagsKHR.html)

* 
[VkVideoCapabilityFlagsKHR](VkVideoCapabilityFlagsKHR.html)

* 
[VkVideoChromaSubsamplingFlagsKHR](VkVideoChromaSubsamplingFlagsKHR.html)

* 
[VkVideoCodecOperationFlagsKHR](VkVideoCodecOperationFlagsKHR.html)

* 
[VkVideoCodingControlFlagsKHR](VkVideoCodingControlFlagsKHR.html)

* 
[VkVideoComponentBitDepthFlagsKHR](VkVideoComponentBitDepthFlagsKHR.html)

* 
[VkVideoEndCodingFlagsKHR](VkVideoEndCodingFlagsKHR.html)

* 
[VkVideoSessionCreateFlagsKHR](VkVideoSessionCreateFlagsKHR.html)

* 
[VkVideoSessionParametersCreateFlagsKHR](VkVideoSessionParametersCreateFlagsKHR.html)

* 
`VK_KHR_VIDEO_QUEUE_EXTENSION_NAME`

* 
`VK_KHR_VIDEO_QUEUE_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_VIDEO_SESSION_KHR](VkObjectType.html)

* 
[VK_OBJECT_TYPE_VIDEO_SESSION_PARAMETERS_KHR](VkObjectType.html)

Extending [VkQueryResultFlagBits](VkQueryResultFlagBits.html):

* 
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html)

Extending [VkQueryType](VkQueryType.html):

* 
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_IMAGE_USAGE_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PICTURE_LAYOUT_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PROFILE_CODEC_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PROFILE_FORMAT_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PROFILE_OPERATION_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_STD_VERSION_NOT_SUPPORTED_KHR](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BIND_VIDEO_SESSION_MEMORY_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_FORMAT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_QUERY_RESULT_STATUS_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_VIDEO_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_BEGIN_CODING_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_CAPABILITIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_CODING_CONTROL_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_END_CODING_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_FORMAT_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_PICTURE_RESOURCE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_PROFILE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_PROFILE_LIST_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_SESSION_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_SESSION_MEMORY_REQUIREMENTS_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_SESSION_PARAMETERS_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_SESSION_PARAMETERS_UPDATE_INFO_KHR](VkStructureType.html)

* 
Revision 0.1, 2019-11-21 (Tony Zlatinski)

Initial draft

Revision 0.2, 2019-11-27 (Tony Zlatinski)

* 
Make vulkan video core common between decode and encode

Revision 1, March 29 2021 (Tony Zlatinski)

* 
Spec and API updates.

Revision 2, August 1 2021 (Srinath Kumarapuram)

* 
Rename `VkVideoCapabilitiesFlagBitsKHR` to
`VkVideoCapabilityFlagBitsKHR` (along with the names of enumerants it
defines) and `VkVideoCapabilitiesFlagsKHR` to
`VkVideoCapabilityFlagsKHR`, following Vulkan naming conventions.

Revision 3, 2022-03-16 (Ahmed Abdelkhalek)

* 
Relocate Std header version reporting/requesting from codec-operation
specific extensions to this extension.

* 
Make Std header versions codec-operation specific instead of only
codec-specific.

Revision 4, 2022-05-30 (Daniel Rakos)

* 
Refactor the video format query APIs and related language

* 
Extend VkResult with video-specific error codes

Revision 5, 2022-08-11 (Daniel Rakos)

* 
Add `VkVideoSessionParametersCreateFlagsKHR`

* 
Remove `VkVideoCodingQualityPresetFlagsKHR`

* 
Rename `VkQueueFamilyQueryResultStatusProperties2KHR` to
`VkQueueFamilyQueryResultStatusPropertiesKHR`

* 
Rename `VkVideoQueueFamilyProperties2KHR` to
`VkQueueFamilyVideoPropertiesKHR`

* 
Rename `VkVideoProfileKHR` to `VkVideoProfileInfoKHR`

* 
Rename `VkVideoProfilesKHR` to `VkVideoProfileListInfoKHR`

* 
Rename `VkVideoGetMemoryPropertiesKHR` to
`VkVideoSessionMemoryRequirementsKHR`

* 
Rename `VkVideoBindMemoryKHR` to `VkBindVideoSessionMemoryInfoKHR`

* 
Fix `pNext` constness of `VkPhysicalDeviceVideoFormatInfoKHR` and
`VkVideoSessionMemoryRequirementsKHR`

* 
Fix incorrectly named value enums in bit enum types
`VkVideoCodecOperationFlagBitsKHR` and
`VkVideoChromaSubsamplingFlagBitsKHR`

* 
Remove unnecessary default values from
`VkVideoSessionCreateFlagBitsKHR` and `VkVideoCodingControlFlagBitsKHR`

* 
Eliminate nested pointer in `VkVideoSessionMemoryRequirementsKHR`

* 
Rename `VkVideoPictureResourceKHR` to `VkVideoPictureResourceInfoKHR`

* 
Rename `VkVideoReferenceSlotKHR` to `VkVideoReferenceSlotInfoKHR`

Revision 6, 2022-09-18 (Daniel Rakos)

* 
Rename the `maxReferencePicturesSlotsCount` and
`maxReferencePicturesActiveCount` fields of `VkVideoCapabilitiesKHR`
and `VkVideoSessionCreateInfoKHR` to `maxDpbSlots` and
`maxActiveReferencePictures`, respectively, to clarify their meaning

* 
Rename `capabilityFlags` to `flags` in `VkVideoCapabilitiesKHR`

* 
Rename `videoPictureExtentGranularity` to `pictureAccessGranularity` in
`VkVideoCapabilitiesKHR`

* 
Rename `minExtent` and `maxExtent` to `minCodedExtent` and
`maxCodedExtent`, respectively, in `VkVideoCapabilitiesKHR`

* 
Rename `referencePicturesFormat` to `referencePictureFormat` in
`VkVideoSessionCreateInfoKHR`

Revision 7, 2022-09-26 (Daniel Rakos)

* 
Change type of `VkVideoReferenceSlotInfoKHR::slotIndex` from `int8_t`
to `int32_t`

Revision 8, 2022-09-29 (Daniel Rakos)

* 
Extension is no longer provisional

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_video_queue).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
