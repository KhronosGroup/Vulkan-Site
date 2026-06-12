# VkSemaphoreWaitInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreWaitInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreWaitInfo - Structure containing information about the semaphore wait condition

The `VkSemaphoreWaitInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkSemaphoreWaitInfo {
    VkStructureType         sType;
    const void*             pNext;
    VkSemaphoreWaitFlags    flags;
    uint32_t                semaphoreCount;
    const VkSemaphore*      pSemaphores;
    const uint64_t*         pValues;
} VkSemaphoreWaitInfo;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkSemaphoreWaitInfo
typedef VkSemaphoreWaitInfo VkSemaphoreWaitInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkSemaphoreWaitFlagBits](VkSemaphoreWaitFlagBits.html) specifying
additional parameters for the semaphore wait operation.

* 
`semaphoreCount` is the number of semaphores to wait on.

* 
`pSemaphores` is a pointer to an array of `semaphoreCount`
semaphore handles to wait on.

* 
`pValues` is a pointer to an array of `semaphoreCount` timeline
semaphore values.

Valid Usage

* 
[](#VUID-VkSemaphoreWaitInfo-pSemaphores-03256) VUID-VkSemaphoreWaitInfo-pSemaphores-03256

All of the elements of `pSemaphores` **must** reference a semaphore
that was created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreWaitInfo-sType-sType) VUID-VkSemaphoreWaitInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_WAIT_INFO](VkStructureType.html)

* 
[](#VUID-VkSemaphoreWaitInfo-pNext-pNext) VUID-VkSemaphoreWaitInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSemaphoreWaitInfo-flags-parameter) VUID-VkSemaphoreWaitInfo-flags-parameter

 `flags` **must** be a valid combination of [VkSemaphoreWaitFlagBits](VkSemaphoreWaitFlagBits.html) values

* 
[](#VUID-VkSemaphoreWaitInfo-pSemaphores-parameter) VUID-VkSemaphoreWaitInfo-pSemaphores-parameter

 `pSemaphores` **must** be a valid pointer to an array of `semaphoreCount` valid [VkSemaphore](VkSemaphore.html) handles

* 
[](#VUID-VkSemaphoreWaitInfo-pValues-parameter) VUID-VkSemaphoreWaitInfo-pValues-parameter

 `pValues` **must** be a valid pointer to an array of `semaphoreCount` `uint64_t` values

* 
[](#VUID-VkSemaphoreWaitInfo-semaphoreCount-arraylength) VUID-VkSemaphoreWaitInfo-semaphoreCount-arraylength

 `semaphoreCount` **must** be greater than `0`

[VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkSemaphore](VkSemaphore.html), [VkSemaphoreWaitFlags](VkSemaphoreWaitFlags.html), [VkStructureType](VkStructureType.html), [vkWaitSemaphores](vkWaitSemaphores.html), [vkWaitSemaphores](vkWaitSemaphores.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphoreWaitInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
