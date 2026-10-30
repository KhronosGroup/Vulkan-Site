# Late Latching Implementation

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/06_Late_Latching/03_implementation.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The "Last-Second" View Prediction](#_the_last_second_view_prediction)
- [The_"Last-Second"_View_Prediction](#_the_last_second_view_prediction)
- [Persistent Mapping: The Efficiency Requirement](#_persistent_mapping_the_efficiency_requirement)
- [Persistent_Mapping:_The_Efficiency_Requirement](#_persistent_mapping_the_efficiency_requirement)
- [The Coherency Question: vkFlushMappedMemoryRanges](#_the_coherency_question_vkflushmappedmemoryranges)
- [The_Coherency_Question:_vkFlushMappedMemoryRanges](#_the_coherency_question_vkflushmappedmemoryranges)
- [Advanced: Speculative Rendering and Transfer Queues](#_advanced_speculative_rendering_and_transfer_queues)
- [Advanced:_Speculative_Rendering_and_Transfer_Queues](#_advanced_speculative_rendering_and_transfer_queues)
- [Limitations of Late Latching](#_limitations_of_late_latching)
- [Limitations_of_Late_Latching](#_limitations_of_late_latching)

## Content

The efficiency of late latching depends on the final moments before the CPU signals the GPU. In our engine, we use persistently mapped memory and timeline semaphores to ensure the lowest possible latency.

This chapter falls under the category: **Beyond the OpenXR Standard**.

While OpenXR provides the poses, the specific low-latency synchronization technique of "Late Latching" is implemented using Vulkan’s core synchronization features. This is a powerful optimization that you implement with Vulkan to achieve better results than a standard integration.

The magic of late latching happens in the final moments before the CPU gives the GPU the "go ahead." In our engine’s main loop, we call `xrLocateSpace` using the `predictedDisplayTime` to get the absolute latest head pose.

// 1. Get the absolute latest head pose from OpenXR
XrSpaceLocation spaceLocation{
    .type = XR_TYPE_SPACE_LOCATION
};
xrLocateSpace(viewSpace, baseSpace, predictedDisplayTime, &spaceLocation);

if (spaceLocation.locationFlags & XR_SPACE_LOCATION_ORIENTATION_VALID_BIT) {
    // 2. Convert to matrix and update persistently mapped memory
    auto latestViewMatrix = convertXrPoseToMatrix(spaceLocation.pose);
    std::memcpy(mappedUboPointer, &latestViewMatrix, sizeof(latestViewMatrix));

    // 3. Flush if memory is not host-coherent using designated initializers
    vk::MappedMemoryRange flushRange{
        .memory = *uboBufferMemory,
        .offset = 0,
        .size = sizeof(latestViewMatrix)
    };
    device.flushMappedMemoryRanges(flushRange);
}

// 4. Signal the timeline semaphore to unblock the GPU
vk::SemaphoreSignalInfo signalInfo{
    .semaphore = *lateLatchingSemaphore,
    .value = nextValue
};
device.signalSemaphore(signalInfo);

For late latching to work, we cannot afford the overhead of calling `vkMapMemory` and `vkUnmapMemory` every frame. We map the Vulkan buffer once during initialization and keep the CPU-side pointer available for the lifetime of the application. This allows us to use the raw performance of a direct `memcpy` during our time-critical update window.

While you are updating the memory, the runtime is refreshing its internal sensor fusion model (sampling IMUs at 1000Hz or higher) to provide the most accurate extrapolation for the predicted display time.

On some hardware (especially discrete desktop GPUs), the CPU and GPU have separate caches. Even if we `memcpy` the data, the GPU might still see the "stale" version in its cache.

If our memory heap doesn’t have the `VK_MEMORY_PROPERTY_HOST_COHERENT_BIT` flag, we must call `vkFlushMappedMemoryRanges`. This forces the CPU cache to write the data out to physical VRAM where the GPU can see it.

Vulkan allows us to push the boundaries of late-stage updates:

* 
**Speculative Rendering**: You can use Vulkan to record multiple small "potential" command buffers for different predicted poses and use a timeline semaphore to select the correct one at the last moment—ensuring zero-latency alignment even if the CPU update is slightly delayed.

* 
**Asynchronous Transfer Queues**: Late latching is strictly for tiny data like transformation matrices. If you need to update larger datasets (like animation bone transforms), you can use Vulkan’s **Asynchronous Transfer Queues** to stream this data in parallel with your rendering work, bypassing the single-threaded bottlenecks of the OpenXR main loop.

This technique is most effective for "fast-moving" data like the head pose or hand tracking data.

* 
**Data Size**: Keep your late-latched updates small (usually just a few matrices).

* 
**Timing**: If the update takes too long, the GPU will idle while waiting for the semaphore, which can reduce your overall framerate.

|  | For more information on memory mapping and persistent buffers, consult the official [Vulkan Specification](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#memory-device-hostaccess), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](02_last_second_update.html) | [Next](04_incorporating_into_the_engine.html)
