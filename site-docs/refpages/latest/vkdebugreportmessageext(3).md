# vkDebugReportMessageEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDebugReportMessageEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDebugReportMessageEXT - Inject a message into a debug stream

To inject its own messages into the debug stream, call:

// Provided by VK_EXT_debug_report
void vkDebugReportMessageEXT(
    VkInstance                                  instance,
    VkDebugReportFlagsEXT                       flags,
    VkDebugReportObjectTypeEXT                  objectType,
    uint64_t                                    object,
    size_t                                      location,
    int32_t                                     messageCode,
    const char*                                 pLayerPrefix,
    const char*                                 pMessage);

* 
`instance` is the debug stream’s [VkInstance](VkInstance.html).

* 
`flags` specifies the [VkDebugReportFlagBitsEXT](VkDebugReportFlagBitsEXT.html) classification
of this event/message.

* 
`objectType` is a [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html) specifying the
type of object being used or created at the time the event was
triggered.

* 
`object` is the object where the issue was detected.
`object` **can** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html) if there is no object
associated with the event.

* 
`location` is an application-defined value.

* 
`messageCode` is an application-defined value.

* 
`pLayerPrefix` is the abbreviation of the component making this
event/message.

* 
`pMessage` is a null-terminated UTF-8 string detailing the trigger
conditions.

The call will propagate through the layers and generate callback(s) as
indicated by the message’s flags.
The parameters are passed on to the callback in addition to the
`pUserData` value that was defined at the time the callback was
registered.

Valid Usage

* 
[](#VUID-vkDebugReportMessageEXT-object-01241) VUID-vkDebugReportMessageEXT-object-01241

`object` **must** be a Vulkan object or [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkDebugReportMessageEXT-objectType-01498) VUID-vkDebugReportMessageEXT-objectType-01498

If `objectType` is not [VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT](VkDebugReportObjectTypeEXT.html)
and `object` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `object` **must** be a
Vulkan object of the corresponding type associated with `objectType`
as defined in [VkDebugReportObjectTypeEXT and Vulkan Handle Relationship](../../../../spec/latest/chapters/debugging.html#debug-report-object-types)

Valid Usage (Implicit)

* 
[](#VUID-vkDebugReportMessageEXT-instance-parameter) VUID-vkDebugReportMessageEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkDebugReportMessageEXT-flags-parameter) VUID-vkDebugReportMessageEXT-flags-parameter

 `flags` **must** be a valid combination of [VkDebugReportFlagBitsEXT](VkDebugReportFlagBitsEXT.html) values

* 
[](#VUID-vkDebugReportMessageEXT-flags-requiredbitmask) VUID-vkDebugReportMessageEXT-flags-requiredbitmask

 `flags` **must** not be `0`

* 
[](#VUID-vkDebugReportMessageEXT-objectType-parameter) VUID-vkDebugReportMessageEXT-objectType-parameter

 `objectType` **must** be a valid [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html) value

* 
[](#VUID-vkDebugReportMessageEXT-pLayerPrefix-parameter) VUID-vkDebugReportMessageEXT-pLayerPrefix-parameter

 `pLayerPrefix` **must** be a null-terminated UTF-8 string

* 
[](#VUID-vkDebugReportMessageEXT-pMessage-parameter) VUID-vkDebugReportMessageEXT-pMessage-parameter

 `pMessage` **must** be a null-terminated UTF-8 string

[VK_EXT_debug_report](VK_EXT_debug_report.html), [VkDebugReportFlagsEXT](VkDebugReportFlagsEXT.html), [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html), [VkInstance](VkInstance.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkDebugReportMessageEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
