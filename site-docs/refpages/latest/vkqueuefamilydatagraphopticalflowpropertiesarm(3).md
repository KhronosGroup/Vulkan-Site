# VkQueueFamilyDataGraphOpticalFlowPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFamilyDataGraphOpticalFlowPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFamilyDataGraphOpticalFlowPropertiesARM - Structure describing optical flow properties of a processing engine and operation set for a specific queue family of a physical device

The `VkQueueFamilyDataGraphOpticalFlowPropertiesARM` structure is
defined as:

// Provided by VK_ARM_data_graph_optical_flow
typedef struct VkQueueFamilyDataGraphOpticalFlowPropertiesARM {
    VkStructureType                           sType;
    void*                                     pNext;
    VkDataGraphOpticalFlowGridSizeFlagsARM    supportedOutputGridSizes;
    VkDataGraphOpticalFlowGridSizeFlagsARM    supportedHintGridSizes;
    VkBool32                                  hintSupported;
    VkBool32                                  costSupported;
    uint32_t                                  minWidth;
    uint32_t                                  minHeight;
    uint32_t                                  maxWidth;
    uint32_t                                  maxHeight;
} VkQueueFamilyDataGraphOpticalFlowPropertiesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `supportedOutputGridSizes`
are the supported [VkDataGraphOpticalFlowGridSizeFlagsARM](VkDataGraphOpticalFlowGridSizeFlagsARM.html) which
**can** be specified in
`VkDataGraphPipelineOpticalFlowCreateInfoARM`::`outputGridSize`.

* 
 `supportedHintGridSizes` are
the supported [VkDataGraphOpticalFlowGridSizeFlagsARM](VkDataGraphOpticalFlowGridSizeFlagsARM.html) which **can** be
specified in
`VkDataGraphPipelineOpticalFlowCreateInfoARM`::`hintGridSize`.

* 
 `hintSupported` is a boolean describing
whether using hint flow vector map is supported in an optical flow graph
pipeline.

* 
 `costSupported` is a boolean describing
whether cost map generation is supported in an optical flow graph
pipeline.

* 
 `minWidth` is the minimum width in pixels for
images used in an optical flow graph pipeline.

* 
 `minHeight` is the minimum height in pixels
for images used in an optical flow graph pipeline.

* 
 `maxWidth` is the maximum width in pixels for
images used in an optical flow graph pipeline.

* 
 `maxHeight` is the maximum height in pixels
for images used in an optical flow graph pipeline.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyDataGraphOpticalFlowPropertiesARM-sType-sType) VUID-VkQueueFamilyDataGraphOpticalFlowPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_DATA_GRAPH_OPTICAL_FLOW_PROPERTIES_ARM](VkStructureType.html)

* 
[](#VUID-VkQueueFamilyDataGraphOpticalFlowPropertiesARM-pNext-pNext) VUID-VkQueueFamilyDataGraphOpticalFlowPropertiesARM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), `VkBool32`, [VkDataGraphOpticalFlowGridSizeFlagsARM](VkDataGraphOpticalFlowGridSizeFlagsARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkQueueFamilyDataGraphOpticalFlowPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
