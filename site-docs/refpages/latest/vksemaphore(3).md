# VkSemaphore(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphore.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphore - Opaque handle to a semaphore object

Semaphores are a synchronization primitive that **can** be used to insert a
dependency
between queue operations or between a queue operation and the host.
[Binary semaphores](../../../../spec/latest/appendices/glossary.html#glossary) have two states - signaled and unsignaled.
[Timeline semaphores](../../../../spec/latest/appendices/glossary.html#glossary) have a strictly increasing 64-bit unsigned
integer payload and are signaled with respect to a particular reference
value.
A semaphore **can** be signaled after execution of a queue operation is
completed, and a queue operation **can** wait for a semaphore to become
signaled before it begins execution.
A timeline semaphore **can** additionally be signaled from the host with the
[vkSignalSemaphore](vkSignalSemaphore.html) command and waited on from the host with the
[vkWaitSemaphores](vkWaitSemaphores.html) command.

The internal data of a semaphore **may** include a reference to any resources
and pending work associated with signal or unsignal operations performed on
that semaphore object, collectively referred to as the semaphore’s
*payload*.
Mechanisms to import and export that internal data to and from semaphores
are provided [below](../../../../spec/latest/chapters/synchronization.html#VkExportSemaphoreCreateInfo).
These mechanisms indirectly enable applications to share semaphore state
between two or more semaphores and other synchronization primitives across
process and API boundaries.

Semaphores are represented by `VkSemaphore` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkSemaphore)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAcquireNextImageInfoKHR](VkAcquireNextImageInfoKHR.html), [VkBindSparseInfo](VkBindSparseInfo.html), [VkExportMetalSharedEventInfoEXT](VkExportMetalSharedEventInfoEXT.html), [VkImportSemaphoreFdInfoKHR](VkImportSemaphoreFdInfoKHR.html), [VkImportSemaphoreWin32HandleInfoKHR](VkImportSemaphoreWin32HandleInfoKHR.html), [VkImportSemaphoreZirconHandleInfoFUCHSIA](VkImportSemaphoreZirconHandleInfoFUCHSIA.html), [VkLatencySleepInfoNV](VkLatencySleepInfoNV.html), [VkPresentInfoKHR](VkPresentInfoKHR.html), [VkSemaphoreGetFdInfoKHR](VkSemaphoreGetFdInfoKHR.html), [VkSemaphoreGetWin32HandleInfoKHR](VkSemaphoreGetWin32HandleInfoKHR.html), [VkSemaphoreGetZirconHandleInfoFUCHSIA](VkSemaphoreGetZirconHandleInfoFUCHSIA.html), [VkSemaphoreSignalInfo](VkSemaphoreSignalInfo.html), [VkSemaphoreSubmitInfo](VkSemaphoreSubmitInfo.html), [VkSemaphoreWaitInfo](VkSemaphoreWaitInfo.html), [VkSubmitInfo](VkSubmitInfo.html), [vkAcquireNextImageKHR](vkAcquireNextImageKHR.html), [vkCreateSemaphore](vkCreateSemaphore.html), [vkDestroySemaphore](vkDestroySemaphore.html), [vkGetSemaphoreCounterValue](vkGetSemaphoreCounterValue.html), [vkGetSemaphoreCounterValue](vkGetSemaphoreCounterValue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphore).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
