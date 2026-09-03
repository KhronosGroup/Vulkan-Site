# VkOpacityMicromapFormatKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpacityMicromapFormatKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpacityMicromapFormatKHR - Format enum for opacity micromaps

Formats which **can** be set in [VkMicromapUsageKHR](VkMicromapUsageKHR.html)::`format` and
[VkMicromapTriangleKHR](VkMicromapTriangleKHR.html)::`format` for micromap builds, are:

// Provided by VK_KHR_opacity_micromap
typedef enum VkOpacityMicromapFormatKHR {
    VK_OPACITY_MICROMAP_FORMAT_2_STATE_KHR = 1,
    VK_OPACITY_MICROMAP_FORMAT_4_STATE_KHR = 2,
  // Provided by VK_EXT_opacity_micromap
    VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT = VK_OPACITY_MICROMAP_FORMAT_2_STATE_KHR,
  // Provided by VK_EXT_opacity_micromap
    VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT = VK_OPACITY_MICROMAP_FORMAT_4_STATE_KHR,
} VkOpacityMicromapFormatKHR;

// Provided by VK_EXT_opacity_micromap
// Equivalent to VkOpacityMicromapFormatKHR
typedef VkOpacityMicromapFormatKHR VkOpacityMicromapFormatEXT;

* 
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_KHR](#) specifies that the given
micromap format has one bit per subtriangle encoding either fully opaque
or fully transparent.

* 
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_KHR](#) specifies that the given
micromap format has two bits per subtriangle encoding four modes which
can be interpreted as described in [Ray Opacity    Micromap](../../../../spec/latest/chapters/raytraversal.html#ray-opacity-micromap).

|  | For compactness, these values are stored as 16-bit in some structures. |
| --- | --- |

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VK_KHR_opacity_micromap](VK_KHR_opacity_micromap.html), [VkMicromapUsageKHR](VkMicromapUsageKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_opacity_micromap/micromaps.html#VkOpacityMicromapFormatKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
