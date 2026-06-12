# VK_QCOM_rotated_copy_commands(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_rotated_copy_commands.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_rotated_copy_commands](#VK_QCOM_rotated_copy_commands)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Issues](#_issues)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_rotated_copy_commands - device extension

**Name String**

`VK_QCOM_rotated_copy_commands`

**Extension Type**

Device extension

**Registered Extension Number**

334

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_rotated_copy_commands] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_rotated_copy_commands extension*)

**Last Modified Date**

2023-12-13

**Interactions and External Dependencies**

* 
This extension interacts with `[VK_KHR_swapchain](VK_KHR_swapchain.html)`

* 
This extension interacts with `[VK_KHR_surface](VK_KHR_surface.html)`

**Contributors**

* 
Jeff Leger, Qualcomm Technologies, Inc.

* 
Matthew Netsch, Qualcomm Technologies, Inc.

This extension extends adds an optional rotation transform to copy commands
[vkCmdBlitImage2KHR](vkCmdBlitImage2.html), [vkCmdCopyImageToBuffer2KHR](vkCmdCopyImageToBuffer2.html) and
[vkCmdCopyBufferToImage2KHR](vkCmdCopyBufferToImage2.html).
When copying between two resources, where one resource contains rotated
content and the other does not, a rotated copy may be desired.
This extension may be used in combination with VK_QCOM_render_pass_transform
which adds rotated render passes.

This extension adds an extension structure to the commands
[vkCmdBlitImage2KHR](vkCmdBlitImage2.html), [vkCmdCopyImageToBuffer2KHR](vkCmdCopyImageToBuffer2.html), and
[vkCmdCopyBufferToImage2KHR](vkCmdCopyBufferToImage2.html)

1) What is an appropriate name for the added extension structure? The style
guide says “Structures which extend other structures through the
`pNext` chain should reflect the name of the base structure they
extend.”, but in this case a single extension structure is used to extend
three base structures (vkCmdBlitImage2KHR, vkCmdCopyImageToBuffer2KHR, and
vkCmdCopyBufferToImage2KHR).
Creating three identical structures with unique names seemed undesirable.

**RESOLVED**: Deviate from the style guide for extension structure naming.

2) Should this extension add a rotation capability to vkCmdCopyImage2KHR?

**RESOLVED**: No.
Use of rotated vkCmdBlitImage2KHR can fully address this use case.

3) Should this extension add a rotation capability to vkCmdResolveImage2KHR?

**RESOLVED** No.
Use of vkCmdResolveImage2KHR is very slow and extremely bandwidth intensive
on Qualcomm’s GPU architecture and use of pResolveAttachments in
vkRenderPass is the strongly preferred approach.
Therefore, we choose not to introduce a rotation capability to
vkCmdResolveImage2KHR.

* 
Extending [VkBufferImageCopy2](VkBufferImageCopy2.html), [VkImageBlit2](VkImageBlit2.html), [VkDeviceMemoryImageCopyKHR](VkDeviceMemoryImageCopyKHR.html):

[VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)

* 
`VK_QCOM_ROTATED_COPY_COMMANDS_EXTENSION_NAME`

* 
`VK_QCOM_ROTATED_COPY_COMMANDS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_COPY_COMMAND_TRANSFORM_INFO_QCOM](VkStructureType.html)

* 
Revision 1, 2020-09-19 (Jeff Leger)

* 
Revision 2, 2023-12-13 (Matthew Netsch)

Relax dependency on VK_KHR_swapchain

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_rotated_copy_commands).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
