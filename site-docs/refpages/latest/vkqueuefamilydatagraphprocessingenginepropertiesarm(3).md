# VkQueueFamilyDataGraphProcessingEnginePropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFamilyDataGraphProcessingEnginePropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFamilyDataGraphProcessingEnginePropertiesARM - Structure describing the properties of a data graph processing engine type for a given queue family

The `VkQueueFamilyDataGraphProcessingEnginePropertiesARM` structure is
defined as:

// Provided by VK_ARM_data_graph
typedef struct VkQueueFamilyDataGraphProcessingEnginePropertiesARM {
    VkStructureType                       sType;
    void*                                 pNext;
    VkExternalSemaphoreHandleTypeFlags    foreignSemaphoreHandleTypes;
    VkExternalMemoryHandleTypeFlags       foreignMemoryHandleTypes;
} VkQueueFamilyDataGraphProcessingEnginePropertiesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`foreignSemaphoreHandleTypes` is a
[VkExternalSemaphoreHandleTypeFlags](VkExternalSemaphoreHandleTypeFlags.html) that describes the external
semaphore handle types supported by a foreign data graph processing
engine.

* 
`foreignMemoryHandleTypes` is a
[VkExternalMemoryHandleTypeFlags](VkExternalMemoryHandleTypeFlags.html) that describes the external memory
handle types supported by a foreign data graph processing engine.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyDataGraphProcessingEnginePropertiesARM-sType-sType) VUID-VkQueueFamilyDataGraphProcessingEnginePropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_DATA_GRAPH_PROCESSING_ENGINE_PROPERTIES_ARM](VkStructureType.html)

* 
[](#VUID-VkQueueFamilyDataGraphProcessingEnginePropertiesARM-pNext-pNext) VUID-VkQueueFamilyDataGraphProcessingEnginePropertiesARM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkExternalMemoryHandleTypeFlags](VkExternalMemoryHandleTypeFlags.html), [VkExternalSemaphoreHandleTypeFlags](VkExternalSemaphoreHandleTypeFlags.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkQueueFamilyDataGraphProcessingEnginePropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
