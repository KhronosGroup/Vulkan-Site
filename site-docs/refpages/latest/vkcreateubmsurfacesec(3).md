# vkCreateUbmSurfaceSEC(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateUbmSurfaceSEC.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateUbmSurfaceSEC - Create a [VkSurfaceKHR](VkSurfaceKHR.html) object for a UBM surface

To create a `VkSurfaceKHR` object for a UBM surface, call:

// Provided by VK_SEC_ubm_surface
VkResult vkCreateUbmSurfaceSEC(
    VkInstance                                  instance,
    const VkUbmSurfaceCreateInfoSEC*            pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkUbmSurfaceCreateInfoSEC](VkUbmSurfaceCreateInfoSEC.html)
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
[](#VUID-vkCreateUbmSurfaceSEC-instance-parameter) VUID-vkCreateUbmSurfaceSEC-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkCreateUbmSurfaceSEC-pCreateInfo-parameter) VUID-vkCreateUbmSurfaceSEC-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkUbmSurfaceCreateInfoSEC](VkUbmSurfaceCreateInfoSEC.html) structure

* 
[](#VUID-vkCreateUbmSurfaceSEC-pAllocator-parameter) VUID-vkCreateUbmSurfaceSEC-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateUbmSurfaceSEC-pSurface-parameter) VUID-vkCreateUbmSurfaceSEC-pSurface-parameter

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

[VK_SEC_ubm_surface](VK_SEC_ubm_surface.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkInstance](VkInstance.html), [VkSurfaceKHR](VkSurfaceKHR.html), [VkUbmSurfaceCreateInfoSEC](VkUbmSurfaceCreateInfoSEC.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateUbmSurfaceSEC).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
