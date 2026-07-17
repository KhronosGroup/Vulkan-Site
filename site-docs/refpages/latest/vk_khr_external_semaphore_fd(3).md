# VK_KHR_external_semaphore_fd(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_external_semaphore_fd.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_external_semaphore_fd](#VK_KHR_external_semaphore_fd)
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

VK_KHR_external_semaphore_fd - device extension

**Name String**

`VK_KHR_external_semaphore_fd`

**Extension Type**

Device extension

**Registered Extension Number**

80

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_external_semaphore](VK_KHR_external_semaphore.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_external_semaphore_fd] @cubanismo%0A*Here describe the issue or question you have about the VK_KHR_external_semaphore_fd extension*)

**Last Modified Date**

2016-10-21

**IP Status**

No known IP claims.

**Contributors**

* 
Jesse Hall, Google

* 
James Jones, NVIDIA

* 
Jeff Juliano, NVIDIA

* 
Carsten Rohde, NVIDIA

An application using external memory may wish to synchronize access to that
memory using semaphores.
This extension enables an application to export semaphore payload to and
import semaphore payload from POSIX file descriptors.

* 
[vkGetSemaphoreFdKHR](vkGetSemaphoreFdKHR.html)

* 
[vkImportSemaphoreFdKHR](vkImportSemaphoreFdKHR.html)

* 
[VkImportSemaphoreFdInfoKHR](VkImportSemaphoreFdInfoKHR.html)

* 
[VkSemaphoreGetFdInfoKHR](VkSemaphoreGetFdInfoKHR.html)

* 
`VK_KHR_EXTERNAL_SEMAPHORE_FD_EXTENSION_NAME`

* 
`VK_KHR_EXTERNAL_SEMAPHORE_FD_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_IMPORT_SEMAPHORE_FD_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_GET_FD_INFO_KHR](VkStructureType.html)

1) Does the application need to close the file descriptor returned by
[vkGetSemaphoreFdKHR](vkGetSemaphoreFdKHR.html)?

**RESOLVED**: Yes, unless it is passed back in to a driver instance to import
the semaphore.
A successful get call transfers ownership of the file descriptor to the
application, and a successful import transfers it back to the driver.
Destroying the original semaphore object will not close the file descriptor
or remove its reference to the underlying semaphore resource associated with
it.

* 
Revision 1, 2016-10-21 (Jesse Hall)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_external_semaphore_fd).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
