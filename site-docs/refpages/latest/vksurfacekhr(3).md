# VkSurfaceKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceKHR - Opaque handle to a surface object

Native platform surface or window objects are abstracted by surface objects,
which are represented by `VkSurfaceKHR` handles:

// Provided by VK_KHR_surface
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkSurfaceKHR)

The `[VK_KHR_surface](VK_KHR_surface.html)` extension declares the `VkSurfaceKHR`
object, and provides a function for destroying `VkSurfaceKHR` objects.
Separate platform-specific extensions each provide a function for creating a
`VkSurfaceKHR` object for the respective platform.
From the application’s perspective this is an opaque handle, just like the
handles of other Vulkan objects.

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_KHR_surface](VK_KHR_surface.html), [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html), [vkCreateAndroidSurfaceKHR](vkCreateAndroidSurfaceKHR.html), [vkCreateDirectFBSurfaceEXT](vkCreateDirectFBSurfaceEXT.html), [vkCreateDisplayPlaneSurfaceKHR](vkCreateDisplayPlaneSurfaceKHR.html), [vkCreateHeadlessSurfaceEXT](vkCreateHeadlessSurfaceEXT.html), [vkCreateIOSSurfaceMVK](vkCreateIOSSurfaceMVK.html), [vkCreateImagePipeSurfaceFUCHSIA](vkCreateImagePipeSurfaceFUCHSIA.html), [vkCreateMacOSSurfaceMVK](vkCreateMacOSSurfaceMVK.html), [vkCreateMetalSurfaceEXT](vkCreateMetalSurfaceEXT.html), [vkCreateScreenSurfaceQNX](vkCreateScreenSurfaceQNX.html), [vkCreateStreamDescriptorSurfaceGGP](vkCreateStreamDescriptorSurfaceGGP.html), [vkCreateSurfaceOHOS](vkCreateSurfaceOHOS.html), [vkCreateUbmSurfaceSEC](vkCreateUbmSurfaceSEC.html), [vkCreateViSurfaceNN](vkCreateViSurfaceNN.html), [vkCreateWaylandSurfaceKHR](vkCreateWaylandSurfaceKHR.html), [vkCreateWin32SurfaceKHR](vkCreateWin32SurfaceKHR.html), [vkCreateXcbSurfaceKHR](vkCreateXcbSurfaceKHR.html), [vkCreateXlibSurfaceKHR](vkCreateXlibSurfaceKHR.html), [vkDestroySurfaceKHR](vkDestroySurfaceKHR.html), [vkGetDeviceGroupSurfacePresentModesKHR](vkGetDeviceGroupSurfacePresentModesKHR.html), [vkGetPhysicalDevicePresentRectanglesKHR](vkGetPhysicalDevicePresentRectanglesKHR.html), [vkGetPhysicalDeviceSurfaceCapabilities2EXT](vkGetPhysicalDeviceSurfaceCapabilities2EXT.html), [vkGetPhysicalDeviceSurfaceCapabilitiesKHR](vkGetPhysicalDeviceSurfaceCapabilitiesKHR.html), [vkGetPhysicalDeviceSurfaceFormatsKHR](vkGetPhysicalDeviceSurfaceFormatsKHR.html), [vkGetPhysicalDeviceSurfacePresentModesKHR](vkGetPhysicalDeviceSurfacePresentModesKHR.html), [vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
