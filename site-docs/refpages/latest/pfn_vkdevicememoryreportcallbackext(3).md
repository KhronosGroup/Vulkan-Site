# PFN_vkDeviceMemoryReportCallbackEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PFN_vkDeviceMemoryReportCallbackEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PFN_vkDeviceMemoryReportCallbackEXT - Application-defined device memory report callback function

The prototype for the
[VkDeviceDeviceMemoryReportCreateInfoEXT](VkDeviceDeviceMemoryReportCreateInfoEXT.html)::`pfnUserCallback`
function implemented by the application is:

// Provided by VK_EXT_device_memory_report
typedef void (*PFN_vkDeviceMemoryReportCallbackEXT)(
    const VkDeviceMemoryReportCallbackDataEXT*  pCallbackData,
    void*                                       pUserData);

* 
`pCallbackData` contains all the callback related data in the
[VkDeviceMemoryReportCallbackDataEXT](VkDeviceMemoryReportCallbackDataEXT.html) structure.

* 
`pUserData` is the application-defined user data pointer, equal to
the value of
[VkDeviceDeviceMemoryReportCreateInfoEXT](VkDeviceDeviceMemoryReportCreateInfoEXT.html)::`pUserData` specified
when the [VkDevice](VkDevice.html) object was created.

The callback **must** not make calls to any Vulkan commands.

[VK_EXT_device_memory_report](VK_EXT_device_memory_report.html), [VkDeviceDeviceMemoryReportCreateInfoEXT](VkDeviceDeviceMemoryReportCreateInfoEXT.html), [VkDeviceMemoryReportCallbackDataEXT](VkDeviceMemoryReportCallbackDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#PFN_vkDeviceMemoryReportCallbackEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
