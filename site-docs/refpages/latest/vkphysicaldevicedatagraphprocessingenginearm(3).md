# VkPhysicalDeviceDataGraphProcessingEngineARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDataGraphProcessingEngineARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDataGraphProcessingEngineARM - Structure describing a data graph processing engine supported by a physical device

The `VkPhysicalDeviceDataGraphProcessingEngineARM` structure is defined
as:

// Provided by VK_ARM_data_graph
typedef struct VkPhysicalDeviceDataGraphProcessingEngineARM {
    VkPhysicalDeviceDataGraphProcessingEngineTypeARM    type;
    VkBool32                                            isForeign;
} VkPhysicalDeviceDataGraphProcessingEngineARM;

* 
`type` is a [VkPhysicalDeviceDataGraphProcessingEngineTypeARM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html)
that specifies the type of the processing engine.

* 
`isForeign` specifies whether the processing engine is foreign.

[VK_ARM_data_graph](VK_ARM_data_graph.html), `VkBool32`, [VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html), [VkPhysicalDeviceDataGraphProcessingEngineTypeARM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html), [VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkPhysicalDeviceDataGraphProcessingEngineARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
