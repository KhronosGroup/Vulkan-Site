# Synchronization

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Vulkan_Compute_for_ML/06_synchronization.html

## Table of Contents

- [Introduction](#_introduction)
- [Understanding the Problem](#_understanding_the_problem)
- [Understanding_the_Problem](#_understanding_the_problem)
- [Dependencies in Neural Networks](#_dependencies_in_neural_networks)
- [Dependencies_in_Neural_Networks](#_dependencies_in_neural_networks)
- [Parallel Branches](#_parallel_branches)
- [Memory Reuse](#_memory_reuse)
- [Vulkan Synchronization Primitives](#_vulkan_synchronization_primitives)
- [Vulkan_Synchronization_Primitives](#_vulkan_synchronization_primitives)
- [Pipeline Barriers: The Workhorse](#_pipeline_barriers_the_workhorse)
- [Pipeline_Barriers:_The_Workhorse](#_pipeline_barriers_the_workhorse)
- [Buffer Memory Barriers: Fine-Grained Control](#_buffer_memory_barriers_fine_grained_control)
- [Buffer_Memory_Barriers:_Fine-Grained_Control](#_buffer_memory_barriers_fine_grained_control)
- [Execution vs Memory Dependencies](#_execution_vs_memory_dependencies)
- [Execution_vs_Memory_Dependencies](#_execution_vs_memory_dependencies)
- [Synchronization Patterns for ML Operations](#_synchronization_patterns_for_ml_operations)
- [Synchronization_Patterns_for_ML_Operations](#_synchronization_patterns_for_ml_operations)
- [Pattern 1: Sequential Layers](#_pattern_1_sequential_layers)
- [Pattern_1:_Sequential_Layers](#_pattern_1_sequential_layers)
- [Pattern 2: Parallel Branches](#_pattern_2_parallel_branches)
- [Pattern_2:_Parallel_Branches](#_pattern_2_parallel_branches)
- [Pattern 3: Memory Reuse](#_pattern_3_memory_reuse)
- [Pattern_3:_Memory_Reuse](#_pattern_3_memory_reuse)
- [Optimizing Synchronization](#_optimizing_synchronization)
- [Barrier Granularity](#_barrier_granularity)
- [Batching Barriers](#_batching_barriers)
- [Avoiding Unnecessary Barriers](#_avoiding_unnecessary_barriers)
- [Avoiding_Unnecessary_Barriers](#_avoiding_unnecessary_barriers)
- [Debugging Synchronization Issues](#_debugging_synchronization_issues)
- [Debugging_Synchronization_Issues](#_debugging_synchronization_issues)
- [Validation Layers](#_validation_layers)
- [Systematic Testing](#_systematic_testing)
- [Overly Conservative Synchronization](#_overly_conservative_synchronization)
- [Overly_Conservative_Synchronization](#_overly_conservative_synchronization)
- [RenderDoc and GPU Debuggers](#_renderdoc_and_gpu_debuggers)
- [RenderDoc_and_GPU_Debuggers](#_renderdoc_and_gpu_debuggers)
- [Complete Example: Three-Layer Network](#_complete_example_three_layer_network)
- [Complete_Example:_Three-Layer_Network](#_complete_example_three_layer_network)
- [Summary](#_summary)

## Content

Neural networks are sequences of dependent operations. Layer 2 can’t start until layer 1 completes. Layer 5 can’t read from a buffer that layer 4 is still writing to. This creates a fundamental challenge: how do you enforce these dependencies while still allowing parallelism where possible?

Vulkan gives you explicit control over synchronization, which is both powerful and dangerous. Too little synchronization leads to race conditions—operations reading data before it’s written, producing incorrect results. Too much synchronization serializes execution, wasting the GPU’s parallel processing power and hurting performance.

This chapter explores how to synchronize ML operations correctly and efficiently. We’ll cover Vulkan’s synchronization primitives, patterns for sequential and parallel operations, and practical techniques for managing dependencies in neural network inference.

Before diving into Vulkan’s synchronization mechanisms, let’s understand what we’re trying to solve.

Consider a simple three-layer network:

Input → Layer 1 (Conv) → Layer 2 (ReLU) → Layer 3 (Pool) → Output

The dependencies are clear:

* 
Layer 2 depends on Layer 1’s output

* 
Layer 3 depends on Layer 2’s output

* 
Each layer must complete before the next begins

This is a **sequential dependency chain**. Without proper synchronization, Layer 2 might start reading Layer 1’s output buffer before Layer 1 finishes writing to it. The result? Garbage data, incorrect predictions, and hours of debugging.

Modern networks aren’t always sequential. Consider a residual network (ResNet) block:

Input → Conv1 → Conv2 → Add → Output
  ↓                        ↑
  └────────────────────────┘

The input flows through two paths: one through Conv1 and Conv2, another directly to the Add operation (the skip connection). These paths are independent—Conv1 and the skip connection can execute in parallel. But the Add operation depends on both paths completing.

This creates **parallel branches with a synchronization point**. You want Conv1 and the skip connection to run concurrently (maximizing GPU utilization), but you need to ensure both complete before Add starts.

To minimize memory usage, you reuse buffers. Layer 1’s output buffer might be reused for Layer 3’s output (since Layer 2 doesn’t need Layer 1’s output anymore after it completes).

This creates **write-after-read dependencies**. Layer 3 can’t start writing to the buffer until Layer 2 finishes reading from it. Without synchronization, Layer 3 might overwrite data that Layer 2 is still using.

Vulkan provides several synchronization mechanisms. Understanding each one and when to use it is essential.

Pipeline barriers are the primary synchronization mechanism for compute workloads. A pipeline barrier says: "All operations before this point must complete before any operations after this point begin."

More precisely, a pipeline barrier specifies:

**Source Stage**: Which pipeline stage must complete before the barrier
**Destination Stage**: Which pipeline stage must wait for the barrier
**Memory Barriers**: What memory accesses must be made visible

For ML inference, we typically use:

vk::MemoryBarrier barrier{
    .srcAccessMask = vk::AccessFlagBits::eShaderWrite,  // Previous layer wrote
    .dstAccessMask = vk::AccessFlagBits::eShaderRead    // Next layer reads
};

commandBuffer.pipelineBarrier(
    vk::PipelineStageFlagBits::eComputeShader,  // Source: compute shader finished
    vk::PipelineStageFlagBits::eComputeShader,  // Dest: compute shader waits
    {},
    barrier,
    nullptr,
    nullptr
);

This ensures that shader writes from the previous layer are visible to shader reads in the next layer.

For more control, use buffer memory barriers that specify exactly which buffer is involved:

vk::BufferMemoryBarrier bufferBarrier{
    .srcAccessMask = vk::AccessFlagBits::eShaderWrite,
    .dstAccessMask = vk::AccessFlagBits::eShaderRead,
    .srcQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
    .dstQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED,
    .buffer = *intermediateBuffer,
    .offset = 0,
    .size = VK_WHOLE_SIZE
};

commandBuffer.pipelineBarrier(
    vk::PipelineStageFlagBits::eComputeShader,
    vk::PipelineStageFlagBits::eComputeShader,
    {},
    nullptr,
    bufferBarrier,
    nullptr
);

This is more explicit: "This specific buffer was written by the previous shader and will be read by the next shader."

Vulkan distinguishes between two types of dependencies:

**Execution Dependency**: Operation A must finish before operation B starts. This is about ordering.

**Memory Dependency**: Writes from operation A must be visible to reads in operation B. This is about visibility.

You need both. An execution dependency without a memory dependency means operation B waits for operation A to finish, but might not see A’s writes (due to caching). A memory dependency without an execution dependency is meaningless—you can’t make writes visible if the write hasn’t happened yet.

Pipeline barriers provide both: the stage masks create the execution dependency, and the access masks create the memory dependency.

Let’s explore common synchronization patterns you’ll use in ML inference.

The simplest pattern: a chain of dependent layers.

// Dispatch Layer 1
cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *layer1Pipeline);
cmd.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                       *pipelineLayout, 0, *layer1DescSet, nullptr);
cmd.dispatch(workGroupsX, workGroupsY, 1);

// Barrier: Layer 1 writes must be visible to Layer 2 reads
vk::MemoryBarrier barrier{
    .srcAccessMask = vk::AccessFlagBits::eShaderWrite,
    .dstAccessMask = vk::AccessFlagBits::eShaderRead
};

cmd.pipelineBarrier(
    vk::PipelineStageFlagBits::eComputeShader,
    vk::PipelineStageFlagBits::eComputeShader,
    {}, barrier, nullptr, nullptr);

// Dispatch Layer 2
cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *layer2Pipeline);
cmd.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                       *pipelineLayout, 0, *layer2DescSet, nullptr);
cmd.dispatch(workGroupsX, workGroupsY, 1);

// Barrier: Layer 2 writes must be visible to Layer 3 reads
cmd.pipelineBarrier(
    vk::PipelineStageFlagBits::eComputeShader,
    vk::PipelineStageFlagBits::eComputeShader,
    {}, barrier, nullptr, nullptr);

// Dispatch Layer 3
cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *layer3Pipeline);
cmd.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                       *pipelineLayout, 0, *layer3DescSet, nullptr);
cmd.dispatch(workGroupsX, workGroupsY, 1);

This pattern is straightforward: dispatch, barrier, dispatch, barrier, dispatch. Each barrier ensures the previous layer’s writes are visible to the next layer’s reads.

For networks with parallel paths (like ResNet), you want branches to execute concurrently but synchronize at merge points.

// Dispatch both branches (no barrier between them - they're independent)
cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *branch1Pipeline);
cmd.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                       *pipelineLayout, 0, *branch1DescSet, nullptr);
cmd.dispatch(workGroupsX1, workGroupsY1, 1);

cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *branch2Pipeline);
cmd.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                       *pipelineLayout, 0, *branch2DescSet, nullptr);
cmd.dispatch(workGroupsX2, workGroupsY2, 1);

// Barrier: Both branches must complete before merge
vk::MemoryBarrier barrier{
    .srcAccessMask = vk::AccessFlagBits::eShaderWrite,
    .dstAccessMask = vk::AccessFlagBits::eShaderRead
};

cmd.pipelineBarrier(
    vk::PipelineStageFlagBits::eComputeShader,
    vk::PipelineStageFlagBits::eComputeShader,
    {}, barrier, nullptr, nullptr);

// Dispatch merge operation (reads from both branches)
cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *mergePipeline);
cmd.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                       *pipelineLayout, 0, *mergeDescSet, nullptr);
cmd.dispatch(workGroupsX, workGroupsY, 1);

The key insight: no barrier between the two branches. They can execute in parallel. The barrier comes before the merge, ensuring both branches complete before the merge reads their outputs.

When reusing buffers, you need write-after-read synchronization:

// Layer 1 writes to buffer A
cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *layer1Pipeline);
cmd.dispatch(workGroupsX, workGroupsY, 1);

// Barrier: Layer 1 writes must be visible to Layer 2 reads
vk::MemoryBarrier barrier{
    .srcAccessMask = vk::AccessFlagBits::eShaderWrite,
    .dstAccessMask = vk::AccessFlagBits::eShaderRead
};
cmd.pipelineBarrier(vk::PipelineStageFlagBits::eComputeShader,
                    vk::PipelineStageFlagBits::eComputeShader,
                    {}, barrier, nullptr, nullptr);

// Layer 2 reads from buffer A, writes to buffer B
cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *layer2Pipeline);
cmd.dispatch(workGroupsX, workGroupsY, 1);

// Barrier: Layer 2 reads must complete before Layer 3 writes to buffer A
barrier.srcAccessMask = vk::AccessFlagBits::eShaderRead;
barrier.dstAccessMask = vk::AccessFlagBits::eShaderWrite;
cmd.pipelineBarrier(vk::PipelineStageFlagBits::eComputeShader,
                    vk::PipelineStageFlagBits::eComputeShader,
                    {}, barrier, nullptr, nullptr);

// Layer 3 writes to buffer A (reusing Layer 1's buffer)
cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *layer3Pipeline);
cmd.dispatch(workGroupsX, workGroupsY, 1);

The second barrier is crucial: it ensures Layer 2 finishes reading from buffer A before Layer 3 starts writing to it. Without this, Layer 3 might overwrite data Layer 2 is still using.

Synchronization has cost. Every barrier potentially stalls the GPU. Let’s explore how to minimize this cost.

You could insert a barrier after every single operation:

dispatch(op1);
barrier();
dispatch(op2);
barrier();
dispatch(op3);
barrier();
// ... and so on

This is correct but inefficient. Each barrier forces the GPU to wait, even if the next operation doesn’t actually depend on the previous one.

Better: only insert barriers where dependencies exist:

dispatch(op1);  // Writes to buffer A
dispatch(op2);  // Writes to buffer B (independent of op1)
barrier();      // Both must complete before op3
dispatch(op3);  // Reads from buffers A and B

Operations 1 and 2 can overlap. The barrier comes only when necessary—before operation 3 that depends on both.

If multiple buffers need synchronization at the same point, use a single barrier with multiple buffer memory barriers:

vk::BufferMemoryBarrier barriers[3] = {
    {/* buffer A */},
    {/* buffer B */},
    {/* buffer C */}
};

cmd.pipelineBarrier(
    vk::PipelineStageFlagBits::eComputeShader,
    vk::PipelineStageFlagBits::eComputeShader,
    {}, nullptr, barriers, nullptr);

This is more efficient than three separate pipeline barrier calls.

Some operations don’t need barriers:

**Read-only operations**: If two operations both read from the same buffer without writing, no barrier is needed between them. Reads don’t conflict.

**Independent buffers**: If operation A writes to buffer X and operation B writes to buffer Y, and neither reads the other’s buffer, no barrier is needed.

**Same shader invocation**: Within a single shader dispatch, work groups are implicitly synchronized at the end. You don’t need barriers within a single dispatch.

Synchronization bugs are notoriously difficult to debug. The symptoms—incorrect results, occasional crashes, non-deterministic behavior—can be subtle.

Enable Vulkan validation layers during development:

const char* validationLayers[] = {
    "VK_LAYER_KHRONOS_validation"
};

vk::InstanceCreateInfo createInfo{
    .enabledLayerCount = 1,
    .ppEnabledLayerNames = validationLayers
};

Validation layers catch many synchronization errors: missing barriers, incorrect access masks, write-after-write hazards.

Test with different input sizes and batch sizes. Synchronization bugs often appear only with specific data sizes or when the GPU is under heavy load.

Run the same inference multiple times and verify results are identical. Non-deterministic results suggest a race condition.

When debugging, try adding barriers everywhere:

dispatch(layer1);
barrier();  // Overly conservative
dispatch(layer2);
barrier();  // Overly conservative
dispatch(layer3);
barrier();  // Overly conservative

If this fixes the problem, you know it’s a synchronization issue. Then remove barriers one by one to find the minimum necessary set.

Tools like RenderDoc can capture and visualize command buffer execution. You can see the order of dispatches and barriers, helping identify where synchronization is missing or incorrect.

Let’s put it all together with a complete example: a three-layer network with proper synchronization.

class SynchronizedInference {
private:
    vk::raii::Device device;
    vk::raii::CommandBuffer cmd;

    // Pipelines for each layer
    vk::raii::Pipeline convPipeline;
    vk::raii::Pipeline reluPipeline;
    vk::raii::Pipeline poolPipeline;

    // Descriptor sets for each layer
    vk::raii::DescriptorSet convDescSet;
    vk::raii::DescriptorSet reluDescSet;
    vk::raii::DescriptorSet poolDescSet;

    vk::raii::PipelineLayout pipelineLayout;

public:
    void runInference(uint32_t width, uint32_t height) {
        // Begin command buffer
        vk::CommandBufferBeginInfo beginInfo{
            .flags = vk::CommandBufferUsageFlagBits::eOneTimeSubmit
        };
        cmd.begin(beginInfo);

        // Layer 1: Convolution
        cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *convPipeline);
        cmd.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                               *pipelineLayout, 0, *convDescSet, nullptr);

        uint32_t groupsX = (width + 15) / 16;
        uint32_t groupsY = (height + 15) / 16;
        cmd.dispatch(groupsX, groupsY, 1);

        // Barrier: Convolution writes must be visible to ReLU reads
        vk::MemoryBarrier barrier{
            .srcAccessMask = vk::AccessFlagBits::eShaderWrite,
            .dstAccessMask = vk::AccessFlagBits::eShaderRead
        };

        cmd.pipelineBarrier(
            vk::PipelineStageFlagBits::eComputeShader,
            vk::PipelineStageFlagBits::eComputeShader,
            {}, barrier, nullptr, nullptr);

        // Layer 2: ReLU activation
        cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *reluPipeline);
        cmd.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                               *pipelineLayout, 0, *reluDescSet, nullptr);
        cmd.dispatch(groupsX, groupsY, 1);

        // Barrier: ReLU writes must be visible to Pooling reads
        cmd.pipelineBarrier(
            vk::PipelineStageFlagBits::eComputeShader,
            vk::PipelineStageFlagBits::eComputeShader,
            {}, barrier, nullptr, nullptr);

        // Layer 3: Max pooling
        cmd.bindPipeline(vk::PipelineBindPoint::eCompute, *poolPipeline);
        cmd.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                               *pipelineLayout, 0, *poolDescSet, nullptr);

        // Pooling reduces dimensions by 2x
        cmd.dispatch(groupsX / 2, groupsY / 2, 1);

        // Final barrier: Ensure pooling completes before reading results
        barrier.srcAccessMask = vk::AccessFlagBits::eShaderWrite;
        barrier.dstAccessMask = vk::AccessFlagBits::eTransferRead;

        cmd.pipelineBarrier(
            vk::PipelineStageFlagBits::eComputeShader,
            vk::PipelineStageFlagBits::eTransfer,
            {}, barrier, nullptr, nullptr);

        cmd.end();

        // Submit and wait
        vk::SubmitInfo submitInfo{
            .commandBufferCount = 1,
            .pCommandBuffers = &*cmd
        };

        vk::raii::Fence fence(device, vk::FenceCreateInfo{});
        // RAII handles cleanup automatically

        queue.submit(submitInfo, *fence);
        auto result = device.waitForFences(*fence, VK_TRUE, UINT64_MAX);
    }
};

This example demonstrates:

* 
Sequential layer execution with barriers between layers

* 
Proper access masks (SHADER_WRITE → SHADER_READ)

* 
Final barrier before reading results (SHADER_WRITE → TRANSFER_READ)

* 
Work group calculation for different layer dimensions

Synchronization is essential for correct ML inference with Vulkan compute. Pipeline barriers enforce execution and memory dependencies, ensuring operations complete in the correct order and writes are visible to subsequent reads.

Key patterns include sequential layers (barrier between each layer), parallel branches (no barrier between branches, barrier before merge), and memory reuse (write-after-read barriers). Optimization involves minimizing barrier count, batching barriers, and avoiding unnecessary synchronization.

Debugging synchronization issues requires validation layers, systematic testing, and tools like RenderDoc. When in doubt, start with conservative synchronization and optimize once correctness is established.

With proper synchronization in place, you can build correct and efficient ML inference pipelines that leverage the GPU’s parallel processing power while maintaining the sequential dependencies inherent in neural networks.

[Previous: Data Management](05_data_management.html) | [Next: Vector Addition Example](07_vector_addition_example.html)
