# VkPipelineCreationFeedbackFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCreationFeedbackFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCreationFeedbackFlagBits - Bitmask specifying pipeline or pipeline stage creation feedback

Possible values of the `flags` member of
[VkPipelineCreationFeedback](VkPipelineCreationFeedback.html) are:

// Provided by VK_VERSION_1_3
typedef enum VkPipelineCreationFeedbackFlagBits {
    VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT = 0x00000001,
    VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT = 0x00000002,
    VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT = 0x00000004,
  // Provided by VK_EXT_pipeline_creation_feedback
    VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT_EXT = VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT,
  // Provided by VK_EXT_pipeline_creation_feedback
    VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT_EXT = VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT,
  // Provided by VK_EXT_pipeline_creation_feedback
    VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT_EXT = VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT,
} VkPipelineCreationFeedbackFlagBits;

// Provided by VK_EXT_pipeline_creation_feedback
// Equivalent to VkPipelineCreationFeedbackFlagBits
typedef VkPipelineCreationFeedbackFlagBits VkPipelineCreationFeedbackFlagBitsEXT;

* 
[VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT](#) specifies that the
feedback information is valid.

* 
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](#)
specifies that a readily usable pipeline or pipeline stage was found in
the `pipelineCache` specified by the application in the pipeline
creation command.

An implementation **should** set the
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](#) bit
if it was able to avoid the large majority of pipeline or pipeline stage
creation work by using the `pipelineCache` parameter of
[vkCreateGraphicsPipelines](vkCreateGraphicsPipelines.html),
[vkCreateRayTracingPipelinesKHR](vkCreateRayTracingPipelinesKHR.html),
[vkCreateRayTracingPipelinesNV](vkCreateRayTracingPipelinesNV.html),
[vkCreateDataGraphPipelinesARM](vkCreateDataGraphPipelinesARM.html),
or [vkCreateComputePipelines](vkCreateComputePipelines.html).
When an implementation sets this bit for the entire pipeline, it **may** leave
it unset for any stage.

|  | Implementations are encouraged to provide a meaningful signal to
| --- | --- |
applications using this bit.
The intention is to communicate to the application that the pipeline or
pipeline stage was created “as fast as it gets” using the pipeline cache
provided by the application.
If an implementation uses an internal cache, it is discouraged from setting
this bit as the feedback would be unactionable. |

* 
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT](#)
specifies that the base pipeline specified by the
`basePipelineHandle` or `basePipelineIndex` member of the
`Vk*PipelineCreateInfo` structure was used to accelerate the
creation of the pipeline.

An implementation **should** set the
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT](#) bit if it
was able to avoid a significant amount of work by using the base pipeline.

|  | While “significant amount of work” is subjective, implementations are
| --- | --- |
encouraged to provide a meaningful signal to applications using this bit.
For example, a 1% reduction in duration may not warrant setting this bit,
while a 50% reduction would. |

[VK_EXT_pipeline_creation_feedback](VK_EXT_pipeline_creation_feedback.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkPipelineCreationFeedback](VkPipelineCreationFeedback.html), [VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html), [VkPipelineCreationFeedbackFlags](VkPipelineCreationFeedbackFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCreationFeedbackFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
