# Shader Memory Layout

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/shader_memory_layout.html

## Table of Contents

- [Alignment Requirements](#alignment-requirements)
- [VK_KHR_uniform_buffer_standard_layout](#VK_KHR_uniform_buffer_standard_layout)
- [VK_KHR_relaxed_block_layout](#VK_KHR_relaxed_block_layout)
- [VK_EXT_scalar_block_layout](#VK_EXT_scalar_block_layout)
- [Alignment Examples](#alignment-examples)
- [Alignment Example 1](#_alignment_example_1)
- [Alignment_Example_1](#_alignment_example_1)
- [Alignment Example 2](#_alignment_example_2)
- [Alignment_Example_2](#_alignment_example_2)
- [Alignment Example 3](#_alignment_example_3)
- [Alignment_Example_3](#_alignment_example_3)
- [Alignment Example 4](#_alignment_example_4)
- [Alignment_Example_4](#_alignment_example_4)

## Content

When an implementation accesses memory from an interface, it needs to know the **memory layout**. This includes things such as **offsets**, **stride**, and **alignments**. While the Vulkan Spec has a [section dedicated to this](https://docs.vulkan.org/spec/latest/chapters/interfaces.html#interfaces-resources-layout), it can be hard to parse due to the various extensions that add extra complexity to the spec language. This chapter aims to help explain all the memory layout concepts Vulkan uses with some high level shading language (GLSL) examples.

Vulkan has 3 [alignment requirements](https://docs.vulkan.org/spec/latest/chapters/interfaces.html#interfaces-alignment-requirements) that interface objects can be laid out in.

* 
extended alignment (also know as `std140`)

* 
base alignment (also know as `std430`)

* 
scalar alignment

The spec language for alignment breaks down the rule for each of the following block member types.

* 
scalar (`float`, `int`, `char`, etc)

* 
vector (`float2`, `vec3`, `uvec4`, etc)

* 
matrix

* 
array

* 
struct

|  | Promoted to core in Vulkan 1.2 |
| --- | --- |

This extension allows the use of `std430` memory layout in UBOs. [Vulkan Standard Buffer Layout Interface](https://docs.vulkan.org/spec/latest/chapters/interfaces.html#interfaces-resources-standard-layout) can be found outside this guide. These memory layout changes are only applied to `Uniforms` as other storage items such as Push Constants and SSBO already allow for std430 style layouts.

One example of when the `uniformBufferStandardLayout` feature is needed is when an application doesn’t want the array stride for a UBO to be restricted to `extended alignment`

([Try Online](https://godbolt.org/z/j11d58hcs))

layout(std140, binding = 0) uniform ubo140 {
   float array140[8];
};

layout(std430, binding = 1) uniform ubo430 {
   float array430[8];
};

Which translates in SPIR-V to

// extended alignment for array is rounded up to multiple of 16
OpDecorate %array140 ArrayStride 16

// base alignment is 4 bytes (OpTypeFloat 32)
// only valid with uniformBufferStandardLayout feature enabled
OpDecorate %array430 ArrayStride 4

Make sure to set `--uniform-buffer-standard-layout` when running the SPIR-V Validator.

|  | Promoted to core in Vulkan 1.1
| --- | --- |

There was never a feature bit added for this extension, so all Vulkan 1.1+ devices support relaxed block layout. |

This extension allows implementations to indicate they can support more variation in block `Offset` decorations. This comes up when using `std430` memory layout where a `vec3` (which is 12 bytes) is still defined as a 16 byte alignment. With relaxed block layout an application can fit a `float` on either side of the `vec3` and maintain the 16 byte alignment between them.

// SPIR-V offsets WITHOUT relaxed block layout
layout (set = 0, binding = 0) buffer block {
    float b; // Offset: 0
    vec3 a;  // Offset: 16
} ssbo;

// SPIR-V offsets WITH relaxed block layout
layout (set = 0, binding = 0) buffer block {
    float b; // Offset: 0
    vec3 a;  // Offset: 4
} ssbo;

`VK_KHR_relaxed_block_layout` can also be seen as a subset of `VK_EXT_scalar_block_layout`

|  | Make sure to set `--relax-block-layout` when running the SPIR-V Validator and using a Vulkan 1.0 environment. |
| --- | --- |

|  | Currently there is no way in GLSL to legally express relaxed block layout, but an developer can use the `--hlsl-offsets` with `glslang` to produce the desired offsets. |
| --- | --- |

|  | Promoted to core in Vulkan 1.2
| --- | --- |

[GLSL - GL_EXT_scalar_block_layout](https://github.com/KhronosGroup/GLSL/blob/master/extensions/ext/GL_EXT_scalar_block_layout.txt) |

This extension allows most storage types to be aligned in `scalar alignment`. A big difference is being able to straddle the 16-byte boundary.

In GLSL this can be used with `scalar` keyword and extension

#extension GL_EXT_scalar_block_layout : enable
layout (scalar, binding = 0) buffer block { }

|  | Make sure to set `--scalar-block-layout` when running the SPIR-V Validator. |
| --- | --- |

|  | The `Workgroup` storage class is not supported with `VK_EXT_scalar_block_layout` and the `workgroupMemoryExplicitLayoutScalarBlockLayout` in [VK_KHR_workgroup_memory_explicit_layout](extensions/shader_features.html#VK_KHR_workgroup_memory_explicit_layout) is needed to enabled scalar support. |
| --- | --- |

The following are some GLSL to SPIR-V examples to help better understand the difference in the alignments supported.

([Try Online](https://godbolt.org/z/9rWKEdf1W))

layout(binding = 0) buffer block {
    vec2 a[4];
    vec4 b;
};

Which translates in SPIR-V to

// extended alignment (std140)
OpDecorate %vec2array ArrayStride 16
OpMemberDecorate %block 0 Offset 0
OpMemberDecorate %block 1 Offset 64

// scalar alignment and base alignment (std430)
OpDecorate %vec2array ArrayStride 8
OpMemberDecorate %block 0 Offset 0
OpMemberDecorate %block 1 Offset 32

([Try Online](https://godbolt.org/z/YMr6P749b))

layout(binding = 0) buffer block {
    float a;
    vec2 b;
    vec2 c;
};

Which translates in SPIR-V to

// extended alignment (std140) and base alignment (std430)
OpMemberDecorate %block 0 Offset 0
OpMemberDecorate %block 1 Offset 8
OpMemberDecorate %block 2 Offset 16

// scalar alignment
OpMemberDecorate %block 0 Offset 0
OpMemberDecorate %block 1 Offset 4
OpMemberDecorate %block 2 Offset 12

([Try Online](https://godbolt.org/z/c4Pe4KvG9))

layout(binding = 0) buffer block {
    vec3 a;
    vec2 b;
    vec4 c;
};

Which translates in SPIR-V to

// extended alignment (std140) and base alignment (std430)
OpMemberDecorate %block 0 Offset 0
OpMemberDecorate %block 1 Offset 16
OpMemberDecorate %block 2 Offset 32

// scalar alignment
OpMemberDecorate %block 0 Offset 0
OpMemberDecorate %block 1 Offset 12
OpMemberDecorate %block 2 Offset 20

([Try Online](https://godbolt.org/z/rG17jorf8))

layout (binding = 0) buffer block {
    vec3 a;
    vec2 b;
    vec2 c;
    vec3 d;
};

Which translates in SPIR-V to

// extended alignment (std140) and base alignment (std430)
OpMemberDecorate %block 0 Offset 0
OpMemberDecorate %block 1 Offset 16
OpMemberDecorate %block 2 Offset 24
OpMemberDecorate %block 3 Offset 32

// scalar alignment
OpMemberDecorate %block 0 Offset 0
OpMemberDecorate %block 1 Offset 12
OpMemberDecorate %block 2 Offset 20
OpMemberDecorate %block 3 Offset 28
