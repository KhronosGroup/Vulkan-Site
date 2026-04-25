# VK_FUCHSIA_external_memory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_FUCHSIA_external_memory.html

## Table of Contents

- [Name](#_name)
- [VK_FUCHSIA_external_memory](#VK_FUCHSIA_external_memory)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_FUCHSIA_external_memory - device extension

**Name String**

`VK_FUCHSIA_external_memory`

**Extension Type**

Device extension

**Registered Extension Number**

365

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html)

     and

     [VK_KHR_external_memory](VK_KHR_external_memory.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
John Rosasco [rosasco](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_FUCHSIA_external_memory] @rosasco%0A*Here describe the issue or question you have about the VK_FUCHSIA_external_memory extension*)

**Last Modified Date**

2021-03-01

**IP Status**

No known IP claims.

**Contributors**

* 
Craig Stout, Google

* 
John Bauman, Google

* 
John Rosasco, Google

Vulkan apps may wish to export or import device memory handles to or from
other logical devices, instances, or APIs.

This memory sharing can eliminate copies of memory buffers when different
subsystems need to interoperate on them.
Sharing memory buffers may also facilitate a better distribution of
processing workload for more complex memory manipulation pipelines.

* 
[vkGetMemoryZirconHandleFUCHSIA](vkGetMemoryZirconHandleFUCHSIA.html)

* 
[vkGetMemoryZirconHandlePropertiesFUCHSIA](vkGetMemoryZirconHandlePropertiesFUCHSIA.html)

* 
[VkMemoryGetZirconHandleInfoFUCHSIA](VkMemoryGetZirconHandleInfoFUCHSIA.html)

* 
[VkMemoryZirconHandlePropertiesFUCHSIA](VkMemoryZirconHandlePropertiesFUCHSIA.html)

* 
Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

[VkImportMemoryZirconHandleInfoFUCHSIA](VkImportMemoryZirconHandleInfoFUCHSIA.html)

* 
`VK_FUCHSIA_EXTERNAL_MEMORY_EXTENSION_NAME`

* 
`VK_FUCHSIA_EXTERNAL_MEMORY_SPEC_VERSION`

* 
Extending [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html):

[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](VkExternalMemoryHandleTypeFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_IMPORT_MEMORY_ZIRCON_HANDLE_INFO_FUCHSIA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_GET_ZIRCON_HANDLE_INFO_FUCHSIA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_ZIRCON_HANDLE_PROPERTIES_FUCHSIA](VkStructureType.html)

See `[VK_KHR_external_memory](VK_KHR_external_memory.html)` issues list for further information.

* 
Revision 1, 2021-03-01 (John Rosasco)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_FUCHSIA_external_memory).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
