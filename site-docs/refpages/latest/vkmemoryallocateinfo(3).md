# VkMemoryAllocateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryAllocateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryAllocateInfo - Structure containing parameters of a memory allocation

The `VkMemoryAllocateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkMemoryAllocateInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceSize       allocationSize;
    uint32_t           memoryTypeIndex;
} VkMemoryAllocateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`allocationSize` is the size of the allocation in bytes.

* 
`memoryTypeIndex` is an index identifying a memory type from the
`memoryTypes` array of the [VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html)
structure.

The internal data of an allocated device memory object **must** include a
reference to implementation-specific resources, referred to as the memory
object’s *payload*.
Applications **can** also import and export that internal data to and from
device memory objects to share data between Vulkan instances and other
compatible APIs.
A `VkMemoryAllocateInfo` structure defines a memory import operation if
its `pNext` chain includes one of the following structures:

* 
[VkImportMemoryWin32HandleInfoKHR](VkImportMemoryWin32HandleInfoKHR.html) with a non-zero `handleType`
value

* 
[VkImportMemoryFdInfoKHR](VkImportMemoryFdInfoKHR.html) with a non-zero `handleType` value

* 
[VkImportMemoryHostPointerInfoEXT](VkImportMemoryHostPointerInfoEXT.html) with a non-zero `handleType`
value

* 
[VkImportAndroidHardwareBufferInfoANDROID](VkImportAndroidHardwareBufferInfoANDROID.html) with a non-`NULL`
`buffer` value

* 
[VkImportMemoryZirconHandleInfoFUCHSIA](VkImportMemoryZirconHandleInfoFUCHSIA.html) with a non-zero
`handleType` value

* 
[VkImportMemoryBufferCollectionFUCHSIA](VkImportMemoryBufferCollectionFUCHSIA.html)

* 
[VkImportScreenBufferInfoQNX](VkImportScreenBufferInfoQNX.html) with a non-`NULL` `buffer` value

* 
[VkImportMemoryMetalHandleInfoEXT](VkImportMemoryMetalHandleInfoEXT.html) with a non-zero `handleType`
value

If the parameters define an import operation and the external handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](VkExternalMemoryHandleTypeFlagBits.html),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](VkExternalMemoryHandleTypeFlagBits.html), or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](VkExternalMemoryHandleTypeFlagBits.html),
`allocationSize` is ignored.
The implementation **must** query the size of these allocations from the OS.

If the parameters define an import operation and the external handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html),
`allocationSize` is ignored.
The implementation **must** query the size of these allocations from the OS.

Whether device memory objects constructed via a memory import operation hold
a reference to their payload depends on the properties of the handle type
used to perform the import, as defined below for each valid handle type.
Importing memory **must** not modify the content of the memory.
Implementations **must** ensure that importing memory does not enable the
importing Vulkan instance to access any memory or resources in other Vulkan
instances other than that corresponding to the memory object imported.
Implementations **must** also ensure accessing imported memory which has not
been initialized does not allow the importing Vulkan instance to obtain data
from the exporting Vulkan instance or vice-versa.

|  | How exported and imported memory is isolated is left to the implementation,
| --- | --- |
but applications should be aware that such isolation **may** prevent
implementations from placing multiple exportable memory objects in the same
physical or virtual page.
Hence, applications **should** avoid creating many small external memory
objects whenever possible. |

Importing memory **must** not increase overall heap usage within a system.
However, it **must** affect the following per-process values:

* 
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxMemoryAllocationCount`

* 
[VkPhysicalDeviceMemoryBudgetPropertiesEXT](VkPhysicalDeviceMemoryBudgetPropertiesEXT.html)::`heapUsage`

