# VkDisplaySurfaceCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplaySurfaceCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplaySurfaceCreateInfoKHR - Structure specifying parameters of a newly created display plane surface object

The `VkDisplaySurfaceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplaySurfaceCreateInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkDisplaySurfaceCreateFlagsKHR    flags;
    VkDisplayModeKHR                  displayMode;
    uint32_t                          planeIndex;
    uint32_t                          planeStackIndex;
    VkSurfaceTransformFlagBitsKHR     transform;
    float                             globalAlpha;
    VkDisplayPlaneAlphaFlagBitsKHR    alphaMode;
    VkExtent2D                        imageExtent;
} VkDisplaySurfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use, and **must** be zero.

* 
`displayMode` is a [VkDisplayModeKHR](VkDisplayModeKHR.html) handle specifying the mode
to use when displaying this surface.

* 
`planeIndex` is the plane on which this surface appears.

* 
`planeStackIndex` is the z-order of the plane.

* 
`transform` is a [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html) value
specifying the transformation to apply to images as part of the scanout
operation.

* 
`globalAlpha` is the global alpha value.
This value is ignored if `alphaMode` is not
[VK_DISPLAY_PLANE_ALPHA_GLOBAL_BIT_KHR](VkDisplayPlaneAlphaFlagBitsKHR.html).

* 
`alphaMode` is a [VkDisplayPlaneAlphaFlagBitsKHR](VkDisplayPlaneAlphaFlagBitsKHR.html) value
specifying the type of alpha blending to use.

* 
`imageExtent` is the size of the presentable images to use with the
surface.

|  | Creating a display surface **must** not modify the state of the displays,
| --- | --- |
planes, or other resources it names.
For example, it **must** not apply the specified mode to be set on the
associated display.
Application of display configuration occurs as a side effect of presenting
to a display surface. |

Valid Usage

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-planeIndex-01252) VUID-VkDisplaySurfaceCreateInfoKHR-planeIndex-01252

`planeIndex` **must** be less than the number of display planes
supported by the device as determined by calling
`vkGetPhysicalDeviceDisplayPlanePropertiesKHR`

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-planeReorderPossible-01253) VUID-VkDisplaySurfaceCreateInfoKHR-planeReorderPossible-01253

If the `planeReorderPossible` member of the
`VkDisplayPropertiesKHR` structure returned by
`vkGetPhysicalDeviceDisplayPropertiesKHR` for the display
corresponding to `displayMode` is [VK_TRUE](VK_TRUE.html) then
`planeStackIndex` **must** be less than the number of display planes
supported by the device as determined by calling
`vkGetPhysicalDeviceDisplayPlanePropertiesKHR`; otherwise
`planeStackIndex` **must** equal the `currentStackIndex` member of
`VkDisplayPlanePropertiesKHR` returned by
`vkGetPhysicalDeviceDisplayPlanePropertiesKHR` for the display plane
corresponding to `displayMode`

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-alphaMode-01254) VUID-VkDisplaySurfaceCreateInfoKHR-alphaMode-01254

If `alphaMode` is [VK_DISPLAY_PLANE_ALPHA_GLOBAL_BIT_KHR](VkDisplayPlaneAlphaFlagBitsKHR.html) then
`globalAlpha` **must** be between `0` and `1`, inclusive

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-alphaMode-01255) VUID-VkDisplaySurfaceCreateInfoKHR-alphaMode-01255

`alphaMode` **must** be one of the bits present in the
`supportedAlpha` member of `VkDisplayPlaneCapabilitiesKHR` for
the display plane corresponding to `displayMode`

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-transform-06740) VUID-VkDisplaySurfaceCreateInfoKHR-transform-06740

`transform` **must** be one of the bits present in the
`supportedTransforms` member of `VkDisplayPropertiesKHR` for the
display corresponding to `displayMode`

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-width-01256) VUID-VkDisplaySurfaceCreateInfoKHR-width-01256

The `width` and `height` members of `imageExtent` **must** be
less than or equal to
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxImageDimension2D`

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-pNext-10284) VUID-VkDisplaySurfaceCreateInfoKHR-pNext-10284

If the `pNext` chain includes a
[VkDisplaySurfaceStereoCreateInfoNV](VkDisplaySurfaceStereoCreateInfoNV.html) structure whose
`stereoType` member is
[VK_DISPLAY_SURFACE_STEREO_TYPE_HDMI_3D_NV](VkDisplaySurfaceStereoTypeNV.html), then the
`hdmi3DSupported` member of the
[VkDisplayModeStereoPropertiesNV](VkDisplayModeStereoPropertiesNV.html) structure in the `pNext` chain
of the `VkDisplayModeProperties2KHR` structure returned by
[vkGetDisplayModeProperties2KHR](vkGetDisplayModeProperties2KHR.html) for the display mode corresponding
to `displayMode` **must** be [VK_TRUE](VK_TRUE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-sType-sType) VUID-VkDisplaySurfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_SURFACE_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-pNext-pNext) VUID-VkDisplaySurfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDisplaySurfaceStereoCreateInfoNV](VkDisplaySurfaceStereoCreateInfoNV.html)

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-sType-unique) VUID-VkDisplaySurfaceCreateInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-flags-zerobitmask) VUID-VkDisplaySurfaceCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-displayMode-parameter) VUID-VkDisplaySurfaceCreateInfoKHR-displayMode-parameter

 `displayMode` **must** be a valid [VkDisplayModeKHR](VkDisplayModeKHR.html) handle

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-transform-parameter) VUID-VkDisplaySurfaceCreateInfoKHR-transform-parameter

 `transform` **must** be a valid [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html) value

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-alphaMode-parameter) VUID-VkDisplaySurfaceCreateInfoKHR-alphaMode-parameter

 `alphaMode` **must** be a valid [VkDisplayPlaneAlphaFlagBitsKHR](VkDisplayPlaneAlphaFlagBitsKHR.html) value

[VK_KHR_display](VK_KHR_display.html), [VkDisplayModeKHR](VkDisplayModeKHR.html), [VkDisplayPlaneAlphaFlagBitsKHR](VkDisplayPlaneAlphaFlagBitsKHR.html), [VkDisplaySurfaceCreateFlagsKHR](VkDisplaySurfaceCreateFlagsKHR.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html), [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html), [vkCreateDisplayPlaneSurfaceKHR](vkCreateDisplayPlaneSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplaySurfaceCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
