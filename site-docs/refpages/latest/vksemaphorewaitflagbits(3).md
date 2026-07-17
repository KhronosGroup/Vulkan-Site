# VkSemaphoreWaitFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreWaitFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreWaitFlagBits - Bitmask specifying additional parameters of a semaphore wait operation

Bits which **can** be set in [VkSemaphoreWaitInfo](VkSemaphoreWaitInfo.html)::`flags`, specifying
additional parameters of a semaphore wait operation, are:

// Provided by VK_VERSION_1_2
typedef enum VkSemaphoreWaitFlagBits {
    VK_SEMAPHORE_WAIT_ANY_BIT = 0x00000001,
  // Provided by VK_KHR_timeline_semaphore
    VK_SEMAPHORE_WAIT_ANY_BIT_KHR = VK_SEMAPHORE_WAIT_ANY_BIT,
} VkSemaphoreWaitFlagBits;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkSemaphoreWaitFlagBits
typedef VkSemaphoreWaitFlagBits VkSemaphoreWaitFlagBitsKHR;

* 
[VK_SEMAPHORE_WAIT_ANY_BIT](#) specifies that the semaphore wait
condition is that at least one of the semaphores in
`VkSemaphoreWaitInfo`::`pSemaphores` has reached the value
specified by the corresponding element of
`VkSemaphoreWaitInfo`::`pValues`.
If [VK_SEMAPHORE_WAIT_ANY_BIT](#) is not set, the semaphore wait
condition is that all of the semaphores in
`VkSemaphoreWaitInfo`::`pSemaphores` have reached the value
specified by the corresponding element of
`VkSemaphoreWaitInfo`::`pValues`.

[VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkSemaphoreWaitFlags](VkSemaphoreWaitFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphoreWaitFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
