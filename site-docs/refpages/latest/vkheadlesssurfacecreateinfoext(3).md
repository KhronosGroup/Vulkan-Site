# VkHeadlessSurfaceCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkHeadlessSurfaceCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkHeadlessSurfaceCreateInfoEXT - Structure specifying parameters of a newly created headless surface object

The `VkHeadlessSurfaceCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_headless_surface
typedef struct VkHeadlessSurfaceCreateInfoEXT {
    VkStructureType                    sType;
    const void*                        pNext;
    VkHeadlessSurfaceCreateFlagsEXT    flags;
} VkHeadlessSurfaceCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

Valid Usage (Implicit)

* 
[](#VUID-VkHeadlessSurfaceCreateInfoEXT-sType-sType) VUID-VkHeadlessSurfaceCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_HEADLESS_SURFACE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkHeadlessSurfaceCreateInfoEXT-pNext-pNext) VUID-VkHeadlessSurfaceCreateInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkHeadlessSurfaceCreateInfoEXT-flags-zerobitmask) VUID-VkHeadlessSurfaceCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

[VK_EXT_headless_surface](VK_EXT_headless_surface.html), [VkHeadlessSurfaceCreateFlagsEXT](VkHeadlessSurfaceCreateFlagsEXT.html), [VkStructureType](VkStructureType.html), [vkCreateHeadlessSurfaceEXT](vkCreateHeadlessSurfaceEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkHeadlessSurfaceCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
