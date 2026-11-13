# Vulkan 1.4 Scalar Layouts: Tight Packing

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/02_Compute_Architecture/04_vulkan_1_4_scalar_layouts.html

## Table of Contents

- [Introduction](#_introduction)
- [The Alignment Tax: std140 and std430](#_the_alignment_tax_std140_and_std430)
- [The_Alignment_Tax:_std140_and_std430](#_the_alignment_tax_std140_and_std430)
- [Enter GL_EXT_scalar_block_layout](#_enter_gl_ext_scalar_block_layout)
- [Enter_GL_EXT_scalar_block_layout](#_enter_gl_ext_scalar_block_layout)
- [Why does this matter?](#_why_does_this_matter)
- [Why_does_this_matter?](#_why_does_this_matter)
- [Slang: Opting Into Scalar Layout](#_slang_opting_into_scalar_layout)
- [Slang:_Opting_Into_Scalar_Layout](#_slang_opting_into_scalar_layout)
- [GLSL: Requesting Scalar Layout](#_glsl_requesting_scalar_layout)
- [GLSL:_Requesting_Scalar_Layout](#_glsl_requesting_scalar_layout)
- [C++ Side Comparison](#_c_side_comparison)
- [C++_Side_Comparison](#_c_side_comparison)
- [Conclusion](#_conclusion)

## Content

In the previous sections, we’ve focused on keeping the GPU’s Compute Units busy through high occupancy. But even if you have thousands of threads active, you can still be held back by **Bandwidth**.

Every byte you fetch from VRAM is precious. If your data is poorly laid out, you might be fetching bytes you never use. In this final section of the Compute Architecture chapter, we’ll look at how Vulkan 1.4’s **Scalar Layouts** solve one of the oldest and most frustrating problems in GPU programming: the alignment tax.

Historically, OpenGL and Vulkan required you to lay out your buffers using strict alignment rules known as **std140** and **std430** (standard 140/430 layouts). These rules were designed for older hardware that had difficulty reading data that wasn’t perfectly aligned to 4-byte or 16-byte boundaries.

For example, under `std140`, a simple `vec3` (which is three floats) would often be padded to the size of a `vec4`. This means that if you had an array of `vec3`, 25% of your memory bandwidth was being wasted on empty padding!

// Under std140:
struct MyData {
    float3 position; // 12 bytes + 4 bytes padding
    float radius;    // 4 bytes
};
// Total size: 20 bytes (but logically 16)

`std430` improved this by allowing tighter packing for arrays of scalars and vectors, but it still had strict rules about how nested structures were aligned.

To solve this, a new extension called **GL_EXT_scalar_block_layout** was introduced. This extension allows you to use a **scalar layout**, which essentially removes all padding between members of a structure or elements of an array.

In Vulkan 1.4, this functionality is now a core requirement. By using the `scalar` layout, your data structures on the GPU match your C++ structures byte-for-byte for flat structures made only of scalars, vectors, and arrays.

There is one important corner case, though: scalar layout is not identical to C/C++ layout once structures are *nested*. GLSL’s and Slang’s scalar layout will pack a trailing member of an outer struct into the tail padding left inside an inner struct member — something C/C++ never does. For example:

struct Inner {
    uint a;
    uint16_t b;
};

struct Outer {
    Inner ab;
    uint16_t c;
};
// Scalar layout (GLSL/Slang): sizeof(Outer) == 8 -- `c` gets packed into
// the trailing padding left after `Inner::b`.
// C/C++ layout:               sizeof(Outer) == 12 -- that padding is never reused.

Slang has a distinct layout mode for this: `-fvk-use-c-layout` on the command line (`CompilerOptionName::ForceCLayout` via the API, or the `CDataLayout` tag in-language) lays buffers out to match native C/C++ layout exactly, including for nested structures — the only known caveat being empty structs, which are 0 bytes in Slang but 1 byte in C/C++. GLSL has no equivalent option, so if you mix nested structures with scalar layout in GLSL, double-check their sizes on both sides of the CPU/GPU boundary rather than assuming they match.

It’s not just about saving a few bytes of VRAM. It’s about **Cache Efficiency**.

When the GPU fetches data from VRAM, it fetches it in large "cache lines" (often 64 or 128 bytes). If your data is full of padding, each cache line will contain less "real" data. This means you have to perform more memory fetches to get the same amount of information, which directly leads to lower performance.

It’s worth being precise here, because it’s a common misconception: Slang does not default to scalar layout, and this doesn’t change based on which Vulkan version you’re targeting — Slang targets a SPIR-V version, not a Vulkan version, and none of the SPIR-V versions switch the default buffer layout to scalar. By default, a `StructuredBuffer` or `RWStructuredBuffer` in Slang is laid out with the same std430-style alignment rules as HLSL, so an unadorned `float3` member is still padded exactly the way it would be under GLSL’s `std430`.

To get scalar layout in Slang, you have to ask for it, either per-buffer or for the whole compilation. Per-buffer, tag the resource type with `ScalarDataLayout`:

struct MyData {
    float3 position;
    float radius;
};

[[vk::binding(0, 0)]]
RWStructuredBuffer MyBuffer;

Globally, the equivalent is the `-fvk-use-scalar-layout` flag for `slangc`, or `CompilerOptionName::GLSLForceScalarLayout` when compiling through the Slang API. Either way, the `RWStructuredBuffer` maps to a Vulkan `Storage Buffer`, and once scalar layout is requested it packs identically to the `scalar`-qualified GLSL buffer below.

Scalar layout has to be requested explicitly in GLSL too — it’s just spelled differently. Let’s look at how this same structure would be handled in GLSL under the older `std430` rules vs. the `scalar` layout enabled by Vulkan 1.4.

// The "Old" Way (std430)
struct MyData {
    vec3 position; // 12 bytes + 4 bytes padding (arrays of vec3 are even worse!)
    float radius;  // 4 bytes
};

layout(std430, binding = 0) buffer MyBuffer {
    MyData data[];
};

Under `std430`, if you had an array of `MyData`, each `vec3` would be padded to 16 bytes. If you tried to match this with a simple `struct { glm::vec3 p; float r; }` on the CPU, you would likely experience memory corruption because the GPU expects that 4-byte gap between `position` and `radius`.

Now, look at the Vulkan 1.4 way using the **scalar** layout:

// The "Modern" Way (Vulkan 1.4 / GL_EXT_scalar_block_layout)
#extension GL_EXT_scalar_block_layout : enable

struct MyData {
    vec3 position; // 12 bytes
    float radius;  // 4 bytes
};

layout(scalar, binding = 0) buffer MyBuffer {
    MyData data[];
};
// Total size of MyData: 16 bytes. No padding!

By explicitly using `layout(scalar)`, you tell the driver that you want the tighter packing rules. This allows your GLSL code to perfectly match a standard C++ struct without any manual `float padding` members.

To match this on the CPU, you no longer need to manually add `float padding[1]` or use `alignas(16)`. You can simply define your structure naturally:

struct MyData {
    glm::vec3 position;
    float radius;
};
// Total size: 16 bytes. No padding!

Keep the nested-struct caveat from earlier in mind here too: this byte-for-byte match holds for a flat structure like `MyData` above, but it stops holding automatically once you nest structures inside each other, in either GLSL or Slang’s scalar layout. If you need C/C++-exact layout even with nesting, reach for Slang’s dedicated C layout mode instead of scalar layout.

We’ve covered a lot of ground in this chapter. We’ve seen how workgroups map to silicon, how occupancy helps us hide the massive latency of memory fetches, and how scalar layouts ensure we aren’t wasting the bandwidth we’ve worked so hard to use.

Knowing exactly when scalar layout does and doesn’t match your C++ structures — and which layout qualifier or compiler flag you need to get there — is what turns "it worked on my machine" into buffer layouts you can reason about and debug with confidence.

In the next chapter, we’ll take these concepts even further by looking at the **Vulkan Memory Model** and how to safely synchronize data between thousands of threads.

[Previous: Occupancy and Latency Hiding](03_occupancy_and_latency_hiding.html) | [Next: Memory Models and Consistency](../03_Memory_Models/01_introduction.html)
