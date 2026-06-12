# VkSurfaceFullScreenExclusiveInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceFullScreenExclusiveInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceFullScreenExclusiveInfoEXT - Structure specifying the preferred full-screen transition behavior

If the `pNext` chain of [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) includes a
`VkSurfaceFullScreenExclusiveInfoEXT` structure, then that structure
specifies the application’s preferred full-screen transition behavior.

The `VkSurfaceFullScreenExclusiveInfoEXT` structure is defined as:

// Provided by VK_EXT_full_screen_exclusive
typedef struct VkSurfaceFullScreenExclusiveInfoEXT {
    VkStructureType             sType;
    void*                       pNext;
    VkFullScreenExclusiveEXT    fullScreenExclusive;
} VkSurfaceFullScreenExclusiveInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fullScreenExclusive` is a [VkFullScreenExclusiveEXT](VkFullScreenExclusiveEXT.html) value
specifying the preferred full-screen transition behavior.

If this structure is not present, `fullScreenExclusive` is considered to
be [VK_FULL_SCREEN_EXCLUSIVE_DEFAULT_EXT](VkFullScreenExclusiveEXT.html).

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceFullScreenExclusiveInfoEXT-sType-sType) VUID-VkSurfaceFullScreenExclusiveInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_FULL_SCREEN_EXCLUSIVE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkSurfaceFullScreenExclusiveInfoEXT-fullScreenExclusive-parameter) VUID-VkSurfaceFullScreenExclusiveInfoEXT-fullScreenExclusive-parameter

 `fullScreenExclusive` **must** be a valid [VkFullScreenExclusiveEXT](VkFullScreenExclusiveEXT.html) value

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)

* 
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

[VK_EXT_full_screen_exclusive](VK_EXT_full_screen_exclusive.html), [VkFullScreenExclusiveEXT](VkFullScreenExclusiveEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceFullScreenExclusiveInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
