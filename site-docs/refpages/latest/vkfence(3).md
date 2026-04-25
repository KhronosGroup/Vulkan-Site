# VkFence(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFence.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFence - Opaque handle to a fence object

Fences are a synchronization primitive that **can** be used to insert a
dependency from a queue to the host.
Fences have two states - signaled and unsignaled.
A fence **can** be signaled as part of the execution of a
[queue submission](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-submission) command.
Fences **can** be unsignaled on the host with [vkResetFences](vkResetFences.html).
Fences **can** be waited on by the host with the [vkWaitForFences](vkWaitForFences.html) command,
and the current state **can** be queried with [vkGetFenceStatus](vkGetFenceStatus.html).

The internal data of a fence **may** include a reference to any resources and
pending work associated with signal or unsignal operations performed on that
fence object, collectively referred to as the fence’s *payload*.
Mechanisms to import and export that internal data to and from fences are
provided [below](../../../../spec/latest/chapters/synchronization.html#VkExportFenceCreateInfo).
These mechanisms indirectly enable applications to share fence state between
two or more fences and other synchronization primitives across process and
API boundaries.

Fences are represented by `VkFence` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkFence)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAcquireNextImageInfoKHR](VkAcquireNextImageInfoKHR.html), [VkFenceGetFdInfoKHR](VkFenceGetFdInfoKHR.html), [VkFenceGetWin32HandleInfoKHR](VkFenceGetWin32HandleInfoKHR.html), [VkImportFenceFdInfoKHR](VkImportFenceFdInfoKHR.html), [VkImportFenceWin32HandleInfoKHR](VkImportFenceWin32HandleInfoKHR.html), [VkSwapchainPresentFenceInfoKHR](VkSwapchainPresentFenceInfoKHR.html), [vkAcquireNextImageKHR](vkAcquireNextImageKHR.html), [vkCreateFence](vkCreateFence.html), [vkDestroyFence](vkDestroyFence.html), [vkGetFenceStatus](vkGetFenceStatus.html), [vkQueueBindSparse](vkQueueBindSparse.html), [vkQueueSubmit](vkQueueSubmit.html), [vkQueueSubmit2](vkQueueSubmit2.html), [vkQueueSubmit2](vkQueueSubmit2.html), [vkRegisterDeviceEventEXT](vkRegisterDeviceEventEXT.html), [vkRegisterDisplayEventEXT](vkRegisterDisplayEventEXT.html), [vkResetFences](vkResetFences.html), [vkWaitForFences](vkWaitForFences.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkFence).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
