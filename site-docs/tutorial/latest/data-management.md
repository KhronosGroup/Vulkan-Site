# Data Management

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Vulkan_Compute_for_ML/05_data_management.html

## Table of Contents

- [Introduction](#_introduction)
- [Tensor Layouts: How Data Is Organized](#_tensor_layouts_how_data_is_organized)
- [Tensor_Layouts:_How_Data_Is_Organized](#_tensor_layouts_how_data_is_organized)
- [Understanding Dimensions](#_understanding_dimensions)
- [NCHW vs NHWC Layout](#_nchw_vs_nhwc_layout)
- [NCHW_vs_NHWC_Layout](#_nchw_vs_nhwc_layout)
- [Which Layout to Use?](#_which_layout_to_use)
- [Which_Layout_to_Use?](#_which_layout_to_use)
- [Index Calculation](#_index_calculation)
- [Layout Conversion](#_layout_conversion)
- [Memory Allocation Strategies](#_memory_allocation_strategies)
- [Memory_Allocation_Strategies](#_memory_allocation_strategies)
- [Static vs Dynamic Allocation](#_static_vs_dynamic_allocation)
- [Static_vs_Dynamic_Allocation](#_static_vs_dynamic_allocation)
- [Memory Pools](#_memory_pools)
- [Memory Reuse](#_memory_reuse)
- [Alignment Requirements](#_alignment_requirements)
- [Data Transfer Optimization](#_data_transfer_optimization)
- [Data_Transfer_Optimization](#_data_transfer_optimization)
- [Staging Buffers](#_staging_buffers)
- [Persistent Staging Buffers](#_persistent_staging_buffers)
- [Persistent_Staging_Buffers](#_persistent_staging_buffers)
- [Asynchronous Transfers](#_asynchronous_transfers)
- [Minimizing Transfers](#_minimizing_transfers)
- [Practical Example: Managing ResNet-50 Memory](#_practical_example_managing_resnet_50_memory)
- [Practical_Example:_Managing_ResNet-50_Memory](#_practical_example_managing_resnet_50_memory)
- [Model Analysis](#_model_analysis)
- [Memory Setup](#_memory_setup)
- [Tensor Offsets](#_tensor_offsets)
- [Summary](#_summary)

## Content

Neural network inference involves moving large amounts of data: input tensors, weights, intermediate activations, and outputs. A typical ResNet-50 model has 25 million parameters (100 MB of weights) and processes images through dozens of layers, each producing intermediate results. Managing this data efficiently—how you organize it in memory, when you allocate and free it, how you transfer it between CPU and GPU—directly impacts performance.

Poor data management can bottleneck even the most optimized compute shaders. If your shaders are fast but you’re constantly waiting for data transfers or running out of memory, overall performance suffers. This chapter covers the practical aspects of managing tensor data in Vulkan: memory layouts, allocation strategies, memory reuse, and transfer optimization.

Tensors are multi-dimensional arrays, but GPU memory is linear (one-dimensional). We need a mapping from multi-dimensional indices to linear memory addresses. The choice of mapping—the tensor layout—affects memory access patterns and performance.

Neural network tensors typically have 4 dimensions for image data:

* 
**N (Batch)**: Number of images processed together

* 
**C (Channels)**: Number of feature maps (3 for RGB input, 64/128/256/etc. for intermediate layers)

* 
**H (Height)**: Spatial dimension

* 
**W (Width)**: Spatial dimension

For a batch of 8 RGB images of size 224×224, the tensor shape is [8, 3, 224, 224], containing 8 × 3 × 224 × 224 = 1,204,224 elements.

The two most common layouts differ in how dimensions are ordered in memory:

**NCHW (Channels First)**: Dimensions ordered as [Batch, Channels, Height, Width]. All values for channel 0 come first, then all values for channel 1, etc.

Memory layout for a 2×2 image with 3 channels:

[N0_C0_H0_W0, N0_C0_H0_W1, N0_C0_H1_W0, N0_C0_H1_W1,  // Channel 0
 N0_C1_H0_W0, N0_C1_H0_W1, N0_C1_H1_W0, N0_C1_H1_W1,  // Channel 1
 N0_C2_H0_W0, N0_C2_H0_W1, N0_C2_H1_W0, N0_C2_H1_W1]  // Channel 2

**NHWC (Channels Last)**: Dimensions ordered as [Batch, Height, Width, Channels]. All channels for one pixel come together.

Memory layout for the same image:

[N0_H0_W0_C0, N0_H0_W0_C1, N0_H0_W0_C2,  // Pixel (0,0)
 N0_H0_W1_C0, N0_H0_W1_C1, N0_H0_W1_C2,  // Pixel (0,1)
 N0_H1_W0_C0, N0_H1_W0_C1, N0_H1_W0_C2,  // Pixel (1,0)
 N0_H1_W1_C0, N0_H1_W1_C1, N0_H1_W1_C2]  // Pixel (1,1)

The choice depends on your operations:

**NCHW advantages**:

* 
Better for operations that process entire channels (batch normalization, channel-wise operations)

* 
Historically preferred by many ML frameworks and high-performance computing APIs

* 
Can enable better vectorization for channel-wise operations

**NHWC advantages**:

* 
Better for convolutions on some hardware (especially mobile GPUs and tensor cores)

* 
More cache-friendly for spatial operations

* 
Matches image formats (pixels with RGB values together)

Modern GPUs often perform better with NHWC for convolutions, but NCHW for other operations. The optimal choice is hardware-dependent. Profile both on your target GPU.

To access element [n, c, h, w] in a linear buffer:

**NCHW**:

index = n * (C * H * W) + c * (H * W) + h * W + w

**NHWC**:

index = n * (H * W * C) + h * (W * C) + w * C + c

In Slang:

// NCHW layout
uint get_index_nchw(uint n, uint c, uint h, uint w, uint C, uint H, uint W) {
    return n * (C * H * W) + c * (H * W) + h * W + w;
}

// NHWC layout
uint get_index_nhwc(uint n, uint h, uint w, uint c, uint H, uint W, uint C) {
    return n * (H * W * C) + h * (W * C) + w * C + c;
}

Sometimes you need to convert between layouts. This requires reading the entire tensor in one layout and writing it in another:

#version 450

layout(local_size_x = 16, local_size_y = 16) in;

layout(set = 0, binding = 0) readonly buffer InputNCHW {
    float input_nchw[];
};

layout(set = 0, binding = 1) writeonly buffer OutputNHWC {
    float output_nhwc[];
};

layout(push_constant) uniform PushConstants {
    uint N, C, H, W;
} pc;

void main() {
    uint h = gl_GlobalInvocationID.y;
    uint w = gl_GlobalInvocationID.x;

    if (h >= pc.H || w >= pc.W) return;

    for (uint n = 0; n 

Layout conversion is expensive (requires reading and writing the entire tensor), so minimize conversions. Choose one layout and stick with it throughout your pipeline when possible.

Neural networks require allocating memory for weights, inputs, outputs, and intermediate activations. How you manage these allocations affects both performance and memory usage.

**Static Allocation**: Allocate all memory upfront based on the model architecture. You know the size of every tensor before inference starts.

Advantages:

* 
No allocation overhead during inference

* 
Predictable memory usage

* 
Can optimize memory layout for the entire model

Disadvantages:

* 
Requires knowing all tensor sizes in advance

* 
Can’t handle dynamic shapes (variable batch sizes, variable-length sequences)

**Dynamic Allocation**: Allocate memory as needed during inference.

Advantages:

* 
Handles dynamic shapes

* 
Can adapt to available memory

Disadvantages:

* 
Allocation overhead during inference

* 
Potential fragmentation

* 
Harder to optimize

For most inference scenarios, static allocation is preferred. You know the model architecture and typical input sizes, so allocate everything upfront.

Instead of allocating a separate buffer for each tensor, use memory pools: large buffers that multiple tensors share.

class MemoryPool {
    vk::raii::Buffer buffer;
    vk::raii::DeviceMemory memory;
    size_t totalSize;
    size_t usedSize;

public:
    struct Allocation {
        size_t offset;
        size_t size;
    };

    Allocation allocate(size_t size, size_t alignment) {
        // Align offset
        size_t alignedOffset = (usedSize + alignment - 1) & ~(alignment - 1);

        if (alignedOffset + size > totalSize) {
            throw std::runtime_error("Pool exhausted");
        }

        Allocation alloc = {alignedOffset, size};
        usedSize = alignedOffset + size;
        return alloc;
    }

    void reset() {
        usedSize = 0;  // Reuse the entire pool
    }
    // RAII handles cleanup automatically
};

Benefits:
- Fewer Vulkan allocations (which have overhead)
- Better memory locality
- Easier to manage memory limits

The key optimization: reuse memory for intermediate tensors that don’t overlap in lifetime.

Consider this network fragment:

Layer 1: Input → Tensor A
Layer 2: Tensor A → Tensor B
Layer 3: Tensor B → Tensor C
Layer 4: Tensor C → Output

Once Layer 2 finishes, Tensor A is no longer needed. Tensor C can reuse A’s memory. Similarly, once Layer 4 starts, Tensor B is no longer needed.

Memory reuse algorithm:
1. Analyze the model graph to determine each tensor’s lifetime (first use to last use)
2. Find tensors whose lifetimes don’t overlap
3. Assign non-overlapping tensors to the same memory

struct Tensor {
    size_t size;
    int firstUse;  // Layer index
    int lastUse;   // Layer index
    size_t memoryOffset;  // Assigned offset in pool
};

void assignMemory(std::vector& tensors, MemoryPool& pool) {
    // Sort by first use
    std::sort(tensors.begin(), tensors.end(),
              [](const Tensor& a, const Tensor& b) { return a.firstUse > freeOffsets;

    for (auto& tensor : tensors) {
        // Try to reuse freed memory
        bool reused = false;
        for (auto& [layer, offsets] : freeOffsets) {
            if (layer 

This can reduce memory usage by 5-10x for deep networks.

Vulkan has alignment requirements for buffer offsets. Typically:

* 
Storage buffers: 256-byte alignment (check `minStorageBufferOffsetAlignment`)

* 
Uniform buffers: 256-byte alignment (check `minUniformBufferOffsetAlignment`)

Always align allocations:

size_t alignedSize = (size + alignment - 1) & ~(alignment - 1);

Misaligned accesses can cause crashes or undefined behavior.

Transferring data between CPU and GPU is expensive. Minimize transfers and make necessary transfers as efficient as possible.

For host-to-device transfers, use staging buffers:

Allocate a host-visible buffer (staging buffer)

Map it and write data from CPU

Copy from staging buffer to device-local buffer via `vkCmdCopyBuffer`

Use device-local buffer in compute shaders

// Create staging buffer (host-visible)
vk::BufferCreateInfo stagingInfo{
    .size = dataSize,
    .usage = vk::BufferUsageFlagBits::eTransferSrc
};
vk::raii::Buffer stagingBuffer(device, stagingInfo);

vk::MemoryAllocateInfo allocInfo{
    .allocationSize = memRequirements.size,
    .memoryTypeIndex = findMemoryType(
        vk::MemoryPropertyFlagBits::eHostVisible | vk::MemoryPropertyFlagBits::eHostCoherent)
};
vk::raii::DeviceMemory stagingMemory(device, allocInfo);
stagingBuffer.bindMemory(*stagingMemory, 0);

// Map and write data
void* mapped = stagingMemory.mapMemory(0, dataSize);
memcpy(mapped, data, dataSize);
stagingMemory.unmapMemory();

// Copy to device-local buffer
vk::BufferCopy copyRegion{0, 0, dataSize};
commandBuffer.copyBuffer(*stagingBuffer, *deviceBuffer, copyRegion);
// RAII handles cleanup automatically

Device-local memory is much faster for GPU access than host-visible memory, so this two-step process is worth it for data that’s accessed frequently.

For data transferred every frame (like input images), keep staging buffers allocated and reuse them:

class PersistentStaging {
    vk::raii::Buffer stagingBuffer;
    vk::raii::DeviceMemory stagingMemory;
    void* mapped;  // Keep mapped

public:
    void initialize(const vk::raii::Device& device, size_t size) {
        // Create and map staging buffer
        // ... (as above)
        mapped = stagingMemory.mapMemory(0, size);
        // Keep mapped for the lifetime of the buffer
    }

    void upload(const void* data, size_t size) {
        memcpy(mapped, data, size);
        // No need to unmap/remap
    }
    // RAII handles cleanup automatically
};

This eliminates map/unmap overhead for frequent transfers.

Use a separate transfer queue for data uploads, overlapping transfers with compute:

// Frame N: Compute on GPU
computeQueue.dispatch(...);

// Frame N+1: Transfer input while Frame N computes
commandBuffer.copyBuffer(*stagingBuffer, *deviceBuffer, ...);

// Synchronize: wait for transfer before starting Frame N+1 compute
vk::raii::Semaphore transferComplete(device, vk::SemaphoreCreateInfo{});
transferQueue.submit(..., *transferComplete);
computeQueue.submit(..., waitSemaphore=*transferComplete);

This hides transfer latency behind computation.

The best transfer is no transfer:

**Keep weights on GPU**: Upload weights once at initialization, not every frame.

**Batch processing**: Process multiple inputs together to amortize transfer overhead.

**Ping-pong buffers**: For streaming data, use two buffers. While GPU processes buffer A, CPU fills buffer B.

Let’s walk through memory management for ResNet-50 inference:

ResNet-50 has:

* 
25 million parameters (100 MB)

* 
~50 layers

* 
Peak activation memory: ~200 MB (without reuse)

* 
With reuse: ~20 MB

class ResNet50Memory {
    // Weights (persistent)
    vk::raii::Buffer weightsBuffer;
    vk::raii::DeviceMemory weightsMemory;

    // Activation pool (reused across layers)
    vk::raii::Buffer activationBuffer;
    vk::raii::DeviceMemory activationMemory;

    // Staging for input
    vk::raii::Buffer inputStagingBuffer;
    vk::raii::DeviceMemory inputStagingMemory;
    void* inputMapped;

public:
    void initialize(const vk::raii::Device& device) {
        // Allocate weights (100 MB, device-local)
        createBuffer(device, 100 * 1024 * 1024,
                     vk::BufferUsageFlagBits::eStorageBuffer,
                     vk::MemoryPropertyFlagBits::eDeviceLocal,
                     weightsBuffer, weightsMemory);

        // Allocate activation pool (20 MB with reuse, device-local)
        createBuffer(device, 20 * 1024 * 1024,
                     vk::BufferUsageFlagBits::eStorageBuffer,
                     vk::MemoryPropertyFlagBits::eDeviceLocal,
                     activationBuffer, activationMemory);

        // Allocate input staging (224*224*3*4 bytes = ~600 KB, host-visible)
        createBuffer(device, 224 * 224 * 3 * sizeof(float),
                     vk::BufferUsageFlagBits::eTransferSrc,
                     vk::MemoryPropertyFlagBits::eHostVisible |
                     vk::MemoryPropertyFlagBits::eHostCoherent,
                     inputStagingBuffer, inputStagingMemory);

        inputMapped = inputStagingMemory.mapMemory(0, VK_WHOLE_SIZE);
    }

    void uploadInput(const float* imageData, size_t size) {
        memcpy(inputMapped, imageData, size);
    }

    const vk::raii::Buffer& getWeightsBuffer() { return weightsBuffer; }
    const vk::raii::Buffer& getActivationBuffer() { return activationBuffer; }
    // RAII handles cleanup automatically
};

Each layer’s tensors are assigned offsets in the activation buffer:

struct LayerTensors {
    size_t inputOffset;
    size_t outputOffset;
    size_t weightsOffset;
};

std::vector layerTensors(50);

// Assign offsets (simplified)
size_t activationOffset = 0;
size_t weightsOffset = 0;

for (int i = 0; i  2) {
        activationOffset = layerTensors[i-2].inputOffset;  // Reuse old input
    } else {
        activationOffset += layerInputSizes[i] + layerOutputSizes[i];
    }
}

This assigns memory offsets with reuse, keeping total memory low.

Effective data management is crucial for neural network inference performance:

**Tensor layouts** (NCHW vs NHWC) affect memory access patterns. Choose based on your operations and hardware.

**Memory allocation** should be static when possible, using memory pools for efficiency.

**Memory reuse** dramatically reduces memory requirements by sharing memory between non-overlapping tensors.

**Data transfers** should be minimized and optimized using staging buffers, persistent mappings, and asynchronous transfers.

**Alignment** requirements must be respected to avoid crashes and undefined behavior.

With efficient data management, you ensure your compute shaders have the data they need when they need it, without wasting memory or bandwidth. The next chapter covers synchronization—ensuring operations execute in the correct order.

[Previous: Matrix Operations](04_matrix_operations.html) | [Next: Synchronization](06_synchronization.html)