When performing a memory import operation, it is the responsibility of the
application to ensure the external handles and their associated payloads
meet all valid usage requirements.
However, implementations **must** perform sufficient validation of external
handles and payloads to ensure that the operation results in a valid memory
object which will not cause program termination, device loss, queue stalls,
or corruption of other resources when used as allowed according to its
allocation parameters.
If the external handle provided does not meet these requirements, the
implementation **must** fail the memory import operation with the error code
[VK_ERROR_INVALID_EXTERNAL_HANDLE](VkResult.html).
If the parameters define an export operation and the external handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html),
implementations **should** not strictly follow `memoryTypeIndex`.
Instead, they **should** modify the allocation internally to use the required
memory type for the application’s given usage.
This is because for an export operation, there is currently no way for the
application to know the memory type index before allocating.

Valid Usage

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-07897) VUID-VkMemoryAllocateInfo-allocationSize-07897

If the parameters do not define an [import or    export operation](../../../../spec/latest/chapters/memory.html#memory-import-operation),
`allocationSize` **must** be greater than `0`

* 
[](#VUID-VkMemoryAllocateInfo-None-06657) VUID-VkMemoryAllocateInfo-None-06657

The parameters **must** not define more than one
[import operation](../../../../spec/latest/chapters/memory.html#memory-import-operation)

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-07899) VUID-VkMemoryAllocateInfo-allocationSize-07899

If the parameters define an export operation
and the handle type is not
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)
, `allocationSize` **must** be greater than `0`

* 
[](#VUID-VkMemoryAllocateInfo-buffer-06380) VUID-VkMemoryAllocateInfo-buffer-06380

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), and
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`buffer` is present and
non-NULL, [VkImportMemoryBufferCollectionFUCHSIA](VkImportMemoryBufferCollectionFUCHSIA.html)::`collection`
and [VkImportMemoryBufferCollectionFUCHSIA](VkImportMemoryBufferCollectionFUCHSIA.html)::`index` **must** match
[VkBufferCollectionBufferCreateInfoFUCHSIA](VkBufferCollectionBufferCreateInfoFUCHSIA.html)::`collection` and
[VkBufferCollectionBufferCreateInfoFUCHSIA](VkBufferCollectionBufferCreateInfoFUCHSIA.html)::`index`,
respectively, of the [VkBufferCollectionBufferCreateInfoFUCHSIA](VkBufferCollectionBufferCreateInfoFUCHSIA.html)
structure used to create the
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`buffer`

* 
[](#VUID-VkMemoryAllocateInfo-image-06381) VUID-VkMemoryAllocateInfo-image-06381

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), and
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image` is present and
non-NULL, [VkImportMemoryBufferCollectionFUCHSIA](VkImportMemoryBufferCollectionFUCHSIA.html)::`collection`
and [VkImportMemoryBufferCollectionFUCHSIA](VkImportMemoryBufferCollectionFUCHSIA.html)::`index` **must** match
[VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html)::`collection` and
[VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html)::`index`,
respectively, of the [VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html)
structure used to create the
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image`

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-06382) VUID-VkMemoryAllocateInfo-allocationSize-06382

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), `allocationSize` **must** match
[VkMemoryRequirements](VkMemoryRequirements.html)::`size` value retrieved by
[vkGetImageMemoryRequirements](vkGetImageMemoryRequirements.html) or
[vkGetBufferMemoryRequirements](vkGetBufferMemoryRequirements.html) for image-based or buffer-based
collections respectively

* 
[](#VUID-VkMemoryAllocateInfo-pNext-06383) VUID-VkMemoryAllocateInfo-pNext-06383

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), the `pNext` chain **must** include a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure with either its
`image` or `buffer` field set to a value other than
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkMemoryAllocateInfo-image-06384) VUID-VkMemoryAllocateInfo-image-06384

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) and
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the `image` **must** be created with a
[VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html) structure chained to its
[VkImageCreateInfo](VkImageCreateInfo.html)::`pNext` pointer

* 
[](#VUID-VkMemoryAllocateInfo-buffer-06385) VUID-VkMemoryAllocateInfo-buffer-06385

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) and
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`buffer` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the `buffer` **must** be created with a
[VkBufferCollectionBufferCreateInfoFUCHSIA](VkBufferCollectionBufferCreateInfoFUCHSIA.html) structure chained to its
[VkBufferCreateInfo](VkBufferCreateInfo.html)::`pNext` pointer

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-06386) VUID-VkMemoryAllocateInfo-memoryTypeIndex-06386

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), `memoryTypeIndex` **must** be from
[VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html) as retrieved by
[vkGetBufferCollectionPropertiesFUCHSIA](vkGetBufferCollectionPropertiesFUCHSIA.html)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-00639) VUID-VkMemoryAllocateInfo-pNext-00639

