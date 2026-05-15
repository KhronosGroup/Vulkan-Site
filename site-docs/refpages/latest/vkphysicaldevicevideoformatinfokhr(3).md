# VkPhysicalDeviceVideoFormatInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVideoFormatInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVideoFormatInfoKHR - Structure specifying the codec video format

The `VkPhysicalDeviceVideoFormatInfoKHR` structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkPhysicalDeviceVideoFormatInfoKHR {
    VkStructureType      sType;
    const void*          pNext;
    VkImageUsageFlags    imageUsage;
} VkPhysicalDeviceVideoFormatInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageUsage` is a bitmask of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) specifying
the intended usage of the video images.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoFormatInfoKHR-sType-sType) VUID-VkPhysicalDeviceVideoFormatInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_FORMAT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceVideoFormatInfoKHR-pNext-pNext) VUID-VkPhysicalDeviceVideoFormatInfoKHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)

* 
[](#VUID-VkPhysicalDeviceVideoFormatInfoKHR-sType-unique) VUID-VkPhysicalDeviceVideoFormatInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPhysicalDeviceVideoFormatInfoKHR-imageUsage-parameter) VUID-VkPhysicalDeviceVideoFormatInfoKHR-imageUsage-parameter

 `imageUsage` **must** be a valid combination of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) values

* 
[](#VUID-VkPhysicalDeviceVideoFormatInfoKHR-imageUsage-requiredbitmask) VUID-VkPhysicalDeviceVideoFormatInfoKHR-imageUsage-requiredbitmask

 `imageUsage` **must** not be `0`

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkPhysicalDeviceVideoFormatInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
