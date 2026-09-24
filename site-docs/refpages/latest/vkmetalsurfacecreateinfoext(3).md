# VkMetalSurfaceCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMetalSurfaceCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMetalSurfaceCreateInfoEXT - Structure specifying parameters of a newly created Metal surface object

The [VkMetalSurfaceCreateInfoEXT](#) structure is defined as:

// Provided by VK_EXT_metal_surface
typedef struct VkMetalSurfaceCreateInfoEXT {
    VkStructureType                 sType;
    const void*                     pNext;
    VkMetalSurfaceCreateFlagsEXT    flags;
    const CAMetalLayer*             pLayer;
} VkMetalSurfaceCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`pLayer` is a reference to a `CAMetalLayer` object
representing a renderable surface.

Valid Usage (Implicit)

* 
[](#VUID-VkMetalSurfaceCreateInfoEXT-sType-sType) VUID-VkMetalSurfaceCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_METAL_SURFACE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkMetalSurfaceCreateInfoEXT-pNext-pNext) VUID-VkMetalSurfaceCreateInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMetalSurfaceCreateInfoEXT-flags-zerobitmask) VUID-VkMetalSurfaceCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

[VK_EXT_metal_surface](VK_EXT_metal_surface.html), [VkMetalSurfaceCreateFlagsEXT](VkMetalSurfaceCreateFlagsEXT.html), [VkStructureType](VkStructureType.html), [vkCreateMetalSurfaceEXT](vkCreateMetalSurfaceEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkMetalSurfaceCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
