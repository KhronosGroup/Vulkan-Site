# VkExternalComputeQueueCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalComputeQueueCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalComputeQueueCreateInfoNV - Structure specifying configuration parameters for external compute queue creation

The `VkExternalComputeQueueCreateInfoNV` structure is defined as:

// Provided by VK_NV_external_compute_queue
typedef struct VkExternalComputeQueueCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkQueue            preferredQueue;
} VkExternalComputeQueueCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`preferredQueue` is a `VkQueue` supporting graphics commands.

When creating a `VkExternalComputeQueueNV`, the `preferredQueue`
field is a strong scheduling hint as to which `VkQueue` Vulkan graphics
workloads will be submitted to with the expectation that execution will
overlap with execution of work submitted by the external API.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalComputeQueueCreateInfoNV-sType-sType) VUID-VkExternalComputeQueueCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_COMPUTE_QUEUE_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkExternalComputeQueueCreateInfoNV-pNext-pNext) VUID-VkExternalComputeQueueCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkExternalComputeQueueCreateInfoNV-preferredQueue-parameter) VUID-VkExternalComputeQueueCreateInfoNV-preferredQueue-parameter

 `preferredQueue` **must** be a valid [VkQueue](VkQueue.html) handle

[VK_NV_external_compute_queue](VK_NV_external_compute_queue.html), [VkQueue](VkQueue.html), [VkStructureType](VkStructureType.html), [vkCreateExternalComputeQueueNV](vkCreateExternalComputeQueueNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_external_compute_queue/VK_NV_external_compute_queue.html#VkExternalComputeQueueCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
