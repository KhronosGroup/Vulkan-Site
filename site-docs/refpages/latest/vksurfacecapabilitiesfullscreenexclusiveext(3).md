# VkSurfaceCapabilitiesFullScreenExclusiveEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceCapabilitiesFullScreenExclusiveEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceCapabilitiesFullScreenExclusiveEXT - Structure describing full screen exclusive capabilities of a surface

The `VkSurfaceCapabilitiesFullScreenExclusiveEXT` structure is defined
as:

// Provided by VK_EXT_full_screen_exclusive
typedef struct VkSurfaceCapabilitiesFullScreenExclusiveEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           fullScreenExclusiveSupported;
} VkSurfaceCapabilitiesFullScreenExclusiveEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fullScreenExclusiveSupported` is a boolean describing whether the
surface is able to make use of exclusive full-screen access.

This structure **can** be included in the `pNext` chain of
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html) to determine support for exclusive
full-screen access.
If `fullScreenExclusiveSupported` is [VK_FALSE](VK_FALSE.html), it indicates that
exclusive full-screen access is not obtainable for this surface.

Applications **must** not attempt to create swapchains with
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](VkFullScreenExclusiveEXT.html) set if
`fullScreenExclusiveSupported` is [VK_FALSE](VK_FALSE.html).

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCapabilitiesFullScreenExclusiveEXT-sType-sType) VUID-VkSurfaceCapabilitiesFullScreenExclusiveEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_FULL_SCREEN_EXCLUSIVE_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_EXT_full_screen_exclusive](VK_EXT_full_screen_exclusive.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceCapabilitiesFullScreenExclusiveEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
