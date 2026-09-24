# VkQueueFamilyVideoPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFamilyVideoPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFamilyVideoPropertiesKHR - Structure describing video codec operations supported by a queue family

The [VkQueueFamilyVideoPropertiesKHR](#) structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkQueueFamilyVideoPropertiesKHR {
    VkStructureType                  sType;
    void*                            pNext;
    VkVideoCodecOperationFlagsKHR    videoCodecOperations;
} VkQueueFamilyVideoPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`videoCodecOperations` is a bitmask of
[VkVideoCodecOperationFlagBitsKHR](VkVideoCodecOperationFlagBitsKHR.html) that indicates the set of video
codec operations supported by the queue family.

If this structure is included in the `pNext` chain of the
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html) structure passed to
[vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html), then it is filled with the
set of video codec operations supported by the specified queue family.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyVideoPropertiesKHR-sType-sType) VUID-VkQueueFamilyVideoPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_VIDEO_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html)

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkStructureType](VkStructureType.html), [VkVideoCodecOperationFlagsKHR](VkVideoCodecOperationFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFamilyVideoPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
