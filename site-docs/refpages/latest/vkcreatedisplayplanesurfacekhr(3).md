# vkCreateDisplayPlaneSurfaceKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateDisplayPlaneSurfaceKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateDisplayPlaneSurfaceKHR - Create a [VkSurfaceKHR](VkSurfaceKHR.html) structure representing a display plane and mode

A complete display configuration includes a mode, one or more display planes
and any parameters describing their behavior, and parameters describing some
aspects of the images associated with those planes.
Display surfaces describe the configuration of a single plane within a
complete display configuration.
To create a `VkSurfaceKHR` object for a display plane, call:

// Provided by VK_KHR_display
VkResult vkCreateDisplayPlaneSurfaceKHR(
    VkInstance                                  instance,
    const VkDisplaySurfaceCreateInfoKHR*        pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance corresponding to the physical device the
targeted display is on.

* 
`pCreateInfo` is a pointer to a [VkDisplaySurfaceCreateInfoKHR](VkDisplaySurfaceCreateInfoKHR.html)
structure specifying which mode, plane, and other parameters to use, as
described below.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](VkSurfaceKHR.html) handle in which the
created surface is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDisplayPlaneSurfaceKHR-instance-parameter) VUID-vkCreateDisplayPlaneSurfaceKHR-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkCreateDisplayPlaneSurfaceKHR-pCreateInfo-parameter) VUID-vkCreateDisplayPlaneSurfaceKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDisplaySurfaceCreateInfoKHR](VkDisplaySurfaceCreateInfoKHR.html) structure

* 
[](#VUID-vkCreateDisplayPlaneSurfaceKHR-pAllocator-parameter) VUID-vkCreateDisplayPlaneSurfaceKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateDisplayPlaneSurfaceKHR-pSurface-parameter) VUID-vkCreateDisplayPlaneSurfaceKHR-pSurface-parameter

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

[VK_KHR_display](VK_KHR_display.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDisplaySurfaceCreateInfoKHR](VkDisplaySurfaceCreateInfoKHR.html), [VkInstance](VkInstance.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateDisplayPlaneSurfaceKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
