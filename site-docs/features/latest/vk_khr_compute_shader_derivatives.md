# VK_KHR_compute_shader_derivatives

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_compute_shader_derivatives.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. New SPIR-V execution modes](#_new_spir_v_execution_modes)
- [3.1._New_SPIR-V_execution_modes](#_new_spir_v_execution_modes)
- [3.2. Features](#_features)
- [3.3. Properties](#_properties)
- [3.4. GLSL mapping](#_glsl_mapping)
- [3.4._GLSL_mapping](#_glsl_mapping)
- [4. Issues](#_issues)
- [4.1. Should we specify that the groups of four shader invocations used for derivatives in a compute shader are the same groups of four invocations that form a "quad" in shader subgroups?](#_should_we_specify_that_the_groups_of_four_shader_invocations_used_for_derivatives_in_a_compute_shader_are_the_same_groups_of_four_invocations_that_form_a_quad_in_shader_subgroups)
- [4.1._Should_we_specify_that_the_groups_of_four_shader_invocations_used_for_derivatives_in_a_compute_shader_are_the_same_groups_of_four_invocations_that_form_a_"quad"_in_shader_subgroups?](#_should_we_specify_that_the_groups_of_four_shader_invocations_used_for_derivatives_in_a_compute_shader_are_the_same_groups_of_four_invocations_that_form_a_quad_in_shader_subgroups)
- [4.2. Should we add support for derivatives in mesh and task shaders?](#_should_we_add_support_for_derivatives_in_mesh_and_task_shaders)
- [4.2._Should_we_add_support_for_derivatives_in_mesh_and_task_shaders?](#_should_we_add_support_for_derivatives_in_mesh_and_task_shaders)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. New SPIR-V execution modes](#_new_spir_v_execution_modes)
[3.2. Features](#_features)
[3.3. Properties](#_properties)
[3.4. GLSL mapping](#_glsl_mapping)

[4. Issues](#_issues)

[4.1. Should we specify that the groups of four shader invocations used for derivatives in a compute shader are the same groups of four invocations that form a "quad" in shader subgroups?](#_should_we_specify_that_the_groups_of_four_shader_invocations_used_for_derivatives_in_a_compute_shader_are_the_same_groups_of_four_invocations_that_form_a_quad_in_shader_subgroups)
[4.2. Should we add support for derivatives in mesh and task shaders?](#_should_we_add_support_for_derivatives_in_mesh_and_task_shaders)

This extension enables applications to use derivative operations from execution models with defined workgroups.

|  | This extension is a promotion (with additions) of
| --- | --- |
[VK_NV_compute_shader_derivatives](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_NV_compute_shader_derivatives).
As that extension already shipped before proposal documents existed, this document has been written
retroactively during promotion to KHR. |

The changes relative to `VK_NV_compute_shader_derivatives` are the inclusion of optional
mesh and task shader support.

As some developers replace portions of the graphics pipeline by custom algorithms in compute, certain operations reserved for fragment shaders such as derivatives become a major hurdle to work around.  This manifests in particular when using Shader Model 6.6 where derivative and derivative-dependent texture sample operations are required to be supported, but have no equivalent in Vulkan other than a vendor specific extension.

Three options have been considered:

* 
Take VK_NV_compute_shader_derivatives as-is.

* 
Take VK_NV_compute_shader_derivatives and add support for all execution models with defined workgroup size.

* 
Start afresh

This proposal focuses on the second option.

This extension adds Vulkan support for the [`SPV_KHR_compute_shader_derivatives`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_compute_shader_derivatives.html) SPIR-V extension.

The SPIR-V extension provides two new execution modes, both of which allow execution models with defined workgroups to use built-ins that evaluate derivatives explicitly or implicitly. Derivatives will be computed via differencing over a 2x2 group of shader invocations.

* 
The 'DerivativeGroupQuadsKHR' execution mode assembles shader invocations into 2x2 groups, where each group has x and y coordinates of the local invocation ID of the form (2m+{0,1}, 2n+{0,1}).

* 
The 'DerivativeGroupLinearKHR' execution mode assembles shader invocations into 2x2 groups, where each group has local invocation index values of the form 4m+{0,1,2,3}.

A new feature enables each of the SPIR-V execution modes introduced by this extension:

typedef struct VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR {
    VkStructureType                         sType;
    void*                                   pNext;
    VkBool32                                computeDerivativeGroupQuads;
    VkBool32                                computeDerivativeGroupLinear;
} VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR;

Each value maps to a SPIR-V execution mode:
 - computeDerivativeGroupQuads enables the SPIR-V 'DerivativeGroupQuadsKHR' execution mode
 - computeDerivativeGroupLinear enables the SPIR-V 'DerivativeGroupLinearKHR' execution mode

A new property is added which determines if the new execution modes can be used in mesh and task shaders:

typedef struct VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           meshAndTaskShaderDerivatives;
} VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR;

If this property is 'VK_FALSE', the derivatives are only supported in compute shaders.

The following layout qualifiers from GLSL_KHR_compute_shader_derivatives map to these SPIR-V execution modes:

* 
derivative_group_quadsKHR layout qualifier → DerivativeGroupQuadsKHR Execution Mode

* 
derivative_group_linearKHR layout qualifier → DerivativeGroupLinearKHR Execution Mode

Yes.

Yes, as optional features. Add them as an optional feature as they are in SM6.6.
