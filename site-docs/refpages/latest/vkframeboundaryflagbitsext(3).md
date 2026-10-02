# VkFrameBoundaryFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFrameBoundaryFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFrameBoundaryFlagBitsEXT - Bitmask specifying whether a queue submission is the last one for a given frame

The bit which **can** be set in [VkFrameBoundaryEXT](VkFrameBoundaryEXT.html)::`flags` is:

// Provided by VK_EXT_frame_boundary
typedef enum VkFrameBoundaryFlagBitsEXT {
    VK_FRAME_BOUNDARY_FRAME_END_BIT_EXT = 0x00000001,
} VkFrameBoundaryFlagBitsEXT;

* 
[VK_FRAME_BOUNDARY_FRAME_END_BIT_EXT](#) specifies that this queue
submission is the last one for this frame, i.e. once this queue
submission has terminated, then the work for this frame is completed.

[VK_EXT_frame_boundary](VK_EXT_frame_boundary.html), [VkFrameBoundaryFlagsEXT](VkFrameBoundaryFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkFrameBoundaryFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
