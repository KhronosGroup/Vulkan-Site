# VK_EXT_extended_dynamic_state2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_extended_dynamic_state2.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_extended_dynamic_state2](#VK_EXT_extended_dynamic_state2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_extended_dynamic_state2 - device extension

**Name String**

`VK_EXT_extended_dynamic_state2`

**Extension Type**

Device extension

**Registered Extension Number**

378

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Vikram Kushwaha [vkushwaha-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_extended_dynamic_state2] @vkushwaha-nv%0A*Here describe the issue or question you have about the VK_EXT_extended_dynamic_state2 extension*)

**Last Modified Date**

2021-04-12

**IP Status**

No known IP claims.

**Contributors**

* 
Vikram Kushwaha, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Jeff Bolz, NVIDIA

This extension adds some more dynamic state to support applications that
need to reduce the number of pipeline state objects they compile and bind.

* 
[vkCmdSetDepthBiasEnableEXT](vkCmdSetDepthBiasEnable.html)

* 
[vkCmdSetLogicOpEXT](vkCmdSetLogicOpEXT.html)

* 
[vkCmdSetPatchControlPointsEXT](vkCmdSetPatchControlPointsEXT.html)

* 
[vkCmdSetPrimitiveRestartEnableEXT](vkCmdSetPrimitiveRestartEnable.html)

* 
[vkCmdSetRasterizerDiscardEnableEXT](vkCmdSetRasterizerDiscardEnable.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceExtendedDynamicState2FeaturesEXT](VkPhysicalDeviceExtendedDynamicState2FeaturesEXT.html)

* 
`VK_EXT_EXTENDED_DYNAMIC_STATE_2_EXTENSION_NAME`

* 
`VK_EXT_EXTENDED_DYNAMIC_STATE_2_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE_EXT](VkDynamicState.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_2_FEATURES_EXT](VkStructureType.html)

The dynamic state enumerants [VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE_EXT](VkDynamicState.html), and
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE_EXT](VkDynamicState.html); and the corresponding
commands in this extension are included in core Vulkan 1.3, with the EXT
suffix omitted.
The enumerants and commands for dynamic logic operation and patch control
points are not promoted, nor is the feature structure.
Extension interfaces that were promoted remain available as aliases of the
core functionality.

* 
Revision 1, 2021-04-12 (Vikram Kushwaha)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_extended_dynamic_state2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
