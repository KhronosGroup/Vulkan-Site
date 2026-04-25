# vkCreateSurfaceOHOS(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateSurfaceOHOS.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateSurfaceOHOS - Create a [VkSurfaceKHR](VkSurfaceKHR.html) object for an Open Harmony OS native window

To create a `VkSurfaceKHR` object on Open Harmony OS platform, call:

// Provided by VK_OHOS_surface
VkResult vkCreateSurfaceOHOS(
    VkInstance                                  instance,
    const VkSurfaceCreateInfoOHOS*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkSurfaceCreateInfoOHOS](VkSurfaceCreateInfoOHOS.html)
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
[](#VUID-vkCreateSurfaceOHOS-instance-parameter) VUID-vkCreateSurfaceOHOS-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkCreateSurfaceOHOS-pCreateInfo-parameter) VUID-vkCreateSurfaceOHOS-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkSurfaceCreateInfoOHOS](VkSurfaceCreateInfoOHOS.html) structure

* 
[](#VUID-vkCreateSurfaceOHOS-pAllocator-parameter) VUID-vkCreateSurfaceOHOS-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateSurfaceOHOS-pSurface-parameter) VUID-vkCreateSurfaceOHOS-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](VkSurfaceKHR.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_SURFACE_LOST_KHR](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_OHOS_surface](VK_OHOS_surface.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkInstance](VkInstance.html), [VkSurfaceCreateInfoOHOS](VkSurfaceCreateInfoOHOS.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateSurfaceOHOS).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
