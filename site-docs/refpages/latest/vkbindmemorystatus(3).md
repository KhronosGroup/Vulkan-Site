# VkBindMemoryStatus(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindMemoryStatus.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindMemoryStatus - Structure specifying where to return memory binding status

The `VkBindMemoryStatus` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkBindMemoryStatus {
    VkStructureType    sType;
    const void*        pNext;
    VkResult*          pResult;
} VkBindMemoryStatus;

// Provided by VK_KHR_maintenance6
// Equivalent to VkBindMemoryStatus
typedef VkBindMemoryStatus VkBindMemoryStatusKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pResult` is a pointer to a [VkResult](VkResult.html) value.

If the `pNext` chain of [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html) or
[VkBindImageMemoryInfo](VkBindImageMemoryInfo.html) includes a `VkBindMemoryStatus` structure,
then the `VkBindMemoryStatus`::`pResult` will be populated with a
value describing the result of the corresponding memory binding operation.

Valid Usage (Implicit)

* 
[](#VUID-VkBindMemoryStatus-sType-sType) VUID-VkBindMemoryStatus-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_MEMORY_STATUS](VkStructureType.html)

* 
[](#VUID-VkBindMemoryStatus-pResult-parameter) VUID-VkBindMemoryStatus-pResult-parameter

 `pResult` **must** be a valid pointer to a [VkResult](VkResult.html) value

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html)

* 
[VkBindImageMemoryInfo](VkBindImageMemoryInfo.html)

[VK_KHR_maintenance6](VK_KHR_maintenance6.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkResult](VkResult.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBindMemoryStatus).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
