# VkPhysicalDeviceDataGraphProcessingEngineTypeARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDataGraphProcessingEngineTypeARM - Enumeration describing data graph processing engines

The defined data graph processing engines are:

// Provided by VK_ARM_data_graph
typedef enum VkPhysicalDeviceDataGraphProcessingEngineTypeARM {
    VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_DEFAULT_ARM = 0,
  // Provided by VK_QCOM_data_graph_model
    VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM = 1000629000,
  // Provided by VK_QCOM_data_graph_model
    VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM = 1000629001,
} VkPhysicalDeviceDataGraphProcessingEngineTypeARM;

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_DEFAULT_ARM](#)
corresponds to the default data graph processing engine.

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](#)
specifies an engine that specializes in neural processing.

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](#)
specifies an engine that uses compute processing to execute data graphs.

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkPhysicalDeviceDataGraphProcessingEngineARM](VkPhysicalDeviceDataGraphProcessingEngineARM.html), [VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM](VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkPhysicalDeviceDataGraphProcessingEngineTypeARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
