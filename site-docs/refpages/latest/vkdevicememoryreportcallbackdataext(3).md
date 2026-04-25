# VkDeviceMemoryReportCallbackDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceMemoryReportCallbackDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceMemoryReportCallbackDataEXT - Structure specifying parameters returned to the callback

The definition of `VkDeviceMemoryReportCallbackDataEXT` is:

// Provided by VK_EXT_device_memory_report
typedef struct VkDeviceMemoryReportCallbackDataEXT {
    VkStructureType                     sType;
    void*                               pNext;
    VkDeviceMemoryReportFlagsEXT        flags;
    VkDeviceMemoryReportEventTypeEXT    type;
    uint64_t                            memoryObjectId;
    VkDeviceSize                        size;
    VkObjectType                        objectType;
    uint64_t                            objectHandle;
    uint32_t                            heapIndex;
} VkDeviceMemoryReportCallbackDataEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is 0 and reserved for future use.

* 
`type` is a [VkDeviceMemoryReportEventTypeEXT](VkDeviceMemoryReportEventTypeEXT.html) type specifying
the type of event reported in this
`VkDeviceMemoryReportCallbackDataEXT` structure.

* 
`memoryObjectId` is the unique id for the underlying memory object
as described below.

* 
`size` is the size of the memory object in bytes.
If `type` is [VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT](VkDeviceMemoryReportEventTypeEXT.html),
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_IMPORT_EXT](VkDeviceMemoryReportEventTypeEXT.html) or
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATION_FAILED_EXT](VkDeviceMemoryReportEventTypeEXT.html),
`size` is a valid `VkDeviceSize` value.
Otherwise, `size` is **undefined**.

* 
`objectType` is a [VkObjectType](VkObjectType.html) value specifying the type of
the object associated with this device memory report event.
If `type` is [VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT](VkDeviceMemoryReportEventTypeEXT.html),
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_FREE_EXT](VkDeviceMemoryReportEventTypeEXT.html),
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_IMPORT_EXT](VkDeviceMemoryReportEventTypeEXT.html),
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_UNIMPORT_EXT](VkDeviceMemoryReportEventTypeEXT.html) or
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATION_FAILED_EXT](VkDeviceMemoryReportEventTypeEXT.html),
`objectType` is a valid [VkObjectType](VkObjectType.html) enum.
Otherwise, `objectType` is **undefined**.

* 
`objectHandle` is the object this device memory report event is
attributed to.
If `type` is [VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT](VkDeviceMemoryReportEventTypeEXT.html),
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_FREE_EXT](VkDeviceMemoryReportEventTypeEXT.html),
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_IMPORT_EXT](VkDeviceMemoryReportEventTypeEXT.html) or
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_UNIMPORT_EXT](VkDeviceMemoryReportEventTypeEXT.html),
`objectHandle` is a valid Vulkan handle of the type associated with
`objectType` as defined in the [    `VkObjectType` and Vulkan Handle Relationship](../../../../spec/latest/chapters/debugging.html#debugging-object-types) table.
Otherwise, `objectHandle` is **undefined**.

* 
`heapIndex` describes which memory heap this device memory
allocation is made from.
If `type` is [VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT](VkDeviceMemoryReportEventTypeEXT.html)
or [VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATION_FAILED_EXT](VkDeviceMemoryReportEventTypeEXT.html),
`heapIndex` corresponds to one of the valid heaps from the
[VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html) structure.
Otherwise, `heapIndex` is **undefined**.

`memoryObjectId` is used to avoid double-counting on the same memory
object.

If an internally-allocated device memory object or a [VkDeviceMemory](VkDeviceMemory.html)
**cannot** be exported, `memoryObjectId` **must** be unique in the
[VkDevice](VkDevice.html).

If an internally-allocated device memory object or a [VkDeviceMemory](VkDeviceMemory.html)
supports being exported, `memoryObjectId` **must** be unique system wide.

If an internal device memory object or a [VkDeviceMemory](VkDeviceMemory.html) is backed by
an imported external memory object, `memoryObjectId` **must** be unique
system wide.

|  | This structure should only be considered valid during the lifetime of the
| --- | --- |
triggered callback.

For [VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT](VkDeviceMemoryReportEventTypeEXT.html) and
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_IMPORT_EXT](VkDeviceMemoryReportEventTypeEXT.html) events,
`objectHandle` usually will not yet exist when the application or tool
receives the callback.
`objectHandle` will only exist when the create or allocate call that
triggered the event returns, and if the allocation or import ends up failing
`objectHandle` will not ever exist. |

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceMemoryReportCallbackDataEXT-sType-sType) VUID-VkDeviceMemoryReportCallbackDataEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_MEMORY_REPORT_CALLBACK_DATA_EXT](VkStructureType.html)

* 
[](#VUID-VkDeviceMemoryReportCallbackDataEXT-pNext-pNext) VUID-VkDeviceMemoryReportCallbackDataEXT-pNext-pNext

 `pNext` **must** be `NULL`

[PFN_vkDeviceMemoryReportCallbackEXT](PFN_vkDeviceMemoryReportCallbackEXT.html), [VK_EXT_device_memory_report](VK_EXT_device_memory_report.html), [VkDeviceMemoryReportEventTypeEXT](VkDeviceMemoryReportEventTypeEXT.html), [VkDeviceMemoryReportFlagsEXT](VkDeviceMemoryReportFlagsEXT.html), `VkDeviceSize`, [VkObjectType](VkObjectType.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDeviceMemoryReportCallbackDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
