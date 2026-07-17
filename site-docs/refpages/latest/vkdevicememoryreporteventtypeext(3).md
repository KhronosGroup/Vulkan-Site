# VkDeviceMemoryReportEventTypeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceMemoryReportEventTypeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceMemoryReportEventTypeEXT - Events that can occur on a device memory object

Possible values of [VkDeviceMemoryReportCallbackDataEXT](VkDeviceMemoryReportCallbackDataEXT.html)::`type`,
specifying event types which cause the device driver to call the callback,
are:

// Provided by VK_EXT_device_memory_report
typedef enum VkDeviceMemoryReportEventTypeEXT {
    VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT = 0,
    VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_FREE_EXT = 1,
    VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_IMPORT_EXT = 2,
    VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_UNIMPORT_EXT = 3,
    VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATION_FAILED_EXT = 4,
} VkDeviceMemoryReportEventTypeEXT;

* 
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT](#) specifies this
event corresponds to the allocation of an internal device memory object
or a [VkDeviceMemory](VkDeviceMemory.html).

* 
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_FREE_EXT](#) specifies this event
corresponds to the deallocation of an internally-allocated device memory
object or a [VkDeviceMemory](VkDeviceMemory.html).

* 
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_IMPORT_EXT](#) specifies this event
corresponds to the import of an external memory object.

* 
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_UNIMPORT_EXT](#) specifies this
event is the release of an imported external memory object.

* 
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATION_FAILED_EXT](#) specifies
this event corresponds to the failed allocation of an internal device
memory object or a [VkDeviceMemory](VkDeviceMemory.html).

[VK_EXT_device_memory_report](VK_EXT_device_memory_report.html), [VkDeviceMemoryReportCallbackDataEXT](VkDeviceMemoryReportCallbackDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDeviceMemoryReportEventTypeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
