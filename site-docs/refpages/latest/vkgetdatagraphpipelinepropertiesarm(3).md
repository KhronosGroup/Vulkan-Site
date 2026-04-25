# vkGetDataGraphPipelinePropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDataGraphPipelinePropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDataGraphPipelinePropertiesARM - Query properties of a data graph pipeline

To query properties of a data graph pipeline, call:

// Provided by VK_ARM_data_graph
VkResult vkGetDataGraphPipelinePropertiesARM(
    VkDevice                                    device,
    const VkDataGraphPipelineInfoARM*           pPipelineInfo,
    uint32_t                                    propertiesCount,
    VkDataGraphPipelinePropertyQueryResultARM*  pProperties);

* 
`device` is the logical device that created the data graph pipeline.

* 
`pPipelineInfo` is a [VkDataGraphPipelineInfoARM](VkDataGraphPipelineInfoARM.html) that describes
the [VkPipeline](VkPipeline.html) being queried.

* 
`propertiesCount` is the length of the `pProperties` array.

* 
`pProperties` is a pointer to an array of
[VkDataGraphPipelinePropertyQueryResultARM](VkDataGraphPipelinePropertyQueryResultARM.html) structures.

Valid Usage

* 
[](#VUID-vkGetDataGraphPipelinePropertiesARM-dataGraphPipeline-09802) VUID-vkGetDataGraphPipelinePropertiesARM-dataGraphPipeline-09802

The `dataGraphPipeline` member of `pPipelineInfo` **must** have
been created with `device`

* 
[](#VUID-vkGetDataGraphPipelinePropertiesARM-pProperties-09889) VUID-vkGetDataGraphPipelinePropertiesARM-pProperties-09889

There **must** not be two or more structures in the `pProperties` array
with the same
[VkDataGraphPipelinePropertyQueryResultARM](VkDataGraphPipelinePropertyQueryResultARM.html)::`property`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDataGraphPipelinePropertiesARM-device-parameter) VUID-vkGetDataGraphPipelinePropertiesARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDataGraphPipelinePropertiesARM-pPipelineInfo-parameter) VUID-vkGetDataGraphPipelinePropertiesARM-pPipelineInfo-parameter

 `pPipelineInfo` **must** be a valid pointer to a valid [VkDataGraphPipelineInfoARM](VkDataGraphPipelineInfoARM.html) structure

* 
[](#VUID-vkGetDataGraphPipelinePropertiesARM-pProperties-parameter) VUID-vkGetDataGraphPipelinePropertiesARM-pProperties-parameter

 `pProperties` **must** be a valid pointer to an array of `propertiesCount` [VkDataGraphPipelinePropertyQueryResultARM](VkDataGraphPipelinePropertyQueryResultARM.html) structures

* 
[](#VUID-vkGetDataGraphPipelinePropertiesARM-propertiesCount-arraylength) VUID-vkGetDataGraphPipelinePropertiesARM-propertiesCount-arraylength

 `propertiesCount` **must** be greater than `0`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineInfoARM](VkDataGraphPipelineInfoARM.html), [VkDataGraphPipelinePropertyQueryResultARM](VkDataGraphPipelinePropertyQueryResultARM.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkGetDataGraphPipelinePropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
