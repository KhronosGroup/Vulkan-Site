# VkSemaphoreWaitFlags(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreWaitFlags.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreWaitFlags - Bitmask of VkSemaphoreWaitFlagBits

// Provided by VK_VERSION_1_2
typedef VkFlags VkSemaphoreWaitFlags;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkSemaphoreWaitFlags
typedef VkSemaphoreWaitFlags VkSemaphoreWaitFlagsKHR;

`VkSemaphoreWaitFlags` is a bitmask type for setting a mask of zero or
more [VkSemaphoreWaitFlagBits](VkSemaphoreWaitFlagBits.html).

[VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), `VkFlags`, [VkSemaphoreWaitFlagBits](VkSemaphoreWaitFlagBits.html), [VkSemaphoreWaitInfo](VkSemaphoreWaitInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphoreWaitFlags).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
