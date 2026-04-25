# VK_AMD_shader_early_and_late_fragment_tests

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_AMD_shader_early_and_late_fragment_tests.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. New Vulkan feature](#_new_vulkan_feature)
- [3.1._New_Vulkan_feature](#_new_vulkan_feature)
- [3.2. New SPIR-V Execution Modes](#_new_spir_v_execution_modes)
- [3.2._New_SPIR-V_Execution_Modes](#_new_spir_v_execution_modes)
- [3.3. New GLSL Layout Qualifiers](#_new_glsl_layout_qualifiers)
- [3.3._New_GLSL_Layout_Qualifiers](#_new_glsl_layout_qualifiers)
- [3.4. New HLSL Attributes](#_new_hlsl_attributes)
- [3.4._New_HLSL_Attributes](#_new_hlsl_attributes)
- [4. Issues](#_issues)
- [4.1. Should we expose a property indicating if the implementation is actually going to perform early and late tests?](#_should_we_expose_a_property_indicating_if_the_implementation_is_actually_going_to_perform_early_and_late_tests)
- [4.1._Should_we_expose_a_property_indicating_if_the_implementation_is_actually_going_to_perform_early_and_late_tests?](#_should_we_expose_a_property_indicating_if_the_implementation_is_actually_going_to_perform_early_and_late_tests)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. New Vulkan feature](#_new_vulkan_feature)
[3.2. New SPIR-V Execution Modes](#_new_spir_v_execution_modes)
[3.3. New GLSL Layout Qualifiers](#_new_glsl_layout_qualifiers)
[3.4. New HLSL Attributes](#_new_hlsl_attributes)

[4. Issues](#_issues)

[4.1. Should we expose a property indicating if the implementation is actually going to perform early and late tests?](#_should_we_expose_a_property_indicating_if_the_implementation_is_actually_going_to_perform_early_and_late_tests)

This document describes a proposal for a new SPIR-V execution mode that allows fragment shaders to be discarded by early fragment operations, even if they contain writes to storage resources or other side effects.

Most graphics devices are able to take advantage of early fragment operations when a fragment shader avoids certain operations - e.g. writing to depth or stencil, or to storage resources, providing significant performance advantages in most cases.
This is implicitly enabled wherever possible, and can be explicitly enabled by specifying the `EarlyFragmentTests` execution mode in SPIR-V.
However the `EarlyFragmentTests` execution mode makes it invalid to write fragment depth from a shader.

Some implementations can perform depth testing both before *and* after fragment shading, allowing a conservative early test to discard most fragments and a late test to discard with more precision.
[GL_ARB_conservative_depth](https://registry.khronos.org/OpenGL/extensions/ARB/ARB_conservative_depth.txt) added a way to enable this optimization even when depth was written by the fragment shader, allowing further optimizations to be achieved in certain conditions.
However, if the shader also writes to storage resources, no such optimization is possible due to the predictability requirements of the specification.
In cases where an application does not care whether storage writes are performed by a fragment shader when discarded, it is possible to use this capability for a significant performance improvement on some console platforms, but so far Vulkan has no mechanism to do this.
For some applications, this can mean an unnecessary performance hit that should be relatively straightforward to solve.

There is only really one solution to this problem, which is to expose this capability to applications in some way.
The main question is how to expose this, at what granularity, and whether we should provide any guarantees.
Ultimately this should be relatively easy to turn on/off, and ideally should be set per-fragment shader in some form.

The main options for signifying the switch are:

Pipeline creation flag

SPIR-V execution mode

Non-semantic instruction

If it becomes a pipeline creation flag, it is easy to turn on/off on a per-pipeline basis.
However, the knowledge of whether the writes can be discarded is usually a property of whatever algorithm has been written in the fragment shader code itself, meaning this property has to be specified in two places.
From that perspective, it makes sense to have something in the shader code itself.

A SPIR-V execution mode is a straightforward way to express this, and it is consistent with the way that conservative depth is expressed in SPIR-V (e.g. `DepthGreater` [Execution Mode](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Execution_Mode)).
The downside of using an execution mode which is essentially an optimization hint is that drivers have to implement the extension for the SPIR-V to be valid; when in fact it can be safely ignored in all cases.

Non-Semantic instructions seem like they could offer a way to specify the behavior without need for drivers to implement anything new.
Unfortunately, as the induced behavior violates the current Vulkan specification, it is not suitable for this use case, as it cannot be safely added to all shaders.

Without a wider "this can be ignored but can change behavior" extension along the lines of the non-semantic extension, a SPIR-V execution mode is likely the most suitable option.
Applications, an application-facing library, or a Vulkan software layer could be used to automatically remove the execution mode when not supported.
Implementations should also eventually be able to support the execution mode as a no-op if they do not have the required capabilities.

typedef struct VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderEarlyAndLateFragmentTests;
} VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD;

This feature allows the new execution mode in SPIR-V shaders consumed by the implementation.

A new execution mode is introduced which allows for early depth and stencil tests to be performed both early and late when depth and stencil writes are performed, in combination with the depth optimizations.
In order to allow for stencil reference writes with this new execution mode, similar stencil reference write optimizations are provided.

| Execution mode | Extra Operands | Enabling Capabilities |
| --- | --- | --- |
| 5017 | **EarlyAndLateFragmentTestsAMD**

Fragment tests can be performed both before and after fragment shader execution, with latter tests taking values written to *FragDepth* and *FragStencilRefEXT* into account. Early tests are not guaranteed, late tests are.+

If neither of **ExecutionModeDepthReplacing** or **ExecutionModeStencilRefReplacingEXT** are specified, functions identically to **EarlyFragmentTests**.

If this and **ExecutionModeStencilRefReplacingEXT** are both specified, one of **StencilRefGreaterAMD**, **StencilRefLessAMD**, or **StencilRefUnchangedAMD** must also be specified.

If this and **ExecutionModeDepthReplacing** are both specified, one of **DepthGreater**, **DepthLess**, or **DepthUnchanged** must also be specified.

Only valid with the Fragment [Execution Model](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Execution_Model).

See client API for detail on fragment operations. |  | **Shader** |
| 5079 | **StencilRefUnchangedFrontAMD**

Indicates that early per-fragment tests may assume that any *FragStencilRefEXT* built in-decorated value written by the shader is equal to the stencil reference value set for the front face in the client API after masking.
Late per-fragment tests will use the written value as normal.

Only valid with the Fragment [Execution Model](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Execution_Model).

At most one of **StencilRefGreaterAMD**, **StencilRefLessAMD**, and **StencilRefUnchangedAMD** can be specified. |  | **StencilExportEXT** |
| 5080 | **StencilRefGreaterFrontAMD**

Indicates that early per-fragment tests may assume that any *FragStencilRefEXT* built in-decorated value written by the shader is greater than or equal to the stencil reference value set for the front face in the client API after masking.
Late per-fragment tests will use the written value as normal.

Only valid with the Fragment [Execution Model](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Execution_Model).

At most one of **StencilRefGreaterAMD**, **StencilRefLessAMD**, and **StencilRefUnchangedAMD** can be specified. |  | **StencilExportEXT** |
| 5081 | **StencilRefLessFrontAMD**

Indicates that early per-fragment tests may assume that any *FragStencilRefEXT* built in-decorated value written by the shader is less than or equal to the stencil reference value  set for the front face in the client API after masking.
Late per-fragment tests will use the written value as normal.

Only valid with the Fragment [Execution Model](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Execution_Model).

At most one of **StencilRefGreaterAMD**, **StencilRefLessAMD**, and **StencilRefUnchangedAMD** can be specified. |  | **StencilExportEXT** |
| 5082 | **StencilRefUnchangedBackAMD**

Indicates that early per-fragment tests may assume that any *FragStencilRefEXT* built in-decorated value written by the shader is equal to the stencil reference value set for the back face in the client API after masking.
Late per-fragment tests will use the written value as normal.

Only valid with the Fragment [Execution Model](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Execution_Model).

At most one of **StencilRefGreaterAMD**, **StencilRefLessAMD**, and **StencilRefUnchangedAMD** can be specified. |  | **StencilExportEXT** |
| 5083 | **StencilRefGreaterBackAMD**

Indicates that early per-fragment tests may assume that any *FragStencilRefEXT* built in-decorated value written by the shader is greater than or equal to the stencil reference value set for the back face in the client API after masking.
Late per-fragment tests will use the written value as normal.

Only valid with the Fragment [Execution Model](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Execution_Model).

At most one of **StencilRefGreaterAMD**, **StencilRefLessAMD**, and **StencilRefUnchangedAMD** can be specified. |  | **StencilExportEXT** |
| 5084 | **StencilRefLessBackAMD**

Indicates that early per-fragment tests may assume that any *FragStencilRefEXT* built in-decorated value written by the shader is less than or equal to the stencil reference value set for the back face in the client API after masking.
Late per-fragment tests will use the written value as normal.

Only valid with the Fragment [Execution Model](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Execution_Model).

At most one of **StencilRefGreaterAMD**, **StencilRefLessAMD**, and **StencilRefUnchangedAMD** can be specified. |  | **StencilExportEXT** |

This allows implementations to perform both early and late tests explicitly.

The following new layout qualifiers are added to GLSL:

Fragment shaders allow the following stand-alone declaration:

__early_and_late_fragment_testsAMD

to request that certain fragment tests be performed before and after fragment shader execution, as described in
the “Fragment Operations” chapter of the Vulkan 1.2 Specification.
This declaration must appear in a line on its own.

The following additional standalone declarations may be specified:

layout-qualifier-id:
    __stencil_ref_unchanged_frontAMD
    __stencil_ref_less_frontAMD
    __stencil_ref_greater_frontAMD
    __stencil_ref_unchanged_backAMD
    __stencil_ref_less_backAMD
    __stencil_ref_greater_backAMD

These declarations must each appear in a line on their own.
Only one *stencil_ref_*frontAMD and one *stencil_ref*_backAMD declaration may be specified.
Each declaration constrains the intentions of the final value of `gl_FragStencilRefARB` written by any shader invocation.
Implementations are allowed to perform optimizations assuming that the stencil test fails (or passes) for a given fragment if all values of `gl_FragStencilRefARB` consistent with the declaration would fail (or pass).
This potentially includes skipping shader execution if the fragment is discarded because it is occluded and the shader has no side effects.
If the final value of `gl_FragStencilRefARB` is inconsistent with the declaration for the facing of the shaded polygon, the result of the stencil test for the corresponding fragment is undefined.
If the stencil test passes and stencil writes are enabled, the value written to the stencil buffer is always the value of `gl_FragStencilRefARB`, whether or not it is consistent with the layout qualifier.

Each of the above qualifiers maps directly to the equivalently named spir-v execution mode.

The following new [Vulkan Specific Attribute](https://github.com/microsoft/DirectXShaderCompiler/blob/main/docs/SPIR-V.rst#vulkan-specific-attributes) is added:

* 
`early_and_late_tests`: Marks an entry point as enabling early and late depth tests.
If depth is written via `SV_Depth`, `depth_unchanged` must also be specified (SV_DepthLess and SV_DepthGreater can be written freely).
If a stencil reference value is written via `SV_StencilRef`, one of `stencil_ref_unchanged_front`, `stencil_ref_greater_equal_front`, or `stencil_ref_less_equal_front` and one of `stencil_ref_unchanged_back`, `stencil_ref_greater_equal_back`, or `stencil_ref_less_equal_back` must be specified.

* 
`depth_unchanged`: Specifies that any depth written to `SV_Depth` will not invalidate the result of early depth tests.
Sets the `DepthUnchanged` execution mode in SPIR-V.

* 
`stencil_ref_unchanged_front`: Specifies that any stencil ref written to `SV_StencilRef` will not invalidate the result of early stencil tests when the fragment is front facing.
Sets the `StencilRefUnchangedFrontAMD` execution mode in SPIR-V.

* 
`stencil_ref_greater_equal_front`: Specifies that any stencil ref written to `SV_StencilRef` will be greater than or equal to the stencil reference value set by the API when the fragment is front facing.
Sets the `StencilRefGreaterFrontAMD` execution mode in SPIR-V.

* 
`stencil_ref_less_equal_front`: Specifies that any stencil ref written to `SV_StencilRef` will be less than or equal to the stencil reference value set by the API when the fragment is front facing.
Sets the `StencilRefLessFrontAMD` execution mode in SPIR-V.

* 
`stencil_ref_unchanged_back`: Specifies that any stencil ref written to `SV_StencilRef` will not invalidate the result of early stencil tests when the fragment is back facing.
Sets the `StencilRefUnchangedBackAMD` execution mode in SPIR-V.

* 
`stencil_ref_greater_equal_back`: Specifies that any stencil ref written to `SV_StencilRef` will be greater than or equal to the stencil reference value set by the API when the fragment is back facing.
Sets the `StencilRefGreaterBackAMD` execution mode in SPIR-V.

* 
`stencil_ref_less_equal_back`: Specifies that any stencil ref written to `SV_StencilRef` will be less than or equal to the stencil reference value set by the API when the fragment is back facing.
Sets the `StencilRefLessBackAMD` execution mode in SPIR-V.

Shaders must not specify more than one of `stencil_ref_unchanged_front`, `stencil_ref_greater_equal_front`, and `stencil_ref_less_equal_front`.
Shaders must not specify more than one of `stencil_ref_unchanged_back`, `stencil_ref_greater_equal_back`, and `stencil_ref_less_equal_back`.

Only implementations actually supporting this functionality correctly should expose this extension.
