# VkDataGraphProcessingEngineCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphProcessingEngineCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphProcessingEngineCreateInfoARM - Structure describing a collection of data graph processing engines for which the object being created is specialized

The `VkDataGraphProcessingEngineCreateInfoARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphProcessingEngineCreateInfoARM {
    VkStructureType                                  sType;
    const void*                                      pNext;
    uint32_t                                         processingEngineCount;
    VkPhysicalDeviceDataGraphProcessingEngineARM*    pProcessingEngines;
} VkDataGraphProcessingEngineCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`processingEngineCount` is the number of elements in
`pProcessingEngines`.

* 
`pProcessingEngines` is a pointer to an array of
`processingEngineCount`
[VkPhysicalDeviceDataGraphProcessingEngineARM](VkPhysicalDeviceDataGraphProcessingEngineARM.html) structures.

Valid Usage

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-dataGraph-09953) VUID-VkDataGraphProcessingEngineCreateInfoARM-dataGraph-09953

The [`dataGraph`](../../../../spec/latest/chapters/features.html#features-dataGraph) feature **must** be enabled

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-09918) VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-09918

`pProcessingEngines` **must** not contain identical
[VkPhysicalDeviceDataGraphProcessingEngineARM](VkPhysicalDeviceDataGraphProcessingEngineARM.html) structures

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-09956) VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-09956

For each element of `pProcessingEngines`, its `type` member
**must** be a valid [VkPhysicalDeviceDataGraphProcessingEngineTypeARM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html)
value

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-11843) VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-11843

If any element of `pProcessingEngines` has a `type` of
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html)
or
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html)
and `isForeign` set to [VK_TRUE](VK_TRUE.html), `processingEngineCount`
**must** equal `1`

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-11844) VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-11844

If any element of `pProcessingEngines` has a `type` of
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html)
or
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html),
the [dataGraphModel](../../../../spec/latest/chapters/features.html#features-dataGraphModelQCOM) feature **must** be
enabled

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-sType-sType) VUID-VkDataGraphProcessingEngineCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PROCESSING_ENGINE_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-parameter) VUID-VkDataGraphProcessingEngineCreateInfoARM-pProcessingEngines-parameter

 `pProcessingEngines` **must** be a valid pointer to an array of `processingEngineCount` [VkPhysicalDeviceDataGraphProcessingEngineARM](VkPhysicalDeviceDataGraphProcessingEngineARM.html) structures

* 
[](#VUID-VkDataGraphProcessingEngineCreateInfoARM-processingEngineCount-arraylength) VUID-VkDataGraphProcessingEngineCreateInfoARM-processingEngineCount-arraylength

 `processingEngineCount` **must** be greater than `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html)

* 
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html)

* 
[VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html)

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkPhysicalDeviceDataGraphProcessingEngineARM](VkPhysicalDeviceDataGraphProcessingEngineARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
