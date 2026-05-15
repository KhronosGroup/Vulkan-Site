# VkPresentInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentInfoKHR - Structure describing parameters of a queue presentation

The `VkPresentInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain
typedef struct VkPresentInfoKHR {
    VkStructureType          sType;
    const void*              pNext;
    uint32_t                 waitSemaphoreCount;
    const VkSemaphore*       pWaitSemaphores;
    uint32_t                 swapchainCount;
    const VkSwapchainKHR*    pSwapchains;
    const uint32_t*          pImageIndices;
    VkResult*                pResults;
} VkPresentInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`waitSemaphoreCount` is the number of semaphores to wait for before
issuing the present request.
The number **may** be zero.

* 
`pWaitSemaphores` is `NULL` or a pointer to an array of
[VkSemaphore](VkSemaphore.html) objects with `waitSemaphoreCount` entries, and
specifies the semaphores to wait for before issuing the present request.

* 
`swapchainCount` is the number of swapchains being presented to by
this command.

* 
`pSwapchains` is a pointer to an array of [VkSwapchainKHR](VkSwapchainKHR.html)
objects with `swapchainCount` entries.

* 
`pImageIndices` is a pointer to an array of indices into the array
of each swapchain’s presentable images, with `swapchainCount`
entries.
Each entry in this array identifies the image to present on the
corresponding entry in the `pSwapchains` array.

* 
`pResults` is a pointer to an array of [VkResult](VkResult.html) typed elements
with `swapchainCount` entries.
Applications that do not need per-swapchain results **can** use `NULL` for
`pResults`.
If non-`NULL`, each entry in `pResults` will be set to the
[VkResult](VkResult.html) for presenting the swapchain corresponding to the same
index in `pSwapchains`.

Before an application **can** present an image, the image’s layout **must** be
transitioned to the [VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](VkImageLayout.html)
layout, or for a shared presentable image the
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html) layout.

|  | When transitioning the image to the appropriate layout, there is no need to
| --- | --- |
delay subsequent processing, or perform any visibility operations (as
[vkQueuePresentKHR](vkQueuePresentKHR.html) performs automatic visibility operations).
To achieve this, the `dstAccessMask` member of the
[VkImageMemoryBarrier](VkImageMemoryBarrier.html) **should** be `0`, and the `dstStageMask`
parameter **should** be [VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT](VkPipelineStageFlagBits.html). |

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) of
each [semaphore wait operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-waiting) defined
by this structure includes presentation of each image indicated by
`pSwapchains` and `pImageIndices`.

Valid Usage

* 
[](#VUID-VkPresentInfoKHR-pSwapchain-09231) VUID-VkPresentInfoKHR-pSwapchain-09231

Elements of `pSwapchain` **must** be unique

* 
[](#VUID-VkPresentInfoKHR-pImageIndices-01430) VUID-VkPresentInfoKHR-pImageIndices-01430

Each element of `pImageIndices` **must** be the index of a presentable
image acquired from the swapchain specified by the corresponding element
of the `pSwapchains` array, and the presented image subresource
**must** be in the [VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](VkImageLayout.html)
or [VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html)
layout at the time the operation is executed on a `VkDevice`

* 
[](#VUID-VkPresentInfoKHR-pNext-06235) VUID-VkPresentInfoKHR-pNext-06235

If a [VkPresentIdKHR](VkPresentIdKHR.html) structure is included in the `pNext`
chain, and the [`presentId`](../../../../spec/latest/chapters/features.html#features-presentId) feature is not
enabled, each `presentIds` entry in that structure **must** be NULL

* 
[](#VUID-VkPresentInfoKHR-swapchainMaintenance1-10158) VUID-VkPresentInfoKHR-swapchainMaintenance1-10158

If the [`swapchainMaintenance1`](../../../../spec/latest/chapters/features.html#features-swapchainMaintenance1)
feature is not enabled, then the `pNext` chain **must** not include a
[VkSwapchainPresentFenceInfoKHR](VkSwapchainPresentFenceInfoKHR.html) structure

* 
[](#VUID-VkPresentInfoKHR-pSwapchains-09199) VUID-VkPresentInfoKHR-pSwapchains-09199

If any element of the `pSwapchains` array has been created with
[VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html), all of the elements of this
array **must** be created with [VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html)

* 
[](#VUID-VkPresentInfoKHR-pNext-09759) VUID-VkPresentInfoKHR-pNext-09759

If the `pNext` chain of this structure includes a
[VkFrameBoundaryTensorsARM](VkFrameBoundaryTensorsARM.html) structure then it **must** also include a
[VkFrameBoundaryEXT](VkFrameBoundaryEXT.html) structure

* 
[](#VUID-VkPresentInfoKHR-pNext-10821) VUID-VkPresentInfoKHR-pNext-10821

If a [VkPresentId2KHR](VkPresentId2KHR.html) structure is included in the `pNext`
chain, and the [`presentId2`](../../../../spec/latest/chapters/features.html#features-presentId2) feature is not
enabled, each `presentIds` entry in that structure **must** be zero

* 
[](#VUID-VkPresentInfoKHR-presentId2Supported-10822) VUID-VkPresentInfoKHR-presentId2Supported-10822

If a [VkPresentId2KHR](VkPresentId2KHR.html) structure is included and contains non-zero
presentIds, `presentId2Supported` **must** be [VK_TRUE](VK_TRUE.html) in the
[VkSurfaceCapabilitiesPresentId2KHR](VkSurfaceCapabilitiesPresentId2KHR.html) structure returned by
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html) for the `surface`

Valid Usage (Implicit)

* 
[](#VUID-VkPresentInfoKHR-sType-sType) VUID-VkPresentInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkPresentInfoKHR-pNext-pNext) VUID-VkPresentInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceGroupPresentInfoKHR](VkDeviceGroupPresentInfoKHR.html), [VkDisplayPresentInfoKHR](VkDisplayPresentInfoKHR.html), [VkFrameBoundaryEXT](VkFrameBoundaryEXT.html), [VkFrameBoundaryTensorsARM](VkFrameBoundaryTensorsARM.html), [VkPresentFrameTokenGGP](VkPresentFrameTokenGGP.html), [VkPresentId2KHR](VkPresentId2KHR.html), [VkPresentIdKHR](VkPresentIdKHR.html), [VkPresentRegionsKHR](VkPresentRegionsKHR.html), [VkPresentTimesInfoGOOGLE](VkPresentTimesInfoGOOGLE.html), [VkPresentTimingsInfoEXT](VkPresentTimingsInfoEXT.html), [VkSetPresentConfigNV](VkSetPresentConfigNV.html), [VkSwapchainPresentFenceInfoKHR](VkSwapchainPresentFenceInfoKHR.html), or [VkSwapchainPresentModeInfoKHR](VkSwapchainPresentModeInfoKHR.html)

* 
[](#VUID-VkPresentInfoKHR-sType-unique) VUID-VkPresentInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPresentInfoKHR-pWaitSemaphores-parameter) VUID-VkPresentInfoKHR-pWaitSemaphores-parameter

 If `waitSemaphoreCount` is not `0`, `pWaitSemaphores` **must** be a valid pointer to an array of `waitSemaphoreCount` valid [VkSemaphore](VkSemaphore.html) handles

* 
[](#VUID-VkPresentInfoKHR-pSwapchains-parameter) VUID-VkPresentInfoKHR-pSwapchains-parameter

 `pSwapchains` **must** be a valid pointer to an array of `swapchainCount` valid [VkSwapchainKHR](VkSwapchainKHR.html) handles

* 
[](#VUID-VkPresentInfoKHR-pImageIndices-parameter) VUID-VkPresentInfoKHR-pImageIndices-parameter

 `pImageIndices` **must** be a valid pointer to an array of `swapchainCount` `uint32_t` values

* 
[](#VUID-VkPresentInfoKHR-pResults-parameter) VUID-VkPresentInfoKHR-pResults-parameter

 If `pResults` is not `NULL`, `pResults` **must** be a valid pointer to an array of `swapchainCount` [VkResult](VkResult.html) values

* 
[](#VUID-VkPresentInfoKHR-swapchainCount-arraylength) VUID-VkPresentInfoKHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

* 
[](#VUID-VkPresentInfoKHR-commonparent) VUID-VkPresentInfoKHR-commonparent

 Both of the elements of `pSwapchains`, and the elements of `pWaitSemaphores` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to each member of `pWaitSemaphores` **must** be externally synchronized

* 
Host access to each member of `pSwapchains` **must** be externally synchronized

[VK_KHR_swapchain](VK_KHR_swapchain.html), [VkResult](VkResult.html), [VkSemaphore](VkSemaphore.html), [VkStructureType](VkStructureType.html), [VkSwapchainKHR](VkSwapchainKHR.html), [vkQueuePresentKHR](vkQueuePresentKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
