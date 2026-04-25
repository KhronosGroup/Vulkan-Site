# VkLatencySurfaceCapabilitiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLatencySurfaceCapabilitiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLatencySurfaceCapabilitiesNV - Structure describing surface optimized presentation modes for use with low latency mode

The `VkLatencySurfaceCapabilitiesNV` structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkLatencySurfaceCapabilitiesNV {
    VkStructureType      sType;
    const void*          pNext;
    uint32_t             presentModeCount;
    VkPresentModeKHR*    pPresentModes;
} VkLatencySurfaceCapabilitiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentModeCount` is the number of presentation modes provided.

* 
`pPresentModes` is list of presentation modes optimized for use with
low latency mode with `presentModeCount` entries.

If `pPresentModes` is `NULL`, then the number of present modes that are
optimized for use with low latency mode returned in `presentModeCount`.
Otherwise, `presentModeCount` **must** be set by the application to the
number of elements in the `pPresentModes` array, and on return is
overwritten with the number of values actually written to
`pPresentModes`.
If the value of `presentModeCount` is less than the number of optimized
present modes, at most `presentModeCount` values will be written to
`pPresentModes`.

Valid Usage (Implicit)

* 
[](#VUID-VkLatencySurfaceCapabilitiesNV-sType-sType) VUID-VkLatencySurfaceCapabilitiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_LATENCY_SURFACE_CAPABILITIES_NV](VkStructureType.html)

* 
[](#VUID-VkLatencySurfaceCapabilitiesNV-pPresentModes-parameter) VUID-VkLatencySurfaceCapabilitiesNV-pPresentModes-parameter

 If `presentModeCount` is not `0`, and `pPresentModes` is not `NULL`, `pPresentModes` **must** be a valid pointer to an array of `presentModeCount` [VkPresentModeKHR](VkPresentModeKHR.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkPresentModeKHR](VkPresentModeKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkLatencySurfaceCapabilitiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
