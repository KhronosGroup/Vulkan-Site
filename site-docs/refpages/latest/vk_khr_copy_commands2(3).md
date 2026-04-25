# VK_KHR_copy_commands2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_copy_commands2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_copy_commands2](#VK_KHR_copy_commands2)
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

VK_KHR_copy_commands2 - device extension

**Name String**

`VK_KHR_copy_commands2`

**Extension Type**

Device extension

**Registered Extension Number**

338

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
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_copy_commands2] @mnetsch%0A*Here describe the issue or question you have about the VK_KHR_copy_commands2 extension*)

**Last Modified Date**

2020-07-06

**Contributors**

* 
Jeff Leger, Qualcomm

* 
Tobias Hector, AMD

* 
Jan-Harald Fredriksen, ARM

* 
Tom Olson, ARM

This extension provides extensible versions of the Vulkan buffer and image
copy commands.
The new commands are functionally identical to the core commands, except
that their copy parameters are specified using extensible structures that
can be used to pass extension-specific information.

The following extensible copy commands are introduced with this extension:
[vkCmdCopyBuffer2KHR](vkCmdCopyBuffer2.html), [vkCmdCopyImage2KHR](vkCmdCopyImage2.html),
[vkCmdCopyBufferToImage2KHR](vkCmdCopyBufferToImage2.html), [vkCmdCopyImageToBuffer2KHR](vkCmdCopyImageToBuffer2.html),
[vkCmdBlitImage2KHR](vkCmdBlitImage2.html), and [vkCmdResolveImage2KHR](vkCmdResolveImage2.html).
Each command contains an `*Info2KHR` structure parameter that includes
`sType`/`pNext` members.
Lower level structures describing each region to be copied are also extended
with `sType`/`pNext` members.

* 
[vkCmdBlitImage2KHR](vkCmdBlitImage2.html)

* 
[vkCmdCopyBuffer2KHR](vkCmdCopyBuffer2.html)

* 
[vkCmdCopyBufferToImage2KHR](vkCmdCopyBufferToImage2.html)

* 
[vkCmdCopyImage2KHR](vkCmdCopyImage2.html)

* 
[vkCmdCopyImageToBuffer2KHR](vkCmdCopyImageToBuffer2.html)

* 
[vkCmdResolveImage2KHR](vkCmdResolveImage2.html)

* 
[VkBlitImageInfo2KHR](VkBlitImageInfo2.html)

* 
[VkBufferCopy2KHR](VkBufferCopy2.html)

* 
[VkBufferImageCopy2KHR](VkBufferImageCopy2.html)

* 
[VkCopyBufferInfo2KHR](VkCopyBufferInfo2.html)

* 
[VkCopyBufferToImageInfo2KHR](VkCopyBufferToImageInfo2.html)

* 
[VkCopyImageInfo2KHR](VkCopyImageInfo2.html)

* 
[VkCopyImageToBufferInfo2KHR](VkCopyImageToBufferInfo2.html)

* 
[VkImageBlit2KHR](VkImageBlit2.html)

* 
[VkImageCopy2KHR](VkImageCopy2.html)

* 
[VkImageResolve2KHR](VkImageResolve2.html)

* 
[VkResolveImageInfo2KHR](VkResolveImageInfo2.html)

* 
`VK_KHR_COPY_COMMANDS_2_EXTENSION_NAME`

* 
`VK_KHR_COPY_COMMANDS_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_BLIT_IMAGE_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_COPY_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_IMAGE_COPY_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_BUFFER_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_BUFFER_TO_IMAGE_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_IMAGE_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_IMAGE_TO_BUFFER_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_BLIT_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_COPY_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_RESOLVE_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RESOLVE_IMAGE_INFO_2_KHR](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the KHR
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

* 
Revision 1, 2020-07-06 (Jeff Leger)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_copy_commands2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
