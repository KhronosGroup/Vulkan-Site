# VkBufferMemoryBarrier(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferMemoryBarrier.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferMemoryBarrier - Structure specifying a buffer memory barrier

The `VkBufferMemoryBarrier` structure is defined as:

|  | This functionality is superseded by [VkBufferMemoryBarrier2](../../../../spec/latest/chapters/synchronization.html#VkBufferMemoryBarrier2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkBufferMemoryBarrier {
    VkStructureType    sType;
    const void*        pNext;
    VkAccessFlags      srcAccessMask;
    VkAccessFlags      dstAccessMask;
    uint32_t           srcQueueFamilyIndex;
    uint32_t           dstQueueFamilyIndex;
    VkBuffer           buffer;
    VkDeviceSize       offset;
    VkDeviceSize       size;
} VkBufferMemoryBarrier;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcAccessMask` is a bitmask of [VkAccessFlagBits](VkAccessFlagBits.html) specifying a
[source access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks).

* 
`dstAccessMask` is a bitmask of [VkAccessFlagBits](VkAccessFlagBits.html) specifying a
[destination access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks).

* 
`srcQueueFamilyIndex` is the source queue family for a
[queue family ownership transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).

* 
`dstQueueFamilyIndex` is the destination queue family for a
[queue family ownership transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).

* 
`buffer` is a handle to the buffer whose backing memory is affected
by the barrier.

* 
`offset` is an offset in bytes into the backing memory for
`buffer`; this is relative to the base offset as bound to the buffer
(see [vkBindBufferMemory](vkBindBufferMemory.html)).

* 
`size` is a size in bytes of the affected area of backing memory for
`buffer`, or [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html) to use the range from `offset`
to the end of the buffer.

The first [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) is
limited to access to memory through the specified buffer range, via access
types in the [source access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks) specified
by
`srcAccessMask` and, if a [VkMemoryBarrierAccessFlags3KHR](VkMemoryBarrierAccessFlags3KHR.html) is passed
in `pNext`, `srcAccessMask3`.
If the source access mask includes [VK_ACCESS_HOST_WRITE_BIT](VkAccessFlagBits.html), a
[memory domain operation](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-available-and-visible) is performed where available memory in the host domain is also
made available to the device domain.

The second [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) is
limited to access to memory through the specified buffer range, via access
types in the [destination access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks)
specified by
`dstAccessMask` and, if a [VkMemoryBarrierAccessFlags3KHR](VkMemoryBarrierAccessFlags3KHR.html) is passed
in `pNext`, `dstAccessMask3`.
If the destination access mask includes [VK_ACCESS_HOST_WRITE_BIT](VkAccessFlagBits.html) or
[VK_ACCESS_HOST_READ_BIT](VkAccessFlagBits.html), a
[memory domain operation](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-available-and-visible) is performed where available memory in the device domain is also
made available to the host domain.

|  | Host writes to device memory that was allocated without
| --- | --- |
[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](VkMemoryPropertyFlagBits.html) have to be flushed with
[vkFlushMappedMemoryRanges](vkFlushMappedMemoryRanges.html) before they can be accessed safely on the
device.
Similarly, device writes to such memory have to be invalidated with
[vkInvalidateMappedMemoryRanges](vkInvalidateMappedMemoryRanges.html) before they can be accessed safely on
the host.

Memory allocated with [VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](VkMemoryPropertyFlagBits.html) does not
need to have these additional operations performed. |

If `srcQueueFamilyIndex` is not equal to `dstQueueFamilyIndex`, and
`srcQueueFamilyIndex` is equal to the current queue family, then the
memory barrier defines a [queue family release operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-release) for the specified buffer range, and
if `dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](VkDependencyFlagBits.html),
the second synchronization scope of the calling command does not apply to
this operation.

