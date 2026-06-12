# VkPhysicalDeviceDataGraphOperationTypeARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDataGraphOperationTypeARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDataGraphOperationTypeARM - Enumeration describing data graph operations

The defined data graph operations are:

// Provided by VK_ARM_data_graph
typedef enum VkPhysicalDeviceDataGraphOperationTypeARM {
    VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_SPIRV_EXTENDED_INSTRUCTION_SET_ARM = 0,
  // Provided by VK_QCOM_data_graph_model
    VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_NEURAL_MODEL_QCOM = 1000629000,
  // Provided by VK_QCOM_data_graph_model
    VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_BUILTIN_MODEL_QCOM = 1000629001,
  // Provided by VK_ARM_data_graph_optical_flow
    VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_OPTICAL_FLOW_ARM = 1000631000,
} VkPhysicalDeviceDataGraphOperationTypeARM;

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_SPIRV_EXTENDED_INSTRUCTION_SET_ARM](#)
corresponds to operations provided by a SPIR-V extended instruction set.

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_NEURAL_MODEL_QCOM](#)
specifies an operation that executes neural models provided by the
application.

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_BUILTIN_MODEL_QCOM](#)
specifies an operation that executes specialized built-in models
provided by the implementation.

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_OPTICAL_FLOW_ARM](#)
corresponds to fixed-function optical flow as defined by
`[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html)`.

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkPhysicalDeviceDataGraphOperationSupportARM](VkPhysicalDeviceDataGraphOperationSupportARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkPhysicalDeviceDataGraphOperationTypeARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
