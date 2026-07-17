# VkPhysicalDeviceSurfaceInfo2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSurfaceInfo2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSurfaceInfo2KHR - Structure specifying a surface and related swapchain creation parameters

The `VkPhysicalDeviceSurfaceInfo2KHR` structure is defined as:

// Provided by VK_KHR_get_surface_capabilities2
typedef struct VkPhysicalDeviceSurfaceInfo2KHR {
    VkStructureType    sType;
    const void*        pNext;
    VkSurfaceKHR       surface;
} VkPhysicalDeviceSurfaceInfo2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`surface` is the surface that will be associated with the swapchain.

The members of `VkPhysicalDeviceSurfaceInfo2KHR` correspond to the
arguments to [vkGetPhysicalDeviceSurfaceCapabilitiesKHR](vkGetPhysicalDeviceSurfaceCapabilitiesKHR.html), with
`sType` and `pNext` added for extensibility.

Additional capabilities of a surface **may** be available to swapchains created
with different full-screen exclusive settings - particularly if exclusive
full-screen access is application controlled.
These additional capabilities **can** be queried by adding a
[VkSurfaceFullScreenExclusiveInfoEXT](VkSurfaceFullScreenExclusiveInfoEXT.html) structure to the `pNext` chain
of this structure when used to query surface properties.
Additionally, for Win32 surfaces with application controlled exclusive
full-screen access, chaining a
[VkSurfaceFullScreenExclusiveWin32InfoEXT](VkSurfaceFullScreenExclusiveWin32InfoEXT.html) structure **may** also report
additional surface capabilities.
These additional capabilities only apply to swapchains created with the same
parameters included in the `pNext` chain of
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html).

Valid Usage

* 
[](#VUID-VkPhysicalDeviceSurfaceInfo2KHR-pNext-02672) VUID-VkPhysicalDeviceSurfaceInfo2KHR-pNext-02672

If the `pNext` chain includes a
[VkSurfaceFullScreenExclusiveInfoEXT](VkSurfaceFullScreenExclusiveInfoEXT.html) structure with its
`fullScreenExclusive` member set to
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](VkFullScreenExclusiveEXT.html), and
`surface` was created using [vkCreateWin32SurfaceKHR](vkCreateWin32SurfaceKHR.html), a
[VkSurfaceFullScreenExclusiveWin32InfoEXT](VkSurfaceFullScreenExclusiveWin32InfoEXT.html) structure **must** be
included in the `pNext` chain

* 
[](#VUID-VkPhysicalDeviceSurfaceInfo2KHR-surface-07919) VUID-VkPhysicalDeviceSurfaceInfo2KHR-surface-07919

If surface is not VK_NULL_HANDLE,
and the `[VK_GOOGLE_surfaceless_query](VK_GOOGLE_surfaceless_query.html)` extension is not enabled,
`surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSurfaceInfo2KHR-sType-sType) VUID-VkPhysicalDeviceSurfaceInfo2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SURFACE_INFO_2_KHR](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceSurfaceInfo2KHR-pNext-pNext) VUID-VkPhysicalDeviceSurfaceInfo2KHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkSurfaceFullScreenExclusiveInfoEXT](VkSurfaceFullScreenExclusiveInfoEXT.html), [VkSurfaceFullScreenExclusiveWin32InfoEXT](VkSurfaceFullScreenExclusiveWin32InfoEXT.html), or [VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html)

* 
[](#VUID-VkPhysicalDeviceSurfaceInfo2KHR-sType-unique) VUID-VkPhysicalDeviceSurfaceInfo2KHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html), [VkStructureType](VkStructureType.html), [VkSurfaceKHR](VkSurfaceKHR.html), [vkGetDeviceGroupSurfacePresentModes2EXT](vkGetDeviceGroupSurfacePresentModes2EXT.html), [vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html), [vkGetPhysicalDeviceSurfaceFormats2KHR](vkGetPhysicalDeviceSurfaceFormats2KHR.html), [vkGetPhysicalDeviceSurfacePresentModes2EXT](vkGetPhysicalDeviceSurfacePresentModes2EXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPhysicalDeviceSurfaceInfo2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
