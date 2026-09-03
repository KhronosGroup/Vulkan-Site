# VK_EXT_shader_uniform_buffer_unsized_array

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_shader_uniform_buffer_unsized_array.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [2.1. Proposed Solution](#_proposed_solution)
- [2.1._Proposed_Solution](#_proposed_solution)
- [3. Proposal Details](#_proposal_details)
- [3._Proposal_Details](#_proposal_details)
- [3.1. SPIR-V](#_spir_v)
- [3.2. GLSL Changes](#_glsl_changes)
- [3.2._GLSL_Changes](#_glsl_changes)
- [3.3. Runtime Behavior](#_runtime_behavior)
- [3.3._Runtime_Behavior](#_runtime_behavior)
- [3.4. Example Usage](#_example_usage)
- [3.4._Example_Usage](#_example_usage)
- [4. Issues](#_issues)
- [4.1. How is effective size determined?](#_how_is_effective_size_determined)
- [4.1._How_is_effective_size_determined?](#_how_is_effective_size_determined)
- [4.2. What happens when an application indexes beyond the effective bounds of an unsized array?](#_what_happens_when_an_application_indexes_beyond_the_effective_bounds_of_an_unsized_array)
- [4.2._What_happens_when_an_application_indexes_beyond_the_effective_bounds_of_an_unsized_array?](#_what_happens_when_an_application_indexes_beyond_the_effective_bounds_of_an_unsized_array)
- [4.3. Should we allow unsized arrays at any position within a uniform block?](#_should_we_allow_unsized_arrays_at_any_position_within_a_uniform_block)
- [4.3._Should_we_allow_unsized_arrays_at_any_position_within_a_uniform_block?](#_should_we_allow_unsized_arrays_at_any_position_within_a_uniform_block)
- [4.4. What are the restrictions on using unsized arrays in uniform blocks?](#_what_are_the_restrictions_on_using_unsized_arrays_in_uniform_blocks)
- [4.4._What_are_the_restrictions_on_using_unsized_arrays_in_uniform_blocks?](#_what_are_the_restrictions_on_using_unsized_arrays_in_uniform_blocks)
- [5. Dependencies](#_dependencies)
- [6. References](#_references)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)

[2.1. Proposed Solution](#_proposed_solution)

[3. Proposal Details](#_proposal_details)

[3.1. SPIR-V](#_spir_v)
[3.2. GLSL Changes](#_glsl_changes)
[3.3. Runtime Behavior](#_runtime_behavior)
[3.4. Example Usage](#_example_usage)

[4. Issues](#_issues)

[4.1. How is effective size determined?](#_how_is_effective_size_determined)
[4.2. What happens when an application indexes beyond the effective bounds of an unsized array?](#_what_happens_when_an_application_indexes_beyond_the_effective_bounds_of_an_unsized_array)
[4.3. Should we allow unsized arrays at any position within a uniform block?](#_should_we_allow_unsized_arrays_at_any_position_within_a_uniform_block)
[4.4. What are the restrictions on using unsized arrays in uniform blocks?](#_what_are_the_restrictions_on_using_unsized_arrays_in_uniform_blocks)

[5. Dependencies](#_dependencies)
[6. References](#_references)

Uniform buffers in Vulkan currently require all arrays to have explicit sizes declared
at compile time. This limitation prevents applications from creating flexible buffer
layouts where array sizes can vary based on runtime requirements. This forces developers
to either:

Create multiple shader variants for different array sizes

Use storage buffers instead, which may have different performance characteristics

This extension allows the last member of a uniform buffer to be declared as an
unsized array. The effective size of the array is determined at runtime from the
size of the buffer object backing the uniform buffer.

Key aspects of the solution:

* 
Only the last member of a uniform buffer can be an unsized array

* 
Array size is inferred from buffer size using: `max((buffer_size - array_offset) / array_stride, 0)`

* 
Applications calculate array size manually and pass it via separate uniforms if needed

This extension leverages existing SPIR-V capabilities, allowing use of `OpTypeRuntimeArray`
as the last member of a uniform buffer block structure while prohibiting `OpArrayLength`.

The extension enables declaring unsized arrays as the last member of uniform blocks:

#extension GL_EXT_uniform_buffer_unsized_array : require

layout(std140, binding=0) uniform DataBlock {
    float scale;      // scalar value, 4 bytes
    float values[];   // unsized array as the last member, 16-byte aligned
};

* 
Array size is determined from buffer size at runtime

* 
Out-of-bounds access behavior follows existing Vulkan rules for buffer access

* 
When robustness features are enabled, bounds checking applies to unsized arrays

* 
The `OpArrayLength` instruction cannot be used with uniform buffer runtime arrays

// Vertex shader using an unsized array in a uniform block
#version 450
#extension GL_EXT_uniform_buffer_unsized_array : require

// Main UBO with unsized array
layout(std140, binding=0) uniform DataBlock {
   float scale;
   float values[]; // unsized array as the last member
};

// Additional UBO for size information
layout(std140, binding=1) uniform SizeBlock {
   int arraySize;  // Application provides the size
};

void main() {
   // Use variable/general expression indexing
   int index = gl_VertexIndex % arraySize;
   float value = values[index];

   // Use the values in the shader
   gl_Position = vec4(value * scale, 0.0, 0.0, 1.0);
}

The effective size is determined from the underlying buffer object size
using the formula: size = max((buffer_size - array_offset) / array_stride, 0)
This calculation accounts for the actual size of the buffer object bound to the
uniform block, the offset of the unsized array within the block, and the stride
between array elements according to the layout rules.

As with regular buffer accesses, accesses beyond the bound buffer object’s
size are undefined and may result in device loss. Applications should ensure that
array accesses remain within the effective bounds of the array. When robustness
features are enabled, bounds checking applies to unsized array elements that are
not fully contained in the uniform buffer memory associated with the block.

No. Only the last member of a uniform block may be declared as an
unsized array. This restriction simplifies implementation and memory layout,
as only the final member’s size needs to be determined at runtime. Allowing
unsized arrays in arbitrary positions would significantly complicate the
memory layout of the entire block.

Several restrictions apply to unsized arrays in uniform blocks:

* 
They can only appear as the last member of a uniform block

* 
They cannot be passed as arguments to functions

* 
They cannot be indexed with negative constant expressions

* 
OpArrayLength cannot be used

These restrictions ensure predictable behavior and manageable implementation
complexity while still providing the core functionality of variable-sized arrays.

* 
Requires Vulkan 1.0

* 
GLSL_EXT_uniform_buffer_unsized_array extension specification
