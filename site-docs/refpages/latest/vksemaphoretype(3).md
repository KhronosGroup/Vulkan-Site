# VkSemaphoreType(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreType.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreType - Specifies the type of a semaphore object

Possible values of [VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html)::`semaphoreType`,
specifying the type of a semaphore, are:

// Provided by VK_VERSION_1_2
typedef enum VkSemaphoreType {
    VK_SEMAPHORE_TYPE_BINARY = 0,
    VK_SEMAPHORE_TYPE_TIMELINE = 1,
  // Provided by VK_KHR_timeline_semaphore
    VK_SEMAPHORE_TYPE_BINARY_KHR = VK_SEMAPHORE_TYPE_BINARY,
  // Provided by VK_KHR_timeline_semaphore
    VK_SEMAPHORE_TYPE_TIMELINE_KHR = VK_SEMAPHORE_TYPE_TIMELINE,
} VkSemaphoreType;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkSemaphoreType
typedef VkSemaphoreType VkSemaphoreTypeKHR;

* 
[VK_SEMAPHORE_TYPE_BINARY](#) specifies a *binary semaphore* type that
has a boolean payload indicating whether the semaphore is currently
signaled or unsignaled.
When created, the semaphore is in the unsignaled state.

* 
[VK_SEMAPHORE_TYPE_TIMELINE](#) specifies a *timeline semaphore* type
that has a strictly increasing 64-bit unsigned integer payload
indicating whether the semaphore is signaled with respect to a
particular reference value.
When created, the semaphore payload has the value given by the
`initialValue` field of [VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html).

[VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphoreType).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
