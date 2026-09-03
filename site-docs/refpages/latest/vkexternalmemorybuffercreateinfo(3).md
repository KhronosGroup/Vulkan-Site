# VkExternalMemoryBufferCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalMemoryBufferCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalMemoryBufferCreateInfo - Specify that a buffer may be backed by external memory

To define a set of external memory handle types that **may** be used as backing
store for a buffer, add a [VkExternalMemoryBufferCreateInfo](#) structure
to the `pNext` chain of the [VkBufferCreateInfo](VkBufferCreateInfo.html) structure.
The `VkExternalMemoryBufferCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalMemoryBufferCreateInfo {
    VkStructureType                    sType;
    const void*                        pNext;
    VkExternalMemoryHandleTypeFlags    handleTypes;
} VkExternalMemoryBufferCreateInfo;

// Provided by VK_KHR_external_memory
// Equivalent to VkExternalMemoryBufferCreateInfo
typedef VkExternalMemoryBufferCreateInfo VkExternalMemoryBufferCreateInfoKHR;

|  | A `VkExternalMemoryBufferCreateInfo` structure with a non-zero
| --- | --- |
`handleTypes` field must be included in the creation parameters for a
buffer that will be bound to memory that is either exported or imported. |

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is zero or a bitmask of
[VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) specifying one or more external
memory handle types.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalMemoryBufferCreateInfo-sType-sType) VUID-VkExternalMemoryBufferCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_BUFFER_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkExternalMemoryBufferCreateInfo-handleTypes-parameter) VUID-VkExternalMemoryBufferCreateInfo-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](VkBufferCreateInfo.html)

[VK_KHR_external_memory](VK_KHR_external_memory.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalMemoryHandleTypeFlags](VkExternalMemoryHandleTypeFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkExternalMemoryBufferCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
