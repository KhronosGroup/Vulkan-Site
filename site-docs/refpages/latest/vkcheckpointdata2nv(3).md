# VkCheckpointData2NV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCheckpointData2NV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCheckpointData2NV - Return structure for command buffer checkpoint data

The [VkCheckpointData2NV](#) structure is defined as:

// Provided by VK_NV_device_diagnostic_checkpoints with VK_VERSION_1_3 or VK_KHR_synchronization2
typedef struct VkCheckpointData2NV {
    VkStructureType          sType;
    void*                    pNext;
    VkPipelineStageFlags2    stage;
    void*                    pCheckpointMarker;
} VkCheckpointData2NV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stage` indicates a single pipeline stage which the checkpoint
marker data refers to.

* 
`pCheckpointMarker` contains the value of the last checkpoint marker
executed in the stage that `stage` refers to.

Valid Usage (Implicit)

* 
[](#VUID-VkCheckpointData2NV-sType-sType) VUID-VkCheckpointData2NV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CHECKPOINT_DATA_2_NV](VkStructureType.html)

* 
[](#VUID-VkCheckpointData2NV-pNext-pNext) VUID-VkCheckpointData2NV-pNext-pNext

 `pNext` **must** be `NULL`

The stages at which a checkpoint marker **can** be executed are
implementation-defined and **can** be queried by calling
[vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html).

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_NV_device_diagnostic_checkpoints](VK_NV_device_diagnostic_checkpoints.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkPipelineStageFlags2](VkPipelineStageFlags2.html), [VkStructureType](VkStructureType.html), [vkGetQueueCheckpointData2NV](vkGetQueueCheckpointData2NV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkCheckpointData2NV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
