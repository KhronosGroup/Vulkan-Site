# VkDebugReportCallbackCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugReportCallbackCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugReportCallbackCreateInfoEXT - Structure specifying parameters of a newly created debug report callback

The definition of [VkDebugReportCallbackCreateInfoEXT](#) is:

// Provided by VK_EXT_debug_report
typedef struct VkDebugReportCallbackCreateInfoEXT {
    VkStructureType                 sType;
    const void*                     pNext;
    VkDebugReportFlagsEXT           flags;
    PFN_vkDebugReportCallbackEXT    pfnCallback;
    void*                           pUserData;
} VkDebugReportCallbackCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkDebugReportFlagBitsEXT](VkDebugReportFlagBitsEXT.html) specifying
which event(s) will cause this callback to be called.

* 
`pfnCallback` is the application callback function to call.

* 
`pUserData` is NULL or an application-defined user data pointer to
be passed to the callback.

For each `VkDebugReportCallbackEXT` that is created the
`VkDebugReportCallbackCreateInfoEXT`::`flags` determine when that
`VkDebugReportCallbackCreateInfoEXT`::`pfnCallback` is called.
When an event happens, the implementation will do a bitwise AND of the
event’s [VkDebugReportFlagBitsEXT](VkDebugReportFlagBitsEXT.html) flags to each
`VkDebugReportCallbackEXT` object’s flags.
For each non-zero result the corresponding callback will be called.
The callback will come directly from the component that detected the event,
unless some other layer intercepts the calls for its own purposes (filter
them in a different way, log to a system error log, etc.).

An application **may** receive multiple callbacks if multiple
`VkDebugReportCallbackEXT` objects were created.
A callback will always be executed in the same thread as the originating
Vulkan call.

A callback may be called from multiple threads simultaneously (if the
application is making Vulkan calls from multiple threads).

Valid Usage (Implicit)

* 
[](#VUID-VkDebugReportCallbackCreateInfoEXT-sType-sType) VUID-VkDebugReportCallbackCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_REPORT_CALLBACK_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDebugReportCallbackCreateInfoEXT-flags-parameter) VUID-VkDebugReportCallbackCreateInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkDebugReportFlagBitsEXT](VkDebugReportFlagBitsEXT.html) values

* 
[](#VUID-VkDebugReportCallbackCreateInfoEXT-pfnCallback-parameter) VUID-VkDebugReportCallbackCreateInfoEXT-pfnCallback-parameter

 `pfnCallback` **must** be a valid [PFN_vkDebugReportCallbackEXT](PFN_vkDebugReportCallbackEXT.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkInstanceCreateInfo](VkInstanceCreateInfo.html)

[PFN_vkDebugReportCallbackEXT](PFN_vkDebugReportCallbackEXT.html), [VK_EXT_debug_report](VK_EXT_debug_report.html), [VkDebugReportFlagsEXT](VkDebugReportFlagsEXT.html), [VkStructureType](VkStructureType.html), [vkCreateDebugReportCallbackEXT](vkCreateDebugReportCallbackEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugReportCallbackCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
