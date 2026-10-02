# VkFenceGetFdInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFenceGetFdInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFenceGetFdInfoKHR - Structure describing a POSIX FD fence export operation

The `VkFenceGetFdInfoKHR` structure is defined as:

// Provided by VK_KHR_external_fence_fd
typedef struct VkFenceGetFdInfoKHR {
    VkStructureType                      sType;
    const void*                          pNext;
    VkFence                              fence;
    VkExternalFenceHandleTypeFlagBits    handleType;
} VkFenceGetFdInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fence` is the fence from which state will be exported.

* 
`handleType` is a [VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html) value
specifying the type of handle requested.

The properties of the file descriptor returned depend on the value of
`handleType`.
See [VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html) for a description of the
properties of the defined external fence handle types.

Valid Usage

* 
[](#VUID-VkFenceGetFdInfoKHR-handleType-01453) VUID-VkFenceGetFdInfoKHR-handleType-01453

`handleType` **must** have been included in
[VkExportFenceCreateInfo](VkExportFenceCreateInfo.html)::`handleTypes` when `fence`’s
current payload was created

* 
[](#VUID-VkFenceGetFdInfoKHR-handleType-01454) VUID-VkFenceGetFdInfoKHR-handleType-01454

If `handleType` refers to a handle type with copy payload
transference semantics, `fence` **must** be signaled, or have an
associated [fence signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-fences-signaling)
pending execution

* 
[](#VUID-VkFenceGetFdInfoKHR-fence-01455) VUID-VkFenceGetFdInfoKHR-fence-01455

`fence` **must** not currently have its payload replaced by an imported
payload as described below in
[Importing Fence Payloads](../../../../spec/latest/chapters/synchronization.html#synchronization-fences-importing) unless
that imported payload’s handle type was included in
[VkExternalFenceProperties](VkExternalFenceProperties.html)::`exportFromImportedHandleTypes` for
`handleType`

* 
[](#VUID-VkFenceGetFdInfoKHR-handleType-01456) VUID-VkFenceGetFdInfoKHR-handleType-01456

`handleType` **must** be defined as a POSIX file descriptor handle

Valid Usage (Implicit)

* 
[](#VUID-VkFenceGetFdInfoKHR-sType-sType) VUID-VkFenceGetFdInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FENCE_GET_FD_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkFenceGetFdInfoKHR-pNext-pNext) VUID-VkFenceGetFdInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkFenceGetFdInfoKHR-fence-parameter) VUID-VkFenceGetFdInfoKHR-fence-parameter

 `fence` **must** be a valid [VkFence](VkFence.html) handle

* 
[](#VUID-VkFenceGetFdInfoKHR-handleType-parameter) VUID-VkFenceGetFdInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html) value

[VK_KHR_external_fence_fd](VK_KHR_external_fence_fd.html), [VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html), [VkFence](VkFence.html), [VkStructureType](VkStructureType.html), [vkGetFenceFdKHR](vkGetFenceFdKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkFenceGetFdInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
