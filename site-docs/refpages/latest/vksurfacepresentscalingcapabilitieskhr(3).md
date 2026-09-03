# VkSurfacePresentScalingCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfacePresentScalingCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfacePresentScalingCapabilitiesKHR - Structure describing the presentation scaling capabilities of the surface

The `VkSurfacePresentScalingCapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_surface_maintenance1
typedef struct VkSurfacePresentScalingCapabilitiesKHR {
    VkStructureType             sType;
    void*                       pNext;
    VkPresentScalingFlagsKHR    supportedPresentScaling;
    VkPresentGravityFlagsKHR    supportedPresentGravityX;
    VkPresentGravityFlagsKHR    supportedPresentGravityY;
    VkExtent2D                  minScaledImageExtent;
    VkExtent2D                  maxScaledImageExtent;
} VkSurfacePresentScalingCapabilitiesKHR;

// Provided by VK_EXT_surface_maintenance1
// Equivalent to VkSurfacePresentScalingCapabilitiesKHR
typedef VkSurfacePresentScalingCapabilitiesKHR VkSurfacePresentScalingCapabilitiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`supportedPresentScaling` is a bitmask of
[VkPresentScalingFlagBitsKHR](VkPresentScalingFlagBitsKHR.html) representing the scaling methods
supported by the surface, or `0` if application-defined scaling is not
supported.

* 
`supportedPresentGravityX` is a bitmask of
[VkPresentGravityFlagBitsKHR](VkPresentGravityFlagBitsKHR.html) representing the X-axis pixel gravity
supported by the surface, or `0` if Vulkan-defined pixel gravity is not
supported for the X axis.

* 
`supportedPresentGravityY` is a bitmask of
[VkPresentGravityFlagBitsKHR](VkPresentGravityFlagBitsKHR.html) representing the Y-axis pixel gravity
supported by the surface, or `0` if Vulkan-defined pixel gravity is not
supported for the Y axis.

* 
`minScaledImageExtent` contains the smallest valid swapchain extent
for the surface on the specified device when one of the scaling methods
specified in `supportedPresentScaling` is used, or the special value
(0xFFFFFFFF, 0xFFFFFFFF) indicating that the surface size will be
determined by the extent of a swapchain targeting the surface.
The `width` and `height` of the extent will each be smaller than
or equal to the corresponding `width` and `height` of
[VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`minImageExtent`.

* 
`maxScaledImageExtent` contains the largest valid swapchain extent
for the surface on the specified device when one of the scaling methods
specified in `supportedPresentScaling` is used, or the special value
described above for `minScaledImageExtent`.
The `width` and `height` of the extent will each be greater than
or equal to the corresponding `width` and `height` of
[VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`maxImageExtent`.

To query the set of supported scaling modes for a given present mode, add a
[VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html) structure in the `pNext` chain of
[VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html) when calling
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html).
The implementation **must** return the same values in
`VkSurfacePresentScalingCapabilitiesKHR` for any of the compatible
present modes as obtained through
[VkSurfacePresentModeCompatibilityKHR](VkSurfacePresentModeCompatibilityKHR.html).

The application **can** specify the scaling mode when creating a swapchain
through the use of [VkSwapchainPresentScalingCreateInfoKHR](VkSwapchainPresentScalingCreateInfoKHR.html).

Valid Usage (Implicit)

* 
[](#VUID-VkSurfacePresentScalingCapabilitiesKHR-sType-sType) VUID-VkSurfacePresentScalingCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_PRESENT_SCALING_CAPABILITIES_KHR](VkStructureType.html)

* 
[](#VUID-VkSurfacePresentScalingCapabilitiesKHR-supportedPresentScaling-parameter) VUID-VkSurfacePresentScalingCapabilitiesKHR-supportedPresentScaling-parameter

 `supportedPresentScaling` **must** be a valid combination of [VkPresentScalingFlagBitsKHR](VkPresentScalingFlagBitsKHR.html) values

* 
[](#VUID-VkSurfacePresentScalingCapabilitiesKHR-supportedPresentGravityX-parameter) VUID-VkSurfacePresentScalingCapabilitiesKHR-supportedPresentGravityX-parameter

 `supportedPresentGravityX` **must** be a valid combination of [VkPresentGravityFlagBitsKHR](VkPresentGravityFlagBitsKHR.html) values

* 
[](#VUID-VkSurfacePresentScalingCapabilitiesKHR-supportedPresentGravityY-parameter) VUID-VkSurfacePresentScalingCapabilitiesKHR-supportedPresentGravityY-parameter

 `supportedPresentGravityY` **must** be a valid combination of [VkPresentGravityFlagBitsKHR](VkPresentGravityFlagBitsKHR.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_EXT_surface_maintenance1](VK_EXT_surface_maintenance1.html), [VK_KHR_surface_maintenance1](VK_KHR_surface_maintenance1.html), [VkExtent2D](VkExtent2D.html), [VkPresentGravityFlagsKHR](VkPresentGravityFlagsKHR.html), [VkPresentScalingFlagsKHR](VkPresentScalingFlagsKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfacePresentScalingCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
