# VkVideoSessionKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoSessionKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoSessionKHR - Opaque handle to a video session object

Video sessions are objects that represent and maintain the state needed to
perform video decode or encode operations using a specific video profile.

In case of video encode profiles this includes the current
[rate control](../../../../spec/latest/chapters/videocoding.html#encode-rate-control) configuration and the currently set
[video encode quality level](../../../../spec/latest/chapters/videocoding.html#encode-quality-level).

Video sessions are represented by `VkVideoSessionKHR` handles:

// Provided by VK_KHR_video_queue
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkVideoSessionKHR)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_KHR_video_queue](VK_KHR_video_queue.html), [VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html), [VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html), [vkBindVideoSessionMemoryKHR](vkBindVideoSessionMemoryKHR.html), [vkCreateVideoSessionKHR](vkCreateVideoSessionKHR.html), [vkDestroyVideoSessionKHR](vkDestroyVideoSessionKHR.html), [vkGetVideoSessionMemoryRequirementsKHR](vkGetVideoSessionMemoryRequirementsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoSessionKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
