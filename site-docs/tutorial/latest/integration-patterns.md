# Integration Patterns

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Third_Party_Libraries/06_integration_patterns.html

## Table of Contents

- [Introduction](#_introduction)
- [The Integration Challenge](#_the_integration_challenge)
- [The_Integration_Challenge](#_the_integration_challenge)
- [Two Separate Worlds](#_two_separate_worlds)
- [Two_Separate_Worlds](#_two_separate_worlds)
- [The Data Transfer Problem](#_the_data_transfer_problem)
- [The_Data_Transfer_Problem](#_the_data_transfer_problem)
- [The Synchronization Problem](#_the_synchronization_problem)
- [The_Synchronization_Problem](#_the_synchronization_problem)
- [The Performance Problem](#_the_performance_problem)
- [The_Performance_Problem](#_the_performance_problem)
- [Pattern 1: Separate Contexts](#_pattern_1_separate_contexts)
- [Pattern_1:_Separate_Contexts](#_pattern_1_separate_contexts)
- [How It Works](#_how_it_works)
- [How_It_Works](#_how_it_works)
- [Implementation](#_implementation)
- [Advantages](#_advantages)
- [Disadvantages](#_disadvantages)
- [When to Use This Pattern](#_when_to_use_this_pattern)
- [When_to_Use_This_Pattern](#_when_to_use_this_pattern)
- [Pattern 2: Shared Resources](#_pattern_2_shared_resources)
- [Pattern_2:_Shared_Resources](#_pattern_2_shared_resources)
- [How It Works](#_how_it_works_2)
- [How_It_Works](#_how_it_works_2)
- [Implementation Overview](#_implementation_overview)
- [Advantages](#_advantages_2)
- [Disadvantages](#_disadvantages_2)
- [When to Use This Pattern](#_when_to_use_this_pattern_2)
- [When_to_Use_This_Pattern](#_when_to_use_this_pattern_2)
- [Pattern 3: Interleaved Execution](#_pattern_3_interleaved_execution)
- [Pattern_3:_Interleaved_Execution](#_pattern_3_interleaved_execution)
- [How It Works](#_how_it_works_3)
- [How_It_Works](#_how_it_works_3)
- [Implementation Concept](#_implementation_concept)
- [Advantages](#_advantages_3)
- [Disadvantages](#_disadvantages_3)
- [When to Use This Pattern](#_when_to_use_this_pattern_3)
- [When_to_Use_This_Pattern](#_when_to_use_this_pattern_3)
- [Choosing the Right Pattern](#_choosing_the_right_pattern)
- [Choosing_the_Right_Pattern](#_choosing_the_right_pattern)
- [Performance Requirements](#_performance_requirements)
- [Development Resources](#_development_resources)
- [Platform Targets](#_platform_targets)
- [ML Library Choice](#_ml_library_choice)
- [ML_Library_Choice](#_ml_library_choice)
- [Iteration Strategy](#_iteration_strategy)
- [Summary](#_summary)

## Content

You’ve chosen your ML inference library—maybe ONNX Runtime for its flexibility, TensorFlow Lite for mobile optimization, or PyTorch Mobile for seamless training-to-deployment. Now comes the practical challenge: how do you actually integrate it with your Vulkan application?

This isn’t a trivial question. Your Vulkan application has its own GPU context, command queues, memory allocations, and synchronization primitives. The ML library has its own runtime, its own way of managing GPU resources, its own execution model. Bridging these two worlds requires careful architectural decisions.

The good news is that there are established patterns for this integration, each with different tradeoffs. This chapter explores three fundamental approaches: running ML inference in a separate context, sharing GPU resources between Vulkan and ML libraries, and interleaving execution in a unified command stream. Understanding these patterns helps you choose the right approach for your specific use case.

Before diving into specific patterns, let’s understand why integration is challenging in the first place.

Your Vulkan application and the ML inference library are fundamentally separate systems. Vulkan gives you explicit control over GPU resources—you allocate buffers, create command buffers, manage synchronization, and submit work to queues. The ML library abstracts these details—you load a model, provide input data, call an inference function, and get results back.

This abstraction is powerful for ML workflows, but it creates a boundary. The ML library manages its own GPU context (whether that’s **WebGPU**, **DirectML**, or **CUDA** internally). Your Vulkan rendering context is separate. Data living in your Vulkan buffers isn’t automatically accessible to the ML library, and vice versa.

The most obvious challenge is data movement. Suppose you’re building a game that uses ML for AI-based upscaling. Each frame, you render at lower resolution, then use an ML model to upscale to native resolution. The rendered image lives in a Vulkan image. The ML model needs that image as input. How does the data get from your Vulkan image to the ML library?

The naive approach: read the image back to CPU memory, then upload it to the ML library’s GPU context. This works, but it’s slow. You’re doing two GPU-to-CPU-to-GPU transfers per frame. At 60 FPS, that’s 120 transfers per second, each with latency and bandwidth costs.

The better approach: share GPU memory between Vulkan and the ML library, eliminating the CPU roundtrip. But this requires platform-specific extensions, careful synchronization, and deeper integration.

Even if you solve data transfer, synchronization remains tricky. Your Vulkan rendering and ML inference are asynchronous operations. The GPU might still be rendering when you start inference, or inference might not finish before you need the result for the next frame.

You need to ensure:

* 
Rendering completes before inference starts reading the rendered image

* 
Inference completes before rendering uses the upscaled result

* 
Multiple frames can be in flight simultaneously for throughput

This requires coordinating between Vulkan’s synchronization primitives (semaphores, fences, barriers) and the ML library’s synchronization mechanisms (which vary by library and execution provider).

Integration overhead matters. If your integration adds 5ms of latency per frame, that’s 5ms you can’t spend on rendering or gameplay. For a 60 FPS target (16.67ms per frame), 5ms is nearly a third of your frame budget.

The integration pattern you choose directly impacts this overhead. Some patterns minimize latency but increase complexity. Others are simple but add overhead. Understanding these tradeoffs helps you make informed decisions.

The simplest integration pattern is to run ML inference in a completely separate context from Vulkan rendering. The two systems don’t share resources—they communicate only through CPU memory.

Your application has two independent GPU contexts:

**Vulkan Context**: Handles all rendering. You create Vulkan instances, devices, command buffers, and pipelines as usual. Rendering happens entirely within this context.

**ML Context**: The ML library creates its own GPU context (**WebGPU**, **DirectML**, etc.). Inference happens entirely within this context.

Data flows like this:

Render a frame in Vulkan, writing to a Vulkan image

Read the image back to CPU memory (vkCmdCopyImageToBuffer + vkMapMemory)

Pass the CPU buffer to the ML library’s inference function

ML library uploads data to its GPU context, runs inference, downloads results to CPU

Your application reads the results from CPU memory

If needed, upload results back to Vulkan for further rendering

The implementation is straightforward because the two systems are completely decoupled:

// Vulkan rendering
commandBuffer.draw(...);  // Render your scene
commandBuffer.copyImageToBuffer(renderedImage, stagingBuffer, ...);  // Copy to staging buffer

// Wait for rendering to complete
graphicsQueue.waitIdle();

// Map staging buffer to CPU
void* data = stagingBufferMemory.mapMemory(0, imageSize);

// Run ML inference (library handles its own GPU context)
std::vector input = preprocessImage(data, width, height);
std::vector output = mlRuntime->run(input);

// Unmap staging buffer
stagingBufferMemory.unmapMemory();

// Use output for next frame or display
processResults(output);

No shared resources, no complex synchronization, no platform-specific extensions. Just straightforward CPU-mediated data transfer.

**Simplicity**: This is the easiest pattern to implement. You don’t need to understand external memory extensions, cross-context synchronization, or platform-specific interop mechanisms. If you can read data from Vulkan to CPU and pass it to the ML library, you’re done.

**Portability**: Works on every platform without platform-specific code. Linux, Windows, macOS, Android, iOS—the same approach works everywhere because you’re using standard CPU memory as the intermediary.

**Debugging**: When something goes wrong, it’s easy to debug. You can inspect the CPU buffer between Vulkan and ML, verify data is correct, check for corruption, and isolate whether the problem is in rendering or inference.

**Flexibility**: The two systems are completely independent. You can swap ML libraries without touching Vulkan code. You can update Vulkan rendering without affecting ML inference. Changes to one don’t ripple into the other.

**Performance Overhead**: The CPU roundtrip is expensive. GPU-to-CPU transfers stall the pipeline, waiting for rendering to complete. CPU-to-GPU transfers for ML input add more latency. For a 1920×1080 RGB image (about 6MB), these transfers can take 2-5ms on typical hardware—significant overhead for real-time applications.

**Bandwidth Waste**: You’re using PCIe bandwidth twice: once for GPU-to-CPU, once for CPU-to-GPU. On systems with limited bandwidth (like mobile devices or integrated GPUs), this can become a bottleneck.

**Latency**: The synchronization points (vkQueueWaitIdle, waiting for ML inference to complete) add latency. You can’t overlap rendering and inference easily because they’re communicating through CPU memory.

**Memory Duplication**: Data exists in three places: Vulkan GPU memory, CPU staging buffer, and ML library GPU memory. This triples memory usage for transferred data.

Separate contexts make sense when:

**Prototyping**: You’re exploring ML integration and want to get something working quickly. Start simple, optimize later.

**Infrequent Inference**: If you’re running inference once per second or less (e.g., analyzing screenshots, processing user input), the overhead doesn’t matter. A few milliseconds per inference is acceptable.

**Small Data**: If your input/output data is small (a few kilobytes), the transfer overhead is negligible. For example, passing a small feature vector to an ML model for decision-making.

**Cross-Platform Priority**: If you need to support many platforms and don’t want platform-specific code, the simplicity and portability outweigh the performance cost.

**Debugging Phase**: When you’re debugging ML integration issues, the ability to inspect CPU buffers between stages is invaluable. Use this pattern during development, then optimize to shared resources if needed.

The second pattern eliminates CPU roundtrips by sharing GPU memory directly between Vulkan and the ML library. Data stays on the GPU, accessible to both contexts.

Instead of separate memory allocations, you create GPU memory that both Vulkan and the ML library can access:

Allocate memory in Vulkan using external memory extensions

Export a handle to that memory (platform-specific: file descriptor on Linux, NT handle on Windows, etc.)

Import that handle into the ML library’s GPU context

Both contexts can now read/write the same GPU memory

Use synchronization primitives (semaphores, fences) to coordinate access

Data flows like this:

Render a frame in Vulkan, writing to a shared image

Signal a semaphore when rendering completes

ML library waits on that semaphore, then runs inference reading from the shared image

ML library signals another semaphore when inference completes

Vulkan waits on that semaphore before using inference results

No CPU transfers. Data stays on GPU throughout.

The implementation is more complex because it requires platform-specific extensions and careful synchronization. Here’s a high-level overview (detailed code varies by platform and ML library):

// 1. Create Vulkan image with external memory
vk::ExternalMemoryImageCreateInfo externalInfo{
    .handleTypes = vk::ExternalMemoryHandleTypeFlagBits::eOpaqueFd  // Linux
};

vk::ImageCreateInfo imageInfo{
    .pNext = &externalInfo
    // ... other image creation parameters
};
vk::raii::Image sharedImage(device, imageInfo);

// 2. Allocate memory with external memory
vk::ExportMemoryAllocateInfo exportInfo{
    .handleTypes = vk::ExternalMemoryHandleTypeFlagBits::eOpaqueFd
};

vk::MemoryAllocateInfo allocInfo{
    .pNext = &exportInfo
    // ... other allocation parameters
};
vk::raii::DeviceMemory sharedMemory(device, allocInfo);
sharedImage.bindMemory(*sharedMemory, 0);

// 3. Export memory handle
vk::MemoryGetFdInfoKHR getFdInfo{
    .memory = *sharedMemory,
    .handleType = vk::ExternalMemoryHandleTypeFlagBits::eOpaqueFd
};

int memoryFd = device.getMemoryFdKHR(getFdInfo);

// 4. Import into ML library (library-specific API)
// For OpenCL:
cl_mem clMem;
cl_mem_properties_khr desc = {};
desc.type = CL_EXTERNAL_MEMORY_HANDLE_OPAQUE_FD_KHR;
desc.handle.fd = memoryFd;
desc.size = memorySize;
clCreateBufferWithProperties(&clMem, &desc);

// 5. Create semaphores for synchronization
vk::SemaphoreCreateInfo semaphoreInfo;
// ... create Vulkan semaphores
// Export and import semaphores similarly to memory

The actual implementation requires handling platform differences (Linux uses file descriptors, Windows uses NT handles, macOS uses IOSurface), library-specific import APIs, and careful synchronization.

**Performance**: Eliminates CPU roundtrips. Data stays on GPU, avoiding expensive transfers. For large images or frequent inference, this can save 2-10ms per frame.

**Bandwidth Efficiency**: Uses PCIe bandwidth only for actual data movement (e.g., uploading new frames), not for redundant GPU-to-CPU-to-GPU transfers.

**Lower Latency**: Reduces synchronization points. Rendering and inference can be pipelined more effectively because they’re not waiting for CPU transfers.

**Memory Efficiency**: Data exists in one place—shared GPU memory. No duplication across CPU and multiple GPU contexts.

**Complexity**: Requires understanding Vulkan external memory extensions, platform-specific handle types, and ML library import APIs. The code is significantly more complex than separate contexts.

**Platform-Specific Code**: Different platforms use different handle types and mechanisms. You need conditional compilation or runtime platform detection to handle Linux, Windows, and macOS differently.

**Limited Library Support**: Not all ML libraries support importing external memory. ONNX Runtime with OpenCL or DirectML execution providers support it, but CPU-only providers don’t. TensorFlow Lite’s GPU delegate support varies by platform.

**Debugging Difficulty**: When something goes wrong (and it will during development), debugging shared memory issues is harder. You can’t easily inspect the data between stages because it never leaves the GPU.

**Synchronization Complexity**: Coordinating access between contexts requires careful use of semaphores and fences. Mistakes lead to race conditions, corruption, or deadlocks.

Shared resources make sense when:

**Performance Critical**: You’re running inference every frame at 60+ FPS, and every millisecond matters. The complexity is worth the performance gain.

**Large Data**: You’re transferring large images (1080p, 4K) or volumes of data where CPU transfer overhead is significant.

**Tight Integration**: Your application is deeply integrated with ML—for example, real-time style transfer, AI-based rendering, or neural denoising where ML is part of the core rendering pipeline.

**Controlled Platforms**: You’re targeting specific platforms (e.g., Windows with DirectML, or Linux with OpenCL) where you can test and validate the platform-specific code thoroughly.

**Production Optimization**: You’ve prototyped with separate contexts, validated correctness, and now you’re optimizing for production performance.

The most advanced pattern interleaves Vulkan rendering and ML inference in a single command stream. Instead of separate contexts, the ML library uses Vulkan internally, and you mix rendering and inference commands in the same command buffer.

This pattern requires the ML library to support WebGPU as an execution provider. Historically, this was rare—most libraries used CUDA, DirectML, or TensorRT internally. But modern frameworks are increasingly supporting cross-vendor APIs like WebGPU (which leverages Vulkan or DirectML internally), enabling the tightest integration:

ML library creates its inference operations as Vulkan compute pipelines

You record both rendering and inference commands in the same Vulkan command buffer

Submit the command buffer to a single queue

Use pipeline barriers to synchronize between rendering and inference stages

Data flows like this:

Record rendering commands (vkCmdDraw, etc.)

Insert pipeline barrier to ensure rendering completes

Record ML inference commands (vkCmdDispatch for compute shaders implementing ML operations)

Insert pipeline barrier to ensure inference completes

Record commands using inference results (e.g., composite upscaled image)

Submit entire command buffer

Everything happens in one context, one command buffer, one submission.

The implementation depends heavily on the ML library’s cross-vendor API support. Conceptually:

// Begin command buffer
commandBuffer.begin(beginInfo);

// Render scene
commandBuffer.bindPipeline(vk::PipelineBindPoint::eGraphics, *renderPipeline);
commandBuffer.draw(...);

// Barrier: rendering -> inference
vk::ImageMemoryBarrier barrier{
    .srcAccessMask = vk::AccessFlagBits::eColorAttachmentWrite,
    .dstAccessMask = vk::AccessFlagBits::eShaderRead,
    .oldLayout = vk::ImageLayout::eColorAttachmentOptimal,
    .newLayout = vk::ImageLayout::eShaderReadOnlyOptimal,
    .image = *renderedImage
    // ... other barrier fields
};

commandBuffer.pipelineBarrier(
    vk::PipelineStageFlagBits::eColorAttachmentOutput,
    vk::PipelineStageFlagBits::eComputeShader,
    {}, {}, {}, barrier);

// ML inference (library records compute dispatches)
mlRuntime->recordInferenceCommands(commandBuffer, renderedImage, outputImage);

// Barrier: inference -> next stage
// ... another barrier

// Use inference results
commandBuffer.bindPipeline(vk::PipelineBindPoint::eGraphics, *compositePipeline);
commandBuffer.draw(...);

// End and submit
commandBuffer.end();
queue.submit(submitInfo, *fence);

The key is that the ML library exposes an API to record its operations into your command buffer, rather than managing its own command submission.

**Optimal Performance**: No context switches, no separate submissions, no cross-context synchronization overhead. Everything runs in a single, optimized command stream.

**Fine-Grained Synchronization**: Use Vulkan’s pipeline barriers for precise synchronization. You can overlap independent operations and synchronize only where necessary.

**Unified Memory Management**: All memory is Vulkan memory. No external memory extensions, no platform-specific handles, no import/export complexity.

**Debugging**: Vulkan debugging tools (RenderDoc, Nsight) can capture and visualize the entire frame, including ML inference operations. You see rendering and inference in one timeline.

**Limited Library Support**: While improving, not all ML libraries support this pattern equally across all operators. Most still prioritize CUDA or DirectML for peak performance. You’d need a library with strong Vulkan or WebGPU support, or you’d need to build your own inference engine (which is what later chapters in this tutorial teach).

**Limited Flexibility**: You’re locked into Vulkan for ML inference. You can’t easily switch to a different execution provider (OpenCL, TensorRT) for performance comparison or platform-specific optimization.

**Complexity**: Even with library support, managing a unified command buffer with both rendering and inference requires deep understanding of Vulkan synchronization, memory barriers, and pipeline stages.

**Portability Concerns**: Vulkan compute support varies across devices. Some mobile GPUs have limited compute capabilities. You might need fallback paths for devices where Vulkan compute isn’t performant.

Interleaved execution makes sense when:

**Custom Inference Engine**: You’re building your own ML inference engine using Vulkan compute shaders (which is what this tutorial series teaches). You have full control over how inference operations are implemented and recorded.

**Maximum Performance**: You need absolute minimum latency and maximum throughput. The overhead of separate contexts or even shared resources is unacceptable.

**Vulkan-First Architecture**: Your application is built entirely around Vulkan. You’re already using Vulkan compute for other tasks (physics, particle systems, post-processing), and adding ML inference to that pipeline is natural.

**Controlled Hardware**: You’re targeting specific hardware where Vulkan compute performance is well-understood and validated.

**Learning and Experimentation**: You want to understand ML inference at the lowest level. Building a Vulkan-based inference engine teaches you exactly how ML operations map to GPU compute.

How do you decide which pattern to use? Consider these factors:

**60+ FPS with large data**: Shared resources or interleaved execution. Separate contexts will likely miss your frame budget.

**30 FPS or less**: Separate contexts are probably fine. The overhead is acceptable at lower frame rates.

**Infrequent inference**: Separate contexts. If you’re running inference once per second or less, performance doesn’t matter.

**Small team, tight deadline**: Separate contexts. Get it working quickly, optimize later if needed.

**Experienced team, time for optimization**: Shared resources. The complexity is manageable with experienced developers.

**Learning project**: Interleaved execution with custom inference engine. Maximum learning, but significant time investment.

**Single platform (e.g., Windows only)**: Shared resources are easier because you only need one platform’s external memory implementation.

**Multiple platforms**: Separate contexts avoid platform-specific code. Or invest in shared resources with conditional compilation for each platform.

**Mobile**: Consider separate contexts first. Mobile GPUs and drivers have more variability in external memory support.

**ONNX Runtime with WebGPU**: Shared resources are well-supported.

**TensorFlow Lite**: Separate contexts are simpler. GPU delegate support for shared memory varies.

**PyTorch Mobile**: Separate contexts. Shared memory support is limited.

**Custom Vulkan engine**: Interleaved execution is natural.

A common approach is to iterate through patterns:

**Prototype with separate contexts**: Get ML integration working quickly. Validate correctness, test models, tune hyperparameters.

**Profile and measure**: Determine if performance is acceptable. If you’re hitting frame rate targets, stop here.

**Optimize to shared resources**: If performance is insufficient, implement shared memory. Measure the improvement.

**Consider custom engine**: If shared resources still aren’t enough, or if you need features not available in libraries, build a custom Vulkan inference engine.

Don’t over-optimize prematurely. Start simple, measure, then optimize where needed.

Three integration patterns bridge Vulkan rendering and ML inference:

**Separate Contexts**: Simple, portable, easy to debug. Uses CPU memory as intermediary. Best for prototyping, infrequent inference, or when simplicity matters more than performance.

**Shared Resources**: Eliminates CPU roundtrips by sharing GPU memory. Complex, platform-specific, but significantly faster for large data or frequent inference. Best for performance-critical applications on controlled platforms.

**Interleaved Execution**: Unified command stream mixing rendering and inference. Optimal performance but requires library support or custom implementation. Best for custom Vulkan inference engines or maximum performance scenarios.

Choose based on your performance requirements, development resources, platform targets, and ML library capabilities. Start simple, measure, then optimize where needed.

With these patterns understood, the next chapter explores the technical details of GPU resource sharing—how to actually implement shared memory and synchronization between Vulkan and ML libraries.

[Previous: DirectML](05_directml.html) | [Next: GPU Resource Sharing](07_gpu_resource_sharing.html)
