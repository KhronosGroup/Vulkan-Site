# vkGetMemoryWin32HandleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryWin32HandleNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryWin32HandleNV - Retrieve Win32 handle to a device memory object

To retrieve the handle corresponding to a device memory object created with
[VkExportMemoryAllocateInfoNV](VkExportMemoryAllocateInfoNV.html)::`handleTypes` set to include
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_NV](VkExternalMemoryHandleTypeFlagBitsNV.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_NV](VkExternalMemoryHandleTypeFlagBitsNV.html), call:

// Provided by VK_NV_external_memory_win32
VkResult vkGetMemoryWin32HandleNV(
    VkDevice                                    device,
    VkDeviceMemory                              memory,
    VkExternalMemoryHandleTypeFlagsNV           handleType,
    HANDLE*                                     pHandle);

* 
`device` is the logical device that owns the memory.

* 
`memory` is the [VkDeviceMemory](VkDeviceMemory.html) object.

* 
`handleType` is a bitmask of
[VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html) containing a single bit
specifying the type of handle requested.

* 
`pHandle` is a pointer to a Windows `HANDLE` in which the handle
is returned.

Valid Usage

* 
[](#VUID-vkGetMemoryWin32HandleNV-handleType-01326) VUID-vkGetMemoryWin32HandleNV-handleType-01326

`handleType` **must** be a flag specified in
[VkExportMemoryAllocateInfoNV](VkExportMemoryAllocateInfoNV.html)::`handleTypes` when allocating
`memory`

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryWin32HandleNV-device-parameter) VUID-vkGetMemoryWin32HandleNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryWin32HandleNV-memory-parameter) VUID-vkGetMemoryWin32HandleNV-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-vkGetMemoryWin32HandleNV-handleType-parameter) VUID-vkGetMemoryWin32HandleNV-handleType-parameter

 `handleType` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html) values

* 
[](#VUID-vkGetMemoryWin32HandleNV-handleType-requiredbitmask) VUID-vkGetMemoryWin32HandleNV-handleType-requiredbitmask

 `handleType` **must** not be `0`

* 
[](#VUID-vkGetMemoryWin32HandleNV-pHandle-parameter) VUID-vkGetMemoryWin32HandleNV-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `HANDLE` value

* 
[](#VUID-vkGetMemoryWin32HandleNV-memory-parent) VUID-vkGetMemoryWin32HandleNV-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_TOO_MANY_OBJECTS](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_external_memory_win32](VK_NV_external_memory_win32.html), [VkDevice](VkDevice.html), [VkDeviceMemory](VkDeviceMemory.html), [VkExternalMemoryHandleTypeFlagsNV](VkExternalMemoryHandleTypeFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetMemoryWin32HandleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
