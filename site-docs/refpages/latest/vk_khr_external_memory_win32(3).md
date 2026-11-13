# VK_KHR_external_memory_win32(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_external_memory_win32.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_external_memory_win32](#VK_KHR_external_memory_win32)
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

VK_KHR_external_memory_win32 - device extension

**Name String**

`VK_KHR_external_memory_win32`

**Extension Type**

Device extension

**Registered Extension Number**

74

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
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_external_memory_win32] @cubanismo%0A*Here describe the issue or question you have about the VK_KHR_external_memory_win32 extension*)

**Last Modified Date**

2016-10-21

**IP Status**

No known IP claims.

**Contributors**

* 
James Jones, NVIDIA

* 
Jeff Juliano, NVIDIA

* 
Carsten Rohde, NVIDIA

An application may wish to reference device memory in multiple Vulkan
logical devices or instances, in multiple processes, and/or in multiple
APIs.
This extension enables an application to export Windows handles from Vulkan
memory objects and to import Vulkan memory objects from Windows handles
exported from other Vulkan memory objects or from similar resources in other
APIs.

* 
[vkGetMemoryWin32HandleKHR](vkGetMemoryWin32HandleKHR.html)

* 
[vkGetMemoryWin32HandlePropertiesKHR](vkGetMemoryWin32HandlePropertiesKHR.html)

* 
[VkMemoryGetWin32HandleInfoKHR](VkMemoryGetWin32HandleInfoKHR.html)

* 
[VkMemoryWin32HandlePropertiesKHR](VkMemoryWin32HandlePropertiesKHR.html)

* 
Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

[VkExportMemoryWin32HandleInfoKHR](VkExportMemoryWin32HandleInfoKHR.html)

* 
[VkImportMemoryWin32HandleInfoKHR](VkImportMemoryWin32HandleInfoKHR.html)

* 
`VK_KHR_EXTERNAL_MEMORY_WIN32_EXTENSION_NAME`

* 
`VK_KHR_EXTERNAL_MEMORY_WIN32_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_EXPORT_MEMORY_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_MEMORY_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_GET_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_WIN32_HANDLE_PROPERTIES_KHR](VkStructureType.html)

1) Do applications need to call `CloseHandle`() on the values returned
from [vkGetMemoryWin32HandleKHR](vkGetMemoryWin32HandleKHR.html) when `handleType` is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_KHR](VkExternalMemoryHandleTypeFlagBits.html)?

**RESOLVED**: Yes.
A successful get call transfers ownership of the handle to the application.
Destroying the memory object will not destroy the handle or the handle’s
reference to the underlying memory resource.
Unlike file descriptor opaque handles, win32 opaque handle ownership can not
be transferred back to a driver by an import operation.

2) Should the language regarding KMT/Windows 7 handles be moved to a
separate extension so that it can be deprecated over time?

**RESOLVED**: No.
Support for them can be deprecated by drivers if they choose, by no longer
returning them in the supported handle types of the instance level queries.

3) How should the valid size and memory type for windows memory handles
created outside of Vulkan be specified?

**RESOLVED**: The valid memory types are queried directly from the external
handle.
The size is determined by the associated image or buffer memory requirements
for external handle types that require dedicated allocations, and by the
size specified when creating the object from which the handle was exported
for other external handle types.

* 
Revision 1, 2016-10-21 (James Jones)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_external_memory_win32).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
