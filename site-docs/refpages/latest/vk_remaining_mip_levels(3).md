# VK_REMAINING_MIP_LEVELS(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_REMAINING_MIP_LEVELS.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_REMAINING_MIP_LEVELS - Sentinel for all remaining mipmap levels

[VK_REMAINING_MIP_LEVELS](#) is a special constant value used for image
views to indicate that all remaining mipmap levels in an image after the
base level should be included in the view.

#define VK_REMAINING_MIP_LEVELS           (~0U)

[VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VK_REMAINING_MIP_LEVELS).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
