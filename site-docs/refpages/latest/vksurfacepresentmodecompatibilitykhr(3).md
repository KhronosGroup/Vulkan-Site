# VkSurfacePresentModeCompatibilityKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfacePresentModeCompatibilityKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfacePresentModeCompatibilityKHR - Structure describing the subset of compatible presentation modes for the purposes of switching without swapchain recreation

The `VkSurfacePresentModeCompatibilityKHR` structure is defined as:

// Provided by VK_KHR_surface_maintenance1
typedef struct VkSurfacePresentModeCompatibilityKHR {
    VkStructureType      sType;
    void*                pNext;
    uint32_t             presentModeCount;
    VkPresentModeKHR*    pPresentModes;
} VkSurfacePresentModeCompatibilityKHR;

// Provided by VK_EXT_surface_maintenance1
// Equivalent to VkSurfacePresentModeCompatibilityKHR
typedef VkSurfacePresentModeCompatibilityKHR VkSurfacePresentModeCompatibilityEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentModeCount` is an integer related to the number of present
modes available or queried, as described below.

* 
`pPresentModes` is a pointer to an array of [VkPresentModeKHR](VkPresentModeKHR.html)
in which present modes compatible with a given present mode are
returned.

If `pPresentModes` is `NULL`, then the number of present modes that are
compatible with the one specified in [VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html) is
returned in `presentModeCount`.
Otherwise, `presentModeCount` **must** be set by the application to the
number of elements in the `pPresentModes` array, and on return is
overwritten with the number of values actually written to
`pPresentModes`.
If the value of `presentModeCount` is less than the number of compatible
present modes that are supported, at most `presentModeCount` values will
be written to `pPresentModes`.
The implementation **must** include the present mode passed to
[VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html) in `pPresentModes`, unless
`presentModeCount` is zero.

To query the set of present modes compatible with a given initial present
mode, add a [VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html) structure in the `pNext` chain
of [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html) when calling
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html).

The application **can** create a swapchain whose present mode **can** be modified
through the use of [VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html).

Valid Usage (Implicit)

* 
[](#VUID-VkSurfacePresentModeCompatibilityKHR-sType-sType) VUID-VkSurfacePresentModeCompatibilityKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_COMPATIBILITY_KHR](VkStructureType.html)

* 
[](#VUID-VkSurfacePresentModeCompatibilityKHR-pPresentModes-parameter) VUID-VkSurfacePresentModeCompatibilityKHR-pPresentModes-parameter

 If `presentModeCount` is not `0`, and `pPresentModes` is not `NULL`, `pPresentModes` **must** be a valid pointer to an array of `presentModeCount` [VkPresentModeKHR](VkPresentModeKHR.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_EXT_surface_maintenance1](VK_EXT_surface_maintenance1.html), [VK_KHR_surface_maintenance1](VK_KHR_surface_maintenance1.html), [VkPresentModeKHR](VkPresentModeKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfacePresentModeCompatibilityKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