If the `pNext` chain includes a `VkExportMemoryAllocateInfo`
structure, and any of the handle types specified in
`VkExportMemoryAllocateInfo`::`handleTypes` require a dedicated
allocation, as reported by
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) in
`VkExternalImageFormatProperties`::`externalMemoryProperties.externalMemoryFeatures`,
or by [vkGetPhysicalDeviceExternalBufferProperties](vkGetPhysicalDeviceExternalBufferProperties.html) in
`VkExternalBufferProperties`::`externalMemoryProperties.externalMemoryFeatures`,
the `pNext` chain **must** include a
`VkMemoryDedicatedAllocateInfo` or
`VkDedicatedAllocationMemoryAllocateInfoNV` structure with either
its `image` or `buffer` member set to a value other than
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-09858) VUID-VkMemoryAllocateInfo-pNext-09858

If the `pNext` chain includes a `VkExportMemoryAllocateInfo`
structure, and any of the handle types specified in
`VkExportMemoryAllocateInfo`::`handleTypes` require a dedicated
allocation, as reported by
[vkGetPhysicalDeviceExternalTensorPropertiesARM](vkGetPhysicalDeviceExternalTensorPropertiesARM.html) in
`VkExternalTensorPropertiesARM`::`externalMemoryProperties.externalMemoryFeatures`,
the `pNext` chain **must** include a
`VkMemoryDedicatedAllocateInfoTensorARM` structure with its
`tensor` member set to a value other than [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-00640) VUID-VkMemoryAllocateInfo-pNext-00640

If the `pNext` chain includes a [VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)
structure, it **must** not include a [VkExportMemoryAllocateInfoNV](VkExportMemoryAllocateInfoNV.html) or
[VkExportMemoryWin32HandleInfoNV](VkExportMemoryWin32HandleInfoNV.html) structure

* 
[](#VUID-VkMemoryAllocateInfo-pNext-00641) VUID-VkMemoryAllocateInfo-pNext-00641

If the `pNext` chain includes a
[VkImportMemoryWin32HandleInfoKHR](VkImportMemoryWin32HandleInfoKHR.html) structure, it **must** not include a
[VkImportMemoryWin32HandleInfoNV](VkImportMemoryWin32HandleInfoNV.html) structure

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-01742) VUID-VkMemoryAllocateInfo-allocationSize-01742

If the parameters define an import operation, the external handle
specified was created by the Vulkan API, and the external handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](VkExternalMemoryHandleTypeFlagBits.html), then the values of
`allocationSize` and `memoryTypeIndex` **must** match those
specified when the payload being imported was created

* 
[](#VUID-VkMemoryAllocateInfo-None-00643) VUID-VkMemoryAllocateInfo-None-00643

If the parameters define an import operation and the external handle
specified was created by the Vulkan API, the device mask specified by
[VkMemoryAllocateFlagsInfo](VkMemoryAllocateFlagsInfo.html) **must** match the mask specified when the
payload being imported was allocated

* 
[](#VUID-VkMemoryAllocateInfo-None-00644) VUID-VkMemoryAllocateInfo-None-00644

If the parameters define an import operation and the external handle
specified was created by the Vulkan API, the list of physical devices
that comprise the logical device passed to [vkAllocateMemory](vkAllocateMemory.html) **must**
match the list of physical devices that comprise the logical device on
which the payload was originally allocated

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-00645) VUID-VkMemoryAllocateInfo-memoryTypeIndex-00645

If the parameters define an import operation and the external handle is
an NT handle or a global share handle created outside of the Vulkan API,
the value of `memoryTypeIndex` **must** be one of those returned by
[vkGetMemoryWin32HandlePropertiesKHR](vkGetMemoryWin32HandlePropertiesKHR.html)

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-01743) VUID-VkMemoryAllocateInfo-allocationSize-01743

