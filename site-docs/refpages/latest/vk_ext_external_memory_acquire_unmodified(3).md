# VK_EXT_external_memory_acquire_unmodified(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_external_memory_acquire_unmodified.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_external_memory_acquire_unmodified](#VK_EXT_external_memory_acquire_unmodified)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_external_memory_acquire_unmodified - device extension

**Name String**

`VK_EXT_external_memory_acquire_unmodified`

**Extension Type**

Device extension

**Registered Extension Number**

454

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_external_memory](VK_KHR_external_memory.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_external_memory_acquire_unmodified] @cubanismo%0A*Here describe the issue or question you have about the VK_EXT_external_memory_acquire_unmodified extension*)

**Extension Proposal**

[VK_EXT_external_memory_acquire_unmodified](../../../../features/latest/features/proposals/VK_EXT_external_memory_acquire_unmodified.html)

**Last Modified Date**

2023-03-09

**Contributors**

* 
Lina Versace, Google

* 
Chia-I Wu, Google

* 
James Jones, NVIDIA

* 
Yiwei Zhang, Google

A memory barrier **may** have a performance penalty when acquiring ownership of
a subresource range from an external queue family.
This extension provides API that **may** reduce the performance penalty if
ownership of the subresource range was previously released to the external
queue family and if the resource’s memory has remained unmodified between
the release and acquire operations.

* 
Extending [VkBufferMemoryBarrier](VkBufferMemoryBarrier.html), [VkBufferMemoryBarrier2](VkBufferMemoryBarrier2.html), [VkImageMemoryBarrier](VkImageMemoryBarrier.html), [VkImageMemoryBarrier2](VkImageMemoryBarrier2.html):

[VkExternalMemoryAcquireUnmodifiedEXT](VkExternalMemoryAcquireUnmodifiedEXT.html)

* 
`VK_EXT_EXTERNAL_MEMORY_ACQUIRE_UNMODIFIED_EXTENSION_NAME`

* 
`VK_EXT_EXTERNAL_MEMORY_ACQUIRE_UNMODIFIED_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_ACQUIRE_UNMODIFIED_EXT](VkStructureType.html)

* 
Revision 1, 2023-03-09 (Lina Versace)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_external_memory_acquire_unmodified).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
