# VK_EXT_conditional_rendering(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_conditional_rendering.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_conditional_rendering](#VK_EXT_conditional_rendering)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_conditional_rendering - device extension

**Name String**

`VK_EXT_conditional_rendering`

**Extension Type**

Device extension

**Registered Extension Number**

82

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
Vikram Kushwaha [vkushwaha](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_conditional_rendering] @vkushwaha%0A*Here describe the issue or question you have about the VK_EXT_conditional_rendering extension*)

**Last Modified Date**

2018-05-21

**IP Status**

No known IP claims.

**Contributors**

* 
Vikram Kushwaha, NVIDIA

* 
Daniel Rakos, AMD

* 
Jesse Hall, Google

* 
Jeff Bolz, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Stuart Smith, Imagination Technologies

This extension allows the execution of one or more rendering commands to be
conditional on a value in buffer memory.
This may help an application reduce the latency by conditionally discarding
rendering commands without application intervention.
The conditional rendering commands are limited to draws, compute dispatches
and clearing attachments within a conditional rendering block.

* 
[vkCmdBeginConditionalRenderingEXT](vkCmdBeginConditionalRenderingEXT.html)

* 
[vkCmdEndConditionalRenderingEXT](vkCmdEndConditionalRenderingEXT.html)

* 
[VkConditionalRenderingBeginInfoEXT](VkConditionalRenderingBeginInfoEXT.html)

* 
Extending [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html):

[VkCommandBufferInheritanceConditionalRenderingInfoEXT](VkCommandBufferInheritanceConditionalRenderingInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceConditionalRenderingFeaturesEXT](VkPhysicalDeviceConditionalRenderingFeaturesEXT.html)

* 
[VkConditionalRenderingFlagBitsEXT](VkConditionalRenderingFlagBitsEXT.html)

* 
[VkConditionalRenderingFlagsEXT](VkConditionalRenderingFlagsEXT.html)

* 
`VK_EXT_CONDITIONAL_RENDERING_EXTENSION_NAME`

* 
`VK_EXT_CONDITIONAL_RENDERING_SPEC_VERSION`

* 
Extending [VkAccessFlagBits](VkAccessFlagBits.html):

[VK_ACCESS_CONDITIONAL_RENDERING_READ_BIT_EXT](VkAccessFlagBits.html)

Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

* 
[VK_BUFFER_USAGE_CONDITIONAL_RENDERING_BIT_EXT](VkBufferUsageFlagBits.html)

Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

* 
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_CONDITIONAL_RENDERING_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_CONDITIONAL_RENDERING_BEGIN_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CONDITIONAL_RENDERING_FEATURES_EXT](VkStructureType.html)

1) Should conditional rendering affect copy and blit commands?

**RESOLVED**: Conditional rendering should not affect copies and blits.

2) Should secondary command buffers be allowed to execute while conditional
rendering is active in the primary command buffer?

**RESOLVED**: The rendering commands in secondary command buffer will be
affected by an active conditional rendering in primary command buffer if the
`conditionalRenderingEnable` is set to [VK_TRUE](VK_TRUE.html).
Conditional rendering **must** not be active in the primary command buffer if
`conditionalRenderingEnable` is [VK_FALSE](VK_FALSE.html).

None.

* 
Revision 1, 2018-04-19 (Vikram Kushwaha)

First Version

Revision 2, 2018-05-21 (Vikram Kushwaha)

* 
Add new pipeline stage, access flags and limit conditional rendering to
a subpass or entire render pass.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_conditional_rendering).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
