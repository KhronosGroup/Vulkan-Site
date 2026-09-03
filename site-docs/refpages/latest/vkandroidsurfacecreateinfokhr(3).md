# VkAndroidSurfaceCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAndroidSurfaceCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAndroidSurfaceCreateInfoKHR - Structure specifying parameters of a newly created Android surface object

The `VkAndroidSurfaceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_android_surface
typedef struct VkAndroidSurfaceCreateInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkAndroidSurfaceCreateFlagsKHR    flags;
    struct ANativeWindow*             window;
} VkAndroidSurfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`window` is a pointer to the `ANativeWindow` to associate the
surface with.

Valid Usage

* 
[](#VUID-VkAndroidSurfaceCreateInfoKHR-window-01248) VUID-VkAndroidSurfaceCreateInfoKHR-window-01248

`window` **must** point to a valid Android `ANativeWindow`

Valid Usage (Implicit)

* 
[](#VUID-VkAndroidSurfaceCreateInfoKHR-sType-sType) VUID-VkAndroidSurfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANDROID_SURFACE_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkAndroidSurfaceCreateInfoKHR-pNext-pNext) VUID-VkAndroidSurfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAndroidSurfaceCreateInfoKHR-flags-zerobitmask) VUID-VkAndroidSurfaceCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

[VK_KHR_android_surface](VK_KHR_android_surface.html), [VkAndroidSurfaceCreateFlagsKHR](VkAndroidSurfaceCreateFlagsKHR.html), [VkStructureType](VkStructureType.html), [vkCreateAndroidSurfaceKHR](vkCreateAndroidSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkAndroidSurfaceCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
