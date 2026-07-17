# VkDebugUtilsMessengerEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugUtilsMessengerEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugUtilsMessengerEXT - Opaque handle to a debug messenger object

A `VkDebugUtilsMessengerEXT` is a messenger object which handles passing
along debug messages to a provided debug callback.

// Provided by VK_EXT_debug_utils
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDebugUtilsMessengerEXT)

The debug messenger will provide detailed feedback on the application’s use
of Vulkan when events of interest occur.
When an event of interest does occur, the debug messenger will submit a
debug message to the debug callback that was provided during its creation.
Additionally, the debug messenger is responsible with filtering out debug
messages that the callback is not interested in and will only provide
desired debug messages.

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_EXT_debug_utils](VK_EXT_debug_utils.html), [vkCreateDebugUtilsMessengerEXT](vkCreateDebugUtilsMessengerEXT.html), [vkDestroyDebugUtilsMessengerEXT](vkDestroyDebugUtilsMessengerEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugUtilsMessengerEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
