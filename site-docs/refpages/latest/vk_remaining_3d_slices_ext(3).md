# VK_REMAINING_3D_SLICES_EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_REMAINING_3D_SLICES_EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_REMAINING_3D_SLICES_EXT - Sentinel for all remaining 3D slices

[VK_REMAINING_3D_SLICES_EXT](#) is a special constant value used for
[VkImageViewSlicedCreateInfoEXT](VkImageViewSlicedCreateInfoEXT.html)::`sliceCount` to indicate that all
remaining 3D slices in an image after the first slice offset specified
should be included in the view.

#define VK_REMAINING_3D_SLICES_EXT        (~0U)

[VK_EXT_image_sliced_view_of_3d](VK_EXT_image_sliced_view_of_3d.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VK_REMAINING_3D_SLICES_EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
