# PFN_vkDebugUtilsMessengerCallbackEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PFN_vkDebugUtilsMessengerCallbackEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PFN_vkDebugUtilsMessengerCallbackEXT - Application-defined debug messenger callback function

The prototype for the
[VkDebugUtilsMessengerCreateInfoEXT](VkDebugUtilsMessengerCreateInfoEXT.html)::`pfnUserCallback` function
implemented by the application is:

// Provided by VK_EXT_debug_utils
typedef VkBool32 (*PFN_vkDebugUtilsMessengerCallbackEXT)(
    VkDebugUtilsMessageSeverityFlagBitsEXT      messageSeverity,
    VkDebugUtilsMessageTypeFlagsEXT             messageTypes,
    const VkDebugUtilsMessengerCallbackDataEXT* pCallbackData,
    void*                                       pUserData);

* 
`messageSeverity` specifies the
[VkDebugUtilsMessageSeverityFlagBitsEXT](VkDebugUtilsMessageSeverityFlagBitsEXT.html) that triggered this
callback.

* 
`messageTypes` is a bitmask of
[VkDebugUtilsMessageTypeFlagBitsEXT](VkDebugUtilsMessageTypeFlagBitsEXT.html) specifying which type of
event(s) triggered this callback.

* 
`pCallbackData` contains all the callback related data in the
[VkDebugUtilsMessengerCallbackDataEXT](VkDebugUtilsMessengerCallbackDataEXT.html) structure.

* 
`pUserData` is the application-defined user data pointer, equal to
the value of [VkDebugUtilsMessengerCreateInfoEXT](VkDebugUtilsMessengerCreateInfoEXT.html)::`pUserData`
specified when the [VkDebugUtilsMessengerEXT](VkDebugUtilsMessengerEXT.html) object was created.

The callback returns a `VkBool32`, which is interpreted in a
layer-specified manner.
The application **should** always return [VK_FALSE](VK_FALSE.html).
The [VK_TRUE](VK_TRUE.html) value is reserved for use in layer development.

Valid Usage

* 
[](#VUID-PFN_vkDebugUtilsMessengerCallbackEXT-None-04769) VUID-PFN_vkDebugUtilsMessengerCallbackEXT-None-04769

The callback **must** not make calls to any Vulkan commands

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), `VkBool32`, [VkDebugUtilsMessageSeverityFlagBitsEXT](VkDebugUtilsMessageSeverityFlagBitsEXT.html), [VkDebugUtilsMessageTypeFlagsEXT](VkDebugUtilsMessageTypeFlagsEXT.html), [VkDebugUtilsMessengerCallbackDataEXT](VkDebugUtilsMessengerCallbackDataEXT.html), [VkDebugUtilsMessengerCreateInfoEXT](VkDebugUtilsMessengerCreateInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#PFN_vkDebugUtilsMessengerCallbackEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
