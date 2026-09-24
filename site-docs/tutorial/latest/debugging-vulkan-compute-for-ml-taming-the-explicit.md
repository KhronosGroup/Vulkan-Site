# Debugging Vulkan Compute for ML: Taming the Explicit

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Debugging_and_Performance/02_debugging_vulkan_compute.html

## Table of Contents

- [The Relay Race: Understanding Pipeline Barriers](#_the_relay_race_understanding_pipeline_barriers)
- [The_Relay_Race:_Understanding_Pipeline_Barriers](#_the_relay_race_understanding_pipeline_barriers)
- [The Barrier Analogy](#_the_barrier_analogy)
- [The_Barrier_Analogy](#_the_barrier_analogy)
- [Implementing the Handshake](#_implementing_the_handshake)
- [Implementing_the_Handshake](#_implementing_the_handshake)
- [Execution vs. Memory Barriers](#_execution_vs_memory_barriers)
- [Execution_vs._Memory_Barriers](#_execution_vs_memory_barriers)
- [Global Memory Barriers for ML](#_global_memory_barriers_for_ml)
- [Global_Memory_Barriers_for_ML](#_global_memory_barriers_for_ml)
- [The Geometry of Parallelism: Workgroup Math](#_the_geometry_of_parallelism_workgroup_math)
- [The_Geometry_of_Parallelism:_Workgroup_Math](#_the_geometry_of_parallelism_workgroup_math)
- [The "Rounding Up" Problem](#_the_rounding_up_problem)
- [The_"Rounding_Up"_Problem](#_the_rounding_up_problem)
- [The "Out of Bounds" Safety Net](#_the_out_of_bounds_safety_net)
- [The_"Out_of_Bounds"_Safety_Net](#_the_out_of_bounds_safety_net)
- [Memory Visibility: The Cache Ghost](#_memory_visibility_the_cache_ghost)
- [Memory_Visibility:_The_Cache_Ghost](#_memory_visibility_the_cache_ghost)
- [Descriptor Set Chaos](#_descriptor_set_chaos)
- [Descriptor_Set_Chaos](#_descriptor_set_chaos)
- [The Detective’s Toolkit: RenderDoc for ML](#_the_detectives_toolkit_renderdoc_for_ml)
- [The_Detective’s_Toolkit:_RenderDoc_for_ML](#_the_detectives_toolkit_renderdoc_for_ml)
- [How to Debug a Broken Layer](#_how_to_debug_a_broken_layer)
- [How_to_Debug_a_Broken_Layer](#_how_to_debug_a_broken_layer)
- [Shared Memory Synchronization](#_shared_memory_synchronization)
- [Shared_Memory_Synchronization](#_shared_memory_synchronization)
- [Handling NaNs and Infs](#_handling_nans_and_infs)
- [Handling_NaNs_and_Infs](#_handling_nans_and_infs)
- [Why do NaNs happen?](#_why_do_nans_happen)
- [Why_do_NaNs_happen?](#_why_do_nans_happen)
- [Debugging NaNs](#_debugging_nans)
- [Troubleshooting Checklist](#_troubleshooting_checklist)

## Content

You’ve implemented your neural network layers as Vulkan compute shaders. Your application compiles, the validation layers are quiet, and the GPU is definitely doing **something**. But as we discussed in the introduction, ML is the land of silent failures. "It runs" is only the first 10% of the journey.

Debugging Vulkan compute is a unique skill set. You aren’t just looking for logic errors in your GLSL; you are looking for **orchestration errors**. In this chapter, we’re going to look at the three biggest friction points in Vulkan ML: Synchronization, Descriptor Management, and Workgroup Math.

The single most common bug in Vulkan ML is missing or incorrect synchronization. Neural networks are strictly sequential: Layer    must finish writing its output before Layer    can begin reading it.

In a high-level framework like PyTorch, this is handled for you. In Vulkan, the GPU is a wild horse—it will try to execute everything at once to maximize throughput unless you explicitly pull the reins.

Think of your inference pipeline as a **Relay Race**.

* 
**The Runners**: Your compute shaders (Convolution, ReLU, Pooling).

* 
**The Baton**: The tensor data in GPU memory.

If the second runner (ReLU) starts running before the first runner (Convolution) has handed over the baton, they are running with empty hands. In Vulkan terms, this is a **Data Race**. The ReLU shader will read uninitialized memory, stale data from a previous frame, or a partial result that is half-written.

We use `vkCmdPipelineBarrier` to implement this handshake. A proper barrier between two layers looks like this:

// Transitioning from Layer 1 (Convolution) to Layer 2 (ReLU)
vk::BufferMemoryBarrier barrier{
    .srcAccessMask = vk::AccessFlagBits::eShaderWrite, // Wait for Convolution to finish writing
    .dstAccessMask = vk::AccessFlagBits::eShaderRead,  // Ensure ReLU can safely read
    .srcQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
    .dstQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
    .buffer = activationBuffer,
    .offset = 0,
    .size = VK_WHOLE_SIZE
};

cmd.pipelineBarrier(
    vk::PipelineStageFlagBits::eComputeShader, // Source stage
    vk::PipelineStageFlagBits::eComputeShader, // Destination stage
    {},                                        // Dependency flags
    nullptr, nullptr, barrier                  // Memory, Buffer, and Image barriers
);

This is the part that trips up even experienced graphics programmers.

**Execution Barrier**: Tells the GPU: "Don’t start the next shader until the previous one is finished."

**Memory Barrier**: Tells the GPU: "Ensure the data written by the first shader is actually flushed out of the L1/L2 caches and is visible to the next shader."

In Vulkan, `vkCmdPipelineBarrier` handles **both**. By setting the `srcStage` and `dstStage`, you handle execution. By setting the `srcAccess` and `dstAccess`, you handle memory visibility.

**The Common Pitfall**: Using `eShaderRead` as the `srcAccessMask`. Remember: the `src` is what you are **finishing**, and the `dst` is what you are **starting**. If you tell Vulkan to wait for a read before starting a read, you haven’t protected your writes!

In a deep network, you might be tempted to create a `VkBufferMemoryBarrier` for every single transition. While precise, this can lead to "Barrier Bloat" and messy code.

Professional ML engines often use **Global Memory Barriers**. Instead of specifying a specific buffer, you set the `bufferCount` to 0 and provide a generic `VkMemoryBarrier`.

vk::MemoryBarrier globalBarrier{
    .srcAccessMask = vk::AccessFlagBits::eShaderWrite,
    .dstAccessMask = vk::AccessFlagBits::eShaderRead
};

// This protects ALL buffers currently being used by the compute pipe
cmd.pipelineBarrier(vk::PipelineStageFlagBits::eComputeShader,
                    vk::PipelineStageFlagBits::eComputeShader,
                    {}, globalBarrier, nullptr, nullptr);

While slightly less efficient (the GPU might flush more than it needs to), it is much harder to get wrong. Start with global barriers during debugging, and move to buffer-specific barriers only when you need to squeeze out the last 1% of performance.

In the "Building the Inference Engine" chapter, we introduced workgroups. Now, let’s look at the math that causes 90% of "partial render" bugs.

When you dispatch a compute shader, you define a grid of threads.

  

  

If you have a tensor of width    and you use a local workgroup size of   , how many workgroups do you need?

If you do simple integer division:

  

  

  

  

You just missed the last column of your image! Your network is now "blind" to the rightmost edge of every frame. To fix this, we must always **Round Up**:

  

  

In C++:

uint32_t groupCount = (tensorWidth + localSize - 1) / localSize;
cmd.dispatch(groupCount, heightCount, depthCount);

Rounding up creates a new problem: some threads will now be "outside" the tensor. If your shader writes to `data[index]` without checking, you will corrupt adjacent memory or trigger a GPU page fault.

**Every ML shader must have a boundary check:**

void main() {
    ivec2 pos = ivec2(gl_GlobalInvocationID.xy);

    // Safety check: Don't process pixels that don't exist
    if (pos.x >= params.width || pos.y >= params.height) {
        return;
    }

    // Real work happens here...
}

Even if your synchronization is perfect, your results might still be wrong due to **Memory Visibility**.

GPUs have multiple levels of cache (L1, L2). When a shader writes to a buffer, that data might stay in the L2 cache and not be written back to the actual VRAM. If your next layer is executed on a different "Compute Unit" that has its own L1 cache, it might read a "stale" version of the data from VRAM.

Vulkan’s barriers handle this via **Access Flags**.
*   `eShaderWrite` ensures that the L1/L2 caches are **flushed** (pushed to VRAM).
*   `eShaderRead` ensures that the L1/L2 caches are **invalidated** (forced to re-read from VRAM).

**Debugging Tip**: If your results change every time you run the app (non-deterministic), you almost certainly have a visibility bug.

In a deep network like MobileNetV2, you might have 50+ convolution layers. Each one needs its own Weights, Bias, and Activation buffers.

**The Bug**: Binding "Layer 2" weights while running "Layer 3" compute dispatch.
**The Cause**: High-level loops that reuse descriptor set indices.

// DANGEROUS: Reusing the same descriptor set for different dispatches in one frame
for (int i = 0; i 

Because Vulkan commands are recorded into a buffer and executed later, by the time the GPU actually runs Layer 1, the CPU has already updated `globalSet` to point to Layer 50’s weights!

**The Solution**:

**Allocate One Set Per Layer**: The safest approach. If you have 50 layers, create 50 descriptor sets at startup.

**Use Dynamic Offsets**: Pack all weights for the entire model into one massive `VkBuffer`. When binding, provide an offset. This is highly efficient and recommended for production engines.

**Use Push Descriptors**: (If supported) Update the descriptors directly in the command stream. This avoids the need for descriptor sets entirely but has limited support on older hardware.

RenderDoc is the most important tool in your arsenal. It allows you to "freeze time" and look at exactly what the GPU saw at the moment of failure.

**Capture the Frame**: Run your app in RenderDoc and press `F12` during inference.

**Find the Dispatch**: Look for `vkCmdDispatch` calls. Use `VK_EXT_debug_utils` to name your layers so you don’t get lost (e.g., "Conv_Layer_5").

**Inspect Inputs**: Click the "Pipeline State" tab and look at the "Read" buffers. Are the weights actually there? Or is the buffer full of zeros?

**Inspect Outputs**: Click the "Mesh View" or "Raw Data" to see the output buffer.

* 
**Pro Tip**: In the Mesh View, you can configure the format to "3D" and see your tensor as a volume. If you see a "checkerboard" of zeros, your indexing math is wrong.

* 
**Pro Tip**: Use the "Byte Comparison" tool to compare the GPU buffer against a binary dump from your CPU reference.

**Shader Debugging**: If the data is correct but the math is wrong, you can right-click a thread and "Debug Shader". You can step through your GLSL code line-by-line, watching the registers change.

If you are using **Shared Memory** (tiling) for optimization, you have a new category of bugs: **Intra-workgroup races**.

`barrier()` in GLSL only synchronizes **execution**. It ensures every thread reached that line. It does **NOT** guarantee that memory writes are visible.

sharedData[gl_LocalInvocationIndex] = inputVal;
barrier(); // Every thread is here...
float val = sharedData[neighborIndex]; // ...but did the neighbor finish writing?

**The Fix**: Use `memoryBarrierShared()` followed by `groupMemoryBarrier()`.

sharedData[idx] = val;
memoryBarrierShared(); // Flush writes to shared memory
barrier();             // Wait for all threads
// Now it is safe to read

In ML, once a single `NaN` (Not a Number) appears, it’s like a virus. It will multiply and destroy every subsequent calculation.

**Division by zero**: Common in Batch Norm if the variance is zero.

**Overflow**:    in Softmax where    is too large.

**Uninitialized Memory**: Reading from a buffer you forgot to clear.

Vulkan has a specialized extension: `VK_EXT_device_fault`. If supported by your driver, it can pinpoint the exact instruction that produced an invalid floating-point result.

Alternatively, you can write a "Sanity Shader" that runs after each layer:

if (isnan(value) || isinf(value)) {
    atomicAdd(errorCounter, 1);
}

When your output is `NaN` or garbage:

**Validation Layers**: Are there any "Sync" warnings? (Enable `VK_VALIDATION_FEATURE_ENABLE_SYNCHRONIZATION_VALIDATION_EXT`).

**Descriptor Check**: Is RenderDoc showing the correct Weight buffer for the current layer?

**Workgroup Check**: Are you rounding up and checking bounds?

**Barrier Check**: Is there a barrier between EVERY layer dispatch?

**Layout Check**: Is your data NCHW when the shader expects NCHW?

**Readback Check**: Did you use a `VkFence` to wait for the GPU to finish before trying to read the result on the CPU?

Debugging Vulkan ML is about being **Explicit**. You cannot assume the driver will "do the right thing." You must tell it exactly when to wait, where to look, and how much to compute.

Next, we’ll look at how to quantify "correctness" using mathematical verification against golden references.

[Previous: Introduction](01_introduction.html) | [Next: Verifying Correctness](03_verifying_correctness.html)
