# VK_EXT_shader_long_vector

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_shader_long_vector.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [4. Examples](#_examples)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)
[4. Examples](#_examples)

This extension adds support for vectors with more than four components, and for
vectors whose component count comes from a specialization constant.

This is a generalization of the vector support in VK_NV_cooperative_vector. The
goal is to allow long vectors to be used almost anywhere a vector is allowed.

The design is straightforward. Allow larger component count for OpTypeVector.
Add a new instruction OpTypeVectorIdEXT where the component count comes from
a constant instruction. The main question is whether OpTypeVectorIdEXT and
OpTypeCooperativeVectorNV are the same instruction (they are).

None.
