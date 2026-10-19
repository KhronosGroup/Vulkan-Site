# Non-Blocking Data Uploads: Utilizing the Dedicated Transfer Queue

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Transfer_Queues_Streaming/02_non_blocking_uploads.html

## Table of Contents

- [Why Use a Dedicated Queue?](#_why_use_a_dedicated_queue)
- [Why_Use_a_Dedicated_Queue?](#_why_use_a_dedicated_queue)
- [Identifying the Transfer Queue](#_identifying_the_transfer_queue)
- [Identifying_the_Transfer_Queue](#_identifying_the_transfer_queue)
- [Implementing the Transfer](#_implementing_the_transfer)
- [Implementing_the_Transfer](#_implementing_the_transfer)
- [Submitting for Parallel Execution](#_submitting_for_parallel_execution)
- [Submitting_for_Parallel_Execution](#_submitting_for_parallel_execution)
- [Simple Engine: The Streaming Thread](#_simple_engine_the_streaming_thread)
- [Simple_Engine:_The_Streaming_Thread](#_simple_engine_the_streaming_thread)
- [Navigation](#_navigation)

## Content

In a simple Vulkan application, we might use the same queue for graphics, compute, and transfer work. This is easy to implement, but it’s not efficient. Every time we submit a large transfer, the graphics queue has to stop what it’s doing and wait for the transfer engine to finish. This creates a "stutter" in our frame rate.

To get a truly asynchronous transfer queue, we look for a queue family that supports `vk::QueueFlagBits::eTransfer` but ideally does NOT support `vk::QueueFlagBits::eGraphics` or `vk::QueueFlagBits::eCompute`. This ensures the hardware has a dedicated DMA engine for memory copies that doesn’t share resources with the main processing units.

Here is how we identify these dedicated transfer families:

uint32_t transferQueueFamilyIndex = std::numeric_limits::max();
auto queueFamilies = physicalDevice.getQueueFamilyProperties();

for (uint32_t i = 0; i ::max()) {
    for (uint32_t i = 0; i 

By using a **Dedicated Transfer Queue**, we can perform these uploads in the background. The transfer engine is a specialized piece of hardware that can move data between memory locations without using the GPU’s compute or graphics cores. By offloading these tasks, we can keep our main rendering pipeline running at full speed.

When we use a dedicated transfer queue, we must be careful with how we record and submit our command buffers. We typically use a specialized **Transfer Command Pool** that is tied to our transfer queue family.

// Record a transfer command buffer
auto cmd = vk::raii::CommandBuffer(device, { .commandPool = *transferPool, .level = vk::CommandBufferLevel::ePrimary });
cmd.begin({ .flags = vk::CommandBufferUsageFlagBits::eOneTimeSubmit });

// Copy from staging buffer to GPU-optimal image
auto region = vk::BufferImageCopy{
    .bufferOffset = 0,
    .imageSubresource = { .aspectMask = vk::ImageAspectFlagBits::eColor, .mipLevel = 0, .baseArrayLayer = 0, .layerCount = 1 },
    .imageExtent = extent
};
cmd.copyBufferToImage(*stagingBuffer, *gpuImage, vk::ImageLayout::eTransferDstOptimal, region);

cmd.end();

The key to non-blocking uploads is submitting our transfer work to the transfer queue **independently** of our main graphics loop. We don’t want our CPU to wait for the transfer to finish. Instead, we use a **Timeline Semaphore** to signal when the transfer is complete.

// On the background thread
auto signalInfo = vk::SemaphoreSubmitInfo{
    .semaphore = *transferTimeline,
    .value = nextTransferValue++,
    .stageMask = vk::PipelineStageFlagBits2::eAllTransfer
};

auto submit = vk::SubmitInfo2{
    .commandBufferInfoCount = 1,
    .pCommandBufferInfos = &cmdInfo,
    .signalSemaphoreInfoCount = 1,
    .pSignalSemaphoreInfos = &signalInfo
};

transferQueue.submit2(submit);

Because we are using a dedicated queue, the GPU can process this transfer while it is simultaneously rendering frame N or frame N+1 on its graphics queue. There is no contention for the command processor or the shader units.

In `Simple Engine`, we have a dedicated `LoadingThread` that handles the background loading and uploading of textures. This thread uses a separate `vk::raii::CommandPool` and a dedicated `transferQueue` (if available on the hardware). When a new texture needs to be uploaded, the loading thread records its own transfer commands and submits them to the `transferQueue` independently of the main rendering loop.

This architecture ensures that our frame rates remain smooth even when loading large new areas of the Bistro scene. The main `Renderer::Render` function is never blocked by the transfer engine. Instead, the renderer only needs to check the status of the `transferTimeline` before it can start using the new texture. This is a much more scalable and responsive approach than the traditional "stop-the-world" loading screen, and it’s a key part of how `Simple Engine` achieves high performance on a wide range of hardware.

In the next section, we’ll see how to coordinate the synchronization to ensure that the graphics queue waits for the transfer to finish before trying to sample the newly uploaded data.

Previous: [Introduction](01_introduction.html) | Next: [Staging Synchronization](03_staging_sync.html)
