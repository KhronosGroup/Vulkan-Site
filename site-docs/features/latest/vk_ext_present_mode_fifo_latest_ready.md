# VK_EXT_present_mode_fifo_latest_ready

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_present_mode_fifo_latest_ready.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [4. Issues](#_issues)
- [4.1. Is the presentation engine required to wait for the next vblank to return images of obsolete present requests?](#_is_the_presentation_engine_required_to_wait_for_the_next_vblank_to_return_images_of_obsolete_present_requests)
- [4.1._Is_the_presentation_engine_required_to_wait_for_the_next_vblank_to_return_images_of_obsolete_present_requests?](#_is_the_presentation_engine_required_to_wait_for_the_next_vblank_to_return_images_of_obsolete_present_requests)
- [4.2. TODO: Should VK_PRESENT_MODE_FIFO_RELAXED_KHR get a corresponding VK_PRESENT_MODE_FIFO_RELAXED_LATEST_READY_EXT?](#_todo_should_vk_present_mode_fifo_relaxed_khr_get_a_corresponding_vk_present_mode_fifo_relaxed_latest_ready_ext)
- [4.2._TODO:_Should_VK_PRESENT_MODE_FIFO_RELAXED_KHR_get_a_corresponding_VK_PRESENT_MODE_FIFO_RELAXED_LATEST_READY_EXT?](#_todo_should_vk_present_mode_fifo_relaxed_khr_get_a_corresponding_vk_present_mode_fifo_relaxed_latest_ready_ext)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)
[4. Issues](#_issues)

[4.1. Is the presentation engine required to wait for the next vblank to return images of obsolete present requests?](#_is_the_presentation_engine_required_to_wait_for_the_next_vblank_to_return_images_of_obsolete_present_requests)
[4.2. TODO: Should VK_PRESENT_MODE_FIFO_RELAXED_KHR get a corresponding VK_PRESENT_MODE_FIFO_RELAXED_LATEST_READY_EXT?](#_todo_should_vk_present_mode_fifo_relaxed_khr_get_a_corresponding_vk_present_mode_fifo_relaxed_latest_ready_ext)

When an application manages to render multiple frames per display refresh cycle,
`VK_PRESENT_MODE_FIFO_KHR` or `VK_PRESENT_MODE_FIFO_RELAXED_KHR` can introduce
some undesired latency, because only the oldest present request in the present
queue is processed during each vertical blanking period. This also effectively
caps an application’s frame rate to the monitor refresh rate.

`VK_PRESENT_MODE_IMMEDIATE_KHR` may cause tearing, so is not a good alternative
when tearing is not desired.

`VK_PRESENT_MODE_MAILBOX_KHR` is currently the only solution to this problem,
but brings its own set of issues:
 * It is challenging to achieve for some implementations.
 * Most importantly, its semantics preclude any useful interaction with
   time-based present APIs, such as `VK_GOOGLE_display_timing` or the one
   proposed in `VK_EXT_present_timing`. Because only a single present
   request is kept in the queue, specifying a present time requires the
   application to know the precise timing of the request in advance to avoid
   it replacing an image with an earlier target time that has not been
   displayed yet.

This extension adds a new present mode, `VK_PRESENT_MODE_FIFO_LATEST_READY_EXT`,
which allows the presentation engine to dequeue multiple present requests during
vblank, in FIFO order, until encountering a request that is not ready. The image
of the last present request to be dequeued is presented to the display. This can
increase an application’s frame rate up to `(swapchainImageCount - 1) *
refreshRate` compared to `VK_PRESENT_MODE_FIFO_KHR`.

While this seems similar in concept to `VK_PRESENT_MODE_MAILBOX_KHR`, the
fundamental difference is that the processing of multiple present requests
is done during vblank. From the application perspective, this means that,
for example, in a flip-based model, a single vblank may cause multiple
swapchain images to be released at once, while `VK_PRESENT_MODE_MAILBOX_KHR`
is continuously releasing images as new requests become ready.

In the absence of a present timing extension, a "ready" request is effectively
any request issued after a `VkPresentInfoKHR’s `pWaitSemaphores` have been
signaled. In that context, this extension does not provide more than
`VK_PRESENT_MODE_MAILBOX_KHR` already offers. However, when using a target
present time, the presentation engine would only dequeue all present requests
for which the specified present time has lapsed.

No, but images must be released in the same (FIFO) order they were presented in.

Undecided.
