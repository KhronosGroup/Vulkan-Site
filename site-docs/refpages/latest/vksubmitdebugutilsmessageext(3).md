# vkSubmitDebugUtilsMessageEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSubmitDebugUtilsMessageEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSubmitDebugUtilsMessageEXT - Inject a message into a debug stream

To intentionally submit a debug message, call:

// Provided by VK_EXT_debug_utils
void vkSubmitDebugUtilsMessageEXT(
    VkInstance                                  instance,
    VkDebugUtilsMessageSeverityFlagBitsEXT      messageSeverity,
    VkDebugUtilsMessageTypeFlagsEXT             messageTypes,
    const VkDebugUtilsMessengerCallbackDataEXT* pCallbackData);

* 
`instance` is the debug stream’s [VkInstance](VkInstance.html).

* 
`messageSeverity` is a [VkDebugUtilsMessageSeverityFlagBitsEXT](VkDebugUtilsMessageSeverityFlagBitsEXT.html)
value specifying the severity of this event/message.

* 
`messageTypes` is a bitmask of
[VkDebugUtilsMessageTypeFlagBitsEXT](VkDebugUtilsMessageTypeFlagBitsEXT.html) specifying which type of
event(s) to identify with this message.

* 
`pCallbackData` contains all the callback related data in the
[VkDebugUtilsMessengerCallbackDataEXT](VkDebugUtilsMessengerCallbackDataEXT.html) structure.

The call will propagate through the layers and generate callback(s) as
indicated by the message’s flags.
The parameters are passed on to the callback in addition to the
`pUserData` value that was defined at the time the messenger was
registered.

Valid Usage

* 
[](#VUID-vkSubmitDebugUtilsMessageEXT-objectType-02591) VUID-vkSubmitDebugUtilsMessageEXT-objectType-02591

The `objectType` member of each element of
`pCallbackData->pObjects` **must** not be [VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html)

Valid Usage (Implicit)

* 
[](#VUID-vkSubmitDebugUtilsMessageEXT-instance-parameter) VUID-vkSubmitDebugUtilsMessageEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkSubmitDebugUtilsMessageEXT-messageSeverity-parameter) VUID-vkSubmitDebugUtilsMessageEXT-messageSeverity-parameter

 `messageSeverity` **must** be a valid [VkDebugUtilsMessageSeverityFlagBitsEXT](VkDebugUtilsMessageSeverityFlagBitsEXT.html) value

* 
[](#VUID-vkSubmitDebugUtilsMessageEXT-messageTypes-parameter) VUID-vkSubmitDebugUtilsMessageEXT-messageTypes-parameter

 `messageTypes` **must** be a valid combination of [VkDebugUtilsMessageTypeFlagBitsEXT](VkDebugUtilsMessageTypeFlagBitsEXT.html) values

* 
[](#VUID-vkSubmitDebugUtilsMessageEXT-messageTypes-requiredbitmask) VUID-vkSubmitDebugUtilsMessageEXT-messageTypes-requiredbitmask

 `messageTypes` **must** not be `0`

* 
[](#VUID-vkSubmitDebugUtilsMessageEXT-pCallbackData-parameter) VUID-vkSubmitDebugUtilsMessageEXT-pCallbackData-parameter

 `pCallbackData` **must** be a valid pointer to a valid [VkDebugUtilsMessengerCallbackDataEXT](VkDebugUtilsMessengerCallbackDataEXT.html) structure

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkDebugUtilsMessageSeverityFlagBitsEXT](VkDebugUtilsMessageSeverityFlagBitsEXT.html), [VkDebugUtilsMessageTypeFlagsEXT](VkDebugUtilsMessageTypeFlagsEXT.html), [VkDebugUtilsMessengerCallbackDataEXT](VkDebugUtilsMessengerCallbackDataEXT.html), [VkInstance](VkInstance.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkSubmitDebugUtilsMessageEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
