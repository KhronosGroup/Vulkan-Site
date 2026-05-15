# VkQueue(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueue.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueue - Opaque handle to a queue object

Creating a logical device also creates the queues associated with that
device.
The queues to create are described by a set of [VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html)
structures that are passed to [vkCreateDevice](vkCreateDevice.html) in
`pQueueCreateInfos`.
Queues **cannot** be independently destroyed, and are instead destroyed with
the [VkDevice](VkDevice.html) that they were created from.

Queues are represented by `VkQueue` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_HANDLE(VkQueue)

[VK_DEFINE_HANDLE](VK_DEFINE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkExportMetalCommandQueueInfoEXT](VkExportMetalCommandQueueInfoEXT.html), [VkExternalComputeQueueCreateInfoNV](VkExternalComputeQueueCreateInfoNV.html), [vkGetDeviceQueue](vkGetDeviceQueue.html), [vkGetDeviceQueue2](vkGetDeviceQueue2.html), [vkGetQueueCheckpointData2NV](vkGetQueueCheckpointData2NV.html), [vkGetQueueCheckpointDataNV](vkGetQueueCheckpointDataNV.html), [vkQueueBeginDebugUtilsLabelEXT](vkQueueBeginDebugUtilsLabelEXT.html), [vkQueueBindSparse](vkQueueBindSparse.html), [vkQueueEndDebugUtilsLabelEXT](vkQueueEndDebugUtilsLabelEXT.html), [vkQueueInsertDebugUtilsLabelEXT](vkQueueInsertDebugUtilsLabelEXT.html), [vkQueueNotifyOutOfBandNV](vkQueueNotifyOutOfBandNV.html), [vkQueuePresentKHR](vkQueuePresentKHR.html), [vkQueueSetPerformanceConfigurationINTEL](vkQueueSetPerformanceConfigurationINTEL.html), [vkQueueSubmit](vkQueueSubmit.html), [vkQueueSubmit2](vkQueueSubmit2.html), [vkQueueSubmit2](vkQueueSubmit2.html), [vkQueueWaitIdle](vkQueueWaitIdle.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkQueue).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
