# VkXlibSurfaceCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkXlibSurfaceCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkXlibSurfaceCreateInfoKHR - Structure specifying parameters of a newly created Xlib surface object

The `VkXlibSurfaceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_xlib_surface
typedef struct VkXlibSurfaceCreateInfoKHR {
    VkStructureType                sType;
    const void*                    pNext;
    VkXlibSurfaceCreateFlagsKHR    flags;
    Display*                       dpy;
    Window                         window;
} VkXlibSurfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`dpy` is a pointer to an Xlib `Display` connection to the X
server.

* 
`window` is an Xlib `Window` to associate the surface with.

Valid Usage

* 
[](#VUID-VkXlibSurfaceCreateInfoKHR-dpy-01313) VUID-VkXlibSurfaceCreateInfoKHR-dpy-01313

`dpy` **must** point to a valid Xlib `Display`

* 
[](#VUID-VkXlibSurfaceCreateInfoKHR-window-01314) VUID-VkXlibSurfaceCreateInfoKHR-window-01314

`window` **must** be a valid Xlib `Window`

Valid Usage (Implicit)

* 
[](#VUID-VkXlibSurfaceCreateInfoKHR-sType-sType) VUID-VkXlibSurfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_XLIB_SURFACE_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkXlibSurfaceCreateInfoKHR-pNext-pNext) VUID-VkXlibSurfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkXlibSurfaceCreateInfoKHR-flags-zerobitmask) VUID-VkXlibSurfaceCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

[VK_KHR_xlib_surface](VK_KHR_xlib_surface.html), [VkStructureType](VkStructureType.html), [VkXlibSurfaceCreateFlagsKHR](VkXlibSurfaceCreateFlagsKHR.html), [vkCreateXlibSurfaceKHR](vkCreateXlibSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkXlibSurfaceCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
