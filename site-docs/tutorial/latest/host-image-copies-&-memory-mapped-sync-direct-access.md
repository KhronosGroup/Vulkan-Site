# Host Image Copies & Memory Mapped Sync: Direct Access

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Host_Image_Copies_Memory_Sync/01_introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [The Synchronization Challenge](#_the_synchronization_challenge)
- [The_Synchronization_Challenge](#_the_synchronization_challenge)
- [What We’ll Explore](#_what_well_explore)
- [What_We’ll_Explore](#_what_well_explore)
- [Navigation](#_navigation)

## Content

For most of Vulkan’s history, if you wanted to move data into an image, you had to follow a very specific ritual: create a staging buffer, map it, write your data, record a `copyBufferToImage` command, and then submit that command buffer to a queue. While this is efficient for large, asynchronous uploads, it’s a lot of overhead for simple, direct updates—like updating a small UI texture or a single mip level.

With the arrival of **Vulkan 1.4**, we have a powerful new tool: **Host Image Copies** (`VK_EXT_host_image_copy`). This feature allows the CPU to copy data directly into a GPU-optimal image without recording or submitting a single command buffer. It’s the most direct way to move data between CPU and GPU memory.

|  | While Host Image Copies were promoted to core in Vulkan 1.4, support for this feature is still **optional**. You must check the `VkPhysicalDeviceHostImageCopyFeaturesEXT` (or the 1.4 equivalent) to ensure your hardware and driver support this direct path. |
| --- | --- |

While Host Image Copies simplify the "how" of moving data, they don’t exempt us from the "when." Because we are moving data directly on the host (CPU), we must be extremely careful to ensure that the GPU isn’t trying to use that same image while we are writing to it.

This introduces a different kind of synchronization. We aren’t just syncing two GPU queues; we are syncing the **Host** with the **Device**. We need to ensure that our host writes are **visible** to the GPU, and that any previous GPU work is **available** before we start our host copy.

In this chapter, we’ll dive into the world of host-side synchronization. We’ll explore:

**Direct CPU-to-Image Access**: How to utilize the new Vulkan 1.4 Host Image Copy features to move data efficiently without command buffer overhead.

**Visibility and Flushes**: Mastering `vk::MemoryBarrier2` specifically for host-mapped memory. We’ll learn how to ensure data coherency across the bus, ensuring that the bytes we write on the CPU are exactly what the GPU sees.

**Host-Device Handshakes**: Coordinating with fences and timeline semaphores to ensure that our host-side copies never collide with active GPU rendering.

By the end of this chapter, you’ll have a complete understanding of how to manage direct memory access in modern Vulkan, providing you with a faster, more flexible way to keep your assets updated.

Previous: [Local Read Sync](../Dynamic_Rendering_Sync/03_local_read_sync.html) | Next: [Direct CPU-to-Image Access](02_cpu_to_image_access.html)
