# vkInvalidateMappedMemoryRanges(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkInvalidateMappedMemoryRanges.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkInvalidateMappedMemoryRanges - Invalidate ranges of mapped memory objects

To invalidate ranges of non-coherent memory from the host caches, call:

// Provided by VK_VERSION_1_0
VkResult vkInvalidateMappedMemoryRanges(
    VkDevice                                    device,
    uint32_t                                    memoryRangeCount,
    const VkMappedMemoryRange*                  pMemoryRanges);

* 
`device` is the logical device that owns the memory ranges.

* 
`memoryRangeCount` is the length of the `pMemoryRanges` array.

* 
`pMemoryRanges` is a pointer to an array of
[VkMappedMemoryRange](VkMappedMemoryRange.html) structures describing the memory ranges to
invalidate.

`vkInvalidateMappedMemoryRanges` guarantees that device writes to the
memory ranges described by `pMemoryRanges`, which have been made
available to the host memory domain using the [VK_ACCESS_HOST_WRITE_BIT](VkAccessFlagBits.html)
and [VK_ACCESS_HOST_READ_BIT](VkAccessFlagBits.html) [access types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types), are made visible to the host.
If a range of non-coherent memory is written by the host and then
invalidated without first being flushed, its contents are **undefined**.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all host operations that happened-before it, as defined by the host
memory model.

|  | This function does not synchronize with device operations directly - other
| --- | --- |
host [synchronization operations](../../../../spec/latest/chapters/synchronization.html#synchronization) that depend on device
operations such as [vkWaitForFences](vkWaitForFences.html) must be executed beforehand.
So for any non-coherent device write to be made visible to the host, there
has to be a dependency chain along the following lines:

Device write

Device memory barrier including host reads in its second scope

Signal on the device (e.g. a [fence    signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-fences-signaling))

Wait on the host (e.g. [vkWaitForFences](vkWaitForFences.html))

[vkInvalidateMappedMemoryRanges](#) |

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all host operations that happen-after it, as defined by the host
memory model.

The first [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) is
empty.

The second [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes)
includes host reads to the specified memory ranges.

|  | When a device write to a memory location is made visible to the host in this
| --- | --- |
way, each whole aligned set of [`nonCoherentAtomSize`](../../../../spec/latest/chapters/limits.html#limits-nonCoherentAtomSize) bytes that the memory location exists in will
also be made visible as if they were written by the device.
For example, with a `nonCoherentAtomSize` of 128, if an application
writes to the first byte of a memory object on the device, the first 128
bytes of the memory object will be made visible by this command.
While the value of the following 127 bytes will be unchanged, this does
count as an access for the purpose of synchronization, so care must be taken
to avoid data races. |

|  | Mapping non-coherent memory does not implicitly invalidate that memory. |
| --- | --- |

Valid Usage (Implicit)

* 
[](#VUID-vkInvalidateMappedMemoryRanges-device-parameter) VUID-vkInvalidateMappedMemoryRanges-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkInvalidateMappedMemoryRanges-pMemoryRanges-parameter) VUID-vkInvalidateMappedMemoryRanges-pMemoryRanges-parameter

 `pMemoryRanges` **must** be a valid pointer to an array of `memoryRangeCount` valid [VkMappedMemoryRange](VkMappedMemoryRange.html) structures

* 
[](#VUID-vkInvalidateMappedMemoryRanges-memoryRangeCount-arraylength) VUID-vkInvalidateMappedMemoryRanges-memoryRangeCount-arraylength

 `memoryRangeCount` **must** be greater than `0`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkMappedMemoryRange](VkMappedMemoryRange.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkInvalidateMappedMemoryRanges).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
