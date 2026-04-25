# VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM - Structure specifying a data graph processing engine type and queue family to query

The `VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM`
structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM {
    VkStructureType                                     sType;
    const void*                                         pNext;
    uint32_t                                            queueFamilyIndex;
    VkPhysicalDeviceDataGraphProcessingEngineTypeARM    engineType;
} VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queueFamilyIndex` specifies the queue family being queried.

* 
`engineType` is a
[VkPhysicalDeviceDataGraphProcessingEngineTypeARM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html) specifying the
engine type whose properties are being queried.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM-sType-sType) VUID-VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_QUEUE_FAMILY_DATA_GRAPH_PROCESSING_ENGINE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM-pNext-pNext) VUID-VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM-engineType-parameter) VUID-VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM-engineType-parameter

 `engineType` **must** be a valid [VkPhysicalDeviceDataGraphProcessingEngineTypeARM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html) value

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkPhysicalDeviceDataGraphProcessingEngineTypeARM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
