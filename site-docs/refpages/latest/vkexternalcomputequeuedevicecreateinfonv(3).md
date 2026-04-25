# VkExternalComputeQueueDeviceCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalComputeQueueDeviceCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalComputeQueueDeviceCreateInfoNV - Structure specifying information about external compute queues relevant to device creation

The `VkExternalComputeQueueDeviceCreateInfoNV` structure is defined as:

// Provided by VK_NV_external_compute_queue
typedef struct VkExternalComputeQueueDeviceCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           reservedExternalQueues;
} VkExternalComputeQueueDeviceCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`reservedExternalQueues` is the maximum number of external queues an
application **can** create at once.
This **must** be less than or equal to the `maxExternalQueues` value
reported by [VkPhysicalDeviceExternalComputeQueuePropertiesNV](VkPhysicalDeviceExternalComputeQueuePropertiesNV.html)

Valid Usage (Implicit)

* 
[](#VUID-VkExternalComputeQueueDeviceCreateInfoNV-sType-sType) VUID-VkExternalComputeQueueDeviceCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_COMPUTE_QUEUE_DEVICE_CREATE_INFO_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

[VK_NV_external_compute_queue](VK_NV_external_compute_queue.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_external_compute_queue/VK_NV_external_compute_queue.html#VkExternalComputeQueueDeviceCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
