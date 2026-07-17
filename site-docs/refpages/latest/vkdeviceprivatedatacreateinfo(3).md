# VkDevicePrivateDataCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDevicePrivateDataCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDevicePrivateDataCreateInfo - Reserve private data slots

To reserve private data storage slots, add a
[VkDevicePrivateDataCreateInfo](#) structure to the `pNext` chain of
the [VkDeviceCreateInfo](VkDeviceCreateInfo.html) structure.
Reserving slots in this manner is not strictly necessary, but doing so **may**
improve performance.

// Provided by VK_VERSION_1_3
typedef struct VkDevicePrivateDataCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           privateDataSlotRequestCount;
} VkDevicePrivateDataCreateInfo;

// Provided by VK_EXT_private_data
// Equivalent to VkDevicePrivateDataCreateInfo
typedef VkDevicePrivateDataCreateInfo VkDevicePrivateDataCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`privateDataSlotRequestCount` is the amount of slots to reserve.

Valid Usage (Implicit)

* 
[](#VUID-VkDevicePrivateDataCreateInfo-sType-sType) VUID-VkDevicePrivateDataCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_PRIVATE_DATA_CREATE_INFO](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

[VK_EXT_private_data](VK_EXT_private_data.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDevicePrivateDataCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
