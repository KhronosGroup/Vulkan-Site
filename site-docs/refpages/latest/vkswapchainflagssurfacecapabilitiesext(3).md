# VkSwapchainFlagsSurfaceCapabilitiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainFlagsSurfaceCapabilitiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainFlagsSurfaceCapabilitiesEXT - Structure describing supported swapchain create flags for a surface

The `VkSwapchainFlagsSurfaceCapabilitiesEXT` structure is defined as:

// Provided by VK_EXT_multisampled_render_to_swapchain
typedef struct VkSwapchainFlagsSurfaceCapabilitiesEXT {
    VkStructureType              sType;
    void*                        pNext;
    VkSwapchainCreateFlagsKHR    swapchainSupportedFlags;
} VkSwapchainFlagsSurfaceCapabilitiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainSupportedFlags` is a bitmask of
[VkSwapchainCreateFlagsKHR](VkSwapchainCreateFlagsKHR.html) representing the supported flags in
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) when creating a swapchain for the surface
on the specified device.
If a [VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html) structure is included in the
`pNext` chain of `pSurfaceInfo` in
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html), this value represents
the supported flags for the specified present mode and those compatible
with it as returned in [VkSurfacePresentModeCompatibilityKHR](VkSurfacePresentModeCompatibilityKHR.html).

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainFlagsSurfaceCapabilitiesEXT-sType-sType) VUID-VkSwapchainFlagsSurfaceCapabilitiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_FLAGS_SURFACE_CAPABILITIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_EXT_multisampled_render_to_swapchain](VK_EXT_multisampled_render_to_swapchain.html), [VkStructureType](VkStructureType.html), [VkSwapchainCreateFlagsKHR](VkSwapchainCreateFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainFlagsSurfaceCapabilitiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
