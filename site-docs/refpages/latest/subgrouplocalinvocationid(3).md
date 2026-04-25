# SubgroupLocalInvocationId(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SubgroupLocalInvocationId.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SubgroupLocalInvocationId - ID of the invocation within a subgroup

`SubgroupLocalInvocationId`

Decorating a variable with the `SubgroupLocalInvocationId` builtin
decoration will make that variable contain the index of the invocation
within the subgroup.
This variable is in range [0,`SubgroupSize`-1].

If [VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](VkPipelineShaderStageCreateFlagBits.html) is
specified,
or if `module` declares SPIR-V version 1.6 or higher, and the local
workgroup size in the X dimension of the `stage` is a multiple of
[`SubgroupSize`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs),
full subgroups are enabled for that pipeline stage.
When full subgroups are enabled, subgroups **must** be launched with all
invocations active, i.e., there is an active invocation with
`SubgroupLocalInvocationId` for each value in range
[0,`SubgroupSize`-1].

|  | There is no direct relationship between `SubgroupLocalInvocationId` and
| --- | --- |
`LocalInvocationId` or `LocalInvocationIndex`.
If the pipeline
or shader object
was created with full subgroups applications can compute their own local
invocation index to serve the same purpose:

index = `SubgroupLocalInvocationId` + `SubgroupId` ×
`SubgroupSize`

If full subgroups are not enabled, some subgroups may be dispatched with
inactive invocations that do not correspond to a local workgroup invocation,
making the value of index unreliable. |

|  | [VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](VkPipelineShaderStageCreateFlagBits.html)
| --- | --- |
and [VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](VkShaderCreateFlagBitsEXT.html) are
effectively deprecated when compiling SPIR-V 1.6 shaders, as this behavior
is the default for Vulkan with SPIR-V 1.6.
This is more aligned with developer expectations, and avoids applications
unexpectedly breaking in the future. |

Valid Usage

* 
[](#VUID-SubgroupLocalInvocationId-SubgroupLocalInvocationId-04380) VUID-SubgroupLocalInvocationId-SubgroupLocalInvocationId-04380

The variable decorated with `SubgroupLocalInvocationId` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupLocalInvocationId-SubgroupLocalInvocationId-04381) VUID-SubgroupLocalInvocationId-SubgroupLocalInvocationId-04381

The variable decorated with `SubgroupLocalInvocationId` **must** be
declared as a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
