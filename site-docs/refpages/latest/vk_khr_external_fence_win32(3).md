# VK_KHR_external_fence_win32(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_external_fence_win32.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_external_fence_win32](#VK_KHR_external_fence_win32)
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

VK_KHR_external_fence_win32 - device extension

**Name String**

`VK_KHR_external_fence_win32`

**Extension Type**

Device extension

**Registered Extension Number**

115

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_external_fence](VK_KHR_external_fence.html)

**Contact**

* 
Jesse Hall [critsec](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_external_fence_win32] @critsec%0A*Here describe the issue or question you have about the VK_KHR_external_fence_win32 extension*)

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
Contributors to `[VK_KHR_external_semaphore_win32](VK_KHR_external_semaphore_win32.html)`

An application using external memory may wish to synchronize access to that
memory using fences.
This extension enables an application to export fence payload to and import
fence payload from Windows handles.

* 
[vkGetFenceWin32HandleKHR](vkGetFenceWin32HandleKHR.html)

* 
[vkImportFenceWin32HandleKHR](vkImportFenceWin32HandleKHR.html)

* 
[VkFenceGetWin32HandleInfoKHR](VkFenceGetWin32HandleInfoKHR.html)

* 
[VkImportFenceWin32HandleInfoKHR](VkImportFenceWin32HandleInfoKHR.html)

* 
Extending [VkFenceCreateInfo](VkFenceCreateInfo.html):

[VkExportFenceWin32HandleInfoKHR](VkExportFenceWin32HandleInfoKHR.html)

* 
`VK_KHR_EXTERNAL_FENCE_WIN32_EXTENSION_NAME`

* 
`VK_KHR_EXTERNAL_FENCE_WIN32_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_EXPORT_FENCE_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_FENCE_GET_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_FENCE_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

This extension borrows concepts, semantics, and language from
`[VK_KHR_external_semaphore_win32](VK_KHR_external_semaphore_win32.html)`.
That extension’s issues apply equally to this extension.

1) Should D3D12 fence handle types be supported, like they are for
semaphores?

**RESOLVED**: No.
Doing so would require extending the fence signal and wait operations to
provide values to signal / wait for, like `VkD3D12FenceSubmitInfoKHR`
does.
A D3D12 fence can be signaled by importing it into a [VkSemaphore](VkSemaphore.html)
instead of a [VkFence](VkFence.html), and applications can check status or wait on the
D3D12 fence using non-Vulkan APIs.
The convenience of being able to do these operations on `VkFence`
objects does not justify the extra API complexity.

* 
Revision 1, 2017-05-08 (Jesse Hall)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_external_fence_win32).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
