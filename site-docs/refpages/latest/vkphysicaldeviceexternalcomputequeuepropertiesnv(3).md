# VkPhysicalDeviceExternalComputeQueuePropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExternalComputeQueuePropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExternalComputeQueuePropertiesNV - Structure specifying hardware specific information and limits for VK_NV_external_compute_queue functionality

The `VkPhysicalDeviceExternalComputeQueuePropertiesNV` structure is
defined as:

// Provided by VK_NV_external_compute_queue
typedef struct VkPhysicalDeviceExternalComputeQueuePropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           externalDataSize;
    uint32_t           maxExternalQueues;
} VkPhysicalDeviceExternalComputeQueuePropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalDataSize` is the minimum size of the memory allocation that
applications **can** pass to [vkGetExternalComputeQueueDataNV](vkGetExternalComputeQueueDataNV.html).

* 
`maxExternalQueues` is the maximum number of external queues that an
application can create.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalComputeQueuePropertiesNV-sType-sType) VUID-VkPhysicalDeviceExternalComputeQueuePropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_COMPUTE_QUEUE_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_external_compute_queue](VK_NV_external_compute_queue.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_external_compute_queue/VK_NV_external_compute_queue.html#VkPhysicalDeviceExternalComputeQueuePropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
