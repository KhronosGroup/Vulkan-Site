# VK_EXT_shader_subgroup_vote(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_subgroup_vote.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_subgroup_vote](#VK_EXT_shader_subgroup_vote)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Deprecated by Vulkan 1.1](#_deprecated_by_vulkan_1_1)
- [Deprecated_by_Vulkan_1.1](#_deprecated_by_vulkan_1_1)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_subgroup_vote - device extension

**Name String**

`VK_EXT_shader_subgroup_vote`

**Extension Type**

Device extension

**Registered Extension Number**

66

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_KHR_subgroup_vote](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_subgroup_vote.html)

**Deprecation State**

* 
*Deprecated* by
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-new-features)

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_subgroup_vote] @dgkoch%0A*Here describe the issue or question you have about the VK_EXT_shader_subgroup_vote extension*)

**Last Modified Date**

2016-11-28

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_ARB_shader_group_vote`](https://registry.khronos.org/OpenGL/extensions/ARB/ARB_shader_group_vote.txt)

**Contributors**

* 
Neil Henning, Codeplay

* 
Daniel Koch, NVIDIA Corporation

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_KHR_subgroup_vote`

This extension provides new SPIR-V instructions:

* 
`OpSubgroupAllKHR`,

* 
`OpSubgroupAnyKHR`, and

* 
`OpSubgroupAllEqualKHR`.

to compute the composite of a set of boolean conditions across a group of
shader invocations that are running concurrently (a *subgroup*).
These composite results may be used to execute shaders more efficiently on a
[VkPhysicalDevice](VkPhysicalDevice.html).

When using GLSL source-based shader languages, the following shader
functions from GL_ARB_shader_group_vote can map to these SPIR-V
instructions:

* 
`anyInvocationARB`() → `OpSubgroupAnyKHR`,

* 
`allInvocationsARB`() → `OpSubgroupAllKHR`, and

* 
`allInvocationsEqualARB`() → `OpSubgroupAllEqualKHR`.

The subgroup across which the boolean conditions are evaluated is
implementation-dependent, and this extension provides no guarantee over how
individual shader invocations are assigned to subgroups.
In particular, a subgroup has no necessary relationship with the compute
shader *local workgroup* — any pair of shader invocations in a compute
local workgroup may execute in different subgroups as used by these
instructions.

Compute shaders operate on an explicitly specified group of threads (a local
workgroup), but many implementations will also group non-compute shader
invocations and execute them concurrently.
When executing code like

if (condition) {
  result = do_fast_path();
} else {
  result = do_general_path();
}

where `condition` diverges between invocations, an implementation might
first execute `do_fast_path`() for the invocations where `condition`
is true and leave the other invocations dormant.
Once `do_fast_path`() returns, it might call `do_general_path`() for
invocations where `condition` is `false` and leave the other
invocations dormant.
In this case, the shader executes **both** the fast and the general path and
might be better off just using the general path for all invocations.

This extension provides the ability to avoid divergent execution by
evaluating a condition across an entire subgroup using code like:

if (allInvocationsARB(condition)) {
  result = do_fast_path();
} else {
  result = do_general_path();
}

The built-in function `allInvocationsARB`() will return the same value
for all invocations in the group, so the group will either execute
`do_fast_path`() or `do_general_path`(), but never both.
For example, shader code might want to evaluate a complex function
iteratively by starting with an approximation of the result and then
refining the approximation.
Some input values may require a small number of iterations to generate an
accurate result (`do_fast_path`) while others require a larger number
(`do_general_path`).
In another example, shader code might want to evaluate a complex function
(`do_general_path`) that can be greatly simplified when assuming a
specific value for one of its inputs (`do_fast_path`).

All functionality in this extension is superseded by the core Vulkan 1.1
[subgroup operations](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceSubgroupProperties).

* 
`VK_EXT_SHADER_SUBGROUP_VOTE_EXTENSION_NAME`

* 
`VK_EXT_SHADER_SUBGROUP_VOTE_SPEC_VERSION`

* 
[`SubgroupVoteKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-SubgroupVoteKHR)

* 
Revision 1, 2016-11-28 (Daniel Koch)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_subgroup_vote).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
