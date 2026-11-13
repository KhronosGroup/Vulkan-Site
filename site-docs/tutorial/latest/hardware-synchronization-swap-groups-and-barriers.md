# Hardware Synchronization: Swap Groups and Barriers

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/12_CAVE_Architecture/03_hardware_sync.html

## Table of Contents

- [Swap Groups: Intra-Machine Sync](#_swap_groups_intra_machine_sync)
- [Swap_Groups:_Intra-Machine_Sync](#_swap_groups_intra_machine_sync)
- [Swap Barriers: Inter-Machine Sync](#_swap_barriers_inter_machine_sync)
- [Swap_Barriers:_Inter-Machine_Sync](#_swap_barriers_inter_machine_sync)
- [Implementing the Barrier in Vulkan](#_implementing_the_barrier_in_vulkan)
- [Implementing_the_Barrier_in_Vulkan](#_implementing_the_barrier_in_vulkan)
- [Genlock vs. Swaplock](#_genlock_vs_swaplock)
- [Genlock_vs._Swaplock](#_genlock_vs_swaplock)

## Content

In a networked cluster driving a **CAVE**, "close enough" is not good enough for synchronization. If Node A (the left wall) swaps its buffers even one millisecond before Node B (the front wall), the user will see a distracting horizontal line or a "misaligned" object across the corner where the two walls meet. This is known as **Cluster Tearing**.

A **Swap Group** synchronizes multiple GPUs or multiple displays connected to a **single** workstation.

When one GPU in the group is ready to present, the hardware holds the "Swap" signal until all other GPUs in that same machine are also ready. This ensures that the two outputs of a single dual-GPU workstation always update their pixels at the exact same refresh cycle.

A **Swap Barrier** is the network extension of a swap group. This works across **multiple** workstations.

**Hardware Connection**: A physical cable (often a BNC or RJ45 sync cable) connects the GPUs across the cluster.

**The Handshake**: When Node A finishes its frame, it sends a "Ready" signal over the cable.

**The Wait**: Node A blocks its execution.

**The Release**: Only when **every** node in the cluster has sent its "Ready" signal does the hardware release the barrier, allowing every GPU to swap their buffers simultaneously.

We use the **VK_NV_present_barrier** extension to join these hardware groups.

// Checking for Present Barrier support and joining a group
auto features2 = physicalDevice.getFeatures2();
const auto& barrierFeatures = features2.get();

if (barrierFeatures.presentBarrier) {
    // When creating the swapchain, we join Barrier 1
    // This barrier is managed by the physical sync cable between machines
    vk::SwapchainPresentBarrierCreateInfoNV barrierInfo{};
    barrierInfo.presentBarrierEnable = VK_TRUE;
    barrierInfo.barrierID = 1;

    vk::SwapchainCreateInfoKHR createInfo{};
    createInfo.pNext = &barrierInfo;
    // ...
}

* 
**Genlock (Generator Lock)**: Syncs the **beginning** of the video signal (the start of the scanline). This prevents "rolling" artifacts.

* 
**Swaplock (Swap Barrier)**: Syncs the **moment** the front and back buffers are swapped. This prevents "stale frame" artifacts.

By combining Genlock (signal timing) with Swap Barriers (frame timing), we achieve the "Gold Standard" of spatial synchronization: **Frame-Perfect Cluster Rendering**. The entire room updates as if it were a single piece of digital paper.

[Previous](02_projector_based_spatial_tech.html) | [Next](04_incorporating_into_the_engine.html)
