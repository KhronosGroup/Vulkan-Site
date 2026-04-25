# VkPresentTimingSurfaceCapabilitiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentTimingSurfaceCapabilitiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentTimingSurfaceCapabilitiesEXT - Structure describing present timing capabilities of a surface

The `VkPresentTimingSurfaceCapabilitiesEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPresentTimingSurfaceCapabilitiesEXT {
    VkStructureType           sType;
    void*                     pNext;
    VkBool32                  presentTimingSupported;
    VkBool32                  presentAtAbsoluteTimeSupported;
    VkBool32                  presentAtRelativeTimeSupported;
    VkPresentStageFlagsEXT    presentStageQueries;
} VkPresentTimingSurfaceCapabilitiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentTimingSupported` indicates whether querying presentation
timestamps is supported for a swapchain created from
[VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)::`surface`.

* 
`presentAtAbsoluteTimeSupported` indicates whether a swapchain
created from [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)::`surface`
supports presenting images with absolute times.

* 
`presentAtRelativeTimeSupported` indicates whether a swapchain
created from [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)::`surface`
supports presenting images with relative times.

* 
`presentStageQueries` is a bitmask of
[VkPresentStageFlagBitsEXT](VkPresentStageFlagBitsEXT.html) indicating which present stages a
swapchain created from
[VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)::`surface` is able to provide
timing information for.

If `presentTimingSupported` is [VK_TRUE](VK_TRUE.html), the implementation **must**
also advertise support for at least the
[VK_PRESENT_STAGE_QUEUE_OPERATIONS_END_BIT_EXT](VkPresentStageFlagBitsEXT.html) present stage in pname
`presentStageQueries`.

Valid Usage (Implicit)

* 
[](#VUID-VkPresentTimingSurfaceCapabilitiesEXT-sType-sType) VUID-VkPresentTimingSurfaceCapabilitiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_TIMING_SURFACE_CAPABILITIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

[VK_EXT_present_timing](VK_EXT_present_timing.html), `VkBool32`, [VkPresentStageFlagsEXT](VkPresentStageFlagsEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentTimingSurfaceCapabilitiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
