# VkPrivateDataSlotCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPrivateDataSlotCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPrivateDataSlotCreateInfo - Structure specifying the parameters of private data slot construction

The `VkPrivateDataSlotCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPrivateDataSlotCreateInfo {
    VkStructureType                 sType;
    const void*                     pNext;
    VkPrivateDataSlotCreateFlags    flags;
} VkPrivateDataSlotCreateInfo;

// Provided by VK_EXT_private_data
// Equivalent to VkPrivateDataSlotCreateInfo
typedef VkPrivateDataSlotCreateInfo VkPrivateDataSlotCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPrivateDataSlotCreateFlagBits](VkPrivateDataSlotCreateFlagBits.html)
specifying additional parameters of the private data slot.

Valid Usage

* 
[](#VUID-VkPrivateDataSlotCreateInfo-flags-12501) VUID-VkPrivateDataSlotCreateInfo-flags-12501

  If `flags` contain
  [VK_PRIVATE_DATA_SLOT_CREATE_BASE_OBJECT_HANDLE_BIT_NV](VkPrivateDataSlotCreateFlagBits.html), the
[`privateDataBaseHandle`](../../../../spec/latest/chapters/features.html#features-privateDataBaseHandle) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPrivateDataSlotCreateInfo-sType-sType) VUID-VkPrivateDataSlotCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRIVATE_DATA_SLOT_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPrivateDataSlotCreateInfo-pNext-pNext) VUID-VkPrivateDataSlotCreateInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPrivateDataSlotCreateInfo-flags-parameter) VUID-VkPrivateDataSlotCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkPrivateDataSlotCreateFlagBits](VkPrivateDataSlotCreateFlagBits.html) values

* 
[](#VUID-VkPrivateDataSlotCreateInfo-flags-requiredbitmask) VUID-VkPrivateDataSlotCreateInfo-flags-requiredbitmask

 `flags` **must** not be `0`

[VK_EXT_private_data](VK_EXT_private_data.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkPrivateDataSlotCreateFlags](VkPrivateDataSlotCreateFlags.html), [VkStructureType](VkStructureType.html), [vkCreatePrivateDataSlot](vkCreatePrivateDataSlot.html), [vkCreatePrivateDataSlot](vkCreatePrivateDataSlot.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/private_data.html#VkPrivateDataSlotCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
