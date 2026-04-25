# VkTimelineSemaphoreSubmitInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTimelineSemaphoreSubmitInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTimelineSemaphoreSubmitInfo - Structure specifying signal and wait values for timeline semaphores

To specify the values to use when waiting for and signaling semaphores
created with a [VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html),
add a [VkTimelineSemaphoreSubmitInfo](#) structure to the `pNext` chain
of the [VkSubmitInfo](VkSubmitInfo.html) structure when using [vkQueueSubmit](vkQueueSubmit.html)
or the [VkBindSparseInfo](VkBindSparseInfo.html) structure when using [vkQueueBindSparse](vkQueueBindSparse.html)
.
The `VkTimelineSemaphoreSubmitInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkTimelineSemaphoreSubmitInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           waitSemaphoreValueCount;
    const uint64_t*    pWaitSemaphoreValues;
    uint32_t           signalSemaphoreValueCount;
    const uint64_t*    pSignalSemaphoreValues;
} VkTimelineSemaphoreSubmitInfo;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkTimelineSemaphoreSubmitInfo
typedef VkTimelineSemaphoreSubmitInfo VkTimelineSemaphoreSubmitInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`waitSemaphoreValueCount` is the number of semaphore wait values
specified in `pWaitSemaphoreValues`.

* 
`pWaitSemaphoreValues` is a pointer to an array of
`waitSemaphoreValueCount` values for the corresponding semaphores in
[VkSubmitInfo](VkSubmitInfo.html)::`pWaitSemaphores` to wait for.

* 
`signalSemaphoreValueCount` is the number of semaphore signal values
specified in `pSignalSemaphoreValues`.

* 
`pSignalSemaphoreValues` is a pointer to an array
`signalSemaphoreValueCount` values for the corresponding semaphores
in [VkSubmitInfo](VkSubmitInfo.html)::`pSignalSemaphores` to set when signaled.

If the semaphore in [VkSubmitInfo](VkSubmitInfo.html)::`pWaitSemaphores` or
[VkSubmitInfo](VkSubmitInfo.html)::`pSignalSemaphores` corresponding to an entry in
`pWaitSemaphoreValues` or `pSignalSemaphoreValues` respectively was
not created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html), the implementation **must** ignore the value
in the `pWaitSemaphoreValues` or `pSignalSemaphoreValues` entry.

Valid Usage (Implicit)

* 
[](#VUID-VkTimelineSemaphoreSubmitInfo-sType-sType) VUID-VkTimelineSemaphoreSubmitInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TIMELINE_SEMAPHORE_SUBMIT_INFO](VkStructureType.html)

* 
[](#VUID-VkTimelineSemaphoreSubmitInfo-pWaitSemaphoreValues-parameter) VUID-VkTimelineSemaphoreSubmitInfo-pWaitSemaphoreValues-parameter

 If `waitSemaphoreValueCount` is not `0`, and `pWaitSemaphoreValues` is not `NULL`, `pWaitSemaphoreValues` **must** be a valid pointer to an array of `waitSemaphoreValueCount` `uint64_t` values

* 
[](#VUID-VkTimelineSemaphoreSubmitInfo-pSignalSemaphoreValues-parameter) VUID-VkTimelineSemaphoreSubmitInfo-pSignalSemaphoreValues-parameter

 If `signalSemaphoreValueCount` is not `0`, and `pSignalSemaphoreValues` is not `NULL`, `pSignalSemaphoreValues` **must** be a valid pointer to an array of `signalSemaphoreValueCount` `uint64_t` values

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindSparseInfo](VkBindSparseInfo.html)

* 
[VkSubmitInfo](VkSubmitInfo.html)

[VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkTimelineSemaphoreSubmitInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
