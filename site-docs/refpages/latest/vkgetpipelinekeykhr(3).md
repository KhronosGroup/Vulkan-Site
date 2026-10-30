# vkGetPipelineKeyKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPipelineKeyKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPipelineKeyKHR - Generate the pipeline key from pipeline creation info

To generate the key for a particular pipeline creation info, call:

// Provided by VK_KHR_pipeline_binary
VkResult vkGetPipelineKeyKHR(
    VkDevice                                    device,
    const VkPipelineCreateInfoKHR*              pPipelineCreateInfo,
    VkPipelineBinaryKeyKHR*                     pPipelineKey);

* 
`device` is the logical device that creates the pipeline object.

* 
`pPipelineCreateInfo` is `NULL` or a pointer to a
[VkPipelineCreateInfoKHR](VkPipelineCreateInfoKHR.html) structure.

* 
`pPipelineKey` is a pointer to a [VkPipelineBinaryKeyKHR](VkPipelineBinaryKeyKHR.html)
structure in which the resulting key is returned.

If `pPipelineCreateInfo` is `NULL`, then the implementation **must** return
the global key that applies to all pipelines.
If the key obtained in this way changes between saving and restoring data
obtained from [vkGetPipelineBinaryDataKHR](vkGetPipelineBinaryDataKHR.html) in a different
[VkDevice](VkDevice.html), then the application **must** assume that the restored data is
invalid and cannot be passed to [vkCreatePipelineBinariesKHR](vkCreatePipelineBinariesKHR.html).
Otherwise the application **can** assume the data is still valid.

If `pPipelineCreateInfo` is not `NULL`, the key obtained functions as a
method to compare two pipeline creation info structures.
Implementations **may** not compare parts of a pipeline creation info which
would not contribute to the final binary output.
If a shader module identifier is used instead of a shader module, the
`pPipelineKey` generated **must** be equal to the key generated when using
the shader module from which the identifier was queried.
If the content of two `pPipelineKey` are equal, pipelines created with
the two `pPipelineCreateInfo->pNext` create infos **must** produce the same
[VkPipelineBinaryKHR](VkPipelineBinaryKHR.html) contents.

The pipeline key is distinct from pipeline binary key.
Pipeline binary keys **can** only be obtained after compilation.
The pipeline key is intended to optionally allow associating pipeline create
info with multiple pipeline binary keys.

Valid Usage

* 
[](#VUID-vkGetPipelineKeyKHR-pNext-09605) VUID-vkGetPipelineKeyKHR-pNext-09605

The `pNext` chain of `pPipelineCreateInfo` **must** not set
[VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` to a value greater than
`0`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineKeyKHR-device-parameter) VUID-vkGetPipelineKeyKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetPipelineKeyKHR-pPipelineCreateInfo-parameter) VUID-vkGetPipelineKeyKHR-pPipelineCreateInfo-parameter

 If `pPipelineCreateInfo` is not `NULL`, `pPipelineCreateInfo` **must** be a valid pointer to a valid [VkPipelineCreateInfoKHR](VkPipelineCreateInfoKHR.html) structure

* 
[](#VUID-vkGetPipelineKeyKHR-pPipelineKey-parameter) VUID-vkGetPipelineKeyKHR-pPipelineKey-parameter

 `pPipelineKey` **must** be a valid pointer to a [VkPipelineBinaryKeyKHR](VkPipelineBinaryKeyKHR.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

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

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkDevice](VkDevice.html), [VkPipelineBinaryKeyKHR](VkPipelineBinaryKeyKHR.html), [VkPipelineCreateInfoKHR](VkPipelineCreateInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkGetPipelineKeyKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
