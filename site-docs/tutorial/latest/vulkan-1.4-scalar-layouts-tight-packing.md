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
- [Slang: Automatic Packing](#_slang_automatic_packing)
- [Slang:_Automatic_Packing](#_slang_automatic_packing)
- [GLSL: The Manual Struggle](#_glsl_the_manual_struggle)
- [GLSL:_The_Manual_Struggle](#_glsl_the_manual_struggle)
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

In Vulkan 1.4, this functionality is now a core requirement. By using the `scalar` layout, you can ensure that your data structures on the GPU match your C++ structures perfectly, byte-for-byte.

It’s not just about saving a few bytes of VRAM. It’s about **Cache Efficiency**.

When the GPU fetches data from VRAM, it fetches it in large "cache lines" (often 64 or 128 bytes). If your data is full of padding, each cache line will contain less "real" data. This means you have to perform more memory fetches to get the same amount of information, which directly leads to lower performance.

If you are using Slang, you don’t even need to worry about manual layout qualifiers for most cases. Slang’s layout engine handles the `scalar` rules for you when targeting Vulkan 1.4:

struct MyData {
    float3 position;
    float radius;
};

[[vk::binding(0, 0)]]
RWStructuredBuffer MyBuffer;

The `RWStructuredBuffer` in Slang maps to a `Storage Buffer` in Vulkan, and because Slang defaults to natural alignment, it produces the same result as the `scalar` layout in GLSL without the boilerplate.

To truly appreciate the "win" in Vulkan 1.4, let’s look at how this same structure would be handled in GLSL under the older `std430` rules vs. the modern `scalar` layout.

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

If you are using modern languages like Slang, this becomes even easier. Slang defaults to a more natural, C++-like layout, and its Vulkan backend handles the scalar layout details for you automatically when targeting Vulkan 1.4.

We’ve covered a lot of ground in this chapter. We’ve seen how workgroups map to silicon, how occupancy helps us hide the massive latency of memory fetches, and how scalar layouts ensure we aren’t wasting the bandwidth we’ve worked so hard to use.

By understanding these low-level architectural details, you’ve moved beyond "writing shaders" and started "programming the hardware."

In the next chapter, we’ll take these concepts even further by looking at the **Vulkan Memory Model** and how to safely synchronize data between thousands of threads.

[Previous: Occupancy and Latency Hiding](03_occupancy_and_latency_hiding.html) | [Next: Memory Models and Consistency](../03_Memory_Models/01_introduction.html)
