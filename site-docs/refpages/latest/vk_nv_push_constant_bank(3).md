# VK_NV_push_constant_bank(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_push_constant_bank.html

## Table of Contents

- [Name](#_name)
- [VK_NV_push_constant_bank](#VK_NV_push_constant_bank)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [New SPIR-V Decorations](#_new_spir_v_decorations)
- [New_SPIR-V_Decorations](#_new_spir_v_decorations)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_push_constant_bank - device extension

**Name String**

`VK_NV_push_constant_bank`

**Extension Type**

Device extension

**Registered Extension Number**

581

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_NV_push_constant_bank](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_push_constant_bank.html)

**Contact**

* 
Vassili Nikolaev [vasnik1](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_push_constant_bank] @vasnik1%0A*Here describe the issue or question you have about the VK_NV_push_constant_bank extension*)

**Extension Proposal**

[VK_NV_push_constant_bank](../../../../features/latest/features/proposals/VK_NV_push_constant_bank.html)

**Last Modified Date**

2025-09-15

**Contributors**

* 
Pat Brown, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Rodrigo Locatti, NVIDIA

* 
Daniel Story, Nintendo

The [VK_NV_push_constant_bank](#) extension allows applications to specify
a bank and offset for push constants, enabling more flexible push constant
management in descriptor heap scenarios where shaders are able to access
different root descriptors.

Traditional push constants are placed in a default location, but this
extension allows applications to specify which hardware constant bank to use
and at what offset within that bank.
This provides greater control over memory layout and enables more efficient
use of hardware resources in advanced descriptor heap configurations.

The extension integrates with [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html) by allowing
`VkPushConstantBankInfoNV` structures to be chained to
`VkDescriptorSetAndBindingMappingEXT`, `VkPushDataInfoEXT`,
`VkPushConstantsInfo`, or `VkIndirectCommandsLayoutTokenEXT`
structures, specifying the hardware bank where push constants should be
placed as part of the descriptor heap mapping configuration or push data
operations.

Key features include:

* 
Bank and offset specification for push constant placement

* 
Integration with descriptor heap mapping through structure chaining

* 
Support for GLSL shader qualifiers for bank and offset specification in
SPIR-V

* 
Validation of bank bounds and alignment requirements

* 
Compatibility with existing push constant API

The number of available push constant banks is implementation-dependent and
can be queried through separate limits in
`VkPhysicalDevicePushConstantBankPropertiesNV`:
`maxGraphicsPushConstantBanks` and `maxComputePushConstantBanks` for
non-descriptor heap usage, and `maxGraphicsPushDataBanks` and
`maxComputePushDataBanks` for descriptor heap scenarios.
Applications must ensure bank indices remain within the appropriate
implementation-defined range based on the shader type and usage context.

Shader support for banks and member offsets are defined by the
[`SPV_NV_push_constant_bank`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_push_constant_bank.html)
SPIR-V extension, which can be used with the
[`GLSL_NV_push_constant_bank`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_push_constant_bank.txt)
GLSL extension.

* 
[    `PushConstantBanksNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-PushConstantBanksNV)

* 
[`BankNV`](../../../../spec/latest/chapters/shaders.html#shaders-pushconstant-decorations-banknv)

* 
[`MemberOffsetNV`](../../../../spec/latest/chapters/shaders.html#shaders-pushconstant-decorations-memberoffsetnv)

* 
Extending [VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html), [VkPushDataInfoEXT](VkPushDataInfoEXT.html), [VkPushConstantsInfo](VkPushConstantsInfo.html), [VkIndirectCommandsLayoutTokenEXT](VkIndirectCommandsLayoutTokenEXT.html):

[VkPushConstantBankInfoNV](VkPushConstantBankInfoNV.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDevicePushConstantBankFeaturesNV](VkPhysicalDevicePushConstantBankFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDevicePushConstantBankPropertiesNV](VkPhysicalDevicePushConstantBankPropertiesNV.html)

* 
`VK_NV_PUSH_CONSTANT_BANK_EXTENSION_NAME`

* 
`VK_NV_PUSH_CONSTANT_BANK_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_CONSTANT_BANK_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_CONSTANT_BANK_PROPERTIES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PUSH_CONSTANT_BANK_INFO_NV](VkStructureType.html)

None.

* 
Revision 1, 2025-09-15 (NVIDIA Vassili Nikolaev)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_push_constant_bank).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
