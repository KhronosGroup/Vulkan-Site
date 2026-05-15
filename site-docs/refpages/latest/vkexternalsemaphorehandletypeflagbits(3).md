# VkExternalSemaphoreHandleTypeFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalSemaphoreHandleTypeFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalSemaphoreHandleTypeFlagBits - Bitmask of valid external semaphore handle types

Bits which **may** be set in
[VkPhysicalDeviceExternalSemaphoreInfo](VkPhysicalDeviceExternalSemaphoreInfo.html)::`handleType`, specifying an
external semaphore handle type, are:

// Provided by VK_VERSION_1_1
typedef enum VkExternalSemaphoreHandleTypeFlagBits {
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT = 0x00000001,
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT = 0x00000002,
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT = 0x00000004,
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT = 0x00000008,
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT = 0x00000010,
  // Provided by VK_FUCHSIA_external_semaphore
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_ZIRCON_EVENT_BIT_FUCHSIA = 0x00000080,
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D11_FENCE_BIT = VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT_KHR = VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT_KHR = VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_KHR = VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT_KHR = VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT_KHR = VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT,
} VkExternalSemaphoreHandleTypeFlagBits;

// Provided by VK_KHR_external_semaphore_capabilities
// Equivalent to VkExternalSemaphoreHandleTypeFlagBits
typedef VkExternalSemaphoreHandleTypeFlagBits VkExternalSemaphoreHandleTypeFlagBitsKHR;

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT](#) specifies a POSIX
file descriptor handle that has only limited valid usage outside of
Vulkan and other compatible APIs.
It **must** be compatible with the POSIX system calls `dup`, `dup2`,
`close`, and the non-standard system call `dup3`.
Additionally, it **must** be transportable over a socket using an
`SCM_RIGHTS` control message.
It owns a reference to the underlying synchronization primitive
represented by its Vulkan semaphore object.

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](#) specifies an NT
handle that has only limited valid usage outside of Vulkan and other
compatible APIs.
It **must** be compatible with the functions `DuplicateHandle`,
`CloseHandle`, `CompareObjectHandles`, `GetHandleInformation`,
and `SetHandleInformation`.
It owns a reference to the underlying synchronization primitive
represented by its Vulkan semaphore object.

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](#) specifies a
global share handle that has only limited valid usage outside of Vulkan
and other compatible APIs.
It is not compatible with any native APIs.
It does not own a reference to the underlying synchronization primitive
represented by its Vulkan semaphore object, and will therefore become
invalid when all Vulkan semaphore objects associated with it are
destroyed.

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](#) specifies an NT
handle returned by `ID3D12Device`::`CreateSharedHandle` referring
to a Direct3D 12 fence, or `ID3D11Device5`::`CreateFence`
referring to a Direct3D 11 fence.
It owns a reference to the underlying synchronization primitive
associated with the Direct3D fence.

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D11_FENCE_BIT](#) is an alias of
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](#) with the same
meaning.
It is provided for convenience and code clarity when interacting with
D3D11 fences.

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT](#) specifies a POSIX
file descriptor handle to a Linux Sync File or Android Fence object.
It can be used with any native API accepting a valid sync file or fence
as input.
It owns a reference to the underlying synchronization primitive
associated with the file descriptor.
Implementations which support importing this handle type **must** accept
any type of sync or fence FD supported by the native system they are
running on.

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_ZIRCON_EVENT_BIT_FUCHSIA](#)
specifies a handle to a Zircon event object.
It can be used with any native API that accepts a Zircon event handle.
Zircon event handles are created with `ZX_RIGHTS_BASIC` and
`ZX_RIGHTS_SIGNAL` rights.
Vulkan on Fuchsia uses only the ZX_EVENT_SIGNALED bit when signaling or
waiting.

|  | Handles of type [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT](#)
| --- | --- |
generated by the implementation may represent either Linux Sync Files or
Android Fences at the implementation’s discretion.
Applications **should** only use operations defined for both types of file
descriptors, unless they know via means external to Vulkan the type of the
file descriptor, or are prepared to deal with the system-defined operation
failures resulting from using the wrong type. |

Some external semaphore handle types can only be shared within the same
underlying physical device and/or the same driver version, as defined in the
following table:

| Handle type | `VkPhysicalDeviceIDProperties`::`driverUUID` | `VkPhysicalDeviceIDProperties`::`deviceUUID` |
| --- | --- | --- |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT](#) | No restriction | No restriction |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_ZIRCON_EVENT_BIT_FUCHSIA](#) | No restriction | No restriction |

[VK_KHR_external_semaphore_capabilities](VK_KHR_external_semaphore_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalSemaphoreHandleTypeFlags](VkExternalSemaphoreHandleTypeFlags.html), [VkImportSemaphoreFdInfoKHR](VkImportSemaphoreFdInfoKHR.html), [VkImportSemaphoreWin32HandleInfoKHR](VkImportSemaphoreWin32HandleInfoKHR.html), [VkImportSemaphoreZirconHandleInfoFUCHSIA](VkImportSemaphoreZirconHandleInfoFUCHSIA.html), [VkPhysicalDeviceExternalSemaphoreInfo](VkPhysicalDeviceExternalSemaphoreInfo.html), [VkSemaphoreGetFdInfoKHR](VkSemaphoreGetFdInfoKHR.html), [VkSemaphoreGetWin32HandleInfoKHR](VkSemaphoreGetWin32HandleInfoKHR.html), [VkSemaphoreGetZirconHandleInfoFUCHSIA](VkSemaphoreGetZirconHandleInfoFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalSemaphoreHandleTypeFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
