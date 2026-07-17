# VkSemaphoreSignalInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreSignalInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreSignalInfo - Structure containing information about a semaphore signal operation

The `VkSemaphoreSignalInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkSemaphoreSignalInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkSemaphore        semaphore;
    uint64_t           value;
} VkSemaphoreSignalInfo;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkSemaphoreSignalInfo
typedef VkSemaphoreSignalInfo VkSemaphoreSignalInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is the handle of the semaphore to signal.

* 
`value` is the value to signal.

Valid Usage

* 
[](#VUID-VkSemaphoreSignalInfo-semaphore-03257) VUID-VkSemaphoreSignalInfo-semaphore-03257

`semaphore` **must** have been created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html)

* 
[](#VUID-VkSemaphoreSignalInfo-value-03258) VUID-VkSemaphoreSignalInfo-value-03258

`value` **must** have a value greater than the current value of the
semaphore

* 
[](#VUID-VkSemaphoreSignalInfo-value-03259) VUID-VkSemaphoreSignalInfo-value-03259

`value` **must** be less than the value of any pending semaphore signal
operations

* 
[](#VUID-VkSemaphoreSignalInfo-value-03260) VUID-VkSemaphoreSignalInfo-value-03260

`value` **must** have a value which does not differ from the current
value of the semaphore or the value of any outstanding semaphore wait or
signal operation on `semaphore` by more than
[    `maxTimelineSemaphoreValueDifference`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxTimelineSemaphoreValueDifference)

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreSignalInfo-sType-sType) VUID-VkSemaphoreSignalInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_SIGNAL_INFO](VkStructureType.html)

* 
[](#VUID-VkSemaphoreSignalInfo-pNext-pNext) VUID-VkSemaphoreSignalInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSemaphoreSignalInfo-semaphore-parameter) VUID-VkSemaphoreSignalInfo-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

[VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkSemaphore](VkSemaphore.html), [VkStructureType](VkStructureType.html), [vkSignalSemaphore](vkSignalSemaphore.html), [vkSignalSemaphore](vkSignalSemaphore.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphoreSignalInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
