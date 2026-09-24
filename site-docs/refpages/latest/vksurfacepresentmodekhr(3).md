# VkSurfacePresentModeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfacePresentModeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfacePresentModeKHR - Structure describing present mode of a surface

The `VkSurfacePresentModeKHR` structure is defined as:

// Provided by VK_KHR_surface_maintenance1
typedef struct VkSurfacePresentModeKHR {
    VkStructureType     sType;
    void*               pNext;
    VkPresentModeKHR    presentMode;
} VkSurfacePresentModeKHR;

// Provided by VK_EXT_surface_maintenance1
// Equivalent to VkSurfacePresentModeKHR
typedef VkSurfacePresentModeKHR VkSurfacePresentModeEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentMode` is the presentation mode the swapchain will use.

If the `VkSurfacePresentModeKHR` structure is included in the
`pNext` chain of [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html), the values
returned in [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`minImageCount`,
[VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`maxImageCount`,
[VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html)::`minScaledImageExtent`,
and [VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html)::`maxScaledImageExtent`
are valid only for the specified `presentMode`.
If `presentMode` is [VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html) or
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html), the per-present mode
image counts **must** both be one.
The per-present mode image counts **may** be less-than or greater-than the
image counts returned when `VkSurfacePresentModeKHR` is not provided.

|  | If [VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html) is provided to swapchain
| --- | --- |
creation, the requirements for forward progress may be less strict.
For example, a FIFO swapchain might only require 2 images to guarantee
forward progress, but a MAILBOX one might require 4.
Without the per-present image counts, such an implementation would have to
return 4 in [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`minImageCount`, which
pessimizes FIFO.
Conversely, an implementation may return a low number for minImageCount, but
internally bump the image count when application queries
[vkGetSwapchainImagesKHR](vkGetSwapchainImagesKHR.html), which can surprise applications, and is not
discoverable until swapchain creation.
Using `VkSurfacePresentModeKHR` and
[VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html) together effectively removes this
problem.

[VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html) is required for the specification
to be backwards compatible with applications that do not know about, or make
use of this feature. |

Valid Usage

* 
[](#VUID-VkSurfacePresentModeKHR-presentMode-07780) VUID-VkSurfacePresentModeKHR-presentMode-07780

`presentMode` **must** be a value reported by
[vkGetPhysicalDeviceSurfacePresentModesKHR](vkGetPhysicalDeviceSurfacePresentModesKHR.html) for the specified
surface

Valid Usage (Implicit)

* 
[](#VUID-VkSurfacePresentModeKHR-sType-sType) VUID-VkSurfacePresentModeKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_KHR](VkStructureType.html)

* 
[](#VUID-VkSurfacePresentModeKHR-presentMode-parameter) VUID-VkSurfacePresentModeKHR-presentMode-parameter

 `presentMode` **must** be a valid [VkPresentModeKHR](VkPresentModeKHR.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)

[VK_EXT_surface_maintenance1](VK_EXT_surface_maintenance1.html), [VK_KHR_surface_maintenance1](VK_KHR_surface_maintenance1.html), [VkPresentModeKHR](VkPresentModeKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfacePresentModeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
