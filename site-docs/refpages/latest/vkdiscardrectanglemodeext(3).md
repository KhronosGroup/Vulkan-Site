# VkDiscardRectangleModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDiscardRectangleModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDiscardRectangleModeEXT - Specify the discard rectangle mode

[VkDiscardRectangleModeEXT](#) values are:

// Provided by VK_EXT_discard_rectangles
typedef enum VkDiscardRectangleModeEXT {
    VK_DISCARD_RECTANGLE_MODE_INCLUSIVE_EXT = 0,
    VK_DISCARD_RECTANGLE_MODE_EXCLUSIVE_EXT = 1,
} VkDiscardRectangleModeEXT;

* 
[VK_DISCARD_RECTANGLE_MODE_INCLUSIVE_EXT](#) specifies that the discard
rectangle test is inclusive.

* 
[VK_DISCARD_RECTANGLE_MODE_EXCLUSIVE_EXT](#) specifies that the discard
rectangle test is exclusive.

[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html), [VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html), [vkCmdSetDiscardRectangleModeEXT](vkCmdSetDiscardRectangleModeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkDiscardRectangleModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
