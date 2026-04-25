# VkSurfaceProtectedCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceProtectedCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceProtectedCapabilitiesKHR - Structure describing capability of a surface to be protected

An application queries if a protected [VkSurfaceKHR](VkSurfaceKHR.html) is displayable on a
specific windowing system using `VkSurfaceProtectedCapabilitiesKHR`,
which **can** be passed in `pNext` parameter of
`VkSurfaceCapabilities2KHR`.

The `VkSurfaceProtectedCapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_surface_protected_capabilities
typedef struct VkSurfaceProtectedCapabilitiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           supportsProtected;
} VkSurfaceProtectedCapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`supportsProtected` specifies whether a protected swapchain created
from [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)::`surface` for a
particular windowing system **can** be displayed on screen or not.
If `supportsProtected` is [VK_TRUE](VK_TRUE.html), then creation of swapchains
with the [VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html) flag set **must** be
supported for `surface`.

If the `[VK_GOOGLE_surfaceless_query](VK_GOOGLE_surfaceless_query.html)` extension is enabled, the value
returned in `supportsProtected` will be identical for every valid
surface created on this physical device, and so in the
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html) call,
[VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)::`surface` **can** be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html).
In that case, the contents of
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)::`surfaceCapabilities` as well as any
other structure chained to it will be **undefined**.

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceProtectedCapabilitiesKHR-sType-sType) VUID-VkSurfaceProtectedCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_PROTECTED_CAPABILITIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_KHR_surface_protected_capabilities](VK_KHR_surface_protected_capabilities.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceProtectedCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
