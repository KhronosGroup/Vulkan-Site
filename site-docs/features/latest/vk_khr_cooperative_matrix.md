# VK_KHR_cooperative_matrix

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_cooperative_matrix.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [4. Examples](#_examples)
- [5. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)
[4. Examples](#_examples)
[5. Issues](#_issues)

This document proposes adding support for so-called cooperative matrix
operations that enables multiple shader invocations to cooperatively and
efficiently perform matrix multiplications.

A growing number of GPU applications are making use of matrix multiplication
operations. Modern GPU HW can take advantage of cross-invocation communication
channels or other hardware facilities to implement matrix multiplications
operations more efficiently but there is currently no suitable standard
SPIR-V/API mechanism to expose these features to applications or libraries.

Applications or libraries can use subgroup primitives to write more efficient
matrix multiplication kernels but, while technically possible on some hardware,
this approach often does not make it possible to write optimal kernels and
requires applications to have a lot of device-specific knowledge.

NVIDIA exposed with VK_NV_cooperative_matrix a new set of abstractions for such
cooperative matrix operations. These include cooperative load and store
instructions, a matrix multiplication-addition instruction as well a limited
support for element-wise operations on these matrices. Since the release of
that extension, a growing body of evidence in the form of discussions and
other similar vendor extensions suggests that this approach is suitable for
a wide variety of devices and applications and is thus a good candidate for
standardization.

Work towards a standard extension that exposes abstractions similar as those
released under VK_NV_cooperative_matrix.

See specifications and presentations for VK_NV_cooperative_matrix.

None.
