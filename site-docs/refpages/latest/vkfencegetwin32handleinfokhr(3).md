# VkFenceGetWin32HandleInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFenceGetWin32HandleInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFenceGetWin32HandleInfoKHR - Structure describing a Win32 handle fence export operation

The `VkFenceGetWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_fence_win32
typedef struct VkFenceGetWin32HandleInfoKHR {
    VkStructureType                      sType;
    const void*                          pNext;
    VkFence                              fence;
    VkExternalFenceHandleTypeFlagBits    handleType;
} VkFenceGetWin32HandleInfoKHR;

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

The properties of the handle returned depend on the value of
`handleType`.
See [VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html) for a description of the
properties of the defined external fence handle types.

Valid Usage

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-handleType-01448) VUID-VkFenceGetWin32HandleInfoKHR-handleType-01448

`handleType` **must** have been included in
[VkExportFenceCreateInfo](VkExportFenceCreateInfo.html)::`handleTypes` when the `fence`’s
current payload was created

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-handleType-01449) VUID-VkFenceGetWin32HandleInfoKHR-handleType-01449

If `handleType` is defined as an NT handle,
[vkGetFenceWin32HandleKHR](vkGetFenceWin32HandleKHR.html) **must** be called no more than once for
each valid unique combination of `fence` and `handleType`

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-fence-01450) VUID-VkFenceGetWin32HandleInfoKHR-fence-01450

`fence` **must** not currently have its payload replaced by an imported
payload as described below in
[Importing Fence Payloads](../../../../spec/latest/chapters/synchronization.html#synchronization-fences-importing) unless
that imported payload’s handle type was included in
[VkExternalFenceProperties](VkExternalFenceProperties.html)::`exportFromImportedHandleTypes` for
`handleType`

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-handleType-01451) VUID-VkFenceGetWin32HandleInfoKHR-handleType-01451

If `handleType` refers to a handle type with copy payload
transference semantics, `fence` **must** be signaled, or have an
associated [fence signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-fences-signaling)
pending execution

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-handleType-01452) VUID-VkFenceGetWin32HandleInfoKHR-handleType-01452

`handleType` **must** be defined as an NT handle or a global share
handle

Valid Usage (Implicit)

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-sType-sType) VUID-VkFenceGetWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FENCE_GET_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-pNext-pNext) VUID-VkFenceGetWin32HandleInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-fence-parameter) VUID-VkFenceGetWin32HandleInfoKHR-fence-parameter

 `fence` **must** be a valid [VkFence](VkFence.html) handle

* 
[](#VUID-VkFenceGetWin32HandleInfoKHR-handleType-parameter) VUID-VkFenceGetWin32HandleInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html) value

[VK_KHR_external_fence_win32](VK_KHR_external_fence_win32.html), [VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html), [VkFence](VkFence.html), [VkStructureType](VkStructureType.html), [vkGetFenceWin32HandleKHR](vkGetFenceWin32HandleKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkFenceGetWin32HandleInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
