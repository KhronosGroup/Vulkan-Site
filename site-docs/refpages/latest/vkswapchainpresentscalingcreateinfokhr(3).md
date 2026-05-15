# VkSwapchainPresentScalingCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainPresentScalingCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainPresentScalingCreateInfoKHR - Scaling behavior when presenting to the surface

When an application presents a swapchain image with dimensions different
than those of the target surface, different behavior is possible on
different platforms per their respective specifications:

* 
Presentation fails and [VK_ERROR_OUT_OF_DATE_KHR](VkResult.html) is returned

* 
Scaling is done and [VK_SUCCESS](VkResult.html) or [VK_SUBOPTIMAL_KHR](VkResult.html) is
returned

* 
Unspecified scaling using an arbitrary combination of stretching,
centering and/or clipping.

Applications **can** define specific behavior when creating a swapchain by
including the `VkSwapchainPresentScalingCreateInfoKHR` structure in the
`pNext` chain of the [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) structure.

The `VkSwapchainPresentScalingCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain_maintenance1
typedef struct VkSwapchainPresentScalingCreateInfoKHR {
    VkStructureType             sType;
    const void*                 pNext;
    VkPresentScalingFlagsKHR    scalingBehavior;
    VkPresentGravityFlagsKHR    presentGravityX;
    VkPresentGravityFlagsKHR    presentGravityY;
} VkSwapchainPresentScalingCreateInfoKHR;

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to VkSwapchainPresentScalingCreateInfoKHR
typedef VkSwapchainPresentScalingCreateInfoKHR VkSwapchainPresentScalingCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`scalingBehavior` is `0` or the scaling method to use when the
dimensions of the surface and swapchain images differ.

* 
`presentGravityX` is `0` or the x-axis direction in which swapchain
image pixels gravitate relative to the surface when
`scalingBehavior` does not result in a one-to-one pixel mapping
between the scaled swapchain image and the surface.

* 
`presentGravityY` is `0` or the y-axis direction in which swapchain
image pixels gravitate relative to the surface when
`scalingBehavior` does not result in a one-to-one pixel mapping
between the scaled swapchain image and the surface.

If `scalingBehavior` is `0`, the result of presenting a swapchain image
with dimensions that do not match the surface dimensions is implementation
and platform-dependent.
If `presentGravityX` or `presentGravityY` are `0`, the presentation
gravity **must** match that defined by the native platform surface on platforms
which define surface gravity.

Valid Usage

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07765) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07765

If `presentGravityX` is `0`, `presentGravityY` **must** be `0`

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07766) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07766

If `presentGravityX` is not `0`, `presentGravityY` **must** not be
`0`

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-07767) VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-07767

`scalingBehavior` **must** not have more than one bit set

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07768) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07768

`presentGravityX` **must** not have more than one bit set

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-07769) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-07769

`presentGravityY` **must** not have more than one bit set

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-07770) VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-07770

`scalingBehavior` **must** be `0` or a valid scaling method for the
surface as returned in
[VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html)::`supportedPresentScaling`,
given [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)::`presentMode` in
[VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-07771) VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-07771

If the swapchain is created with
[VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html), `scalingBehavior` **must**
be `0` or a valid scaling method for the surface as returned in
[VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html)::`supportedPresentScaling`,
given each present mode in
[VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html)::`pPresentModes` in
[VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07772) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07772

`presentGravityX` **must** be `0` or a valid x-axis present gravity for
the surface as returned in
[VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html)::`supportedPresentGravityX`,
given [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)::`presentMode` in
[VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07773) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07773

If the swapchain is created with
[VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html), `presentGravityX` **must**
be `0` or a valid x-axis present gravity for the surface as returned in
[VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html)::`supportedPresentGravityX`,
given each present mode in
[VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html)::`pPresentModes` in
[VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-07774) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-07774

`presentGravityY` **must** be `0` or a valid y-axis present gravity for
the surface as returned in
[VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html)::`supportedPresentGravityY`,
given [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)::`presentMode` in
[VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-07775) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-07775

If the swapchain is created with
[VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html), `presentGravityY` **must**
be `0` or a valid y-axis present gravity for the surface as returned in
[VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html)::`supportedPresentGravityY`,
given each present mode in
[VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html)::`pPresentModes` in
[VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-swapchainMaintenance1-10154) VUID-VkSwapchainPresentScalingCreateInfoKHR-swapchainMaintenance1-10154

If the [`swapchainMaintenance1`](../../../../spec/latest/chapters/features.html#features-swapchainMaintenance1)
feature is not enabled, then `scalingBehavior`,
`presentGravityX`, and `presentGravityY` **must** be `0`

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-sType-sType) VUID-VkSwapchainPresentScalingCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_SCALING_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-parameter) VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-parameter

 `scalingBehavior` **must** be a valid combination of [VkPresentScalingFlagBitsKHR](VkPresentScalingFlagBitsKHR.html) values

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-parameter) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-parameter

 `presentGravityX` **must** be a valid combination of [VkPresentGravityFlagBitsKHR](VkPresentGravityFlagBitsKHR.html) values

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-parameter) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-parameter

 `presentGravityY` **must** be a valid combination of [VkPresentGravityFlagBitsKHR](VkPresentGravityFlagBitsKHR.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

[VK_EXT_swapchain_maintenance1](VK_EXT_swapchain_maintenance1.html), [VK_KHR_swapchain_maintenance1](VK_KHR_swapchain_maintenance1.html), [VkPresentGravityFlagsKHR](VkPresentGravityFlagsKHR.html), [VkPresentScalingFlagsKHR](VkPresentScalingFlagsKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainPresentScalingCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
