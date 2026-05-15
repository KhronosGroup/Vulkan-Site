# VK_EXT_external_memory_host(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_external_memory_host.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_external_memory_host](#VK_EXT_external_memory_host)
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

VK_EXT_external_memory_host - device extension

**Name String**

`VK_EXT_external_memory_host`

**Extension Type**

Device extension

**Registered Extension Number**

179

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
Daniel Rakos [drakos-amd](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_external_memory_host] @drakos-amd%0A*Here describe the issue or question you have about the VK_EXT_external_memory_host extension*)

**Last Modified Date**

2017-11-10

**IP Status**

No known IP claims.

**Contributors**

* 
Jaakko Konttinen, AMD

* 
David Mao, AMD

* 
Daniel Rakos, AMD

* 
Tobias Hector, Imagination Technologies

* 
Faith Ekstrand, Intel

* 
James Jones, NVIDIA

This extension enables an application to import host allocations and host
mapped foreign device memory to Vulkan memory objects.

* 
[vkGetMemoryHostPointerPropertiesEXT](vkGetMemoryHostPointerPropertiesEXT.html)

* 
[VkMemoryHostPointerPropertiesEXT](VkMemoryHostPointerPropertiesEXT.html)

* 
Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

[VkImportMemoryHostPointerInfoEXT](VkImportMemoryHostPointerInfoEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceExternalMemoryHostPropertiesEXT](VkPhysicalDeviceExternalMemoryHostPropertiesEXT.html)

* 
`VK_EXT_EXTERNAL_MEMORY_HOST_EXTENSION_NAME`

* 
`VK_EXT_EXTERNAL_MEMORY_HOST_SPEC_VERSION`

* 
Extending [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html):

[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_IMPORT_MEMORY_HOST_POINTER_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_HOST_POINTER_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_MEMORY_HOST_PROPERTIES_EXT](VkStructureType.html)

1) What memory type has to be used to import host pointers?

**RESOLVED**: Depends on the implementation.
Applications have to use the new [vkGetMemoryHostPointerPropertiesEXT](vkGetMemoryHostPointerPropertiesEXT.html)
command to query the supported memory types for a particular host pointer.
The reported memory types may include memory types that come from a memory
heap that is otherwise not usable for regular memory object allocation and
thus such a heap’s size may be zero.

2) Can the application still access the contents of the host allocation
after importing?

**RESOLVED**: Yes.
However, usual synchronization requirements apply.

3) Can the application free the host allocation?

**RESOLVED**: No, it violates valid usage conditions.
Using the memory object imported from a host allocation that is already
freed thus results in **undefined** behavior.

4) Is [vkMapMemory](vkMapMemory.html) expected to return the same host address which was
specified when importing it to the memory object?

**RESOLVED**: No.
Implementations are allowed to return the same address but it is not
required.
Some implementations might return a different virtual mapping of the
allocation, although the same physical pages will be used.

5) Is there any limitation on the alignment of the host pointer and/or size?

**RESOLVED**: Yes.
Both the address and the size have to be an integer multiple of
`minImportedHostPointerAlignment`.
In addition, some platforms and foreign devices may have additional
restrictions.

6) Can the same host allocation be imported multiple times into a given
physical device?

**RESOLVED**: No, at least not guaranteed by this extension.
Some platforms do not allow locking the same physical pages for device
access multiple times, so attempting to do it may result in **undefined**
behavior.

7) Does this extension support exporting the new handle type?

**RESOLVED**: No.

8) Should we include the possibility to import host mapped foreign device
memory using this API?

**RESOLVED**: Yes, through a separate handle type.
Implementations are still allowed to support only one of the handle types
introduced by this extension by not returning import support for a
particular handle type as returned in [VkExternalMemoryPropertiesKHR](VkExternalMemoryProperties.html).

* 
Revision 1, 2017-11-10 (Daniel Rakos)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_external_memory_host).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
