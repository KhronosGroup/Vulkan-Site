# VkDeviceDeviceMemoryReportCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceDeviceMemoryReportCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceDeviceMemoryReportCreateInfoEXT - Register device memory report callbacks for a Vulkan device

To register callbacks for underlying device memory events of type
[VkDeviceMemoryReportEventTypeEXT](VkDeviceMemoryReportEventTypeEXT.html), add one or multiple
[VkDeviceDeviceMemoryReportCreateInfoEXT](#) structures to the `pNext`
chain of the [VkDeviceCreateInfo](VkDeviceCreateInfo.html) structure.

// Provided by VK_EXT_device_memory_report
typedef struct VkDeviceDeviceMemoryReportCreateInfoEXT {
    VkStructureType                        sType;
    const void*                            pNext;
    VkDeviceMemoryReportFlagsEXT           flags;
    PFN_vkDeviceMemoryReportCallbackEXT    pfnUserCallback;
    void*                                  pUserData;
} VkDeviceDeviceMemoryReportCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is 0 and reserved for future use.

* 
`pfnUserCallback` is the application callback function to call.

* 
`pUserData` is NULL or an application-defined user data pointer to
be passed to the callback.

The callback **may** be called from multiple threads simultaneously.

The callback **must** be called only once by the implementation when a
[VkDeviceMemoryReportEventTypeEXT](VkDeviceMemoryReportEventTypeEXT.html) event occurs.

|  | The callback could be called from a background thread other than the thread
| --- | --- |
calling the Vulkan commands. |

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceDeviceMemoryReportCreateInfoEXT-sType-sType) VUID-VkDeviceDeviceMemoryReportCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_DEVICE_MEMORY_REPORT_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDeviceDeviceMemoryReportCreateInfoEXT-flags-zerobitmask) VUID-VkDeviceDeviceMemoryReportCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDeviceDeviceMemoryReportCreateInfoEXT-pfnUserCallback-parameter) VUID-VkDeviceDeviceMemoryReportCreateInfoEXT-pfnUserCallback-parameter

 `pfnUserCallback` **must** be a valid [PFN_vkDeviceMemoryReportCallbackEXT](PFN_vkDeviceMemoryReportCallbackEXT.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

[PFN_vkDeviceMemoryReportCallbackEXT](PFN_vkDeviceMemoryReportCallbackEXT.html), [VK_EXT_device_memory_report](VK_EXT_device_memory_report.html), [VkDeviceMemoryReportFlagsEXT](VkDeviceMemoryReportFlagsEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDeviceDeviceMemoryReportCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
