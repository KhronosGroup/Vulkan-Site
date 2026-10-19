# vkCreateViSurfaceNN(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateViSurfaceNN.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateViSurfaceNN - Create a [VkSurfaceKHR](VkSurfaceKHR.html) object for a VI layer

To create a `VkSurfaceKHR` object for an `nn`::`vi`::`Layer`,
query the layer’s native handle using
`nn`::`vi`::`GetNativeWindow`, and then call:

// Provided by VK_NN_vi_surface
VkResult vkCreateViSurfaceNN(
    VkInstance                                  instance,
    const VkViSurfaceCreateInfoNN*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance with which to associate the surface.

* 
`pCreateInfo` is a pointer to a [VkViSurfaceCreateInfoNN](VkViSurfaceCreateInfoNN.html)
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
`nn`::`vi`::`NativeWindowHandle`, applications **must** not attempt to
create another surface for the same `nn`::`vi`::`Layer` or attempt
to connect to the same `nn`::`vi`::`Layer` through other platform
mechanisms.

If the native window is created with a specified size, `currentExtent`
will reflect that size.
In this case, applications should use the same size for the swapchain’s
`imageExtent`.
Otherwise, the `currentExtent` will have the special value
(0xFFFFFFFF, 0xFFFFFFFF), indicating that applications are expected to
choose an appropriate size for the swapchain’s `imageExtent` (e.g., by
matching the result of a call to
`nn`::`vi`::`GetDisplayResolution`).

Valid Usage (Implicit)

* 
[](#VUID-vkCreateViSurfaceNN-instance-parameter) VUID-vkCreateViSurfaceNN-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkCreateViSurfaceNN-pCreateInfo-parameter) VUID-vkCreateViSurfaceNN-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkViSurfaceCreateInfoNN](VkViSurfaceCreateInfoNN.html) structure

* 
[](#VUID-vkCreateViSurfaceNN-pAllocator-parameter) VUID-vkCreateViSurfaceNN-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateViSurfaceNN-pSurface-parameter) VUID-vkCreateViSurfaceNN-pSurface-parameter

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

[VK_NN_vi_surface](VK_NN_vi_surface.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkInstance](VkInstance.html), [VkSurfaceKHR](VkSurfaceKHR.html), [VkViSurfaceCreateInfoNN](VkViSurfaceCreateInfoNN.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateViSurfaceNN).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
