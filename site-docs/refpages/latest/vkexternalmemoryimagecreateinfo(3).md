# VkExternalMemoryImageCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalMemoryImageCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalMemoryImageCreateInfo - Specify that an image may be backed by external memory

To define a set of external memory handle types that **may** be used as backing
store for an image, add a [VkExternalMemoryImageCreateInfo](#) structure to
the `pNext` chain of the [VkImageCreateInfo](VkImageCreateInfo.html) structure.
The `VkExternalMemoryImageCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalMemoryImageCreateInfo {
    VkStructureType                    sType;
    const void*                        pNext;
    VkExternalMemoryHandleTypeFlags    handleTypes;
} VkExternalMemoryImageCreateInfo;

// Provided by VK_KHR_external_memory
// Equivalent to VkExternalMemoryImageCreateInfo
typedef VkExternalMemoryImageCreateInfo VkExternalMemoryImageCreateInfoKHR;

|  | A `VkExternalMemoryImageCreateInfo` structure with a non-zero
| --- | --- |
`handleTypes` field must be included in the creation parameters for an
image that will be bound to memory that is either exported or imported. |

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
[](#VUID-VkExternalMemoryImageCreateInfo-sType-sType) VUID-VkExternalMemoryImageCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkExternalMemoryImageCreateInfo-handleTypes-parameter) VUID-VkExternalMemoryImageCreateInfo-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

[VK_KHR_external_memory](VK_KHR_external_memory.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalMemoryHandleTypeFlags](VkExternalMemoryHandleTypeFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkExternalMemoryImageCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
