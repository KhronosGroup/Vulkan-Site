# Timeline Semaphores: Unified Synchronization

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/08_Asynchronous_Compute/03_timeline_semaphores.html

## Table of Contents

- [The Power of a Single Value](#_the_power_of_a_single_value)
- [The_Power_of_a_Single_Value](#_the_power_of_a_single_value)
- [Wait-Before-Signal (The Host Side)](#_wait_before_signal_the_host_side)
- [Wait-Before-Signal_(The_Host_Side)](#_wait_before_signal_the_host_side)
- [Host Querying and Waiting](#_host_querying_and_waiting)
- [Host_Querying_and_Waiting](#_host_querying_and_waiting)
- [Why it matters for Async Compute](#_why_it_matters_for_async_compute)
- [Why_it_matters_for_Async_Compute](#_why_it_matters_for_async_compute)

## Content

While binary semaphores (the classic `VkSemaphore`) are useful for simple "wait/signal" relationships between queues, they quickly become a management nightmare in complex asynchronous pipelines. Each binary semaphore can only be signaled once before it must be waited on and reset, leading to a proliferation of semaphore objects that are difficult to track.

This is why **Timeline Semaphores** (introduced in Vulkan 1.2 and via `VK_KHR_timeline_semaphore`) are a game-changer for asynchronous compute. Instead of a simple boolean "on/off" state, a timeline semaphore contains a monotonically increasing **64-bit integer value**.

With a timeline semaphore, you don’t just wait for a semaphore to be signaled; you wait for it to reach a **specific value**. This allows you to represent an entire timeline of work with a single object. For example:

* 
**Value 10**: Physics simulation finished.

* 
**Value 11**: Denoising pass finished.

* 
**Value 12**: Frame ready for UI composition.

Different queues can signal the same semaphore with different values, and other queues can wait for exactly the level of progress they need.

One of the most powerful features of timeline semaphores is that you can submit a command buffer that waits for a value that **hasn’t been reached yet**. In fact, the signal operation doesn’t even have to be submitted to the GPU when the wait is submitted.

This allows the CPU to build complex dependency graphs and submit them all at once to different queues. The GPU hardware will handle the stalls and wake-ups automatically as the counter increments.

// Defining a wait for a specific timeline value
vk::TimelineSemaphoreSubmitInfo timelineInfo {
    .waitSemaphoreValueCount = 1,
    .pWaitSemaphoreValues = &requiredValue,
    .signalSemaphoreValueCount = 1,
    .pSignalSemaphoreValues = &newValue
};

vk::SubmitInfo submitInfo {
    .pNext = &timelineInfo,
    .waitSemaphoreCount = 1,
    .pWaitSemaphores = &*timelineSemaphore // Extract handle from vk::raii::Semaphore
};
// ...

Timeline semaphores also bridge the gap between the GPU and the CPU. The CPU can query the current value of a semaphore at any time using `vkGetSemaphoreCounterValue`. Even better, the CPU can block until a semaphore reaches a certain value using `vkWaitSemaphores`.

This replaces the need for `VkFence` in many scenarios. Instead of waiting for an entire command buffer to finish (which is what a fence does), the CPU can wait for a specific point in the GPU’s timeline. This is incredibly useful for **pipelined resource management**—for example, the CPU can wait for the GPU to reach value `N`, knowing that it’s now safe to reuse a buffer that was used by the command that signaled value `N`.

In an asynchronous compute setup, you often have multiple streams of work with cross-dependencies. For instance, your physics engine (Compute Queue) might produce data needed by the particle system (Graphics Queue), which in turn produces data needed by the denoiser (Compute Queue).

Using binary semaphores for this would require a complex web of "Signal A → Wait A → Signal B → Wait B". With timeline semaphores, you simply have a single "Engine Timeline". Every task signals its completion by incrementing the counter, and every dependent task waits for its specific prerequisite value. This drastically simplifies the orchestration logic and reduces the overhead of semaphore management.

[Previous: Concurrent Execution](02_concurrent_execution.html) | [Next: Queue Priority](04_queue_priority.html)
