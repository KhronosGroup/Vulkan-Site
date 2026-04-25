# VkPipelineStageFlags(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineStageFlags.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineStageFlags - Bitmask of VkPipelineStageFlagBits

|  | This functionality is superseded by [VkPipelineStageFlags2](../../../../spec/latest/chapters/synchronization.html#VkPipelineStageFlags2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef VkFlags VkPipelineStageFlags;

`VkPipelineStageFlags` is a bitmask type for setting a mask of zero or
more [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html).

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkFlags`, [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html), [VkQueueFamilyCheckpointPropertiesNV](VkQueueFamilyCheckpointPropertiesNV.html), [VkSubmitInfo](VkSubmitInfo.html), [VkSubpassDependency](VkSubpassDependency.html), [VkSubpassDependency2](VkSubpassDependency2.html), [vkCmdPipelineBarrier](vkCmdPipelineBarrier.html), [vkCmdResetEvent](vkCmdResetEvent.html), [vkCmdSetEvent](vkCmdSetEvent.html), [vkCmdWaitEvents](vkCmdWaitEvents.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkPipelineStageFlags).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
