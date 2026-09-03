# Queue Family Ownership: The Handshake

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Pipeline_Barriers_Transitions/03_queue_family_ownership.html

## Table of Contents

- [Why We Transfer Ownership](#_why_we_transfer_ownership)
- [Why_We_Transfer_Ownership](#_why_we_transfer_ownership)
- [The Release and Acquire Handshake](#_the_release_and_acquire_handshake)
- [The_Release_and_Acquire_Handshake](#_the_release_and_acquire_handshake)
- [1. The Release Operation (Source Queue)](#_1_the_release_operation_source_queue)
- [1._The_Release_Operation_(Source_Queue)](#_1_the_release_operation_source_queue)
- [2. The Acquire Operation (Destination Queue)](#_2_the_acquire_operation_destination_queue)
- [2._The_Acquire_Operation_(Destination_Queue)](#_2_the_acquire_operation_destination_queue)
- [Orchestration with Semaphores](#_orchestration_with_semaphores)
- [Orchestration_with_Semaphores](#_orchestration_with_semaphores)
- [Simple Engine: Resource Handoff](#_simple_engine_resource_handoff)
- [Simple_Engine:_Resource_Handoff](#_simple_engine_resource_handoff)
- [Navigation](#_navigation)

## Content

In many high-performance Vulkan engines, we don’t just use a single "Graphics" queue for everything. We might use a dedicated **Transfer Queue** for background asset streaming or a **Compute Queue** for asynchronous post-processing. However, Vulkan resources (buffers and images) are generally "owned" by a specific queue family if they were created with `vk::SharingMode::eExclusive`.

If you want to move an image from your Transfer queue (where you just uploaded it) to your Graphics queue (where you want to draw it), you must perform an explicit **Queue Family Ownership Transfer**. This is a two-step "handshake" that involves a release operation on the source queue and an acquire operation on the destination queue.

The transfer happens by recording a pipeline barrier on both queues. Crucially, both barriers must specify the source and destination queue family indices.

On the queue that currently owns the resource, you record a barrier that "releases" it. The `srcQueueFamilyIndex` is your current queue, and the `dstQueueFamilyIndex` is the queue you are sending it to.

auto releaseBarrier = vk::ImageMemoryBarrier2{
    .srcStageMask = vk::PipelineStageFlagBits2::eAllTransfer,
    .srcAccessMask = vk::AccessFlagBits2::eTransferWrite,
    .dstStageMask = vk::PipelineStageFlagBits2::eNone, // No stage on this queue
    .dstAccessMask = vk::AccessFlagBits2::eNone,     // No access on this queue
    .oldLayout = vk::ImageLayout::eTransferDstOptimal,
    .newLayout = vk::ImageLayout::eShaderReadOnlyOptimal,
    .srcQueueFamilyIndex = transferQueueIndex,
    .dstQueueFamilyIndex = graphicsQueueIndex,
    .image = texture.image(),
    .subresourceRange = subresourceRange
};

// Record on Transfer Command Buffer
transferCommandBuffer.pipelineBarrier2(vk::DependencyInfo{.imageMemoryBarrierCount = 1, .pImageMemoryBarriers = &releaseBarrier});

On the target queue, you record a barrier that "acquires" the resource. The indices remain the same, but now the `srcStageMask` and `srcAccessMask` are set to `eNone` because those stages happened on a different queue.

auto acquireBarrier = vk::ImageMemoryBarrier2{
    .srcStageMask = vk::PipelineStageFlagBits2::eNone,
    .srcAccessMask = vk::AccessFlagBits2::eNone,
    .dstStageMask = vk::PipelineStageFlagBits2::eFragmentShader,
    .dstAccessMask = vk::AccessFlagBits2::eShaderRead,
    .oldLayout = vk::ImageLayout::eTransferDstOptimal,
    .newLayout = vk::ImageLayout::eShaderReadOnlyOptimal,
    .srcQueueFamilyIndex = transferQueueIndex,
    .dstQueueFamilyIndex = graphicsQueueIndex,
    .image = texture.image(),
    .subresourceRange = subresourceRange
};

// Record on Graphics Command Buffer
graphicsCommandBuffer.pipelineBarrier2(vk::DependencyInfo{.imageMemoryBarrierCount = 1, .pImageMemoryBarriers = &acquireBarrier});

Recording the barriers is only half the battle. You also need to ensure that the Graphics queue doesn’t try to acquire the resource before the Transfer queue has released it. This is typically handled with a **Semaphore**. The Transfer queue signals a semaphore upon completion of its command buffer, and the Graphics queue waits on that same semaphore before executing its own acquire barrier.

This handshake is one of the more complex parts of Vulkan synchronization, but it’s essential for building a multi-threaded, non-blocking engine architecture. In modern Vulkan, we prefer **Timeline Semaphores** for this orchestration, as they allow us to track this progress with a simple monotonic counter, which we’ll cover in detail in the next chapter.

In `Simple Engine`, we avoid the complexity of ownership transfers where possible by using `vk::SharingMode::eConcurrent` when creating our major buffers and images. If the hardware supports it, this allows multiple queue families (like our `transferQueue` and `graphicsQueue`) to access the same memory concurrently without an explicit "Release/Acquire" barrier.

|  | While `eConcurrent` is convenient, using it for **images** can result in lower performance on some hardware implementations compared to `eExclusive` with explicit ownership transfers. For buffers, the impact is generally negligible, but for high-performance image handling, the "handshake" is often preferred. |
| --- | --- |

However, even with `eConcurrent`, you still need to synchronize the **execution** of those queues! In `Simple Engine`, we use a dedicated **Transfer Semaphore** to ensure that our graphics queue doesn’t start sampling a texture until the transfer queue has finished its work. This is handled during the `Renderer::ProcessPendingMeshUploads` call, ensuring that all background uploads are correctly "visible" to the graphics hardware before the next frame begins.

Previous: [The Image Barrier](02_image_barrier.html) | Next: [Global vs. Local Barriers](04_global_vs_local_barriers.html)
