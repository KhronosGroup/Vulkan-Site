# vkCreateWaylandSurfaceKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateWaylandSurfaceKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateWaylandSurfaceKHR - Create a [VkSurfaceKHR](VkSurfaceKHR.html) object for a Wayland window

To create a `VkSurfaceKHR` object for a Wayland surface, call:

// Provided by VK_KHR_wayland_surface
VkResult vkCreateWaylandSurfaceKHR(
    VkInstance                                  instance,
    const VkWaylandSurfaceCreateInfoKHR*        pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkWaylandSurfaceCreateInfoKHR](VkWaylandSurfaceCreateInfoKHR.html)
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
[](#VUID-vkCreateWaylandSurfaceKHR-instance-parameter) VUID-vkCreateWaylandSurfaceKHR-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkCreateWaylandSurfaceKHR-pCreateInfo-parameter) VUID-vkCreateWaylandSurfaceKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkWaylandSurfaceCreateInfoKHR](VkWaylandSurfaceCreateInfoKHR.html) structure

* 
[](#VUID-vkCreateWaylandSurfaceKHR-pAllocator-parameter) VUID-vkCreateWaylandSurfaceKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateWaylandSurfaceKHR-pSurface-parameter) VUID-vkCreateWaylandSurfaceKHR-pSurface-parameter

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

[VK_KHR_wayland_surface](VK_KHR_wayland_surface.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkInstance](VkInstance.html), [VkSurfaceKHR](VkSurfaceKHR.html), [VkWaylandSurfaceCreateInfoKHR](VkWaylandSurfaceCreateInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateWaylandSurfaceKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
