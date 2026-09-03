# VkScreenSurfaceCreateInfoQNX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkScreenSurfaceCreateInfoQNX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkScreenSurfaceCreateInfoQNX - Structure specifying parameters of a newly created QNX Screen surface object

The `VkScreenSurfaceCreateInfoQNX` structure is defined as:

// Provided by VK_QNX_screen_surface
typedef struct VkScreenSurfaceCreateInfoQNX {
    VkStructureType                  sType;
    const void*                      pNext;
    VkScreenSurfaceCreateFlagsQNX    flags;
    struct _screen_context*          context;
    struct _screen_window*           window;
} VkScreenSurfaceCreateInfoQNX;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`context` and `window` are QNX Screen `context` and
`window` to associate the surface with.

Valid Usage

* 
[](#VUID-VkScreenSurfaceCreateInfoQNX-context-04741) VUID-VkScreenSurfaceCreateInfoQNX-context-04741

`context` **must** point to a valid QNX Screen `struct`
_screen_context

* 
[](#VUID-VkScreenSurfaceCreateInfoQNX-window-04742) VUID-VkScreenSurfaceCreateInfoQNX-window-04742

`window` **must** point to a valid QNX Screen `struct`
_screen_window

Valid Usage (Implicit)

* 
[](#VUID-VkScreenSurfaceCreateInfoQNX-sType-sType) VUID-VkScreenSurfaceCreateInfoQNX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SCREEN_SURFACE_CREATE_INFO_QNX](VkStructureType.html)

* 
[](#VUID-VkScreenSurfaceCreateInfoQNX-pNext-pNext) VUID-VkScreenSurfaceCreateInfoQNX-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkScreenSurfaceCreateInfoQNX-flags-zerobitmask) VUID-VkScreenSurfaceCreateInfoQNX-flags-zerobitmask

 `flags` **must** be `0`

[VK_QNX_screen_surface](VK_QNX_screen_surface.html), [VkScreenSurfaceCreateFlagsQNX](VkScreenSurfaceCreateFlagsQNX.html), [VkStructureType](VkStructureType.html), [vkCreateScreenSurfaceQNX](vkCreateScreenSurfaceQNX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkScreenSurfaceCreateInfoQNX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
