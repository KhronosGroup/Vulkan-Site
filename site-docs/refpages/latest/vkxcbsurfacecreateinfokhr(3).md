# VkXcbSurfaceCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkXcbSurfaceCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkXcbSurfaceCreateInfoKHR - Structure specifying parameters of a newly created Xcb surface object

The `VkXcbSurfaceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_xcb_surface
typedef struct VkXcbSurfaceCreateInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    VkXcbSurfaceCreateFlagsKHR    flags;
    xcb_connection_t*             connection;
    xcb_window_t                  window;
} VkXcbSurfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`connection` is a pointer to an `xcb_connection_t` to the X
server.

* 
`window` is the `xcb_window_t` for the X11 window to associate
the surface with.

Valid Usage

* 
[](#VUID-VkXcbSurfaceCreateInfoKHR-connection-01310) VUID-VkXcbSurfaceCreateInfoKHR-connection-01310

`connection` **must** point to a valid X11 `xcb_connection_t`

* 
[](#VUID-VkXcbSurfaceCreateInfoKHR-window-01311) VUID-VkXcbSurfaceCreateInfoKHR-window-01311

`window` **must** be a valid X11 `xcb_window_t`

Valid Usage (Implicit)

* 
[](#VUID-VkXcbSurfaceCreateInfoKHR-sType-sType) VUID-VkXcbSurfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_XCB_SURFACE_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkXcbSurfaceCreateInfoKHR-pNext-pNext) VUID-VkXcbSurfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkXcbSurfaceCreateInfoKHR-flags-zerobitmask) VUID-VkXcbSurfaceCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

[VK_KHR_xcb_surface](VK_KHR_xcb_surface.html), [VkStructureType](VkStructureType.html), [VkXcbSurfaceCreateFlagsKHR](VkXcbSurfaceCreateFlagsKHR.html), [vkCreateXcbSurfaceKHR](vkCreateXcbSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkXcbSurfaceCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
