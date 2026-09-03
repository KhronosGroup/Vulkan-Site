# vkCreateImage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateImage.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateImage - Create a new image object

To create images, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateImage(
    VkDevice                                    device,
    const VkImageCreateInfo*                    pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkImage*                                    pImage);

* 
`device` is the logical device that creates the image.

* 
`pCreateInfo` is a pointer to a [VkImageCreateInfo](VkImageCreateInfo.html) structure
containing parameters to be used to create the image.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pImage` is a pointer to a [VkImage](VkImage.html) handle in which the
resulting image object is returned.

Valid Usage

* 
[](#VUID-vkCreateImage-device-09666) VUID-vkCreateImage-device-09666

    `device` **must** support at least one queue family with one of the
    [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html),
    [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html),
    [VK_QUEUE_OPTICAL_FLOW_BIT_NV](VkQueueFlagBits.html),
[VK_QUEUE_SPARSE_BINDING_BIT](VkQueueFlagBits.html),
    [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or
    [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) capabilities

* 
[](#VUID-vkCreateImage-flags-00939) VUID-vkCreateImage-flags-00939

If the `flags` member of `pCreateInfo` includes
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html),
and the [    `extendedSparseAddressSpace`](../../../../spec/latest/chapters/features.html#features-extendedSparseAddressSpace) feature is not enabled,
creating this `VkImage` **must** not cause the total required sparse
memory for all currently valid sparse resources on the device to exceed
`VkPhysicalDeviceLimits`::`sparseAddressSpaceSize`

* 
[](#VUID-vkCreateImage-flags-09385) VUID-vkCreateImage-flags-09385

If the `flags` member of `pCreateInfo` includes
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html), the
[    `extendedSparseAddressSpace`](../../../../spec/latest/chapters/features.html#features-extendedSparseAddressSpace) feature is enabled, and the
`usage` member of `pCreateInfo` contains bits not in
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseImageUsageFlags`,
creating this `VkImage` **must** not cause the total required sparse
memory for all currently valid sparse resources on the device, excluding
`VkBuffer` created with `usage` member of `pCreateInfo`
containing bits in
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseBufferUsageFlags`
and `VkImage` created with `usage` member of `pCreateInfo`
containing bits in
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseImageUsageFlags`,
to exceed `VkPhysicalDeviceLimits`::`sparseAddressSpaceSize`

* 
[](#VUID-vkCreateImage-flags-09386) VUID-vkCreateImage-flags-09386

If the `flags` member of `pCreateInfo` includes
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html) and the
[    `extendedSparseAddressSpace`](../../../../spec/latest/chapters/features.html#features-extendedSparseAddressSpace) feature is enabled, creating this
`VkImage` **must** not cause the total required sparse memory for all
currently valid sparse resources on the device to exceed
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseAddressSpaceSize`

* 
[](#VUID-vkCreateImage-pNext-06389) VUID-vkCreateImage-pNext-06389

If a [VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html) has been chained to
`pNext`, `pCreateInfo` **must** match the
[Sysmem chosen `VkImageCreateInfo`](../../../../spec/latest/chapters/resources.html#sysmem-chosen-create-infos)
excepting members [VkImageCreateInfo](VkImageCreateInfo.html)::`extent` and
[VkImageCreateInfo](VkImageCreateInfo.html)::`usage` in the match criteria

Valid Usage (Implicit)

* 
[](#VUID-vkCreateImage-device-parameter) VUID-vkCreateImage-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateImage-pCreateInfo-parameter) VUID-vkCreateImage-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkImageCreateInfo](VkImageCreateInfo.html) structure

* 
[](#VUID-vkCreateImage-pAllocator-parameter) VUID-vkCreateImage-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateImage-pImage-parameter) VUID-vkCreateImage-pImage-parameter

 `pImage` **must** be a valid pointer to a [VkImage](VkImage.html) handle

* 
[](#VUID-vkCreateImage-device-queuecount) VUID-vkCreateImage-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_COMPRESSION_EXHAUSTED_EXT](VkResult.html)

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkImage](VkImage.html), [VkImageCreateInfo](VkImageCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkCreateImage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
