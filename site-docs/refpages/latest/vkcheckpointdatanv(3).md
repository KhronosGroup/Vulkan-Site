# VkCheckpointDataNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCheckpointDataNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCheckpointDataNV - Return structure for command buffer checkpoint data

The [VkCheckpointDataNV](#) structure is defined as:

// Provided by VK_NV_device_diagnostic_checkpoints
typedef struct VkCheckpointDataNV {
    VkStructureType            sType;
    void*                      pNext;
    VkPipelineStageFlagBits    stage;
    void*                      pCheckpointMarker;
} VkCheckpointDataNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stage` is a [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) value specifying which
pipeline stage the checkpoint marker data refers to.

* 
`pCheckpointMarker` contains the value of the last checkpoint marker
executed in the stage that `stage` refers to.

The stages at which a checkpoint marker **can** be executed are
implementation-defined and **can** be queried by calling
[vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html).

Valid Usage (Implicit)

* 
[](#VUID-VkCheckpointDataNV-sType-sType) VUID-VkCheckpointDataNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CHECKPOINT_DATA_NV](VkStructureType.html)

* 
[](#VUID-VkCheckpointDataNV-pNext-pNext) VUID-VkCheckpointDataNV-pNext-pNext

 `pNext` **must** be `NULL`

[VK_NV_device_diagnostic_checkpoints](VK_NV_device_diagnostic_checkpoints.html), [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html), [VkStructureType](VkStructureType.html), [vkGetQueueCheckpointDataNV](vkGetQueueCheckpointDataNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkCheckpointDataNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
