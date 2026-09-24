# VkViSurfaceCreateInfoNN(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkViSurfaceCreateInfoNN.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkViSurfaceCreateInfoNN - Structure specifying parameters of a newly created VI surface object

The `VkViSurfaceCreateInfoNN` structure is defined as:

// Provided by VK_NN_vi_surface
typedef struct VkViSurfaceCreateInfoNN {
    VkStructureType             sType;
    const void*                 pNext;
    VkViSurfaceCreateFlagsNN    flags;
    void*                       window;
} VkViSurfaceCreateInfoNN;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`window` is the `nn`::`vi`::`NativeWindowHandle` for the
`nn`::`vi`::`Layer` with which to associate the surface.

Valid Usage

* 
[](#VUID-VkViSurfaceCreateInfoNN-window-01318) VUID-VkViSurfaceCreateInfoNN-window-01318

`window` **must** be a valid `nn`::`vi`::`NativeWindowHandle`

Valid Usage (Implicit)

* 
[](#VUID-VkViSurfaceCreateInfoNN-sType-sType) VUID-VkViSurfaceCreateInfoNN-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VI_SURFACE_CREATE_INFO_NN](VkStructureType.html)

* 
[](#VUID-VkViSurfaceCreateInfoNN-pNext-pNext) VUID-VkViSurfaceCreateInfoNN-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkViSurfaceCreateInfoNN-flags-zerobitmask) VUID-VkViSurfaceCreateInfoNN-flags-zerobitmask

 `flags` **must** be `0`

[VK_NN_vi_surface](VK_NN_vi_surface.html), [VkStructureType](VkStructureType.html), [VkViSurfaceCreateFlagsNN](VkViSurfaceCreateFlagsNN.html), [vkCreateViSurfaceNN](vkCreateViSurfaceNN.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkViSurfaceCreateInfoNN).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
