# VkEvent(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkEvent.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkEvent - Opaque handle to an event object

Events are a synchronization primitive that **can** be used to insert a
fine-grained dependency between commands submitted to the same queue, or
between the host and a queue.
Events **must** not be used to insert a dependency between commands submitted
to different queues.
Events have two states - signaled and unsignaled.
An application **can** signal or unsignal an event either on the host or on the
device.
A device **can** be made to wait for an event to become signaled before
executing further operations.
No command exists to wait for an event to become signaled on the host, but
the current state of an event **can** be queried.

Events are represented by `VkEvent` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkEvent)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkExportMetalSharedEventInfoEXT](VkExportMetalSharedEventInfoEXT.html), [vkCmdResetEvent](vkCmdResetEvent.html), [vkCmdResetEvent2](vkCmdResetEvent2.html), [vkCmdResetEvent2](vkCmdResetEvent2.html), [vkCmdSetEvent](vkCmdSetEvent.html), [vkCmdSetEvent2](vkCmdSetEvent2.html), [vkCmdSetEvent2](vkCmdSetEvent2.html), [vkCmdWaitEvents](vkCmdWaitEvents.html), [vkCmdWaitEvents2](vkCmdWaitEvents2.html), [vkCmdWaitEvents2](vkCmdWaitEvents2.html), [vkCreateEvent](vkCreateEvent.html), [vkDestroyEvent](vkDestroyEvent.html), [vkGetEventStatus](vkGetEventStatus.html), [vkResetEvent](vkResetEvent.html), [vkSetEvent](vkSetEvent.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkEvent).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
