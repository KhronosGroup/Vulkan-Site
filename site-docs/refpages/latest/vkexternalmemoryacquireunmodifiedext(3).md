# VkExternalMemoryAcquireUnmodifiedEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExternalMemoryAcquireUnmodifiedEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExternalMemoryAcquireUnmodifiedEXT - Structure specifying that external memory has remained unmodified since releasing ownership

An *acquire operation* **may** have a performance penalty when acquiring
ownership of a subresource range from one of the special queue families
reserved for external memory ownership transfers described above.
The application **can** reduce the performance penalty in some cases by adding
a [VkExternalMemoryAcquireUnmodifiedEXT](#) structure to the `pNext`
chain of the *acquire operation*'s memory barrier structure.

The `VkExternalMemoryAcquireUnmodifiedEXT` structure is defined as:

// Provided by VK_EXT_external_memory_acquire_unmodified
typedef struct VkExternalMemoryAcquireUnmodifiedEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           acquireUnmodifiedMemory;
} VkExternalMemoryAcquireUnmodifiedEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`acquireUnmodifiedMemory` specifies, if [VK_TRUE](VK_TRUE.html), that no range
of [VkDeviceMemory](VkDeviceMemory.html) bound to the resource of the memory barrier’s
subresource range was modified at any time since the resource’s most
recent release of ownership to the queue family specified by the memory
barrier’s `srcQueueFamilyIndex`.
If [VK_FALSE](VK_FALSE.html), it specifies nothing.

If the application releases ownership of the subresource range to one of the
special queue families reserved for external memory ownership transfers with
a memory barrier structure, and later re-acquires ownership from the same
queue family with a memory barrier structure, and if no range of
[VkDeviceMemory](VkDeviceMemory.html) bound to the resource was modified at any time between
the *release operation* and the *acquire operation*, then the application
**should** add a [VkExternalMemoryAcquireUnmodifiedEXT](#) structure to the
`pNext` chain of the *acquire operation*'s memory barrier structure
because this **may** reduce the performance penalty.

This structure is ignored if `acquireUnmodifiedMemory` is
[VK_FALSE](VK_FALSE.html).
In particular, [VK_FALSE](VK_FALSE.html) does *not* specify that memory was modified.

This structure is ignored if the memory barrier’s `srcQueueFamilyIndex`
is not a special queue family reserved for external memory ownership
transfers.

|  | The method by which the application determines whether memory was modified
| --- | --- |
between the *release operation* and *acquire operation* is outside the scope
of Vulkan.

For any Vulkan operation that accesses a resource, the application **must** not
assume the implementation accesses the resource’s memory as read-only, even
for *apparently* read-only operations such as transfer commands and shader
reads.

The validity of
[VkExternalMemoryAcquireUnmodifiedEXT](#)::`acquireUnmodifiedMemory` is
independent of memory ranges outside the ranges of [VkDeviceMemory](VkDeviceMemory.html)
bound to the resource.
In particular, it is independent of any implementation-private memory
associated with the resource. |

Valid Usage

* 
[](#VUID-VkExternalMemoryAcquireUnmodifiedEXT-acquireUnmodifiedMemory-08922) VUID-VkExternalMemoryAcquireUnmodifiedEXT-acquireUnmodifiedMemory-08922

If `acquireUnmodifiedMemory` is [VK_TRUE](VK_TRUE.html), and the memory
barrier’s `srcQueueFamilyIndex` is a special queue family reserved
for external memory ownership transfers (as described in
[Queue Family Ownership Transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers)), then each range of
[VkDeviceMemory](VkDeviceMemory.html) bound to the resource **must** have remained
unmodified during all time since the resource’s most recent release of
ownership to the queue family

Valid Usage (Implicit)

* 
[](#VUID-VkExternalMemoryAcquireUnmodifiedEXT-sType-sType) VUID-VkExternalMemoryAcquireUnmodifiedEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_ACQUIRE_UNMODIFIED_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferMemoryBarrier](VkBufferMemoryBarrier.html)

* 
[VkBufferMemoryBarrier2](VkBufferMemoryBarrier2.html)

* 
[VkImageMemoryBarrier](VkImageMemoryBarrier.html)

* 
[VkImageMemoryBarrier2](VkImageMemoryBarrier2.html)

[VK_EXT_external_memory_acquire_unmodified](VK_EXT_external_memory_acquire_unmodified.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkExternalMemoryAcquireUnmodifiedEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
