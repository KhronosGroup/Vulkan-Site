# Optimization Techniques: Squeezing the Silicon

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Debugging_and_Performance/05_optimization_techniques.html

## Table of Contents

- [The GPU Memory Hierarchy: The Speed of Light](#_the_gpu_memory_hierarchy_the_speed_of_light)
- [The_GPU_Memory_Hierarchy:_The_Speed_of_Light](#_the_gpu_memory_hierarchy_the_speed_of_light)
- [Shared Memory Tiling: The Software Cache](#_shared_memory_tiling_the_software_cache)
- [Shared_Memory_Tiling:_The_Software_Cache](#_shared_memory_tiling_the_software_cache)
- [The Concept: Tile and Halo](#_the_concept_tile_and_halo)
- [The_Concept:_Tile_and_Halo](#_the_concept_tile_and_halo)
- [Implementing the Tile](#_implementing_the_tile)
- [Implementing_the_Tile](#_implementing_the_tile)
- [Avoiding Bank Conflicts](#_avoiding_bank_conflicts)
- [Avoiding_Bank_Conflicts](#_avoiding_bank_conflicts)
- [Kernel Fusion: Fighting the Memory Wall](#_kernel_fusion_fighting_the_memory_wall)
- [Kernel_Fusion:_Fighting_the_Memory_Wall](#_kernel_fusion_fighting_the_memory_wall)
- [The Fused Recipe](#_the_fused_recipe)
- [The_Fused_Recipe](#_the_fused_recipe)
- [Vectorization: NC/4HW4 Layout](#_vectorization_nc4hw4_layout)
- [Vectorization:_NC/4HW4_Layout](#_vectorization_nc4hw4_layout)
- [Subgroup Shuffles: Communication Without Memory](#_subgroup_shuffles_communication_without_memory)
- [Subgroup_Shuffles:_Communication_Without_Memory](#_subgroup_shuffles_communication_without_memory)
- [Async Compute: Overlapping the World](#_async_compute_overlapping_the_world)
- [Async_Compute:_Overlapping_the_World](#_async_compute_overlapping_the_world)
- [The Multi-Queue Handshake](#_the_multi_queue_handshake)
- [The_Multi-Queue_Handshake](#_the_multi_queue_handshake)
- [Summary: The Optimization Workflow](#_summary_the_optimization_workflow)
- [Summary:_The_Optimization_Workflow](#_summary_the_optimization_workflow)

## Content

Profiling has identified your bottlenecks. You know which layers are slow and whether you are bound by memory bandwidth or compute throughput. Now, it is time to apply the **Optimization Recipes** that turn a prototype into a production-grade inference engine.

In this chapter, we will master the three pillars of GPU optimization: **Data Reuse** (Tiling), **Instruction Efficiency** (Fusion), and **Hardware Acceleration** (FP16/Quantization). These aren’t just micro-optimizations; applied correctly, they can provide a **10x to 50x** speedup over naive implementations.

To optimize, you must understand the "Cost of Distance."

| Memory Type | Latency (Approx) | Bandwidth |
| --- | --- | --- |
| **Registers** | 1 cycle | > 100 TB/s |
| **Shared Memory (L1)** | 20-30 cycles | 10-20 TB/s |
| **VRAM (DRAM)** | 400-800 cycles | 0.5-2 TB/s |

Every time your shader reads from VRAM, it’s like a person driving across the country to get a glass of water. **Optimization is the art of keeping that water in the kitchen (Shared Memory) or in your hand (Registers).**

Most ML kernels (Convolution, Matrix Multiplication) are **Memory Bound**. The compute units are hungry for data, but the memory bus is too slow. The solution is **Shared Memory**—a pool of high-speed memory that lives directly on the Compute Unit.

Think of a 3x3 convolution. Every output pixel needs a 3x3 patch of input. If you calculate 256 output pixels (16x16 workgroup) naively:
*   Each thread loads 9 pixels.
*   Total loads:   .

In a **Tiled** approach, the threads cooperatively load a single 18x18 "Tile" into shared memory.
*   Total loads:   .
*   **The Gain**:    reduction in VRAM traffic.

To implement this, we must calculate the **Local ID** (position within the tile) and handle the **Halo** (the extra pixels needed around the edges).

layout(local_size_x = 16, local_size_y = 16) in;

// 16x16 output + 1 pixel halo on each side = 18x18
shared float tile[18][18];

void main() {
    ivec2 localPos = ivec2(gl_LocalInvocationID.xy);
    ivec2 globalPos = ivec2(gl_GlobalInvocationID.xy);

    // 1. Cooperative Load: Each thread loads its 'center' pixel
    // Shift by 1 to leave room for the top/left halo
    tile[localPos.y + 1][localPos.x + 1] = inputData[globalPos];

    // 2. Halo Load: Specific threads load the edges
    if (localPos.x == 0) tile[localPos.y + 1][0] = inputData[globalPos - ivec2(1, 0)];
    if (localPos.x == 15) tile[localPos.y + 1][17] = inputData[globalPos + ivec2(1, 0)];
    if (localPos.y == 0) tile[0][localPos.x + 1] = inputData[globalPos - ivec2(0, 1)];
    if (localPos.y == 15) tile[17][localPos.x + 1] = inputData[globalPos + ivec2(0, 1)];

    // 3. Memory Handshake
    memoryBarrierShared();
    barrier();

    // 4. Compute: Every read now comes from fast shared memory!
    float sum = 0.0;
    for(int m = -1; m 

Shared memory is organized into **Banks**. If two threads in a warp try to access different numbers in the **same** bank at the same time, the GPU stalls. This is a **Bank Conflict**.

**Pro Tip**: If your tile width is a multiple of the bank count (usually 32), add 1 to the width: `shared float tile[18][19]`. This "swizzles" the memory layout so that vertical columns no longer fall into the same bank.

In a typical network, you might have: **Convolution    Bias Add    Batch Norm    ReLU**.

If you implement these as four separate kernels, you are writing and reading from VRAM four times.

  

  

**Kernel Fusion** merges these into a single compute dispatch. The intermediate values stay in the GPU’s **Registers**.

A professional "Fused Convolution" kernel looks like this:

void main() {
    // 1. The Heavy Work
    float sum = performConvolution(); // Stays in registers!

    // 2. The 'Free' Operations
    // These take 0.001ms because the GPU was already waiting for memory
    sum += bias[channel];
    sum = (sum - mean) * invStdDev;
    sum = max(0.0, sum);

    // 3. ONE write to VRAM
    outputData[idx] = sum;
}

Fusion is the single most effective way to optimize deep networks like MobileNet or ResNet, where many layers are tiny and bandwidth-limited.

Most GPUs have 128-bit wide memory buses. If you read a single `float` (32-bit), you are only using 25% of the potential bandwidth.

Advanced ML engines use **NC/4HW4** layout. This means you group 4 channels together into a single `vec4`.

* 
Instead of `float data[]`, your buffer is `vec4 data[]`.

* 
A single load instruction now fetches 4 channels at once.

* 
The GPU hardware is optimized for `vec4` dot products.

  

  

In your shader, your inner loop becomes:

vec4 input_v = inputBuffer[idx];
vec4 weight_v = weightBuffer[idx];
sum += dot(input_v, weight_v);

If you need to share data between threads (like in a Max-Pool or Softmax), don’t reach for Shared Memory immediately. Use **Subgroup Shuffles** (requires `GL_KHR_shader_subgroup_basic`).

A shuffle allows thread 0 to "reach out" and read a register directly from thread 1.

float myValue = ...;
// Find the maximum value across all 32 threads in the warp
float maxVal = subgroupMax(myValue);

This is **10x faster** than Shared Memory because it never touches any memory controller—it happens entirely within the execution unit’s register file.

Vulkan allows you to submit work to multiple **Queues**. If your ML inference is running on the **Compute Queue**, it can run simultaneously with your UI rendering on the **Graphics Queue**.

* 
**The Secret**: If your GPU has idle compute units while it’s busy rasterizing shadows, the Compute Queue will "fill the gaps," effectively making your ML inference cost **Zero milliseconds** of frame time.

Use **Timeline Semaphores** to coordinate:
1.  Graphics Queue signals "Frame Ready".
2.  Compute Queue waits, runs Preprocessing + Inference, signals "Result Ready".
3.  Graphics Queue waits, renders the AI labels on the next frame.

**Fuse** everything. Never write intermediate results to VRAM.

**Vectorize** your data into `vec4` (NC/4HW4) to saturate the memory bus.

**Tile** high-intensity convolutions using Shared Memory.

**Use Subgroups** for reductions (Max, Sum) to avoid Shared Memory stalls.

**Overlap** everything with Async Compute.

With these techniques, you have transformed your Vulkan implementation from a functional prototype into a high-performance engine capable of real-time AI in the most demanding environments.

[Previous: Performance Profiling](04_performance_profiling.html) | [Next: Desktop Applications](../Desktop_Applications/01_introduction.html)
