# VkPresentIdKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentIdKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentIdKHR - The list of presentation identifiers

The `VkPresentIdKHR` structure is defined as:

// Provided by VK_KHR_present_id
typedef struct VkPresentIdKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           swapchainCount;
    const uint64_t*    pPresentIds;
} VkPresentIdKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to the
[vkQueuePresentKHR](vkQueuePresentKHR.html) command.

* 
`pPresentIds` is `NULL` or a pointer to an array of `uint64_t`
with `swapchainCount` entries.
If not `NULL`, each non-zero value in `pPresentIds` specifies the
present id to be associated with the presentation of the swapchain with
the same index in the [vkQueuePresentKHR](vkQueuePresentKHR.html) call.

For applications to be able to reference specific presentation events queued
by a call to [vkQueuePresentKHR](vkQueuePresentKHR.html), an identifier needs to be associated
with them.
When the [`presentId`](../../../../spec/latest/chapters/features.html#features-presentId) feature is enabled,
applications **can** include the `VkPresentIdKHR` structure in the
`pNext` chain of the [VkPresentInfoKHR](VkPresentInfoKHR.html) structure to supply
identifiers.

Each [VkSwapchainKHR](VkSwapchainKHR.html) has a presentId associated with it.
This value is initially zero when the `VkSwapchainKHR` is created.

When a `VkPresentIdKHR` structure with a non-NULL `pPresentIds` is
included in the `pNext` chain of a [VkPresentInfoKHR](VkPresentInfoKHR.html) structure,
each `pSwapchains` entry has a presentId associated in the
`pPresentIds` array at the same index as the swapchain in the
`pSwapchains` array.
If this presentId is non-zero, then the application **can** later use this
value to refer to that image presentation.
A value of zero indicates that this presentation has no associated
presentId.
A non-zero presentId **must** be greater than any non-zero presentId passed
previously by the application for the same swapchain.

There is no requirement for any precise timing relationship between the
presentation of the image to the user and the update of the presentId value,
but implementations **should** make this as close as possible to the
presentation of the first pixel in the new image to the user.

Valid Usage

* 
[](#VUID-VkPresentIdKHR-swapchainCount-04998) VUID-VkPresentIdKHR-swapchainCount-04998

`swapchainCount` **must** be the same value as
[VkPresentInfoKHR](VkPresentInfoKHR.html)::`swapchainCount`, where this
`VkPresentIdKHR` is in the `pNext` chain of the
[VkPresentInfoKHR](VkPresentInfoKHR.html) structure

* 
[](#VUID-VkPresentIdKHR-presentIds-04999) VUID-VkPresentIdKHR-presentIds-04999

Each non-zero entry in `presentIds` **must** be greater than all
previously submitted present ids for the associated swapchain in
[VkPresentInfoKHR](VkPresentInfoKHR.html)::`pSwapchains`

Valid Usage (Implicit)

* 
[](#VUID-VkPresentIdKHR-sType-sType) VUID-VkPresentIdKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_ID_KHR](VkStructureType.html)

* 
[](#VUID-VkPresentIdKHR-pPresentIds-parameter) VUID-VkPresentIdKHR-pPresentIds-parameter

 If `pPresentIds` is not `NULL`, `pPresentIds` **must** be a valid pointer to an array of `swapchainCount` `uint64_t` values

* 
[](#VUID-VkPresentIdKHR-swapchainCount-arraylength) VUID-VkPresentIdKHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](VkPresentInfoKHR.html)

[VK_KHR_present_id](VK_KHR_present_id.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentIdKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
