# Vulkan Compute Pipeline Review

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Vulkan_Compute_for_ML/02_compute_pipeline_review.html

## Table of Contents

- [Introduction](#_introduction)
- [The ML Compute Workload](#_the_ml_compute_workload)
- [The_ML_Compute_Workload](#_the_ml_compute_workload)
- [Characteristics of ML Operations](#_characteristics_of_ml_operations)
- [Characteristics_of_ML_Operations](#_characteristics_of_ml_operations)
- [Implications for Vulkan Implementation](#_implications_for_vulkan_implementation)
- [Implications_for_Vulkan_Implementation](#_implications_for_vulkan_implementation)
- [Descriptor Set Layouts for Tensors](#_descriptor_set_layouts_for_tensors)
- [Descriptor_Set_Layouts_for_Tensors](#_descriptor_set_layouts_for_tensors)
- [The Basic Pattern](#_the_basic_pattern)
- [The_Basic_Pattern](#_the_basic_pattern)
- [Multiple Inputs and Outputs](#_multiple_inputs_and_outputs)
- [Multiple_Inputs_and_Outputs](#_multiple_inputs_and_outputs)
- [Push Constants for Metadata](#_push_constants_for_metadata)
- [Push_Constants_for_Metadata](#_push_constants_for_metadata)
- [Work Group Sizing](#_work_group_sizing)
- [Work_Group_Sizing](#_work_group_sizing)
- [The Basics](#_the_basics)
- [Typical Sizes for ML Operations](#_typical_sizes_for_ml_operations)
- [Typical_Sizes_for_ML_Operations](#_typical_sizes_for_ml_operations)
- [Dispatch Sizing](#_dispatch_sizing)
- [Optimizing Work Group Size](#_optimizing_work_group_size)
- [Optimizing_Work_Group_Size](#_optimizing_work_group_size)
- [Memory Access Patterns](#_memory_access_patterns)
- [Memory_Access_Patterns](#_memory_access_patterns)
- [Coalesced Access](#_coalesced_access)
- [Tensor Layouts](#_tensor_layouts)
- [Shared Memory for Reuse](#_shared_memory_for_reuse)
- [Shared_Memory_for_Reuse](#_shared_memory_for_reuse)
- [Pipeline Creation](#_pipeline_creation)
- [Pipeline Cache](#_pipeline_cache)
- [Specialization Constants](#_specialization_constants)
- [Command Buffer Recording](#_command_buffer_recording)
- [Command_Buffer_Recording](#_command_buffer_recording)
- [The Basic Pattern](#_the_basic_pattern_2)
- [The_Basic_Pattern](#_the_basic_pattern_2)
- [Minimizing Overhead](#_minimizing_overhead)
- [Summary](#_summary)

## Content

You’ve worked with Vulkan compute pipelines before. You know how to create compute shaders, dispatch work groups, and synchronize operations. But ML inference has specific patterns and requirements that differ from typical compute workloads. This chapter reviews Vulkan compute pipelines with an ML focus, highlighting the aspects that matter most for neural network operations.

Think of this as a focused refresher. We’re not teaching Vulkan compute from scratch—we’re showing you how to think about compute pipelines when your goal is running ML inference. The patterns you learn here will apply to every ML operation you implement.

Before diving into Vulkan specifics, let’s understand what makes ML inference different from other compute workloads.

ML inference has distinctive characteristics that shape how we use Vulkan compute:

**Large, Regular Data**: Neural networks operate on tensors—multi-dimensional arrays of numbers. A single 224×224×3 image is 150,528 floats. Intermediate activations can be much larger. This data is highly regular and structured, which is perfect for GPU parallelism.

**Embarrassingly Parallel Operations**: Many ML operations are element-wise or have minimal dependencies between elements. ReLU activation applies the same function to every element independently. Matrix multiplication has well-understood parallelization patterns. This parallelism is what makes GPUs so effective for ML.

**Sequential Dependencies**: Despite the parallelism within operations, neural networks are sequences of dependent operations. Layer 2 can’t start until layer 1 completes. This creates a tension between maximizing parallelism within operations and managing dependencies between operations.

**Memory-Intensive**: ML inference moves a lot of data. Weights are loaded from memory, inputs are read, intermediate results are written, outputs are produced. Memory bandwidth often becomes the bottleneck, not compute. Efficient memory access patterns matter enormously.

**Predictable Access Patterns**: Unlike some compute workloads with irregular memory access, ML operations typically have predictable, structured access patterns. Convolutions read from regular windows, matrix multiplications access rows and columns systematically. This predictability allows for effective optimization.

These characteristics guide our Vulkan implementation decisions:

We’ll use large work groups to maximize parallelism within operations. We’ll carefully manage memory layout to ensure coalesced access. We’ll use pipeline barriers to enforce dependencies between operations while allowing parallelism within them. We’ll reuse memory aggressively to minimize footprint.

Understanding these patterns helps you make informed decisions as we implement specific operations.

Descriptor sets are how shaders access GPU memory. For ML inference, we need descriptor layouts that efficiently represent tensors and weights.

A typical ML operation reads input tensors, reads weights, and writes output tensors. The descriptor set layout reflects this:

vk::DescriptorSetLayoutBinding bindings[] = {
    // Binding 0: Input tensor (read-only)
    {
        .binding = 0,
        .descriptorType = vk::DescriptorType::eStorageBuffer,
        .descriptorCount = 1,
        .stageFlags = vk::ShaderStageFlagBits::eCompute
    },
    // Binding 1: Weights (read-only)
    {
        .binding = 1,
        .descriptorType = vk::DescriptorType::eStorageBuffer,
        .descriptorCount = 1,
        .stageFlags = vk::ShaderStageFlagBits::eCompute
    },
    // Binding 2: Output tensor (write)
    {
        .binding = 2,
        .descriptorType = vk::DescriptorType::eStorageBuffer,
        .descriptorCount = 1,
        .stageFlags = vk::ShaderStageFlagBits::eCompute
    }
};

We use storage buffers rather than uniform buffers because tensors are large—often megabytes. Uniform buffers have size limits (typically 64KB), while storage buffers can be gigabytes.

Some operations have multiple inputs or outputs. Batch normalization reads input, weights, biases, running mean, and running variance. Residual connections add two tensors. Your descriptor layout needs to accommodate these patterns:

// For operations with multiple inputs (e.g., residual add)
vk::DescriptorSetLayoutBinding bindings[] = {
    {.binding = 0, ...},  // Input tensor 1
    {.binding = 1, ...},  // Input tensor 2
    {.binding = 2, ...}   // Output tensor
};

The key insight: descriptor layouts should match the operation’s data flow. Each input tensor gets a binding, each output tensor gets a binding, weights get bindings. Keep it simple and explicit.

Tensors have shapes—dimensions that define their structure. A 224×224×3 image has height=224, width=224, channels=3. Your shader needs this information to index into the tensor correctly.

Push constants are perfect for this metadata:

struct TensorMetadata {
    uint32_t height;
    uint32_t width;
    uint32_t channels;
    uint32_t batch_size;
};

vk::PushConstantRange pushConstantRange = {
    .stageFlags = vk::ShaderStageFlagBits::eCompute,
    .offset = 0,
    .size = sizeof(TensorMetadata)
};

Push constants are fast—they’re embedded directly in the command buffer. For small amounts of data like tensor shapes, they’re ideal.

Work group size is one of the most important performance decisions you’ll make. It affects parallelism, resource usage, and memory access patterns.

A work group is a collection of shader invocations that execute together and can share data through shared memory. When you dispatch a compute shader, you specify how many work groups to launch and how many invocations are in each work group.

For ML operations, you typically want each invocation to compute one or more output elements. The work group size determines how many invocations run together.

For element-wise operations (ReLU, sigmoid, etc.), a common pattern is:

layout(local_size_x = 256, local_size_y = 1, local_size_z = 1) in;

This creates work groups of 256 invocations. Why 256? It’s a good balance:

* 
Large enough to keep the GPU busy (modern GPUs can run thousands of invocations concurrently)

* 
Small enough to fit within hardware limits (most GPUs support at least 1024 invocations per work group)

* 
A power of 2, which often aligns well with hardware architecture

For 2D operations like convolutions, you might use:

layout(local_size_x = 16, local_size_y = 16, local_size_z = 1) in;

This creates 16×16 = 256 invocations per work group, organized in a 2D pattern that matches the 2D structure of images.

When you dispatch work, you specify how many work groups to launch. For a tensor with N elements and work groups of size 256, you need:

uint32_t numWorkGroups = (N + 255) / 256;  // Round up
commandBuffer.dispatch(numWorkGroups, 1, 1);

The rounding up ensures you have enough invocations to cover all elements. Your shader needs to check bounds to avoid processing beyond the tensor size:

uint globalID = gl_GlobalInvocationID.x;
if (globalID >= tensorSize) return;  // Bounds check

The optimal work group size depends on your operation and hardware. General guidelines:

**For element-wise operations**: 128-256 invocations works well. These operations are simple, so you want many invocations to keep the GPU busy.

**For operations using shared memory**: Size depends on how much shared memory you need. If each invocation needs 4 bytes of shared memory and you have 48KB available, you can have up to 12,288 invocations per work group. But practical limits are lower—1024 is a common maximum.

**For 2D operations**: 16×16 or 32×32 work well. They match the 2D structure of images and provide good parallelism (256 or 1024 invocations).

Profiling is essential. Try different sizes and measure performance. The optimal size varies by GPU architecture and operation complexity.

How you access memory dramatically affects performance. GPUs are designed for coalesced access—adjacent threads accessing adjacent memory locations. Violating this pattern can reduce performance by 10x or more.

Imagine 32 threads (a warp on NVIDIA GPUs, a wavefront on AMD) executing together. If thread 0 reads address 0, thread 1 reads address 4, thread 2 reads address 8, etc., the GPU can coalesce these into a single memory transaction. This is fast.

If threads access random addresses, each becomes a separate transaction. This is slow.

For ML operations, coalesced access usually means:

**Element-wise operations**: Each thread processes one element, and threads process consecutive elements:

uint idx = gl_GlobalInvocationID.x;
float value = inputBuffer[idx];  // Coalesced: consecutive threads read consecutive addresses
float result = relu(value);
outputBuffer[idx] = result;      // Coalesced: consecutive threads write consecutive addresses

**Matrix operations**: Access patterns depend on layout. Row-major matrices have consecutive elements in rows, column-major in columns. Your access pattern should match the layout.

Tensors can be stored in different layouts. For a 4D tensor (batch, channels, height, width), common layouts are:

**NCHW (channels first)**: Elements are ordered as batch, then channels, then height, then width. All values for channel 0 come first, then all values for channel 1, etc.

**NHWC (channels last)**: Elements are ordered as batch, then height, then width, then channels. All channels for position (0,0) come first, then all channels for position (0,1), etc.

The layout affects access patterns. For convolutions, NCHW often works better because you’re reading all channels at each spatial position. For element-wise operations, layout matters less.

Choose a layout and stick with it throughout your inference pipeline. Converting between layouts is expensive.

Some operations read the same data multiple times. Convolutions read overlapping windows—the same input pixel contributes to multiple output pixels. Loading data into shared memory once and reusing it is much faster than reading from global memory repeatedly.

Shared memory is fast (on-chip) but limited (typically 48-96KB per work group). Use it for data that’s reused within a work group:

shared float sharedData[256];

// Load data into shared memory
uint localID = gl_LocalInvocationID.x;
sharedData[localID] = inputBuffer[globalID];

// Synchronize to ensure all threads have loaded
barrier();

// Now all threads can access sharedData quickly
float value = sharedData[someIndex];

We’ll see concrete examples when we implement convolutions.

Creating compute pipelines for ML operations follows the standard Vulkan pattern, but with ML-specific considerations.

ML inference often uses many different operations, each with its own pipeline. Creating pipelines is expensive. Use a pipeline cache to amortize this cost:

vk::PipelineCacheCreateInfo cacheInfo{};
vk::raii::PipelineCache pipelineCache(device, cacheInfo);

// Create all pipelines with the cache
vk::ComputePipelineCreateInfo pipelineInfo{
    // ... pipeline configuration ...
};
vk::raii::Pipeline pipeline(device, *pipelineCache, pipelineInfo);
// RAII handles cleanup automatically

You can even save the cache to disk and load it on subsequent runs, making startup faster.

Some shader parameters are known at pipeline creation time but vary between pipelines. Specialization constants let you parameterize shaders without recompiling:

layout(constant_id = 0) const uint WORK_GROUP_SIZE = 256;
layout(local_size_x_id = 0) in;  // Use specialization constant for work group size

vk::SpecializationMapEntry entry = {
    .constantID = 0,
    .offset = 0,
    .size = sizeof(uint32_t)
};

uint32_t workGroupSize = 256;
vk::SpecializationInfo specInfo = {
    .mapEntryCount = 1,
    .pMapEntries = &entry,
    .dataSize = sizeof(uint32_t),
    .pData = &workGroupSize
};

vk::ComputePipelineCreateInfo pipelineInfo{
    // ...
    .stage = {
        // ...
        .pSpecializationInfo = &specInfo
    }
};

This lets you create multiple pipelines with different work group sizes from the same shader, without recompiling.

Recording commands for ML inference follows a pattern: bind pipeline, bind descriptor sets, push constants, dispatch, barrier, repeat.

// Begin command buffer
vk::CommandBufferBeginInfo beginInfo{
    .flags = vk::CommandBufferUsageFlagBits::eOneTimeSubmit
};
commandBuffer.begin(beginInfo);

// Layer 1: Convolution
commandBuffer.bindPipeline(vk::PipelineBindPoint::eCompute, *convPipeline);
commandBuffer.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                                 *pipelineLayout, 0, *convDescriptorSet, nullptr);
commandBuffer.pushConstants(*pipelineLayout, vk::ShaderStageFlagBits::eCompute,
                           0, sizeof(metadata), &metadata);
commandBuffer.dispatch(numWorkGroupsX, numWorkGroupsY, 1);

// Barrier: ensure convolution completes before activation
vk::MemoryBarrier barrier{
    .srcAccessMask = vk::AccessFlagBits::eShaderWrite,
    .dstAccessMask = vk::AccessFlagBits::eShaderRead
};
commandBuffer.pipelineBarrier(
    vk::PipelineStageFlagBits::eComputeShader,
    vk::PipelineStageFlagBits::eComputeShader,
    {}, barrier, nullptr, nullptr);

// Layer 2: ReLU activation
commandBuffer.bindPipeline(vk::PipelineBindPoint::eCompute, *reluPipeline);
commandBuffer.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                                 *pipelineLayout, 0, *reluDescriptorSet, nullptr);
commandBuffer.dispatch(numWorkGroupsX, 1, 1);

// ... more layers ...

commandBuffer.end();

This pattern repeats for each layer: bind, dispatch, barrier, next layer.

Command buffer recording has overhead. For inference, you typically record once and replay many times:

// Record once
vk::raii::CommandBuffer inferenceCommandBuffer = recordInferencePipeline();

// Execute many times
for (int frame = 0; frame 

This amortizes recording overhead across many inferences.

This chapter reviewed Vulkan compute pipelines with an ML focus. Key takeaways:

ML operations are characterized by large regular data, embarrassing parallelism within operations, sequential dependencies between operations, memory-intensive access patterns, and predictable access. These characteristics guide our Vulkan implementation.

Descriptor sets for ML typically have bindings for input tensors, weights, and output tensors, using storage buffers for large data and push constants for metadata like tensor shapes.

Work group sizing matters enormously for performance. Typical sizes are 128-256 for element-wise operations, 16×16 or 32×32 for 2D operations. Profiling is essential to find optimal sizes.

Memory access patterns determine performance. Coalesced access (adjacent threads accessing adjacent memory) is critical. Tensor layout (NCHW vs NHWC) affects access patterns. Shared memory enables reuse of frequently accessed data.

Pipeline creation follows standard Vulkan patterns but benefits from pipeline caches and specialization constants. Command buffer recording follows a bind-dispatch-barrier pattern that repeats for each layer.

With this foundation, we’re ready to implement specific ML operations. The next chapter covers element-wise operations—the simplest ML operations and a good starting point for implementation.

[Previous: Introduction](01_introduction.html) | [Next: Element-Wise Operations](03_element_wise_operations.html)
