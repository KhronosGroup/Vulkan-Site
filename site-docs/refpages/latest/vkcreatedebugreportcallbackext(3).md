# vkCreateDebugReportCallbackEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateDebugReportCallbackEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateDebugReportCallbackEXT - Create a debug report callback object

Debug report callbacks give more detailed feedback on the application’s use
of Vulkan when events of interest occur.

To register a debug report callback, an application uses
[vkCreateDebugReportCallbackEXT](#).

// Provided by VK_EXT_debug_report
VkResult vkCreateDebugReportCallbackEXT(
    VkInstance                                  instance,
    const VkDebugReportCallbackCreateInfoEXT*   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDebugReportCallbackEXT*                   pCallback);

* 
`instance` is the instance the callback will be logged on.

* 
`pCreateInfo` is a pointer to a
[VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html) structure defining the
conditions under which this callback will be called.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pCallback` is a pointer to a [VkDebugReportCallbackEXT](VkDebugReportCallbackEXT.html) handle
in which the created object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDebugReportCallbackEXT-instance-parameter) VUID-vkCreateDebugReportCallbackEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkCreateDebugReportCallbackEXT-pCreateInfo-parameter) VUID-vkCreateDebugReportCallbackEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html) structure

* 
[](#VUID-vkCreateDebugReportCallbackEXT-pAllocator-parameter) VUID-vkCreateDebugReportCallbackEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateDebugReportCallbackEXT-pCallback-parameter) VUID-vkCreateDebugReportCallbackEXT-pCallback-parameter

 `pCallback` **must** be a valid pointer to a [VkDebugReportCallbackEXT](VkDebugReportCallbackEXT.html) handle

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

[VK_EXT_debug_report](VK_EXT_debug_report.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html), [VkDebugReportCallbackEXT](VkDebugReportCallbackEXT.html), [VkInstance](VkInstance.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkCreateDebugReportCallbackEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
