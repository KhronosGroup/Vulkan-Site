# VkQueueFamilyCheckpointPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFamilyCheckpointPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFamilyCheckpointPropertiesNV - Return structure for queue family checkpoint information query

The [VkQueueFamilyCheckpointPropertiesNV](#) structure is defined as:

// Provided by VK_NV_device_diagnostic_checkpoints
typedef struct VkQueueFamilyCheckpointPropertiesNV {
    VkStructureType         sType;
    void*                   pNext;
    VkPipelineStageFlags    checkpointExecutionStageMask;
} VkQueueFamilyCheckpointPropertiesNV;

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
`VkQueueFamilyCheckpointPropertiesNV` structure.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyCheckpointPropertiesNV-sType-sType) VUID-VkQueueFamilyCheckpointPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_CHECKPOINT_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html)

[VK_NV_device_diagnostic_checkpoints](VK_NV_device_diagnostic_checkpoints.html), [VkPipelineStageFlags](VkPipelineStageFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFamilyCheckpointPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
