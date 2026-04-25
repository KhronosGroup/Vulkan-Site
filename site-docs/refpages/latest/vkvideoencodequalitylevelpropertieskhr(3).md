# VkVideoEncodeQualityLevelPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeQualityLevelPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeQualityLevelPropertiesKHR - Structure describing the video encode quality level properties

The `VkVideoEncodeQualityLevelPropertiesKHR` structure is defined as:

// Provided by VK_KHR_video_encode_queue
typedef struct VkVideoEncodeQualityLevelPropertiesKHR {
    VkStructureType                            sType;
    void*                                      pNext;
    VkVideoEncodeRateControlModeFlagBitsKHR    preferredRateControlMode;
    uint32_t                                   preferredRateControlLayerCount;
} VkVideoEncodeQualityLevelPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`preferredRateControlMode` is a
[VkVideoEncodeRateControlModeFlagBitsKHR](VkVideoEncodeRateControlModeFlagBitsKHR.html) value indicating the
preferred [rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) to use with
the video encode quality level.

* 
`preferredRateControlLayerCount` indicates the preferred number of
[rate control layers](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-layers) to use with the video
encode quality level.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeQualityLevelPropertiesKHR-sType-sType) VUID-VkVideoEncodeQualityLevelPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUALITY_LEVEL_PROPERTIES_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeQualityLevelPropertiesKHR-pNext-pNext) VUID-VkVideoEncodeQualityLevelPropertiesKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoEncodeAV1QualityLevelPropertiesKHR](VkVideoEncodeAV1QualityLevelPropertiesKHR.html), [VkVideoEncodeH264QualityLevelPropertiesKHR](VkVideoEncodeH264QualityLevelPropertiesKHR.html), or [VkVideoEncodeH265QualityLevelPropertiesKHR](VkVideoEncodeH265QualityLevelPropertiesKHR.html)

* 
[](#VUID-VkVideoEncodeQualityLevelPropertiesKHR-sType-unique) VUID-VkVideoEncodeQualityLevelPropertiesKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeRateControlModeFlagBitsKHR](VkVideoEncodeRateControlModeFlagBitsKHR.html), [vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR](vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeQualityLevelPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
