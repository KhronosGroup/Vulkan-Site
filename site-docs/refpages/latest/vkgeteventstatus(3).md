# vkGetEventStatus(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetEventStatus.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetEventStatus - Retrieve the status of an event object

To query the state of an event from the host, call:

// Provided by VK_VERSION_1_0
VkResult vkGetEventStatus(
    VkDevice                                    device,
    VkEvent                                     event);

* 
`device` is the logical device that owns the event.

* 
`event` is the handle of the event to query.

Upon success, `vkGetEventStatus` returns the state of the event object
with the following return codes:

| Status | Meaning |
| --- | --- |
| [VK_EVENT_SET](VkResult.html) | The event specified by `event` is signaled. |
| [VK_EVENT_RESET](VkResult.html) | The event specified by `event` is unsignaled. |

If a `vkCmdSetEvent` or `vkCmdResetEvent` command is in a command
buffer that is in the [pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle), then the
value returned by this command **may** immediately be out of date.

The state of an event **can** be updated by the host.
The state of the event is immediately changed, and subsequent calls to
`vkGetEventStatus` will return the new state.
If an event is already in the requested state, then updating it to the same
state has no effect.

Valid Usage

* 
[](#VUID-vkGetEventStatus-event-03940) VUID-vkGetEventStatus-event-03940

`event` **must** not have been created with
[VK_EVENT_CREATE_DEVICE_ONLY_BIT](VkEventCreateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetEventStatus-device-parameter) VUID-vkGetEventStatus-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetEventStatus-event-parameter) VUID-vkGetEventStatus-event-parameter

 `event` **must** be a valid [VkEvent](VkEvent.html) handle

* 
[](#VUID-vkGetEventStatus-event-parent) VUID-vkGetEventStatus-event-parent

 `event` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_EVENT_RESET](VkResult.html)

* 
[VK_EVENT_SET](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkEvent](VkEvent.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkGetEventStatus).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
