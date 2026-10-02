# VK_ARM_pipeline_opacity_micromap

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_ARM_pipeline_opacity_micromap.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Features](#_api_features)
- [3.1._API_Features](#_api_features)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Features](#_api_features)

This document outlines functionality to allow applications to specify that
a pipeline using Ray Query will not be used with acceleration structures
which reference an opacity micromap array.

The Opacity Micromap extension `VK_EXT_opacity_micromap` supports the new pipeline
creation flag `VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT`, indicating
that the ray tracing pipeline may be used with acceleration structures referencing
micromaps. This allows for possible optimizations, knowing beforehand that opacity
micromaps may be used.

An equivalent flag does not exist for pipelines supporting Ray Query with opacity
micromaps, such as graphics and compute. Consequently, it is currently not possible
to optimize such pipelines for no-opacity, e.g. when opacity micromaps are supported
by an application but not used by the pipeline. This may lead to performance degradation.

This extension adds a new flag, indicating that a pipeline will NOT be used
with an acceleration structure referencing an opacity micromap.

The new flag `VK_PIPELINE_CREATE_2_DISALLOW_OPACITY_MICROMAP_BIT_ARM` disallows the
functionality (rather than allowing its opposite) in order to not contradict the current
specification, which allows a pipeline defined without a flag to support opacity micromap.
Backward compatibility is consequently preserved.

Creation of a new flag `VK_PIPELINE_CREATE_2_DISALLOW_OPACITY_MICROMAP_BIT_ARM`, specifying
that the pipeline will not be used with acceleration structures which reference an opacity
micromap array.

static const VkPipelineCreateFlagBits2KHR VK_PIPELINE_CREATE_2_DISALLOW_OPACITY_MICROMAP_BIT_ARM = 0x2000000000ULL;

`VK_PIPELINE_CREATE_2_DISALLOW_OPACITY_MICROMAP_BIT_ARM` specifies that the pipeline will not be
used with acceleration structures which reference an opacity micromap array.
