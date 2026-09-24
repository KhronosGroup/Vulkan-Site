# Mastering Mixed Precision: FP16 and Int8

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/09_Specialized_Math/03_mixed_precision.html

## Table of Contents

- [Why Mixed Precision?](#_why_mixed_precision)
- [Why_Mixed_Precision?](#_why_mixed_precision)
- [Precision vs. Range: FP16 and BFloat16](#_precision_vs_range_fp16_and_bfloat16)
- [Precision_vs._Range:_FP16_and_BFloat16](#_precision_vs_range_fp16_and_bfloat16)
- [Slang: Natural Mixed Precision](#_slang_natural_mixed_precision)
- [Slang:_Natural_Mixed_Precision](#_slang_natural_mixed_precision)
- [Int8 and Dot Products (DP4A)](#_int8_and_dot_products_dp4a)
- [Int8_and_Dot_Products_(DP4A)](#_int8_and_dot_products_dp4a)
- [C++ Side: Preparing the Data](#_c_side_preparing_the_data)
- [C++_Side:_Preparing_the_Data](#_c_side_preparing_the_data)
- [Managing Dynamic Range: Loss Scaling](#_managing_dynamic_range_loss_scaling)
- [Managing_Dynamic_Range:_Loss_Scaling](#_managing_dynamic_range_loss_scaling)

## Content

In high-performance computing, we’ve traditionally relied on 32-bit floating-point precision (FP32) for almost everything. But as datasets grow larger and we demand higher throughput, it’s worth asking: do we **really** need 32 bits for every single calculation? This is where **Mixed Precision** comes in.

The core idea is simple: use lower-precision types like **FP16** (half-precision float) or **Int8** (8-bit integer) for the bulk of your calculations, and only use higher precision where it’s absolutely necessary. Modern GPU architectures are heavily optimized for these lower-precision types. For example, many GPUs can perform twice as many FP16 operations as FP32 operations in the same amount of time.

There are two primary reasons to embrace lower precision:

**Arithmetic Throughput**: Many modern GPUs have "packed" math units. A single 32-bit register can hold two 16-bit values, and the hardware can perform two 16-bit operations in the same cycle it would take for one 32-bit operation.

**Memory Bandwidth**: Data is expensive to move. By using 16-bit or 8-bit types, you’re effectively doubling or quadrupling the amount of data you can move through the same memory bus.

When dropping from 32-bit to 16-bit, you have to choose what to sacrifice.

* 
**FP16 (IEEE 754)**: 1 sign bit, 5 exponent bits, 10 mantissa bits. This provides decent precision but a very limited range (max value ~65,504).

* 
**BFloat16 (Brain Float)**: 1 sign bit, 8 exponent bits, 7 mantissa bits. This has the **same range** as FP32 but much lower precision. It’s often preferred for machine learning because it’s more robust to overflows.

In Vulkan, FP16 is widely supported via the `VK_KHR_shader_float16_int8` extension, while BFloat16 support is provided through the `VK_KHR_shader_bfloat16` extension.

Slang makes it incredibly easy to use mixed precision because it treats `half` and `int8_t` as native types. It handles the low-level conversion instructions for you.

// Using half-precision in Slang
void computeMain() {
    // 16-bit floats (h suffix)
    half a = 1.0h;
    half b = 2.0h;

    // Mixed accumulation: Perform 16-bit math, accumulate in 32-bit
    float accumulator = 0.0f;
    for(int i = 0; i 

For even higher throughput, many GPUs support specialized instructions for 8-bit integer math. One of the most common is **DP4A** (Dot Product with 4-way Accumulation).

The hardware takes two 32-bit registers, each containing four 8-bit values ($x_0, x_1, x_2, x_3$ and $y_0, y_1, y_2, y_3$). It performs:

  

  

All of this happens in a single cycle. In Slang, you can trigger this by using `dot` on packed 8-bit vectors:

RWStructuredBuffer output;

void computeMain(uint3 threadId : SV_DispatchThreadID) {
    uint32_t packedA = loadPackedA(threadId.x);
    uint32_t packedB = loadPackedB(threadId.x);

    // Reinterpret the uint32 as a vector of four 8-bit ints
    int8_t4 vecA = BitCast(packedA);
    int8_t4 vecB = BitCast(packedB);

    // The dot product intrinsic maps directly to DP4A hardware
    int result = dot(vecA, vecB);
    output[threadId.x] = result;
}

To feed these shaders, you must pack your data correctly on the CPU. Since standard C++ doesn’t have a native 16-bit float type (until C++23’s `std::float16_t`), you’ll often use a library like `glm` or perform manual bit-packing.

// Example of packing four 8-bit integers into one 32-bit uint
uint32_t packInt8(int8_t a, int8_t b, int8_t c, int8_t d) {
    return (uint32_t(a) & packedData) {
    vk::BufferCreateInfo createInfo({}, packedData.size() * sizeof(uint32_t),
                                   vk::BufferUsageFlagBits::eStorageBuffer);
    vk::raii::Buffer storageBuffer(device, createInfo);
    // ... bind memory and copy data ...
}

The biggest challenge with mixed precision, particularly with **FP16**, is its limited **Dynamic Range**. FP16 has a much smaller range than FP32, which means it’s much easier to **overflow** (exceed the maximum value) or **underflow** (become too small to represent).

Managing this requires a technique known as **Loss Scaling**. You multiply your values by a scaling factor (e.g., 128.0) before performing your low-precision calculations to keep them within a safe range, and then divide by that same factor when you’re done.

By mastering mixed precision, you’re not just "squeezing out more performance"; you’re being smarter about how you use the hardware’s resources. Whether you’re optimizing a fluid simulation or a real-time signal processing engine, these techniques are essential for pushing the boundaries of what’s possible on modern GPUs.

[Previous: Cooperative Matrices](02_cooperative_matrices.html) | [Next: Performance Optimization](../10_Performance_Optimization/01_introduction.html)
