# VK_KHR_bind_memory2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_bind_memory2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_bind_memory2](#VK_KHR_bind_memory2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_bind_memory2 - device extension

**Name String**

`VK_KHR_bind_memory2`

**Extension Type**

Device extension

**Registered Extension Number**

158

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_bind_memory2] @tobski%0A*Here describe the issue or question you have about the VK_KHR_bind_memory2 extension*)

**Last Modified Date**

2017-09-05

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Tobias Hector, Imagination Technologies

This extension provides versions of [vkBindBufferMemory](vkBindBufferMemory.html) and
[vkBindImageMemory](vkBindImageMemory.html) that allow multiple bindings to be performed at
once, and are extensible.

This extension also introduces [VK_IMAGE_CREATE_ALIAS_BIT_KHR](VkImageCreateFlagBits.html), which
allows “identical” images that alias the same memory to interpret the
contents consistently, even across image layout changes.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkBindBufferMemory2KHR](vkBindBufferMemory2.html)

* 
[vkBindImageMemory2KHR](vkBindImageMemory2.html)

* 
[VkBindBufferMemoryInfoKHR](VkBindBufferMemoryInfo.html)

* 
[VkBindImageMemoryInfoKHR](VkBindImageMemoryInfo.html)

* 
`VK_KHR_BIND_MEMORY_2_EXTENSION_NAME`

* 
`VK_KHR_BIND_MEMORY_2_SPEC_VERSION`

* 
Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

[VK_IMAGE_CREATE_ALIAS_BIT_KHR](VkImageCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_INFO_KHR](VkStructureType.html)

* 
Revision 1, 2017-05-19 (Tobias Hector)

Pulled bind memory functions into their own extension

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_bind_memory2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
