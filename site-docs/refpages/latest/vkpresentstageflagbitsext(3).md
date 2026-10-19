# VkPresentStageFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentStageFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentStageFlagBitsEXT - Bitmask specifying stages of the image presentation process

Presenting an image to the user typically involves multiple stages.
Bits which **can** be set to specify present stages are:

// Provided by VK_EXT_present_timing
typedef enum VkPresentStageFlagBitsEXT {
    VK_PRESENT_STAGE_QUEUE_OPERATIONS_END_BIT_EXT = 0x00000001,
    VK_PRESENT_STAGE_REQUEST_DEQUEUED_BIT_EXT = 0x00000002,
    VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_OUT_BIT_EXT = 0x00000004,
    VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_VISIBLE_BIT_EXT = 0x00000008,
} VkPresentStageFlagBitsEXT;

* 
[VK_PRESENT_STAGE_QUEUE_OPERATIONS_END_BIT_EXT](#) marks the end of the
set of queue operations enqueued by [vkQueuePresentKHR](vkQueuePresentKHR.html) on the
provided `VkQueue` for a presentation request.

* 
[VK_PRESENT_STAGE_REQUEST_DEQUEUED_BIT_EXT](#) is the stage after which
the presentation request has been dequeued from the swapchain’s internal
presentation request queue, if any, as specified by the present mode
associated with that request.

* 
[VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_OUT_BIT_EXT](#) is the stage after
which data for the first pixel of the presentation request associated
with the image has left the presentation engine for a display hardware.

* 
[VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_VISIBLE_BIT_EXT](#) is the stage
after which a display hardware has made the first pixel visible for the
presentation request associated with the image to be presented.

|  | The set of queue operations delimited by
| --- | --- |
[VK_PRESENT_STAGE_QUEUE_OPERATIONS_END_BIT_EXT](#) includes the wait for
the semaphores specified in [VkPresentInfoKHR](VkPresentInfoKHR.html)::`pWaitSemaphores`,
if any, and any work implicitly enqueued by the implementation. |

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkPresentStageFlagsEXT](VkPresentStageFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentStageFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
