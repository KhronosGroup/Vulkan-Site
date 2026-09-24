# VkWin32SurfaceCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkWin32SurfaceCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkWin32SurfaceCreateInfoKHR - Structure specifying parameters of a newly created Win32 surface object

The `VkWin32SurfaceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_win32_surface
typedef struct VkWin32SurfaceCreateInfoKHR {
    VkStructureType                 sType;
    const void*                     pNext;
    VkWin32SurfaceCreateFlagsKHR    flags;
    HINSTANCE                       hinstance;
    HWND                            hwnd;
} VkWin32SurfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`hinstance` is the Win32 `HINSTANCE` for the window to associate
the surface with.

* 
`hwnd` is the Win32 `HWND` for the window to associate the
surface with.

Valid Usage

* 
[](#VUID-VkWin32SurfaceCreateInfoKHR-hinstance-01307) VUID-VkWin32SurfaceCreateInfoKHR-hinstance-01307

`hinstance` **must** be a valid Win32 `HINSTANCE`

* 
[](#VUID-VkWin32SurfaceCreateInfoKHR-hwnd-01308) VUID-VkWin32SurfaceCreateInfoKHR-hwnd-01308

`hwnd` **must** be a valid Win32 `HWND`

Valid Usage (Implicit)

* 
[](#VUID-VkWin32SurfaceCreateInfoKHR-sType-sType) VUID-VkWin32SurfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WIN32_SURFACE_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkWin32SurfaceCreateInfoKHR-pNext-pNext) VUID-VkWin32SurfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkWin32SurfaceCreateInfoKHR-flags-zerobitmask) VUID-VkWin32SurfaceCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

[VK_KHR_win32_surface](VK_KHR_win32_surface.html), [VkStructureType](VkStructureType.html), [VkWin32SurfaceCreateFlagsKHR](VkWin32SurfaceCreateFlagsKHR.html), [vkCreateWin32SurfaceKHR](vkCreateWin32SurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkWin32SurfaceCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
