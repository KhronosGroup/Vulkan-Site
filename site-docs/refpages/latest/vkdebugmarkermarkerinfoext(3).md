# VkDebugMarkerMarkerInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugMarkerMarkerInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugMarkerMarkerInfoEXT - Specify parameters of a command buffer marker region

The `VkDebugMarkerMarkerInfoEXT` structure is defined as:

// Provided by VK_EXT_debug_marker
typedef struct VkDebugMarkerMarkerInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    const char*        pMarkerName;
    float              color[4];
} VkDebugMarkerMarkerInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pMarkerName` is a pointer to a null-terminated UTF-8 string
containing the name of the marker.

* 
`color` is an **optional** RGBA color value that can be associated with
the marker.
A particular implementation **may** choose to ignore this color value.
The values contain RGBA values in order, in the range 0.0 to 1.0.
If all elements in `color` are 0.0, then it is ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkDebugMarkerMarkerInfoEXT-sType-sType) VUID-VkDebugMarkerMarkerInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_MARKER_MARKER_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDebugMarkerMarkerInfoEXT-pNext-pNext) VUID-VkDebugMarkerMarkerInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDebugMarkerMarkerInfoEXT-pMarkerName-parameter) VUID-VkDebugMarkerMarkerInfoEXT-pMarkerName-parameter

 `pMarkerName` **must** be a null-terminated UTF-8 string

[VK_EXT_debug_marker](VK_EXT_debug_marker.html), [VkStructureType](VkStructureType.html), [vkCmdDebugMarkerBeginEXT](vkCmdDebugMarkerBeginEXT.html), [vkCmdDebugMarkerInsertEXT](vkCmdDebugMarkerInsertEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugMarkerMarkerInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
