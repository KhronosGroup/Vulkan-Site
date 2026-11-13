# VK_KHR_shader_expect_assume(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_expect_assume.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_expect_assume](#VK_KHR_shader_expect_assume)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_shader_expect_assume - device extension

**Name String**

`VK_KHR_shader_expect_assume`

**Extension Type**

Device extension

**Registered Extension Number**

545

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_expect_assume](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_expect_assume.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_expect_assume] @kpet%0A*Here describe the issue or question you have about the VK_KHR_shader_expect_assume extension*)

**Extension Proposal**

[VK_KHR_shader_expect_assume](../../../../features/latest/features/proposals/VK_KHR_shader_expect_assume.html)

**Last Modified Date**

2023-12-06

**IP Status**

No known IP claims.

**Contributors**

* 
Kevin Petit, Arm

* 
Tobias Hector, AMD

* 
James Fitzpatrick, Imagination Technologies

This extension allows the use of the `SPV_KHR_expect_assume` extension in
SPIR-V shader modules which enables SPIR-V producers to provide optimization
hints to the Vulkan implementation.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderExpectAssumeFeaturesKHR](VkPhysicalDeviceShaderExpectAssumeFeatures.html)

* 
`VK_KHR_SHADER_EXPECT_ASSUME_EXTENSION_NAME`

* 
`VK_KHR_SHADER_EXPECT_ASSUME_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_EXPECT_ASSUME_FEATURES_KHR](VkStructureType.html)

* 
[ExpectAssumeKHR](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ExpectAssumeKHR)

Functionality in this extension is included in core Vulkan 1.4 with the KHR
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Revision 1, 2023-12-06 (Kevin Petit)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_expect_assume).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
