# vkSetEvent(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetEvent.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetEvent - Set an event to signaled state

To set the state of an event to signaled from the host, call:

// Provided by VK_VERSION_1_0
VkResult vkSetEvent(
    VkDevice                                    device,
    VkEvent                                     event);

* 
`device` is the logical device that owns the event.

* 
`event` is the event to set.

When [vkSetEvent](#) is executed on the host, it defines an *event signal
operation* which sets the event to the signaled state.

If `event` is already in the signaled state when [vkSetEvent](#) is
executed, then [vkSetEvent](#) has no effect, and no event signal operation
occurs.

|  | If a command buffer is waiting for an event to be signaled from the host,
| --- | --- |
the application must signal the event before submitting the command buffer,
as described in the [queue forward progress](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-submission-progress) section. |

Valid Usage

* 
[](#VUID-vkSetEvent-event-03941) VUID-vkSetEvent-event-03941

`event` **must** not have been created with
[VK_EVENT_CREATE_DEVICE_ONLY_BIT](VkEventCreateFlagBits.html)

* 
[](#VUID-vkSetEvent-event-09543) VUID-vkSetEvent-event-09543

`event` **must** not be waited on by a command buffer in the
[pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

Valid Usage (Implicit)

* 
[](#VUID-vkSetEvent-device-parameter) VUID-vkSetEvent-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetEvent-event-parameter) VUID-vkSetEvent-event-parameter

 `event` **must** be a valid [VkEvent](VkEvent.html) handle

* 
[](#VUID-vkSetEvent-event-parent) VUID-vkSetEvent-event-parent

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
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkEvent](VkEvent.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkSetEvent).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
