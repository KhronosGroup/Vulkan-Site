# VkSurfaceCapabilitiesPresentBarrierNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceCapabilitiesPresentBarrierNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceCapabilitiesPresentBarrierNV - Structure describing present barrier capabilities of a surface

The `VkSurfaceCapabilitiesPresentBarrierNV` structure is defined as:

// Provided by VK_NV_present_barrier
typedef struct VkSurfaceCapabilitiesPresentBarrierNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentBarrierSupported;
} VkSurfaceCapabilitiesPresentBarrierNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentBarrierSupported` is a boolean describing whether the
surface is able to make use of the present barrier feature.

This structure **can** be included in the `pNext` chain of
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html) to determine support for present barrier
access.
If `presentBarrierSupported` is [VK_FALSE](VK_FALSE.html), it indicates that the
present barrier feature is not obtainable for this surface.

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCapabilitiesPresentBarrierNV-sType-sType) VUID-VkSurfaceCapabilitiesPresentBarrierNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_PRESENT_BARRIER_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_NV_present_barrier](VK_NV_present_barrier.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceCapabilitiesPresentBarrierNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
