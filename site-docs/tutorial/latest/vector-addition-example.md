# Vector Addition Example

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Vulkan_Compute_for_ML/07_vector_addition_example.html

## Table of Contents

- [Introduction](#_introduction)
- [The Problem](#_the_problem)
- [The Compute Shader](#_the_compute_shader)
- [The_Compute_Shader](#_the_compute_shader)
- [The C++ Implementation](#_the_c_implementation)
- [The_C++_Implementation](#_the_c_implementation)
- [Setup: Vulkan Initialization](#_setup_vulkan_initialization)
- [Setup:_Vulkan_Initialization](#_setup_vulkan_initialization)
- [Creating the Descriptor Set Layout](#_creating_the_descriptor_set_layout)
- [Creating_the_Descriptor_Set_Layout](#_creating_the_descriptor_set_layout)
- [Creating the Pipeline](#_creating_the_pipeline)
- [Creating_the_Pipeline](#_creating_the_pipeline)
- [Creating Buffers](#_creating_buffers)
- [Filling Input Buffers](#_filling_input_buffers)
- [Filling_Input_Buffers](#_filling_input_buffers)
- [Recording the Command Buffer](#_recording_the_command_buffer)
- [Recording_the_Command_Buffer](#_recording_the_command_buffer)
- [Executing the Compute Shader](#_executing_the_compute_shader)
- [Executing_the_Compute_Shader](#_executing_the_compute_shader)
- [Verifying Results](#_verifying_results)
- [Running the Example](#_running_the_example)
- [Running_the_Example](#_running_the_example)
- [Understanding the Flow](#_understanding_the_flow)
- [Understanding_the_Flow](#_understanding_the_flow)
- [Key Takeaways](#_key_takeaways)
- [Extending to ML Operations](#_extending_to_ml_operations)
- [Extending_to_ML_Operations](#_extending_to_ml_operations)
- [Common Pitfalls](#_common_pitfalls)
- [Performance Considerations](#_performance_considerations)
- [Summary](#_summary)

## Content

We’ve covered a lot of theory: compute pipelines, operations, data management, and synchronization. Now it’s time to put it all together with a complete, working example that you can compile, run, and understand from start to finish.

Vector addition might seem trivial—it’s just adding corresponding elements from two arrays. But this simplicity is exactly why it’s the perfect first example. It demonstrates the entire Vulkan compute pipeline without the complexity of actual ML operations obscuring the fundamentals. Once you understand this pattern, scaling to convolutions, matrix multiplications, and full neural networks is straightforward.

This chapter walks through a complete vector addition implementation: Vulkan initialization, buffer allocation, shader creation, command buffer recording, execution, and result verification. By the end, you’ll have a working template you can adapt for any ML operation.

We want to compute: `C[i] = A[i] + B[i]` for all elements in vectors A and B.

For example:

* 
A = [1.0, 2.0, 3.0, 4.0]

* 
B = [5.0, 6.0, 7.0, 8.0]

* 
C = [6.0, 8.0, 10.0, 12.0]

This is embarrassingly parallel—each output element is independent. Element C[0] doesn’t depend on C[1], so we can compute all elements simultaneously on the GPU.

Let’s start with the shader, since it’s the heart of the computation:

#version 450

layout(local_size_x = 256) in;

layout(binding = 0) readonly buffer InputA {
    float data[];
} inputA;

layout(binding = 1) readonly buffer InputB {
    float data[];
} inputB;

layout(binding = 2) writeonly buffer Output {
    float data[];
} output;

layout(push_constant) uniform PushConstants {
    uint elementCount;
} pc;

void main() {
    uint index = gl_GlobalInvocationID.x;

    if (index 

Let’s break this down:

**Work Group Size**: `local_size_x = 256` means each work group has 256 threads. This is a good default for most GPUs—large enough to utilize the hardware well, small enough to not exhaust resources.

**Descriptor Bindings**: Three storage buffers—two inputs (readonly) and one output (writeonly). The readonly/writeonly qualifiers help the compiler optimize.

**Push Constants**: We pass the element count as a push constant. This is more efficient than a uniform buffer for small amounts of data.

**Bounds Checking**: `if (index 

**Global Invocation ID**: `gl_GlobalInvocationID.x` gives each thread a unique index. Thread 0 processes element 0, thread 1 processes element 1, and so on.

Now let’s implement the host-side code. We’ll break it into logical sections.

First, we need basic Vulkan setup. This is standard Vulkan initialization—nothing ML-specific yet.

class VectorAddition {
private:
    vk::raii::Context context;
    vk::raii::Instance instance;
    vk::raii::PhysicalDevice physicalDevice;
    vk::raii::Device device;
    vk::raii::Queue computeQueue;
    uint32_t queueFamilyIndex;

    vk::raii::CommandPool commandPool;
    vk::raii::CommandBuffer commandBuffer;

    vk::raii::DescriptorPool descriptorPool;
    vk::raii::DescriptorSetLayout descriptorSetLayout;
    vk::raii::DescriptorSet descriptorSet;

    vk::raii::PipelineLayout pipelineLayout;
    vk::raii::Pipeline pipeline;

    vk::raii::Buffer bufferA, bufferB, bufferC;
    vk::raii::DeviceMemory memoryA, memoryB, memoryC;

    const uint32_t ELEMENT_COUNT = 1024 * 1024;  // 1M elements

public:
    void initialize() {
        createInstance();
        selectPhysicalDevice();
        createDevice();
        createCommandPool();
        createDescriptorSetLayout();
        createPipeline();
        createBuffers();
        createDescriptorSet();
        createCommandBuffer();
    }

    void run() {
        fillInputBuffers();
        executeCompute();
        verifyResults();
    }

    // RAII handles cleanup automatically - no explicit cleanup needed!
};

The descriptor set layout describes what resources the shader expects:

void createDescriptorSetLayout() {
    std::array bindings{{
        // Binding 0: Input A (readonly)
        {
            .binding = 0,
            .descriptorType = vk::DescriptorType::eStorageBuffer,
            .descriptorCount = 1,
            .stageFlags = vk::ShaderStageFlagBits::eCompute
        },
        // Binding 1: Input B (readonly)
        {
            .binding = 1,
            .descriptorType = vk::DescriptorType::eStorageBuffer,
            .descriptorCount = 1,
            .stageFlags = vk::ShaderStageFlagBits::eCompute
        },
        // Binding 2: Output C (writeonly)
        {
            .binding = 2,
            .descriptorType = vk::DescriptorType::eStorageBuffer,
            .descriptorCount = 1,
            .stageFlags = vk::ShaderStageFlagBits::eCompute
        }
    }};

    vk::DescriptorSetLayoutCreateInfo layoutInfo{
        .bindingCount = static_cast(bindings.size()),
        .pBindings = bindings.data()
    };

    descriptorSetLayout = vk::raii::DescriptorSetLayout(device, layoutInfo);
}

The compute pipeline combines the shader with the descriptor set layout:

void createPipeline() {
    // Load shader (assume we have compiled SPIR-V from slang)
    std::vector shaderCode = loadShaderCode("vector_add.comp.spv");

    vk::ShaderModuleCreateInfo shaderInfo{
        .codeSize = shaderCode.size() * sizeof(uint32_t),
        .pCode = shaderCode.data()
    };

    vk::raii::ShaderModule shaderModule(device, shaderInfo);

    // Push constant range for element count
    vk::PushConstantRange pushConstantRange{
        .stageFlags = vk::ShaderStageFlagBits::eCompute,
        .offset = 0,
        .size = sizeof(uint32_t)
    };

    // Pipeline layout
    vk::PipelineLayoutCreateInfo layoutInfo{
        .setLayoutCount = 1,
        .pSetLayouts = &*descriptorSetLayout,
        .pushConstantRangeCount = 1,
        .pPushConstantRanges = &pushConstantRange
    };

    pipelineLayout = vk::raii::PipelineLayout(device, layoutInfo);

    // Compute pipeline
    vk::PipelineShaderStageCreateInfo stageInfo{
        .stage = vk::ShaderStageFlagBits::eCompute,
        .module = *shaderModule,
        .pName = "main"
    };

    vk::ComputePipelineCreateInfo pipelineInfo{
        .stage = stageInfo,
        .layout = *pipelineLayout
    };

    pipeline = vk::raii::Pipeline(device, nullptr, pipelineInfo);
    // Shader module is automatically cleaned up by RAII
}

We need three buffers: two for input, one for output.

void createBuffers() {
    vk::DeviceSize bufferSize = ELEMENT_COUNT * sizeof(float);

    // Create buffer A
    bufferA = createBuffer(bufferSize,
                           vk::BufferUsageFlagBits::eStorageBuffer | vk::BufferUsageFlagBits::eTransferDst,
                           vk::MemoryPropertyFlagBits::eDeviceLocal,
                           memoryA);

    // Create buffer B
    bufferB = createBuffer(bufferSize,
                           vk::BufferUsageFlagBits::eStorageBuffer | vk::BufferUsageFlagBits::eTransferDst,
                           vk::MemoryPropertyFlagBits::eDeviceLocal,
                           memoryB);

    // Create buffer C
    bufferC = createBuffer(bufferSize,
                           vk::BufferUsageFlagBits::eStorageBuffer | vk::BufferUsageFlagBits::eTransferSrc,
                           vk::MemoryPropertyFlagBits::eDeviceLocal,
                           memoryC);
}

vk::raii::Buffer createBuffer(vk::DeviceSize size, vk::BufferUsageFlags usage,
                               vk::MemoryPropertyFlags properties,
                               vk::raii::DeviceMemory& memory) {
    vk::BufferCreateInfo bufferInfo{
        .size = size,
        .usage = usage,
        .sharingMode = vk::SharingMode::eExclusive
    };

    vk::raii::Buffer buffer(device, bufferInfo);

    auto memReqs = buffer.getMemoryRequirements();

    vk::MemoryAllocateInfo allocInfo{
        .allocationSize = memReqs.size,
        .memoryTypeIndex = findMemoryType(memReqs.memoryTypeBits, properties)
    };

    memory = vk::raii::DeviceMemory(device, allocInfo);
    buffer.bindMemory(*memory, 0);

    return buffer;
}

We need to upload data to the GPU. We’ll use a staging buffer for this:

void fillInputBuffers() {
    vk::DeviceSize bufferSize = ELEMENT_COUNT * sizeof(float);

    // Create staging buffer
    vk::raii::DeviceMemory stagingMemory = nullptr;
    vk::raii::Buffer stagingBuffer = createBuffer(bufferSize,
                                                   vk::BufferUsageFlagBits::eTransferSrc,
                                                   vk::MemoryPropertyFlagBits::eHostVisible |
                                                   vk::MemoryPropertyFlagBits::eHostCoherent,
                                                   stagingMemory);

    // Fill buffer A
    float* data = static_cast(stagingMemory.mapMemory(0, bufferSize));
    for (uint32_t i = 0; i (i);
    }
    stagingMemory.unmapMemory();
    copyBuffer(stagingBuffer, bufferA, bufferSize);

    // Fill buffer B
    data = static_cast(stagingMemory.mapMemory(0, bufferSize));
    for (uint32_t i = 0; i (i * 2);
    }
    stagingMemory.unmapMemory();
    copyBuffer(stagingBuffer, bufferB, bufferSize);

    // RAII handles cleanup automatically
}

void copyBuffer(vk::raii::Buffer& src, vk::raii::Buffer& dst, vk::DeviceSize size) {
    vk::CommandBufferAllocateInfo allocInfo{
        .commandPool = *commandPool,
        .level = vk::CommandBufferLevel::ePrimary,
        .commandBufferCount = 1
    };

    vk::raii::CommandBuffers cmdBuffers(device, allocInfo);
    vk::raii::CommandBuffer& cmdBuffer = cmdBuffers[0];

    vk::CommandBufferBeginInfo beginInfo{
        .flags = vk::CommandBufferUsageFlagBits::eOneTimeSubmit
    };

    cmdBuffer.begin(beginInfo);

    vk::BufferCopy copyRegion{.size = size};
    cmdBuffer.copyBuffer(*src, *dst, copyRegion);

    cmdBuffer.end();

    vk::SubmitInfo submitInfo{
        .commandBufferCount = 1,
        .pCommandBuffers = &*cmdBuffer
    };

    computeQueue.submit(submitInfo);
    computeQueue.waitIdle();

    // Command buffer automatically freed when cmdBuffers goes out of scope
}

Now we record the actual compute work:

void createCommandBuffer() {
    vk::CommandBufferAllocateInfo allocInfo{
        .commandPool = *commandPool,
        .level = vk::CommandBufferLevel::ePrimary,
        .commandBufferCount = 1
    };

    vk::raii::CommandBuffers cmdBuffers(device, allocInfo);
    commandBuffer = std::move(cmdBuffers[0]);

    vk::CommandBufferBeginInfo beginInfo;

    commandBuffer.begin(beginInfo);

    // Bind pipeline
    commandBuffer.bindPipeline(vk::PipelineBindPoint::eCompute, *pipeline);

    // Bind descriptor set
    commandBuffer.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                                     *pipelineLayout, 0, *descriptorSet, nullptr);

    // Push constants (element count)
    commandBuffer.pushConstants(*pipelineLayout,
                                vk::ShaderStageFlagBits::eCompute,
                                0, sizeof(uint32_t), &ELEMENT_COUNT);

    // Dispatch compute work
    // Work groups = ceil(ELEMENT_COUNT / 256)
    uint32_t workGroupCount = (ELEMENT_COUNT + 255) / 256;
    commandBuffer.dispatch(workGroupCount, 1, 1);

    commandBuffer.end();
}

Submit the command buffer and wait for completion:

void executeCompute() {
    vk::SubmitInfo submitInfo{
        .commandBufferCount = 1,
        .pCommandBuffers = &*commandBuffer
    };

    vk::FenceCreateInfo fenceInfo;
    vk::raii::Fence fence(device, fenceInfo);

    computeQueue.submit(submitInfo, *fence);
    auto result = device.waitForFences(*fence, VK_TRUE, UINT64_MAX);

    // Fence automatically cleaned up by RAII
}

Finally, read back the results and verify correctness:

void verifyResults() {
    vk::DeviceSize bufferSize = ELEMENT_COUNT * sizeof(float);

    // Create staging buffer for readback
    vk::raii::DeviceMemory stagingMemory = nullptr;
    vk::raii::Buffer stagingBuffer = createBuffer(bufferSize,
                                                   vk::BufferUsageFlagBits::eTransferDst,
                                                   vk::MemoryPropertyFlagBits::eHostVisible |
                                                   vk::MemoryPropertyFlagBits::eHostCoherent,
                                                   stagingMemory);

    // Copy result from GPU to staging buffer
    copyBuffer(bufferC, stagingBuffer, bufferSize);

    // Map and verify
    float* results = static_cast(stagingMemory.mapMemory(0, bufferSize));

    bool allCorrect = true;
    for (uint32_t i = 0; i (i) + static_cast(i * 2);
        float actual = results[i];

        if (std::abs(expected - actual) > 0.001f) {
            std::cout 

The main function ties everything together:

int main() {
    try {
        VectorAddition app;
        app.initialize();
        app.run();
        // No cleanup needed - RAII handles everything!
        return 0;
    } catch (const std::exception& e) {
        std::cerr 

Let’s trace through what happens when you run this program:

**Initialization Phase**:

Create Vulkan instance and device

Create command pool for allocating command buffers

Create descriptor set layout describing shader resources

Load and compile shader, create compute pipeline

Allocate three buffers on GPU (A, B, C)

Create descriptor set binding buffers to shader bindings

Record command buffer with compute dispatch

**Execution Phase**:

Upload input data (A and B) to GPU via staging buffer

Submit command buffer to compute queue

GPU executes shader: 4096 work groups × 256 threads = 1,048,576 threads

Each thread computes one element: C[i] = A[i] + B[i]

Wait for GPU to finish

Copy results back to CPU via staging buffer

Verify results match expected values

**Cleanup Phase**:

Destroy all Vulkan objects

Free all memory

This example demonstrates several important patterns:

**Staging Buffers**: GPU memory (DEVICE_LOCAL) is fast but not directly accessible from CPU. We use staging buffers (HOST_VISIBLE) to transfer data between CPU and GPU.

**Work Group Calculation**: With 1M elements and 256 threads per work group, we need 4096 work groups. The formula `(elementCount + workGroupSize - 1) / workGroupSize` handles non-multiples correctly.

**Bounds Checking**: The shader checks `if (index 

**Synchronization**: We use `vkQueueWaitIdle()` for simplicity. In production, you’d use fences or semaphores for more efficient synchronization.

**Memory Management**: We allocate separate memory for each buffer. In production, you’d use a memory allocator to sub-allocate from larger blocks.

This pattern scales to any ML operation:

**Element-wise operations** (ReLU, sigmoid): Same structure, just change the shader computation.

**Matrix operations**: Add more dimensions to the dispatch (workGroupsX, workGroupsY), adjust shader to compute matrix indices.

**Convolutions**: More complex shader logic, but same overall structure—bind inputs/weights/outputs, dispatch work groups, synchronize.

The fundamentals remain constant: create buffers, bind them to shaders, dispatch compute work, synchronize, read results. Everything we’ve learned in this chapter applies to implementing full neural network inference.

**Forgetting Bounds Checking**: Always check `if (index 

**Incorrect Work Group Count**: Using `elementCount / 256` instead of `(elementCount + 255) / 256` fails when elementCount isn’t a multiple of 256.

**Missing Synchronization**: Forgetting to wait for compute to complete before reading results leads to reading incomplete or garbage data.

**Wrong Memory Properties**: Using DEVICE_LOCAL memory for staging buffers (can’t map from CPU) or HOST_VISIBLE memory for compute buffers (slower GPU access).

**Descriptor Set Mismatches**: Binding buffers to wrong descriptor bindings causes shaders to read/write wrong data.

This example prioritizes clarity over performance. For production:

**Persistent Buffers**: Reuse buffers across multiple inferences instead of allocating/deallocating each time.

**Async Transfers**: Use a separate transfer queue to overlap data uploads with compute.

**Memory Pooling**: Sub-allocate from large memory blocks instead of individual allocations per buffer.

**Pipeline Caching**: Cache compiled pipelines to disk to avoid recompilation.

**Batch Processing**: Process multiple inputs together to amortize overhead.

This vector addition example demonstrates the complete Vulkan compute pipeline for ML operations. We created buffers, loaded a shader, recorded commands, executed on GPU, and verified results. The pattern is simple but powerful—it’s the foundation for implementing any ML operation.

The key insight: ML inference is just dispatching compute shaders with proper data management and synchronization. Vector addition uses this pattern. Matrix multiplication uses this pattern. Convolutions use this pattern. Full neural networks are just many of these patterns chained together.

With this working example as a template, you’re ready to implement more complex ML operations. The fundamentals remain the same—only the shader logic and buffer layouts change.

[Previous: Synchronization](06_synchronization.html) | [Next: Models and Data](../Building_the_Inference_Engine/05_model_formats_as_input.html)
