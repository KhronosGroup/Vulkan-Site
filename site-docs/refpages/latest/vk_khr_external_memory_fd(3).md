# VK_KHR_external_memory_fd(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_external_memory_fd.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_external_memory_fd](#VK_KHR_external_memory_fd)
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

VK_KHR_external_memory_fd - device extension

**Name String**

`VK_KHR_external_memory_fd`

**Extension Type**

Device extension

**Registered Extension Number**

75

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
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_external_memory_fd] @cubanismo%0A*Here describe the issue or question you have about the VK_KHR_external_memory_fd extension*)

**Last Modified Date**

2016-10-21

**IP Status**

No known IP claims.

**Contributors**

* 
James Jones, NVIDIA

* 
Jeff Juliano, NVIDIA

An application may wish to reference device memory in multiple Vulkan
logical devices or instances, in multiple processes, and/or in multiple
APIs.
This extension enables an application to export POSIX file descriptor
handles from Vulkan memory objects and to import Vulkan memory objects from
POSIX file descriptor handles exported from other Vulkan memory objects or
from similar resources in other APIs.

* 
[vkGetMemoryFdKHR](vkGetMemoryFdKHR.html)

* 
[vkGetMemoryFdPropertiesKHR](vkGetMemoryFdPropertiesKHR.html)

* 
[VkMemoryFdPropertiesKHR](VkMemoryFdPropertiesKHR.html)

* 
[VkMemoryGetFdInfoKHR](VkMemoryGetFdInfoKHR.html)

* 
Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

[VkImportMemoryFdInfoKHR](VkImportMemoryFdInfoKHR.html)

* 
`VK_KHR_EXTERNAL_MEMORY_FD_EXTENSION_NAME`

* 
`VK_KHR_EXTERNAL_MEMORY_FD_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_IMPORT_MEMORY_FD_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_FD_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_GET_FD_INFO_KHR](VkStructureType.html)

1) Does the application need to close the file descriptor returned by
[vkGetMemoryFdKHR](vkGetMemoryFdKHR.html)?

**RESOLVED**: Yes, unless it is passed back in to a driver instance to import
the memory.
A successful get call transfers ownership of the file descriptor to the
application, and a successful import transfers it back to the driver.
Destroying the original memory object will not close the file descriptor or
remove its reference to the underlying memory resource associated with it.

2) Do drivers ever need to expose multiple file descriptors per memory
object?

**RESOLVED**: No.
This would indicate there are actually multiple memory objects, rather than
a single memory object.

3) How should the valid size and memory type for POSIX file descriptor
memory handles created outside of Vulkan be specified?

**RESOLVED**: The valid memory types are queried directly from the external
handle.
The size will be specified by future extensions that introduce such external
memory handle types.

* 
Revision 1, 2016-10-21 (James Jones)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_external_memory_fd).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
