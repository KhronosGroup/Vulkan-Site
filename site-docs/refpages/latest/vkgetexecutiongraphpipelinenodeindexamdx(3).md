# vkGetExecutionGraphPipelineNodeIndexAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetExecutionGraphPipelineNodeIndexAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetExecutionGraphPipelineNodeIndexAMDX - Query internal id of a node in an execution graph

To query the internal node index for a particular node in an execution
graph, call:

// Provided by VK_AMDX_shader_enqueue
VkResult vkGetExecutionGraphPipelineNodeIndexAMDX(
    VkDevice                                    device,
    VkPipeline                                  executionGraph,
    const VkPipelineShaderStageNodeCreateInfoAMDX* pNodeInfo,
    uint32_t*                                   pNodeIndex);

* 
`device` is the logical device that `executionGraph` was created
on.

* 
`executionGraph` is the execution graph pipeline to query the
internal node index for.

* 
`pNodeInfo` is a pointer to a
[VkPipelineShaderStageNodeCreateInfoAMDX](VkPipelineShaderStageNodeCreateInfoAMDX.html) structure identifying the
name and index of the node to query.

* 
`pNodeIndex` is the returned internal node index of the identified
node.

Once this function returns, the contents of `pNodeIndex` contain the
internal node index of the identified node.

Valid Usage

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeInfo-09140) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeInfo-09140

`pNodeInfo->pName` **must** not be `NULL`

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeInfo-09141) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeInfo-09141

`pNodeInfo->index` **must** not be [VK_SHADER_INDEX_UNUSED_AMDX](VK_SHADER_INDEX_UNUSED_AMDX.html)

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-executionGraph-09142) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-executionGraph-09142

There **must** be a node in `executionGraph` with a shader name and
index equal to `pNodeInfo->pName` and `pNodeInfo->index`

Valid Usage (Implicit)

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-device-parameter) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-executionGraph-parameter) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-executionGraph-parameter

 `executionGraph` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeInfo-parameter) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeInfo-parameter

 `pNodeInfo` **must** be a valid pointer to a valid [VkPipelineShaderStageNodeCreateInfoAMDX](VkPipelineShaderStageNodeCreateInfoAMDX.html) structure

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeIndex-parameter) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeIndex-parameter

 `pNodeIndex` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-executionGraph-parent) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-executionGraph-parent

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

[VK_AMDX_shader_enqueue](VK_AMDX_shader_enqueue.html), [VkDevice](VkDevice.html), [VkPipeline](VkPipeline.html), [VkPipelineShaderStageNodeCreateInfoAMDX](VkPipelineShaderStageNodeCreateInfoAMDX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/executiongraphs.html#vkGetExecutionGraphPipelineNodeIndexAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
