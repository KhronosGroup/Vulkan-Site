# Multi-threaded recording with multiple render passes

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/performance/multithreading_render_passes/README.html

## Table of Contents

- [Overview](#_overview)
- [Using multiple render passes](#_using_multiple_render_passes)
- [Using_multiple_render_passes](#_using_multiple_render_passes)
- [The Multi-threading Render Passes Sample](#_the_multi_threading_render_passes_sample)
- [The_Multi-threading_Render_Passes_Sample](#_the_multi_threading_render_passes_sample)
- [Profiling](#_profiling)
- [Further reading](#_further_reading)
- [Best practice summary](#_best_practice_summary)
- [Best_practice_summary](#_best_practice_summary)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/performance/multithreading_render_passes). |
| --- | --- |

Ideally you render all stages of your frame in a single render pass.
However, in some cases different stages can’t be performed in the same render pass.
This sample shows how multi-threading can help to boost performance when using multiple render passes to render a single frame.

This sample uses two render passes to implement a technique called shadowmapping.

The first render pass is used to render a shadowmap.
It contains only depth values and represents the scene as viewed from the light position.

The second pass renders the actual scene from the camera point of view and uses the shadowmap from the previous pass.
When the light calculation is performed in the fragment shader, the depth value from the shadow map is used to determine whether the fragment is occluded from the light (and therefore is in shadow) or not.

The diagram below shows this two step process:

![Render Passes Diagram](../../../_images/samples/performance/multithreading_render_passes/images/render_passes_diagram.png)

Note that there is a dependency because the second pass is using the output of the first.
Since these are two separate render passes we cannot use a `VkSubpassDependency` for synchronization.
Instead `VkImageMemoryBarrier` is used.

If we have two or more render passes we can record them separately in different threads.

Note that the more similar is the workload for all the passes, the more performance improvement you can get by splitting the work between multiple threads.
In this sample the same scene is rendered once in each render pass but from different viewpoints and with different complexity of commands recording (shadow pass requires less descriptor and resources setup for each frame).
That means the workloads are not fully equal, but it is still worth delegating part of the work to another thread, and the increase in performance is noticeable.

One way to use multi-threading with multiple render passes is to create a separate primary level command buffer for each of them.
In this case command buffers can be recorded independently and then submitted to the queue all at once using `vkQueueSubmit`.

Another approach is to use secondary level command buffers.
First, both of the passes are recorded into two separate secondary command buffers using two threads.
Then, we can just reference them in the primary command buffer via `vkCmdExecuteCommands`.

When using both of these methods for multi-threading, general recommendations should still be taken into account (see [Multi-threaded-recording](https://github.com/KhronosGroup/Vulkan-Samples/blob/main/samples/performance/command_buffer_usage/README.adoc#Multi-threaded-recording)).

This sample shows the difference between recording both render passes into a single command buffer in one thread and using the methods described above.

Below are screenshots of the sample running on a phone with a Mali G72 GPU:

|  | Since the time of writing this tutorial, the CPU counter provider, HWCPipe, has been updated and it no longer provides CPU cycles. These may still be measured using external tools, as shown later. |
| --- | --- |

![Single Thread](../../../_images/samples/performance/multithreading_render_passes/images/no_multi_threading.png)

Using two threads gives a 10ms frame time improvement and CPU cycles show an increase in CPU utilization:

![Primary Command Buffers](../../../_images/samples/performance/multithreading_render_passes/images/primary_command_buffers.png)

With secondary command buffers you can see a further drop in frame time.

![Secondary Command Buffers](../../../_images/samples/performance/multithreading_render_passes/images/secondary_command_buffers.png)

A profiling tool, such as Android Profiler, can help to see how threads are utilized.
Flame Chart shows how much time was spent for each function execution during a particular timeframe.
In this particular example total contribution of command buffers recording in the main thread is 9.94 seconds within a 10 seconds capture with multi-threading disabled.

![Profiler Capture No Multithreading](../../../_images/samples/performance/multithreading_render_passes/images/android_studio_capture_no_multithreading.png) *Multithreading is disabled*

With multi-threading enabled it remains almost the same (9.92s), but in the second thread 5.7s was spent for shadow pass recording.

![Profiler Capture Secondary Command Buffers](../../../_images/samples/performance/multithreading_render_passes/images/android_studio_capture_secondary_buffers.png) *Multithreading is enabled and the timeline shows how both threads are used*

That means, two threads perform the same amount of work in 10s as one thread in more than 15.7 seconds and we should expect approximately 1.57 times better performance.

And indeed, in debug build, which was used for profiling, frame time is decreased from 531.1ms to 337.7ms using multi-threading (1.57 times decrease).

[Command buffer usage and multi-threaded recording](../command_buffer_usage/README.html)

**Do**

* 
Use multi-threading for command buffer recording if possible.

* 
Spread the workload between threads as equally, as possible, to utilize them in the most efficient way.

**Impact**

* 
You can get a significant impact on frametime for a large scene with complex drawing commands recording.

**Debugging**

* 
Measure CPU time or overall time for each frame and compare results of using single and multiple threads.
