# VkDisplayNativeHdrSurfaceCapabilitiesAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayNativeHdrSurfaceCapabilitiesAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayNativeHdrSurfaceCapabilitiesAMD - Structure describing display native HDR specific capabilities of a surface

The `VkDisplayNativeHdrSurfaceCapabilitiesAMD` structure is defined as:

// Provided by VK_AMD_display_native_hdr
typedef struct VkDisplayNativeHdrSurfaceCapabilitiesAMD {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           localDimmingSupport;
} VkDisplayNativeHdrSurfaceCapabilitiesAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`localDimmingSupport` specifies whether the surface supports local
dimming.
If this is [VK_TRUE](VK_TRUE.html), [VkSwapchainDisplayNativeHdrCreateInfoAMD](VkSwapchainDisplayNativeHdrCreateInfoAMD.html)
**can** be used to explicitly enable or disable local dimming for the
surface.
Local dimming may also be overridden by [vkSetLocalDimmingAMD](vkSetLocalDimmingAMD.html)
during the lifetime of the swapchain.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayNativeHdrSurfaceCapabilitiesAMD-sType-sType) VUID-VkDisplayNativeHdrSurfaceCapabilitiesAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_NATIVE_HDR_SURFACE_CAPABILITIES_AMD](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_AMD_display_native_hdr](VK_AMD_display_native_hdr.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayNativeHdrSurfaceCapabilitiesAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
