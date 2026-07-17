# VkWin32KeyedMutexAcquireReleaseInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkWin32KeyedMutexAcquireReleaseInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkWin32KeyedMutexAcquireReleaseInfoNV - Use Windows keyex mutex mechanism to synchronize work

When submitting work that operates on memory imported from a Direct3D 11
resource to a queue, the keyed mutex mechanism **may** be used in addition to
Vulkan semaphores to synchronize the work.
Keyed mutexes are a property of a properly created shareable Direct3D 11
resource.
They **can** only be used if the imported resource was created with the
`D3D11_RESOURCE_MISC_SHARED_KEYEDMUTEX` flag.

To acquire keyed mutexes before submitted work and/or release them after,
add a [VkWin32KeyedMutexAcquireReleaseInfoNV](#) structure to the
`pNext` chain of the [VkSubmitInfo](VkSubmitInfo.html) structure.

The `VkWin32KeyedMutexAcquireReleaseInfoNV` structure is defined as:

// Provided by VK_NV_win32_keyed_mutex
typedef struct VkWin32KeyedMutexAcquireReleaseInfoNV {
    VkStructureType          sType;
    const void*              pNext;
    uint32_t                 acquireCount;
    const VkDeviceMemory*    pAcquireSyncs;
    const uint64_t*          pAcquireKeys;
    const uint32_t*          pAcquireTimeoutMilliseconds;
    uint32_t                 releaseCount;
    const VkDeviceMemory*    pReleaseSyncs;
    const uint64_t*          pReleaseKeys;
} VkWin32KeyedMutexAcquireReleaseInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`acquireCount` is the number of entries in the `pAcquireSyncs`,
`pAcquireKeys`, and `pAcquireTimeoutMilliseconds` arrays.

* 
`pAcquireSyncs` is a pointer to an array of [VkDeviceMemory](VkDeviceMemory.html)
objects which were imported from Direct3D 11 resources.

* 
`pAcquireKeys` is a pointer to an array of mutex key values to wait
for prior to beginning the submitted work.
Entries refer to the keyed mutex associated with the corresponding
entries in `pAcquireSyncs`.

* 
`pAcquireTimeoutMilliseconds` is a pointer to an array of timeout
values, in millisecond units, for each acquire specified in
`pAcquireKeys`.

* 
`releaseCount` is the number of entries in the `pReleaseSyncs`
and `pReleaseKeys` arrays.

* 
`pReleaseSyncs` is a pointer to an array of [VkDeviceMemory](VkDeviceMemory.html)
objects which were imported from Direct3D 11 resources.

* 
`pReleaseKeys` is a pointer to an array of mutex key values to set
when the submitted work has completed.
Entries refer to the keyed mutex associated with the corresponding
entries in `pReleaseSyncs`.

Valid Usage (Implicit)

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-sType-sType) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WIN32_KEYED_MUTEX_ACQUIRE_RELEASE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pAcquireSyncs-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pAcquireSyncs-parameter

 If `acquireCount` is not `0`, `pAcquireSyncs` **must** be a valid pointer to an array of `acquireCount` valid [VkDeviceMemory](VkDeviceMemory.html) handles

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pAcquireKeys-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pAcquireKeys-parameter

 If `acquireCount` is not `0`, `pAcquireKeys` **must** be a valid pointer to an array of `acquireCount` `uint64_t` values

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pAcquireTimeoutMilliseconds-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pAcquireTimeoutMilliseconds-parameter

 If `acquireCount` is not `0`, `pAcquireTimeoutMilliseconds` **must** be a valid pointer to an array of `acquireCount` `uint32_t` values

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pReleaseSyncs-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pReleaseSyncs-parameter

 If `releaseCount` is not `0`, `pReleaseSyncs` **must** be a valid pointer to an array of `releaseCount` valid [VkDeviceMemory](VkDeviceMemory.html) handles

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pReleaseKeys-parameter) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-pReleaseKeys-parameter

 If `releaseCount` is not `0`, `pReleaseKeys` **must** be a valid pointer to an array of `releaseCount` `uint64_t` values

* 
[](#VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-commonparent) VUID-VkWin32KeyedMutexAcquireReleaseInfoNV-commonparent

 Both of the elements of `pAcquireSyncs`, and the elements of `pReleaseSyncs` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](VkSubmitInfo.html)

* 
[VkSubmitInfo2](VkSubmitInfo2.html)

[VK_NV_win32_keyed_mutex](VK_NV_win32_keyed_mutex.html), [VkDeviceMemory](VkDeviceMemory.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkWin32KeyedMutexAcquireReleaseInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
