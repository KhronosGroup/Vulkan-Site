# VkExportMetalObjectCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMetalObjectCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMetalObjectCreateInfoEXT - Structure that identifies the Metal objects that can be exported from Vulkan objects

To export Metal objects from Vulkan objects, the application **must** first
indicate the intention to do so during the creation of the Vulkan object, by
including one or more [VkExportMetalObjectCreateInfoEXT](#) structures in
the `pNext` chain of the [VkInstanceCreateInfo](VkInstanceCreateInfo.html),
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html), [VkImageCreateInfo](VkImageCreateInfo.html),
[VkImageViewCreateInfo](VkImageViewCreateInfo.html), [VkBufferViewCreateInfo](VkBufferViewCreateInfo.html),
[VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html), or [VkEventCreateInfo](VkEventCreateInfo.html), in the
corresponding Vulkan object creation command.

The `VkExportMetalObjectCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalObjectCreateInfoEXT {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExportMetalObjectTypeFlagBitsEXT    exportObjectType;
} VkExportMetalObjectCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`exportObjectType` is a [VkExportMetalObjectTypeFlagBitsEXT](VkExportMetalObjectTypeFlagBitsEXT.html)
indicating the type of Metal object that the application may request to
be exported from the Vulkan object.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalObjectCreateInfoEXT-sType-sType) VUID-VkExportMetalObjectCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_OBJECT_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkExportMetalObjectCreateInfoEXT-exportObjectType-parameter) VUID-VkExportMetalObjectCreateInfoEXT-exportObjectType-parameter

 If `exportObjectType` is not `0`, `exportObjectType` **must** be a valid [VkExportMetalObjectTypeFlagBitsEXT](VkExportMetalObjectTypeFlagBitsEXT.html) value

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferViewCreateInfo](VkBufferViewCreateInfo.html)

* 
[VkEventCreateInfo](VkEventCreateInfo.html)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)

* 
[VkInstanceCreateInfo](VkInstanceCreateInfo.html)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

* 
[VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html)

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkExportMetalObjectTypeFlagBitsEXT](VkExportMetalObjectTypeFlagBitsEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMetalObjectCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
