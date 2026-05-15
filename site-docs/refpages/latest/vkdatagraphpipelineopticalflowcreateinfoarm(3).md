# VkDataGraphPipelineOpticalFlowCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineOpticalFlowCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineOpticalFlowCreateInfoARM - Structure specifying the parameters of a newly-created optical flow graph pipeline

The `VkDataGraphPipelineOpticalFlowCreateInfoARM` structure is defined
as:

// Provided by VK_ARM_data_graph_optical_flow
typedef struct VkDataGraphPipelineOpticalFlowCreateInfoARM {
    VkStructureType                              sType;
    void*                                        pNext;
    uint32_t                                     width;
    uint32_t                                     height;
    VkFormat                                     imageFormat;
    VkFormat                                     flowVectorFormat;
    VkFormat                                     costFormat;
    VkDataGraphOpticalFlowGridSizeFlagsARM       outputGridSize;
    VkDataGraphOpticalFlowGridSizeFlagsARM       hintGridSize;
    VkDataGraphOpticalFlowPerformanceLevelARM    performanceLevel;
    VkDataGraphOpticalFlowCreateFlagsARM         flags;
} VkDataGraphPipelineOpticalFlowCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`width` is the width in pixels of the input or reference image to be
bound to this optical flow pipeline.

* 
`height` is the height in pixels of the input or reference image to
be bound to this optical flow pipeline.

* 
`imageFormat` is the [VkFormat](VkFormat.html) of the input and reference image
to be bound to this optical flow pipeline.

* 
`flowVectorFormat` is the [VkFormat](VkFormat.html) of the flow vector maps
(output or hint) to be bound to this optical flow pipeline.

* 
`costFormat` is the [VkFormat](VkFormat.html) of the cost maps to be bound to
this optical flow pipeline.

* 
`outputGridSize` is exactly one bit of
[VkDataGraphOpticalFlowGridSizeFlagsARM](VkDataGraphOpticalFlowGridSizeFlagsARM.html) specifying the grid size of
the output flow and cost maps to be bound to this optical flow pipeline.
The size of the output flow and cost maps is a function of the input
image dimensions and `outputGridSize` and is calculated as follows:

OutputWidth = ⌈ `width` / OutputGridWidth ⌉

OutputHeight = ⌈ `height` / OutputGridHeight ⌉

where OutputGridWidth and OutputGridHeight are determined by
`outputGridSize`.

* 
`hintGridSize` is one exactly bit of
[VkDataGraphOpticalFlowGridSizeFlagsARM](VkDataGraphOpticalFlowGridSizeFlagsARM.html) specifying the grid size of
the hint flow vector map to be bound to this optical flow pipeline.
The size of the hint maps is a function of the input image dimensions
and `hintGridSize` and is calculated as follows:

HintWidth = ⌈ `width` / HintGridWidth ⌉

HintHeight = ⌈ `height` / HintGridHeight ⌉

where HintGridWidth and HintGridHeight are determined by
`hintGridSize`.

* 
`performanceLevel` is the
[VkDataGraphOpticalFlowPerformanceLevelARM](VkDataGraphOpticalFlowPerformanceLevelARM.html) used for this optical
flow pipeline.

* 
`flags` are the [VkDataGraphOpticalFlowCreateFlagsARM](VkDataGraphOpticalFlowCreateFlagsARM.html) used for
this optical flow pipeline.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-width-09966) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-width-09966

`width` **must** be greater than or equal to
`VkQueueFamilyDataGraphOpticalFlowPropertiesARM`::`minWidth` and
less than or equal to
`VkQueueFamilyDataGraphOpticalFlowPropertiesARM`::`maxWidth`

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-height-09967) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-height-09967

`height` **must** be greater than or equal to
`VkQueueFamilyDataGraphOpticalFlowPropertiesARM`::`minHeight`
and less than or equal to
`VkQueueFamilyDataGraphOpticalFlowPropertiesARM`::`maxHeight`

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-imageFormat-09968) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-imageFormat-09968

