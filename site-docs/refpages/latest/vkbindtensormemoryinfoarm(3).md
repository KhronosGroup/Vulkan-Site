# VkBindTensorMemoryInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindTensorMemoryInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindTensorMemoryInfoARM - Structure specifying how to bind a tensor to memory

The `VkBindTensorMemoryInfoARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkBindTensorMemoryInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorARM        tensor;
    VkDeviceMemory     memory;
    VkDeviceSize       memoryOffset;
} VkBindTensorMemoryInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensor` is the tensor to be attached to memory.

* 
`memory` is a [VkDeviceMemory](VkDeviceMemory.html) object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the region of `memory`
which is to be bound to the tensor.
The number of bytes returned in the
`VkMemoryRequirements`::`size` member in `memory`, starting
from `memoryOffset` bytes, will be bound to the specified tensor.

Valid Usage

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-09712) VUID-VkBindTensorMemoryInfoARM-tensor-09712

`tensor` **must** not already be backed by a memory object

* 
[](#VUID-VkBindTensorMemoryInfoARM-memoryOffset-09713) VUID-VkBindTensorMemoryInfoARM-memoryOffset-09713

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-VkBindTensorMemoryInfoARM-memory-09714) VUID-VkBindTensorMemoryInfoARM-memory-09714

`memory` **must** have been allocated using one of the memory types
allowed in the `memoryTypeBits` member of the
`VkMemoryRequirements` structure returned from a call to
`vkGetTensorMemoryRequirementsARM` with `tensor`

* 
[](#VUID-VkBindTensorMemoryInfoARM-memoryOffset-09715) VUID-VkBindTensorMemoryInfoARM-memoryOffset-09715

`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkMemoryRequirements` structure returned from a call
to `vkGetTensorMemoryRequirementsARM` with `tensor`

* 
[](#VUID-VkBindTensorMemoryInfoARM-size-09716) VUID-VkBindTensorMemoryInfoARM-size-09716

The `size` member of the `VkMemoryRequirements` structure
returned from a call to `vkGetTensorMemoryRequirementsARM` with
`tensor` **must** be less than or equal to the size of `memory`
minus `memoryOffset`

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-09717) VUID-VkBindTensorMemoryInfoARM-tensor-09717

If `tensor` requires a dedicated allocation (as reported by
[vkGetTensorMemoryRequirementsARM](vkGetTensorMemoryRequirementsARM.html) in
[VkMemoryDedicatedRequirements](VkMemoryDedicatedRequirements.html)::`requiresDedicatedAllocation`
for `tensor`), `memory` **must** have been created with
[VkMemoryDedicatedAllocateInfoTensorARM](VkMemoryDedicatedAllocateInfoTensorARM.html)::`tensor` equal to
`tensor`

* 
[](#VUID-VkBindTensorMemoryInfoARM-memory-09806) VUID-VkBindTensorMemoryInfoARM-memory-09806

If the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) provided when `memory` was
allocated included a [VkMemoryDedicatedAllocateInfoTensorARM](VkMemoryDedicatedAllocateInfoTensorARM.html)
structure in its `pNext` chain, and
[VkMemoryDedicatedAllocateInfoTensorARM](VkMemoryDedicatedAllocateInfoTensorARM.html)::`tensor` was not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), then `tensor` **must** equal
[VkMemoryDedicatedAllocateInfoTensorARM](VkMemoryDedicatedAllocateInfoTensorARM.html)::`tensor`, and
`memoryOffset` **must** be zero

* 
[](#VUID-VkBindTensorMemoryInfoARM-memory-09895) VUID-VkBindTensorMemoryInfoARM-memory-09895

If the value of [VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` used
to allocate `memory` is not `0`, it **must** include at least one of
the handles set in
[VkExternalMemoryTensorCreateInfoARM](VkExternalMemoryTensorCreateInfoARM.html)::`handleTypes` when
`tensor` was created

* 
[](#VUID-VkBindTensorMemoryInfoARM-memory-09896) VUID-VkBindTensorMemoryInfoARM-memory-09896

If `memory` was allocated by a memory import operation,
that is not [VkImportAndroidHardwareBufferInfoANDROID](VkImportAndroidHardwareBufferInfoANDROID.html) with a
non-`NULL` `buffer` value,
the external handle type of the imported memory **must** also have been set
in [VkExternalMemoryTensorCreateInfoARM](VkExternalMemoryTensorCreateInfoARM.html)::`handleTypes` when
`tensor` was created

* 
[](#VUID-VkBindTensorMemoryInfoARM-memory-09897) VUID-VkBindTensorMemoryInfoARM-memory-09897

If `memory` was allocated with the
[VkImportAndroidHardwareBufferInfoANDROID](VkImportAndroidHardwareBufferInfoANDROID.html) memory import operation
with a non-`NULL` `buffer` value,
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)
**must** also have been set in
[VkExternalMemoryTensorCreateInfoARM](VkExternalMemoryTensorCreateInfoARM.html)::`handleTypes` when
`tensor` was created

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-09718) VUID-VkBindTensorMemoryInfoARM-tensor-09718

If `tensor` was created with the
[VK_TENSOR_CREATE_PROTECTED_BIT_ARM](VkTensorCreateFlagBitsARM.html) bit set, the tensor **must** be
bound to a memory object allocated with a memory type that reports
[VK_MEMORY_PROPERTY_PROTECTED_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-09719) VUID-VkBindTensorMemoryInfoARM-tensor-09719

If `tensor` was created with the
[VK_TENSOR_CREATE_PROTECTED_BIT_ARM](VkTensorCreateFlagBitsARM.html) bit not set, the tensor **must**
not be bound to a memory object allocated with a memory type that
reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-09943) VUID-VkBindTensorMemoryInfoARM-tensor-09943

If `tensor` was created with the
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](VkMemoryAllocateFlagBits.html) bit set

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-09944) VUID-VkBindTensorMemoryInfoARM-tensor-09944

If `tensor` was created with the
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkMemoryAllocateFlagBits.html) bit set

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-11406) VUID-VkBindTensorMemoryInfoARM-tensor-11406

If `tensor` was created with the
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](VkMemoryAllocateFlagBits.html) bit set

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-11407) VUID-VkBindTensorMemoryInfoARM-tensor-11407

If `tensor` was created with the
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkMemoryAllocateFlagBits.html) bit set

Valid Usage (Implicit)

* 
[](#VUID-VkBindTensorMemoryInfoARM-sType-sType) VUID-VkBindTensorMemoryInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_TENSOR_MEMORY_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkBindTensorMemoryInfoARM-pNext-pNext) VUID-VkBindTensorMemoryInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-parameter) VUID-VkBindTensorMemoryInfoARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](VkTensorARM.html) handle

* 
[](#VUID-VkBindTensorMemoryInfoARM-memory-parameter) VUID-VkBindTensorMemoryInfoARM-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-VkBindTensorMemoryInfoARM-commonparent) VUID-VkBindTensorMemoryInfoARM-commonparent

 Both of `memory`, and `tensor` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `tensor` **must** be externally synchronized

[VK_ARM_tensors](VK_ARM_tensors.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [VkTensorARM](VkTensorARM.html), [vkBindTensorMemoryARM](vkBindTensorMemoryARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBindTensorMemoryInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
