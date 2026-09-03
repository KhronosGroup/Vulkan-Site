# VkQueueFamilyDataGraphPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFamilyDataGraphPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFamilyDataGraphPropertiesARM - Structure describing a data graph processing engine and operation it supports

The `VkQueueFamilyDataGraphPropertiesARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkQueueFamilyDataGraphPropertiesARM {
    VkStructureType                                 sType;
    void*                                           pNext;
    VkPhysicalDeviceDataGraphProcessingEngineARM    engine;
    VkPhysicalDeviceDataGraphOperationSupportARM    operation;
} VkQueueFamilyDataGraphPropertiesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`engine` is a [VkPhysicalDeviceDataGraphProcessingEngineARM](VkPhysicalDeviceDataGraphProcessingEngineARM.html)
structure describing a data graph processing engine.

* 
`operation` is a [VkPhysicalDeviceDataGraphOperationSupportARM](VkPhysicalDeviceDataGraphOperationSupportARM.html)
structure describing one or more operations supported by a data graph
processing engine.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyDataGraphPropertiesARM-sType-sType) VUID-VkQueueFamilyDataGraphPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_DATA_GRAPH_PROPERTIES_ARM](VkStructureType.html)

* 
[](#VUID-VkQueueFamilyDataGraphPropertiesARM-pNext-pNext) VUID-VkQueueFamilyDataGraphPropertiesARM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkPhysicalDeviceDataGraphOperationSupportARM](VkPhysicalDeviceDataGraphOperationSupportARM.html), [VkPhysicalDeviceDataGraphProcessingEngineARM](VkPhysicalDeviceDataGraphProcessingEngineARM.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM.html), [vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM](vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM.html), [vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkQueueFamilyDataGraphPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
