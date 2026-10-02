# VkPipelineRasterizationStateStreamCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineRasterizationStateStreamCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineRasterizationStateStreamCreateInfoEXT - Structure defining the geometry stream used for rasterization

The vertex stream used for rasterization is specified by adding a
`VkPipelineRasterizationStateStreamCreateInfoEXT` structure to the
`pNext` chain of a [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)
structure.

The `VkPipelineRasterizationStateStreamCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_transform_feedback
typedef struct VkPipelineRasterizationStateStreamCreateInfoEXT {
    VkStructureType                                     sType;
    const void*                                         pNext;
    VkPipelineRasterizationStateStreamCreateFlagsEXT    flags;
    uint32_t                                            rasterizationStream;
} VkPipelineRasterizationStateStreamCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`rasterizationStream` is the vertex stream selected for
rasterization.

If this structure is not present, `rasterizationStream` is assumed to be
zero.

Valid Usage

* 
[](#VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-geometryStreams-02324) VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-geometryStreams-02324

`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`geometryStreams`
**must** be enabled

* 
[](#VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-rasterizationStream-02325) VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-rasterizationStream-02325

`rasterizationStream` **must** be less than
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](VkPhysicalDeviceTransformFeedbackPropertiesEXT.html)::`maxTransformFeedbackStreams`

* 
[](#VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-rasterizationStream-02326) VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-rasterizationStream-02326

`rasterizationStream` **must** be zero if
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`transformFeedbackRasterizationStreamSelect`
is [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-sType-sType) VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_STREAM_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-flags-zerobitmask) VUID-VkPipelineRasterizationStateStreamCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)

[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html), [VkPipelineRasterizationStateStreamCreateFlagsEXT](VkPipelineRasterizationStateStreamCreateFlagsEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkPipelineRasterizationStateStreamCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
