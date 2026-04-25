# VK_KHR_shader_quad_control

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_shader_quad_control.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Requirements](#_requirements)
- [3.2. API](#_api)
- [3.3. SPIR-V](#_spir_v)
- [3.4. GLSL](#_glsl)
- [3.5. HLSL](#_hlsl)
- [4. Examples](#_examples)
- [5. Issues](#_issues)
- [5.1. Do the new quad operations invoke helpers automatically?](#_do_the_new_quad_operations_invoke_helpers_automatically)
- [5.1._Do_the_new_quad_operations_invoke_helpers_automatically?](#_do_the_new_quad_operations_invoke_helpers_automatically)
- [5.2. Why do the new quad operations not have execution scopes?](#_why_do_the_new_quad_operations_not_have_execution_scopes)
- [5.2._Why_do_the_new_quad_operations_not_have_execution_scopes?](#_why_do_the_new_quad_operations_not_have_execution_scopes)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Requirements](#_requirements)
[3.2. API](#_api)
[3.3. SPIR-V](#_spir_v)
[3.4. GLSL](#_glsl)
[3.5. HLSL](#_hlsl)

[4. Examples](#_examples)
[5. Issues](#_issues)

[5.1. Do the new quad operations invoke helpers automatically?](#_do_the_new_quad_operations_invoke_helpers_automatically)
[5.2. Why do the new quad operations not have execution scopes?](#_why_do_the_new_quad_operations_not_have_execution_scopes)

This document proposes an extension giving applications better guarantees about the uniformity of sampling and derivative operations in fragment shaders, and provides features to manage these guarantees.
The primary features are a new `QuadDerivativesKHR` execution mode in SPIR-V which allows derivatives to be used in quad-uniform control flow, new quad Any/All operations, and guaranteed helper invocation participation in group operations.

When using derivatives in fragment shader, either implicitly through sampling or explicitly, applications currently have to ensure that control flow is uniform across a primitive to avoid undefined results.
In many cases, the only way to guarantee this is to ensure fully uniform control flow for the entire draw command.
In practice, many applications do not do this, which can result in subtle (and hard to debug) visual glitches when rendering.

Many applications assume that derivatives are performed within a quad, which intuitively makes sense.
However, when the slope of a primitive is uniform across the primitive, some vendors can perform derivative calculations per-triangle instead of per-quad.

Even if derivative calculations are guaranteed per-quad, it is not trivial for an application to ensure uniform control flow across a quad. At the moment the most portable method for doing this at a conditional statement requires four group operations:

* 
OpGroupNonUniformQuadBroadcast four times at each index, broadcasting the results of a conditional check before actually branching on it

* 
OpAny to detect if any of the values are true

This would need to be repeated for each conditional statement at every step of the way to the derivative calculation - and the extra calculations can quickly add up to slow down a shader.

If clustered operations are supported, an application could theoretically use [`OpGroupNonUniformBitwiseOr`](https://registry.khronos.org/SPIR-V/specs/unified1/SPIRV.html#OpGroupNonUniformBitwiseOr) with a cluster size of 4 instead, but helper invocations are not guaranteed to participate in group operations that are not explicitly quad operations, so this would be unreliable.

Helper invocation participation in group operations has historically been ambiguous for the Vulkan spec, but this was fixed in [VK_KHR_shader_maximal_reconvergence](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_shader_maximal_reconvergence).

Any solution needs to address these problems by adding a way to require that derivatives are calculated at quad scope, and providing a way to maintain quad uniform control flow for derivative calculations.

Forcing per-quad derivatives has to be an implementation change - there needs to be something to tell an implementation to perform a derivative calculation at quad scope, as there is no reliable way to do that currently.
This could be anything from a device-wide switch to a per-instruction indicator, but something has to be there.
A device-wide switch could be a problem, as it will slow down *all* shaders if an implementation is otherwise using an optimization.
A per-instruction indicator would probably just bloat shader code unnecessarily - the expectation is that a single shader (or set of shaders) will either require quad derivatives throughout or they will not.
A per-shader switch should be a pragmatic choice, enabling individual shaders to make the switch as codebases are updated without either bloating that shader or affecting performance.

As for quad uniform control flow, no solution is strictly necessary as applications can maintain quad uniform control flow as described in the problem statement, however this is a heavy handed approach, and we expect vendors can do better if they have more semantic information about the operation, with less performance impact.
Adding some way to perform an explicit quad-wide `OpGroupNonUniformAny` with guarantees that helpers participate in those calculations would be the most straightforward way to solve this.

Adding a new scope would be one way to get enable quad operations, but this would be redundant in most operations, as quads have a strict mapping to subgroups; so clustered operations can effectively already operate at quad scope.
Any/all operations are not clustered however, so for these, the simplest fix is to simply add new variants of those instructions to enable the desired functionality.

This extension requires [Vulkan Version 1.1](https://docs.vulkan.org/spec/latest/appendices/versions.html#versions-1.1), [VK_KHR_vulkan_memory_model](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_vulkan_memory_model), [VK_KHR_shader_maximal_reconvergence](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_shader_maximal_reconvergence).

A new feature struct is added to the API:

typedef struct VkPhysicalDeviceShaderQuadControlFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderQuadControl;
} VkPhysicalDeviceShaderQuadControlFeaturesKHR;

When enabled, shaders can use the `QuadControlKHR` capability in shaders.

A new capability is added to SPIR-V:

| Capability | Implicitly Declares |
| --- | --- |
| 5087 | **QuadControlKHR**

Module uses the *QuadDerivativesKHR* or *RequireFullQuadsKHR* execution modes, or the **OpGroupNonUniformQuadAllKHR** or **OpGroupNonUniformQuadAllKHR** instructions. |  |

Two new execution modes are provided:

| Execution Mode | Extra Operands | Enabling Capabilities |
| --- | --- | --- |
| 5088 | **QuadDerivativesKHR**

The derivative group must be equivalent to the quad groups. |  | **QuadControlKHR** |
| 5089 | **RequireFullQuadsKHR**

Helper invocations must be spawned such that all quad groups start with four active invocations. Only valid with the **Fragment** *Execution Model*. |  | **QuadControlKHR** |

Two new instructions are added:

| **OpGroupNonUniformQuadAllKHR**
| --- | --- | --- | --- | --- |

Evaluates a predicate for all active invocations in the group, resulting in **true** if predicate evaluates to **true** for all active invocations in the group, otherwise the result is **false**.

*Result Type* must be a *Boolean Type*.

*Predicate* must be a *Boolean Type*. | Capability:

**QuadControlKHR** |
| 4 | 5110 | **

*Result Type* | *Result * | **

*Predicate* |

| **OpGroupNonUniformQuadAnyKHR**
| --- | --- | --- | --- | --- |

Evaluates a predicate for all active invocations in the group, resulting in **true** if predicate evaluates to **true** for any active invocation in the group, otherwise the result is **false**.

*Result Type* must be a *Boolean Type*.

*Predicate* must be a *Boolean Type*. | Capability:

**QuadControlKHR** |
| 4 | 5111 | **

*Result Type* | *Result * | **

*Predicate* |

The GLSL_EXT_shader_quad extension is added to glslang, providing quad operations and
built-ins mapping to the subgroup operations roughly as follows:

      layout (quad_derivatives) in; -> QuadDerivativesKHR execution mode
      layout (full_quads) in;       -> RequireFullQuadsKHR execution mode

      subgroupQuadAll(value) -> OpGroupNonUniformQuadAll(
        /*Predicate*/value)

      subgroupQuadAny(value) -> OpGroupNonUniformQuadAny(
        /*Predicate*/value)

These operations function identically to their subgroup counterparts, but operating at quad scope.

The new quad/helper related functionality of shader model 6.7 should neatly map to this extension: [https://devblogs.microsoft.com/directx/in-the-works-hlsl-shader-model-6-7/](https://devblogs.microsoft.com/directx/in-the-works-hlsl-shader-model-6-7/)

`QuadAny`/`QuadAll` will map to `OpGroupNonUniformQuadAny/All`, and using either of these functions will result in the `QuadDerivativesKHR` execution mode being used.
If `MaximallyReconvergesKHR` is not already specified by other means, it will be added when using either of `QuadAny`/`QuadAll`, or if the `[WaveOpsIncludeHelperLanes]` entry function attribute is specified for a pixel shader.
`IsHelperLane()` will map to the existing `HelperInvocation` Built-In.

A shader author might write something like the following fragment shader,
expecting the texture to only be loaded when necessary:

void main()
{
    ...

    fragColor = vec4(1.0);

    if (nonuniform_condition) {
        fragColor = texture(colorTexture, uv);
    }
}

However, because of the implicit derivatives the `texture` function has to
generate, the result has an undefined LoD selected.

Without this extension, working around this would require performing the
texture load if any fragment in the same primitive needed the result; which
is not a trivial condition to check for, and has significant additional
bandwidth requirements compared to the desired operation.

This extension, in combination with maximal reconvergence, lets shader
authors perform a significantly tighter check to get the right results;
guaranteeing derivatives are calculated within a quad, and providing the
ability to check conditions on a per-quad basis:

...
#extension GL_EXT_maximal_reconvergence : enable
#extension GL_EXT_shader_quad : enable
...

void main()
{
    ...

    fragColor = vec4(1.0);

    if (subgroupQuadAny(nonuniform_condition)) {
        vec4 color = texture(colorTexture, uv);

        if (nonuniform_condition) {
            fragColor = color;
        }
    }
}

This second example now has well-defined behavior, whilst minimizing texture
bandwidth - loads are only performed by quads passing the condition.

As a new execution mode is added to cover this, they do not.

This parameter was deemed redundant in recent discussions on existing quad operations; it has no meaning for quad operations.
