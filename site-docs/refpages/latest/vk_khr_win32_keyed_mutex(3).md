# VK_KHR_win32_keyed_mutex(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_win32_keyed_mutex.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_win32_keyed_mutex](#VK_KHR_win32_keyed_mutex)
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

VK_KHR_win32_keyed_mutex - device extension

**Name String**

`VK_KHR_win32_keyed_mutex`

**Extension Type**

Device extension

**Registered Extension Number**

76

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_external_memory_win32](VK_KHR_external_memory_win32.html)

**Contact**

* 
Carsten Rohde [crohde](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_win32_keyed_mutex] @crohde%0A*Here describe the issue or question you have about the VK_KHR_win32_keyed_mutex extension*)

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

Applications that wish to import Direct3D 11 memory objects into the Vulkan
API may wish to use the native keyed mutex mechanism to synchronize access
to the memory between Vulkan and Direct3D.
This extension provides a way for an application to access the keyed mutex
associated with an imported Vulkan memory object when submitting command
buffers to a queue.

* 
Extending [VkSubmitInfo](VkSubmitInfo.html), [VkSubmitInfo2](VkSubmitInfo2.html):

[VkWin32KeyedMutexAcquireReleaseInfoKHR](VkWin32KeyedMutexAcquireReleaseInfoKHR.html)

* 
`VK_KHR_WIN32_KEYED_MUTEX_EXTENSION_NAME`

* 
`VK_KHR_WIN32_KEYED_MUTEX_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_WIN32_KEYED_MUTEX_ACQUIRE_RELEASE_INFO_KHR](VkStructureType.html)

* 
Revision 1, 2016-10-21 (James Jones)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_win32_keyed_mutex).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
