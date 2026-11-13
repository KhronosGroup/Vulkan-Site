# Resource Lifetimes: Safe Reuse Without deviceWaitIdle()

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Frame_in_Flight/03_resource_lifetimes.html

## Table of Contents

- [Tagging and Reclamation](#_tagging_and_reclamation)
- [Tagging_and_Reclamation](#_tagging_and_reclamation)
- [Integrating With Submissions](#_integrating_with_submissions)
- [Integrating_With_Submissions](#_integrating_with_submissions)
- [Simple Engine: Garbage Collection](#_simple_engine_garbage_collection)
- [Simple_Engine:_Garbage_Collection](#_simple_engine_garbage_collection)
- [Pitfalls and Best Practices](#_pitfalls_and_best_practices)
- [Pitfalls_and_Best_Practices](#_pitfalls_and_best_practices)
- [Navigation](#_navigation)

## Content

One of the biggest challenges in Vulkan is knowing when it’s safe to reuse or destroy a resource. With timeline semaphores, we treat destruction and reuse as a function of the global counter: a resource becomes eligible for reclamation when the counter exceeds the value at which it was last used.

We maintain a small allocator or freelist for transient resources (command buffers, staging buffers, descriptor sets). Each allocation is tagged with a `retireValue`.

struct TrackedResource {
    ResourceHandle handle{}; // your wrapper around vk objects
    uint64_t       retireValue = 0; // timeline value when last submitted use completes
};

void destroyWhenSafe(TrackedResource res) {
    deferredDeletes.push_back(res);
}

void gc(vk::raii::Device const& device, vk::raii::Semaphore const& timeline) {
    const uint64_t now = device.getSemaphoreCounterValue(*timeline);
    auto it = std::remove_if(deferredDeletes.begin(), deferredDeletes.end(), [&](TrackedResource const& r){
        if (now >= r.retireValue) { destroy(r.handle); return true; }
        return false;
    });
    deferredDeletes.erase(it, deferredDeletes.end());
}

Whenever you submit work that references a resource, tag it with the same value you signal on the timeline for that submission.

const uint64_t submissionValue = nextSubmitValue++;
submitCommands(cmd, /*signals*/ submissionValue);

TrackedResource tex = createTexture(/*...*/);
tex.retireValue = submissionValue; // safe to reuse/destroy once reached

This pattern scales to complex graphs. You can attach `retireValue`s to entire resource sets created for a frame, or to individual allocations in sub-systems like upload managers.

In `Simple Engine`, we currently handle deferred resource destruction using a simple "frames since destroy" counter in our `pendingASDeletions` queue (found in `renderer_rendering.cpp`). This system waits for a fixed number of frames (`MAX_FRAMES_IN_FLIGHT + 1`) before deleting an acceleration structure. While safe, it is imprecise and can lead to resources staying in memory longer than necessary if the GPU is running fast.

By moving to a timeline-based **Garbage Collection (GC)** system, we can be much more efficient. We will tag each `pendingASDeletion` (and any other transient resource, like our staging buffers) with the exact `frameTimelineValue` at which it was last used. Our `Renderer::ProcessDeferredDeletions` function will then query the current `frameTimeline` value. If the GPU has already reached or passed the tagged value, we can delete the resource immediately. This ensures that memory is reclaimed as soon as the GPU is done with it, regardless of the current frame rate or CPU/GPU load.

* 
Don’t leak values: keep `nextSubmitValue` monotonic but bounded in meaning (e.g., encode frame and pass indices) to aid debugging.

* 
Batch deletions in `gc()` to avoid per-frame spikes.

* 
Avoid mixing fences and timeline for the same lifetime decision to prevent contradictory states.

* 
For external queues/devices (e.g., interop), convert their completion signals into your timeline domain where possible.

Previous: [Managing Concurrent Frames](02_managing_concurrent_frames.html) | Next: [Asynchronous Compute & Execution Overlap - Introduction](../Async_Compute_Overlap/01_introduction.html)
