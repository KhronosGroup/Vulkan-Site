# vkCreateDirectFBSurfaceEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateDirectFBSurfaceEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateDirectFBSurfaceEXT - Create a [VkSurfaceKHR](VkSurfaceKHR.html) object for a DirectFB surface

To create a `VkSurfaceKHR` object for a DirectFB surface, call:

// Provided by VK_EXT_directfb_surface
VkResult vkCreateDirectFBSurfaceEXT(
    VkInstance                                  instance,
    const VkDirectFBSurfaceCreateInfoEXT*       pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkDirectFBSurfaceCreateInfoEXT](VkDirectFBSurfaceCreateInfoEXT.html)
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
[](#VUID-vkCreateDirectFBSurfaceEXT-instance-parameter) VUID-vkCreateDirectFBSurfaceEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkCreateDirectFBSurfaceEXT-pCreateInfo-parameter) VUID-vkCreateDirectFBSurfaceEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDirectFBSurfaceCreateInfoEXT](VkDirectFBSurfaceCreateInfoEXT.html) structure

* 
[](#VUID-vkCreateDirectFBSurfaceEXT-pAllocator-parameter) VUID-vkCreateDirectFBSurfaceEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateDirectFBSurfaceEXT-pSurface-parameter) VUID-vkCreateDirectFBSurfaceEXT-pSurface-parameter

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

[VK_EXT_directfb_surface](VK_EXT_directfb_surface.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDirectFBSurfaceCreateInfoEXT](VkDirectFBSurfaceCreateInfoEXT.html), [VkInstance](VkInstance.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateDirectFBSurfaceEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
