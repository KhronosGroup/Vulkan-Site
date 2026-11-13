# VK_NV_device_diagnostic_checkpoints(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_device_diagnostic_checkpoints.html

## Table of Contents

- [Name](#_name)
- [VK_NV_device_diagnostic_checkpoints](#VK_NV_device_diagnostic_checkpoints)
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

VK_NV_device_diagnostic_checkpoints - device extension

**Name String**

`VK_NV_device_diagnostic_checkpoints`

**Extension Type**

Device extension

**Registered Extension Number**

207

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_synchronization2

**Contact**

* 
Nuno Subtil [nsubtil](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_device_diagnostic_checkpoints] @nsubtil%0A*Here describe the issue or question you have about the VK_NV_device_diagnostic_checkpoints extension*)

**Last Modified Date**

2018-07-16

**Contributors**

* 
Oleg Kuznetsov, NVIDIA

* 
Alex Dunn, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Eric Werness, NVIDIA

* 
Daniel Koch, NVIDIA

This extension allows applications to insert markers in the command stream
and associate them with custom data.

If a device lost error occurs, the application **may** then query the
implementation for the last markers to cross specific implementation-defined
pipeline stages, in order to narrow down which commands were executing at
the time and might have caused the failure.

* 
[vkCmdSetCheckpointNV](vkCmdSetCheckpointNV.html)

* 
[vkGetQueueCheckpointDataNV](vkGetQueueCheckpointDataNV.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_synchronization2](VK_KHR_synchronization2.html) is supported:

* 
[vkGetQueueCheckpointData2NV](vkGetQueueCheckpointData2NV.html)

* 
[VkCheckpointDataNV](VkCheckpointDataNV.html)

* 
Extending [VkQueueFamilyProperties2](VkQueueFamilyProperties2.html):

[VkQueueFamilyCheckpointPropertiesNV](VkQueueFamilyCheckpointPropertiesNV.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_synchronization2](VK_KHR_synchronization2.html) is supported:

* 
[VkCheckpointData2NV](VkCheckpointData2NV.html)

* 
Extending [VkQueueFamilyProperties2](VkQueueFamilyProperties2.html):

[VkQueueFamilyCheckpointProperties2NV](VkQueueFamilyCheckpointProperties2NV.html)

* 
`VK_NV_DEVICE_DIAGNOSTIC_CHECKPOINTS_EXTENSION_NAME`

* 
`VK_NV_DEVICE_DIAGNOSTIC_CHECKPOINTS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_CHECKPOINT_DATA_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_CHECKPOINT_PROPERTIES_NV](VkStructureType.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_synchronization2](VK_KHR_synchronization2.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_CHECKPOINT_DATA_2_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_CHECKPOINT_PROPERTIES_2_NV](VkStructureType.html)

* 
Revision 1, 2018-07-16 (Nuno Subtil)

Internal revisions

Revision 2, 2018-07-16 (Nuno Subtil)

* 
???

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_device_diagnostic_checkpoints).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
