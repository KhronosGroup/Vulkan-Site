# VkRefreshCycleDurationGOOGLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRefreshCycleDurationGOOGLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRefreshCycleDurationGOOGLE - Structure containing the RC duration of a display

The `VkRefreshCycleDurationGOOGLE` structure is defined as:

// Provided by VK_GOOGLE_display_timing
typedef struct VkRefreshCycleDurationGOOGLE {
    uint64_t    refreshDuration;
} VkRefreshCycleDurationGOOGLE;

* 
`refreshDuration` is the number of nanoseconds from the start of one
refresh cycle to the next.

[VK_GOOGLE_display_timing](VK_GOOGLE_display_timing.html), [vkGetRefreshCycleDurationGOOGLE](vkGetRefreshCycleDurationGOOGLE.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkRefreshCycleDurationGOOGLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
