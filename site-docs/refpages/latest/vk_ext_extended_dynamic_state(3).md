# VK_EXT_extended_dynamic_state(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_extended_dynamic_state.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_extended_dynamic_state](#VK_EXT_extended_dynamic_state)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_extended_dynamic_state - device extension

**Name String**

`VK_EXT_extended_dynamic_state`

**Extension Type**

Device extension

**Registered Extension Number**

268

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
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_extended_dynamic_state] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_extended_dynamic_state extension*)

**Last Modified Date**

2019-12-09

**IP Status**

No known IP claims.

**Contributors**

* 
Dan Ginsburg, Valve Corporation

* 
Graeme Leese, Broadcom

* 
Hans-Kristian Arntzen, Valve Corporation

* 
Jan-Harald Fredriksen, Arm Limited

* 
Faith Ekstrand, Intel

* 
Jeff Bolz, NVIDIA

* 
Jesse Hall, Google

* 
Philip Rebohle, Valve Corporation

* 
Stuart Smith, Imagination Technologies

* 
Tobias Hector, AMD

This extension adds some more dynamic state to support applications that
need to reduce the number of pipeline state objects they compile and bind.

* 
[vkCmdBindVertexBuffers2EXT](vkCmdBindVertexBuffers2.html)

* 
[vkCmdSetCullModeEXT](vkCmdSetCullMode.html)

* 
[vkCmdSetDepthBoundsTestEnableEXT](vkCmdSetDepthBoundsTestEnable.html)

* 
[vkCmdSetDepthCompareOpEXT](vkCmdSetDepthCompareOp.html)

* 
[vkCmdSetDepthTestEnableEXT](vkCmdSetDepthTestEnable.html)

* 
[vkCmdSetDepthWriteEnableEXT](vkCmdSetDepthWriteEnable.html)

* 
[vkCmdSetFrontFaceEXT](vkCmdSetFrontFace.html)

* 
[vkCmdSetPrimitiveTopologyEXT](vkCmdSetPrimitiveTopology.html)

* 
[vkCmdSetScissorWithCountEXT](vkCmdSetScissorWithCount.html)

* 
[vkCmdSetStencilOpEXT](vkCmdSetStencilOp.html)

* 
[vkCmdSetStencilTestEnableEXT](vkCmdSetStencilTestEnable.html)

* 
[vkCmdSetViewportWithCountEXT](vkCmdSetViewportWithCount.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceExtendedDynamicStateFeaturesEXT](VkPhysicalDeviceExtendedDynamicStateFeaturesEXT.html)

* 
`VK_EXT_EXTENDED_DYNAMIC_STATE_EXTENSION_NAME`

* 
`VK_EXT_EXTENDED_DYNAMIC_STATE_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_CULL_MODE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_FRONT_FACE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_STENCIL_OP_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT_EXT](VkDynamicState.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_FEATURES_EXT](VkStructureType.html)

All dynamic state enumerants and commands in this extension are included in
core Vulkan 1.3, with the EXT suffix omitted.
The feature structure is not promoted.
Extension interfaces that were promoted remain available as aliases of the
core functionality.

1) Why are the values of `pStrides` in [vkCmdBindVertexBuffers2](vkCmdBindVertexBuffers2.html)
limited to be between 0 and the maximum extent of the binding, when this
restriction is not present for the same static state?

Implementing these edge cases adds overhead to some implementations that
would require significant cost when calling this function, and the intention
is that this state should be more or less free to change.

[VK_EXT_vertex_input_dynamic_state](VK_EXT_vertex_input_dynamic_state.html) allows the stride to be changed
freely when supported via [vkCmdSetVertexInputEXT](vkCmdSetVertexInputEXT.html).

* 
Revision 1, 2019-12-09 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_extended_dynamic_state).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
