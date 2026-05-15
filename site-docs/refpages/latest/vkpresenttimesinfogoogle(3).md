# VkPresentTimesInfoGOOGLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentTimesInfoGOOGLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentTimesInfoGOOGLE - The earliest time each image should be presented

When the `[VK_GOOGLE_display_timing](VK_GOOGLE_display_timing.html)` extension is enabled, additional
fields **can** be specified that allow an application to specify the earliest
time that an image should be displayed.
This allows an application to avoid stutter that is caused by an image being
displayed earlier than planned.
Such stuttering can occur with both fixed and variable-refresh-rate
displays, because stuttering occurs when the geometry is not correctly
positioned for when the image is displayed.
An application **can** instruct the presentation engine that an image should
not be displayed earlier than a specified time by adding a
`VkPresentTimesInfoGOOGLE` structure to the `pNext` chain of the
`VkPresentInfoKHR` structure.

The `VkPresentTimesInfoGOOGLE` structure is defined as:

// Provided by VK_GOOGLE_display_timing
typedef struct VkPresentTimesInfoGOOGLE {
    VkStructureType               sType;
    const void*                   pNext;
    uint32_t                      swapchainCount;
    const VkPresentTimeGOOGLE*    pTimes;
} VkPresentTimesInfoGOOGLE;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to by
this command.

* 
`pTimes` is `NULL` or a pointer to an array of
`VkPresentTimeGOOGLE` elements with `swapchainCount` entries.
If not `NULL`, each element of `pTimes` contains the earliest time
to present the image corresponding to the entry in the
`VkPresentInfoKHR`::`pImageIndices` array.

Valid Usage

* 
[](#VUID-VkPresentTimesInfoGOOGLE-swapchainCount-01247) VUID-VkPresentTimesInfoGOOGLE-swapchainCount-01247

`swapchainCount` **must** be the same value as
`VkPresentInfoKHR`::`swapchainCount`, where
`VkPresentInfoKHR` is included in the `pNext` chain of this
`VkPresentTimesInfoGOOGLE` structure

Valid Usage (Implicit)

* 
[](#VUID-VkPresentTimesInfoGOOGLE-sType-sType) VUID-VkPresentTimesInfoGOOGLE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_TIMES_INFO_GOOGLE](VkStructureType.html)

* 
[](#VUID-VkPresentTimesInfoGOOGLE-pTimes-parameter) VUID-VkPresentTimesInfoGOOGLE-pTimes-parameter

 If `pTimes` is not `NULL`, `pTimes` **must** be a valid pointer to an array of `swapchainCount` [VkPresentTimeGOOGLE](VkPresentTimeGOOGLE.html) structures

* 
[](#VUID-VkPresentTimesInfoGOOGLE-swapchainCount-arraylength) VUID-VkPresentTimesInfoGOOGLE-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](VkPresentInfoKHR.html)

[VK_GOOGLE_display_timing](VK_GOOGLE_display_timing.html), [VkPresentTimeGOOGLE](VkPresentTimeGOOGLE.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentTimesInfoGOOGLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
