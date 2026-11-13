# VkQueueFamilyCheckpointProperties2NV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFamilyCheckpointProperties2NV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFamilyCheckpointProperties2NV - Return structure for queue family checkpoint information query

The [VkQueueFamilyCheckpointProperties2NV](#) structure is defined as:

// Provided by VK_NV_device_diagnostic_checkpoints with VK_VERSION_1_3 or VK_KHR_synchronization2
typedef struct VkQueueFamilyCheckpointProperties2NV {
    VkStructureType          sType;
    void*                    pNext;
    VkPipelineStageFlags2    checkpointExecutionStageMask;
} VkQueueFamilyCheckpointProperties2NV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`checkpointExecutionStageMask` is a mask indicating which pipeline
stages the implementation can execute checkpoint markers in.

Additional queue family information can be queried by setting
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html)::`pNext` to point to a
`VkQueueFamilyCheckpointProperties2NV` structure.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyCheckpointProperties2NV-sType-sType) VUID-VkQueueFamilyCheckpointProperties2NV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_CHECKPOINT_PROPERTIES_2_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html)

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_NV_device_diagnostic_checkpoints](VK_NV_device_diagnostic_checkpoints.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkPipelineStageFlags2](VkPipelineStageFlags2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFamilyCheckpointProperties2NV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
