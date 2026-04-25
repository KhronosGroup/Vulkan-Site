# Frames in flight

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/03_Drawing_a_triangle/03_Drawing/03_Frames_in_flight.html

## Content

Right now our render loop has one glaring flaw.
We are required to wait on the previous frame to finish before we can start rendering the next which results in unnecessary idling of the host.

The way to fix this is to allow multiple frames to be *in-flight* at once, that  is to say, allow the rendering of one frame to not interfere with the recording of the next.
How do we do this?
Any resource that is accessed and modified during rendering must be duplicated.
Thus, we need multiple command buffers, semaphores, and fences.
In later chapters, we will also add multiple instances of other resources, so we will see this concept reappear.

Start by adding a constant at the top of the program that defines how many frames should be processed concurrently:

constexpr int MAX_FRAMES_IN_FLIGHT = 2;

We choose the number 2 because we don’t want the CPU to get *too* far ahead of the GPU.
With two frames in flight, the CPU and the GPU can be working on their own tasks at the same time.
If the CPU finishes early, it will wait till the GPU finishes rendering before submitting more work.
With three or more frames in flight, the CPU could get ahead of the GPU, adding frames of latency.
Generally, extra latency isn’t desired.
But giving the application control over the number of frames in flight is another example of Vulkan being explicit.

Each frame should have its own command buffer, set of semaphores, and fence.
Rename and then change them to be `std::vector`s of the objects:

std::vector commandBuffers;

...

std::vector presentCompleteSemaphores;
std::vector renderFinishedSemaphores;
std::vector inFlightFences;

Then we need to create multiple command buffers.
Rename `createCommandBuffer` to `createCommandBuffers`.
Next we need to resize the command buffers vector to the size of `MAX_FRAMES_IN_FLIGHT`, alter the `VkCommandBufferAllocateInfo` to contain that many command buffers, and then change the destination to our vector of command buffers:

void createCommandBuffers() {
    commandBuffers.clear();
    vk::CommandBufferAllocateInfo allocInfo{ .commandPool = commandPool, .level = vk::CommandBufferLevel::ePrimary,
                                           .commandBufferCount = MAX_FRAMES_IN_FLIGHT };
    commandBuffers = vk::raii::CommandBuffers( device, allocInfo );
}

The `createSyncObjects` function should be changed to create all the objects:

void createSyncObjects() {
		assert(presentCompleteSemaphores.empty() && renderFinishedSemaphores.empty() && inFlightFences.empty());

		for (size_t i = 0; i 

To use the right objects every frame, we need to keep track of the current frame.
We will use a frame index for that purpose:

uint32_t frameIndex 0;

The `drawFrame` function can now be modified to use the right objects:

void drawFrame() {
		auto fenceResult = device.waitForFences(*inFlightFences[frameIndex], vk::True, UINT64_MAX);
		if (fenceResult != vk::Result::eSuccess)
		{
			throw std::runtime_error("failed to wait for fence!");
		}
		device.resetFences(*inFlightFences[frameIndex]);

		auto [result, imageIndex] = swapChain.acquireNextImage(UINT64_MAX, *presentCompleteSemaphores[frameIndex], nullptr);

		commandBuffers[frameIndex].reset();
		recordCommandBuffer(imageIndex);

		vk::PipelineStageFlags waitDestinationStageMask(vk::PipelineStageFlagBits::eColorAttachmentOutput);
		const vk::SubmitInfo   submitInfo{.waitSemaphoreCount   = 1,
		                                  .pWaitSemaphores      = &*presentCompleteSemaphores[frameIndex],
		                                  .pWaitDstStageMask    = &waitDestinationStageMask,
		                                  .commandBufferCount   = 1,
		                                  .pCommandBuffers      = &*commandBuffers[frameIndex],
		                                  .signalSemaphoreCount = 1,
		                                  .pSignalSemaphores    = &*renderFinishedSemaphores[imageIndex]};
		queue.submit(submitInfo, *inFlightFences[frameIndex]);
}

Of course, we shouldn’t forget to advance to the next frame every time:

void drawFrame() {
    ...

    frameIndex = (frameIndex + 1) % MAX_FRAMES_IN_FLIGHT;
}

By using the modulo (%) operator, we ensure that the frame index loops around after every `MAX_FRAMES_IN_FLIGHT` enqueued frames.

We’ve now implemented all the necessary synchronization to ensure that there
are no more than `MAX_FRAMES_IN_FLIGHT` frames of work enqueued and that
these frames are not stepping over each other.
Note that it is fine for other parts of the code, like the final cleanup, to rely on more rough synchronization like `vkDeviceWaitIdle`.
You should decide on which approach to use based on performance requirements.

Additionally, we could use timeline semaphores instead of the binary
semaphores presented here.  To see an example of how to use timeline
semaphores, look at [compute shader chapter](../../11_Compute_Shader.html)
.  Note that timeline semaphores are especially useful for dealing with a
compute and a graphics queue as in that example.  This method of simple
binary semaphores could be thought of as the more traditional approach to
synchronization.

To learn more about synchronization through examples, have a look at [this extensive overview](https://github.com/KhronosGroup/Vulkan-Docs/wiki/Synchronization-Examples#swapchain-image-acquire-and-present) by Khronos.

In the [next
chapter](../04_Swap_chain_recreation.html) we’ll deal with one more small thing required for a well-behaved Vulkan program.

[C++ code](../../_attachments/16_frames_in_flight.cpp) /
[Slang shader](../../_attachments/09_shader_base.slang) /
[GLSL Vertex shader](../../_attachments/09_shader_base.vert) /
[GLSL Fragment shader](../../_attachments/09_shader_base.frag)