If `dstQueueFamilyIndex` is not equal to `srcQueueFamilyIndex`, and
`dstQueueFamilyIndex` is equal to the current queue family, then the
memory barrier defines a [queue family acquire operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-acquire) for the specified buffer range, and
if `dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](VkDependencyFlagBits.html),
the first synchronization scope of the calling command does not apply to
this operation.

Valid Usage

* 
[](#VUID-VkBufferMemoryBarrier-offset-01187) VUID-VkBufferMemoryBarrier-offset-01187

`offset` **must** be less than the size of `buffer`

* 
[](#VUID-VkBufferMemoryBarrier-size-01188) VUID-VkBufferMemoryBarrier-size-01188

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must** be
greater than `0`

* 
[](#VUID-VkBufferMemoryBarrier-size-01189) VUID-VkBufferMemoryBarrier-size-01189

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must** be
less than or equal to than the size of `buffer` minus `offset`

* 
[](#VUID-VkBufferMemoryBarrier-buffer-01931) VUID-VkBufferMemoryBarrier-buffer-01931

If `buffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-VkBufferMemoryBarrier-buffer-09095) VUID-VkBufferMemoryBarrier-buffer-09095

If `buffer` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `srcQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html),
[VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html),
or
a valid queue family

* 
[](#VUID-VkBufferMemoryBarrier-buffer-09096) VUID-VkBufferMemoryBarrier-buffer-09096

If `buffer` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `dstQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html),
[VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html),
or
a valid queue family

* 
[](#VUID-VkBufferMemoryBarrier-None-09097) VUID-VkBufferMemoryBarrier-None-09097

    
If
    the [VK_KHR_external_memory](VK_KHR_external_memory.html) extension is not enabled,
and
    the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
    the [VkInstance](VkInstance.html) is not greater than or equal to Version 1.1,
    `srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

* 
[](#VUID-VkBufferMemoryBarrier-None-09098) VUID-VkBufferMemoryBarrier-None-09098

    
If
    the [VK_KHR_external_memory](VK_KHR_external_memory.html) extension is not enabled,
and
    the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
    the [VkInstance](VkInstance.html) is not greater than or equal to Version 1.1,
    `dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

* 
[](#VUID-VkBufferMemoryBarrier-srcQueueFamilyIndex-09099) VUID-VkBufferMemoryBarrier-srcQueueFamilyIndex-09099

If the [VK_EXT_queue_family_foreign](VK_EXT_queue_family_foreign.html) extension is not enabled
`srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html)

* 
[](#VUID-VkBufferMemoryBarrier-dstQueueFamilyIndex-09100) VUID-VkBufferMemoryBarrier-dstQueueFamilyIndex-09100

If the [VK_EXT_queue_family_foreign](VK_EXT_queue_family_foreign.html) extension is not enabled
`dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html)

* 
[](#VUID-VkBufferMemoryBarrier-None-09049) VUID-VkBufferMemoryBarrier-None-09049

If
the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is not
enabled, and
`buffer` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), at least one of
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_IGNORED](VK_QUEUE_FAMILY_IGNORED.html)

* 
[](#VUID-VkBufferMemoryBarrier-None-09050) VUID-VkBufferMemoryBarrier-None-09050

If
the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is not
enabled, and
`buffer` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), `srcQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_IGNORED](VK_QUEUE_FAMILY_IGNORED.html)
or [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

* 
[](#VUID-VkBufferMemoryBarrier-None-09051) VUID-VkBufferMemoryBarrier-None-09051

If
the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is not
enabled, and
`buffer` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), `dstQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_IGNORED](VK_QUEUE_FAMILY_IGNORED.html)
or [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

Valid Usage (Implicit)

* 
[](#VUID-VkBufferMemoryBarrier-sType-sType) VUID-VkBufferMemoryBarrier-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER](VkStructureType.html)

* 
[](#VUID-VkBufferMemoryBarrier-pNext-pNext) VUID-VkBufferMemoryBarrier-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkExternalMemoryAcquireUnmodifiedEXT](VkExternalMemoryAcquireUnmodifiedEXT.html)

* 
[](#VUID-VkBufferMemoryBarrier-sType-unique) VUID-VkBufferMemoryBarrier-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBufferMemoryBarrier-buffer-parameter) VUID-VkBufferMemoryBarrier-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAccessFlags](VkAccessFlags.html), [VkBuffer](VkBuffer.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkCmdPipelineBarrier](vkCmdPipelineBarrier.html), [vkCmdWaitEvents](vkCmdWaitEvents.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkBufferMemoryBarrier).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
