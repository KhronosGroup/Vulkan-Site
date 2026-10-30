# VK_KHR_external_fence_fd(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_external_fence_fd.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_external_fence_fd](#VK_KHR_external_fence_fd)
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

VK_KHR_external_fence_fd - device extension

**Name String**

`VK_KHR_external_fence_fd`

**Extension Type**

Device extension

**Registered Extension Number**

116

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_external_fence](VK_KHR_external_fence.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Jesse Hall [critsec](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_external_fence_fd] @critsec%0A*Here describe the issue or question you have about the VK_KHR_external_fence_fd extension*)

**Last Modified Date**

2017-05-08

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
Cass Everitt, Oculus

* 
Contributors to `[VK_KHR_external_semaphore_fd](VK_KHR_external_semaphore_fd.html)`

An application using external memory may wish to synchronize access to that
memory using fences.
This extension enables an application to export fence payload to and import
fence payload from POSIX file descriptors.

* 
[vkGetFenceFdKHR](vkGetFenceFdKHR.html)

* 
[vkImportFenceFdKHR](vkImportFenceFdKHR.html)

* 
[VkFenceGetFdInfoKHR](VkFenceGetFdInfoKHR.html)

* 
[VkImportFenceFdInfoKHR](VkImportFenceFdInfoKHR.html)

* 
`VK_KHR_EXTERNAL_FENCE_FD_EXTENSION_NAME`

* 
`VK_KHR_EXTERNAL_FENCE_FD_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_FENCE_GET_FD_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_FENCE_FD_INFO_KHR](VkStructureType.html)

This extension borrows concepts, semantics, and language from
`[VK_KHR_external_semaphore_fd](VK_KHR_external_semaphore_fd.html)`.
That extension’s issues apply equally to this extension.

* 
Revision 1, 2017-05-08 (Jesse Hall)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_external_fence_fd).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
