# VkSurfaceCreateInfoOHOS(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceCreateInfoOHOS.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceCreateInfoOHOS - The parameters for surface creation on Open Harmony OS platform

The `VkSurfaceCreateInfoOHOS` structure is defined as:

// Provided by VK_OHOS_surface
typedef struct VkSurfaceCreateInfoOHOS {
    VkStructureType             sType;
    const void*                 pNext;
    VkSurfaceCreateFlagsOHOS    flags;
    OHNativeWindow*             window;
} VkSurfaceCreateInfoOHOS;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`window`: is a pointer to a `OHNativeWindow` to associate the
surface with.

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCreateInfoOHOS-sType-sType) VUID-VkSurfaceCreateInfoOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CREATE_INFO_OHOS](VkStructureType.html)

* 
[](#VUID-VkSurfaceCreateInfoOHOS-pNext-pNext) VUID-VkSurfaceCreateInfoOHOS-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSurfaceCreateInfoOHOS-flags-zerobitmask) VUID-VkSurfaceCreateInfoOHOS-flags-zerobitmask

 `flags` **must** be `0`

[VK_OHOS_surface](VK_OHOS_surface.html), [VkStructureType](VkStructureType.html), [VkSurfaceCreateFlagsOHOS](VkSurfaceCreateFlagsOHOS.html), [vkCreateSurfaceOHOS](vkCreateSurfaceOHOS.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceCreateInfoOHOS).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
