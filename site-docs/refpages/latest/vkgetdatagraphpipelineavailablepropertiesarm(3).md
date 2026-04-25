# vkGetDataGraphPipelineAvailablePropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDataGraphPipelineAvailablePropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDataGraphPipelineAvailablePropertiesARM - Query available properties of a data graph pipeline

To query the properties of a data graph pipeline that can be obtained, call:

// Provided by VK_ARM_data_graph
VkResult vkGetDataGraphPipelineAvailablePropertiesARM(
    VkDevice                                    device,
    const VkDataGraphPipelineInfoARM*           pPipelineInfo,
    uint32_t*                                   pPropertiesCount,
    VkDataGraphPipelinePropertyARM*             pProperties);

* 
`device` is the logical device that created the data graph pipeline.

* 
`pPipelineInfo` is a [VkDataGraphPipelineInfoARM](VkDataGraphPipelineInfoARM.html) that describes
the [VkPipeline](VkPipeline.html) being queried.

* 
`pPropertiesCount` is a pointer to an integer related to the number
of properties available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkDataGraphPipelinePropertyARM](VkDataGraphPipelinePropertyARM.html) enums.

If `pProperties` is `NULL`, then the number of properties associated
with the data graph pipeline is returned in `pPropertiesCount`.
Otherwise, `pPropertiesCount` **must** point to a variable set by the user
to the number of elements in the `pProperties` array, and on return the
variable is overwritten with the number of enums actually written to
`pProperties`.
If `pPropertiesCount` is less than the number of properties associated
with the data graph pipeline, at most `pPropertiesCount` structures will
be written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available properties were
returned.

Valid Usage

* 
[](#VUID-vkGetDataGraphPipelineAvailablePropertiesARM-dataGraphPipeline-09888) VUID-vkGetDataGraphPipelineAvailablePropertiesARM-dataGraphPipeline-09888

The `dataGraphPipeline` member of `pPipelineInfo` **must** have
been created with `device`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDataGraphPipelineAvailablePropertiesARM-device-parameter) VUID-vkGetDataGraphPipelineAvailablePropertiesARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDataGraphPipelineAvailablePropertiesARM-pPipelineInfo-parameter) VUID-vkGetDataGraphPipelineAvailablePropertiesARM-pPipelineInfo-parameter

 `pPipelineInfo` **must** be a valid pointer to a valid [VkDataGraphPipelineInfoARM](VkDataGraphPipelineInfoARM.html) structure

* 
[](#VUID-vkGetDataGraphPipelineAvailablePropertiesARM-pPropertiesCount-parameter) VUID-vkGetDataGraphPipelineAvailablePropertiesARM-pPropertiesCount-parameter

 `pPropertiesCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDataGraphPipelineAvailablePropertiesARM-pProperties-parameter) VUID-vkGetDataGraphPipelineAvailablePropertiesARM-pProperties-parameter

 If the value referenced by `pPropertiesCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertiesCount` [VkDataGraphPipelinePropertyARM](VkDataGraphPipelinePropertyARM.html) values

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

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineInfoARM](VkDataGraphPipelineInfoARM.html), [VkDataGraphPipelinePropertyARM](VkDataGraphPipelinePropertyARM.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkGetDataGraphPipelineAvailablePropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
