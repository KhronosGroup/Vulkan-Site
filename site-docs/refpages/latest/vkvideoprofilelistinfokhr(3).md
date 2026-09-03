# VkVideoProfileListInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoProfileListInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoProfileListInfoKHR - Structure specifying one or more video profiles used in conjunction

The `VkVideoProfileListInfoKHR` structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkVideoProfileListInfoKHR {
    VkStructureType                 sType;
    const void*                     pNext;
    uint32_t                        profileCount;
    const VkVideoProfileInfoKHR*    pProfiles;
} VkVideoProfileListInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`profileCount` is the number of elements in the `pProfiles`
array.

* 
`pProfiles` is a pointer to an array of [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)
structures.

|  | Video transcoding is an example of a use case that necessitates the
| --- | --- |
specification of multiple profiles in various contexts. |

When the application provides a video decode profile and one or more video
encode profiles in the profile list, the implementation ensures that any
capabilitities returned or resources created are suitable for the video
transcoding use cases without the need for manual data transformations.

Valid Usage

* 
[](#VUID-VkVideoProfileListInfoKHR-pProfiles-06813) VUID-VkVideoProfileListInfoKHR-pProfiles-06813

`pProfiles` **must** not contain more than one element whose
`videoCodecOperation` member specifies a decode operation

Valid Usage (Implicit)

* 
[](#VUID-VkVideoProfileListInfoKHR-sType-sType) VUID-VkVideoProfileListInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_PROFILE_LIST_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoProfileListInfoKHR-pProfiles-parameter) VUID-VkVideoProfileListInfoKHR-pProfiles-parameter

 If `profileCount` is not `0`, `pProfiles` **must** be a valid pointer to an array of `profileCount` valid [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structures

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](VkBufferCreateInfo.html)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

* 
[VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html)

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkStructureType](VkStructureType.html), [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoProfileListInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
