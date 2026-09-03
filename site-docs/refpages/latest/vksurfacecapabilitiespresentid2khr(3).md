# VkSurfaceCapabilitiesPresentId2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceCapabilitiesPresentId2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceCapabilitiesPresentId2KHR - Structure describing presentation-ID capabilities of a surface

The `VkSurfaceCapabilitiesPresentId2KHR` structure is defined as:

// Provided by VK_KHR_present_id2
typedef struct VkSurfaceCapabilitiesPresentId2KHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentId2Supported;
} VkSurfaceCapabilitiesPresentId2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentId2Supported` is a boolean describing whether the surface is
able to support the present-ID extension

This structure **can** be included in the `pNext` chain of
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html) to determine support for present-wait.
If `presentId2Supported` is [VK_FALSE](VK_FALSE.html), it indicates that attaching
an ID to presentation requests is not possible for this surface.

Applications **must** not attempt to include [VkPresentId2KHR](VkPresentId2KHR.html) in the
`pNext` chain of a [VkPresentInfoKHR](VkPresentInfoKHR.html) if `presentId2Supported`
is [VK_FALSE](VK_FALSE.html).

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCapabilitiesPresentId2KHR-sType-sType) VUID-VkSurfaceCapabilitiesPresentId2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_PRESENT_ID_2_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_KHR_present_id2](VK_KHR_present_id2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceCapabilitiesPresentId2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
