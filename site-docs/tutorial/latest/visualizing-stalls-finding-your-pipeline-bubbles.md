# Visualizing Stalls: Finding Your Pipeline Bubbles

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Profiling_Optimization/03_visualizing_stalls.html

## Table of Contents

- [Hardware Profilers](#_hardware_profilers)
- [Identifying the Cause](#_identifying_the_cause)
- [Identifying_the_Cause](#_identifying_the_cause)
- [Practical Refinement](#_practical_refinement)
- [Closing the Series](#_closing_the_series)
- [Closing_the_Series](#_closing_the_series)
- [Navigation](#_navigation)

## Content

The most effective way to optimize your synchronization code is to see what the GPU is actually doing. We use hardware profilers like **NVIDIA Nsight Graphics** or **AMD Radeon GPU Profiler** to visualize the pipeline.

In these tools, you can see a "Timeline" view that shows exactly when each part of the GPU (graphics cores, compute cores, transfer engine) is busy. A **Pipeline Bubble** is a gap in this timeline—a period where the hardware is idle because it’s waiting for a dependency that hasn’t been reached.

When you find a bubble, you must determine its cause. Is it a real dependency (e.g., the lighting pass waiting for the G-Buffer to finish)? Or is it an artificial stall caused by a too-conservative barrier?

A common mistake is using `vk::PipelineStageFlagBits2::eAllCommands` for every barrier. This tells the GPU: "Stop everything until all previous commands have finished." This is a massive "sledgehammer" that can create huge bubbles. Instead, you should always use the most specific stage mask possible (e.g., `eColorAttachmentOutput`).

To refine your masks, follow this process:

**Spot the Bubble**: Find a gap in the timeline in your profiler.

**Identify the Dependency**: Look at the barrier that precedes the gap.

**Refine the Stage Mask**: Check if the dependency can be satisfied by an earlier stage. For example, can your shadow pass start as soon as the vertex work of the previous frame is done?

**Verify the Fix**: Re-run the profiler and check if the bubble has shrunk or disappeared.

Congratulations! You’ve successfully navigated the complex and powerful world of **Synchronization 2**, **Timeline Semaphores**, and **Asynchronous Overlap**. You’ve built a renderer that is modern, validated, and optimized.

Synchronization is one of the most challenging parts of Vulkan, but it’s also where you have the most power to differentiate your engine’s performance. By applying the principles we’ve learned in this series—using the most specific stage masks, batching your barriers, and visualizing your stalls—you can build a professional-grade renderer that squeezes every last drop of performance out of the hardware.

Keep profiling, keep refining, and keep building!

Previous: [Barrier Batching](02_barrier_batching.html) | Next: [Back to Introduction](../introduction.html)
