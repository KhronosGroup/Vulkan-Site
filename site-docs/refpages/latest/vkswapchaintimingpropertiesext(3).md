# VkSwapchainTimingPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainTimingPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainTimingPropertiesEXT - Structure containing the RC duration of a display

The `VkSwapchainTimingPropertiesEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkSwapchainTimingPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           refreshDuration;
    uint64_t           refreshInterval;
} VkSwapchainTimingPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`refreshDuration` is zero or an indication of the duration of a
refresh cycle.

* 
`refreshInterval` is zero or a duration in nanoseconds indicating
the interval between refresh cycle durations.

If `refreshDuration` is zero, the presentation engine is not able to
determine the duration of the refresh cycle.
Similarly, if `refreshInterval` is zero, the presentation engine is not
able to determine whether it is operating in VRR mode.

Otherwise, if `refreshInterval` is the same as `refreshDuration`,
the presentation engine is operating in FRR mode.
In this case, `refreshDuration` is the number of nanoseconds from the
start of one refresh cycle to the start of the next refresh cycle.

If `refreshInterval` is `UINT64_MAX`, the presentation engine is
operating in VRR mode, and `refreshDuration` is the minimum number of
nanoseconds from the start of one refresh cycle to the start of the next
refresh cycle.

If `refreshDuration` and `refreshInterval` are not zero,
`refreshInterval` is a factor of `refreshDuration`.

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainTimingPropertiesEXT-sType-sType) VUID-VkSwapchainTimingPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_TIMING_PROPERTIES_EXT](VkStructureType.html)

* 
[](#VUID-VkSwapchainTimingPropertiesEXT-pNext-pNext) VUID-VkSwapchainTimingPropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkStructureType](VkStructureType.html), [vkGetSwapchainTimingPropertiesEXT](vkGetSwapchainTimingPropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainTimingPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
