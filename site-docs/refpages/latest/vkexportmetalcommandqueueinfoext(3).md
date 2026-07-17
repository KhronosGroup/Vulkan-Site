# VkExportMetalCommandQueueInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMetalCommandQueueInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMetalCommandQueueInfoEXT - Structure that identifies a VkQueue object and corresponding Metal MTLCommandQueue object

To export the Metal `MTLCommandQueue` object underlying a [VkQueue](VkQueue.html)
object, include a `VkExportMetalCommandQueueInfoEXT` structure in the
`pNext` chain of the `pMetalObjectsInfo` parameter of a
[vkExportMetalObjectsEXT](vkExportMetalObjectsEXT.html) call.

The `VkExportMetalCommandQueueInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalCommandQueueInfoEXT {
    VkStructureType       sType;
    const void*           pNext;
    VkQueue               queue;
    MTLCommandQueue_id    mtlCommandQueue;
} VkExportMetalCommandQueueInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queue` is a [VkQueue](VkQueue.html).

* 
`mtlCommandQueue` is the Metal `id` object
underlying the [VkQueue](VkQueue.html) object in `queue`.
The implementation will return the `MTLCommandQueue` in this member,
or it will return `NULL` if no `MTLCommandQueue` could be found
underlying the [VkQueue](VkQueue.html) object.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalCommandQueueInfoEXT-sType-sType) VUID-VkExportMetalCommandQueueInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_COMMAND_QUEUE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkExportMetalCommandQueueInfoEXT-queue-parameter) VUID-VkExportMetalCommandQueueInfoEXT-queue-parameter

 `queue` **must** be a valid [VkQueue](VkQueue.html) handle

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkExportMetalObjectsInfoEXT](VkExportMetalObjectsInfoEXT.html)

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkQueue](VkQueue.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMetalCommandQueueInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
