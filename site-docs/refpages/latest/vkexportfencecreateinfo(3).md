# VkExportFenceCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportFenceCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportFenceCreateInfo - Structure specifying handle types that can be exported from a fence

To create a fence whose payload **can** be exported to external handles, add a
[VkExportFenceCreateInfo](#) structure to the `pNext` chain of the
[VkFenceCreateInfo](VkFenceCreateInfo.html) structure.
The `VkExportFenceCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExportFenceCreateInfo {
    VkStructureType                   sType;
    const void*                       pNext;
    VkExternalFenceHandleTypeFlags    handleTypes;
} VkExportFenceCreateInfo;

// Provided by VK_KHR_external_fence
// Equivalent to VkExportFenceCreateInfo
typedef VkExportFenceCreateInfo VkExportFenceCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is a bitmask of
[VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html) specifying one or more fence
handle types the application **can** export from the resulting fence.
The application **can** request multiple handle types for the same fence.

Valid Usage

* 
[](#VUID-VkExportFenceCreateInfo-handleTypes-01446) VUID-VkExportFenceCreateInfo-handleTypes-01446

The bits in `handleTypes` **must** be supported and compatible, as
reported by [VkExternalFenceProperties](VkExternalFenceProperties.html)

Valid Usage (Implicit)

* 
[](#VUID-VkExportFenceCreateInfo-sType-sType) VUID-VkExportFenceCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_FENCE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkExportFenceCreateInfo-handleTypes-parameter) VUID-VkExportFenceCreateInfo-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFenceCreateInfo](VkFenceCreateInfo.html)

[VK_KHR_external_fence](VK_KHR_external_fence.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalFenceHandleTypeFlags](VkExternalFenceHandleTypeFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkExportFenceCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
