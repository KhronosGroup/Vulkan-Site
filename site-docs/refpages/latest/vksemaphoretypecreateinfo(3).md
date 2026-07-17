# VkSemaphoreTypeCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreTypeCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreTypeCreateInfo - Structure specifying the type of a newly created semaphore

The `VkSemaphoreTypeCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkSemaphoreTypeCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkSemaphoreType    semaphoreType;
    uint64_t           initialValue;
} VkSemaphoreTypeCreateInfo;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkSemaphoreTypeCreateInfo
typedef VkSemaphoreTypeCreateInfo VkSemaphoreTypeCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphoreType` is a [VkSemaphoreType](VkSemaphoreType.html) value specifying the type
of the semaphore.

* 
`initialValue` is the initial payload value if `semaphoreType`
is [VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html).

To create a semaphore of a specific type, add a
`VkSemaphoreTypeCreateInfo` structure to the
[VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html)::`pNext` chain.

If no `VkSemaphoreTypeCreateInfo` structure is included in the
`pNext` chain of [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html), then the created semaphore
will have a default [VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_BINARY](VkSemaphoreType.html).

Valid Usage

* 
[](#VUID-VkSemaphoreTypeCreateInfo-timelineSemaphore-03252) VUID-VkSemaphoreTypeCreateInfo-timelineSemaphore-03252

If the [`timelineSemaphore`](../../../../spec/latest/chapters/features.html#features-timelineSemaphore) feature
is not enabled, `semaphoreType` **must** not equal
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html)

* 
[](#VUID-VkSemaphoreTypeCreateInfo-semaphoreType-03279) VUID-VkSemaphoreTypeCreateInfo-semaphoreType-03279

If `semaphoreType` is [VK_SEMAPHORE_TYPE_BINARY](VkSemaphoreType.html),
`initialValue` **must** be zero

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreTypeCreateInfo-sType-sType) VUID-VkSemaphoreTypeCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_TYPE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkSemaphoreTypeCreateInfo-semaphoreType-parameter) VUID-VkSemaphoreTypeCreateInfo-semaphoreType-parameter

 `semaphoreType` **must** be a valid [VkSemaphoreType](VkSemaphoreType.html) value

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceExternalSemaphoreInfo](VkPhysicalDeviceExternalSemaphoreInfo.html)

* 
[VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html)

[VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkSemaphoreType](VkSemaphoreType.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphoreTypeCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
