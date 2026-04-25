# VkExportMetalBufferInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMetalBufferInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMetalBufferInfoEXT - Structure that identifies a VkDeviceMemory object and corresponding Metal MTLBuffer object

To export the Metal `MTLBuffer` object underlying a [VkDeviceMemory](VkDeviceMemory.html)
object, include a `VkExportMetalBufferInfoEXT` structure in the
`pNext` chain of the `pMetalObjectsInfo` parameter of a
[vkExportMetalObjectsEXT](vkExportMetalObjectsEXT.html) call.

The `VkExportMetalBufferInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalBufferInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
    MTLBuffer_id       mtlBuffer;
} VkExportMetalBufferInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is a [VkDeviceMemory](VkDeviceMemory.html).

* 
`mtlBuffer` is the Metal `id` object underlying the
[VkDeviceMemory](VkDeviceMemory.html) object in `memory`.
The implementation will return the `MTLBuffer` in this member, or it
will return `NULL` if no `MTLBuffer` could be found underlying the
[VkDeviceMemory](VkDeviceMemory.html) object.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalBufferInfoEXT-sType-sType) VUID-VkExportMetalBufferInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_BUFFER_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkExportMetalBufferInfoEXT-memory-parameter) VUID-VkExportMetalBufferInfoEXT-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkExportMetalObjectsInfoEXT](VkExportMetalObjectsInfoEXT.html)

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkDeviceMemory](VkDeviceMemory.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMetalBufferInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
