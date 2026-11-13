# vkCreateIOSSurfaceMVK(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateIOSSurfaceMVK.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateIOSSurfaceMVK - Create a VkSurfaceKHR object for an iOS UIView

To create a `VkSurfaceKHR` object for an iOS `UIView` or
`CAMetalLayer`, call:

// Provided by VK_MVK_ios_surface
VkResult vkCreateIOSSurfaceMVK(
    VkInstance                                  instance,
    const VkIOSSurfaceCreateInfoMVK*            pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance with which to associate the surface.

* 
`pCreateInfo` is a pointer to a [VkIOSSurfaceCreateInfoMVK](VkIOSSurfaceCreateInfoMVK.html)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](VkSurfaceKHR.html) handle in which the
created surface object is returned.

|  | The `vkCreateIOSSurfaceMVK` function is considered legacy and has been
| --- | --- |
superseded by [vkCreateMetalSurfaceEXT](vkCreateMetalSurfaceEXT.html) from the
`[VK_EXT_metal_surface](VK_EXT_metal_surface.html)` extension. |

Valid Usage (Implicit)

* 
[](#VUID-vkCreateIOSSurfaceMVK-instance-parameter) VUID-vkCreateIOSSurfaceMVK-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkCreateIOSSurfaceMVK-pCreateInfo-parameter) VUID-vkCreateIOSSurfaceMVK-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkIOSSurfaceCreateInfoMVK](VkIOSSurfaceCreateInfoMVK.html) structure

* 
[](#VUID-vkCreateIOSSurfaceMVK-pAllocator-parameter) VUID-vkCreateIOSSurfaceMVK-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateIOSSurfaceMVK-pSurface-parameter) VUID-vkCreateIOSSurfaceMVK-pSurface-parameter

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

[VK_MVK_ios_surface](VK_MVK_ios_surface.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkIOSSurfaceCreateInfoMVK](VkIOSSurfaceCreateInfoMVK.html), [VkInstance](VkInstance.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateIOSSurfaceMVK).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
