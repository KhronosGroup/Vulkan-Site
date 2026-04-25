# VK_NV_ray_tracing_validation

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_NV_ray_tracing_validation.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [4. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)
[4. Issues](#_issues)

This document details the VK_NV_ray_tracing_validation extension which adds
support for ray tracing validation at an implementation level.

Ray tracing issues **can** be hard to debug. Validation layers **can** help root cause
some of the problems but a more detailed validation requires implementation
details.

Ray tracing validation by a Vulkan implementation performs more thorough checks
at the implementation level, which helps identify potential problems that
**cannot** be caught by the validation layers.

Warnings and errors **can** be delivered straight from a ray tracing implementation
to the application through a messenger callback registered with the
implementation, where they **can** be processed through existing application-side
debugging or logging systems.

Implementations may expose the [VK_NV_ray_tracing_validation](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_NV_ray_tracing_validation) extension
and the
[VkPhysicalDeviceRayTracingValidationFeaturesNV](https://docs.vulkan.org/spec/latest/chapters/features.html#VkPhysicalDeviceRayTracingValidationFeaturesNV)::`rayTracingValidation`
feature which allows applications to enable ray tracing validation.

None
