# Multithreading with Vulkan

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/17_Multithreading.html

## Table of Contents

- [Introduction](#_introduction)
- [Overview](#_overview)
- [Implementation](#_implementation)
- [Thread-Safe Resource Management](#_thread_safe_resource_management)
- [Thread-Safe_Resource_Management](#_thread_safe_resource_management)
- [Worker Thread Implementation](#_worker_thread_implementation)
- [Worker_Thread_Implementation](#_worker_thread_implementation)
- [Modifying the Compute Shader](#_modifying_the_compute_shader)
- [Modifying_the_Compute_Shader](#_modifying_the_compute_shader)
- [Updating the Main Loop](#_updating_the_main_loop)
- [Updating_the_Main_Loop](#_updating_the_main_loop)
- [Advanced Multithreading Techniques](#_advanced_multithreading_techniques)
- [Advanced_Multithreading_Techniques](#_advanced_multithreading_techniques)
- [Secondary Command Buffers](#_secondary_command_buffers)
- [Secondary_Command_Buffers](#_secondary_command_buffers)
- [Thread Pool for Dynamic Work Distribution](#_thread_pool_for_dynamic_work_distribution)
- [Thread_Pool_for_Dynamic_Work_Distribution](#_thread_pool_for_dynamic_work_distribution)
- [Asynchronous Resource Loading](#_asynchronous_resource_loading)
- [Asynchronous_Resource_Loading](#_asynchronous_resource_loading)
- [Performance Considerations](#_performance_considerations)
- [Debugging Multithreaded Vulkan Applications](#_debugging_multithreaded_vulkan_applications)
- [Debugging_Multithreaded_Vulkan_Applications](#_debugging_multithreaded_vulkan_applications)
- [Conclusion](#_conclusion)

## Content

In this chapter, we’ll explore how to leverage multithreading with Vulkan to improve performance in your applications. Modern CPUs have multiple cores, and efficiently utilizing these cores can significantly enhance your application’s performance, especially for computationally intensive tasks. Vulkan’s explicit design makes it well-suited for multithreaded architectures, allowing for fine-grained control over synchronization and resource access.

Vulkan was designed with multithreading in mind, offering several advantages over older APIs:

**Thread-safe command buffer recording**: Multiple threads can record commands to different command buffers simultaneously.

**Explicit synchronization**: Vulkan requires explicit synchronization, giving you precise control over resource access across threads.

**Queue-based architecture**: Different operations can be submitted to different queues, potentially executing in parallel.

However, multithreading in Vulkan requires careful consideration of:

**Resource sharing**: Ensuring safe access to shared resources across threads.

**Synchronization**: Properly synchronizing operations between threads.

**Work distribution**: Effectively distributing work to maximize parallelism.

In this chapter, we’ll implement a multithreaded rendering system that builds upon our previous work with compute shaders. We’ll create a particle system where:

One thread handles window events and presentation

Multiple worker threads record command buffers for different particle groups

A dedicated thread submits work to the GPU

Let’s walk through the key components needed to implement multithreading in our Vulkan application:

First, we need to ensure our resources are accessed safely across threads. We’ll use a combination of techniques:

// Thread-safe resource manager
class ThreadSafeResourceManager {
private:
    std::mutex resourceMutex;
    // Resources that need thread-safe access
    std::vector commandPools;
    std::vector commandBuffers;

public:
    // Create a command pool for each worker thread
    void createThreadCommandPools(vk::raii::Device& device, uint32_t queueFamilyIndex, uint32_t threadCount) {
        std::lock_guard lock(resourceMutex);

        commandPools.clear();
        for (uint32_t i = 0; i  lock(resourceMutex);
        return commandPools[threadIndex];
    }

    // Allocate command buffers for each thread
    void allocateCommandBuffers(vk::raii::Device& device, uint32_t threadCount, uint32_t buffersPerThread) {
        std::lock_guard lock(resourceMutex);

        commandBuffers.clear();
        for (uint32_t i = 0; i  lock(resourceMutex);
        return commandBuffers[index];
    }
};

Next, we’ll implement worker threads that record command buffers for different particle groups:

class MultithreadedApplication {
private:
    // Thread-related members
    uint32_t threadCount;
    std::vector workerThreads;
    std::atomic shouldExit{false};
    std::vector> threadWorkReady;
    std::vector> threadWorkDone;

    // Synchronization primitives
    std::mutex queueSubmitMutex;
    std::condition_variable workCompleteCv;

    // Resource manager
    ThreadSafeResourceManager resourceManager;

    // Particle system data
    struct ParticleGroup {
        uint32_t startIndex;
        uint32_t count;
    };
    std::vector particleGroups;

    // ... other Vulkan resources ...

public:
    void initThreads() {
        // Determine the number of threads to use (leave one core for the main thread)
        threadCount = std::max(1u, std::thread::hardware_concurrency() - 1);

        // Initialize synchronization primitives
        threadWorkReady.resize(threadCount);
        threadWorkDone.resize(threadCount);

        for (uint32_t i = 0; i (*computePipelineLayout, vk::ShaderStageFlagBits::eCompute, 0, pushConstants);

        // Dispatch compute work
        uint32_t groupCount = (count + 255) / 256;
        cmdBuffer.dispatch(groupCount, 1, 1);

        cmdBuffer.end();
    }

    void signalThreadsToWork() {
        // Signal all threads to start working
        for (uint32_t i = 0; i  lock(queueSubmitMutex);
        workCompleteCv.wait(lock, [this]() {
            for (uint32_t i = 0; i 

We need to modify our compute shader to work with particle ranges specified by push constants:

// In the compute shader (31_shader_compute.slang)
[[vk::push_constant]]
struct PushConstants {
    uint startIndex;
    uint count;
};

[[vk::binding(0, 0)]] ConstantBuffer ubo;
[[vk::binding(1, 0)]] RWStructuredBuffer particlesIn;
[[vk::binding(2, 0)]] RWStructuredBuffer particlesOut;
PushConstants pushConstants;

[numthreads(256,1,1)]
void compMain(uint3 threadId : SV_DispatchThreadID)
{
    uint index = threadId.x;

    // Only process particles within our assigned range
    if (index >= pushConstants.count) {
        return;
    }

    // Adjust index to start from our assigned start index
    uint globalIndex = pushConstants.startIndex + index;

    // Process the particle
    Particle particle = particlesIn[globalIndex];

    // Update particle position based on velocity and delta time
    particle.position += particle.velocity * ubo.deltaTime;

    // Simple boundary check with velocity inversion
    if (abs(particle.position.x) > 1.0) {
        particle.velocity.x *= -1.0;
    }
    if (abs(particle.position.y) > 1.0) {
        particle.velocity.y *= -1.0;
    }

    // Write the updated particle to the output buffer
    particlesOut[globalIndex] = particle;
}

Finally, we’ll update our main loop to coordinate the worker threads:

void drawFrame() {
    // Wait for the previous frame to finish
    auto fenceResult = device.waitForFences(*inFlightFences[frameIndex], vk::True, UINT64_MAX);
    if (fenceResult != vk::Result::eSuccess)
    {
        throw std::runtime_error("failed to wait for fence!");
    }

    // Acquire the next image
    auto [result, imageIndex] = swapChain.acquireNextImage(UINT64_MAX, *imageAvailableSemaphores[frameIndex], nullptr);

    if (result == vk::Result::eErrorOutOfDateKHR || result == vk::Result::eSuboptimalKHR || framebufferResized) {
        framebufferResized = false;
        recreateSwapChain();
        return;
    }

    // Update uniform buffers
    updateUniformBuffer(frameIndex);

    // Signal worker threads to start recording compute command buffers
    signalThreadsToWork();

    // While worker threads are busy, record the graphics command buffer on the main thread
    recordGraphicsCommandBuffer(imageIndex);

    // Wait for all worker threads to complete
    waitForThreadsToComplete();

    // Collect command buffers from all threads
    std::vector computeCmdBuffers;
    for (uint32_t i = 0; i (computeCmdBuffers.size()),
        .pCommandBuffers = computeCmdBuffers.data()
    };

    {
        std::lock_guard lock(queueSubmitMutex);
        computeQueue.submit(computeSubmitInfo, nullptr);
    }

    // Wait for compute to finish before graphics
    vk::PipelineStageFlags waitStages[] = {vk::PipelineStageFlagBits::eVertexInput};

    // Submit graphics work
    vk::SubmitInfo graphisSubmitInfo{.waitSemaphoreCount   = 1,
                                      .pWaitSemaphores      = &*imageAvailableSemaphores[frameIndex],
                                      .pWaitDstStageMask    = &waitDestinationStageMask,
                                      .commandBufferCount   = 1,
                                      .pCommandBuffers      = &*graphicsCommandBuffers[frameIndex],
                                      .signalSemaphoreCount = 1,
                                      .pSignalSemaphores    = &*renderFinishedSemaphores[imageIndex]};

    {
        std::lock_guard lock(queueSubmitMutex);
        device.resetFences(*inFlightFences[frameIndex]);
        graphicsQueue.submit(graphicsSubmitInfo, *inFlightFences[frameIndex]);
    }

    // Present the image
    vk::PresentInfoKHR presentInfo{
        .waitSemaphoreCount = 1,
        .pWaitSemaphores = &*renderFinishedSemaphores[frameIndex],
        .swapchainCount = 1,
        .pSwapchains = &*swapChain,
        .pImageIndices = &imageIndex
    };

    result = presentQueue.presentKHR(presentInfo);

    if (result == vk::Result::eErrorOutOfDateKHR || result == vk::Result::eSuboptimalKHR || framebufferResized) {
        framebufferResized = false;
        recreateSwapChain();
    } else if (result != vk::Result::eSuccess) {
        throw std::runtime_error("failed to present swap chain image!");
    }

    frameIndex = (frameIndex + 1) % MAX_FRAMES_IN_FLIGHT;
}

Beyond the basic implementation above, there are several advanced techniques you can use to further optimize your multithreaded Vulkan application:

Secondary command buffers can be recorded in parallel and then executed by a primary command buffer:

// In worker thread:
vk::CommandBufferInheritanceInfo inheritanceInfo{
    .renderPass = *renderPass,
    .subpass = 0,
    .framebuffer = *framebuffers[imageIndex]
};

vk::CommandBufferBeginInfo beginInfo{
    .flags = vk::CommandBufferUsageFlagBits::eRenderPassContinue,
    .pInheritanceInfo = &inheritanceInfo
};

secondaryCommandBuffer.begin(beginInfo);
// Record rendering commands...
secondaryCommandBuffer.end();

// In main thread:
primaryCommandBuffer.begin({});
primaryCommandBuffer.beginRenderPass(...);
primaryCommandBuffer.executeCommands(secondaryCommandBuffers);
primaryCommandBuffer.endRenderPass();
primaryCommandBuffer.end();

Instead of assigning fixed work to each thread, you can use a thread pool to dynamically distribute work:

class ThreadPool {
private:
    std::vector workers;
    std::queue> tasks;
    std::mutex queueMutex;
    std::condition_variable condition;
    bool stop;

public:
    ThreadPool(size_t threads) : stop(false) {
        for (size_t i = 0; i  task;
                    {
                        std::unique_lock lock(queueMutex);
                        condition.wait(lock, [this] { return stop || !tasks.empty(); });
                        if (stop && tasks.empty()) {
                            return;
                        }
                        task = std::move(tasks.front());
                        tasks.pop();
                    }
                    task();
                }
            });
        }
    }

    template
    void enqueue(F&& f) {
        {
            std::unique_lock lock(queueMutex);
            tasks.emplace(std::forward(f));
        }
        condition.notify_one();
    }

    ~ThreadPool() {
        {
            std::unique_lock lock(queueMutex);
            stop = true;
        }
        condition.notify_all();
        for (std::thread& worker : workers) {
            worker.join();
        }
    }
};

You can use multithreading to load resources asynchronously:

std::future loadTextureAsync(const std::string& filename) {
    return std::async(std::launch::async, [filename]() {
        TextureData data;
        // Load texture data from file
        return data;
    });
}

// Later in your code:
auto textureDataFuture = loadTextureAsync("texture.ktx");
// Do other work...
TextureData textureData = textureDataFuture.get(); // Wait for completion if needed
// Create Vulkan texture from the loaded data

When implementing multithreading in Vulkan, keep these performance considerations in mind:

**Thread Creation Overhead**: Creating threads has overhead, so create them once at startup rather than per-frame.

**Work Granularity**: Ensure each thread has enough work to justify the threading overhead.

**False Sharing**: Be aware of cache line contention when multiple threads access adjacent memory.

**Queue Submissions**: Queue submissions should be synchronized to avoid race conditions.

**Memory Barriers**: Use memory barriers correctly to ensure visibility of memory operations across threads.

**Command Pool Per Thread**: Each thread should have its own command pool to avoid synchronization overhead.

**Measure Performance**: Always measure to ensure your multithreading actually improves performance.

Debugging multithreaded applications can be challenging. Here are some tips:

**Validation Layers**: Enable Vulkan validation layers to catch synchronization issues.

**Thread Sanitizers**: Use tools like ThreadSanitizer to detect data races.

**Logging**: Implement thread-safe logging to track execution flow.

**Simplify**: Start with a simpler threading model and gradually add complexity.

**Atomic Operations**: Use atomic operations for thread-safe counters and flags.

In this chapter, we’ve explored how to leverage multithreading with Vulkan to improve performance. We’ve implemented a multithreaded particle system where:

Multiple worker threads record command buffers in parallel

The main thread coordinates work and handles presentation

Proper synchronization ensures thread safety

By distributing work across multiple CPU cores, we can significantly improve performance, especially for computationally intensive applications. Vulkan’s explicit design makes it well-suited for multithreaded architectures, allowing for fine-grained control over synchronization and resource access.

As you continue to develop your Vulkan applications, consider how multithreading can help you leverage the full power of modern CPUs, and remember to always measure performance to ensure your threading model is actually beneficial for your specific use case.

[C++ code](_attachments/37_multithreading.cpp)
