# The Bubble Problem: Finding and Fixing Stalls

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Async_Compute_Overlap/04_bubble_problem.html

## Table of Contents

- [Identifying the Bubble](#_identifying_the_bubble)
- [Identifying_the_Bubble](#_identifying_the_bubble)
- [Common Causes of Bubbles](#_common_causes_of_bubbles)
- [Common_Causes_of_Bubbles](#_common_causes_of_bubbles)
- [Fixing the Stall](#_fixing_the_stall)
- [Fixing_the_Stall](#_fixing_the_stall)
- [Navigation](#_navigation)

## Content

A "bubble" in the GPU timeline is a period where some units are idle because they are waiting for a dependency to be satisfied. These can be hard to find just by looking at your code. You might **think** you’ve enabled overlap, but if your stage masks are too broad, the GPU might still be stalling.

To find these, we use hardware profilers like **NVIDIA Nsight Graphics**, **AMD Radeon GPU Profiler**, or even the **LunarG Synchronization Validation** layer. In a profiler, a bubble looks like a gap in the timeline where the Graphics or Compute rows are empty while the other is busy.

![Simplified diagram of the Vulkan pipeline used to illustrate where bubbles can occur](../../_images/images/vulkan_simplified_pipeline.svg)

**Overly Conservative Stage Masks**: If you use `vk::PipelineStageFlagBits2::eAllCommands` for every barrier, the GPU will flush everything and wait for it to be idle before starting the next task. This is the most common cause of bubbles. Always use the most specific stage mask possible.

**Sequential Submission**: Even if you have two queues, if your CPU code waits for one to finish before submitting to the other, you’ve created a bubble on the CPU side. Use the **Wait-Before-Signal** pattern and multiple submission threads where appropriate.

**Dependency Chains**: A chain of small dependencies can sometimes be more expensive than one slightly broader barrier. If you have five compute passes that all wait for each other, each one introduces a small stall. Sometimes batching these into a single compute submission is better.

Once you’ve found a bubble, the fix is usually to refine your `vk::DependencyInfo`.

* 
**Refine Stage Masks**: Check if you can move your `srcStageMask` later in the pipeline or your `dstStageMask` earlier. For example, can your compute work start as soon as `eVertexShader` is done, instead of waiting for `eFragmentShader`?

* 
**Use Memory Barriers Wisely**: Sometimes a global memory barrier is better than several image barriers if it allows more work to start sooner.

* 
**Increase Concurrency**: If your profiler shows that the compute units are under-utilized, can you move more work (like occlusion culling) from graphics to compute?

By systematically finding and eliminating these bubbles, you move from a renderer that "just works" to one that is truly professional-grade. In the next chapter, we’ll see how these same principles apply to one of the most common background tasks in modern games: asset streaming.

Previous: [Async Post-Processing](03_async_post_processing.html) | Next: [Transfer Queues & Asset Streaming Sync](../Transfer_Queues_Streaming/01_introduction.html)
