# VkDisplayModeParametersKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayModeParametersKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayModeParametersKHR - Structure describing display parameters associated with a display mode

The `VkDisplayModeParametersKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplayModeParametersKHR {
    VkExtent2D    visibleRegion;
    uint32_t      refreshRate;
} VkDisplayModeParametersKHR;

* 
`visibleRegion` is the 2D extents of the visible region.

* 
`refreshRate` is a `uint32_t` that is the number of times the
display is refreshed each second multiplied by 1000.

|  | For example, a 60Hz display mode would report a `refreshRate` of 60,000. |
| --- | --- |

Valid Usage

* 
[](#VUID-VkDisplayModeParametersKHR-width-01990) VUID-VkDisplayModeParametersKHR-width-01990

The `width` member of `visibleRegion` **must** be greater than `0`

* 
[](#VUID-VkDisplayModeParametersKHR-height-01991) VUID-VkDisplayModeParametersKHR-height-01991

The `height` member of `visibleRegion` **must** be greater than `0`

* 
[](#VUID-VkDisplayModeParametersKHR-refreshRate-01992) VUID-VkDisplayModeParametersKHR-refreshRate-01992

`refreshRate` **must** be greater than `0`

[VK_KHR_display](VK_KHR_display.html), [VkDisplayModeCreateInfoKHR](VkDisplayModeCreateInfoKHR.html), [VkDisplayModePropertiesKHR](VkDisplayModePropertiesKHR.html), [VkExtent2D](VkExtent2D.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayModeParametersKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
