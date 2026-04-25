# vkDestroySwapchainKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroySwapchainKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroySwapchainKHR - Destroy a swapchain object

To destroy a swapchain object call:

// Provided by VK_KHR_swapchain
void vkDestroySwapchainKHR(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the [VkDevice](VkDevice.html) associated with `swapchain`.

* 
`swapchain` is the swapchain to destroy.

* 
`pAllocator` is the allocator used for host memory allocated for the
swapchain object when there is no more specific allocator available (see
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation)).

The application **must** not destroy a swapchain until after completion of all
outstanding operations on images that were acquired from the swapchain.
`swapchain` and all associated `VkImage` handles are destroyed, and
**must** not be acquired or used any more by the application.
The memory of each `VkImage` will only be freed after that image is no
longer used by the presentation engine.
For example, if one image of the swapchain is being displayed in a window,
the memory for that image **may** not be freed until the window is destroyed,
or another swapchain is created for the window.
Destroying the swapchain does not invalidate the parent `VkSurfaceKHR`,
and a new swapchain **can** be created with it.

When a swapchain associated with a display surface is destroyed, if the
image most recently presented to the display surface is from the swapchain
being destroyed, then either any display resources modified by presenting
images from any swapchain associated with the display surface **must** be
reverted by the implementation to their state prior to the first present
performed on one of these swapchains, or such resources **must** be left in
their current state.

If `swapchain` has exclusive full-screen access, it is released before
the swapchain is destroyed.

Valid Usage

* 
[](#VUID-vkDestroySwapchainKHR-swapchain-01282) VUID-vkDestroySwapchainKHR-swapchain-01282

All uses of presentable images acquired from `swapchain` **must** have
completed execution

* 
[](#VUID-vkDestroySwapchainKHR-swapchain-01283) VUID-vkDestroySwapchainKHR-swapchain-01283

If `VkAllocationCallbacks` were provided when `swapchain` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroySwapchainKHR-swapchain-01284) VUID-vkDestroySwapchainKHR-swapchain-01284

If no `VkAllocationCallbacks` were provided when `swapchain` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroySwapchainKHR-device-parameter) VUID-vkDestroySwapchainKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroySwapchainKHR-swapchain-parameter) VUID-vkDestroySwapchainKHR-swapchain-parameter

 If `swapchain` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkDestroySwapchainKHR-pAllocator-parameter) VUID-vkDestroySwapchainKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroySwapchainKHR-swapchain-parent) VUID-vkDestroySwapchainKHR-swapchain-parent

 If `swapchain` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

[VK_KHR_swapchain](VK_KHR_swapchain.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkDestroySwapchainKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
