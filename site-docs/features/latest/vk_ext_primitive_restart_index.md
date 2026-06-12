# VK_EXT_primitive_restart_index

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_primitive_restart_index.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Features](#_api_features)
- [3.1._API_Features](#_api_features)
- [3.2. API Functions](#_api_functions)
- [3.2._API_Functions](#_api_functions)
- [4. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Features](#_api_features)
[3.2. API Functions](#_api_functions)

[4. Issues](#_issues)

This document proposes adding support for setting the index for primitive restart.

Other graphics APIs, such as OpenGL, provide functionality for arbitrarily setting the primitive restart index.
When performing similar operations in Vulkan, this functionality may be emulated, but many implementations are capable of handling it at the execution level to avoid needing alternative solutions.

This proposal aims to provide this functionality.

This functionality could alternatively be emulated with:

* 
Direct host readback of the index buffer to rewrite indices

* 
Compute shaders to rewrite the index buffer

For implementations which can trivially support a custom primitive restart index, however, this generates additional and unnecessary hardware load.

The following features are exposed by this extension:

typedef struct VkPhysicalDevicePrimitiveRestartIndexFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           primitiveRestartIndex;
} VkPhysicalDevicePrimitiveRestartIndexFeaturesEXT;

`primitiveRestartIndex` is the core feature enabling this extension’s functionality.

Enabling this extension allows calling `vkCmdSetPrimitiveRestartIndexEXT` to set a custom index.

void vkCmdSetPrimitiveRestartIndexEXT(VkCommandBuffer commandBuffer, uint32_t primitiveRestartIndex)

Binding an index buffer resets the index.

No known issues.
