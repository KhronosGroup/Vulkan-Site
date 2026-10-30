# VK_NV_command_buffer_inheritance(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_command_buffer_inheritance.html

## Table of Contents

- [Name](#_name)
- [VK_NV_command_buffer_inheritance](#VK_NV_command_buffer_inheritance)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_command_buffer_inheritance - device extension

**Name String**

`VK_NV_command_buffer_inheritance`

**Extension Type**

Device extension

**Registered Extension Number**

560

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Lujin Wang [lujinwangnv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_command_buffer_inheritance] @lujinwangnv%0A*Here describe the issue or question you have about the VK_NV_command_buffer_inheritance extension*)

**Last Modified Date**

2024-02-15

**IP Status**

No known IP claims.

**Contributors**

* 
Piers Daniell, NVIDIA

* 
Daniel Story, Nintendo

This extension allows applications to take advantage of the graphics and
compute state that remains valid in the queue between executions of
submitted command buffers.
This works across both primary and secondary command buffers.

The state inherited includes the previously bound pipeline state, previously
bound shader objects, previously bound vertex and index buffers, previously
bound descriptor sets and push constants, and all previously set dynamic
state.

This extension relaxes the requirement that all that state needs to be bound
and set after begin command buffer and before the next draw or dispatch.

By not having to set state that has been inherited applications can save
both CPU and GPU cycles by not having to set state redundantly, and also
have improved flexibility when reusing secondary command buffers.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCommandBufferInheritanceFeaturesNV](VkPhysicalDeviceCommandBufferInheritanceFeaturesNV.html)

* 
`VK_NV_COMMAND_BUFFER_INHERITANCE_EXTENSION_NAME`

* 
`VK_NV_COMMAND_BUFFER_INHERITANCE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMMAND_BUFFER_INHERITANCE_FEATURES_NV](VkStructureType.html)

1) How can the validation layer know when state is valid at draw or dispatch
time if it is inherited at execution time?

**RESOLVED**: Validation of invalid state at draw and dispatch time cannot be
done while recording those commands.
Instead the validation layer will need to keep track of any unset state when
draw and dispatch commands are recorded, but not report an error at that
time.
It should also keep track of what state is valid at the end of each recorded
command buffer.
When secondary command buffer execution is recorded the validation layer can
update its unset state tracking for that command buffer, and also for draw
and dispatch commands recorded after execution of the secondary as they will
inherit state from the executed secondary.
This can be done recursively so every recorded primary command buffer has a
final tally of any unset state used at draw and dispatch time.
Finally when the primary is submitted to the queue the validation layer will
know the previous primaries submitted to the queue and will know if there is
any unset state used and can report the error then.

* 
Revision 1, 2024-02-15 (Lujin Wang)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_command_buffer_inheritance).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
