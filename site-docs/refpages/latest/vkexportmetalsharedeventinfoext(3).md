# VkExportMetalSharedEventInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMetalSharedEventInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMetalSharedEventInfoEXT - Structure that identifies a VkSemaphore or VkEvent object and corresponding Metal MTLSharedEvent object

To export the Metal `MTLSharedEvent` object underlying a
[VkSemaphore](VkSemaphore.html) or [VkEvent](VkEvent.html) object, include a
`VkExportMetalSharedEventInfoEXT` structure in the `pNext` chain of
the `pMetalObjectsInfo` parameter of a [vkExportMetalObjectsEXT](vkExportMetalObjectsEXT.html)
call.

The `VkExportMetalSharedEventInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalSharedEventInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    VkSemaphore          semaphore;
    VkEvent              event;
    MTLSharedEvent_id    mtlSharedEvent;
} VkExportMetalSharedEventInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a [VkSemaphore](VkSemaphore.html).

* 
`event` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a [VkEvent](VkEvent.html).

* 
`mtlSharedEvent` is the Metal `id` object underlying
the [VkSemaphore](VkSemaphore.html) or [VkEvent](VkEvent.html) object in `semaphore` or
`event`, respectively.
The implementation will return the `MTLSharedEvent` in this member,
or it will return `NULL` if no `MTLSharedEvent` could be found
underlying the [VkSemaphore](VkSemaphore.html) or [VkEvent](VkEvent.html) object.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalSharedEventInfoEXT-sType-sType) VUID-VkExportMetalSharedEventInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_SHARED_EVENT_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkExportMetalSharedEventInfoEXT-semaphore-parameter) VUID-VkExportMetalSharedEventInfoEXT-semaphore-parameter

 If `semaphore` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `semaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-VkExportMetalSharedEventInfoEXT-event-parameter) VUID-VkExportMetalSharedEventInfoEXT-event-parameter

 If `event` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `event` **must** be a valid [VkEvent](VkEvent.html) handle

* 
[](#VUID-VkExportMetalSharedEventInfoEXT-commonparent) VUID-VkExportMetalSharedEventInfoEXT-commonparent

 Both of `event`, and `semaphore` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkExportMetalObjectsInfoEXT](VkExportMetalObjectsInfoEXT.html)

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkEvent](VkEvent.html), [VkSemaphore](VkSemaphore.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMetalSharedEventInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
