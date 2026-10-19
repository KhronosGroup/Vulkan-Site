# VkSurfaceFullScreenExclusiveWin32InfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceFullScreenExclusiveWin32InfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceFullScreenExclusiveWin32InfoEXT - Structure specifying additional creation parameters specific to Win32 fullscreen exclusive mode

The `VkSurfaceFullScreenExclusiveWin32InfoEXT` structure is defined as:

// Provided by VK_KHR_win32_surface with VK_EXT_full_screen_exclusive
typedef struct VkSurfaceFullScreenExclusiveWin32InfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    HMONITOR           hmonitor;
} VkSurfaceFullScreenExclusiveWin32InfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`hmonitor` is the Win32 `HMONITOR` handle identifying the display
to create the surface with.

|  | If `hmonitor` is invalidated (e.g. the monitor is unplugged) during the
| --- | --- |
lifetime of a swapchain created with this structure, operations on that
swapchain will return [VK_ERROR_OUT_OF_DATE_KHR](VkResult.html). |

|  | It is the responsibility of the application to change the display settings
| --- | --- |
of the targeted Win32 display using the appropriate platform APIs.
Such changes **may** alter the surface capabilities reported for the created
surface. |

Valid Usage

* 
[](#VUID-VkSurfaceFullScreenExclusiveWin32InfoEXT-hmonitor-02673) VUID-VkSurfaceFullScreenExclusiveWin32InfoEXT-hmonitor-02673

`hmonitor` **must** be a valid `HMONITOR`

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceFullScreenExclusiveWin32InfoEXT-sType-sType) VUID-VkSurfaceFullScreenExclusiveWin32InfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_FULL_SCREEN_EXCLUSIVE_WIN32_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)

* 
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

[VK_EXT_full_screen_exclusive](VK_EXT_full_screen_exclusive.html), [VK_KHR_win32_surface](VK_KHR_win32_surface.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceFullScreenExclusiveWin32InfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
