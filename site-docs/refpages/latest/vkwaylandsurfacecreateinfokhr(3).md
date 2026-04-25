# VkWaylandSurfaceCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkWaylandSurfaceCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkWaylandSurfaceCreateInfoKHR - Structure specifying parameters of a newly created Wayland surface object

The `VkWaylandSurfaceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_wayland_surface
typedef struct VkWaylandSurfaceCreateInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkWaylandSurfaceCreateFlagsKHR    flags;
    struct wl_display*                display;
    struct wl_surface*                surface;
} VkWaylandSurfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`display` and `surface` are pointers to the Wayland
`wl_display` and `wl_surface` to associate the surface with.

Valid Usage

* 
[](#VUID-VkWaylandSurfaceCreateInfoKHR-display-01304) VUID-VkWaylandSurfaceCreateInfoKHR-display-01304

`display` **must** point to a valid Wayland `wl_display`

* 
[](#VUID-VkWaylandSurfaceCreateInfoKHR-surface-01305) VUID-VkWaylandSurfaceCreateInfoKHR-surface-01305

`surface` **must** point to a valid Wayland `wl_surface`

Valid Usage (Implicit)

* 
[](#VUID-VkWaylandSurfaceCreateInfoKHR-sType-sType) VUID-VkWaylandSurfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WAYLAND_SURFACE_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkWaylandSurfaceCreateInfoKHR-pNext-pNext) VUID-VkWaylandSurfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkWaylandSurfaceCreateInfoKHR-flags-zerobitmask) VUID-VkWaylandSurfaceCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

[VK_KHR_wayland_surface](VK_KHR_wayland_surface.html), [VkStructureType](VkStructureType.html), [VkWaylandSurfaceCreateFlagsKHR](VkWaylandSurfaceCreateFlagsKHR.html), [vkCreateWaylandSurfaceKHR](vkCreateWaylandSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkWaylandSurfaceCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
