# vkGetPipelinePropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPipelinePropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPipelinePropertiesEXT - Query pipeline properties

To query the pipeline properties call:

// Provided by VK_EXT_pipeline_properties
VkResult vkGetPipelinePropertiesEXT(
    VkDevice                                    device,
    const VkPipelineInfoEXT*                    pPipelineInfo,
    VkBaseOutStructure*                         pPipelineProperties);

* 
`device` is the logical device that created the pipeline.

* 
`pPipelineInfo` is a pointer to a [VkPipelineInfoEXT](VkPipelineInfoKHR.html) structure
which describes the pipeline being queried.

* 
`pPipelineProperties` is a pointer to a [VkBaseOutStructure](VkBaseOutStructure.html)
structure in which the pipeline properties will be written.

To query a pipeline’s `pipelineIdentifier` pass a
[VkPipelinePropertiesIdentifierEXT](VkPipelinePropertiesIdentifierEXT.html) structure in
`pPipelineProperties`.
Each pipeline is associated with a `pipelineIdentifier` and the
identifier is implementation specific.

Valid Usage

* 
[](#VUID-vkGetPipelinePropertiesEXT-pipeline-06738) VUID-vkGetPipelinePropertiesEXT-pipeline-06738

The `pipeline` member of `pPipelineInfo` **must** have been created
with `device`

* 
[](#VUID-vkGetPipelinePropertiesEXT-pPipelineProperties-06739) VUID-vkGetPipelinePropertiesEXT-pPipelineProperties-06739

`pPipelineProperties` **must** be a valid pointer to a
[VkPipelinePropertiesIdentifierEXT](VkPipelinePropertiesIdentifierEXT.html) structure

* 
[](#VUID-vkGetPipelinePropertiesEXT-None-06766) VUID-vkGetPipelinePropertiesEXT-None-06766

The [    `pipelinePropertiesIdentifier`](../../../../spec/latest/chapters/features.html#features-pipelinePropertiesIdentifier) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelinePropertiesEXT-device-parameter) VUID-vkGetPipelinePropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetPipelinePropertiesEXT-pPipelineInfo-parameter) VUID-vkGetPipelinePropertiesEXT-pPipelineInfo-parameter

 `pPipelineInfo` **must** be a valid pointer to a valid [VkPipelineInfoEXT](VkPipelineInfoKHR.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_pipeline_properties](VK_EXT_pipeline_properties.html), [VkBaseOutStructure](VkBaseOutStructure.html), [VkDevice](VkDevice.html), [VkPipelineInfoKHR](VkPipelineInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkGetPipelinePropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
