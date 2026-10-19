# VK_KHR_get_memory_requirements2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_get_memory_requirements2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_get_memory_requirements2](#VK_KHR_get_memory_requirements2)
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

VK_KHR_get_memory_requirements2 - device extension

**Name String**

`VK_KHR_get_memory_requirements2`

**Extension Type**

Device extension

**Registered Extension Number**

147

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
Faith Ekstrand [gfxstrand](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_get_memory_requirements2] @gfxstrand%0A*Here describe the issue or question you have about the VK_KHR_get_memory_requirements2 extension*)

**Last Modified Date**

2017-09-05

**IP Status**

No known IP claims.

**Contributors**

* 
Faith Ekstrand, Intel

* 
Jeff Bolz, NVIDIA

* 
Jesse Hall, Google

This extension provides new queries for memory requirements of images and
buffers that can be easily extended by other extensions, without introducing
any additional commands.
The Vulkan 1.0 [VkMemoryRequirements](VkMemoryRequirements.html) and
[VkSparseImageMemoryRequirements](VkSparseImageMemoryRequirements.html) structures do not include `sType`
and `pNext` members.
This extension wraps them in new structures with these members, so an
application can query a chain of memory requirements structures by
constructing the chain and letting the implementation fill them in.
A new command is added for each `vkGet*MemoryRequrements` command in
core Vulkan 1.0.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkGetBufferMemoryRequirements2KHR](vkGetBufferMemoryRequirements2.html)

* 
[vkGetImageMemoryRequirements2KHR](vkGetImageMemoryRequirements2.html)

* 
[vkGetImageSparseMemoryRequirements2KHR](vkGetImageSparseMemoryRequirements2.html)

* 
[VkBufferMemoryRequirementsInfo2KHR](VkBufferMemoryRequirementsInfo2.html)

* 
[VkImageMemoryRequirementsInfo2KHR](VkImageMemoryRequirementsInfo2.html)

* 
[VkImageSparseMemoryRequirementsInfo2KHR](VkImageSparseMemoryRequirementsInfo2.html)

* 
[VkMemoryRequirements2KHR](VkMemoryRequirements2.html)

* 
[VkSparseImageMemoryRequirements2KHR](VkSparseImageMemoryRequirements2.html)

* 
`VK_KHR_GET_MEMORY_REQUIREMENTS_2_EXTENSION_NAME`

* 
`VK_KHR_GET_MEMORY_REQUIREMENTS_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_BUFFER_MEMORY_REQUIREMENTS_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_MEMORY_REQUIREMENTS_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_SPARSE_MEMORY_REQUIREMENTS_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_REQUIREMENTS_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SPARSE_IMAGE_MEMORY_REQUIREMENTS_2_KHR](VkStructureType.html)

* 
Revision 1, 2017-03-23 (Faith Ekstrand)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_get_memory_requirements2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
