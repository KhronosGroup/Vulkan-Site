# VkPipelineCreationFeedback(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCreationFeedback.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCreationFeedback - Feedback about the creation of a pipeline or pipeline stage

The `VkPipelineCreationFeedback` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPipelineCreationFeedback {
    VkPipelineCreationFeedbackFlags    flags;
    uint64_t                           duration;
} VkPipelineCreationFeedback;

// Provided by VK_EXT_pipeline_creation_feedback
// Equivalent to VkPipelineCreationFeedback
typedef VkPipelineCreationFeedback VkPipelineCreationFeedbackEXT;

* 
`flags` is a bitmask of [VkPipelineCreationFeedbackFlagBits](VkPipelineCreationFeedbackFlagBits.html)
providing feedback about the creation of a pipeline or of a pipeline
stage.

* 
`duration` is the duration spent creating a pipeline or pipeline
stage in nanoseconds.

If the [VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT](VkPipelineCreationFeedbackFlagBits.html) is not set in
`flags`, an implementation **must** not set any other bits in `flags`,
and the values of all other `VkPipelineCreationFeedback` data members
are **undefined**.

[VK_EXT_pipeline_creation_feedback](VK_EXT_pipeline_creation_feedback.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html), [VkPipelineCreationFeedbackFlagBits](VkPipelineCreationFeedbackFlagBits.html), [VkPipelineCreationFeedbackFlags](VkPipelineCreationFeedbackFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCreationFeedback).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
