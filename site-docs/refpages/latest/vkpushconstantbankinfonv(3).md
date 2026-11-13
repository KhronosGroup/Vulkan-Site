# VkPushConstantBankInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPushConstantBankInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPushConstantBankInfoNV - Structure specifying push constant bank information

The `VkPushConstantBankInfoNV` structure is defined as:

// Provided by VK_NV_push_constant_bank
typedef struct VkPushConstantBankInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           bank;
} VkPushConstantBankInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`bank` is the index of the hardware bank into which the data is
pushed.

This structure **can** be chained to [VkPushDataInfoEXT](VkPushDataInfoEXT.html),
[VkPushConstantsInfo](VkPushConstantsInfo.html), [VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html), and
[VkIndirectCommandsLayoutTokenEXT](VkIndirectCommandsLayoutTokenEXT.html) via the `pNext` chain to specify
push constant bank placement:

* 
When chained to [VkPushDataInfoEXT](VkPushDataInfoEXT.html), it specifies the hardware bank
into which [vkCmdPushDataEXT](vkCmdPushDataEXT.html) pushes the data.

* 
When chained to [VkPushConstantsInfo](VkPushConstantsInfo.html), it specifies the hardware
bank into which [vkCmdPushConstants2](vkCmdPushConstants2.html) pushes the constants.

* 
When chained to [VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html), it specifies
the hardware push data bank from which the push data is read.

* 
When chained to [VkIndirectCommandsLayoutTokenEXT](VkIndirectCommandsLayoutTokenEXT.html) with
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](VkIndirectCommandsTokenTypeEXT.html), it specifies the
hardware bank into which indirect push data is placed.

This allows for more flexible push constant management in descriptor heap
scenarios where shaders access different root descriptors with specific bank
requirements.

Valid Usage

* 
[](#VUID-VkPushConstantBankInfoNV-bank-12342) VUID-VkPushConstantBankInfoNV-bank-12342

When chained to [VkPushDataInfoEXT](VkPushDataInfoEXT.html), if the command buffer is
executing graphics operations, `bank` **must** be less than
[VkPhysicalDevicePushConstantBankPropertiesNV](VkPhysicalDevicePushConstantBankPropertiesNV.html)::`maxGraphicsPushDataBanks`

* 
[](#VUID-VkPushConstantBankInfoNV-bank-12343) VUID-VkPushConstantBankInfoNV-bank-12343

When chained to [VkPushDataInfoEXT](VkPushDataInfoEXT.html), if the command buffer is
executing compute operations, `bank` **must** be less than
[VkPhysicalDevicePushConstantBankPropertiesNV](VkPhysicalDevicePushConstantBankPropertiesNV.html)::`maxComputePushDataBanks`

* 
[](#VUID-VkPushConstantBankInfoNV-bank-12344) VUID-VkPushConstantBankInfoNV-bank-12344

When chained to [VkPushConstantsInfo](VkPushConstantsInfo.html), if
VkPushConstantsInfo::stageFlags includes a graphics stage then
`bank` **must** be less than
[VkPhysicalDevicePushConstantBankPropertiesNV](VkPhysicalDevicePushConstantBankPropertiesNV.html)::`maxGraphicsPushConstantBanks`

* 
[](#VUID-VkPushConstantBankInfoNV-bank-12345) VUID-VkPushConstantBankInfoNV-bank-12345

When chained to [VkPushConstantsInfo](VkPushConstantsInfo.html), if
VkPushConstantsInfo::stageFlags includes a compute stage then `bank`
**must** be less than
[VkPhysicalDevicePushConstantBankPropertiesNV](VkPhysicalDevicePushConstantBankPropertiesNV.html)::`maxComputePushConstantBanks`

* 
[](#VUID-VkPushConstantBankInfoNV-bank-12346) VUID-VkPushConstantBankInfoNV-bank-12346

When chained to [VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html) for a graphics
shader stage, `bank` **must** be less than
[VkPhysicalDevicePushConstantBankPropertiesNV](VkPhysicalDevicePushConstantBankPropertiesNV.html)::`maxGraphicsPushDataBanks`

* 
[](#VUID-VkPushConstantBankInfoNV-bank-12347) VUID-VkPushConstantBankInfoNV-bank-12347

When chained to [VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html) for a compute
shader stage, `bank` **must** be less than
[VkPhysicalDevicePushConstantBankPropertiesNV](VkPhysicalDevicePushConstantBankPropertiesNV.html)::`maxComputePushDataBanks`

Valid Usage (Implicit)

* 
[](#VUID-VkPushConstantBankInfoNV-sType-sType) VUID-VkPushConstantBankInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PUSH_CONSTANT_BANK_INFO_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html)

* 
[VkIndirectCommandsLayoutTokenEXT](VkIndirectCommandsLayoutTokenEXT.html)

* 
[VkPushConstantsInfo](VkPushConstantsInfo.html)

* 
[VkPushDataInfoEXT](VkPushDataInfoEXT.html)

[VK_NV_push_constant_bank](VK_NV_push_constant_bank.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkPushConstantBankInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
