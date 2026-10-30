# VkExternalMemoryHandleTypeFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalMemoryHandleTypeFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalMemoryHandleTypeFlagBitsNV - Bitmask specifying external memory handle types

Possible values of [VkImportMemoryWin32HandleInfoNV](VkImportMemoryWin32HandleInfoNV.html)::`handleType`,
specifying the type of an external memory handle, are:

// Provided by VK_NV_external_memory_capabilities
typedef enum VkExternalMemoryHandleTypeFlagBitsNV {
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_NV = 0x00000001,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_NV = 0x00000002,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_IMAGE_BIT_NV = 0x00000004,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_IMAGE_KMT_BIT_NV = 0x00000008,
} VkExternalMemoryHandleTypeFlagBitsNV;

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_NV](#) specifies a
handle to memory returned by [vkGetMemoryWin32HandleNV](vkGetMemoryWin32HandleNV.html).

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_NV](#) specifies a
handle to memory returned by [vkGetMemoryWin32HandleNV](vkGetMemoryWin32HandleNV.html), or one
duplicated from such a handle using `DuplicateHandle()`.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_IMAGE_BIT_NV](#) specifies a
valid NT handle to memory returned by
`IDXGIResource1::CreateSharedHandle`, or a handle duplicated from such a
handle using `DuplicateHandle()`.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_IMAGE_KMT_BIT_NV](#) specifies a
handle to memory returned by `IDXGIResource::GetSharedHandle()`.

[VK_NV_external_memory_capabilities](VK_NV_external_memory_capabilities.html), [VkExternalMemoryHandleTypeFlagsNV](VkExternalMemoryHandleTypeFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExternalMemoryHandleTypeFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
