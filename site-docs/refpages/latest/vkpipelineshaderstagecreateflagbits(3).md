# VkPipelineShaderStageCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineShaderStageCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineShaderStageCreateFlagBits - Bitmask controlling how a pipeline shader stage is created

Possible values of the `flags` member of
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) specifying how a pipeline shader stage
is created, are:

// Provided by VK_VERSION_1_0
typedef enum VkPipelineShaderStageCreateFlagBits {
  // Provided by VK_VERSION_1_3
    VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT = 0x00000001,
  // Provided by VK_VERSION_1_3
    VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT = 0x00000002,
  // Provided by VK_EXT_subgroup_size_control
    VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT = VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT,
  // Provided by VK_EXT_subgroup_size_control
    VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT = VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT,
} VkPipelineShaderStageCreateFlagBits;

* 
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](#)
specifies that the
[`SubgroupSize`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) **may** vary in the
shader stage.

* 
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](#)
    specifies that the subgroup sizes **must** be launched with all invocations
    active in the
task, mesh, or
    compute stage.

|  | If [VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](#)
| --- | --- |
and [VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](#) are
specified and [`minSubgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-minSubgroupSize) does not
equal [`maxSubgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxSubgroupSize) and no
[required subgroup size](../../../../spec/latest/chapters/pipelines.html#pipelines-required-subgroup-size) is specified,
then the only way to guarantee that the 'X' dimension of the local workgroup
size is a multiple of [`SubgroupSize`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) is to make it a multiple of `maxSubgroupSize`.
Under these conditions, you are guaranteed full subgroups but not any
particular subgroup size. |

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineShaderStageCreateFlags](VkPipelineShaderStageCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineShaderStageCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
