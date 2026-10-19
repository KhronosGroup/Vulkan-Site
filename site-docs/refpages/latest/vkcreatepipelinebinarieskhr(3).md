# vkCreatePipelineBinariesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreatePipelineBinariesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreatePipelineBinariesKHR - Create pipeline binaries from a pipeline or previously retrieved data

To create pipeline binary objects, call:

// Provided by VK_KHR_pipeline_binary
VkResult vkCreatePipelineBinariesKHR(
    VkDevice                                    device,
    const VkPipelineBinaryCreateInfoKHR*        pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkPipelineBinaryHandlesInfoKHR*             pBinaries);

* 
`device` is the logical device that creates the pipeline binary
objects.

* 
`pCreateInfo` is a pointer to a [VkPipelineBinaryCreateInfoKHR](VkPipelineBinaryCreateInfoKHR.html)
structure that contains the data to create the pipeline binaries from.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pBinaries` is a pointer to a [VkPipelineBinaryHandlesInfoKHR](VkPipelineBinaryHandlesInfoKHR.html)
structure in which the resulting pipeline binaries are returned.

The implementation will attempt to create all pipeline binaries.
If creation fails for any pipeline binary, then:

* 
The corresponding entry in the `pPipelineBinaries` output array will
be filled with [VK_NULL_HANDLE](VK_NULL_HANDLE.html).

* 
The [VkResult](VkResult.html) returned by [vkCreatePipelineBinariesKHR](#) will
contain the error value for the first entry in the output array in
`pBinaries` containing [VK_NULL_HANDLE](VK_NULL_HANDLE.html).

Valid Usage (Implicit)

* 
[](#VUID-vkCreatePipelineBinariesKHR-device-parameter) VUID-vkCreatePipelineBinariesKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreatePipelineBinariesKHR-pCreateInfo-parameter) VUID-vkCreatePipelineBinariesKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkPipelineBinaryCreateInfoKHR](VkPipelineBinaryCreateInfoKHR.html) structure

* 
[](#VUID-vkCreatePipelineBinariesKHR-pAllocator-parameter) VUID-vkCreatePipelineBinariesKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreatePipelineBinariesKHR-pBinaries-parameter) VUID-vkCreatePipelineBinariesKHR-pBinaries-parameter

 `pBinaries` **must** be a valid pointer to a [VkPipelineBinaryHandlesInfoKHR](VkPipelineBinaryHandlesInfoKHR.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_PIPELINE_BINARY_MISSING_KHR](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkPipelineBinaryCreateInfoKHR](VkPipelineBinaryCreateInfoKHR.html), [VkPipelineBinaryHandlesInfoKHR](VkPipelineBinaryHandlesInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkCreatePipelineBinariesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
