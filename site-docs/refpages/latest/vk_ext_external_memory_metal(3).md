# VK_EXT_external_memory_metal(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_external_memory_metal.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_external_memory_metal](#VK_EXT_external_memory_metal)
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

VK_EXT_external_memory_metal - device extension

**Name String**

`VK_EXT_external_memory_metal`

**Extension Type**

Device extension

**Registered Extension Number**

603

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
Aitor Camacho Larrondo [aitor-lunarg](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_external_memory_metal] @aitor-lunarg%0A*Here describe the issue or question you have about the VK_EXT_external_memory_metal extension*)

**Extension Proposal**

[VK_EXT_external_memory_metal](../../../../features/latest/features/proposals/VK_EXT_external_memory_metal.html)

**Last Modified Date**

2024-07-18

**IP Status**

No known IP claims.

**Contributors**

* 
Aitor Camacho Larrondo, LunarG Inc.

An application may wish to reference device memory in multiple Vulkan device
instances, in multiple processes, and/or in Metal API.
This extension enables an application to export and import Metal handles
from Vulkan memory objects such that the underlying resources can be
referenced outside the scope of the Vulkan device instance that created
them.

* 
[vkGetMemoryMetalHandleEXT](vkGetMemoryMetalHandleEXT.html)

* 
[vkGetMemoryMetalHandlePropertiesEXT](vkGetMemoryMetalHandlePropertiesEXT.html)

* 
[VkMemoryGetMetalHandleInfoEXT](VkMemoryGetMetalHandleInfoEXT.html)

* 
[VkMemoryMetalHandlePropertiesEXT](VkMemoryMetalHandlePropertiesEXT.html)

* 
Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

[VkImportMemoryMetalHandleInfoEXT](VkImportMemoryMetalHandleInfoEXT.html)

* 
`VK_EXT_EXTERNAL_MEMORY_METAL_EXTENSION_NAME`

* 
`VK_EXT_EXTERNAL_MEMORY_METAL_SPEC_VERSION`

* 
Extending [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html):

[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_IMPORT_MEMORY_METAL_HANDLE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_GET_METAL_HANDLE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_METAL_HANDLE_PROPERTIES_EXT](VkStructureType.html)

* 
Revision 1, 2024-07-18 (Aitor Camacho Larrondo)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_external_memory_metal).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
