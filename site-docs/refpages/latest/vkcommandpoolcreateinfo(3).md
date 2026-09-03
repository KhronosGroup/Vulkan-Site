# VkCommandPoolCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandPoolCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandPoolCreateInfo - Structure specifying parameters of a newly created command pool

The `VkCommandPoolCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkCommandPoolCreateInfo {
    VkStructureType             sType;
    const void*                 pNext;
    VkCommandPoolCreateFlags    flags;
    uint32_t                    queueFamilyIndex;
} VkCommandPoolCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkCommandPoolCreateFlagBits](VkCommandPoolCreateFlagBits.html) indicating
usage behavior for the pool and command buffers allocated from it.

* 
`queueFamilyIndex` designates a queue family as described in section
[Queue Family Properties](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-queueprops).
All command buffers allocated from this command pool **must** be submitted
on queues from the same queue family.

Valid Usage

* 
[](#VUID-VkCommandPoolCreateInfo-flags-02860) VUID-VkCommandPoolCreateInfo-flags-02860

If the [`protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory) feature is
not enabled, the [VK_COMMAND_POOL_CREATE_PROTECTED_BIT](VkCommandPoolCreateFlagBits.html) bit of
`flags` **must** not be set

* 
[](#VUID-VkCommandPoolCreateInfo-pNext-09908) VUID-VkCommandPoolCreateInfo-pNext-09908

If the `pNext` chain includes a
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) structure, then
`queueFamilyIndex` **must** designate a queue family that supports
[VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html)

* 
[](#VUID-VkCommandPoolCreateInfo-pNext-09909) VUID-VkCommandPoolCreateInfo-pNext-09909

If the `pNext` chain includes a
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) structure, each member of
`pProcessingEngines` **must** be identical to
[VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html)::`engine` retrieved from
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html) with
`queueFamilyIndex` and the `physicalDevice` that was used to
create `device`

* 
[](#VUID-VkCommandPoolCreateInfo-queueFamilyIndex-11830) VUID-VkCommandPoolCreateInfo-queueFamilyIndex-11830

If `queueFamilyIndex` designates a queue family that supports
[VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html) and enumerates a foreign engine
through [vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html) with
type
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html)
or
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html),
the `pNext` chain must include
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) with
[VkPhysicalDeviceDataGraphProcessingEngineARM](VkPhysicalDeviceDataGraphProcessingEngineARM.html)::`isForeign` set
to [VK_TRUE](VK_TRUE.html) for all elements of `pProcessingEngines`

Valid Usage (Implicit)

* 
[](#VUID-VkCommandPoolCreateInfo-sType-sType) VUID-VkCommandPoolCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_POOL_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkCommandPoolCreateInfo-pNext-pNext) VUID-VkCommandPoolCreateInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html)

* 
[](#VUID-VkCommandPoolCreateInfo-sType-unique) VUID-VkCommandPoolCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkCommandPoolCreateInfo-flags-parameter) VUID-VkCommandPoolCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkCommandPoolCreateFlagBits](VkCommandPoolCreateFlagBits.html) values

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandPoolCreateFlags](VkCommandPoolCreateFlags.html), [VkStructureType](VkStructureType.html), [vkCreateCommandPool](vkCreateCommandPool.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandPoolCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
