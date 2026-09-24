# VkPresentScalingFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentScalingFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentScalingFlagBitsKHR - Bitmask specifying presentation scaling methods

Bits which **may** be set in
[VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html)::`supportedPresentScaling`,
specifying scaling modes supported by the surface, are:

// Provided by VK_KHR_surface_maintenance1
typedef enum VkPresentScalingFlagBitsKHR {
    VK_PRESENT_SCALING_ONE_TO_ONE_BIT_KHR = 0x00000001,
    VK_PRESENT_SCALING_ASPECT_RATIO_STRETCH_BIT_KHR = 0x00000002,
    VK_PRESENT_SCALING_STRETCH_BIT_KHR = 0x00000004,
    VK_PRESENT_SCALING_ONE_TO_ONE_BIT_EXT = VK_PRESENT_SCALING_ONE_TO_ONE_BIT_KHR,
    VK_PRESENT_SCALING_ASPECT_RATIO_STRETCH_BIT_EXT = VK_PRESENT_SCALING_ASPECT_RATIO_STRETCH_BIT_KHR,
    VK_PRESENT_SCALING_STRETCH_BIT_EXT = VK_PRESENT_SCALING_STRETCH_BIT_KHR,
} VkPresentScalingFlagBitsKHR;

// Provided by VK_EXT_surface_maintenance1
// Equivalent to VkPresentScalingFlagBitsKHR
typedef VkPresentScalingFlagBitsKHR VkPresentScalingFlagBitsEXT;

* 
[VK_PRESENT_SCALING_ONE_TO_ONE_BIT_KHR](#) specifies that no scaling
occurs, and pixels in the swapchain image are mapped to one and only one
pixel in the surface.
The mapping between pixels is defined by the chosen presentation
gravity.

* 
[VK_PRESENT_SCALING_ASPECT_RATIO_STRETCH_BIT_KHR](#) specifies that the
swapchain image will be minified or magnified such that at least one of
the resulting width or height is equal to the corresponding surface
dimension, and the other resulting dimension is less than or equal to
the corresponding surface dimension, with the aspect ratio of the
resulting image being identical to that of the original swapchain image.

* 
[VK_PRESENT_SCALING_STRETCH_BIT_KHR](#) specifies that the swapchain
image will be minified or magnified such that the resulting image
dimensions are equal to those of the surface.

[VK_EXT_surface_maintenance1](VK_EXT_surface_maintenance1.html), [VK_KHR_surface_maintenance1](VK_KHR_surface_maintenance1.html), [VkPresentScalingFlagsKHR](VkPresentScalingFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentScalingFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
