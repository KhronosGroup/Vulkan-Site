# VkDirectFBSurfaceCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDirectFBSurfaceCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDirectFBSurfaceCreateInfoEXT - Structure specifying parameters of a newly created DirectFB surface object

The `VkDirectFBSurfaceCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_directfb_surface
typedef struct VkDirectFBSurfaceCreateInfoEXT {
    VkStructureType                    sType;
    const void*                        pNext;
    VkDirectFBSurfaceCreateFlagsEXT    flags;
    IDirectFB*                         dfb;
    IDirectFBSurface*                  surface;
} VkDirectFBSurfaceCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`dfb` is a pointer to the `IDirectFB` main interface of DirectFB.

* 
`surface` is a pointer to a `IDirectFBSurface` surface interface.

Valid Usage

* 
[](#VUID-VkDirectFBSurfaceCreateInfoEXT-dfb-04117) VUID-VkDirectFBSurfaceCreateInfoEXT-dfb-04117

`dfb` **must** point to a valid DirectFB `IDirectFB`

* 
[](#VUID-VkDirectFBSurfaceCreateInfoEXT-surface-04118) VUID-VkDirectFBSurfaceCreateInfoEXT-surface-04118

`surface` **must** point to a valid DirectFB `IDirectFBSurface`

Valid Usage (Implicit)

* 
[](#VUID-VkDirectFBSurfaceCreateInfoEXT-sType-sType) VUID-VkDirectFBSurfaceCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DIRECTFB_SURFACE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDirectFBSurfaceCreateInfoEXT-pNext-pNext) VUID-VkDirectFBSurfaceCreateInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDirectFBSurfaceCreateInfoEXT-flags-zerobitmask) VUID-VkDirectFBSurfaceCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

[VK_EXT_directfb_surface](VK_EXT_directfb_surface.html), [VkDirectFBSurfaceCreateFlagsEXT](VkDirectFBSurfaceCreateFlagsEXT.html), [VkStructureType](VkStructureType.html), [vkCreateDirectFBSurfaceEXT](vkCreateDirectFBSurfaceEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDirectFBSurfaceCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
