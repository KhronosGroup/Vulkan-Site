# vkCreateWin32SurfaceKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateWin32SurfaceKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateWin32SurfaceKHR - Create a VkSurfaceKHR object for a Win32 native window

To create a `VkSurfaceKHR` object for a Win32 window, call:

// Provided by VK_KHR_win32_surface
VkResult vkCreateWin32SurfaceKHR(
    VkInstance                                  instance,
    const VkWin32SurfaceCreateInfoKHR*          pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkWin32SurfaceCreateInfoKHR](VkWin32SurfaceCreateInfoKHR.html)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](VkSurfaceKHR.html) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateWin32SurfaceKHR-instance-parameter) VUID-vkCreateWin32SurfaceKHR-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkCreateWin32SurfaceKHR-pCreateInfo-parameter) VUID-vkCreateWin32SurfaceKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkWin32SurfaceCreateInfoKHR](VkWin32SurfaceCreateInfoKHR.html) structure

* 
[](#VUID-vkCreateWin32SurfaceKHR-pAllocator-parameter) VUID-vkCreateWin32SurfaceKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateWin32SurfaceKHR-pSurface-parameter) VUID-vkCreateWin32SurfaceKHR-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](VkSurfaceKHR.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

Some Vulkan functions **may** call the `SendMessage` system API when
interacting with a `VkSurfaceKHR` through a `VkSwapchainKHR`.
In a multithreaded environment, calling `SendMessage` from a thread that is
not the thread associated with `pCreateInfo->hwnd` will block until the
application has processed the window message.
Thus, applications **should** either call these Vulkan functions on the message
pump thread, or make sure their message pump is actively running.
Failing to do so **may** result in deadlocks.

The functions subject to this requirement are:

* 
[vkCreateSwapchainKHR](vkCreateSwapchainKHR.html)

* 
[vkDestroySwapchainKHR](vkDestroySwapchainKHR.html)

* 
[vkAcquireNextImageKHR](vkAcquireNextImageKHR.html) and [vkAcquireNextImage2KHR](vkAcquireNextImage2KHR.html)

* 
[vkQueuePresentKHR](vkQueuePresentKHR.html)

* 
[vkReleaseSwapchainImagesKHR](vkReleaseSwapchainImagesKHR.html)

* 
[vkAcquireFullScreenExclusiveModeEXT](vkAcquireFullScreenExclusiveModeEXT.html)

* 
[vkReleaseFullScreenExclusiveModeEXT](vkReleaseFullScreenExclusiveModeEXT.html)

* 
[vkSetHdrMetadataEXT](vkSetHdrMetadataEXT.html)

[VK_KHR_win32_surface](VK_KHR_win32_surface.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkInstance](VkInstance.html), [VkSurfaceKHR](VkSurfaceKHR.html), [VkWin32SurfaceCreateInfoKHR](VkWin32SurfaceCreateInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateWin32SurfaceKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
