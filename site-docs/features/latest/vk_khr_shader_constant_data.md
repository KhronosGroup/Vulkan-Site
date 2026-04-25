# VK_KHR_shader_constant_data

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_shader_constant_data.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

This extension allows applications to specify large constant data arrays in their shaders, and to specialize them.

[`SPV_KHR_constant_data`](https://github.khronos.org/SPIRV-Registry/extensions//KHR/SPV_KHR_constant_data.asciidoc) added the capability to specify arrayed data as constants in SPIR-V, to enable the specification of strings as data, or other chunks of data, in a more compact manner than previously available.
A detailed problem statement on why this was added to SPIR-V is provided in
the `SPV_KHR_constant_data` specification.

Support for this extension is required in Vulkan to add better string support to Vulkan, and particularly for [VK_KHR_shader_abort](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_shader_abort).

For the most part, exposing this extension is as trivial as most other SPIR-V extensions.
Despite specialization constant data being new in SPIR-V, the Vulkan specialization constant API already supports constants of arbitrary size, as long as they match the size of the data in SPIR-V.

The only change to the Vulkan API is to enable shaders using the SPV_KHR_constant_data extension.
