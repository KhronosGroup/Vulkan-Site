# VkUbmSurfaceCreateInfoSEC(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkUbmSurfaceCreateInfoSEC.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkUbmSurfaceCreateInfoSEC - Structure specifying parameters of a newly created UBM surface object

The `VkUbmSurfaceCreateInfoSEC` structure is defined as:

// Provided by VK_SEC_ubm_surface
typedef struct VkUbmSurfaceCreateInfoSEC {
    VkStructureType               sType;
    const void*                   pNext;
    VkUbmSurfaceCreateFlagsSEC    flags;
    struct ubm_device*            device;
    struct ubm_surface*           surface;
} VkUbmSurfaceCreateInfoSEC;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`device` is a pointer to a `ubm_device` to associate the surface
with.

* 
`surface` is a pointer to a `ubm_surface` to associate the
surface with.

Valid Usage

* 
[](#VUID-VkUbmSurfaceCreateInfoSEC-device-12366) VUID-VkUbmSurfaceCreateInfoSEC-device-12366

`device` **must** point to a valid UBM `ubm_device`

* 
[](#VUID-VkUbmSurfaceCreateInfoSEC-surface-12367) VUID-VkUbmSurfaceCreateInfoSEC-surface-12367

`surface` **must** point to a valid UBM `ubm_surface`

Valid Usage (Implicit)

* 
[](#VUID-VkUbmSurfaceCreateInfoSEC-sType-sType) VUID-VkUbmSurfaceCreateInfoSEC-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_UBM_SURFACE_CREATE_INFO_SEC](VkStructureType.html)

* 
[](#VUID-VkUbmSurfaceCreateInfoSEC-pNext-pNext) VUID-VkUbmSurfaceCreateInfoSEC-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkUbmSurfaceCreateInfoSEC-flags-zerobitmask) VUID-VkUbmSurfaceCreateInfoSEC-flags-zerobitmask

 `flags` **must** be `0`

[VK_SEC_ubm_surface](VK_SEC_ubm_surface.html), [VkStructureType](VkStructureType.html), [VkUbmSurfaceCreateFlagsSEC](VkUbmSurfaceCreateFlagsSEC.html), [vkCreateUbmSurfaceSEC](vkCreateUbmSurfaceSEC.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkUbmSurfaceCreateInfoSEC).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
