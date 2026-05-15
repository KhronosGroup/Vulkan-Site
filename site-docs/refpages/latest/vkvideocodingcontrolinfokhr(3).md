# VkVideoCodingControlInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoCodingControlInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoCodingControlInfoKHR - Structure specifying video coding control parameters

The `VkVideoCodingControlInfoKHR` structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkVideoCodingControlInfoKHR {
    VkStructureType                 sType;
    const void*                     pNext;
    VkVideoCodingControlFlagsKHR    flags;
} VkVideoCodingControlInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkVideoCodingControlFlagsKHR](VkVideoCodingControlFlagsKHR.html)
specifying control flags.

Valid Usage

* 
[](#VUID-VkVideoCodingControlInfoKHR-flags-07018) VUID-VkVideoCodingControlInfoKHR-flags-07018

If `flags` includes
[VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html), then the
`pNext` chain **must** include a [VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html)
structure

* 
[](#VUID-VkVideoCodingControlInfoKHR-flags-08349) VUID-VkVideoCodingControlInfoKHR-flags-08349

If `flags` includes
[VK_VIDEO_CODING_CONTROL_ENCODE_QUALITY_LEVEL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html), then the
`pNext` chain **must** include a [VkVideoEncodeQualityLevelInfoKHR](VkVideoEncodeQualityLevelInfoKHR.html)
structure

Valid Usage (Implicit)

* 
[](#VUID-VkVideoCodingControlInfoKHR-sType-sType) VUID-VkVideoCodingControlInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_CODING_CONTROL_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoCodingControlInfoKHR-pNext-pNext) VUID-VkVideoCodingControlInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoEncodeAV1RateControlInfoKHR](VkVideoEncodeAV1RateControlInfoKHR.html), [VkVideoEncodeH264RateControlInfoKHR](VkVideoEncodeH264RateControlInfoKHR.html), [VkVideoEncodeH265RateControlInfoKHR](VkVideoEncodeH265RateControlInfoKHR.html), [VkVideoEncodeQualityLevelInfoKHR](VkVideoEncodeQualityLevelInfoKHR.html), or [VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html)

* 
[](#VUID-VkVideoCodingControlInfoKHR-sType-unique) VUID-VkVideoCodingControlInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkVideoCodingControlInfoKHR-flags-parameter) VUID-VkVideoCodingControlInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkVideoCodingControlFlagBitsKHR](VkVideoCodingControlFlagBitsKHR.html) values

* 
[](#VUID-VkVideoCodingControlInfoKHR-flags-requiredbitmask) VUID-VkVideoCodingControlInfoKHR-flags-requiredbitmask

 `flags` **must** not be `0`

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkStructureType](VkStructureType.html), [VkVideoCodingControlFlagsKHR](VkVideoCodingControlFlagsKHR.html), [vkCmdControlVideoCodingKHR](vkCmdControlVideoCodingKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoCodingControlInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
