# vkCreateAndroidSurfaceKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateAndroidSurfaceKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateAndroidSurfaceKHR - Create a [VkSurfaceKHR](VkSurfaceKHR.html) object for an Android native window

To create a `VkSurfaceKHR` object for an Android native window, call:

// Provided by VK_KHR_android_surface
VkResult vkCreateAndroidSurfaceKHR(
    VkInstance                                  instance,
    const VkAndroidSurfaceCreateInfoKHR*        pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkAndroidSurfaceCreateInfoKHR](VkAndroidSurfaceCreateInfoKHR.html)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](VkSurfaceKHR.html) handle in which the
created surface object is returned.

During the lifetime of a surface created using a particular
`ANativeWindow` handle any attempts to create another surface for the
same `ANativeWindow` and any attempts to connect to the same
`ANativeWindow` through other platform mechanisms will fail.

|  | In particular, only one `VkSurfaceKHR` **can** exist at a time for a given
| --- | --- |
window.
Similarly, a native window **cannot** be used by both a `VkSurfaceKHR` and
`EGLSurface` simultaneously. |

If successful, `vkCreateAndroidSurfaceKHR` increments the
`ANativeWindow`’s reference count, and `vkDestroySurfaceKHR` will
decrement it.

On Android, when a swapchain’s `imageExtent` does not match the
surface’s `currentExtent`, the presentable images will be scaled to the
surface’s dimensions during presentation.
`minImageExtent` is (1,1), and `maxImageExtent` is the maximum
image size supported by the consumer.
For the system compositor, `currentExtent` is the window size (i.e. the
consumer’s preferred size).

Valid Usage (Implicit)

* 
[](#VUID-vkCreateAndroidSurfaceKHR-instance-parameter) VUID-vkCreateAndroidSurfaceKHR-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkCreateAndroidSurfaceKHR-pCreateInfo-parameter) VUID-vkCreateAndroidSurfaceKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkAndroidSurfaceCreateInfoKHR](VkAndroidSurfaceCreateInfoKHR.html) structure

* 
[](#VUID-vkCreateAndroidSurfaceKHR-pAllocator-parameter) VUID-vkCreateAndroidSurfaceKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateAndroidSurfaceKHR-pSurface-parameter) VUID-vkCreateAndroidSurfaceKHR-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](VkSurfaceKHR.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_android_surface](VK_KHR_android_surface.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkAndroidSurfaceCreateInfoKHR](VkAndroidSurfaceCreateInfoKHR.html), [VkInstance](VkInstance.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateAndroidSurfaceKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
