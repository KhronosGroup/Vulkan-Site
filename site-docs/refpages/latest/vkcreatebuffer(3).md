# vkCreateBuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateBuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateBuffer - Create a new buffer object

To create buffers, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateBuffer(
    VkDevice                                    device,
    const VkBufferCreateInfo*                   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkBuffer*                                   pBuffer);

* 
`device` is the logical device that creates the buffer object.

* 
`pCreateInfo` is a pointer to a [VkBufferCreateInfo](VkBufferCreateInfo.html) structure
containing parameters affecting creation of the buffer.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pBuffer` is a pointer to a [VkBuffer](VkBuffer.html) handle in which the
resulting buffer object is returned.

Implementations **may** fail to create a buffer if the
[effective usage](../../../../spec/latest/chapters/resources.html#resources-effective-buffer-usage) includes the
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits2.html) flag, and `size` is
greater than the maximum of
[`maxResourceHeapSize`](../../../../spec/latest/chapters/limits.html#limits-maxResourceHeapSize) and
[`maxSamplerHeapSize`](../../../../spec/latest/chapters/limits.html#limits-maxSamplerHeapSize).
If this happens, [VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html) will be returned.

|  | This is an issue identified with [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), which we
| --- | --- |
plan to tighten up for the KHR version.
Applications using [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html) may wish to avoid
suballocating heaps from the same buffer, instead creating one buffer per
heap, to avoid situations where this causes issues. |

Valid Usage

* 
[](#VUID-vkCreateBuffer-device-09664) VUID-vkCreateBuffer-device-09664

    `device` **must** support at least one queue family with one of the
    [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html),
    [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html),
[VK_QUEUE_SPARSE_BINDING_BIT](VkQueueFlagBits.html),
    [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or
    [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) capabilities

* 
[](#VUID-vkCreateBuffer-flags-00911) VUID-vkCreateBuffer-flags-00911

If the `flags` member of `pCreateInfo` includes
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html),
and the [    `extendedSparseAddressSpace`](../../../../spec/latest/chapters/features.html#features-extendedSparseAddressSpace) feature is not enabled,
creating this `VkBuffer` **must** not cause the total required sparse
memory for all currently valid sparse resources on the device to exceed
`VkPhysicalDeviceLimits`::`sparseAddressSpaceSize`

* 
[](#VUID-vkCreateBuffer-flags-09383) VUID-vkCreateBuffer-flags-09383

If the `flags` member of `pCreateInfo` includes
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html), the
[    `extendedSparseAddressSpace`](../../../../spec/latest/chapters/features.html#features-extendedSparseAddressSpace) feature is enabled, and the
`usage` member of `pCreateInfo` contains bits not in
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseBufferUsageFlags`,
creating this `VkBuffer` **must** not cause the total required sparse
memory for all currently valid sparse resources on the device, excluding
`VkBuffer` created with `usage` member of `pCreateInfo`
containing bits in
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseBufferUsageFlags`
and `VkImage` created with `usage` member of `pCreateInfo`
containing bits in
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseImageUsageFlags`,
to exceed `VkPhysicalDeviceLimits`::`sparseAddressSpaceSize`

* 
[](#VUID-vkCreateBuffer-flags-09384) VUID-vkCreateBuffer-flags-09384

If the `flags` member of `pCreateInfo` includes
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html) and the
[    `extendedSparseAddressSpace`](../../../../spec/latest/chapters/features.html#features-extendedSparseAddressSpace) feature is enabled, creating this
`VkBuffer` **must** not cause the total required sparse memory for all
currently valid sparse resources on the device to exceed
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseAddressSpaceSize`

* 
[](#VUID-vkCreateBuffer-pNext-06387) VUID-vkCreateBuffer-pNext-06387

If using the [VkBuffer](VkBuffer.html) for an import operation from a
[VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) where a
[VkBufferCollectionBufferCreateInfoFUCHSIA](VkBufferCollectionBufferCreateInfoFUCHSIA.html) has been chained to
`pNext`, `pCreateInfo` **must** match the
[VkBufferConstraintsInfoFUCHSIA](VkBufferConstraintsInfoFUCHSIA.html)::`createInfo` used when setting
the constraints on the buffer collection with
[vkSetBufferCollectionBufferConstraintsFUCHSIA](vkSetBufferCollectionBufferConstraintsFUCHSIA.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateBuffer-device-parameter) VUID-vkCreateBuffer-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateBuffer-pCreateInfo-parameter) VUID-vkCreateBuffer-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkBufferCreateInfo](VkBufferCreateInfo.html) structure

* 
[](#VUID-vkCreateBuffer-pAllocator-parameter) VUID-vkCreateBuffer-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateBuffer-pBuffer-parameter) VUID-vkCreateBuffer-pBuffer-parameter

 `pBuffer` **must** be a valid pointer to a [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkCreateBuffer-device-queuecount) VUID-vkCreateBuffer-device-queuecount

 The device **must** have been created with at least `1` queue

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkBuffer](VkBuffer.html), [VkBufferCreateInfo](VkBufferCreateInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkCreateBuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
