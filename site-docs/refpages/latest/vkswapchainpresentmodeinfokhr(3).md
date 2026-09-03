# VkSwapchainPresentModeInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainPresentModeInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainPresentModeInfoKHR - Presentation modes for a vkQueuePresentKHR operation

The `VkSwapchainPresentModeInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain_maintenance1
typedef struct VkSwapchainPresentModeInfoKHR {
    VkStructureType            sType;
    const void*                pNext;
    uint32_t                   swapchainCount;
    const VkPresentModeKHR*    pPresentModes;
} VkSwapchainPresentModeInfoKHR;

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to VkSwapchainPresentModeInfoKHR
typedef VkSwapchainPresentModeInfoKHR VkSwapchainPresentModeInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to by
this command.

* 
`pPresentModes` is a list of presentation modes with
`swapchainCount` entries.

If the `pNext` chain of [VkPresentInfoKHR](VkPresentInfoKHR.html) includes a
`VkSwapchainPresentModeInfoKHR` structure, then that structure defines
the presentation modes used for the current and subsequent presentation
operations.

When the application changes present modes with
[VkSwapchainPresentModeInfoKHR](#), images that have already been queued
for presentation will continue to be presented according to the previous
present mode.
The current image being queued for presentation and subsequent images will
be presented according to the new present mode.
The behavior during the transition between the two modes is defined as
follows.

* 
Transition from [VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html) to
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html): the presentation engine
updates the shared presentable image according to the behavior of
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html).

* 
Transition from [VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html) to
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html): the presentation
engine **may** update the shared presentable image or defer that to its
regular refresh cycle, according to the behavior of
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html).

* 
Transition between [VK_PRESENT_MODE_FIFO_KHR](VkPresentModeKHR.html) and
[VK_PRESENT_MODE_FIFO_RELAXED_KHR](VkPresentModeKHR.html): Images continue to be appended
to the same FIFO queue, and the behavior with respect to waiting for
vertical blanking period will follow the new mode for current and
subsequent images.

* 
Transition from [VK_PRESENT_MODE_IMMEDIATE_KHR](VkPresentModeKHR.html) to
[VK_PRESENT_MODE_FIFO_KHR](VkPresentModeKHR.html) or [VK_PRESENT_MODE_FIFO_RELAXED_KHR](VkPresentModeKHR.html)
or [VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VkPresentModeKHR.html)
: As all prior present requests in the
[VK_PRESENT_MODE_IMMEDIATE_KHR](VkPresentModeKHR.html) mode are applied immediately, there
are no outstanding present operations in this mode, and current and
subsequent images are appended to the FIFO queue and presented according
to the new mode.

* 
Transition from [VK_PRESENT_MODE_MAILBOX_KHR](VkPresentModeKHR.html) to
[VK_PRESENT_MODE_FIFO_KHR](VkPresentModeKHR.html) or [VK_PRESENT_MODE_FIFO_RELAXED_KHR](VkPresentModeKHR.html)
or [VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VkPresentModeKHR.html)
: Presentation in FIFO modes require waiting for the next vertical
blanking period, with [VK_PRESENT_MODE_MAILBOX_KHR](VkPresentModeKHR.html) allowing the
pending present operation to be replaced by a new one.
In this case, the current present operation will replace the pending
present operation and is applied according to the new mode.

* 
Transition from [VK_PRESENT_MODE_FIFO_KHR](VkPresentModeKHR.html) or
[VK_PRESENT_MODE_FIFO_RELAXED_KHR](VkPresentModeKHR.html)
or [VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VkPresentModeKHR.html)
to [VK_PRESENT_MODE_IMMEDIATE_KHR](VkPresentModeKHR.html) or
[VK_PRESENT_MODE_MAILBOX_KHR](VkPresentModeKHR.html): If the FIFO queue is empty,
presentation is done according to the behavior of the new mode.
If there are present operations in the FIFO queue, once the last present
operation is performed based on the respective vertical blanking period,
the current and subsequent updates are applied according to the new
mode.

* 
Transition between [VK_PRESENT_MODE_FIFO_KHR](VkPresentModeKHR.html) or
[VK_PRESENT_MODE_FIFO_RELAXED_KHR](VkPresentModeKHR.html), and
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VkPresentModeKHR.html): Images continue to be
appended to the same FIFO queue, and the behavior with respect to
waiting for vertical blanking period and dequeuing requests will follow
the new mode for current and subsequent images.

* 
The behavior during transition between any other present modes, if
possible, is implementation defined.

Valid Usage

* 
[](#VUID-VkSwapchainPresentModeInfoKHR-swapchainCount-07760) VUID-VkSwapchainPresentModeInfoKHR-swapchainCount-07760

`swapchainCount` **must** be equal to
[VkPresentInfoKHR](VkPresentInfoKHR.html)::`swapchainCount`

* 
[](#VUID-VkSwapchainPresentModeInfoKHR-pPresentModes-07761) VUID-VkSwapchainPresentModeInfoKHR-pPresentModes-07761

Each entry in `pPresentModes` **must** be a presentation mode specified
in [VkSwapchainPresentModesCreateInfoKHR](VkSwapchainPresentModesCreateInfoKHR.html)::`pPresentModes` when
creating the entry’s corresponding swapchain

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainPresentModeInfoKHR-sType-sType) VUID-VkSwapchainPresentModeInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_MODE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkSwapchainPresentModeInfoKHR-pPresentModes-parameter) VUID-VkSwapchainPresentModeInfoKHR-pPresentModes-parameter

 `pPresentModes` **must** be a valid pointer to an array of `swapchainCount` valid [VkPresentModeKHR](VkPresentModeKHR.html) values

* 
[](#VUID-VkSwapchainPresentModeInfoKHR-swapchainCount-arraylength) VUID-VkSwapchainPresentModeInfoKHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](VkPresentInfoKHR.html)

[VK_EXT_swapchain_maintenance1](VK_EXT_swapchain_maintenance1.html), [VK_KHR_swapchain_maintenance1](VK_KHR_swapchain_maintenance1.html), [VkPresentModeKHR](VkPresentModeKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainPresentModeInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
