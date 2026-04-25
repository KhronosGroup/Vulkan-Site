# vkCreateDebugUtilsMessengerEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateDebugUtilsMessengerEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateDebugUtilsMessengerEXT - Create a debug messenger object

A debug messenger triggers a debug callback with a debug message when an
event of interest occurs.
To create a debug messenger which will trigger a debug callback, call:

// Provided by VK_EXT_debug_utils
VkResult vkCreateDebugUtilsMessengerEXT(
    VkInstance                                  instance,
    const VkDebugUtilsMessengerCreateInfoEXT*   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDebugUtilsMessengerEXT*                   pMessenger);

* 
`instance` is the instance the messenger will be used with.

* 
`pCreateInfo` is a pointer to a
[VkDebugUtilsMessengerCreateInfoEXT](VkDebugUtilsMessengerCreateInfoEXT.html) structure containing the
callback pointer, as well as defining conditions under which this
messenger will trigger the callback.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pMessenger` is a pointer to a [VkDebugUtilsMessengerEXT](VkDebugUtilsMessengerEXT.html) handle
in which the created object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDebugUtilsMessengerEXT-instance-parameter) VUID-vkCreateDebugUtilsMessengerEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkCreateDebugUtilsMessengerEXT-pCreateInfo-parameter) VUID-vkCreateDebugUtilsMessengerEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDebugUtilsMessengerCreateInfoEXT](VkDebugUtilsMessengerCreateInfoEXT.html) structure

* 
[](#VUID-vkCreateDebugUtilsMessengerEXT-pAllocator-parameter) VUID-vkCreateDebugUtilsMessengerEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateDebugUtilsMessengerEXT-pMessenger-parameter) VUID-vkCreateDebugUtilsMessengerEXT-pMessenger-parameter

 `pMessenger` **must** be a valid pointer to a [VkDebugUtilsMessengerEXT](VkDebugUtilsMessengerEXT.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

The application **must** ensure that [vkCreateDebugUtilsMessengerEXT](#) is
not executed in parallel with any Vulkan command that is also called with
`instance` or child of `instance` as the dispatchable argument.

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDebugUtilsMessengerCreateInfoEXT](VkDebugUtilsMessengerCreateInfoEXT.html), [VkDebugUtilsMessengerEXT](VkDebugUtilsMessengerEXT.html), [VkInstance](VkInstance.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkCreateDebugUtilsMessengerEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
