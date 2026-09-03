# vkGetExecutionGraphPipelineScratchSizeAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetExecutionGraphPipelineScratchSizeAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetExecutionGraphPipelineScratchSizeAMDX - Query scratch space required to dispatch an execution graph

To query the scratch space required to dispatch an execution graph, call:

// Provided by VK_AMDX_shader_enqueue
VkResult vkGetExecutionGraphPipelineScratchSizeAMDX(
    VkDevice                                    device,
    VkPipeline                                  executionGraph,
    VkExecutionGraphPipelineScratchSizeAMDX*    pSizeInfo);

* 
`device` is the logical device that `executionGraph` was created
on.

* 
`executionGraph` is the execution graph pipeline to query the
scratch space for.

* 
`pSizeInfo` is a pointer to a
[VkExecutionGraphPipelineScratchSizeAMDX](VkExecutionGraphPipelineScratchSizeAMDX.html) structure that will
contain the required scratch size.

After this function returns, information about the scratch space required
will be returned in `pSizeInfo`.

Valid Usage (Implicit)

* 
[](#VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-device-parameter) VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-executionGraph-parameter) VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-executionGraph-parameter

 `executionGraph` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-pSizeInfo-parameter) VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-pSizeInfo-parameter

 `pSizeInfo` **must** be a valid pointer to a [VkExecutionGraphPipelineScratchSizeAMDX](VkExecutionGraphPipelineScratchSizeAMDX.html) structure

* 
[](#VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-executionGraph-parent) VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-executionGraph-parent

 `executionGraph` **must** have been created, allocated, or retrieved from `device`

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

[VK_AMDX_shader_enqueue](VK_AMDX_shader_enqueue.html), [VkDevice](VkDevice.html), [VkExecutionGraphPipelineScratchSizeAMDX](VkExecutionGraphPipelineScratchSizeAMDX.html), [VkPipeline](VkPipeline.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/executiongraphs.html#vkGetExecutionGraphPipelineScratchSizeAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
