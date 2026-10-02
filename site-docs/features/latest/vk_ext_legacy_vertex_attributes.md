# VK_EXT_legacy_vertex_attributes

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_legacy_vertex_attributes.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Features](#_api_features)
- [3.1._API_Features](#_api_features)
- [4. Examples](#_examples)
- [5. Issues](#_issues)
- [5.1. Should implementations convert float/integer values?](#_should_implementations_convert_floatinteger_values)
- [5.1._Should_implementations_convert_float/integer_values?](#_should_implementations_convert_floatinteger_values)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Features](#_api_features)

[4. Examples](#_examples)
[5. Issues](#_issues)

[5.1. Should implementations convert float/integer values?](#_should_implementations_convert_floatinteger_values)

This document proposes adding legacy features for vertex attributes as found in OpenGL.

OpenGL allows three features that Vulkan explicitly prohibits:

* 
Vertex attributes loaded from arbitrary buffer alignments

* 
Vertex attributes using arbitrary strides

* 
Vertex attributes where the component data type of the binding does not match the component numeric type of the shader input

This proposal aims to provide this legacy functionality for non-64-bit attributes.

These legacy features can be emulated by rewriting vertex buffers and generating shader variants. Neither option
is as optimal as having the underlying driver handle the functionality, where it may be a no-op.

The following features are exposed by this extension:

typedef struct VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           legacyVertexAttributes;
} VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT;

`legacyVertexAttributes` is the core feature enabling this extension’s functionality.

The following properties are exposed by this extension:

typedef struct VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           nativeUnalignedPerformance;
} VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT;

`nativeUnalignedPerformance` indicates that using unaligned vertex fetches on this implementation will not incur significant performance penalties.

Enabling this feature allows the following example scenarios for a user with dynamic vertex input active:

* 
Binding a vertex buffer at offset=7

* 
Binding a VK_FORMAT_R32_UINT attribute with stride=1

* 
Binding a VK_FORMAT_R8_UINT attribute and reading it as signed `int` in a shader

No. When fetching an integer data type from float values or float
data types from integer values, the resulting shader values are
implementation-dependent.
