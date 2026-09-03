# VkPipelineStageFlags2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineStageFlags2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineStageFlags2 - 64-bit mask of pipeline stage flags

`VkPipelineStageFlags2` is a bitmask type for setting a mask of zero or
more [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html) flags:

// Provided by VK_VERSION_1_3
typedef VkFlags64 VkPipelineStageFlags2;

// Provided by VK_KHR_synchronization2
// Equivalent to VkPipelineStageFlags2
typedef VkPipelineStageFlags2 VkPipelineStageFlags2KHR;

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkBufferMemoryBarrier2](VkBufferMemoryBarrier2.html), [VkCheckpointData2NV](VkCheckpointData2NV.html), `VkFlags64`, [VkImageMemoryBarrier2](VkImageMemoryBarrier2.html), [VkMemoryBarrier2](VkMemoryBarrier2.html), [VkMemoryMarkerInfoAMD](VkMemoryMarkerInfoAMD.html), [VkMemoryRangeBarrierKHR](VkMemoryRangeBarrierKHR.html), [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html), [VkQueueFamilyCheckpointProperties2NV](VkQueueFamilyCheckpointProperties2NV.html), [VkSemaphoreSubmitInfo](VkSemaphoreSubmitInfo.html), [VkTensorMemoryBarrierARM](VkTensorMemoryBarrierARM.html), [vkCmdResetEvent2](vkCmdResetEvent2.html), [vkCmdResetEvent2](vkCmdResetEvent2.html), [vkCmdWriteBufferMarker2AMD](vkCmdWriteBufferMarker2AMD.html), [vkCmdWriteTimestamp2](vkCmdWriteTimestamp2.html), [vkCmdWriteTimestamp2](vkCmdWriteTimestamp2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkPipelineStageFlags2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
