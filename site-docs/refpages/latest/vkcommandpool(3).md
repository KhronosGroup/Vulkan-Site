# VkCommandPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandPool - Opaque handle to a command pool object

Command pools are opaque objects that command buffer memory is allocated
from, and which allow the implementation to amortize the cost of resource
creation across multiple command buffers.
Command pools are externally synchronized, meaning that a command pool **must**
not be used concurrently in multiple threads.
That includes use via recording commands on any command buffers allocated
from the pool, as well as operations that allocate, free, and reset command
buffers or the pool itself.

Command pools are represented by `VkCommandPool` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkCommandPool)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBufferAllocateInfo](VkCommandBufferAllocateInfo.html), [vkCreateCommandPool](vkCreateCommandPool.html), [vkDestroyCommandPool](vkDestroyCommandPool.html), [vkFreeCommandBuffers](vkFreeCommandBuffers.html), [vkResetCommandPool](vkResetCommandPool.html), [vkTrimCommandPool](vkTrimCommandPool.html), [vkTrimCommandPool](vkTrimCommandPool.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
