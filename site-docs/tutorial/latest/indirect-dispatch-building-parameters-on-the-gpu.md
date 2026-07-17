# Indirect Dispatch: Building Parameters on the GPU

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/07_GPU_Driven_Pipelines/02_indirect_dispatch.html

## Table of Contents

- [The Core of GPU Autonomy](#_the_core_of_gpu_autonomy)
- [The_Core_of_GPU_Autonomy](#_the_core_of_gpu_autonomy)
- [How It Works](#_how_it_works)
- [How_It_Works](#_how_it_works)
- [Writing the Indirect Command from a Shader](#_writing_the_indirect_command_from_a_shader)
- [Writing_the_Indirect_Command_from_a_Shader](#_writing_the_indirect_command_from_a_shader)
- [GLSL: Manual Buffer Layout](#_glsl_manual_buffer_layout)
- [GLSL:_Manual_Buffer_Layout](#_glsl_manual_buffer_layout)
- [Synchronization is Key](#_synchronization_is_key)
- [Synchronization_is_Key](#_synchronization_is_key)
- [Practical Example: Variable-Sized Workloads](#_practical_example_variable_sized_workloads)
- [Practical_Example:_Variable-Sized_Workloads](#_practical_example_variable_sized_workloads)

## Content

In a traditional compute pipeline, the CPU calls `vkCmdDispatch(x, y, z)`. The values of `x, y, z` are fixed at the moment the command buffer is recorded.

But what if the number of workgroups you need depends on the result of a previous compute shader? For example, if you’re culling a list of objects, only the GPU knows how many survived.

**Indirect Dispatch** (`vkCmdDispatchIndirect`) solves this by reading the workgroup counts from a **Vulkan Buffer** (a `VkBuffer`) instead of the command buffer.

**Preparation**: Create a buffer with the `VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT`.

**GPU Update**: Run a "culling" or "analysis" compute shader. This shader calculates the number of workgroups needed for the next step and writes that value into the indirect buffer.

**The Dispatch**: The CPU records a call to `vkCmdDispatchIndirect(myIndirectBuffer, offset)`.

// The layout of the data in the indirect buffer (matching vk::DispatchIndirectCommand)
struct IndirectCommand {
    uint32_t x;
    uint32_t y;
    uint32_t z;
};

To use this, your compute shader (the "producer") must write to a buffer that matches the `VkDispatchIndirectCommand` layout.

// Slang example: Writing the dispatch counts
struct IndirectCommand {
    uint3 x;
};

[[vk::binding(0, 0)]]
RWStructuredBuffer cmdBuffer;

[numthreads(1, 1, 1)]
void main() {
    uint numWorkgroups = calculateRequiredWorkgroups();
    cmdBuffer[0].x = uint3(numWorkgroups, 1, 1);
}

In GLSL, you define a `buffer` block that matches the expected structure. It’s crucial to use the correct alignment (`std430`) to ensure the GPU reads the values at the correct offsets.

layout(std430, binding = 0) buffer IndirectBuffer {
    uint x;
    uint y;
    uint z;
} cmd;

void main() {
    uint numWorkgroups = calculateRequiredWorkgroups();
    cmd.x = numWorkgroups;
    cmd.y = 1;
    cmd.z = 1;
}

The "win" here is that by using the same buffer in your `vkCmdDispatchIndirect` call, the GPU can autonomously determine its own workload size without any CPU intervention.

Because the GPU is writing to the buffer that it will later read from, you must ensure that the write has finished and is **visible** to the indirect dispatch hardware.

This requires a **Vulkan Barrier** with the following settings:

* 
`srcStage`: `VK_PIPELINE_STAGE_COMPUTE_SHADER_BIT`

* 
`dstStage`: `VK_PIPELINE_STAGE_DRAW_INDIRECT_BIT`

* 
`srcAccess`: `VK_ACCESS_SHADER_WRITE_BIT`

* 
`dstAccess`: `VK_ACCESS_INDIRECT_COMMAND_READ_BIT`

Failure to include this barrier will result in the GPU reading "garbage" or stale data, leading to incorrect dispatches or even device crashes.

Imagine you have a particle system where particles can die or be born every frame.

**Dispatch 1 (Cull)**: A compute shader iterates over all particles, calculates which ones are alive, and stores their IDs in a "live" buffer. It also increments an atomic counter.

**Barrier**: Wait for the cull to finish and make the counter visible to the indirect hardware.

**Dispatch 2 (Update)**: Call `vkCmdDispatchIndirect`. The GPU reads the counter and dispatches exactly enough workgroups to update only the alive particles.

This approach is much more efficient than always dispatching for the "maximum" number of particles, which would result in thousands of idle threads.

In the next section, we’ll look at how the GPU can go beyond just changing its dispatch size and start generating its own **Command Chains**.

[Previous: Introduction to GPU-Driven Pipelines](01_introduction.html) | [Next: GPU-Side Command Generation](03_gpu_side_command_generation.html)
