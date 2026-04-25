# SubgroupSize(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SubgroupSize.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SubgroupSize - Size of a subgroup

`SubgroupSize`

Decorating a variable with the `SubgroupSize` builtin decoration will
make that variable contain the implementation-dependent
[number of invocations in a subgroup](../../../../spec/latest/chapters/devsandqueues.html#limits-subgroupSize).
This value **must** be a power-of-two integer.

If the pipeline was created with the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](VkPipelineShaderStageCreateFlagBits.html) flag
set,
or the shader object was created with the
[VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag set,
or the SPIR-V `module` is at least version 1.6,
the `SubgroupSize` decorated variable will contain the subgroup size for
each subgroup that gets dispatched.
This value **must** be between [`minSubgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-minSubgroupSize) and [`maxSubgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxSubgroupSize) and **must** be uniform with [subgroup scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-subgroup).
The value **may** vary across a single draw call, and for fragment shaders **may**
vary across a single primitive.
In compute dispatches, `SubgroupSize` **must** be uniform with
[command scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-command).
In mesh and task shaders, `SubgroupSize` **must** be uniform with
[command scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-command).
In a single [command scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-command), the mesh and task
shader **may** have different `SubgroupSize`.

If the pipeline was created with a chained
[VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html) structure,
or the shader object was created with a chained
[VkShaderRequiredSubgroupSizeCreateInfoEXT](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html) structure,
the `SubgroupSize` decorated variable will match
[`requiredSubgroupSize`](../../../../spec/latest/chapters/pipelines.html#pipelines-required-subgroup-size).

If
SPIR-V `module` is less than version 1.6 and
the pipeline was not created with the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](VkPipelineShaderStageCreateFlagBits.html) flag
set and no [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html)
structure was chained,
and the shader was not created with the
[VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](VkShaderCreateFlagBitsEXT.html) flag set and no
[VkShaderRequiredSubgroupSizeCreateInfoEXT](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html) structure was chained,
the
variable decorated with `SubgroupSize` will match [`subgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-subgroupSize).

The maximum number of invocations that an implementation can support per
subgroup is 128.

|  | The old behavior for `SubgroupSize` is considered legacy as certain
| --- | --- |
compute algorithms cannot be easily implemented without the guarantees of
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](VkPipelineShaderStageCreateFlagBits.html) and
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](VkPipelineShaderStageCreateFlagBits.html). |

Valid Usage

* 
[](#VUID-SubgroupSize-SubgroupSize-04382) VUID-SubgroupSize-SubgroupSize-04382

The variable decorated with `SubgroupSize` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupSize-SubgroupSize-04383) VUID-SubgroupSize-SubgroupSize-04383

The variable decorated with `SubgroupSize` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
