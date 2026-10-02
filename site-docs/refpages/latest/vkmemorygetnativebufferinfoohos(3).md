# VkMemoryGetNativeBufferInfoOHOS(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryGetNativeBufferInfoOHOS.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryGetNativeBufferInfoOHOS - Structure describing an Open Harmony OS native buffer memory export operation

The `VkMemoryGetNativeBufferInfoOHOS` structure is defined as:

// Provided by VK_OHOS_external_memory
typedef struct VkMemoryGetNativeBufferInfoOHOS {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
} VkMemoryGetNativeBufferInfoOHOS;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is a valid `VkDeviceMemory` object from which the Open
Harmony OS native buffer will be exported.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetNativeBufferInfoOHOS-sType-sType) VUID-VkMemoryGetNativeBufferInfoOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_NATIVE_BUFFER_INFO_OHOS](VkStructureType.html)

* 
[](#VUID-VkMemoryGetNativeBufferInfoOHOS-pNext-pNext) VUID-VkMemoryGetNativeBufferInfoOHOS-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetNativeBufferInfoOHOS-memory-parameter) VUID-VkMemoryGetNativeBufferInfoOHOS-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

[VK_OHOS_external_memory](VK_OHOS_external_memory.html), [VkDeviceMemory](VkDeviceMemory.html), [VkStructureType](VkStructureType.html), [vkGetMemoryNativeBufferOHOS](vkGetMemoryNativeBufferOHOS.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkMemoryGetNativeBufferInfoOHOS).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
