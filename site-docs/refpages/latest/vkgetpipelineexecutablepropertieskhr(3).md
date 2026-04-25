# vkGetPipelineExecutablePropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPipelineExecutablePropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPipelineExecutablePropertiesKHR - Get the executables associated with a pipeline

When a pipeline is created, its state and shaders are compiled into zero or
more device-specific executables, which are used when executing commands
against that pipeline.
To query the properties of these pipeline executables, call:

// Provided by VK_KHR_pipeline_executable_properties
VkResult vkGetPipelineExecutablePropertiesKHR(
    VkDevice                                    device,
    const VkPipelineInfoKHR*                    pPipelineInfo,
    uint32_t*                                   pExecutableCount,
    VkPipelineExecutablePropertiesKHR*          pProperties);

* 
`device` is the device that created the pipeline.

* 
`pPipelineInfo` describes the pipeline being queried.

* 
`pExecutableCount` is a pointer to an integer related to the number
of pipeline executables available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkPipelineExecutablePropertiesKHR](VkPipelineExecutablePropertiesKHR.html) structures.

If `pProperties` is `NULL`, then the number of pipeline executables
associated with the pipeline is returned in `pExecutableCount`.
Otherwise, `pExecutableCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pExecutableCount` is less than the number of pipeline executables
associated with the pipeline, at most `pExecutableCount` structures will
be written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available properties were
returned.

Valid Usage

* 
[](#VUID-vkGetPipelineExecutablePropertiesKHR-pipelineExecutableInfo-03270) VUID-vkGetPipelineExecutablePropertiesKHR-pipelineExecutableInfo-03270

The [`pipelineExecutableInfo`](../../../../spec/latest/chapters/features.html#features-pipelineExecutableInfo)
feature **must** be enabled

* 
[](#VUID-vkGetPipelineExecutablePropertiesKHR-pipeline-03271) VUID-vkGetPipelineExecutablePropertiesKHR-pipeline-03271

The `pipeline` member of `pPipelineInfo` **must** have been created
with `device`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineExecutablePropertiesKHR-device-parameter) VUID-vkGetPipelineExecutablePropertiesKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetPipelineExecutablePropertiesKHR-pPipelineInfo-parameter) VUID-vkGetPipelineExecutablePropertiesKHR-pPipelineInfo-parameter

 `pPipelineInfo` **must** be a valid pointer to a valid [VkPipelineInfoKHR](VkPipelineInfoKHR.html) structure

* 
[](#VUID-vkGetPipelineExecutablePropertiesKHR-pExecutableCount-parameter) VUID-vkGetPipelineExecutablePropertiesKHR-pExecutableCount-parameter

 `pExecutableCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPipelineExecutablePropertiesKHR-pProperties-parameter) VUID-vkGetPipelineExecutablePropertiesKHR-pProperties-parameter

 If the value referenced by `pExecutableCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pExecutableCount` [VkPipelineExecutablePropertiesKHR](VkPipelineExecutablePropertiesKHR.html) structures

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

[VK_KHR_pipeline_executable_properties](VK_KHR_pipeline_executable_properties.html), [VkDevice](VkDevice.html), [VkPipelineExecutablePropertiesKHR](VkPipelineExecutablePropertiesKHR.html), [VkPipelineInfoKHR](VkPipelineInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkGetPipelineExecutablePropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
