# Managing Concurrent Frames: Rebuilding the Main Loop

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Frame_in_Flight/02_managing_concurrent_frames.html

## Table of Contents

- [The Goal: Overlap Without Chaos](#_the_goal_overlap_without_chaos)
- [The_Goal:_Overlap_Without_Chaos](#_the_goal_overlap_without_chaos)
- [A Practical Structure](#_a_practical_structure)
- [A_Practical_Structure](#_a_practical_structure)
- [The Main Loop With Timeline Gating](#_the_main_loop_with_timeline_gating)
- [The_Main_Loop_With_Timeline_Gating](#_the_main_loop_with_timeline_gating)
- [CPU Throttle Without Fences](#_cpu_throttle_without_fences)
- [CPU_Throttle_Without_Fences](#_cpu_throttle_without_fences)
- [How to implement this in Simple Engine](#_how_to_implement_this_in_simple_engine)
- [How_to_implement_this_in_Simple_Engine](#_how_to_implement_this_in_simple_engine)
- [Navigation](#_navigation)

## Content

The purpose of a frame-in-flight system is simple: keep the GPU busy while the CPU prepares future frames. The trick is doing that without corrupting data or introducing unbounded latency. With timeline semaphores, we can express this cleanly using a single, monotonic value that represents "frame N is complete."

We’ll use a ring of per-frame data (command buffers, descriptor sets, transient buffers). Each frame has an associated timeline value that marks when it’s safe to reuse those resources.

struct FrameContext {
    vk::raii::CommandPool   pool{nullptr};
    vk::raii::CommandBuffer cmd{nullptr};
    vk::raii::Fence         fence{nullptr}; // optional if you only use timeline waits on CPU
    uint64_t                retireValue = 0; // timeline value when this frame finishes
};

std::array frames;

vk::raii::Semaphore timeline = createTimelineSemaphore(device, /*initial=*/0);
uint64_t nextSubmitValue = 1; // monotonically increasing

On each frame, choose the next `FrameContext` in the ring. Before you touch any of its resources, make sure the global timeline has advanced beyond the value at which those resources were last used.

FrameContext& fc = frames[currentFrameIndex];

// Wait until GPU has reached the value when this frame's resources were last retired
if (fc.retireValue != 0) {
    auto waitInfo = vk::SemaphoreWaitInfo{
        .semaphoreCount = 1,
        .pSemaphores    = &(*timeline),
        .pValues        = &fc.retireValue
    };
    device.waitSemaphores(waitInfo, /*timeoutNs=*/UINT64_C(1'000'000'000)); // 1s timeout
}

// Record & submit this frame
recordCommands(fc.cmd /*, ... */);

// Define the value that represents "this frame complete"
const uint64_t frameComplete = nextSubmitValue++;

vk::SemaphoreSubmitInfo signalInfo{
    .semaphore = *timeline,
    .value     = frameComplete,
    .stageMask = vk::PipelineStageFlagBits2::eAllCommands
};

vk::CommandBufferSubmitInfo cmdInfo{ .commandBuffer = *fc.cmd };

vk::SubmitInfo2 submit{
    .commandBufferInfoCount  = 1,
    .pCommandBufferInfos     = &cmdInfo,
    .signalSemaphoreInfoCount= 1,
    .pSignalSemaphoreInfos   = &signalInfo
};

graphicsQueue.submit2(submit);

// Tag this frame's resources with the value at which they're safe to reuse
fc.retireValue = frameComplete;

To limit latency (e.g., only 2–3 frames in flight), wait for the value that corresponds to "the oldest in-flight frame has finished" before starting a new one. No per-frame fences necessary.

const uint64_t minAllowedValue = frameCompleteValueFor(currentFrameIndex - (MaxFramesInFlight - 1));
if (minAllowedValue) {
    auto waitInfo = vk::SemaphoreWaitInfo{
        .semaphoreCount = 1,
        .pSemaphores    = &(*timeline),
        .pValues        = &minAllowedValue
    };
    device.waitSemaphores(waitInfo, UINT64_MAX);
}

This approach centralizes flow control around a single, debuggable counter. In the next section, we’ll use the same counter to make precise, low-overhead decisions about resource destruction and reuse.

To implement this in `Simple Engine`, we will refactor the `Renderer::Render` method. Currently, it relies on `inFlightFences[currentFrame]` to stall the CPU. We will replace this with a single `Renderer::frameTimeline` semaphore.

The new logic will look like this:

**Calculate Retire Value**: Instead of `waitForFences`, we will calculate the `retireValue` for the current frame slot. This is simply the timeline value assigned to this slot the last time it was submitted (e.g., `frameTimelineValue[currentFrame]`).

**Wait on Timeline**: We’ll call `device.waitSemaphores` to wait for that `retireValue`. This ensures the GPU is finished with the resources (command buffers, descriptor sets) associated with this frame slot.

**Submit with Signal**: When we call `queue.submit2`, we’ll include a `vk::SemaphoreSubmitInfo` that signals our `frameTimeline` with a new, incremented value.

**Update Frame Slot**: We’ll store this new signal value in `frameTimelineValue[currentFrame]` so we can wait for it the next time this slot comes around in the ring.

This refactor will allow us to remove the `inFlightFences` array entirely, simplifying our resource management and making it easier to integrate other asynchronous systems into the same "Master Clock."

Previous: [Introduction](01_introduction.html) | Next: [Resource Lifetimes](03_resource_lifetimes.html)
