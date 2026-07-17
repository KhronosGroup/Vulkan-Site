# VkDebugUtilsMessengerCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugUtilsMessengerCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugUtilsMessengerCreateInfoEXT - Structure specifying parameters of a newly created debug messenger

The definition of `VkDebugUtilsMessengerCreateInfoEXT` is:

// Provided by VK_EXT_debug_utils
typedef struct VkDebugUtilsMessengerCreateInfoEXT {
    VkStructureType                         sType;
    const void*                             pNext;
    VkDebugUtilsMessengerCreateFlagsEXT     flags;
    VkDebugUtilsMessageSeverityFlagsEXT     messageSeverity;
    VkDebugUtilsMessageTypeFlagsEXT         messageType;
    PFN_vkDebugUtilsMessengerCallbackEXT    pfnUserCallback;
    void*                                   pUserData;
} VkDebugUtilsMessengerCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is `0` and is reserved for future use.

* 
`messageSeverity` is a bitmask of
[VkDebugUtilsMessageSeverityFlagBitsEXT](VkDebugUtilsMessageSeverityFlagBitsEXT.html) specifying which severity
of event(s) will cause this callback to be called.

* 
`messageType` is a bitmask of
[VkDebugUtilsMessageTypeFlagBitsEXT](VkDebugUtilsMessageTypeFlagBitsEXT.html) specifying which type of
event(s) will cause this callback to be called.

* 
`pfnUserCallback` is the application callback function to call.

* 
`pUserData` is NULL or an application-defined user data pointer to
be passed to the callback.

For each `VkDebugUtilsMessengerEXT` that is created the
`VkDebugUtilsMessengerCreateInfoEXT`::`messageSeverity` and
`VkDebugUtilsMessengerCreateInfoEXT`::`messageType` determine when
that `VkDebugUtilsMessengerCreateInfoEXT`::`pfnUserCallback` is
called.
The process to determine if the user’s `pfnUserCallback` is triggered
when an event occurs is as follows:

The implementation will perform a bitwise AND of the event’s
[VkDebugUtilsMessageSeverityFlagBitsEXT](VkDebugUtilsMessageSeverityFlagBitsEXT.html) with the
`messageSeverity` provided during creation of the
[VkDebugUtilsMessengerEXT](VkDebugUtilsMessengerEXT.html) object.

If the value is 0, the message is skipped.

The implementation will perform bitwise AND of the event’s
[VkDebugUtilsMessageTypeFlagBitsEXT](VkDebugUtilsMessageTypeFlagBitsEXT.html) with the `messageType`
provided during the creation of the [VkDebugUtilsMessengerEXT](VkDebugUtilsMessengerEXT.html)
object.

If the value is 0, the message is skipped.

The callback will trigger a debug message for the current event

The callback will come directly from the component that detected the event,
unless some other layer intercepts the calls for its own purposes (filter
them in a different way, log to a system error log, etc.).

An application **can** receive multiple callbacks if multiple
`VkDebugUtilsMessengerEXT` objects are created.
A callback will always be executed in the same thread as the originating
Vulkan call.

A callback **can** be called from multiple threads simultaneously (if the
application is making Vulkan calls from multiple threads).

Valid Usage (Implicit)

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-sType-sType) VUID-VkDebugUtilsMessengerCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_UTILS_MESSENGER_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-flags-zerobitmask) VUID-VkDebugUtilsMessengerCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-messageSeverity-parameter) VUID-VkDebugUtilsMessengerCreateInfoEXT-messageSeverity-parameter

 `messageSeverity` **must** be a valid combination of [VkDebugUtilsMessageSeverityFlagBitsEXT](VkDebugUtilsMessageSeverityFlagBitsEXT.html) values

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-messageSeverity-requiredbitmask) VUID-VkDebugUtilsMessengerCreateInfoEXT-messageSeverity-requiredbitmask

 `messageSeverity` **must** not be `0`

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-messageType-parameter) VUID-VkDebugUtilsMessengerCreateInfoEXT-messageType-parameter

 `messageType` **must** be a valid combination of [VkDebugUtilsMessageTypeFlagBitsEXT](VkDebugUtilsMessageTypeFlagBitsEXT.html) values

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-messageType-requiredbitmask) VUID-VkDebugUtilsMessengerCreateInfoEXT-messageType-requiredbitmask

 `messageType` **must** not be `0`

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-pfnUserCallback-parameter) VUID-VkDebugUtilsMessengerCreateInfoEXT-pfnUserCallback-parameter

 `pfnUserCallback` **must** be a valid [PFN_vkDebugUtilsMessengerCallbackEXT](PFN_vkDebugUtilsMessengerCallbackEXT.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkInstanceCreateInfo](VkInstanceCreateInfo.html)

[PFN_vkDebugUtilsMessengerCallbackEXT](PFN_vkDebugUtilsMessengerCallbackEXT.html), [VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkDebugUtilsMessageSeverityFlagsEXT](VkDebugUtilsMessageSeverityFlagsEXT.html), [VkDebugUtilsMessageTypeFlagsEXT](VkDebugUtilsMessageTypeFlagsEXT.html), [VkDebugUtilsMessengerCreateFlagsEXT](VkDebugUtilsMessengerCreateFlagsEXT.html), [VkStructureType](VkStructureType.html), [vkCreateDebugUtilsMessengerEXT](vkCreateDebugUtilsMessengerEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugUtilsMessengerCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
