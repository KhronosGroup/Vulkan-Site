# vkMapMemory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkMapMemory.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkMapMemory - Map a memory object into application address space

To retrieve a host virtual address pointer to a region of a mappable memory
object, call:

// Provided by VK_VERSION_1_0
VkResult vkMapMemory(
    VkDevice                                    device,
    VkDeviceMemory                              memory,
    VkDeviceSize                                offset,
    VkDeviceSize                                size,
    VkMemoryMapFlags                            flags,
    void**                                      ppData);

* 
`device` is the logical device that owns the memory.

* 
`memory` is the [VkDeviceMemory](VkDeviceMemory.html) object to be mapped.

* 
`offset` is a zero-based byte offset from the beginning of the
memory object.

* 
`size` is the size of the memory range to map, or
[VK_WHOLE_SIZE](VK_WHOLE_SIZE.html) to map from `offset` to the end of the
allocation.

* 
`flags` is a bitmask of [VkMemoryMapFlagBits](VkMemoryMapFlagBits.html) specifying
additional parameters of the memory map operation.

* 
`ppData` is a pointer to a `void*` variable in which a
host-accessible pointer to the beginning of the mapped range is
returned.
The value of the returned pointer minus `offset` **must** be aligned to
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`minMemoryMapAlignment`.

After a successful call to `vkMapMemory` the memory object `memory`
is considered to be currently *host mapped*.

|  | It is an application error to call `vkMapMemory` on a memory object that
| --- | --- |
is already *host mapped*. |

|  | `vkMapMemory` will fail if the implementation is unable to allocate an
| --- | --- |
appropriately sized contiguous virtual address range, e.g. due to virtual
address space fragmentation or platform limits.
In such cases, `vkMapMemory` **must** return
[VK_ERROR_MEMORY_MAP_FAILED](VkResult.html).
The application **can** improve the likelihood of success by reducing the size
of the mapped range and/or removing unneeded mappings using
[vkUnmapMemory](vkUnmapMemory.html). |

`vkMapMemory` does not check whether the device memory is currently in
use before returning the host-accessible pointer.
The application **must** guarantee that any previously submitted command that
writes to this range has completed before the host reads from or writes to
that range, and that any previously submitted command that reads from that
range has completed before the host writes to that region (see
[here](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-host-writes) for details on fulfilling
such a guarantee).
If the device memory was allocated without the
[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](VkMemoryPropertyFlagBits.html) set, these guarantees **must** be
made for an extended range: the application **must** round down the start of
the range to the nearest multiple of
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`nonCoherentAtomSize`, and round the end
of the range up to the nearest multiple of
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`nonCoherentAtomSize`.

While a range of device memory is host mapped, the application is
responsible for synchronizing both device and host access to that memory
range.

|  | It is important for the application developer to become meticulously
| --- | --- |
familiar with all of the mechanisms described in the chapter on
[Synchronization and Cache Control](../../../../spec/latest/chapters/synchronization.html#synchronization) as they are crucial
to maintaining memory access ordering. |

Calling `vkMapMemory` is equivalent to calling [vkMapMemory2](vkMapMemory2.html) with
an empty `pNext` chain.

Valid Usage

* 
[](#VUID-vkMapMemory-memory-00678) VUID-vkMapMemory-memory-00678

`memory` **must** not be currently host mapped

* 
[](#VUID-vkMapMemory-offset-00679) VUID-vkMapMemory-offset-00679

`offset` **must** be less than the size of `memory`

* 
[](#VUID-vkMapMemory-size-00680) VUID-vkMapMemory-size-00680

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must** be
greater than `0`

* 
[](#VUID-vkMapMemory-size-00681) VUID-vkMapMemory-size-00681

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must** be
less than or equal to the size of the `memory` minus `offset`

* 
[](#VUID-vkMapMemory-memory-00682) VUID-vkMapMemory-memory-00682

`memory` **must** have been created with a memory type that reports
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-vkMapMemory-memory-00683) VUID-vkMapMemory-memory-00683

`memory` **must** not have been allocated with multiple instances

* 
[](#VUID-vkMapMemory-flags-09568) VUID-vkMapMemory-flags-09568

[VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html) **must** not be set in `flags`

Valid Usage (Implicit)

* 
[](#VUID-vkMapMemory-device-parameter) VUID-vkMapMemory-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkMapMemory-memory-parameter) VUID-vkMapMemory-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-vkMapMemory-flags-parameter) VUID-vkMapMemory-flags-parameter

 `flags` **must** be a valid combination of [VkMemoryMapFlagBits](VkMemoryMapFlagBits.html) values

* 
[](#VUID-vkMapMemory-ppData-parameter) VUID-vkMapMemory-ppData-parameter

 `ppData` **must** be a valid pointer to a pointer value

* 
[](#VUID-vkMapMemory-memory-parent) VUID-vkMapMemory-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `memory` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_MEMORY_MAP_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`, [VkMemoryMapFlags](VkMemoryMapFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkMapMemory).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