If the parameters define an import operation, the external handle was
created by the Vulkan API, and the external handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](VkExternalMemoryHandleTypeFlagBits.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](VkExternalMemoryHandleTypeFlagBits.html), then the
values of `allocationSize` and `memoryTypeIndex` **must** match
those specified when the payload being imported was created

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-00647) VUID-VkMemoryAllocateInfo-allocationSize-00647

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT](VkExternalMemoryHandleTypeFlagBits.html),
`allocationSize` **must** match the size specified when creating the
Direct3D 12 heap from which the payload was extracted

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-00648) VUID-VkMemoryAllocateInfo-memoryTypeIndex-00648

If the parameters define an import operation and the external handle is
a POSIX file descriptor created outside of the Vulkan API, the value of
`memoryTypeIndex` **must** be one of those returned by
[vkGetMemoryFdPropertiesKHR](vkGetMemoryFdPropertiesKHR.html)

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-01872) VUID-VkMemoryAllocateInfo-memoryTypeIndex-01872

If the [`protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory) feature is
not enabled, the `VkMemoryAllocateInfo`::`memoryTypeIndex` **must**
not indicate a memory type that reports
[VK_MEMORY_PROPERTY_PROTECTED_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-01744) VUID-VkMemoryAllocateInfo-memoryTypeIndex-01744

If the parameters define an import operation and the external handle is
a host pointer, the value of `memoryTypeIndex` **must** be one of those
returned by [vkGetMemoryHostPointerPropertiesEXT](vkGetMemoryHostPointerPropertiesEXT.html)

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-01745) VUID-VkMemoryAllocateInfo-allocationSize-01745

If the parameters define an import operation and the external handle is
a host pointer, `allocationSize` **must** be an integer multiple of
`VkPhysicalDeviceExternalMemoryHostPropertiesEXT`::`minImportedHostPointerAlignment`

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02805) VUID-VkMemoryAllocateInfo-pNext-02805

If the parameters define an import operation and the external handle is
a host pointer, the `pNext` chain **must** not include a
[VkDedicatedAllocationMemoryAllocateInfoNV](VkDedicatedAllocationMemoryAllocateInfoNV.html) structure with either
its `image` or `buffer` field set to a value other than
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02806) VUID-VkMemoryAllocateInfo-pNext-02806

If the parameters define an import operation and the external handle is
a host pointer, the `pNext` chain **must** not include a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure with either its
`image` or `buffer` field set to a value other than
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-02383) VUID-VkMemoryAllocateInfo-allocationSize-02383

If the parameters define an import operation and the external handle
type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html),
`allocationSize` **must** be the size returned by
[vkGetAndroidHardwareBufferPropertiesANDROID](vkGetAndroidHardwareBufferPropertiesANDROID.html) for the Android
hardware buffer

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02384) VUID-VkMemoryAllocateInfo-pNext-02384

If the parameters define an import operation and the external handle
type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html),
and the `pNext` chain does not include a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure or
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the Android hardware buffer **must** have a
`AHardwareBuffer_Desc`::`format` of
`AHARDWAREBUFFER_FORMAT_BLOB` and a
`AHardwareBuffer_Desc`::`usage` that includes
`AHARDWAREBUFFER_USAGE_GPU_DATA_BUFFER`

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-02385) VUID-VkMemoryAllocateInfo-memoryTypeIndex-02385

If the parameters define an import operation and the external handle
type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html),
`memoryTypeIndex` **must** be one of those returned by
[vkGetAndroidHardwareBufferPropertiesANDROID](vkGetAndroidHardwareBufferPropertiesANDROID.html) for the Android
hardware buffer

* 
[](#VUID-VkMemoryAllocateInfo-pNext-01874) VUID-VkMemoryAllocateInfo-pNext-01874

If the parameters do not define an import operation, and the `pNext`
chain includes a `VkExportMemoryAllocateInfo` structure with
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)
included in its `handleTypes` member, and the `pNext` chain
includes a [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure with
`image` not equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then `allocationSize`
**must** be `0`

* 
[](#VUID-VkMemoryAllocateInfo-pNext-07900) VUID-VkMemoryAllocateInfo-pNext-07900

If the parameters define an export operation, the handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html),
and the `pNext` does not include a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure, `allocationSize`
**must** be greater than `0`

* 
[](#VUID-VkMemoryAllocateInfo-pNext-07901) VUID-VkMemoryAllocateInfo-pNext-07901

If the parameters define an export operation, the handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html),
and the `pNext` chain includes a [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)
structure with `buffer` set to a valid [VkBuffer](VkBuffer.html) object,
`allocationSize` **must** be greater than `0`

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02386) VUID-VkMemoryAllocateInfo-pNext-02386

If the parameters define an import operation, the external handle is an
Android hardware buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) with `image` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the Android hardware buffer’s
`AHardwareBuffer`::`usage` **must** include at least one of
`AHARDWAREBUFFER_USAGE_GPU_FRAMEBUFFER`,
`AHARDWAREBUFFER_USAGE_GPU_SAMPLED_IMAGE` or
`AHARDWAREBUFFER_USAGE_GPU_DATA_BUFFER`

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02387) VUID-VkMemoryAllocateInfo-pNext-02387

If the parameters define an import operation, the external handle is an
Android hardware buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) with `image` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the format of `image` **must** be
[VK_FORMAT_UNDEFINED](VkFormat.html) or the format returned by
[vkGetAndroidHardwareBufferPropertiesANDROID](vkGetAndroidHardwareBufferPropertiesANDROID.html) in
[VkAndroidHardwareBufferFormatPropertiesANDROID](VkAndroidHardwareBufferFormatPropertiesANDROID.html)::`format` for
the Android hardware buffer

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02388) VUID-VkMemoryAllocateInfo-pNext-02388

If the parameters define an import operation, the external handle is an
Android hardware buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure with `image` that is
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the width, height, and array layer dimensions
of `image` and the Android hardware buffer’s
`AHardwareBuffer_Desc` **must** be identical

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02389) VUID-VkMemoryAllocateInfo-pNext-02389

If the parameters define an import operation, the external handle is an
Android hardware buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure with `image` that is
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the Android hardware buffer’s
`AHardwareBuffer`::`usage` includes
`AHARDWAREBUFFER_USAGE_GPU_MIPMAP_COMPLETE`, the `image` **must**
have a complete mipmap chain

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02586) VUID-VkMemoryAllocateInfo-pNext-02586

If the parameters define an import operation, the external handle is an
Android hardware buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure with `image` that is
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the Android hardware buffer’s
`AHardwareBuffer`::`usage` does not include
`AHARDWAREBUFFER_USAGE_GPU_MIPMAP_COMPLETE`, the `image` **must**
have exactly one mipmap level

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02390) VUID-VkMemoryAllocateInfo-pNext-02390

If the parameters define an import operation, the external handle is an
Android hardware buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure with `image` that is
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), each bit set in the usage of `image` **must**
be listed in
[AHardwareBuffer Usage    Equivalence](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer-usage), and if there is a corresponding
`AHARDWAREBUFFER_USAGE` bit listed that bit **must** be included in the
Android hardware buffer’s `AHardwareBuffer_Desc`::`usage`

* 
[](#VUID-VkMemoryAllocateInfo-screenBufferImport-08941) VUID-VkMemoryAllocateInfo-screenBufferImport-08941

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](VkExternalMemoryHandleTypeFlagBits.html),
[VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX](VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX.html)::`screenBufferImport`
**must** be enabled

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-08942) VUID-VkMemoryAllocateInfo-allocationSize-08942

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](VkExternalMemoryHandleTypeFlagBits.html),
`allocationSize` **must** be the size returned by
[vkGetScreenBufferPropertiesQNX](vkGetScreenBufferPropertiesQNX.html) for the QNX Screen buffer

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-08943) VUID-VkMemoryAllocateInfo-memoryTypeIndex-08943

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](VkExternalMemoryHandleTypeFlagBits.html),
`memoryTypeIndex` **must** be one of those returned by
[vkGetScreenBufferPropertiesQNX](vkGetScreenBufferPropertiesQNX.html) for the QNX Screen buffer

* 
[](#VUID-VkMemoryAllocateInfo-pNext-08944) VUID-VkMemoryAllocateInfo-pNext-08944

If the parameters define an import operation, the external handle is a
QNX Screen buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) with `image` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the QNX Screen’s buffer **must** be a
[valid QNX Screen buffer](../../../../spec/latest/chapters/memory.html#memory-external-screen-buffer-validity)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-08945) VUID-VkMemoryAllocateInfo-pNext-08945

If the parameters define an import operation, the external handle is an
QNX Screen buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) with `image` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the format of `image` **must** be
[VK_FORMAT_UNDEFINED](VkFormat.html) or the format returned by
[vkGetScreenBufferPropertiesQNX](vkGetScreenBufferPropertiesQNX.html) in
[VkScreenBufferFormatPropertiesQNX](VkScreenBufferFormatPropertiesQNX.html)::`format` for the QNX Screen
buffer

* 
[](#VUID-VkMemoryAllocateInfo-pNext-08946) VUID-VkMemoryAllocateInfo-pNext-08946

If the parameters define an import operation, the external handle is a
QNX Screen buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure with `image` that is
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the width, height, and array layer dimensions
of `image` and the QNX Screen buffer’s `_screen_buffer` **must** be
identical

* 
[](#VUID-VkMemoryAllocateInfo-pNext-10395) VUID-VkMemoryAllocateInfo-pNext-10395

If the parameters define an import operation and the external handle is
a [VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html), then
`pNext` **must** include a [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) with
`image` that is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-10396) VUID-VkMemoryAllocateInfo-pNext-10396

If the parameters define an import operation, the external handle is a
Metal MTLTexture, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure with `image` that is
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the width, height, array layer dimensions, and
mipmap levels of `image` and the Metal MTLTexture’s **must** be
identical

* 
[](#VUID-VkMemoryAllocateInfo-pNext-10397) VUID-VkMemoryAllocateInfo-pNext-10397

If the parameters define an import operation, the external handle is a
Metal MTLTexture, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure with `image` that is
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `allocationSize` **must** be `0`

* 
[](#VUID-VkMemoryAllocateInfo-opaqueCaptureAddress-03329) VUID-VkMemoryAllocateInfo-opaqueCaptureAddress-03329

If
[VkMemoryOpaqueCaptureAddressAllocateInfo](VkMemoryOpaqueCaptureAddressAllocateInfo.html)::`opaqueCaptureAddress`
is not zero, `VkMemoryAllocateFlagsInfo`::`flags` **must** include
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkMemoryAllocateFlagBits.html)

* 
[](#VUID-VkMemoryAllocateInfo-flags-03330) VUID-VkMemoryAllocateInfo-flags-03330

If `VkMemoryAllocateFlagsInfo`::`flags` includes
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkMemoryAllocateFlagBits.html), the
[    `bufferDeviceAddressCaptureReplay`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressCaptureReplay) feature **must** be enabled

* 
[](#VUID-VkMemoryAllocateInfo-flags-03331) VUID-VkMemoryAllocateInfo-flags-03331

If `VkMemoryAllocateFlagsInfo`::`flags` includes
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](VkMemoryAllocateFlagBits.html), the
[`bufferDeviceAddress`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddress) feature
**must** be enabled

* 
[](#VUID-VkMemoryAllocateInfo-pNext-03332) VUID-VkMemoryAllocateInfo-pNext-03332

If the `pNext` chain includes a
`VkImportMemoryHostPointerInfoEXT` structure,
[VkMemoryOpaqueCaptureAddressAllocateInfo](VkMemoryOpaqueCaptureAddressAllocateInfo.html)::`opaqueCaptureAddress`
**must** be zero

* 
[](#VUID-VkMemoryAllocateInfo-opaqueCaptureAddress-03333) VUID-VkMemoryAllocateInfo-opaqueCaptureAddress-03333

If the parameters define an import operation,
[VkMemoryOpaqueCaptureAddressAllocateInfo](VkMemoryOpaqueCaptureAddressAllocateInfo.html)::`opaqueCaptureAddress`
**must** be zero

* 
[](#VUID-VkMemoryAllocateInfo-None-04749) VUID-VkMemoryAllocateInfo-None-04749

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](VkExternalMemoryHandleTypeFlagBits.html), the
value of `memoryTypeIndex` **must** be an index identifying a memory
type from the `memoryTypeBits` field of the
[VkMemoryZirconHandlePropertiesFUCHSIA](VkMemoryZirconHandlePropertiesFUCHSIA.html) structure populated by a
call to [vkGetMemoryZirconHandlePropertiesFUCHSIA](vkGetMemoryZirconHandlePropertiesFUCHSIA.html)

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-07902) VUID-VkMemoryAllocateInfo-allocationSize-07902

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](VkExternalMemoryHandleTypeFlagBits.html), the
value of `allocationSize` **must** be greater than `0`

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-07903) VUID-VkMemoryAllocateInfo-allocationSize-07903

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](VkExternalMemoryHandleTypeFlagBits.html), the
value of `allocationSize` **must** be less than or equal to the size of
the VMO as determined by `zx_vmo_get_size`(`handle`) where
`handle` is the VMO handle to the imported external memory

* 
[](#VUID-VkMemoryAllocateInfo-pNext-06780) VUID-VkMemoryAllocateInfo-pNext-06780

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure, its
`exportObjectType` member **must** be
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_BUFFER_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html)

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryAllocateInfo-sType-sType) VUID-VkMemoryAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_INFO](VkStructureType.html)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-pNext) VUID-VkMemoryAllocateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDedicatedAllocationMemoryAllocateInfoNV](VkDedicatedAllocationMemoryAllocateInfoNV.html), [VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html), [VkExportMemoryAllocateInfoNV](VkExportMemoryAllocateInfoNV.html), [VkExportMemoryWin32HandleInfoKHR](VkExportMemoryWin32HandleInfoKHR.html), [VkExportMemoryWin32HandleInfoNV](VkExportMemoryWin32HandleInfoNV.html), [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html), [VkImportAndroidHardwareBufferInfoANDROID](VkImportAndroidHardwareBufferInfoANDROID.html), [VkImportMemoryBufferCollectionFUCHSIA](VkImportMemoryBufferCollectionFUCHSIA.html), [VkImportMemoryFdInfoKHR](VkImportMemoryFdInfoKHR.html), [VkImportMemoryHostPointerInfoEXT](VkImportMemoryHostPointerInfoEXT.html), [VkImportMemoryMetalHandleInfoEXT](VkImportMemoryMetalHandleInfoEXT.html), [VkImportMemoryWin32HandleInfoKHR](VkImportMemoryWin32HandleInfoKHR.html), [VkImportMemoryWin32HandleInfoNV](VkImportMemoryWin32HandleInfoNV.html), [VkImportMemoryZirconHandleInfoFUCHSIA](VkImportMemoryZirconHandleInfoFUCHSIA.html), [VkImportMetalBufferInfoEXT](VkImportMetalBufferInfoEXT.html), [VkImportNativeBufferInfoOHOS](VkImportNativeBufferInfoOHOS.html), [VkImportScreenBufferInfoQNX](VkImportScreenBufferInfoQNX.html), [VkMemoryAllocateFlagsInfo](VkMemoryAllocateFlagsInfo.html), [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html), [VkMemoryDedicatedAllocateInfoTensorARM](VkMemoryDedicatedAllocateInfoTensorARM.html), [VkMemoryOpaqueCaptureAddressAllocateInfo](VkMemoryOpaqueCaptureAddressAllocateInfo.html), or [VkMemoryPriorityAllocateInfoEXT](VkMemoryPriorityAllocateInfoEXT.html)

* 
[](#VUID-VkMemoryAllocateInfo-sType-unique) VUID-VkMemoryAllocateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkAllocateMemory](vkAllocateMemory.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryAllocateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
