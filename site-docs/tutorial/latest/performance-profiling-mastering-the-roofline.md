# Performance Profiling: Mastering the Roofline

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Debugging_and_Performance/04_performance_profiling.html

## Table of Contents

- [The Performance Mindset: The Three Bottlenecks](#_the_performance_mindset_the_three_bottlenecks)
- [The_Performance_Mindset:_The_Three_Bottlenecks](#_the_performance_mindset_the_three_bottlenecks)
- [Setting Up for Profiling](#_setting_up_for_profiling)
- [Setting_Up_for_Profiling](#_setting_up_for_profiling)
- [Tool 1: Vulkan Timestamp Queries (The Stopwatch)](#_tool_1_vulkan_timestamp_queries_the_stopwatch)
- [Tool_1:_Vulkan_Timestamp_Queries_(The_Stopwatch)](#_tool_1_vulkan_timestamp_queries_the_stopwatch)
- [Implementing Timestamps](#_implementing_timestamps)
- [Tool 2: The Roofline Model (The Map)](#_tool_2_the_roofline_model_the_map)
- [Tool_2:_The_Roofline_Model_(The_Map)](#_tool_2_the_roofline_model_the_map)
- [The Mathematical Foundation](#_the_mathematical_foundation)
- [The_Mathematical_Foundation](#_the_mathematical_foundation)
- [Case Study: 3x3 Convolution](#_case_study_3x3_convolution)
- [Case_Study:_3x3_Convolution](#_case_study_3x3_convolution)
- [Tool 3: NVIDIA Nsight Compute (The Microscope)](#_tool_3_nvidia_nsight_compute_the_microscope)
- [Tool_3:_NVIDIA_Nsight_Compute_(The_Microscope)](#_tool_3_nvidia_nsight_compute_the_microscope)
- [Key Metrics to Watch:](#_key_metrics_to_watch)
- [Key_Metrics_to_Watch:](#_key_metrics_to_watch)
- [Common Bottlenecks in Vulkan ML](#_common_bottlenecks_in_vulkan_ml)
- [Common_Bottlenecks_in_Vulkan_ML](#_common_bottlenecks_in_vulkan_ml)
- [1. Uncoalesced Memory Access](#_1_uncoalesced_memory_access)
- [1._Uncoalesced_Memory_Access](#_1_uncoalesced_memory_access)
- [2. Register Pressure](#_2_register_pressure)
- [2._Register_Pressure](#_2_register_pressure)
- [3. Warp Divergence](#_3_warp_divergence)
- [3._Warp_Divergence](#_3_warp_divergence)
- [Summary: Data-Driven Optimization](#_summary_data_driven_optimization)
- [Summary:_Data-Driven_Optimization](#_summary_data_driven_optimization)

## Content

Your Vulkan ML implementation is correct—outputs match PyTorch to within floating-point tolerance. Now you want to make it fast. But where do you start?

Optimization without measurement is just **Guesswork**. You might spend days hand-tuning a ReLU activation only to discover it accounts for less than 1% of your total runtime. Meanwhile, a memory layout issue in your convolution kernel is silently wasting 80% of your GPU’s bandwidth.

In this chapter, we are going to learn how to see through the "black box" of the GPU. We will move from basic timing to deep hardware profiling, using the **Roofline Model** to understand exactly why your code is slow and how much faster it can realistically get.

On modern GPUs, arithmetic is almost "free." The real cost is **Data Movement**. A typical GPU can perform thousands of additions in the time it takes to fetch a single float from VRAM.

When you profile an ML kernel, you are looking for one of three regimes:

**Memory Bound**: Your compute units are sitting idle because the memory bus is saturated. You are waiting for weights or activations to arrive from VRAM.

**Compute Bound**: You are doing so much math (e.g., a massive 7x7 convolution) that the memory bus is actually waiting for **you**.

**Latency Bound**: You aren’t launching enough threads to hide the cost of memory access. Even though the memory bus isn’t full, individual threads are stalled waiting for data.

Profiling tells you which regime you’re in. If you are Memory Bound, adding more math (like a more complex activation) is literally free. If you are Compute Bound, you need to simplify your algorithms or use faster hardware instructions.

Before you pull out the heavy tools, you must ensure your environment is set up for accurate measurement.

* 
**Release Mode**: Never profile a Debug build. Debug builds often include extra synchronization and disable compiler optimizations that are critical for GPU performance.

* 
**GPU "Warm-up"**: The first few inferences are always slow due to shader compilation, memory allocation, and driver overhead. Run the model 10-20 times before you start timing.

* 
**Fixed Clock Speeds**: For professional benchmarking, use tools like `nvidia-smi -lgc` to lock your GPU clock speed. This prevents "Thermal Throttling" from making your results non-deterministic.

The most basic way to profile is using Vulkan’s built-in **Timestamp Queries**. These allow you to measure exactly how many GPU cycles passed between any two points in your command buffer.

To use timestamps, you need a **Query Pool**.

// 1. Create a Query Pool
vk::QueryPoolCreateInfo poolInfo{
    .queryType = vk::QueryType::eTimestamp,
    .queryCount = 2 // One for start, one for end
};
auto queryPool = device.createQueryPool(poolInfo);

// 2. Record the timestamps in your command buffer
cmd.resetQueryPool(queryPool, 0, 2);

// We use 'eBottomOfPipe' to ensure the work is actually FINISHED
cmd.writeTimestamp(vk::PipelineStageFlagBits::eBottomOfPipe, queryPool, 0);

// ... Dispatch your compute shader ...

cmd.writeTimestamp(vk::PipelineStageFlagBits::eBottomOfPipe, queryPool, 1);

// 3. Retrieve the results after the fence wait
uint64_t results[2];
device.getQueryPoolResults(queryPool, 0, 2, sizeof(results), results,
                           sizeof(uint64_t), vk::QueryResultFlagBits::e64);

// 4. Convert cycles to milliseconds
// 'timestampPeriod' is from VkPhysicalDeviceLimits
float ms = (results[1] - results[0]) * physicalDeviceLimits.timestampPeriod / 1e6f;

**The Benefit**: Extremely low overhead. You can leave these in your app to show a real-time "Performance HUD" or log the cost of every layer in your CI logs.

How do you know if a kernel is "fast enough"? We use the **Roofline Model**. It graphs performance (GFLOPS) against **Arithmetic Intensity** (Operations per Byte).

Every GPU has two physical limits:
1.  **Peak Compute**: The maximum number of floating-point operations it can do per second (GFLOPS).
2.  **Peak Bandwidth**: The maximum number of bytes it can read from memory per second (GB/s).

  

  

The "Roofline" is defined as:

  

  

Imagine a 3x3 convolution on a 224x224x64 tensor.

* 
**FLOPs**:   

* 
**Bytes**: Loading weights, input, and writing output   

* 
**Intensity**:   

If your GPU has a peak memory bandwidth of **500 GB/s**, your "theoretical ceiling" for this kernel is:

  

  

If your GPU’s peak compute is only **15 TFLOPS**, then you are **Compute Bound**. No amount of memory optimization will make it faster! You must use faster math (like FP16 or Tensor Cores) to move the "roof" higher.

If Timestamps tell you **that** a kernel is slow, Nsight Compute tells you **why**. It provides a deep dive into the hardware’s internal counters.

* 
**DRAM Throughput**: If this is > 80%, you are **Memory Bound**. You need to reuse data more effectively (Tiling).

* 
**Compute (SM) Throughput**: If this is > 80%, you are **Compute Bound**.

* 
**Occupancy**: Tells you what percentage of the GPU’s "thread slots" are full.

* 
**Low Occupancy ( 50%)**: Good! Your GPU is "saturated" with work.

When a **Warp** (32 threads) reads memory, it wants to read a **contiguous 128-byte block**. If thread 0 reads index 0 and thread 1 reads index 1000, the GPU has to perform two separate memory transactions.

* 
**The Fix**: Ensure your `pixelIdx` calculation keeps adjacent threads reading adjacent memory addresses. This is why **NCHW** layout is often faster for compute than **NHWC**.

Each GPU Compute Unit has a fixed number of **Registers** (fastest memory). If your shader uses 128 registers per thread, the GPU might only be able to run 256 threads at once. If you can reduce it to 64 registers, you can run 512 threads.

* 
**The Fix**: Avoid huge arrays inside your GLSL code. Let the compiler manage variables.

If you have an `if` statement in your shader where half the threads go one way and half the other, the GPU has to execute **both paths** sequentially for the entire warp.

* 
**The Fix**: Keep your shaders "flat." Use `clamp()` or `max()` instead of `if` statements where possible.

Performance profiling is the difference between "poking in the dark" and surgical precision engineering. By using the tools and metrics discussed here, you turn optimization into a predictable process.

* 
**Measure** with Timestamps to find the slowest layers.

* 
**Analyze** with Nsight or RGP to find the hardware bottleneck.

* 
**Calculate** your Arithmetic Intensity to see your theoretical ceiling.

* 
**Focus** your efforts only on the 20% of code that takes 80% of the time.

In the next chapter, we will apply these insights to actual **Optimization Techniques**, learning the patterns that turn slow shaders into high-performance ML engines.

[Previous: Verifying Correctness](03_verifying_correctness.html) | [Next: Optimization Techniques](05_optimization_techniques.html)