`imageFormat` **must** be one of the formats returned by
[vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM](vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM.html)
for [VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_INPUT_BIT_ARM](VkDataGraphOpticalFlowImageUsageFlagBitsARM.html)

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-flowVectorFormat-09969) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-flowVectorFormat-09969

`flowVectorFormat` **must** be one of the formats returned by
[vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM](vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM.html)
for [VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_OUTPUT_BIT_ARM](VkDataGraphOpticalFlowImageUsageFlagBitsARM.html)

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-costFormat-09970) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-costFormat-09970

`costFormat` **must** be one of the formats returned by
[vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM](vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM.html)
for [VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_COST_BIT_ARM](VkDataGraphOpticalFlowImageUsageFlagBitsARM.html) if
[VK_DATA_GRAPH_OPTICAL_FLOW_CREATE_ENABLE_COST_BIT_ARM](VkDataGraphOpticalFlowCreateFlagBitsARM.html) is set in
`flags`

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-outputGridSize-09971) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-outputGridSize-09971

`outputGridSize` **must** be exactly one of the bits reported in
`VkQueueFamilyDataGraphOpticalFlowPropertiesARM`::`supportedOutputGridSizes`

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-hintGridSize-09972) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-hintGridSize-09972

`hintGridSize` **must** be 0 or exactly one of the bits reported in
`VkQueueFamilyDataGraphOpticalFlowPropertiesARM`::`supportedHintGridSizes`
if [VK_DATA_GRAPH_OPTICAL_FLOW_CREATE_ENABLE_HINT_BIT_ARM](VkDataGraphOpticalFlowCreateFlagBitsARM.html) is set in
`flags`

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-hintGridSize-09973) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-hintGridSize-09973

`hintGridSize` **must** be the same as `outputGridSize` if
`hintGridSize` is not 0

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-flags-09974) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-flags-09974

[VK_DATA_GRAPH_OPTICAL_FLOW_CREATE_ENABLE_HINT_BIT_ARM](VkDataGraphOpticalFlowCreateFlagBitsARM.html) **must** not be
set in `flags` if
`VkQueueFamilyDataGraphOpticalFlowPropertiesARM`::`hintSupported`
is [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-flags-09975) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-flags-09975

[VK_DATA_GRAPH_OPTICAL_FLOW_CREATE_ENABLE_COST_BIT_ARM](VkDataGraphOpticalFlowCreateFlagBitsARM.html) **must** not be
set in `flags` if
`VkQueueFamilyDataGraphOpticalFlowPropertiesARM`::`costSupported`
is [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_OPTICAL_FLOW_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-imageFormat-parameter) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-imageFormat-parameter

 `imageFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-flowVectorFormat-parameter) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-flowVectorFormat-parameter

 `flowVectorFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-costFormat-parameter) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-costFormat-parameter

 If `costFormat` is not `0`, `costFormat` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-performanceLevel-parameter) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-performanceLevel-parameter

 If `performanceLevel` is not `0`, `performanceLevel` **must** be a valid [VkDataGraphOpticalFlowPerformanceLevelARM](VkDataGraphOpticalFlowPerformanceLevelARM.html) value

* 
[](#VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-flags-parameter) VUID-VkDataGraphPipelineOpticalFlowCreateInfoARM-flags-parameter

 `flags` **must** be a valid combination of [VkDataGraphOpticalFlowCreateFlagBitsARM](VkDataGraphOpticalFlowCreateFlagBitsARM.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html)

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphOpticalFlowCreateFlagsARM](VkDataGraphOpticalFlowCreateFlagsARM.html), [VkDataGraphOpticalFlowGridSizeFlagsARM](VkDataGraphOpticalFlowGridSizeFlagsARM.html), [VkDataGraphOpticalFlowPerformanceLevelARM](VkDataGraphOpticalFlowPerformanceLevelARM.html), [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineOpticalFlowCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
