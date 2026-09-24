# Multi-Draw Indirect (MDI): Bridging Compute to Graphics

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/07_GPU_Driven_Pipelines/04_multi_draw_indirect_mdi.html

## Table of Contents

- [Bridging the Gap](#_bridging_the_gap)
- [Bridging_the_Gap](#_bridging_the_gap)
- [How It Works: The MDI Pipeline](#_how_it_works_the_mdi_pipeline)
- [How_It_Works:_The_MDI_Pipeline](#_how_it_works_the_mdi_pipeline)
- [Why MDI is Essential for GPU-Driven Rendering](#_why_mdi_is_essential_for_gpu_driven_rendering)
- [Why_MDI_is_Essential_for_GPU-Driven_Rendering](#_why_mdi_is_essential_for_gpu_driven_rendering)
- [Best Practices for MDI](#_best_practices_for_mdi)
- [Best_Practices_for_MDI](#_best_practices_for_mdi)
- [Conclusion: The Future is GPU-Driven](#_conclusion_the_future_is_gpu_driven)
- [Conclusion:_The_Future_is_GPU-Driven](#_conclusion_the_future_is_gpu_driven)

## Content

Throughout this chapter, we’ve focused on how to make compute shaders more autonomous. But the final goal of most graphics applications is…​ well, graphics. We need a way to take the results of our compute-based culling or analysis and turn them into draw calls.

**Multi-Draw Indirect (MDI)** is the ultimate bridge between the compute and graphics pipelines. It allows a single Vulkan command to execute an arbitrary number of draw calls, where the parameters for each draw call come from a GPU-side buffer.

**Cull Phase (Compute)**: A compute shader analyzes your scene (e.g., millions of objects) and decides which ones are visible. It writes the `vertexCount`, `instanceCount`, etc., for each visible object into a large **Indirect Buffer**.

**Count Buffer**: The compute shader also keeps an atomic counter of how many objects were visible and writes this count into a separate **Draw Count Buffer**.

**The Draw (Graphics)**: The CPU calls `vkCmdDrawIndexedIndirectCount`. This single command tells the GPU to read its own counts and parameters and draw the objects.

// The layout of the data in the MDI buffer (matching vk::DrawIndexedIndirectCommand)
struct IndirectDrawCommand {
    uint32_t indexCount;
    uint32_t instanceCount;
    uint32_t firstIndex;
    int32_t  vertexOffset;
    uint32_t firstInstance;
};

Without MDI, the CPU would have to read back the visibility count from the GPU and then record a separate `vkCmdDraw` for every visible object. For a scene with 10,000 visible objects, that would be 10,000 CPU calls and 10,000 command records every frame.

With MDI, those 10,000 objects are rendered with **one command**. This is how modern engines can handle massive "culling-first" architectures.

* 
**Max Draw Count**: Always specify a reasonable maximum draw count in the `vkCmdDrawIndexedIndirectCount` call to prevent the GPU from over-reading its buffers in case of errors.

* 
**Buffer Alignment**: Ensure that your indirect buffer follows the correct alignment and stride requirements for your hardware.

* 
**Combine with BDA**: Use **Buffer Device Address** (from Chapter 7) to pass object-specific data (like materials and transforms) to your shaders, bypassing traditional descriptor sets.

By mastering **Indirect Dispatch**, **GPU-Side Command Generation**, and **Multi-Draw Indirect**, you’ve moved from a traditional "CPU-lead" pipeline to a modern "GPU-driven" architecture. Your applications are now more scalable, lower latency, and more efficient.

In the next chapter, we’ll look at how to coordinate these heavy compute workloads with your graphics rendering using **Asynchronous Compute Orchestration**.

[Previous: GPU-Side Command Generation](03_gpu_side_command_generation.html) | [Next: Asynchronous Compute Orchestration](../08_Asynchronous_Compute/01_introduction.html)
