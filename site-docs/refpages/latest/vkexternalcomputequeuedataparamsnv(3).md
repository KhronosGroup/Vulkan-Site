# VkExternalComputeQueueDataParamsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalComputeQueueDataParamsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalComputeQueueDataParamsNV - Structure specifying parameters for implementation-specific data retrieval from the external compute queue

The `VkExternalComputeQueueDataParamsNV` structure is defined as:

// Provided by VK_NV_external_compute_queue
typedef struct VkExternalComputeQueueDataParamsNV {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           deviceIndex;
} VkExternalComputeQueueDataParamsNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceIndex` is the index of the device within a device group that
the data is being queried for.
This is ignored if device groups are not utilized.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalComputeQueueDataParamsNV-sType-sType) VUID-VkExternalComputeQueueDataParamsNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_COMPUTE_QUEUE_DATA_PARAMS_NV](VkStructureType.html)

* 
[](#VUID-VkExternalComputeQueueDataParamsNV-pNext-pNext) VUID-VkExternalComputeQueueDataParamsNV-pNext-pNext

 `pNext` **must** be `NULL`

[VK_NV_external_compute_queue](VK_NV_external_compute_queue.html), [VkStructureType](VkStructureType.html), [vkGetExternalComputeQueueDataNV](vkGetExternalComputeQueueDataNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_external_compute_queue/VK_NV_external_compute_queue.html#VkExternalComputeQueueDataParamsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
