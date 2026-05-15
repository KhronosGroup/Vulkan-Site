# VkPresentId2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentId2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentId2KHR - The list of presentation identifiers

The `VkPresentId2KHR` structure is defined as:

// Provided by VK_KHR_present_id2
typedef struct VkPresentId2KHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           swapchainCount;
    const uint64_t*    pPresentIds;
} VkPresentId2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to the
[vkQueuePresentKHR](vkQueuePresentKHR.html) command.

* 
`pPresentIds` is `NULL` or a pointer to an array of uint64_t with
`swapchainCount` entries.
If not `NULL`, each non-zero value in `pPresentIds` specifies the
present id to be associated with the presentation of the swapchain with
the same index in the [vkQueuePresentKHR](vkQueuePresentKHR.html) call.

For applications to be able to reference specific presentation events queued
by a call to [vkQueuePresentKHR](vkQueuePresentKHR.html), an identifier needs to be associated
with them.

When the [VkSurfaceCapabilitiesPresentId2KHR](VkSurfaceCapabilitiesPresentId2KHR.html) surface capability is
present for a surface, applications **can** include the `VkPresentId2KHR`
structure in the `pNext` chain of the [VkPresentInfoKHR](VkPresentInfoKHR.html) structure
to associate an identifier with each presentation request.
The `pPresentIds` provides an identifier for the swapchain present at
the corresponding index in [VkPresentInfoKHR](VkPresentInfoKHR.html)’s `pSwapchains` array.

If this presentId is non-zero, then the application **can** later use this
value to refer to that image presentation.
A value of zero indicates that this presentation has no associated
presentId.
A non-zero presentId **must** be greater than any non-zero presentId passed
previously by the application for the same swapchain.

If a non-zero presentId was provided, this may be used with
[vkWaitForPresent2KHR](vkWaitForPresent2KHR.html) for the application to synchronize against the
presentation engine’s processing of the presentation request.

|  | The ID namespace used by this extension **must** be shared with other
| --- | --- |
extensions that allow the application to provide a 64-bit monotonically
increasing presentation ID, such as the original VK_KHR_present_id.

This is to allow existing extensions that depend on VK_KHR_present_id to use
VK_KHR_present_id2 provided IDs without change, as well as to simplify
writing future extensions that require application provided presentation
IDs. |

Valid Usage

* 
[](#VUID-VkPresentId2KHR-swapchainCount-10818) VUID-VkPresentId2KHR-swapchainCount-10818

`swapchainCount` **must** be the same value as
[VkPresentInfoKHR](VkPresentInfoKHR.html)::`swapchainCount`, where this
`VkPresentId2KHR` is in the `pNext` chain of the
[VkPresentInfoKHR](VkPresentInfoKHR.html) structure

* 
[](#VUID-VkPresentId2KHR-presentIds-10819) VUID-VkPresentId2KHR-presentIds-10819

Each non-zero entry in `presentIds` **must** be greater than all
previously submitted present ids for the associated swapchain in
[VkPresentInfoKHR](VkPresentInfoKHR.html)::`pSwapchains`

* 
[](#VUID-VkPresentId2KHR-None-10820) VUID-VkPresentId2KHR-None-10820

The swapchain must have been created with
[VK_SWAPCHAIN_CREATE_PRESENT_ID_2_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html) bit set in the
[VkSwapchainCreateFlagBitsKHR](VkSwapchainCreateFlagBitsKHR.html) field

Valid Usage (Implicit)

* 
[](#VUID-VkPresentId2KHR-sType-sType) VUID-VkPresentId2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_ID_2_KHR](VkStructureType.html)

* 
[](#VUID-VkPresentId2KHR-pPresentIds-parameter) VUID-VkPresentId2KHR-pPresentIds-parameter

 If `pPresentIds` is not `NULL`, `pPresentIds` **must** be a valid pointer to an array of `swapchainCount` `uint64_t` values

* 
[](#VUID-VkPresentId2KHR-swapchainCount-arraylength) VUID-VkPresentId2KHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](VkPresentInfoKHR.html)

[VK_KHR_present_id2](VK_KHR_present_id2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentId2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
