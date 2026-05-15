# vkCreateImagePipeSurfaceFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateImagePipeSurfaceFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateImagePipeSurfaceFUCHSIA - Create a [VkSurfaceKHR](VkSurfaceKHR.html) object for a Fuchsia ImagePipe

To create a `VkSurfaceKHR` object for a Fuchsia ImagePipe, call:

// Provided by VK_FUCHSIA_imagepipe_surface
VkResult vkCreateImagePipeSurfaceFUCHSIA(
    VkInstance                                  instance,
    const VkImagePipeSurfaceCreateInfoFUCHSIA*  pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate with the surface.

* 
`pCreateInfo` is a pointer to a
[VkImagePipeSurfaceCreateInfoFUCHSIA](VkImagePipeSurfaceCreateInfoFUCHSIA.html) structure containing
parameters affecting the creation of the surface object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](VkSurfaceKHR.html) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateImagePipeSurfaceFUCHSIA-instance-parameter) VUID-vkCreateImagePipeSurfaceFUCHSIA-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkCreateImagePipeSurfaceFUCHSIA-pCreateInfo-parameter) VUID-vkCreateImagePipeSurfaceFUCHSIA-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkImagePipeSurfaceCreateInfoFUCHSIA](VkImagePipeSurfaceCreateInfoFUCHSIA.html) structure

* 
[](#VUID-vkCreateImagePipeSurfaceFUCHSIA-pAllocator-parameter) VUID-vkCreateImagePipeSurfaceFUCHSIA-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateImagePipeSurfaceFUCHSIA-pSurface-parameter) VUID-vkCreateImagePipeSurfaceFUCHSIA-pSurface-parameter

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

[VK_FUCHSIA_imagepipe_surface](VK_FUCHSIA_imagepipe_surface.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkImagePipeSurfaceCreateInfoFUCHSIA](VkImagePipeSurfaceCreateInfoFUCHSIA.html), [VkInstance](VkInstance.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateImagePipeSurfaceFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
