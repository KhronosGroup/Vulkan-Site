# VK_KHR_shader_expect_assume

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_shader_expect_assume.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [4. Examples](#_examples)
- [5. Issues](#_issues)
- [5.1. What shader stages should the instructions introduced by this extension be allowed in?](#_what_shader_stages_should_the_instructions_introduced_by_this_extension_be_allowed_in)
- [5.1._What_shader_stages_should_the_instructions_introduced_by_this_extension_be_allowed_in?](#_what_shader_stages_should_the_instructions_introduced_by_this_extension_be_allowed_in)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)
[4. Examples](#_examples)
[5. Issues](#_issues)

[5.1. What shader stages should the instructions introduced by this extension be allowed in?](#_what_shader_stages_should_the_instructions_introduced_by_this_extension_be_allowed_in)

This document proposes adding support for expect/assume SPIR-V instructions
to guide shader program optimizations.

Shader writers or generators as well as other SPIR-V producers (e.g. Machine
Learning compilers) often have access to information that could enable the SPIR-V
consumers in Vulkan implementations to make better optimization decisions, such
as knowledge of the likely value of objects or whether a given condition holds,
but which they cannot communicate to a Vulkan SPIR-V consumer using existing features.

SPIR-V already provides some mechanisms for producers to give hints to consumers
in a limited number of scenarios:

* 
`OpBranchConditional` can accept branch weights that enable producers to
indicate the likelihood of each path. This does not however generalize
to `OpSwitch` constructs.

* 
Various so called *Loop Controls* make it possible for producers to provide
metadata about the iteration count of loops or desired unrolling behavior.

There is however no exposed generic mechanism for SPIR-V producers to communicate
optimization information to consumers. SPIR-V does support dedicated instructions,
introduced by the
[SPV_KHR_expect_assume](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_expect_assume.html)
extension, that make it possible for producers to communicate to consumers the
likely value of an object or whether a given condition holds, but this extension
is currently not exposed in Vulkan.

Expose the
[SPV_KHR_expect_assume](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_expect_assume.html)
extension in Vulkan.

The `SPV_KHR_expect_assume` extension introduces two new instructions:

* 
`OpExpectKHR` makes it possible to state the most probable value of its input.

* 
`OpAssumeTrueKHR` enables the optimizer to assume that the provided condition is
always true.

As an illustration, consider the following pseudocode example:

c = 20
d = 2
b = c / d

if (a - b > 0) {
    ...
} else {
    ...
}

The writer or producer may know that a > 10. This knowledge makes it possible
to completely remove the `else` branch. In this case, the producer could perform
that optimization alone. However, if the producer only knows that `a` is greater
than *some* value provided, say with a specialization constant, it can no longer
perform the optimization. Adding that information to the SPIR-V module would
enable the SPIR-V consumer to do it.

Another possible use could be to provide guarantees that a particular value
is not NaN or infinite:

value = load(...)
assume(!isnan(value))

No restrictions are placed on the shader stages the instructions can
be used in.
