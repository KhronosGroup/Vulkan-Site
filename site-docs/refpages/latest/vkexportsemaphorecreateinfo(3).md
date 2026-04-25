# VkExportSemaphoreCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportSemaphoreCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportSemaphoreCreateInfo - Structure specifying handle types that can be exported from a semaphore

To create a semaphore whose payload **can** be exported to external handles,
add a [VkExportSemaphoreCreateInfo](#) structure to the `pNext` chain
of the [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html) structure.
The `VkExportSemaphoreCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExportSemaphoreCreateInfo {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalSemaphoreHandleTypeFlags    handleTypes;
} VkExportSemaphoreCreateInfo;

// Provided by VK_KHR_external_semaphore
// Equivalent to VkExportSemaphoreCreateInfo
typedef VkExportSemaphoreCreateInfo VkExportSemaphoreCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is a bitmask of
[VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) specifying one or more
semaphore handle types the application **can** export from the resulting
semaphore.
The application **can** request multiple handle types for the same
semaphore.

Valid Usage

* 
[](#VUID-VkExportSemaphoreCreateInfo-handleTypes-01124) VUID-VkExportSemaphoreCreateInfo-handleTypes-01124

The bits in `handleTypes` **must** be supported and compatible, as
reported by [VkExternalSemaphoreProperties](VkExternalSemaphoreProperties.html)

Valid Usage (Implicit)

* 
[](#VUID-VkExportSemaphoreCreateInfo-sType-sType) VUID-VkExportSemaphoreCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_SEMAPHORE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkExportSemaphoreCreateInfo-handleTypes-parameter) VUID-VkExportSemaphoreCreateInfo-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html)

[VK_KHR_external_semaphore](VK_KHR_external_semaphore.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalSemaphoreHandleTypeFlags](VkExternalSemaphoreHandleTypeFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkExportSemaphoreCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
