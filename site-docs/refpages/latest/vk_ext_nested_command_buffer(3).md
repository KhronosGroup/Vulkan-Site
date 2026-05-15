# VK_EXT_nested_command_buffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_nested_command_buffer.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_nested_command_buffer](#VK_EXT_nested_command_buffer)
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

VK_EXT_nested_command_buffer - device extension

**Name String**

`VK_EXT_nested_command_buffer`

**Extension Type**

Device extension

**Registered Extension Number**

452

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_nested_command_buffer] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_nested_command_buffer extension*)

**Last Modified Date**

2023-09-18

**Contributors**

* 
Daniel Story, Nintendo

* 
Peter Kohaut, NVIDIA

* 
Shahbaz Youssefi, Google

* 
Slawomir Grajewski, Intel

* 
Stu Smith, AMD

With core Vulkan it is not legal to call [vkCmdExecuteCommands](vkCmdExecuteCommands.html) when
recording a secondary command buffer.
This extension relaxes that restriction, allowing secondary command buffers
to execute other secondary command buffers.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceNestedCommandBufferFeaturesEXT](VkPhysicalDeviceNestedCommandBufferFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceNestedCommandBufferPropertiesEXT](VkPhysicalDeviceNestedCommandBufferPropertiesEXT.html)

* 
`VK_EXT_NESTED_COMMAND_BUFFER_EXTENSION_NAME`

* 
`VK_EXT_NESTED_COMMAND_BUFFER_SPEC_VERSION`

* 
Extending [VkRenderingFlagBits](VkRenderingFlagBits.html):

[VK_RENDERING_CONTENTS_INLINE_BIT_EXT](VkRenderingFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_NESTED_COMMAND_BUFFER_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_NESTED_COMMAND_BUFFER_PROPERTIES_EXT](VkStructureType.html)

Extending [VkSubpassContents](VkSubpassContents.html):

* 
[VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_EXT](VkSubpassContents.html)

1) The Command Buffer Levels property for the Vulkan commands comes from the
`cmdbufferlevel` attribute in `vk.xml` for the command, and it is currently
not possible to modify this attribute based on whether an extension is
enabled.
For this extension we want the `cmdbufferlevel` attribute for
vkCmdExecuteCommands to be `primary,secondary` when this extension is
enabled and `primary` otherwise.

**RESOLVED**: The `cmdbufferlevel` attribute for [vkCmdExecuteCommands](vkCmdExecuteCommands.html)
has been changed to `primary,secondary` and a new VUID added to prohibit
recording this command in a secondary command buffer unless this extension
is enabled.

* 
Revision 1, 2023-09-18 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_nested_command_buffer).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
