# Shared Memory (LDS): High-Speed Data Exchange

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/03_Memory_Models/03_shared_memory_lds.html

## Table of Contents

- [Why Shared Memory?](#_why_shared_memory)
- [Why_Shared_Memory?](#_why_shared_memory)
- [Using Shared Memory in Slang](#_using_shared_memory_in_slang)
- [Using_Shared_Memory_in_Slang](#_using_shared_memory_in_slang)
- [Breaking Down the Cryptic Name](#_breaking_down_the_cryptic_name)
- [Breaking_Down_the_Cryptic_Name](#_breaking_down_the_cryptic_name)
- [GLSL: shared and barrier()](#_glsl_shared_and_barrier)
- [GLSL:_shared_and_barrier()](#_glsl_shared_and_barrier)
- [Bank Conflicts: The Speed Trap](#_bank_conflicts_the_speed_trap)
- [Bank_Conflicts:_The_Speed_Trap](#_bank_conflicts_the_speed_trap)
- [Lifecycle and Scope](#_lifecycle_and_scope)
- [Lifecycle_and_Scope](#_lifecycle_and_scope)

## Content

The GPU’s main memory (VRAM) is large but relatively slow. For many compute tasks, fetching data from VRAM is the primary bottleneck. To solve this, GPUs provide a small, ultra-fast memory that is local to each workgroup.

In Vulkan, this is called **Shared Memory**. On physical hardware, it is often referred to as **LDS (Local Data Store)** or **Scratchpad Memory** (a fast, temporary memory for local data).

Shared memory is your most powerful tool for optimizing memory-bound kernels. It is typically used for:

* 
**Manual Caching**: Reading a block of data from VRAM once, storing it in shared memory, and then having all threads in the workgroup read from that fast local copy multiple times.

* 
**Data Exchange**: Passing data between threads in the same workgroup (e.g., for calculating a **prefix sum**—where each element is the sum of all previous elements—or a **reduction**).

* 
**Workgroup-Level Reductions**: Finding the maximum or minimum value in a large dataset by first reducing it (combining multiple values into one) within each workgroup.

In Slang (and HLSL), you declare shared memory using the `groupshared` keyword. Because it is physically local to a Compute Unit, it is shared by all threads in a workgroup but is invisible to other workgroups.

groupshared float sharedData[256];

[numthreads(256, 1, 1)]
void main(uint3 tid : SV_GroupThreadID) {
    // Each thread initializes its own slot in shared memory
    sharedData[tid.x] = someBuffer[tid.x];

    // CRITICAL: We must wait for all threads to finish writing AND make those writes visible!
    // GroupMemoryBarrier: Ensures all previous memory writes are complete and visible.
    // WithGroupSync: Acts as an execution barrier, waiting for all threads in the group to arrive.
    GroupMemoryBarrierWithGroupSync();

    // Now it is safe to read data written by our neighbors
    float neighborValue = sharedData[(tid.x + 1) % 256];
}

The function `GroupMemoryBarrierWithGroupSync()` might seem like a mouthful, but its name tells you exactly what it’s doing across two different types of synchronization:

**GroupMemoryBarrier**: This is a **Memory Barrier**. It ensures that any writes a thread has made to `groupshared` memory are "pushed" out and made visible to all other threads in the workgroup. Without this, a neighbor might read an old or uninitialized value from your slot in shared memory.

**WithGroupSync**: This is an **Execution Barrier**. It forces every thread in the workgroup to stop and wait at this exact line. No thread can proceed to the next instruction until **every** thread in the group has reached this point.

By combining them, you guarantee that when a thread moves past this line, all its neighbors have finished their work and their data is ready to be read.

In GLSL, you use the `shared` keyword to declare your workgroup-local memory. The synchronization is handled by the `barrier()` function, which acts as both an execution barrier and a memory barrier for `shared` memory.

shared float sharedData[256];

layout(local_size_x = 256) in;
void main() {
    uint tid = gl_LocalInvocationID.x;

    // Each thread initializes its own slot in shared memory
    sharedData[tid] = someBuffer[tid];

    // Wait for all threads to reach this point and make memory visible
    barrier();

    // Now it is safe to read
    float neighborValue = sharedData[(tid + 1) % 256];
}

The main difference here is Slang’s `GroupMemoryBarrierWithGroupSync()`, which is a more descriptive name for the common pattern of combining a memory barrier with an execution sync.

Shared memory is organized into **Banks** (parallel memory modules, typically 32 banks). Each bank can handle one request per clock cycle. If your threads access memory in a way that maps to different banks, the operation is performed in parallel at full speed.

However, if two or more threads in a bundle (subgroup) try to access different addresses that fall within the **same bank**, you get a **Bank Conflict**. The hardware must then serialize these requests, which can double or triple the execution time of that instruction.

// NO CONFLICT (Fast)
Thread 0 -> Bank 0
Thread 1 -> Bank 1
Thread 2 -> Bank 2

// BANK CONFLICT (Slow)
Thread 0 -> Bank 0 (Address 0)
Thread 1 -> Bank 0 (Address 32)

To avoid bank conflicts, aim for linear access patterns where `thread_id` matches `index`. Using a **stride** of 1 (accessing elements one after another) is usually the safest way to ensure full speed.

Shared memory is only valid for the lifetime of a single workgroup. When the workgroup completes, its shared memory is discarded.

Crucially, **shared memory is not coherent between workgroups**. If you need to send data from Workgroup A to Workgroup B, you must write it back to global VRAM and use a proper Vulkan memory barrier as described in the previous section.

In the next section, we’ll see how to balance these barriers to keep your pipeline as full as possible.

[Previous: The Vulkan Memory Model](02_vulkan_memory_model.html) | [Next: Memory Consistency](04_memory_consistency.html)
