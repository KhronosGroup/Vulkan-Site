# VkExternalFenceHandleTypeFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalFenceHandleTypeFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalFenceHandleTypeFlagBits - Bitmask of valid external fence handle types

Bits which **may** be set in

* 
[VkPhysicalDeviceExternalFenceInfo](VkPhysicalDeviceExternalFenceInfo.html)::`handleType`

* 
[VkExternalFenceProperties](VkExternalFenceProperties.html)::`exportFromImportedHandleTypes`

* 
[VkExternalFenceProperties](VkExternalFenceProperties.html)::`compatibleHandleTypes`

indicate external fence handle types, and are:

// Provided by VK_VERSION_1_1
typedef enum VkExternalFenceHandleTypeFlagBits {
    VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_FD_BIT = 0x00000001,
    VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT = 0x00000002,
    VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT = 0x00000004,
    VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT = 0x00000008,
  // Provided by VK_KHR_external_fence_capabilities
    VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_FD_BIT_KHR = VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_FD_BIT,
  // Provided by VK_KHR_external_fence_capabilities
    VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT_KHR = VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT,
  // Provided by VK_KHR_external_fence_capabilities
    VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_KHR = VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT,
  // Provided by VK_KHR_external_fence_capabilities
    VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT_KHR = VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT,
} VkExternalFenceHandleTypeFlagBits;

// Provided by VK_KHR_external_fence_capabilities
// Equivalent to VkExternalFenceHandleTypeFlagBits
typedef VkExternalFenceHandleTypeFlagBits VkExternalFenceHandleTypeFlagBitsKHR;

* 
[VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_FD_BIT](#) specifies a POSIX file
descriptor handle that has only limited valid usage outside of Vulkan
and other compatible APIs.
It **must** be compatible with the POSIX system calls `dup`, `dup2`,
`close`, and the non-standard system call `dup3`.
Additionally, it **must** be transportable over a socket using an
`SCM_RIGHTS` control message.
It owns a reference to the underlying synchronization primitive
represented by its Vulkan fence object.

* 
[VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT](#) specifies an NT
handle that has only limited valid usage outside of Vulkan and other
compatible APIs.
It **must** be compatible with the functions `DuplicateHandle`,
`CloseHandle`, `CompareObjectHandles`, `GetHandleInformation`,
and `SetHandleInformation`.
It owns a reference to the underlying synchronization primitive
represented by its Vulkan fence object.

* 
[VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](#) specifies a
global share handle that has only limited valid usage outside of Vulkan
and other compatible APIs.
It is not compatible with any native APIs.
It does not own a reference to the underlying synchronization primitive
represented by its Vulkan fence object, and will therefore become
invalid when all Vulkan fence objects associated with it are destroyed.

* 
[VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](#) specifies a POSIX file
descriptor handle to a Linux Sync File or Android Fence.
It can be used with any native API accepting a valid sync file or fence
as input.
It owns a reference to the underlying synchronization primitive
associated with the file descriptor.
Implementations which support importing this handle type **must** accept
any type of sync or fence FD supported by the native system they are
running on.

Some external fence handle types can only be shared within the same
underlying physical device and/or the same driver version, as defined in the
following table:

| Handle type | `VkPhysicalDeviceIDProperties`::`driverUUID` | `VkPhysicalDeviceIDProperties`::`deviceUUID` |
| --- | --- | --- |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_FD_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](#) | No restriction | No restriction |

[VK_KHR_external_fence_capabilities](VK_KHR_external_fence_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalFenceHandleTypeFlags](VkExternalFenceHandleTypeFlags.html), [VkFenceGetFdInfoKHR](VkFenceGetFdInfoKHR.html), [VkFenceGetWin32HandleInfoKHR](VkFenceGetWin32HandleInfoKHR.html), [VkImportFenceFdInfoKHR](VkImportFenceFdInfoKHR.html), [VkImportFenceWin32HandleInfoKHR](VkImportFenceWin32HandleInfoKHR.html), [VkPhysicalDeviceExternalFenceInfo](VkPhysicalDeviceExternalFenceInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalFenceHandleTypeFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
