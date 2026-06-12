# VK_EXT_primitives_generated_query

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_primitives_generated_query.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [2.1. Emulation Through Other Vulkan Queries](#_emulation_through_other_vulkan_queries)
- [2.1._Emulation_Through_Other_Vulkan_Queries](#_emulation_through_other_vulkan_queries)
- [2.2. A New Query Type](#_a_new_query_type)
- [2.2._A_New_Query_Type](#_a_new_query_type)
- [3. Proposal](#_proposal)
- [3.1. Features](#_features)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)

[2.1. Emulation Through Other Vulkan Queries](#_emulation_through_other_vulkan_queries)
[2.2. A New Query Type](#_a_new_query_type)

[3. Proposal](#_proposal)

[3.1. Features](#_features)

This proposal regards layering OpenGL over Vulkan, and provides a convenience
query for use by such layers.

In OpenGL, the `GL_PRIMITIVES_GENERATED` query can be used independently from
whether transform feedback is active or not.
There is no direct equivalent in Vulkan.

This extension provides a simple and efficient way to implement this OpenGL
query on top of Vulkan.

In Vulkan, the second result from the
`VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT` query produces the same value as
OpenGL’s `GL_PRIMITIVES_GENERATED` query.
However, this can only be used when transform feedback is active, and thus is
not suitable.

The result of `VK_QUERY_PIPELINE_STATISTIC_CLIPPING_INVOCATIONS_BIT` from the
`VK_QUERY_TYPE_PIPELINE_STATISTICS` query also produces the same result.
Support for this query implies support for a number of other statistics that
are not universally available, and so the `pipelineStatisticsQuery` feature is
often not available on Android devices.
Furthermore, emulating `GL_PRIMITIVES_GENERATED` and
`GL_CLIPPING_INPUT_PRIMITIVES_ARB` through the same Vulkan query creates
unnecessary complications, given that only one query of each type can be active
at a time in Vulkan.

A new Vulkan query type can be introduced to provide identical results to
OpenGL’s `GL_PRIMITIVES_GENERATED` query.
There are a number of limitations to address:

* 
Similarly to `VK_QUERY_PIPELINE_STATISTIC_CLIPPING_INVOCATIONS_BIT`, as
stated by the Vulkan spec, if `rasterizerDiscardEnable` is enabled the query
may not produce valid results on some hardware.

* 
Some hardware cannot produce a valid value when a non-zero transform feedback
stream is used (i.e.
`VkPipelineRasterizationStateStreamCreateInfoEXT::rasterizationStream` is not
zero).

This solution is adopted for this problem.

A new query type is added, namely `VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT`,
that behaves identically to the OpenGL `GL_PRIMITIVES_GENERATED` query.

typedef struct VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           primitivesGeneratedQuery;
    VkBool32           primitivesGeneratedQueryWithRasterizerDiscard;
    VkBool32           primitivesGeneratedQueryWithNonZeroStreams;
} VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT;

* 
`primitivesGeneratedQuery` specifies if the query is usable.

* 
If `primitivesGeneratedQueryWithRasterizerDiscard` is false, then rasterizer
discard (through
`VkPipelineRasterizationStateCreateInfo::rasterizerDiscardEnable` or
equivalent dynamic state) must not be enabled.

* 
If `primitivesGeneratedQueryWithNonZeroStreams` is false, the query cannot be
used in conjunction with non-zero transform feedback streams.

On hardware where `primitivesGeneratedQueryWithRasterizerDiscard` is not
available, the OpenGL layer can discard the rasterization result by some other
means; for example by using an empty scissor.

On hardware where `primitivesGeneratedQueryWithNonZeroStreams` is not
available, the transform feedback query can be used for non-zero streams since
transform feedback is necessarily active.
This is nonetheless not a concern for OpenGL layers as non-zero transform
feedback streams are not supported in OpenGL.
