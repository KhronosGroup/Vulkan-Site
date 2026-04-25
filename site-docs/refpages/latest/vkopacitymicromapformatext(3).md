# VkOpacityMicromapFormatEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpacityMicromapFormatEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpacityMicromapFormatEXT - Format enum for opacity micromaps

Formats which **can** be set in [VkMicromapUsageEXT](VkMicromapUsageEXT.html)::`format` and
[VkMicromapTriangleEXT](VkMicromapTriangleEXT.html)::`format` for micromap builds, are:

// Provided by VK_EXT_opacity_micromap
typedef enum VkOpacityMicromapFormatEXT {
    VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT = 1,
    VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT = 2,
} VkOpacityMicromapFormatEXT;

* 
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](#) specifies that the given
micromap format has one bit per subtriangle encoding either fully opaque
or fully transparent.

* 
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](#) specifies that the given
micromap format has two bits per subtriangle encoding four modes which
can be interpreted as described in [ray    traversal](../../../../spec/latest/chapters/raytraversal.html#ray-opacity-micromap).

|  | For compactness, these values are stored as 16-bit in some structures. |
| --- | --- |

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#VkOpacityMicromapFormatEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
