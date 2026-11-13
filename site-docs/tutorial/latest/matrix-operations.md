# Matrix Operations

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Vulkan_Compute_for_ML/04_matrix_operations.html

## Table of Contents

- [Introduction](#_introduction)
- [Why Matrix Operations Matter](#_why_matrix_operations_matter)
- [Why_Matrix_Operations_Matter](#_why_matrix_operations_matter)
- [Computational Intensity](#_computational_intensity)
- [Memory Access Patterns](#_memory_access_patterns)
- [Memory_Access_Patterns](#_memory_access_patterns)
- [Data Reuse Opportunities](#_data_reuse_opportunities)
- [Data_Reuse_Opportunities](#_data_reuse_opportunities)
- [Matrix-Vector Multiplication](#_matrix_vector_multiplication)
- [Naive Implementation](#_naive_implementation)
- [Performance Analysis](#_performance_analysis)
- [Optimized Implementation with Shared Memory](#_optimized_implementation_with_shared_memory)
- [Optimized_Implementation_with_Shared_Memory](#_optimized_implementation_with_shared_memory)
- [Handling Large Vectors](#_handling_large_vectors)
- [Handling_Large_Vectors](#_handling_large_vectors)
- [Matrix-Matrix Multiplication (GEMM)](#_matrix_matrix_multiplication_gemm)
- [Matrix-Matrix_Multiplication_(GEMM)](#_matrix_matrix_multiplication_gemm)
- [Naive Implementation](#_naive_implementation_2)
- [Tiled Implementation with Shared Memory](#_tiled_implementation_with_shared_memory)
- [Tiled_Implementation_with_Shared_Memory](#_tiled_implementation_with_shared_memory)
- [Performance Analysis](#_performance_analysis_2)
- [Optimizing Tile Size](#_optimizing_tile_size)
- [Optimizing_Tile_Size](#_optimizing_tile_size)
- [Advanced Optimizations](#_advanced_optimizations)
- [Vectorization](#_vectorization)
- [Register Blocking](#_register_blocking)
- [Prefetching](#_prefetching)
- [Dispatching Matrix Operations](#_dispatching_matrix_operations)
- [Dispatching_Matrix_Operations](#_dispatching_matrix_operations)
- [Performance Considerations](#_performance_considerations)
- [Summary](#_summary)

## Content

Matrix operations are the computational workhorses of neural networks. While activation functions get the attention for introducing non-linearity, matrix operations do the heavy lifting. Fully connected layers are matrix-vector multiplications. The core of convolutional layers can be reformulated as matrix multiplications. Attention mechanisms—the foundation of transformers—are built on matrix-matrix multiplications.

Understanding how to implement matrix operations efficiently on the GPU is essential for building a performant inference engine. Unlike element-wise operations, which are memory-bound and embarrassingly parallel, matrix operations have more complex access patterns and opportunities for optimization through data reuse.

This chapter covers implementing matrix-vector multiplication (the foundation of fully connected layers) and matrix-matrix multiplication (GEMM—General Matrix Multiply, used throughout modern architectures). We’ll start with naive implementations to understand the basics, then progress to optimized versions using shared memory and tiling that achieve significantly better performance.

Before diving into implementations, let’s understand why these operations dominate neural network computation and what makes them challenging.

Matrix operations are compute-intensive. A matrix-vector multiplication of an M×N matrix with an N-dimensional vector requires M×N multiply-add operations. For a typical fully connected layer with 4096 inputs and 4096 outputs, that’s 16 million operations.

Matrix-matrix multiplication is even more intensive. Multiplying two N×N matrices requires N³ multiply-add operations. For 1024×1024 matrices, that’s over 1 billion operations. This computational intensity is why GPUs excel at neural networks—they can perform thousands of operations in parallel.

The challenge with matrix operations isn’t just the computation—it’s the memory access patterns. Consider matrix-vector multiplication: each output element requires reading an entire row of the matrix and the entire input vector. If you compute outputs independently, you read the input vector multiple times, wasting memory bandwidth.

Matrix-matrix multiplication has even more complex patterns. The naive implementation reads each element of the input matrices multiple times. Optimized implementations use tiling and shared memory to reuse data, dramatically reducing memory traffic.

Unlike element-wise operations where each input is used once, matrix operations have significant data reuse. In matrix-matrix multiplication, each element of the input matrices is used N times (where N is the matrix dimension). Exploiting this reuse through shared memory is the key to high performance.

Matrix-vector multiplication is the foundation of fully connected (dense) layers. Given a matrix A of size M×N and a vector x of size N, we compute y = A×x, where y is a vector of size M.

Mathematically, each output element is:

y[i] = Σ(j=0 to N-1) A[i][j] * x[j]

Each output element is the dot product of a matrix row with the input vector.

Let’s start with a straightforward implementation where each thread computes one output element:

#version 450

layout(local_size_x = 256) in;

layout(set = 0, binding = 0) readonly buffer MatrixBuffer {
    float matrix[];  // M x N matrix in row-major order
};

layout(set = 0, binding = 1) readonly buffer VectorBuffer {
    float vector[];  // N-dimensional vector
};

layout(set = 0, binding = 2) writeonly buffer OutputBuffer {
    float output[];  // M-dimensional output vector
};

layout(push_constant) uniform PushConstants {
    uint M;  // Number of rows
    uint N;  // Number of columns
} pc;

void main() {
    uint row = gl_GlobalInvocationID.x;

    if (row >= pc.M) {
        return;
    }

    // Compute dot product of matrix row with vector
    float sum = 0.0;
    for (uint col = 0; col 

This implementation is simple and correct. Each thread:

Identifies which output element it’s computing (its row)

Loops over all columns, accumulating the dot product

Writes the result

The memory access pattern is straightforward: each thread reads one row of the matrix sequentially (good for coalescing) and reads the entire input vector (shared across all threads).

The naive implementation has a problem: every thread reads the entire input vector. For M threads, we read the vector M times, even though it’s the same data. This wastes memory bandwidth.

On the positive side, matrix reads are coalesced—threads read consecutive rows, so consecutive threads access consecutive memory locations. This is good for memory efficiency.

The computation itself is efficient—modern GPUs can perform multiply-add operations very quickly. The bottleneck is memory bandwidth, specifically the redundant vector reads.

We can eliminate redundant vector reads by loading the vector into shared memory once per work group:

#version 450

layout(local_size_x = 256) in;

layout(set = 0, binding = 0) readonly buffer MatrixBuffer {
    float matrix[];
};

layout(set = 0, binding = 1) readonly buffer VectorBuffer {
    float vector[];
};

layout(set = 0, binding = 2) writeonly buffer OutputBuffer {
    float output[];
};

layout(push_constant) uniform PushConstants {
    uint M;
    uint N;
} pc;

// Shared memory for the input vector
shared float shared_vector[256];  // Adjust size based on N

void main() {
    uint local_id = gl_LocalInvocationID.x;
    uint row = gl_GlobalInvocationID.x;

    // Cooperatively load vector into shared memory
    // Each thread loads one element (or more if N > 256)
    for (uint i = local_id; i = pc.M) {
        return;
    }

    // Compute dot product using shared memory
    float sum = 0.0;
    for (uint col = 0; col 

Key improvements:

**Cooperative Loading**: All threads in the work group cooperate to load the vector into shared memory. Each thread loads one or more elements, ensuring the entire vector is loaded efficiently.

**Barrier Synchronization**: The `barrier()` ensures all threads have finished loading before any thread starts computing. This prevents race conditions.

**Shared Memory Access**: Threads read from shared memory instead of global memory. Shared memory is much faster—typically 10-100x faster than global memory.

This optimization can improve performance by 2-5x for large vectors, depending on the hardware and vector size.

If the vector is larger than shared memory can hold (e.g., N > 16384), you need to tile the computation:

// Process vector in tiles
const uint TILE_SIZE = 256;

for (uint tile_start = 0; tile_start 

This processes the vector in chunks, keeping memory usage bounded while still benefiting from shared memory.

Matrix-matrix multiplication is more complex but follows similar principles. Given matrices A (M×K) and B (K×N), we compute C = A×B, where C is M×N.

Mathematically:

C[i][j] = Σ(k=0 to K-1) A[i][k] * B[k][j]

Each output element is the dot product of a row from A with a column from B.

The simplest approach: each thread computes one output element:

#version 450

layout(local_size_x = 16, local_size_y = 16) in;

layout(set = 0, binding = 0) readonly buffer MatrixA {
    float A[];  // M x K matrix
};

layout(set = 0, binding = 1) readonly buffer MatrixB {
    float B[];  // K x N matrix
};

layout(set = 0, binding = 2) writeonly buffer MatrixC {
    float C[];  // M x N output matrix
};

layout(push_constant) uniform PushConstants {
    uint M;
    uint K;
    uint N;
} pc;

void main() {
    uint row = gl_GlobalInvocationID.y;
    uint col = gl_GlobalInvocationID.x;

    if (row >= pc.M || col >= pc.N) {
        return;
    }

    float sum = 0.0;
    for (uint k = 0; k 

We use 2D work groups (16×16) because we’re computing a 2D output. Each thread:

Identifies its output position (row, col)

Loops over K, accumulating the dot product

Writes the result

This implementation is correct but inefficient. Each element of A and B is read multiple times from global memory. For large matrices, this wastes enormous memory bandwidth.

The key optimization is tiling: divide the matrices into tiles, load tiles into shared memory, and compute partial results. This exploits data reuse—each tile element is used multiple times while in shared memory.

Here’s the optimized implementation:

#version 450

#define TILE_SIZE 16

layout(local_size_x = TILE_SIZE, local_size_y = TILE_SIZE) in;

layout(set = 0, binding = 0) readonly buffer MatrixA {
    float A[];
};

layout(set = 0, binding = 1) readonly buffer MatrixB {
    float B[];
};

layout(set = 0, binding = 2) writeonly buffer MatrixC {
    float C[];
};

layout(push_constant) uniform PushConstants {
    uint M;
    uint K;
    uint N;
} pc;

// Shared memory for tiles
shared float tile_A[TILE_SIZE][TILE_SIZE];
shared float tile_B[TILE_SIZE][TILE_SIZE];

void main() {
    uint local_row = gl_LocalInvocationID.y;
    uint local_col = gl_LocalInvocationID.x;
    uint global_row = gl_GlobalInvocationID.y;
    uint global_col = gl_GlobalInvocationID.x;

    float sum = 0.0;

    // Loop over tiles
    uint num_tiles = (pc.K + TILE_SIZE - 1) / TILE_SIZE;

    for (uint tile = 0; tile 

This implementation is more complex but much faster. Let’s break down what’s happening:

**Tiling Strategy**: We divide the K dimension into tiles of size TILE_SIZE. For each tile, we load a TILE_SIZE×TILE_SIZE block from A and B into shared memory.

**Cooperative Loading**: All threads in the work group cooperate to load the tiles. Each thread loads one element from A and one from B.

**Compute on Tiles**: Once tiles are loaded, threads compute partial dot products using shared memory. Each element in the tiles is reused TILE_SIZE times.

**Accumulation**: We accumulate partial results across all tiles to get the final output.

**Boundary Handling**: The `if` statements handle cases where matrix dimensions aren’t multiples of TILE_SIZE, padding with zeros.

The tiled implementation dramatically reduces memory traffic. Consider multiplying 1024×1024 matrices:

**Naive**: Each output element requires reading 1024 elements from A and 1024 from B. Total: 1024² × 2 × 1024 = 2 billion reads.

**Tiled (16×16 tiles)**: Each tile is loaded once and reused 16 times. Total reads: approximately 2 × 1024² × 1024 / 16 = 128 million reads.

That’s a 16x reduction in memory traffic! In practice, the speedup is typically 5-10x due to other factors (compute time, memory latency), but it’s still substantial.

The tile size affects performance. Larger tiles mean more data reuse but require more shared memory. Typical tile sizes are 8×8, 16×16, or 32×32.

Factors to consider:

**Shared Memory Limits**: GPUs have limited shared memory per work group (typically 16-64 KB). Two TILE_SIZE×TILE_SIZE tiles of floats require 2 × TILE_SIZE² × 4 bytes. For 32×32 tiles, that’s 8 KB—well within limits.

**Occupancy**: Larger work groups (larger tiles) mean fewer work groups can run concurrently. This can reduce occupancy (the percentage of GPU resources actively used).

**Register Pressure**: Larger tiles might require more registers per thread, also reducing occupancy.

The optimal tile size depends on your GPU architecture. Profile different sizes to find the best for your hardware. For most modern GPUs, 16×16 is a good default.

Beyond basic tiling, several advanced techniques can further improve performance.

Process multiple elements per thread using vector types:

// Load 4 elements at once
vec4 a_vec = vec4(A[index], A[index+1], A[index+2], A[index+3]);
vec4 b_vec = vec4(B[index], B[index+1], B[index+2], B[index+3]);
sum += dot(a_vec, b_vec);

This can improve throughput by 10-30% on some GPUs by better utilizing memory bandwidth and compute units.

Compute multiple output elements per thread to increase arithmetic intensity:

// Each thread computes a 2x2 block of outputs
float sum00 = 0.0, sum01 = 0.0;
float sum10 = 0.0, sum11 = 0.0;

for (uint k = 0; k 

This increases the compute-to-memory ratio, making better use of the GPU’s arithmetic units.

Overlap loading the next tile with computing the current tile:

// Load first tile
load_tile(0);
barrier();

for (uint tile = 0; tile 

This hides memory latency behind computation, improving overall throughput.

Here’s how you dispatch the tiled matrix multiplication from your Vulkan application:

// Assuming matrices are M x K, K x N, producing M x N output
uint32_t M = 1024, K = 1024, N = 1024;
const uint32_t TILE_SIZE = 16;

// Calculate work group counts
uint32_t num_groups_x = (N + TILE_SIZE - 1) / TILE_SIZE;
uint32_t num_groups_y = (M + TILE_SIZE - 1) / TILE_SIZE;

// Update descriptor sets with matrix buffers
// ... (similar to previous examples)

// Record commands
commandBuffer.bindPipeline(vk::PipelineBindPoint::eCompute, *gemmPipeline);
commandBuffer.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                                 *pipelineLayout, 0, *descriptorSet, nullptr);

// Push constants
struct {
    uint32_t M, K, N;
} pushConstants = {M, K, N};

commandBuffer.pushConstants(*pipelineLayout,
                           vk::ShaderStageFlagBits::eCompute, 0, sizeof(pushConstants), &pushConstants);

// Dispatch
commandBuffer.dispatch(num_groups_x, num_groups_y, 1);

The key is calculating the number of work groups based on the output dimensions and tile size.

Matrix operations are complex, and performance depends on many factors:

**Matrix Size**: Small matrices ( 4096×4096) provide better parallelism.

**Memory Layout**: Row-major vs column-major affects access patterns. Ensure your layout matches your access pattern for coalescing.

**Data Types**: Float16 (half precision) can be 2x faster than float32 on GPUs with specialized hardware, with minimal accuracy loss for many models.

**Batch Processing**: Processing multiple matrix multiplications in parallel (batching) improves GPU utilization.

**Specialized Hardware**: Modern GPUs have tensor cores or matrix engines that accelerate matrix multiplication. Using vendor-specific extensions can provide 5-10x speedups.

Matrix operations are the computational core of neural networks. Key takeaways:

**Matrix-vector multiplication** is the foundation of fully connected layers. Optimize it using shared memory to eliminate redundant vector reads.

**Matrix-matrix multiplication** (GEMM) is more complex but follows similar principles. Tiling with shared memory is essential for performance, reducing memory traffic by 10-20x.

**Tile size** affects performance. 16×16 is a good default, but profile different sizes for your hardware.

**Advanced optimizations** like vectorization, register blocking, and prefetching can provide additional speedups but increase complexity.

**Memory layout** and access patterns matter. Ensure coalesced access and consider data reuse opportunities.

With efficient matrix operations implemented, you have the computational foundation for neural network inference. The next chapter covers data management—how to organize and transfer tensor data efficiently.

[Previous: Element-Wise Operations](03_element_wise_operations.html) | [Next: Data Management](05_data_management.html)
