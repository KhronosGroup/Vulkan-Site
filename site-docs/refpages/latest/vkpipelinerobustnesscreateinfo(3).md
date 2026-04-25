# VkPipelineRobustnessCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineRobustnessCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineRobustnessCreateInfo - Structure controlling the robustness of a newly created pipeline shader stage

The `VkPipelineRobustnessCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPipelineRobustnessCreateInfo {
    VkStructureType                       sType;
    const void*                           pNext;
    VkPipelineRobustnessBufferBehavior    storageBuffers;
    VkPipelineRobustnessBufferBehavior    uniformBuffers;
    VkPipelineRobustnessBufferBehavior    vertexInputs;
    VkPipelineRobustnessImageBehavior     images;
} VkPipelineRobustnessCreateInfo;

// Provided by VK_EXT_pipeline_robustness
// Equivalent to VkPipelineRobustnessCreateInfo
typedef VkPipelineRobustnessCreateInfo VkPipelineRobustnessCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`storageBuffers` sets the behavior of out of bounds accesses made to
resources bound as:

[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html)

* 
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html)

* 
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html)

`uniformBuffers` describes the behavior of out of bounds accesses
made to resources bound as:

* 
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html)

* 
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html)

* 
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html)

* 
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html)

`vertexInputs` describes the behavior of out of bounds accesses made
to vertex input attributes

`images` describes the behavior of out of bounds accesses made to
resources bound as:

* 
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html)

* 
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html)

Resources bound as [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html) will have the
robustness behavior that covers its active descriptor type.

The scope of the effect of `VkPipelineRobustnessCreateInfo` depends on
which structure’s `pNext` chain it is included in.

* 
`VkGraphicsPipelineCreateInfo`,
`VkRayTracingPipelineCreateInfoKHR`,
    `VkComputePipelineCreateInfo`:

    The robustness behavior described by
    `VkPipelineRobustnessCreateInfo` applies to all accesses through
    this pipeline

* 
`VkPipelineShaderStageCreateInfo`:

The robustness behavior described by
`VkPipelineRobustnessCreateInfo` applies to all accesses emanating
from the shader code of this shader stage

If `VkPipelineRobustnessCreateInfo` is specified for both a pipeline and
a pipeline stage, the `VkPipelineRobustnessCreateInfo` specified for the
pipeline stage will take precedence.

When `VkPipelineRobustnessCreateInfo` is specified for a pipeline, it
only affects the subset of the pipeline that is specified by the create
info, as opposed to subsets linked from pipeline libraries.
For [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), that subset is specified by
[VkGraphicsPipelineLibraryCreateInfoEXT](VkGraphicsPipelineLibraryCreateInfoEXT.html)::`flags`.
For [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html), that subset is specified by the
specific stages in [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html)::`pStages`.

Valid Usage

* 
[](#VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06926) VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06926

If the [`pipelineRobustness`](../../../../spec/latest/chapters/features.html#features-pipelineRobustness) feature
is not enabled, `storageBuffers` **must** be
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT](VkPipelineRobustnessBufferBehavior.html)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06927) VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06927

If the [`pipelineRobustness`](../../../../spec/latest/chapters/features.html#features-pipelineRobustness) feature
is not enabled, `uniformBuffers` **must** be
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT](VkPipelineRobustnessBufferBehavior.html)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06928) VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06928

If the [`pipelineRobustness`](../../../../spec/latest/chapters/features.html#features-pipelineRobustness) feature
is not enabled, `vertexInputs` **must** be
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT](VkPipelineRobustnessBufferBehavior.html)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06929) VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06929

If the [`pipelineRobustness`](../../../../spec/latest/chapters/features.html#features-pipelineRobustness) feature
is not enabled, `images` **must** be
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT](VkPipelineRobustnessImageBehavior.html)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-robustImageAccess-06930) VUID-VkPipelineRobustnessCreateInfo-robustImageAccess-06930

If the [`robustImageAccess`](../../../../spec/latest/chapters/features.html#features-robustImageAccess) feature
is not supported, `images` **must** not be
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS](VkPipelineRobustnessImageBehavior.html)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-robustBufferAccess2-06931) VUID-VkPipelineRobustnessCreateInfo-robustBufferAccess2-06931

If the [`robustBufferAccess2`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess2)
feature is not supported, `storageBuffers` **must** not be
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](VkPipelineRobustnessBufferBehavior.html)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-robustBufferAccess2-06932) VUID-VkPipelineRobustnessCreateInfo-robustBufferAccess2-06932

If the [`robustBufferAccess2`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess2)
feature is not supported, `uniformBuffers` **must** not be
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](VkPipelineRobustnessBufferBehavior.html)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-robustBufferAccess2-06933) VUID-VkPipelineRobustnessCreateInfo-robustBufferAccess2-06933

If the [`robustBufferAccess2`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess2)
feature is not supported, `vertexInputs` **must** not be
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](VkPipelineRobustnessBufferBehavior.html)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-robustImageAccess2-06934) VUID-VkPipelineRobustnessCreateInfo-robustImageAccess2-06934

If the [`robustImageAccess2`](../../../../spec/latest/chapters/features.html#features-robustImageAccess2) feature
is not supported, `images` **must** not be
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2](VkPipelineRobustnessImageBehavior.html)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-storageBuffers-10636) VUID-VkPipelineRobustnessCreateInfo-storageBuffers-10636

If `storageBuffers` is
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](VkPipelineRobustnessBufferBehavior.html) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](VkPipelineRobustnessBufferBehavior.html), and
either the [    `descriptorBindingStorageBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingStorageBufferUpdateAfterBind) feature or the
[    `descriptorBindingStorageTexelBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingStorageTexelBufferUpdateAfterBind) feature is
enabled on the device, [    `robustBufferAccessUpdateAfterBind`](../../../../spec/latest/chapters/devsandqueues.html#limits-robustBufferAccessUpdateAfterBind) **must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-uniformBuffers-10637) VUID-VkPipelineRobustnessCreateInfo-uniformBuffers-10637

If `uniformBuffers` is
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](VkPipelineRobustnessBufferBehavior.html) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](VkPipelineRobustnessBufferBehavior.html), and
either
the [    `descriptorBindingInlineUniformBlockUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingInlineUniformBlockUpdateAfterBind) feature,
the [    `descriptorBindingUniformBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingUniformBufferUpdateAfterBind) feature, or the
[    `descriptorBindingUniformTexelBufferUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingUniformTexelBufferUpdateAfterBind) feature is
enabled on the device, [    `robustBufferAccessUpdateAfterBind`](../../../../spec/latest/chapters/devsandqueues.html#limits-robustBufferAccessUpdateAfterBind) **must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-images-10638) VUID-VkPipelineRobustnessCreateInfo-images-10638

If `images` is
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS](VkPipelineRobustnessImageBehavior.html) or
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2](VkPipelineRobustnessImageBehavior.html), and
either the [    `descriptorBindingStorageImageUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingStorageImageUpdateAfterBind) feature or the
[    `descriptorBindingSampledImageUpdateAfterBind`](../../../../spec/latest/chapters/features.html#features-descriptorBindingSampledImageUpdateAfterBind) feature is enabled
on the device, [    `robustBufferAccessUpdateAfterBind`](../../../../spec/latest/chapters/devsandqueues.html#limits-robustBufferAccessUpdateAfterBind) **must** be [VK_TRUE](VK_TRUE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-sType-sType) VUID-VkPipelineRobustnessCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_ROBUSTNESS_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-storageBuffers-parameter) VUID-VkPipelineRobustnessCreateInfo-storageBuffers-parameter

 `storageBuffers` **must** be a valid [VkPipelineRobustnessBufferBehavior](VkPipelineRobustnessBufferBehavior.html) value

* 
[](#VUID-VkPipelineRobustnessCreateInfo-uniformBuffers-parameter) VUID-VkPipelineRobustnessCreateInfo-uniformBuffers-parameter

 `uniformBuffers` **must** be a valid [VkPipelineRobustnessBufferBehavior](VkPipelineRobustnessBufferBehavior.html) value

* 
[](#VUID-VkPipelineRobustnessCreateInfo-vertexInputs-parameter) VUID-VkPipelineRobustnessCreateInfo-vertexInputs-parameter

 `vertexInputs` **must** be a valid [VkPipelineRobustnessBufferBehavior](VkPipelineRobustnessBufferBehavior.html) value

* 
[](#VUID-VkPipelineRobustnessCreateInfo-images-parameter) VUID-VkPipelineRobustnessCreateInfo-images-parameter

 `images` **must** be a valid [VkPipelineRobustnessImageBehavior](VkPipelineRobustnessImageBehavior.html) value

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

* 
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html)

* 
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html)

[VK_EXT_pipeline_robustness](VK_EXT_pipeline_robustness.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkPipelineRobustnessBufferBehavior](VkPipelineRobustnessBufferBehavior.html), [VkPipelineRobustnessImageBehavior](VkPipelineRobustnessImageBehavior.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineRobustnessCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
