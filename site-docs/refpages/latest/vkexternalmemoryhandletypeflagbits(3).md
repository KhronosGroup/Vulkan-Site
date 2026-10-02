# VkExternalMemoryHandleTypeFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalMemoryHandleTypeFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalMemoryHandleTypeFlagBits - Bit specifying external memory handle types

Possible values of
[VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html)::`handleType`, specifying
an external memory handle type, are:

// Provided by VK_VERSION_1_1
typedef enum VkExternalMemoryHandleTypeFlagBits {
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT = 0x00000001,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT = 0x00000002,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT = 0x00000004,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT = 0x00000008,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT = 0x00000010,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT = 0x00000020,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT = 0x00000040,
  // Provided by VK_EXT_external_memory_dma_buf
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT = 0x00000200,
  // Provided by VK_ANDROID_external_memory_android_hardware_buffer
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID = 0x00000400,
  // Provided by VK_EXT_external_memory_host
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT = 0x00000080,
  // Provided by VK_EXT_external_memory_host
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT = 0x00000100,
  // Provided by VK_FUCHSIA_external_memory
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA = 0x00000800,
  // Provided by VK_NV_external_memory_rdma
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_RDMA_ADDRESS_BIT_NV = 0x00001000,
  // Provided by VK_OHOS_external_memory
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OH_NATIVE_BUFFER_BIT_OHOS = 0x00008000,
  // Provided by VK_QNX_external_memory_screen_buffer
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX = 0x00004000,
  // Provided by VK_EXT_external_memory_metal
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT = 0x00010000,
  // Provided by VK_EXT_external_memory_metal
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT = 0x00020000,
  // Provided by VK_EXT_external_memory_metal
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT = 0x00040000,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT,
} VkExternalMemoryHandleTypeFlagBits;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkExternalMemoryHandleTypeFlagBits
typedef VkExternalMemoryHandleTypeFlagBits VkExternalMemoryHandleTypeFlagBitsKHR;

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](#) specifies a POSIX
file descriptor handle that has only limited valid usage outside of
Vulkan and other compatible APIs.
It **must** be compatible with the POSIX system calls `dup`, `dup2`,
`close`, and the non-standard system call `dup3`.
Additionally, it **must** be transportable over a socket using an
`SCM_RIGHTS` control message.
It owns a reference to the underlying memory resource represented by its
Vulkan memory object.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](#) specifies an NT
handle that has only limited valid usage outside of Vulkan and other
compatible APIs.
It **must** be compatible with the functions `DuplicateHandle`,
`CloseHandle`, `CompareObjectHandles`, `GetHandleInformation`,
and `SetHandleInformation`.
It owns a reference to the underlying memory resource represented by its
Vulkan memory object.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](#) specifies a
global share handle that has only limited valid usage outside of Vulkan
and other compatible APIs.
It is not compatible with any native APIs.
It does not own a reference to the underlying memory resource
represented by its Vulkan memory object, and will therefore become
invalid when all Vulkan memory objects associated with it are destroyed.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](#) specifies an NT
handle returned by `IDXGIResource1`::`CreateSharedHandle`
referring to a Direct3D 10 or 11 texture resource.
It owns a reference to the memory used by the Direct3D resource.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](#) specifies a
global share handle returned by `IDXGIResource`::`GetSharedHandle`
referring to a Direct3D 10 or 11 texture resource.
It does not own a reference to the underlying Direct3D resource, and
will therefore become invalid when all Vulkan memory objects and
Direct3D resources associated with it are destroyed.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT](#) specifies an NT
handle returned by `ID3D12Device`::`CreateSharedHandle` referring
to a Direct3D 12 heap resource.
It owns a reference to the resources used by the Direct3D heap.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](#) specifies an NT
handle returned by `ID3D12Device`::`CreateSharedHandle` referring
to a Direct3D 12 committed resource.
It owns a reference to the memory used by the Direct3D resource.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](#) specifies a
host pointer returned by a host memory allocation command.
It does not own a reference to the underlying memory resource, and will
therefore become invalid if the host memory is freed.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](#)
specifies a host pointer to *host mapped foreign memory*.
It does not own a reference to the underlying memory resource, and will
therefore become invalid if the foreign memory is unmapped or otherwise
becomes no longer available.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](#) is a file
descriptor for a Linux dma_buf.
It owns a reference to the underlying memory resource represented by its
Vulkan memory object.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](#)
specifies an `AHardwareBuffer` object defined by the Android NDK.
See [Android Hardware Buffers](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer)
for more details of this handle type.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](#) is a Zircon
handle to a virtual memory object.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_RDMA_ADDRESS_BIT_NV](#) is a handle to
an allocation accessible by remote devices.
It owns a reference to the underlying memory resource represented by its
Vulkan memory object.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](#) specifies a
`_screen_buffer` object defined by the QNX SDP.
See [QNX Screen Buffer](../../../../spec/latest/chapters/memory.html#memory-external-qnx-screen-buffer) for more
details of this handle type.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT](#) is a handle to a
`MTLResource` holding a `MTLBuffer`.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](#) is a handle to a
`MTLResource` holding a `MTLTexture`.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT](#) is a handle to a
`MTLResource` holding a `MTLHeap`.

Some external memory handle types can only be shared within the same
underlying physical device and/or the same driver version, as defined in the
following table:

| Handle type | `VkPhysicalDeviceIDProperties`::`driverUUID` | `VkPhysicalDeviceIDProperties`::`deviceUUID` |
| --- | --- | --- |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](#) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](#) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](#) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](#) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](#) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](#) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_RDMA_ADDRESS_BIT_NV](#) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](#) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT](#) | No restriction | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](#) | No restriction | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT](#) | No restriction | Must match |

|  | The above table does not restrict the drivers and devices with which
| --- | --- |
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](#) and
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](#) **may**
be shared, as these handle types inherently mean memory that does not come
from the same device, as they import memory from the host or a foreign
device, respectively. |

|  | Even though the above table does not restrict the drivers and devices with
| --- | --- |
which [VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](#) **may** be shared,
query mechanisms exist in the Vulkan API that prevent the import of
incompatible dma-bufs (such as [vkGetMemoryFdPropertiesKHR](vkGetMemoryFdPropertiesKHR.html)) and that
prevent incompatible usage of dma-bufs (such as
[VkPhysicalDeviceExternalBufferInfo](VkPhysicalDeviceExternalBufferInfo.html) and
[VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html)). |

[VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalMemoryHandleTypeFlags](VkExternalMemoryHandleTypeFlags.html), [VkImportMemoryFdInfoKHR](VkImportMemoryFdInfoKHR.html), [VkImportMemoryHostPointerInfoEXT](VkImportMemoryHostPointerInfoEXT.html), [VkImportMemoryMetalHandleInfoEXT](VkImportMemoryMetalHandleInfoEXT.html), [VkImportMemoryWin32HandleInfoKHR](VkImportMemoryWin32HandleInfoKHR.html), [VkImportMemoryZirconHandleInfoFUCHSIA](VkImportMemoryZirconHandleInfoFUCHSIA.html), [VkMemoryGetFdInfoKHR](VkMemoryGetFdInfoKHR.html), [VkMemoryGetMetalHandleInfoEXT](VkMemoryGetMetalHandleInfoEXT.html), [VkMemoryGetRemoteAddressInfoNV](VkMemoryGetRemoteAddressInfoNV.html), [VkMemoryGetWin32HandleInfoKHR](VkMemoryGetWin32HandleInfoKHR.html), [VkMemoryGetZirconHandleInfoFUCHSIA](VkMemoryGetZirconHandleInfoFUCHSIA.html), [VkPhysicalDeviceExternalBufferInfo](VkPhysicalDeviceExternalBufferInfo.html), [VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html), [VkPhysicalDeviceExternalTensorInfoARM](VkPhysicalDeviceExternalTensorInfoARM.html), [vkGetMemoryFdPropertiesKHR](vkGetMemoryFdPropertiesKHR.html), [vkGetMemoryHostPointerPropertiesEXT](vkGetMemoryHostPointerPropertiesEXT.html), [vkGetMemoryMetalHandlePropertiesEXT](vkGetMemoryMetalHandlePropertiesEXT.html), [vkGetMemoryWin32HandlePropertiesKHR](vkGetMemoryWin32HandlePropertiesKHR.html), [vkGetMemoryZirconHandlePropertiesFUCHSIA](vkGetMemoryZirconHandlePropertiesFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkExternalMemoryHandleTypeFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
