# vkAcquireNextImageKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkAcquireNextImageKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkAcquireNextImageKHR - Retrieve the index of the next available presentable image

To acquire an available presentable image to use, and retrieve the index of
that image, call:

// Provided by VK_KHR_swapchain
VkResult vkAcquireNextImageKHR(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    uint64_t                                    timeout,
    VkSemaphore                                 semaphore,
    VkFence                                     fence,
    uint32_t*                                   pImageIndex);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the non-retired swapchain from which an image is
being acquired.

* 
`timeout` specifies how long the function waits, in nanoseconds, if
no image is available.

* 
`semaphore` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a semaphore defining a
[semaphore signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling).

* 
`fence` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a fence to signal.

* 
`pImageIndex` is a pointer to a `uint32_t` in which the index of
the next image to use (i.e. an index into the array of images returned
by `vkGetSwapchainImagesKHR`) is returned.

If the `swapchain` has been created with the
[VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html) flag, the image
whose index is returned in `pImageIndex` will be fully backed by memory
before this call returns to the application, as if it is bound completely
and contiguously to a single `VkDeviceMemory` object.

If `semaphore` defines a
[semaphore signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling), its
first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes acquisition of the image.

Valid Usage

* 
[](#VUID-vkAcquireNextImageKHR-swapchain-01285) VUID-vkAcquireNextImageKHR-swapchain-01285

`swapchain` **must** not be in the retired state

* 
[](#VUID-vkAcquireNextImageKHR-semaphore-01286) VUID-vkAcquireNextImageKHR-semaphore-01286

If `semaphore` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** be unsignaled

* 
[](#VUID-vkAcquireNextImageKHR-semaphore-01779) VUID-vkAcquireNextImageKHR-semaphore-01779

If `semaphore` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** not have any
uncompleted signal or wait operations pending

* 
[](#VUID-vkAcquireNextImageKHR-fence-01287) VUID-vkAcquireNextImageKHR-fence-01287

If `fence` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `fence` **must** be
unsignaled

* 
[](#VUID-vkAcquireNextImageKHR-fence-10066) VUID-vkAcquireNextImageKHR-fence-10066

If `fence` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `fence` **must** not be
associated with any other queue command that has not yet completed
execution on that queue

* 
[](#VUID-vkAcquireNextImageKHR-semaphore-01780) VUID-vkAcquireNextImageKHR-semaphore-01780

`semaphore` and `fence` **must** not both be equal to
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkAcquireNextImageKHR-surface-07783) VUID-vkAcquireNextImageKHR-surface-07783

If [forward progress](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#swapchain-acquire-forward-progress) cannot be
guaranteed for the `surface` used to create the `swapchain`
member of `pAcquireInfo`, `timeout` **must** not be `UINT64_MAX`

* 
[](#VUID-vkAcquireNextImageKHR-semaphore-03265) VUID-vkAcquireNextImageKHR-semaphore-03265

`semaphore` **must** have a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_BINARY](VkSemaphoreType.html)

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireNextImageKHR-device-parameter) VUID-vkAcquireNextImageKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkAcquireNextImageKHR-swapchain-parameter) VUID-vkAcquireNextImageKHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkAcquireNextImageKHR-semaphore-parameter) VUID-vkAcquireNextImageKHR-semaphore-parameter

 If `semaphore` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `semaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-vkAcquireNextImageKHR-fence-parameter) VUID-vkAcquireNextImageKHR-fence-parameter

 If `fence` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `fence` **must** be a valid [VkFence](VkFence.html) handle

* 
[](#VUID-vkAcquireNextImageKHR-pImageIndex-parameter) VUID-vkAcquireNextImageKHR-pImageIndex-parameter

 `pImageIndex` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkAcquireNextImageKHR-swapchain-parent) VUID-vkAcquireNextImageKHR-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkAcquireNextImageKHR-semaphore-parent) VUID-vkAcquireNextImageKHR-semaphore-parent

 If `semaphore` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkAcquireNextImageKHR-fence-parent) VUID-vkAcquireNextImageKHR-fence-parent

 If `fence` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

* 
Host access to `semaphore` **must** be externally synchronized

* 
Host access to `fence` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](VkResult.html)

* 
[VK_SUBOPTIMAL_KHR](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

* 
[VK_TIMEOUT](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](VkResult.html)

* 
[VK_ERROR_OUT_OF_DATE_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_SURFACE_LOST_KHR](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_swapchain](VK_KHR_swapchain.html), [VkDevice](VkDevice.html), [VkFence](VkFence.html), [VkSemaphore](VkSemaphore.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkAcquireNextImageKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
