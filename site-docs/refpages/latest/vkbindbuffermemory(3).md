# vkBindBufferMemory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkBindBufferMemory.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkBindBufferMemory - Bind device memory to a buffer object

To attach memory to a buffer object, call:

// Provided by VK_VERSION_1_0
VkResult vkBindBufferMemory(
    VkDevice                                    device,
    VkBuffer                                    buffer,
    VkDeviceMemory                              memory,
    VkDeviceSize                                memoryOffset);

* 
`device` is the logical device that owns the buffer and memory.

* 
`buffer` is the buffer to be attached to memory.

* 
`memory` is a [VkDeviceMemory](VkDeviceMemory.html) object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the region of `memory`
which is to be bound to the buffer.
The number of bytes returned in the
`VkMemoryRequirements`::`size` member in `memory`, starting
from `memoryOffset` bytes, will be bound to the specified buffer.

`vkBindBufferMemory` is equivalent to passing the same parameters
through [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html) to [vkBindBufferMemory2](vkBindBufferMemory2.html).

Valid Usage

* 
[](#VUID-vkBindBufferMemory-buffer-07459) VUID-vkBindBufferMemory-buffer-07459

`buffer` **must** not have been bound to a memory object

* 
[](#VUID-vkBindBufferMemory-buffer-01030) VUID-vkBindBufferMemory-buffer-01030

`buffer` **must** not have been created with any sparse memory binding
flags

* 
[](#VUID-vkBindBufferMemory-memoryOffset-01031) VUID-vkBindBufferMemory-memoryOffset-01031

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-vkBindBufferMemory-memory-01035) VUID-vkBindBufferMemory-memory-01035

`memory` **must** have been allocated using one of the memory types
allowed in the `memoryTypeBits` member of the
`VkMemoryRequirements` structure returned from a call to
`vkGetBufferMemoryRequirements` with `buffer`

* 
[](#VUID-vkBindBufferMemory-None-10739) VUID-vkBindBufferMemory-None-10739

If `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set,
`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkMemoryRequirements` structure returned from a call
to `vkGetBufferMemoryRequirements` with `buffer`

* 
[](#VUID-vkBindBufferMemory-memory-10740) VUID-vkBindBufferMemory-memory-10740

If `memory` was allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set,
`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetBufferMemoryRequirements` with `buffer`

* 
[](#VUID-vkBindBufferMemory-None-10741) VUID-vkBindBufferMemory-None-10741

If `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set,
`size` member of the `VkMemoryRequirements` structure returned
from a call to `vkGetBufferMemoryRequirements` with `buffer`
**must** be less than or equal to the size of `memory` minus
`memoryOffset`

* 
[](#VUID-vkBindBufferMemory-memory-10742) VUID-vkBindBufferMemory-memory-10742

If `memory` was allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set, `size`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetBufferMemoryRequirements` with `buffer` **must** be
less than or equal to the size of `memory` minus `memoryOffset`

* 
[](#VUID-vkBindBufferMemory-buffer-01444) VUID-vkBindBufferMemory-buffer-01444

If `buffer` requires a dedicated allocation (as reported by
[vkGetBufferMemoryRequirements2](vkGetBufferMemoryRequirements2.html) in
[VkMemoryDedicatedRequirements](VkMemoryDedicatedRequirements.html)::`requiresDedicatedAllocation`
for `buffer`), `memory` **must** have been allocated with
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`buffer` equal to `buffer`

* 
[](#VUID-vkBindBufferMemory-memory-01508) VUID-vkBindBufferMemory-memory-01508

If the `VkMemoryAllocateInfo` provided when `memory` was
allocated included a [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure in
its `pNext` chain, and
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`buffer` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), then `buffer` **must** equal
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`buffer`, and
`memoryOffset` **must** be zero

* 
[](#VUID-vkBindBufferMemory-memory-10925) VUID-vkBindBufferMemory-memory-10925

If the `VkMemoryAllocateInfo` provided when `memory` was
allocated included a [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure in
its `pNext` chain, [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image`
**must** have been [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkBindBufferMemory-None-01898) VUID-vkBindBufferMemory-None-01898

If `buffer` was created with the
[VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html) bit set, the buffer **must** be bound
to a memory object allocated with a memory type that reports
[VK_MEMORY_PROPERTY_PROTECTED_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-vkBindBufferMemory-None-01899) VUID-vkBindBufferMemory-None-01899

If `buffer` was created with the
[VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html) bit not set, the buffer **must** not
be bound to a memory object allocated with a memory type that reports
[VK_MEMORY_PROPERTY_PROTECTED_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-vkBindBufferMemory-buffer-01038) VUID-vkBindBufferMemory-buffer-01038

If `buffer` was created with
[VkDedicatedAllocationBufferCreateInfoNV](VkDedicatedAllocationBufferCreateInfoNV.html)::`dedicatedAllocation`
equal to [VK_TRUE](VK_TRUE.html), `memory` **must** have been allocated with
[VkDedicatedAllocationMemoryAllocateInfoNV](VkDedicatedAllocationMemoryAllocateInfoNV.html)::`buffer` equal to a
buffer handle created with identical creation parameters to `buffer`
and `memoryOffset` **must** be zero

* 
[](#VUID-vkBindBufferMemory-apiVersion-07920) VUID-vkBindBufferMemory-apiVersion-07920

    If
    the [VK_KHR_dedicated_allocation](VK_KHR_dedicated_allocation.html) extension is not enabled,
    [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
    1.1,
and
    `buffer` was not created with
    [VkDedicatedAllocationBufferCreateInfoNV](VkDedicatedAllocationBufferCreateInfoNV.html)::`dedicatedAllocation`
    equal to [VK_TRUE](VK_TRUE.html), `memory` **must** not have been allocated
    dedicated for a specific buffer or image

* 
[](#VUID-vkBindBufferMemory-memory-02726) VUID-vkBindBufferMemory-memory-02726

If the value of [VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` used
to allocate `memory` is not `0`, it **must** include at least one of
the handles set in
[VkExternalMemoryBufferCreateInfo](VkExternalMemoryBufferCreateInfo.html)::`handleTypes` when
`buffer` was created

* 
[](#VUID-vkBindBufferMemory-memory-02985) VUID-vkBindBufferMemory-memory-02985

If `memory` was allocated by a memory import operation,
that is not [VkImportAndroidHardwareBufferInfoANDROID](VkImportAndroidHardwareBufferInfoANDROID.html) with a
non-`NULL` `buffer` value,
the external handle type of the imported memory **must** also have been set
in [VkExternalMemoryBufferCreateInfo](VkExternalMemoryBufferCreateInfo.html)::`handleTypes` when
`buffer` was created

* 
[](#VUID-vkBindBufferMemory-memory-02986) VUID-vkBindBufferMemory-memory-02986

If `memory` was allocated with the
[VkImportAndroidHardwareBufferInfoANDROID](VkImportAndroidHardwareBufferInfoANDROID.html) memory import operation
with a non-`NULL` `buffer` value,
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)
**must** also have been set in
[VkExternalMemoryBufferCreateInfo](VkExternalMemoryBufferCreateInfo.html)::`handleTypes` when
`buffer` was created

* 
[](#VUID-vkBindBufferMemory-bufferDeviceAddress-03339) VUID-vkBindBufferMemory-bufferDeviceAddress-03339

If the
[VkPhysicalDeviceBufferDeviceAddressFeatures](VkPhysicalDeviceBufferDeviceAddressFeatures.html)::`bufferDeviceAddress`
feature is enabled and `buffer` was created with the
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html) usage flag set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](VkMemoryAllocateFlagBits.html) bit set

* 
[](#VUID-vkBindBufferMemory-bufferDeviceAddressCaptureReplay-09200) VUID-vkBindBufferMemory-bufferDeviceAddressCaptureReplay-09200

If the
[VkPhysicalDeviceBufferDeviceAddressFeatures](VkPhysicalDeviceBufferDeviceAddressFeatures.html)::`bufferDeviceAddressCaptureReplay`
feature is enabled and `buffer` was created with the
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkMemoryAllocateFlagBits.html) bit set

* 
[](#VUID-vkBindBufferMemory-buffer-06408) VUID-vkBindBufferMemory-buffer-06408

If `buffer` was created with
[VkBufferCollectionBufferCreateInfoFUCHSIA](VkBufferCollectionBufferCreateInfoFUCHSIA.html) chained to
[VkBufferCreateInfo](VkBufferCreateInfo.html)::`pNext`, `memory` **must** be allocated
with a [VkImportMemoryBufferCollectionFUCHSIA](VkImportMemoryBufferCollectionFUCHSIA.html) chained to
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)::`pNext`

* 
[](#VUID-vkBindBufferMemory-descriptorBufferCaptureReplay-08112) VUID-vkBindBufferMemory-descriptorBufferCaptureReplay-08112

If the `buffer` was created with the
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkBufferCreateFlagBits.html) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](VkMemoryAllocateFlagBits.html) bit set

* 
[](#VUID-vkBindBufferMemory-buffer-09201) VUID-vkBindBufferMemory-buffer-09201

If the `buffer` was created with the
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkBufferCreateFlagBits.html) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkMemoryAllocateFlagBits.html) bit set

* 
[](#VUID-vkBindBufferMemory-buffer-11408) VUID-vkBindBufferMemory-buffer-11408

If the `buffer` was created with the
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits.html) or
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits2.html) bit set, `memory`
**must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](VkMemoryAllocateFlagBits.html) bit set

Valid Usage (Implicit)

* 
[](#VUID-vkBindBufferMemory-device-parameter) VUID-vkBindBufferMemory-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkBindBufferMemory-buffer-parameter) VUID-vkBindBufferMemory-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkBindBufferMemory-memory-parameter) VUID-vkBindBufferMemory-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-vkBindBufferMemory-buffer-parent) VUID-vkBindBufferMemory-buffer-parent

 `buffer` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkBindBufferMemory-memory-parent) VUID-vkBindBufferMemory-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `buffer` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBuffer](VkBuffer.html), [VkDevice](VkDevice.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkBindBufferMemory).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
