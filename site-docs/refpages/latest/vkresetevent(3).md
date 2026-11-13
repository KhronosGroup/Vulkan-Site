# vkResetEvent(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkResetEvent.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkResetEvent - Reset an event to non-signaled state

To set the state of an event to unsignaled from the host, call:

// Provided by VK_VERSION_1_0
VkResult vkResetEvent(
    VkDevice                                    device,
    VkEvent                                     event);

* 
`device` is the logical device that owns the event.

* 
`event` is the event to reset.

When [vkResetEvent](#) is executed on the host, it defines an *event
unsignal operation* which resets the event to the unsignaled state.

If `event` is already in the unsignaled state when [vkResetEvent](#) is
executed, then [vkResetEvent](#) has no effect, and no event unsignal
operation occurs.

Valid Usage

* 
[](#VUID-vkResetEvent-event-03821) VUID-vkResetEvent-event-03821

There **must** be an execution dependency between `vkResetEvent` and
the execution of any [vkCmdWaitEvents](vkCmdWaitEvents.html) that includes `event` in
its `pEvents` parameter

* 
[](#VUID-vkResetEvent-event-03822) VUID-vkResetEvent-event-03822

There **must** be an execution dependency between `vkResetEvent` and
the execution of any [vkCmdWaitEvents2](vkCmdWaitEvents2.html) that includes `event` in
its `pEvents` parameter

* 
[](#VUID-vkResetEvent-event-03823) VUID-vkResetEvent-event-03823

`event` **must** not have been created with
[VK_EVENT_CREATE_DEVICE_ONLY_BIT](VkEventCreateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkResetEvent-device-parameter) VUID-vkResetEvent-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkResetEvent-event-parameter) VUID-vkResetEvent-event-parameter

 `event` **must** be a valid [VkEvent](VkEvent.html) handle

* 
[](#VUID-vkResetEvent-event-parent) VUID-vkResetEvent-event-parent

 `event` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `event` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkEvent](VkEvent.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkResetEvent).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
