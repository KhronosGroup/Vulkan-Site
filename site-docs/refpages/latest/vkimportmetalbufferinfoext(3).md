# VkImportMetalBufferInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportMetalBufferInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportMetalBufferInfoEXT - Structure that identifies a Metal MTLBuffer object to use when creating a VkDeviceMemory object.

To import a Metal `MTLBuffer` object to underlie a [VkDeviceMemory](VkDeviceMemory.html)
object, include a `VkImportMetalBufferInfoEXT` structure in the
`pNext` chain of the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure in a
[vkAllocateMemory](vkAllocateMemory.html) command.

The `VkImportMetalBufferInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkImportMetalBufferInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    MTLBuffer_id       mtlBuffer;
} VkImportMetalBufferInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mtlBuffer` is the Metal `id` object that is to underlie
the [VkDeviceMemory](VkDeviceMemory.html).

The application **must** ensure that the configuration of the `id`
object is compatible with the configuration of the [VkDeviceMemory](VkDeviceMemory.html).
Failure to do so results in **undefined** behavior.

Valid Usage (Implicit)

* 
[](#VUID-VkImportMetalBufferInfoEXT-sType-sType) VUID-VkImportMetalBufferInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_METAL_BUFFER_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkImportMetalBufferInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
