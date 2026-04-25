# VkImportMetalSharedEventInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportMetalSharedEventInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportMetalSharedEventInfoEXT - Structure that identifies a VkSemaphore or VkEvent object and corresponding Metal Shared Event object to use.

To import a Metal `id` object to underlie a
[VkSemaphore](VkSemaphore.html) or [VkEvent](VkEvent.html) object, include a
`VkImportMetalSharedEventInfoEXT` structure in the `pNext` chain of
the [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html) or [VkEventCreateInfo](VkEventCreateInfo.html) structure in a
[vkCreateSemaphore](vkCreateSemaphore.html) or [vkCreateEvent](vkCreateEvent.html) command, respectively.

The `VkImportMetalSharedEventInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkImportMetalSharedEventInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    MTLSharedEvent_id    mtlSharedEvent;
} VkImportMetalSharedEventInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mtlSharedEvent` is the Metal `id` object that is to
underlie the [VkSemaphore](VkSemaphore.html) or [VkEvent](VkEvent.html).

If the `pNext` chain of the [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html) structure
includes both `VkImportMetalSharedEventInfoEXT` and
[VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html), the `signaledValue` property of the
imported `id` object will be set to
[VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html)::`initialValue`.

Valid Usage (Implicit)

* 
[](#VUID-VkImportMetalSharedEventInfoEXT-sType-sType) VUID-VkImportMetalSharedEventInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_METAL_SHARED_EVENT_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkEventCreateInfo](VkEventCreateInfo.html)

* 
[VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html)

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkImportMetalSharedEventInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
