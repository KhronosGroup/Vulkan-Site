# Transfer Queues & Asset Streaming Sync: Non-Blocking Uploads

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Transfer_Queues_Streaming/01_introduction.html

## Table of Contents

- [Introduction](#_introduction)
- [The Staging Pipeline](#_the_staging_pipeline)
- [The_Staging_Pipeline](#_the_staging_pipeline)
- [What We’ll Build](#_what_well_build)
- [What_We’ll_Build](#_what_well_build)
- [Navigation](#_navigation)

## Content

In a modern, open-world game or a complex architectural visualization, we can’t afford to load all our assets upfront. We need to stream textures, meshes, and animation data in the background as the player moves through the world. If we do this on the main graphics queue, we risk introducing "stutters" (dropped frames) every time we submit a large upload.

The solution is to use a **Dedicated Transfer Queue**. Most modern GPUs have a specialized engine designed specifically for moving data from CPU-visible staging buffers to GPU-optimal memory. This engine can run completely independently of the graphics and compute units, allowing us to stream gigabytes of data without affecting the frame rate.

Asset streaming is a multi-step process. First, the CPU maps a **Staging Buffer** and writes the raw data (like a PNG or a mesh file). Then, the transfer queue is used to copy that data into a **GPU-Optimal Buffer or Image**. Finally, the graphics queue is notified that the data is ready so it can begin using it in a shader.

The challenge, as always, is synchronization. We must ensure that:

**CPU to Transfer**: The transfer queue doesn’t start copying until the CPU has finished writing to the staging buffer.

**Transfer to GPU**: The transfer operation is complete and the data is visible in GPU memory.

**Transfer to Graphics**: The graphics queue doesn’t try to sample the texture until the transfer queue has finished its work and, if necessary, released ownership of the resource.

In this chapter, we will implement a robust, non-blocking asset streaming system. We’ll explore:

**Non-Blocking Data Uploads**: How to utilize a dedicated transfer queue for background texture and buffer streaming.

**Staging Synchronization**: Coordinating **Timeline Semaphores** to ensure the graphics queue waits for the transfer to complete before sampling new data.

**Ownership Handshakes**: Implementing the queue family ownership transfers we learned about in Chapter 3, but in the context of a background streaming system.

By the end of this chapter, you’ll have a streaming architecture that allows your engine to load massive amounts of data in the background while maintaining a perfectly smooth, stutter-free frame rate.

Previous: [The Bubble Problem](../Async_Compute_Overlap/04_bubble_problem.html) | Next: [Non-Blocking Data Uploads](02_non_blocking_uploads.html)
