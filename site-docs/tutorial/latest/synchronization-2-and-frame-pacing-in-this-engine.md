# Synchronization 2 and frame pacing in this engine

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Advanced_Topics/Synchronization_2_Frame_Pacing.html

## Table of Contents

- [The moving parts](#_the_moving_parts)
- [The_moving_parts](#_the_moving_parts)
- [Barriers we rely on](#_barriers_we_rely_on)
- [Barriers_we_rely_on](#_barriers_we_rely_on)
- [Descriptor updates at the safe point](#_descriptor_updates_at_the_safe_point)
- [Descriptor_updates_at_the_safe_point](#_descriptor_updates_at_the_safe_point)
- [Takeaways](#_takeaways)
- [Where to look in the code](#_where_to_look_in_the_code)
- [Where_to_look_in_the_code](#_where_to_look_in_the_code)
- [Future work ideas](#_future_work_ideas)
- [Future_work_ideas](#_future_work_ideas)
- [What to read next](#_what_to_read_next)
- [What_to_read_next](#_what_to_read_next)

## Content

Vulkan Synchronization 2 makes barriers and submissions easier to read. This sample uses it to keep uploads and rendering in step without stalls.

The goal here isn’t “maximum cleverness.” It’s predictable ordering:

* 
the transfer queue moves data onto the GPU

* 
the graphics queue draws using whatever is ready

* 
the CPU only mutates per-frame resources when it knows the GPU is done with them

* 
Timeline semaphore on the transfer queue — batches of texture uploads signal increasing values.

* 
Graphics submit waits on the latest uploads value — by the time we draw, textures are ready to sample.

* 
Frame fences — each frame‑in‑flight has a fence we wait on at the start of the next frame’s CPU work.

Uploads path:

* 
`UNDEFINED → TRANSFER_DST_OPTIMAL` (dstStage: TRANSFER, dstAccess: TRANSFER_WRITE)

* 
After copy: `TRANSFER_DST_OPTIMAL → SHADER_READ_ONLY_OPTIMAL` (srcStage: TRANSFER, dstStage: FRAGMENT_SHADER)

Render path:

* 
Attachment images transition outside active dynamic rendering blocks using `vkCmdPipelineBarrier2`.

* 
Swapchain transitions: to `COLOR_ATTACHMENT_OPTIMAL` before composite/transparent, to `PRESENT_SRC_KHR` after ending the last rendering pass.

At the start of a frame, after waiting on the frame fence, we refresh only this frame’s descriptor sets. That avoids “update‑after‑bind” pitfalls and frame‑to‑frame flicker during streaming.

* 
Keep transitions outside active `beginRendering`/`endRendering` scopes.

* 
Use clear stage/access pairs; prefer Synchronization 2 for readability.

* 
Pair timeline semaphores with fences: timelines coordinate queues; fences bound the CPU turn.

* 
Upload submission and timeline semaphore signaling:

`renderer_resources.cpp`

* 
`renderer_utils.cpp`

Graphics submit waits (including “latest upload value”):

* 
`renderer_rendering.cpp`

Image barriers for the render path (attachments + swapchain):

* 
`renderer_rendering.cpp`

Swapchain and present integration:

* 
`swap_chain.h`

* 
`renderer_rendering.cpp`

If you want to experiment with pacing and latency:

* 
Add a UI toggle for the frames-in-flight count and measure input latency vs throughput.

* 
Add a “fixed camera path” mode (development-only) to produce repeatable GPU timing comparisons.

* 
Add GPU timestamp queries around the big passes to visualize where time goes.

* 
Add async compute experiments (if your device supports it) for things like Forward+ light list building.

* 
[Synchronization and Streaming](Synchronization_and_Streaming.html)

* 
[Descriptor Indexing UpdateAfterBind](Descriptor_Indexing_UpdateAfterBind.html)

* 
[Rendering Pipeline Overview](Rendering_Pipeline_Overview.html)
