# VkInstance(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkInstance.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkInstance - Opaque handle to an instance object

There is no global state in Vulkan and all per-application state is stored
in a `VkInstance` object.
Creating a `VkInstance` object initializes the Vulkan library and allows
the application to pass information about itself to the implementation.

Instances are represented by `VkInstance` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_HANDLE(VkInstance)

[PFN_vkGetInstanceProcAddrLUNARG](PFN_vkGetInstanceProcAddrLUNARG.html), [VK_DEFINE_HANDLE](VK_DEFINE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [vkCreateAndroidSurfaceKHR](vkCreateAndroidSurfaceKHR.html), [vkCreateDebugReportCallbackEXT](vkCreateDebugReportCallbackEXT.html), [vkCreateDebugUtilsMessengerEXT](vkCreateDebugUtilsMessengerEXT.html), [vkCreateDirectFBSurfaceEXT](vkCreateDirectFBSurfaceEXT.html), [vkCreateDisplayPlaneSurfaceKHR](vkCreateDisplayPlaneSurfaceKHR.html), [vkCreateHeadlessSurfaceEXT](vkCreateHeadlessSurfaceEXT.html), [vkCreateIOSSurfaceMVK](vkCreateIOSSurfaceMVK.html), [vkCreateImagePipeSurfaceFUCHSIA](vkCreateImagePipeSurfaceFUCHSIA.html), [vkCreateInstance](vkCreateInstance.html), [vkCreateMacOSSurfaceMVK](vkCreateMacOSSurfaceMVK.html), [vkCreateMetalSurfaceEXT](vkCreateMetalSurfaceEXT.html), [vkCreateScreenSurfaceQNX](vkCreateScreenSurfaceQNX.html), [vkCreateStreamDescriptorSurfaceGGP](vkCreateStreamDescriptorSurfaceGGP.html), [vkCreateSurfaceOHOS](vkCreateSurfaceOHOS.html), [vkCreateUbmSurfaceSEC](vkCreateUbmSurfaceSEC.html), [vkCreateViSurfaceNN](vkCreateViSurfaceNN.html), [vkCreateWaylandSurfaceKHR](vkCreateWaylandSurfaceKHR.html), [vkCreateWin32SurfaceKHR](vkCreateWin32SurfaceKHR.html), [vkCreateXcbSurfaceKHR](vkCreateXcbSurfaceKHR.html), [vkCreateXlibSurfaceKHR](vkCreateXlibSurfaceKHR.html), [vkDebugReportMessageEXT](vkDebugReportMessageEXT.html), [vkDestroyDebugReportCallbackEXT](vkDestroyDebugReportCallbackEXT.html), [vkDestroyDebugUtilsMessengerEXT](vkDestroyDebugUtilsMessengerEXT.html), [vkDestroyInstance](vkDestroyInstance.html), [vkDestroySurfaceKHR](vkDestroySurfaceKHR.html), [vkEnumeratePhysicalDeviceGroups](vkEnumeratePhysicalDeviceGroups.html), [vkEnumeratePhysicalDeviceGroups](vkEnumeratePhysicalDeviceGroups.html), [vkEnumeratePhysicalDevices](vkEnumeratePhysicalDevices.html), [vkGetInstanceProcAddr](vkGetInstanceProcAddr.html), [vkSubmitDebugUtilsMessageEXT](vkSubmitDebugUtilsMessageEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkInstance).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
