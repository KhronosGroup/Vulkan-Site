# VkExternalMemoryImageCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalMemoryImageCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalMemoryImageCreateInfoNV - Specify that an image may be backed by external memory

If the `pNext` chain includes a `VkExternalMemoryImageCreateInfoNV`
structure, then that structure defines a set of external memory handle types
that **may** be used as backing store for the image.

The `VkExternalMemoryImageCreateInfoNV` structure is defined as:

// Provided by VK_NV_external_memory
typedef struct VkExternalMemoryImageCreateInfoNV {
    VkStructureType                      sType;
    const void*                          pNext;
    VkExternalMemoryHandleTypeFlagsNV    handleTypes;
} VkExternalMemoryImageCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is zero or a bitmask of
[VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html) specifying one or more
external memory handle types.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalMemoryImageCreateInfoNV-sType-sType) VUID-VkExternalMemoryImageCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkExternalMemoryImageCreateInfoNV-handleTypes-parameter) VUID-VkExternalMemoryImageCreateInfoNV-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

[VK_NV_external_memory](VK_NV_external_memory.html), [VkExternalMemoryHandleTypeFlagsNV](VkExternalMemoryHandleTypeFlagsNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkExternalMemoryImageCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
