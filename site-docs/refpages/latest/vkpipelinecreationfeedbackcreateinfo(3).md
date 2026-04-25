# VkPipelineCreationFeedbackCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCreationFeedbackCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCreationFeedbackCreateInfo - Request for feedback about the creation of a pipeline

Feedback about the creation of a particular pipeline object **can** be obtained
by adding a `VkPipelineCreationFeedbackCreateInfo` structure to the
`pNext` chain of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html),
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html),
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html),
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html),
or [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html).
The `VkPipelineCreationFeedbackCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPipelineCreationFeedbackCreateInfo {
    VkStructureType                sType;
    const void*                    pNext;
    VkPipelineCreationFeedback*    pPipelineCreationFeedback;
    uint32_t                       pipelineStageCreationFeedbackCount;
    VkPipelineCreationFeedback*    pPipelineStageCreationFeedbacks;
} VkPipelineCreationFeedbackCreateInfo;

// Provided by VK_EXT_pipeline_creation_feedback
// Equivalent to VkPipelineCreationFeedbackCreateInfo
typedef VkPipelineCreationFeedbackCreateInfo VkPipelineCreationFeedbackCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pPipelineCreationFeedback` is a pointer to a
[VkPipelineCreationFeedback](VkPipelineCreationFeedback.html) structure.

* 
`pipelineStageCreationFeedbackCount` is the number of elements in
`pPipelineStageCreationFeedbacks`.

* 
`pPipelineStageCreationFeedbacks` is a pointer to an array of
`pipelineStageCreationFeedbackCount`
[VkPipelineCreationFeedback](VkPipelineCreationFeedback.html) structures.

An implementation **should** write pipeline creation feedback to
`pPipelineCreationFeedback` and **may** write pipeline stage creation
feedback to `pPipelineStageCreationFeedbacks`.
An implementation **must** set or clear the
[VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT](VkPipelineCreationFeedbackFlagBits.html) in
[VkPipelineCreationFeedback](VkPipelineCreationFeedback.html)::`flags` for
`pPipelineCreationFeedback` and every element of
`pPipelineStageCreationFeedbacks`.

|  | One common scenario for an implementation to skip per-stage feedback is when
| --- | --- |
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](VkPipelineCreationFeedbackFlagBits.html) is
set in `pPipelineCreationFeedback`. |

When chained to
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html),
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html),
or
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), the `i` element of
`pPipelineStageCreationFeedbacks` corresponds to the `i` element of
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html)::`pStages`,
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)::`pStages`,
or
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`pStages`.
When chained to [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), the first element of
`pPipelineStageCreationFeedbacks` corresponds to
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html)::`stage`.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCreationFeedbackCreateInfo-sType-sType) VUID-VkPipelineCreationFeedbackCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_CREATION_FEEDBACK_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineCreationFeedbackCreateInfo-pPipelineCreationFeedback-parameter) VUID-VkPipelineCreationFeedbackCreateInfo-pPipelineCreationFeedback-parameter

 `pPipelineCreationFeedback` **must** be a valid pointer to a [VkPipelineCreationFeedback](VkPipelineCreationFeedback.html) structure

* 
[](#VUID-VkPipelineCreationFeedbackCreateInfo-pPipelineStageCreationFeedbacks-parameter) VUID-VkPipelineCreationFeedbackCreateInfo-pPipelineStageCreationFeedbacks-parameter

 If `pipelineStageCreationFeedbackCount` is not `0`, `pPipelineStageCreationFeedbacks` **must** be a valid pointer to an array of `pipelineStageCreationFeedbackCount` [VkPipelineCreationFeedback](VkPipelineCreationFeedback.html) structures

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html)

* 
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html)

* 
[VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

* 
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html)

* 
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)

[VK_EXT_pipeline_creation_feedback](VK_EXT_pipeline_creation_feedback.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkPipelineCreationFeedback](VkPipelineCreationFeedback.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html), [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCreationFeedbackCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
