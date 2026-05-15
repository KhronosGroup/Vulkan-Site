# VkImagePipeSurfaceCreateInfoFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImagePipeSurfaceCreateInfoFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImagePipeSurfaceCreateInfoFUCHSIA - Structure specifying parameters of a newly created ImagePipe surface object

The `VkImagePipeSurfaceCreateInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_imagepipe_surface
typedef struct VkImagePipeSurfaceCreateInfoFUCHSIA {
    VkStructureType                         sType;
    const void*                             pNext;
    VkImagePipeSurfaceCreateFlagsFUCHSIA    flags;
    zx_handle_t                             imagePipeHandle;
} VkImagePipeSurfaceCreateInfoFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`imagePipeHandle` is a `zx_handle_t` referring to the ImagePipe
to associate with the surface.

Valid Usage

* 
[](#VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-imagePipeHandle-04863) VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-imagePipeHandle-04863

`imagePipeHandle` **must** be a valid `zx_handle_t`

Valid Usage (Implicit)

* 
[](#VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-sType-sType) VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGEPIPE_SURFACE_CREATE_INFO_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-pNext-pNext) VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-flags-zerobitmask) VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-flags-zerobitmask

 `flags` **must** be `0`

[VK_FUCHSIA_imagepipe_surface](VK_FUCHSIA_imagepipe_surface.html), [VkImagePipeSurfaceCreateFlagsFUCHSIA](VkImagePipeSurfaceCreateFlagsFUCHSIA.html), [VkStructureType](VkStructureType.html), [vkCreateImagePipeSurfaceFUCHSIA](vkCreateImagePipeSurfaceFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkImagePipeSurfaceCreateInfoFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
