# Device-Addressable Buffers: Pointer-like Flexibility

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/06_Advanced_Data_Structures/04_device_addressable_buffers.html

## Table of Contents

- [The End of Descriptor Set Hell](#_the_end_of_descriptor_set_hell)
- [The_End_of_Descriptor_Set_Hell](#_the_end_of_descriptor_set_hell)
- [What is BDA?](#_what_is_bda)
- [What_is_BDA?](#_what_is_bda)
- [BDA in Shaders](#_bda_in_shaders)
- [BDA_in_Shaders](#_bda_in_shaders)
- [GLSL:_buffer_reference](#_glsl_buffer_reference)
- [Why BDA is a Game-Changer](#_why_bda_is_a_game_changer)
- [Why_BDA_is_a_Game-Changer](#_why_bda_is_a_game_changer)
- [The Cost of Freedom: Safety and Performance](#_the_cost_of_freedom_safety_and_performance)
- [The_Cost_of_Freedom:_Safety_and_Performance](#_the_cost_of_freedom_safety_and_performance)
- [Conclusion](#_conclusion)

## Content

If you’ve spent any time with Vulkan, you know the pain of **Descriptor Sets**. Managing layouts, updating pools, and binding sets before every draw or dispatch call is one of the most boilerplate-heavy parts of the API.

But what if you didn’t have to bind anything? What if you could just pass a raw 64-bit address to your shader and have it access the memory directly, just like a pointer in C++? This is what **Buffer Device Address (BDA)** allows.

**Buffer Device Address** (available via `VK_KHR_buffer_device_address` with Vulkan 1.1, core since Vulkan 1.2, and mandatory since Vulkan 1.3) allows you to query a 64-bit GPU address for any `VkBuffer`. This address is a raw pointer that can be stored in other buffers, passed to shaders via push constants, or even used to build complex, linked data structures across different memory regions.

|  | BDA applies to buffers only. Images still require descriptor bindings (or bindless descriptor indexing) — there is no equivalent raw-address path for `VkImage` objects. |
| --- | --- |

To use BDA, you must enable the `bufferDeviceAddress` feature and create your buffers with the `VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT`.

// C++ side: Obtaining a device address
vk::BufferDeviceAddressInfo info {
    .buffer = *myBuffer // Extracting the handle from a vk::raii::Buffer
};
uint64_t myGPUAddress = device.getBufferAddress(info);

// Pass myGPUAddress to a shader via a push constant!

In Slang or GLSL, you can treat this 64-bit address as a raw pointer. This completely bypasses the need for descriptor sets for many use cases.

// Slang example of using BDA
struct MyData {
    float4 value;
    MyData* next; // A raw BDA pointer!
};

// We receive the starting address as a 64-bit integer (uint64_t)
void process(uint64_t startAddress) {
    MyData* p = (MyData*)startAddress;

    // We can traverse the structure just like in C++!
    while (p != nullptr) {
        doSomething(p->value);
        p = p->next;
    }
}

In GLSL, this requires the `GL_EXT_buffer_reference` and `GL_EXT_shader_explicit_arithmetic_types_int64` extensions. Instead of raw C++ pointers, you use the `buffer_reference` keyword to define "pointers" to buffer blocks.

#extension GL_EXT_buffer_reference : enable
#extension GL_EXT_shader_explicit_arithmetic_types_int64 : enable

// Define a buffer block as a reference type
layout(buffer_reference, std430) buffer MyData {
    vec4 value;
    MyData next; // Pointer-like reference to another MyData
};

layout(push_constant) uniform Constants {
    MyData startPtr; // We receive the 64-bit address as a reference
};

void main() {
    MyData p = startPtr;

    while (uint64_t(p) != 0) {
        doSomething(p.value);
        p = p.next;
    }
}

While the Slang syntax is much closer to C++, both produce the same low-level **SPIR-V** instructions for 64-bit address calculation and memory access.

**Zero Binding Overhead**: You can pass thousands of buffer addresses to a single shader via a single push constant or a "pointer buffer," completely bypassing the CPU cost of managing descriptor pools and sets.

**Complex Data Structures**: You can build real linked lists, trees, and graphs where nodes contain actual 64-bit pointers to other nodes, allowing for "pointer chasing" that was previously impossible.

**Heterogeneous Programming**: BDA enables pointer-based GPU memory models, bridging the gap between the pointer-based world of C++ and the explicit world of Vulkan — the same foundation that higher-level compute APIs use for unified pointer semantics.

With great power comes great responsibility. Unlike Descriptor Sets, where the Vulkan validation layers can often catch out-of-bounds access, **BDA is raw and unchecked**. If you access an invalid address or go out of bounds, you won’t get a helpful error message—you’ll likely trigger a **GPU hang** (where the screen freezes) or a "Device Lost" error.

Performance-wise, BDA is generally as fast as standard buffer access. However, because the hardware doesn’t know the size of the buffer being accessed, it can’t always perform the same cache optimizations as it does with explicit descriptors. For most advanced compute tasks, the flexibility of raw pointers far outweighs these minor trade-offs.

By combining 64-bit atomics, subgroup operations, and raw buffer device addresses, we have all the tools we need to build complex, autonomous data structures on the GPU. We are no longer limited by the "flat array" model of traditional compute.

In the next chapter, we’ll see how to take this a step further and use these structures to drive the entire rendering pipeline directly from the GPU: **Indirect Dispatch and GPU-Driven Pipelines**.

[Previous: Global Atomic Management](03_global_atomic_management.html) | [Next: Indirect Dispatch](../07_GPU_Driven_Pipelines/01_introduction.html)
