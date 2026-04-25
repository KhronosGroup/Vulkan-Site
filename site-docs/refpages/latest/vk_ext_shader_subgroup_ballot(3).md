# VK_EXT_shader_subgroup_ballot(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_subgroup_ballot.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_subgroup_ballot](#VK_EXT_shader_subgroup_ballot)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Deprecated by Vulkan 1.2](#_deprecated_by_vulkan_1_2)
- [Deprecated_by_Vulkan_1.2](#_deprecated_by_vulkan_1_2)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New Built-In Variables](#_new_built_in_variables)
- [New_Built-In_Variables](#_new_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_subgroup_ballot - device extension

**Name String**

`VK_EXT_shader_subgroup_ballot`

**Extension Type**

Device extension

**Registered Extension Number**

65

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_KHR_shader_ballot](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_shader_ballot.html)

**Deprecation State**

* 
*Deprecated* by
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-new-features)

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_subgroup_ballot] @dgkoch%0A*Here describe the issue or question you have about the VK_EXT_shader_subgroup_ballot extension*)

**Last Modified Date**

2016-11-28

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_ARB_shader_ballot`](https://registry.khronos.org/OpenGL/extensions/ARB/ARB_shader_ballot.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Neil Henning, Codeplay

* 
Daniel Koch, NVIDIA Corporation

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_KHR_shader_ballot`

This extension provides the ability for a group of invocations, which
execute in parallel, to do limited forms of cross-invocation communication
via a group broadcast of an invocation value, or broadcast of a bit array
representing a predicate value from each invocation in the group.

This extension provides access to a number of additional built-in shader
variables in Vulkan:

* 
`SubgroupEqMaskKHR`, containing the subgroup mask of the current
subgroup invocation,

* 
`SubgroupGeMaskKHR`, containing the subgroup mask of the invocations
greater than or equal to the current invocation,

* 
`SubgroupGtMaskKHR`, containing the subgroup mask of the invocations
greater than the current invocation,

* 
`SubgroupLeMaskKHR`, containing the subgroup mask of the invocations
less than or equal to the current invocation,

* 
`SubgroupLtMaskKHR`, containing the subgroup mask of the invocations
less than the current invocation,

* 
`SubgroupLocalInvocationId`, containing the index of an invocation
within a subgroup, and

* 
`SubgroupSize`, containing the maximum number of invocations in a
subgroup.

Additionally, this extension provides access to the new SPIR-V instructions:

* 
`OpSubgroupBallotKHR`,

* 
`OpSubgroupFirstInvocationKHR`, and

* 
`OpSubgroupReadInvocationKHR`,

When using GLSL source-based shader languages, the following variables and
shader functions from GL_ARB_shader_ballot can map to these SPIR-V built-in
decorations and instructions:

* 
`in uint64_t gl_SubGroupEqMaskARB;` → `SubgroupEqMaskKHR`,

* 
`in uint64_t gl_SubGroupGeMaskARB;` → `SubgroupGeMaskKHR`,

* 
`in uint64_t gl_SubGroupGtMaskARB;` → `SubgroupGtMaskKHR`,

* 
`in uint64_t gl_SubGroupLeMaskARB;` → `SubgroupLeMaskKHR`,

* 
`in uint64_t gl_SubGroupLtMaskARB;` → `SubgroupLtMaskKHR`,

* 
`in uint gl_SubGroupInvocationARB;` → `SubgroupLocalInvocationId`,

* 
`uniform uint gl_SubGroupSizeARB;` → `SubgroupSize`,

* 
`ballotARB`() → `OpSubgroupBallotKHR`,

* 
`readFirstInvocationARB`() → `OpSubgroupFirstInvocationKHR`, and

* 
`readInvocationARB`() → `OpSubgroupReadInvocationKHR`.

Most of the functionality in this extension is superseded by the core Vulkan
1.1 [subgroup operations](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceSubgroupProperties).
However, Vulkan 1.1 required the `OpGroupNonUniformBroadcast` “Id” to
be constant.
This restriction was removed in Vulkan 1.2 with the addition of the
[`subgroupBroadcastDynamicId`](../../../../spec/latest/chapters/features.html#features-subgroupBroadcastDynamicId)
feature.

* 
`VK_EXT_SHADER_SUBGROUP_BALLOT_EXTENSION_NAME`

* 
`VK_EXT_SHADER_SUBGROUP_BALLOT_SPEC_VERSION`

* 
[`SubgroupEqMaskKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgeq)

* 
[`SubgroupGeMaskKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgge)

* 
[`SubgroupGtMaskKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sggt)

* 
[`SubgroupLeMaskKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgle)

* 
[`SubgroupLtMaskKHR`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sglt)

* 
[`SubgroupLocalInvocationId`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgli)

* 
[`SubgroupSize`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs)

* 
[    `SubgroupBallotKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-SubgroupBallotKHR)

* 
Revision 1, 2016-11-28 (Daniel Koch)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_subgroup_ballot).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
