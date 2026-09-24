# VkPhysicalDevicePushConstantBankPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePushConstantBankPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePushConstantBankPropertiesNV - Structure describing push constant bank properties

The `VkPhysicalDevicePushConstantBankPropertiesNV` structure is defined
as:

// Provided by VK_NV_push_constant_bank
typedef struct VkPhysicalDevicePushConstantBankPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxGraphicsPushConstantBanks;
    uint32_t           maxComputePushConstantBanks;
    uint32_t           maxGraphicsPushDataBanks;
    uint32_t           maxComputePushDataBanks;
} VkPhysicalDevicePushConstantBankPropertiesNV;

This structure describes the following implementation-dependent limits:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxGraphicsPushConstantBanks` indicates the maximum number of push
constant banks supported for graphics pipelines when used with
non-descriptor heap scenarios.

* 
`maxComputePushConstantBanks` indicates the maximum number of push
constant banks supported for compute pipelines when used with
non-descriptor heap scenarios.

* 
`maxGraphicsPushDataBanks` indicates the maximum number of push data
banks supported for graphics pipelines when using descriptor heaps.

* 
`maxComputePushDataBanks` indicates the maximum number of push data
banks supported for compute pipelines when using descriptor heaps.

If the `VkPhysicalDevicePushConstantBankPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

|  | The number of banks available for descriptor heap usage
| --- | --- |
(`maxGraphicsPushDataBanks` and `maxComputePushDataBanks`) is equal
or greater than the number of banks available for non-descriptor heap usage
(`maxGraphicsPushConstantBanks` and `maxComputePushConstantBanks`).

For graphics shaders, both descriptor heap and non-descriptor heap limits
are greater than 1.
For compute shaders, the number of banks is equal to or greater than 1. |

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePushConstantBankPropertiesNV-sType-sType) VUID-VkPhysicalDevicePushConstantBankPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_CONSTANT_BANK_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_push_constant_bank](VK_NV_push_constant_bank.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDevicePushConstantBankPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
