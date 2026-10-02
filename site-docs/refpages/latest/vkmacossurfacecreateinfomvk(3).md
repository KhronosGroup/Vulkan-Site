# VkMacOSSurfaceCreateInfoMVK(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMacOSSurfaceCreateInfoMVK.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMacOSSurfaceCreateInfoMVK - Structure specifying parameters of a newly created macOS surface object

The [VkMacOSSurfaceCreateInfoMVK](#) structure is defined as:

// Provided by VK_MVK_macos_surface
typedef struct VkMacOSSurfaceCreateInfoMVK {
    VkStructureType                 sType;
    const void*                     pNext;
    VkMacOSSurfaceCreateFlagsMVK    flags;
    const void*                     pView;
} VkMacOSSurfaceCreateInfoMVK;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`pView` is a reference to either a `CAMetalLayer` object or
an `NSView` object.

Valid Usage

* 
[](#VUID-VkMacOSSurfaceCreateInfoMVK-pView-04144) VUID-VkMacOSSurfaceCreateInfoMVK-pView-04144

If `pView` is a `CAMetalLayer` object, it **must** be a valid
`CAMetalLayer`

* 
[](#VUID-VkMacOSSurfaceCreateInfoMVK-pView-01317) VUID-VkMacOSSurfaceCreateInfoMVK-pView-01317

If `pView` is an `NSView` object, it **must** be a valid
`NSView`, **must** be backed by a `CALayer` object of type
`CAMetalLayer`, and [vkCreateMacOSSurfaceMVK](vkCreateMacOSSurfaceMVK.html) **must** be called
on the main thread

Valid Usage (Implicit)

* 
[](#VUID-VkMacOSSurfaceCreateInfoMVK-sType-sType) VUID-VkMacOSSurfaceCreateInfoMVK-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MACOS_SURFACE_CREATE_INFO_MVK](VkStructureType.html)

* 
[](#VUID-VkMacOSSurfaceCreateInfoMVK-pNext-pNext) VUID-VkMacOSSurfaceCreateInfoMVK-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMacOSSurfaceCreateInfoMVK-flags-zerobitmask) VUID-VkMacOSSurfaceCreateInfoMVK-flags-zerobitmask

 `flags` **must** be `0`

[VK_MVK_macos_surface](VK_MVK_macos_surface.html), [VkMacOSSurfaceCreateFlagsMVK](VkMacOSSurfaceCreateFlagsMVK.html), [VkStructureType](VkStructureType.html), [vkCreateMacOSSurfaceMVK](vkCreateMacOSSurfaceMVK.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkMacOSSurfaceCreateInfoMVK).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
