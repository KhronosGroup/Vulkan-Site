# VkSurfaceCapabilities2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceCapabilities2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceCapabilities2KHR - Structure describing capabilities of a surface

The `VkSurfaceCapabilities2KHR` structure is defined as:

// Provided by VK_KHR_get_surface_capabilities2
typedef struct VkSurfaceCapabilities2KHR {
    VkStructureType             sType;
    void*                       pNext;
    VkSurfaceCapabilitiesKHR    surfaceCapabilities;
} VkSurfaceCapabilities2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`surfaceCapabilities` is a [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html) structure
describing the capabilities of the specified surface.

If the `[VK_GOOGLE_surfaceless_query](VK_GOOGLE_surfaceless_query.html)` extension is enabled and
[VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)::`surface` in the
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html) call is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the values returned in `minImageCount`,
`maxImageCount`, `currentExtent`, and `currentTransform` will
not reflect that of any surface and will instead be as such:

* 
`minImageCount` and `maxImageCount` will be 0xFFFFFFFF

* 
`currentExtent` will be (0xFFFFFFFF, 0xFFFFFFFF)

* 
`currentTransform` will be
[VK_SURFACE_TRANSFORM_INHERIT_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCapabilities2KHR-sType-sType) VUID-VkSurfaceCapabilities2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_2_KHR](VkStructureType.html)

* 
[](#VUID-VkSurfaceCapabilities2KHR-pNext-pNext) VUID-VkSurfaceCapabilities2KHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDisplayNativeHdrSurfaceCapabilitiesAMD](VkDisplayNativeHdrSurfaceCapabilitiesAMD.html), [VkLatencySurfaceCapabilitiesNV](VkLatencySurfaceCapabilitiesNV.html), [VkPresentTimingSurfaceCapabilitiesEXT](VkPresentTimingSurfaceCapabilitiesEXT.html), [VkSharedPresentSurfaceCapabilitiesKHR](VkSharedPresentSurfaceCapabilitiesKHR.html), [VkSurfaceCapabilitiesFullScreenExclusiveEXT](VkSurfaceCapabilitiesFullScreenExclusiveEXT.html), [VkSurfaceCapabilitiesPresentBarrierNV](VkSurfaceCapabilitiesPresentBarrierNV.html), [VkSurfaceCapabilitiesPresentId2KHR](VkSurfaceCapabilitiesPresentId2KHR.html), [VkSurfaceCapabilitiesPresentWait2KHR](VkSurfaceCapabilitiesPresentWait2KHR.html), [VkSurfacePresentModeCompatibilityKHR](VkSurfacePresentModeCompatibilityKHR.html), [VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html), or [VkSurfaceProtectedCapabilitiesKHR](VkSurfaceProtectedCapabilitiesKHR.html)

* 
[](#VUID-VkSurfaceCapabilities2KHR-sType-unique) VUID-VkSurfaceCapabilities2KHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html), [VkStructureType](VkStructureType.html), [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html), [vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceCapabilities2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
