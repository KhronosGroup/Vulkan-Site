# VK_KHR_external_semaphore_win32(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_external_semaphore_win32.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_external_semaphore_win32](#VK_KHR_external_semaphore_win32)
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

VK_KHR_external_semaphore_win32 - device extension

**Name String**

`VK_KHR_external_semaphore_win32`

**Extension Type**

Device extension

**Registered Extension Number**

79

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_external_semaphore](VK_KHR_external_semaphore.html)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_external_semaphore_win32] @cubanismo%0A*Here describe the issue or question you have about the VK_KHR_external_semaphore_win32 extension*)

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

An application using external memory may wish to synchronize access to that
memory using semaphores.
This extension enables an application to export semaphore payload to and
import semaphore payload from Windows handles.

* 
[vkGetSemaphoreWin32HandleKHR](vkGetSemaphoreWin32HandleKHR.html)

* 
[vkImportSemaphoreWin32HandleKHR](vkImportSemaphoreWin32HandleKHR.html)

* 
[VkImportSemaphoreWin32HandleInfoKHR](VkImportSemaphoreWin32HandleInfoKHR.html)

* 
[VkSemaphoreGetWin32HandleInfoKHR](VkSemaphoreGetWin32HandleInfoKHR.html)

* 
Extending [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html):

[VkExportSemaphoreWin32HandleInfoKHR](VkExportSemaphoreWin32HandleInfoKHR.html)

Extending [VkSubmitInfo](VkSubmitInfo.html):

* 
[VkD3D12FenceSubmitInfoKHR](VkD3D12FenceSubmitInfoKHR.html)

* 
`VK_KHR_EXTERNAL_SEMAPHORE_WIN32_EXTENSION_NAME`

* 
`VK_KHR_EXTERNAL_SEMAPHORE_WIN32_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_D3D12_FENCE_SUBMIT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXPORT_SEMAPHORE_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_SEMAPHORE_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_GET_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

1) Do applications need to call `CloseHandle`() on the values returned
from [vkGetSemaphoreWin32HandleKHR](vkGetSemaphoreWin32HandleKHR.html) when `handleType` is
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT_KHR](VkExternalSemaphoreHandleTypeFlagBits.html)?

**RESOLVED**: Yes.
A successful get call transfers ownership of the handle to the application.
Destroying the semaphore object will not destroy the handle or the handle’s
reference to the underlying semaphore resource.
Unlike file descriptor opaque handles, win32 opaque handle ownership can not
be transferred back to a driver by an import operation.

2) Should the language regarding KMT/Windows 7 handles be moved to a
separate extension so that it can be deprecated over time?

**RESOLVED**: No.
Support for them can be deprecated by drivers if they choose, by no longer
returning them in the supported handle types of the instance level queries.

3) Should applications be allowed to specify additional object attributes
for shared handles?

**RESOLVED**: Yes.
Applications will be allowed to provide similar attributes to those they
would to any other handle creation API.

4) How do applications communicate the desired fence values to use with
`D3D12_FENCE`-based Vulkan semaphores?

**RESOLVED**: There are a couple of options.
The values for the signaled and reset states could be communicated up front
when creating the object and remain static for the life of the Vulkan
semaphore, or they could be specified using auxiliary structures when
submitting semaphore signal and wait operations, similar to what is done
with the keyed mutex extensions.
The latter is more flexible and consistent with the keyed mutex usage, but
the former is a much simpler API.

Since Vulkan tends to favor flexibility and consistency over simplicity, a
new structure specifying D3D12 fence acquire and release values is added to
the [vkQueueSubmit](vkQueueSubmit.html) function.

* 
Revision 1, 2016-10-21 (James Jones)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_external_semaphore_win32).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
