# VK_EXT_vertex_address_binding_unrestricted

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_vertex_address_binding_unrestricted.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Proposal](#_proposal)
- [2.1. API Features](#_api_features)
- [2.1._API_Features](#_api_features)
- [3. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Proposal](#_proposal)

[2.1. API Features](#_api_features)

[3. Issues](#_issues)

This document proposes adding support for binding vertex buffer addresses without bounds checking.

When optimizing vertex attribute updates for a draw command which reads only from the updated offset,
attribute data can be split off into a separate buffer for that draw. For this scenario, the vertex buffer data
can be bound using a negative offset into the address in order to reduce memory because the calculated draw-time parameters
will access valid data.

This proposal aims to provide this functionality.

The following features are exposed by this extension:

typedef struct VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           vertexAddressBindingUnrestricted;
} VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT;

`vertexAddressBindingUnrestricted` is the core feature enabling this extension’s functionality.

Enabling this extension disables bounds checking validation when binding vertex buffer addresses.

No known issues.
