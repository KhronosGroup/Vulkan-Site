# The XR Lifecycle

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/05_Predictive_Frame_Loop/02_xr_lifecycle.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Temporal Paradox: Rendering the Future](#_the_temporal_paradox_rendering_the_future)
- [The_Temporal_Paradox:_Rendering_the_Future](#_the_temporal_paradox_rendering_the_future)
- [1. xrWaitFrame: The Pacing Heartbeat](#_1_xrwaitframe_the_pacing_heartbeat)
- [1._xrWaitFrame:_The_Pacing_Heartbeat](#_1_xrwaitframe_the_pacing_heartbeat)
- [2. xrBeginFrame: Opening the Window](#_2_xrbeginframe_opening_the_window)
- [2._xrBeginFrame:_Opening_the_Window](#_2_xrbeginframe_opening_the_window)
- [3. xrEndFrame: Submitting to the Compositor](#_3_xrendframe_submitting_to_the_compositor)
- [3._xrEndFrame:_Submitting_to_the_Compositor](#_3_xrendframe_submitting_to_the_compositor)
- [Advanced: Sub-Frame Workloads and Latency Monitoring](#_advanced_sub_frame_workloads_and_latency_monitoring)
- [Advanced:_Sub-Frame_Workloads_and_Latency_Monitoring](#_advanced_sub_frame_workloads_and_latency_monitoring)
- [The Engine Loop Summary](#_the_engine_loop_summary)
- [The_Engine_Loop_Summary](#_the_engine_loop_summary)

## Content

Transitioning our engine’s main loop to the OpenXR lifecycle involves three primary functions: `xrWaitFrame`, `xrBeginFrame`, and `xrEndFrame`. These functions act as the "heartbeat" of our spatial application, replacing the standard unthrottled loop or legacy `glfwPollEvents` based pacing.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Synchronizing your engine’s main loop with the OpenXR lifecycle is mandatory for photons-to-motion alignment. You must use the predicted display time provided by the runtime to ensure a smooth, stable experience.

To understand the XR lifecycle, you must first accept a fundamental truth: **You are always rendering a future that hasn’t happened yet.**

In a desktop game, you render what is happening "now." In XR, because of the time it takes to record commands, submit them to the GPU, and actually light up the pixels on the display, "now" is already in the past by the time the user sees it. If we rendered the "current" head pose, the world would appear to "swim" or lag behind the user’s head movements.

The XR lifecycle is designed to solve this by providing a **Predicted Display Time**.

The `xrWaitFrame` function is our engine’s primary synchronization point. When we call this, the runtime may block our execution to keep us synced with the headset’s refresh rate (e.g., 90Hz).

// Sync with the runtime heartbeat and retrieve the predicted display time
XrFrameState frameState{XR_TYPE_FRAME_STATE};
XrFrameWaitInfo frameWaitInfo{
    .type = XR_TYPE_FRAME_WAIT_INFO
};
xrWaitFrame(xrSession, &frameWaitInfo, &frameState);

* 
**Prediction**: The `frameState` contains the `predictedDisplayTime`. This is the exact nanosecond when the pixels we are about to render will actually be shown on the headset’s display.

* 
**Should We Render?**: `frameState.shouldRender` tells us if the runtime actually wants a frame. If the headset is off or the user is in a system menu, we might still "wait" but skip the "render" work to save power.

Once the wait is satisfied, we call `xrBeginFrame`. This signals the start of our frame’s GPU work.

XrFrameBeginInfo frameBeginInfo{
    .type = XR_TYPE_FRAME_BEGIN_INFO
};
xrBeginFrame(xrSession, &frameBeginInfo);

It is important to keep the time between `xrWaitFrame` and `xrBeginFrame` as short as possible, as this is when we perform our simulation updates and view predictions.

The final step is `xrEndFrame`, the spatial counterpart to `vkQueuePresentKHR`.

XrFrameEndInfo frameEndInfo{
    .type = XR_TYPE_FRAME_END_INFO,
    .displayTime = frameState.predictedDisplayTime,
    .environmentBlendMode = chosenBlendMode,
    .layerCount = 1,
    .layers = &layerPtr
};
xrEndFrame(xrSession, &frameEndInfo);

Instead of just "presenting" a single image, `xrEndFrame` takes an array of **Composition Layers**. The runtime’s compositor will stack these together at the very last microsecond, and can even perform **Late-Stage Reprojection (LSR)** to "tweak" your final image if the user’s head moved after you finished rendering.

While OpenXR handles the frame pacing, Vulkan allows you to implement more granular control:

* 
**Coordinating Sub-Frame Workloads**: You can use Vulkan’s **Timeline Semaphores** to implement workloads that run asynchronously from the main XR lifecycle. For example, you can kick off a complex visibility or light-baking compute pass before calling `xrWaitFrame`, ensuring the GPU is busy while the CPU waits for the heartbeat.

* 
**Predicting GPU-side Latency**: The runtime provides the display time, but you can use Vulkan **Query Pools** to measure your own GPU-side latency. This data allows you to dynamically adjust your engine’s internal prediction offset, providing a tighter alignment than generic runtime prediction.

Our engine’s main loop now follows this precise rhythm:

**Poll Events**: Check for system messages (like "Headset Connected").

**Wait**: Sync with the runtime heartbeat and get the future `displayTime`.

**Begin**: Start the frame work.

**Render**: Use the future time to predict poses, record Vulkan commands, and submit them.

**End**: Hand the finished (or queued) layers back to the runtime for display.

|  | For more details, consult the official [OpenXR Specification](https://registry.khronos.org/OpenXR/specs/1.1/html/xpspec.html#xrWaitFrame), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_display_time_prediction.html)
