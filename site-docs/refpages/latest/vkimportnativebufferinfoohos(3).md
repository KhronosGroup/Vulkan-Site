# VkImportNativeBufferInfoOHOS(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportNativeBufferInfoOHOS.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportNativeBufferInfoOHOS - Import memory from an Open Harmony OS hardware buffer

To import memory created outside of the current Vulkan instance from an Open
Harmony OS native buffer, add a `VkImportNativeBufferInfoOHOS` structure
to the `pNext` chain of the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure.
The `VkImportNativeBufferInfoOHOS` structure is defined as:

// Provided by VK_OHOS_external_memory
typedef struct VkImportNativeBufferInfoOHOS {
    VkStructureType            sType;
    const void*                pNext;
    struct OH_NativeBuffer*    buffer;
} VkImportNativeBufferInfoOHOS;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is a pointer to an `OH_NativeBuffer` structure.

A reference to the imported native buffer should be acquired by the
implementation if the [vkAllocateMemory](vkAllocateMemory.html) command succeeds.
Then the reference **must** release when the device memory object is freed.
If the command fails, the implementation **must** not retain a reference.

Valid Usage (Implicit)

* 
[](#VUID-VkImportNativeBufferInfoOHOS-sType-sType) VUID-VkImportNativeBufferInfoOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_NATIVE_BUFFER_INFO_OHOS](VkStructureType.html)

* 
[](#VUID-VkImportNativeBufferInfoOHOS-buffer-parameter) VUID-VkImportNativeBufferInfoOHOS-buffer-parameter

 `buffer` **must** be a valid pointer to an `OH_NativeBuffer` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_OHOS_external_memory](VK_OHOS_external_memory.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImportNativeBufferInfoOHOS).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
