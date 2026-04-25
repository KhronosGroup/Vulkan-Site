# VK_KHR_shader_subgroup_rotate(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_subgroup_rotate.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_subgroup_rotate](#VK_KHR_shader_subgroup_rotate)
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

VK_KHR_shader_subgroup_rotate - device extension

**Name String**

`VK_KHR_shader_subgroup_rotate`

**Extension Type**

Device extension

**Registered Extension Number**

417

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_subgroup_rotate](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_subgroup_rotate.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_subgroup_rotate] @kpet%0A*Here describe the issue or question you have about the VK_KHR_shader_subgroup_rotate extension*)

**Extension Proposal**

[VK_KHR_shader_subgroup_rotate](../../../../features/latest/features/proposals/VK_KHR_shader_subgroup_rotate.html)

**Last Modified Date**

2024-01-29

**IP Status**

No known IP claims.

**Contributors**

* 
Kévin Petit, Arm Ltd.

* 
Tobias Hector, AMD

* 
Jon Leech, Khronos

* 
Matthew Netsch, Qualcomm

* 
Jan-Harald Fredriksen, Arm Ltd.

* 
Graeme Leese, Broadcom

* 
Tom Olson, Arm Ltd.

* 
Spencer Fricke, LunarG Inc.

This extension adds support for the subgroup rotate instruction defined in
SPV_KHR_subgroup_rotate.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderSubgroupRotateFeaturesKHR](VkPhysicalDeviceShaderSubgroupRotateFeatures.html)

* 
`VK_KHR_SHADER_SUBGROUP_ROTATE_EXTENSION_NAME`

* 
`VK_KHR_SHADER_SUBGROUP_ROTATE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_ROTATE_FEATURES_KHR](VkStructureType.html)

Extending [VkSubgroupFeatureFlagBits](VkSubgroupFeatureFlagBits.html):

* 
[VK_SUBGROUP_FEATURE_ROTATE_BIT_KHR](VkSubgroupFeatureFlagBits.html)

* 
[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT_KHR](VkSubgroupFeatureFlagBits.html)

* 
[GroupNonUniformRotateKHR](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-GroupNonUniformRotateKHR)

Functionality in this extension is included in core Vulkan 1.4 with the KHR
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Revision 2, 2024-01-29 (Kévin Petit)

Add [VK_SUBGROUP_FEATURE_ROTATE_BIT_KHR](VkSubgroupFeatureFlagBits.html) and
[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT_KHR](VkSubgroupFeatureFlagBits.html)

Revision 1, 2023-06-20 (Kévin Petit)

* 
Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_subgroup_rotate).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
