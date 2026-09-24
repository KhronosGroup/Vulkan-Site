# VkPresentGravityFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentGravityFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentGravityFlagBitsKHR - Bitmask specifying presentation pixel gravity on either the x or y axis

Bits which **may** be set in the
[VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html)::`supportedPresentGravityX`
or `supportedPresentGravityY` fields, specifying the gravity of
presented pixels supported by the surface, are:

// Provided by VK_KHR_surface_maintenance1
typedef enum VkPresentGravityFlagBitsKHR {
    VK_PRESENT_GRAVITY_MIN_BIT_KHR = 0x00000001,
    VK_PRESENT_GRAVITY_MAX_BIT_KHR = 0x00000002,
    VK_PRESENT_GRAVITY_CENTERED_BIT_KHR = 0x00000004,
    VK_PRESENT_GRAVITY_MIN_BIT_EXT = VK_PRESENT_GRAVITY_MIN_BIT_KHR,
    VK_PRESENT_GRAVITY_MAX_BIT_EXT = VK_PRESENT_GRAVITY_MAX_BIT_KHR,
    VK_PRESENT_GRAVITY_CENTERED_BIT_EXT = VK_PRESENT_GRAVITY_CENTERED_BIT_KHR,
} VkPresentGravityFlagBitsKHR;

// Provided by VK_EXT_surface_maintenance1
// Equivalent to VkPresentGravityFlagBitsKHR
typedef VkPresentGravityFlagBitsKHR VkPresentGravityFlagBitsEXT;

* 
[VK_PRESENT_GRAVITY_MIN_BIT_KHR](#) means that the pixels will
gravitate towards the top or left side of the surface.

* 
[VK_PRESENT_GRAVITY_MAX_BIT_KHR](#) means that the pixels will
gravitate towards the bottom or right side of the surface.

* 
[VK_PRESENT_GRAVITY_CENTERED_BIT_KHR](#) means that the pixels will be
centered in the surface.

If the value in [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html)::`currentTransform` is
not [VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), it is
implementation-defined whether the gravity configuration applies to the
presented image before or after transformation.

[VK_EXT_surface_maintenance1](VK_EXT_surface_maintenance1.html), [VK_KHR_surface_maintenance1](VK_KHR_surface_maintenance1.html), [VkPresentGravityFlagsKHR](VkPresentGravityFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentGravityFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
