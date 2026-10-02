# VK_EXT_vertex_input_dynamic_state(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_vertex_input_dynamic_state.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_vertex_input_dynamic_state](#VK_EXT_vertex_input_dynamic_state)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_vertex_input_dynamic_state - device extension

**Name String**

`VK_EXT_vertex_input_dynamic_state`

**Extension Type**

Device extension

**Registered Extension Number**

353

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_vertex_input_dynamic_state] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_vertex_input_dynamic_state extension*)

**Last Modified Date**

2020-08-21

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Spencer Fricke, Samsung

* 
Stu Smith, AMD

One of the states that contributes to the combinatorial explosion of
pipeline state objects that need to be created, is the vertex input binding
and attribute descriptions.
By allowing them to be dynamic applications may reduce the number of
pipeline objects they need to create.

This extension adds dynamic state support for what is normally static state
in [VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html).

* 
[vkCmdSetVertexInputEXT](vkCmdSetVertexInputEXT.html)

* 
[VkVertexInputAttributeDescription2EXT](VkVertexInputAttributeDescription2EXT.html)

* 
[VkVertexInputBindingDescription2EXT](VkVertexInputBindingDescription2EXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT](VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT.html)

* 
`VK_EXT_VERTEX_INPUT_DYNAMIC_STATE_EXTENSION_NAME`

* 
`VK_EXT_VERTEX_INPUT_DYNAMIC_STATE_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](VkDynamicState.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_INPUT_DYNAMIC_STATE_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VERTEX_INPUT_ATTRIBUTE_DESCRIPTION_2_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VERTEX_INPUT_BINDING_DESCRIPTION_2_EXT](VkStructureType.html)

* 
Revision 2, 2020-11-05 (Piers Daniell)

Make [VkVertexInputBindingDescription2EXT](VkVertexInputBindingDescription2EXT.html) extensible

* 
Add new [VkVertexInputAttributeDescription2EXT](VkVertexInputAttributeDescription2EXT.html) structure for the
`pVertexAttributeDescriptions` parameter to
[vkCmdSetVertexInputEXT](vkCmdSetVertexInputEXT.html) so it is also extensible

Revision 1, 2020-08-21 (Piers Daniell)

* 
Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_vertex_input_dynamic_state).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
