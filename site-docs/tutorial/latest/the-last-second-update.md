# The Last-Second Update

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/06_Late_Latching/02_last_second_update.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [Gating the Pipeline: The Wait-Before-Submit Pattern](#_gating_the_pipeline_the_wait_before_submit_pattern)
- [Gating_the_Pipeline:_The_Wait-Before-Submit_Pattern](#_gating_the_pipeline_the_wait_before_submit_pattern)
- [Stage Mask Selection: Where to Wait?](#_stage_mask_selection_where_to_wait)
- [Stage_Mask_Selection:_Where_to_Wait?](#_stage_mask_selection_where_to_wait)
- [Advanced: Real-Time Scheduling and Uniform Updates](#_advanced_real_time_scheduling_and_uniform_updates)
- [Advanced:_Real-Time_Scheduling_and_Uniform_Updates](#_advanced_real_time_scheduling_and_uniform_updates)
- [Why This Kills "Swim"](#_why_this_kills_swim)
- [Why_This_Kills_"Swim"](#_why_this_kills_swim)

## Content

To implement late latching, we need a mechanism that allows the GPU to sit in a "ready state" for as long as possible. In Vulkan 1.3, the combination of **Timeline Semaphores** and **Synchronization 2** provides the perfect toolset.

This chapter falls under the category: **Beyond the OpenXR Standard**.

While OpenXR provides the poses, the specific low-latency synchronization technique of "Late Latching" is implemented using Vulkan’s core synchronization features. This is a powerful optimization that you implement with Vulkan to achieve better results than a standard integration.

Think of a timeline semaphore as a **Digital Gate**. In a "Late Latching" loop, we change the standard order of operations to minimize the time between pose sampling and pixel display:

**CPU Records Commands**: We record our entire command buffer using a placeholder matrix or "stale" data from the start of the frame.

**CPU Submits Work**: We submit the command buffer to the GPU using `vkQueueSubmit2`.

**GPU Waits**: We tell the GPU to **WAIT** at the very beginning of the pipeline (usually the Vertex Shader stage) until a specific timeline semaphore reaches a target value.

**CPU Polls**: While the GPU is sitting at the gate, the CPU is free to keep polling OpenXR for the absolute latest head pose.

**The Signal**: Only at the last possible microsecond, the CPU updates the matrix in memory and **Signals** the semaphore. The GPU gate opens, and the draw calls begin with the freshest possible data.

// Configure the timeline semaphore wait info using designated initializers
vk::TimelineSemaphoreSubmitInfo timelineSubmitInfo{
    .waitSemaphoreValueCount = 1,
    .pWaitSemaphoreValues = &nextValue
};

// Define the semaphore wait at the Vertex Shader stage
vk::SemaphoreSubmitInfo waitSemaphoreInfo{
    .pNext = &timelineSubmitInfo,
    .semaphore = *lateLatchingSemaphore,
    .value = nextValue,
    .stageMask = vk::PipelineStageFlagBits2::eVertexShader
};

// Submit the command buffer
vk::SubmitInfo2 submitInfo{
    .waitSemaphoreInfoCount = 1,
    .pWaitSemaphoreInfos = &waitSemaphoreInfo,
    .commandBufferInfoCount = 1,
    .pCommandBufferInfos = &commandBufferInfo
};

// The GPU will now stall at the vertex shader until the CPU signals the semaphore
queue.submit2(submitInfo);

A critical performance decision is **where** the GPU should wait. In `vk::SemaphoreSubmitInfo`, we specify a `stageMask`.

* 
**Top of Pipe**: If we wait here, the GPU does nothing.

* 
**Vertex Shader**: If we wait here, the GPU can still perform "Top of Pipe" work like command parsing or index fetching. It only stalls when it needs the actual vertex data.

* 
**Fragment Shader**: This is usually too late for late latching, as the geometry has already been rasterized based on the vertex positions.

By waiting at the **Vertex Shader** stage, we maximize hardware utilization while ensuring our projection and view matrices are as fresh as the hardware allows.

Vulkan allows us to implement level of late-binding that the OpenXR standard does not natively facilitate:

* 
**Late-Binding Uniform Updates**: Using Vulkan’s **External Host Memory** and **Coherent Mapping**, you can map the buffer containing your transformation matrices directly to CPU-visible memory. This enables the CPU to update the head pose even after the command buffer has been submitted.

* 
**High-Priority Queues**: While the runtime’s compositor is high priority, your application typically is not. You can use Vulkan’s **Priority Queues** to request a "High Priority" graphics queue for your late-latching work, ensuring your updates are never preempted by lower-priority background tasks.

"Swim" is the nauseating effect where virtual objects seem to float or slide slightly when you move your head. It happens because of the **Latency Gap**—the time between when your engine sampled the head pose and when the pixels were actually shown.

By using the wait-before-submit pattern, we reduce that gap from ~10-15ms down to ~1-2ms. The virtual world feels "anchored" to the physical space because the view matrices being used by the GPU were updated only microseconds before the first vertex was processed.

|  | For more details on synchronization, consult the official [Vulkan Specification](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#synchronization), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_implementation.html)
