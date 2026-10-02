# vkGetPipelineBinaryDataKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPipelineBinaryDataKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPipelineBinaryDataKHR - Get the data store from a pipeline binary

Data **can** be retrieved from a pipeline binary object using the command:

// Provided by VK_KHR_pipeline_binary
VkResult vkGetPipelineBinaryDataKHR(
    VkDevice                                    device,
    const VkPipelineBinaryDataInfoKHR*          pInfo,
    VkPipelineBinaryKeyKHR*                     pPipelineBinaryKey,
    size_t*                                     pPipelineBinaryDataSize,
    void*                                       pPipelineBinaryData);

* 
`device` is the logical device that created the pipeline binary.

* 
`pInfo` is a pointer to a [VkPipelineBinaryDataInfoKHR](VkPipelineBinaryDataInfoKHR.html)
structure which describes the pipeline binary to get data from.

* 
`pPipelineBinaryKey` is a pointer to a [VkPipelineBinaryKeyKHR](VkPipelineBinaryKeyKHR.html)
structure where the key for this binary will be written.

* 
`pPipelineBinaryDataSize` is a pointer to a `size_t` value
related to the amount of data in the pipeline binary, as described
below.

* 
`pPipelineBinaryData` is either `NULL` or a pointer to a buffer.

If `pPipelineBinaryData` is `NULL`, then the size of the data, in bytes,
that is required to store the binary is returned in
`pPipelineBinaryDataSize`.
Otherwise, `pPipelineBinaryDataSize` **must** contain the size of the
buffer, in bytes, pointed to by `pPipelineBinaryData`, and on return
`pPipelineBinaryDataSize` is overwritten with the size of the data, in
bytes, that is required to store the binary.
If `pPipelineBinaryDataSize` is less than the size that is required to
store the binary, nothing is written to `pPipelineBinaryData` and
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](VkResult.html) will be returned, instead of
[VK_SUCCESS](VkResult.html).

If the call returns one of the success return codes, the pipeline binary key
is written to `pPipelineBinaryKey`, regardless of whether
`pPipelineBinaryData` is `NULL` or not.

If [pipelineBinaryCompressedData](../../../../spec/latest/chapters/limits.html#limits-pipelineBinaryCompressedData) is
[VK_FALSE](VK_FALSE.html), implementations **should** not return compressed pipeline
binary data to the application.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineBinaryDataKHR-device-parameter) VUID-vkGetPipelineBinaryDataKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetPipelineBinaryDataKHR-pInfo-parameter) VUID-vkGetPipelineBinaryDataKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkPipelineBinaryDataInfoKHR](VkPipelineBinaryDataInfoKHR.html) structure

* 
[](#VUID-vkGetPipelineBinaryDataKHR-pPipelineBinaryKey-parameter) VUID-vkGetPipelineBinaryDataKHR-pPipelineBinaryKey-parameter

 `pPipelineBinaryKey` **must** be a valid pointer to a [VkPipelineBinaryKeyKHR](VkPipelineBinaryKeyKHR.html) structure

* 
[](#VUID-vkGetPipelineBinaryDataKHR-pPipelineBinaryDataSize-parameter) VUID-vkGetPipelineBinaryDataKHR-pPipelineBinaryDataSize-parameter

 `pPipelineBinaryDataSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetPipelineBinaryDataKHR-pPipelineBinaryData-parameter) VUID-vkGetPipelineBinaryDataKHR-pPipelineBinaryData-parameter

 If the value referenced by `pPipelineBinaryDataSize` is not `0`, and `pPipelineBinaryData` is not `NULL`, `pPipelineBinaryData` **must** be a valid pointer to an array of `pPipelineBinaryDataSize` bytes

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkDevice](VkDevice.html), [VkPipelineBinaryDataInfoKHR](VkPipelineBinaryDataInfoKHR.html), [VkPipelineBinaryKeyKHR](VkPipelineBinaryKeyKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkGetPipelineBinaryDataKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
