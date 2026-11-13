# vkFlushMappedMemoryRanges(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkFlushMappedMemoryRanges.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkFlushMappedMemoryRanges - Flush mapped memory ranges

To flush ranges of non-coherent memory from the host caches, call:

// Provided by VK_VERSION_1_0
VkResult vkFlushMappedMemoryRanges(
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
flush.

`vkFlushMappedMemoryRanges` guarantees that host writes to the memory
ranges described by `pMemoryRanges` are made available to the host
memory domain, such that they **can** be made available to the device memory
domain via [memory domain operations](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-available-and-visible) using the [VK_ACCESS_HOST_WRITE_BIT](VkAccessFlagBits.html)
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types).

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all host operations that happened-before it, as defined by the host
memory model.

|  | Some systems allow writes that do not directly integrate with the host
| --- | --- |
memory model; these have to be synchronized by the application manually.
One example of this is non-temporal store instructions on x86; to ensure
these happen-before submission, applications should call `_mm_sfence()`. |

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) is
empty.

The first [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes)
includes host writes to the specified memory ranges.

|  | When a host write to a memory location is made available in this way, each
| --- | --- |
whole aligned set of [`nonCoherentAtomSize`](../../../../spec/latest/chapters/limits.html#limits-nonCoherentAtomSize) bytes that the memory location exists in will
also be made available as if they were written by the host.
For example, with a `nonCoherentAtomSize` of 128, if an application
writes to the first byte of a memory object via a host mapping, the first
128 bytes of the memory object will be made available by this command.
While the value of the following 127 bytes will be unchanged, this does
count as an access for the purpose of synchronization, so care must be taken
to avoid data races. |

The second [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) is
empty.

Unmapping non-coherent memory does not implicitly flush the host mapped
memory, and host writes that have not been flushed **may** not ever be visible
to the device.
However, implementations **must** ensure that writes that have not been flushed
do not become visible to any other memory.

|  | The above guarantee avoids a potential memory corruption in scenarios where
| --- | --- |
host writes to a mapped memory object have not been flushed before the
memory is unmapped (or freed), and the virtual address range is subsequently
reused for a different mapping (or memory allocation). |

Valid Usage (Implicit)

* 
[](#VUID-vkFlushMappedMemoryRanges-device-parameter) VUID-vkFlushMappedMemoryRanges-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkFlushMappedMemoryRanges-pMemoryRanges-parameter) VUID-vkFlushMappedMemoryRanges-pMemoryRanges-parameter

 `pMemoryRanges` **must** be a valid pointer to an array of `memoryRangeCount` valid [VkMappedMemoryRange](VkMappedMemoryRange.html) structures

* 
[](#VUID-vkFlushMappedMemoryRanges-memoryRangeCount-arraylength) VUID-vkFlushMappedMemoryRanges-memoryRangeCount-arraylength

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

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkFlushMappedMemoryRanges).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
