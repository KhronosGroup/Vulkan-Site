# VkIOSSurfaceCreateInfoMVK(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIOSSurfaceCreateInfoMVK.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIOSSurfaceCreateInfoMVK - Structure specifying parameters of a newly created iOS surface object

The [VkIOSSurfaceCreateInfoMVK](#) structure is defined as:

// Provided by VK_MVK_ios_surface
typedef struct VkIOSSurfaceCreateInfoMVK {
    VkStructureType               sType;
    const void*                   pNext;
    VkIOSSurfaceCreateFlagsMVK    flags;
    const void*                   pView;
} VkIOSSurfaceCreateInfoMVK;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`pView` is a reference to either a `CAMetalLayer` object or a
`UIView` object.

Valid Usage

* 
[](#VUID-VkIOSSurfaceCreateInfoMVK-pView-04143) VUID-VkIOSSurfaceCreateInfoMVK-pView-04143

If `pView` is a `CAMetalLayer` object, it **must** be a valid
`CAMetalLayer`

* 
[](#VUID-VkIOSSurfaceCreateInfoMVK-pView-01316) VUID-VkIOSSurfaceCreateInfoMVK-pView-01316

If `pView` is a `UIView` object, it **must** be a valid `UIView`,
**must** be backed by a `CALayer` object of type `CAMetalLayer`,
and [vkCreateIOSSurfaceMVK](vkCreateIOSSurfaceMVK.html) **must** be called on the main thread

Valid Usage (Implicit)

* 
[](#VUID-VkIOSSurfaceCreateInfoMVK-sType-sType) VUID-VkIOSSurfaceCreateInfoMVK-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IOS_SURFACE_CREATE_INFO_MVK](VkStructureType.html)

* 
[](#VUID-VkIOSSurfaceCreateInfoMVK-pNext-pNext) VUID-VkIOSSurfaceCreateInfoMVK-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkIOSSurfaceCreateInfoMVK-flags-zerobitmask) VUID-VkIOSSurfaceCreateInfoMVK-flags-zerobitmask

 `flags` **must** be `0`

[VK_MVK_ios_surface](VK_MVK_ios_surface.html), [VkIOSSurfaceCreateFlagsMVK](VkIOSSurfaceCreateFlagsMVK.html), [VkStructureType](VkStructureType.html), [vkCreateIOSSurfaceMVK](vkCreateIOSSurfaceMVK.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkIOSSurfaceCreateInfoMVK).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
