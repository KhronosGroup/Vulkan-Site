# VkLatencySleepInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLatencySleepInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLatencySleepInfoNV - Structure specifying the parameters of vkLatencySleepNV

The `VkLatencySleepInfoNV` structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkLatencySleepInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkSemaphore        signalSemaphore;
    uint64_t           value;
} VkLatencySleepInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`signalSemaphore` is a semaphore that is signaled to indicate that
the application **should** resume input sampling work.

* 
`value` is the value that `signalSemaphore` is set to for
resuming sampling work.

Valid Usage

* 
[](#VUID-VkLatencySleepInfoNV-signalSemaphore-09361) VUID-VkLatencySleepInfoNV-signalSemaphore-09361

`signalSemaphore` **must** be a timeline semaphore

Valid Usage (Implicit)

* 
[](#VUID-VkLatencySleepInfoNV-sType-sType) VUID-VkLatencySleepInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_LATENCY_SLEEP_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkLatencySleepInfoNV-signalSemaphore-parameter) VUID-VkLatencySleepInfoNV-signalSemaphore-parameter

 `signalSemaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkSemaphore](VkSemaphore.html), [VkStructureType](VkStructureType.html), [vkLatencySleepNV](vkLatencySleepNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkLatencySleepInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
