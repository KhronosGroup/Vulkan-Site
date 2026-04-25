# VkBindImageMemoryInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindImageMemoryInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindImageMemoryInfo - Structure specifying how to bind an image to memory

`VkBindImageMemoryInfo` contains members corresponding to the parameters
of [vkBindImageMemory](vkBindImageMemory.html).

The `VkBindImageMemoryInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkBindImageMemoryInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
    VkDeviceMemory     memory;
    VkDeviceSize       memoryOffset;
} VkBindImageMemoryInfo;

// Provided by VK_KHR_bind_memory2
// Equivalent to VkBindImageMemoryInfo
typedef VkBindImageMemoryInfo VkBindImageMemoryInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is the image to be attached to memory.

* 
`memory` is a [VkDeviceMemory](VkDeviceMemory.html) object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the region of `memory`
which is to be bound to the image.
The number of bytes returned in the
`VkMemoryRequirements`::`size` member in `memory`, starting
from `memoryOffset` bytes, will be bound to the specified image.

Valid Usage

* 
[](#VUID-VkBindImageMemoryInfo-image-07460) VUID-VkBindImageMemoryInfo-image-07460

`image` **must** not have been bound to a memory object

* 
[](#VUID-VkBindImageMemoryInfo-image-01045) VUID-VkBindImageMemoryInfo-image-01045

`image` **must** not have been created with any sparse memory binding
flags

* 
[](#VUID-VkBindImageMemoryInfo-memoryOffset-01046) VUID-VkBindImageMemoryInfo-memoryOffset-01046

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-VkBindImageMemoryInfo-image-01445) VUID-VkBindImageMemoryInfo-image-01445

If `image` requires a dedicated allocation (as reported by
[vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html) in
[VkMemoryDedicatedRequirements](VkMemoryDedicatedRequirements.html)::`requiresDedicatedAllocation`
for `image`), `memory` **must** have been created with
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image` equal to `image`

* 
[](#VUID-VkBindImageMemoryInfo-memory-02628) VUID-VkBindImageMemoryInfo-memory-02628

If
the [    `dedicatedAllocationImageAliasing`](../../../../spec/latest/chapters/features.html#features-dedicatedAllocationImageAliasing) feature is not enabled, and
the `VkMemoryAllocateInfo` provided when `memory` was allocated
included a [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure in its
`pNext` chain, and [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image`
was not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then `image` **must** equal
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image` and `memoryOffset`
**must** be zero

* 
[](#VUID-VkBindImageMemoryInfo-memory-02629) VUID-VkBindImageMemoryInfo-memory-02629

If the [    `dedicatedAllocationImageAliasing`](../../../../spec/latest/chapters/features.html#features-dedicatedAllocationImageAliasing) feature is enabled, and the
`VkMemoryAllocateInfo` provided when `memory` was allocated
included a [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure in its
`pNext` chain, and [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image`
was not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then `memoryOffset` **must** be zero, and
`image` **must** be either equal to
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image` or an image that was
created using the same parameters in [VkImageCreateInfo](VkImageCreateInfo.html), with the
exception that `extent` and `arrayLayers` **may** differ subject to
the following restrictions: every dimension in the `extent`
parameter of the image being bound **must** be equal to or smaller than the
original image for which the allocation was created; and the
`arrayLayers` parameter of the image being bound **must** be equal to
or smaller than the original image for which the allocation was created

* 
[](#VUID-VkBindImageMemoryInfo-memory-10926) VUID-VkBindImageMemoryInfo-memory-10926

If the `VkMemoryAllocateInfo` provided when `memory` was
allocated included a [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure in
its `pNext` chain, [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`buffer`
**must** have been [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkBindImageMemoryInfo-None-01901) VUID-VkBindImageMemoryInfo-None-01901

If image was created with the [VK_IMAGE_CREATE_PROTECTED_BIT](VkImageCreateFlagBits.html) bit
set, the image **must** be bound to a memory object allocated with a memory
type that reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-VkBindImageMemoryInfo-None-01902) VUID-VkBindImageMemoryInfo-None-01902

If image was created with the [VK_IMAGE_CREATE_PROTECTED_BIT](VkImageCreateFlagBits.html) bit
not set, the image **must** not be bound to a memory object created with a
memory type that reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-VkBindImageMemoryInfo-image-01050) VUID-VkBindImageMemoryInfo-image-01050

If `image` was created with
[VkDedicatedAllocationImageCreateInfoNV](VkDedicatedAllocationImageCreateInfoNV.html)::`dedicatedAllocation`
equal to [VK_TRUE](VK_TRUE.html), `memory` **must** have been created with
[VkDedicatedAllocationMemoryAllocateInfoNV](VkDedicatedAllocationMemoryAllocateInfoNV.html)::`image` equal to an
image handle created with identical creation parameters to `image`
and `memoryOffset` **must** be zero

* 
[](#VUID-VkBindImageMemoryInfo-apiVersion-07921) VUID-VkBindImageMemoryInfo-apiVersion-07921

    If
    the [VK_KHR_dedicated_allocation](VK_KHR_dedicated_allocation.html) extension is not enabled,
    [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
    1.1,
and
    `image` was not created with
    [VkDedicatedAllocationImageCreateInfoNV](VkDedicatedAllocationImageCreateInfoNV.html)::`dedicatedAllocation`
    equal to [VK_TRUE](VK_TRUE.html), `memory` **must** not have been allocated
    dedicated for a specific buffer or image

* 
[](#VUID-VkBindImageMemoryInfo-memory-02728) VUID-VkBindImageMemoryInfo-memory-02728

If the value of [VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` used
to allocate `memory` is not `0`, it **must** include at least one of
the handles set in
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes` when
`image` was created

* 
[](#VUID-VkBindImageMemoryInfo-memory-02989) VUID-VkBindImageMemoryInfo-memory-02989

If `memory` was created by a memory import operation,
that is not [VkImportAndroidHardwareBufferInfoANDROID](VkImportAndroidHardwareBufferInfoANDROID.html) with a
non-`NULL` `buffer` value,
the external handle type of the imported memory **must** also have been set
in [VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes` when
`image` was created

* 
[](#VUID-VkBindImageMemoryInfo-memory-02990) VUID-VkBindImageMemoryInfo-memory-02990

If `memory` was created with the
[VkImportAndroidHardwareBufferInfoANDROID](VkImportAndroidHardwareBufferInfoANDROID.html) memory import operation
with a non-`NULL` `buffer` value,
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)
**must** also have been set in
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes` when
`image` was created

* 
[](#VUID-VkBindImageMemoryInfo-image-08113) VUID-VkBindImageMemoryInfo-image-08113

If the `image` was created with the
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](VkMemoryAllocateFlagBits.html) bit set

* 
[](#VUID-VkBindImageMemoryInfo-image-09202) VUID-VkBindImageMemoryInfo-image-09202

If the `image` was created with the
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkMemoryAllocateFlagBits.html) bit set

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01615) VUID-VkBindImageMemoryInfo-pNext-01615

If the `pNext` chain does not include a
[VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html) structure,
and `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set,
then `memory` **must** have been allocated using one of the memory
types allowed in the `memoryTypeBits` member of the
[VkMemoryRequirements](VkMemoryRequirements.html) structure returned from a call to
[vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html) with `image`

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01616) VUID-VkBindImageMemoryInfo-pNext-01616

If the `pNext` chain does not include a
[VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html) structure,
and `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set,
then `memoryOffset` **must** be an integer multiple of the
`alignment` member of the [VkMemoryRequirements](VkMemoryRequirements.html) structure
returned from a call to [vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html) with
`image`

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01617) VUID-VkBindImageMemoryInfo-pNext-01617

If the `pNext` chain does not include a
[VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html) structure,
and `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set,
then the difference of the size of `memory` and `memoryOffset`
**must** be greater than or equal to the `size` member of the
[VkMemoryRequirements](VkMemoryRequirements.html) structure returned from a call to
[vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html) with the same `image`

* 
[](#VUID-VkBindImageMemoryInfo-pNext-12329) VUID-VkBindImageMemoryInfo-pNext-12329

If the `pNext` chain does not include a
[VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html) structure, and `memory` was
allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set, then
`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetImageMemoryRequirements2` with `image`

* 
[](#VUID-VkBindImageMemoryInfo-pNext-12330) VUID-VkBindImageMemoryInfo-pNext-12330

If the `pNext` chain does not include a
[VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html) structure, and `memory` was
allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set, then `size`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetImageMemoryRequirements2` with `image` **must** be
less than or equal to the size of `memory` minus `memoryOffset`

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01618) VUID-VkBindImageMemoryInfo-pNext-01618

If the `pNext` chain includes a [VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html)
structure, `image` **must** have been created with the
[VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) bit set

* 
[](#VUID-VkBindImageMemoryInfo-image-07736) VUID-VkBindImageMemoryInfo-image-07736

If `image` was created with the [VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html)
bit set, then the `pNext` chain **must** include a
[VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html) structure

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01619) VUID-VkBindImageMemoryInfo-pNext-01619

If the `pNext` chain includes a [VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html)
structure, `memory` **must** have been allocated using one of the
memory types allowed in the `memoryTypeBits` member of the
[VkMemoryRequirements](VkMemoryRequirements.html) structure returned from a call to
[vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html) with `image` and where
[VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html)::`planeAspect` corresponds to the
[VkImagePlaneMemoryRequirementsInfo](VkImagePlaneMemoryRequirementsInfo.html)::`planeAspect` in the
[VkImageMemoryRequirementsInfo2](VkImageMemoryRequirementsInfo2.html) structure’s `pNext` chain

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01620) VUID-VkBindImageMemoryInfo-pNext-01620

If the `pNext` chain includes a [VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html)
structure, `memoryOffset` **must** be an integer multiple of the
`alignment` member of the [VkMemoryRequirements](VkMemoryRequirements.html) structure
returned from a call to [vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html) with
`image` and where
[VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html)::`planeAspect` corresponds to the
[VkImagePlaneMemoryRequirementsInfo](VkImagePlaneMemoryRequirementsInfo.html)::`planeAspect` in the
[VkImageMemoryRequirementsInfo2](VkImageMemoryRequirementsInfo2.html) structure’s `pNext` chain

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01621) VUID-VkBindImageMemoryInfo-pNext-01621

If the `pNext` chain includes a [VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html)
structure, the difference of the size of `memory` and
`memoryOffset` **must** be greater than or equal to the `size`
member of the [VkMemoryRequirements](VkMemoryRequirements.html) structure returned from a call
to [vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html) with the same `image` and
where [VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html)::`planeAspect` corresponds to
the [VkImagePlaneMemoryRequirementsInfo](VkImagePlaneMemoryRequirementsInfo.html)::`planeAspect` in the
[VkImageMemoryRequirementsInfo2](VkImageMemoryRequirementsInfo2.html) structure’s `pNext` chain

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01626) VUID-VkBindImageMemoryInfo-pNext-01626

If the `pNext` chain includes a
[VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html) structure, all instances of
`memory` specified by
[VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html)::`pDeviceIndices` **must** have
been allocated

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01627) VUID-VkBindImageMemoryInfo-pNext-01627

If the `pNext` chain includes a
[VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html) structure, and
[VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html)::`splitInstanceBindRegionCount`
is not zero, then `image` **must** have been created with the
[VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](VkImageCreateFlagBits.html) bit set

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01628) VUID-VkBindImageMemoryInfo-pNext-01628

If the `pNext` chain includes a
[VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html) structure, all elements of
[VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html)::`pSplitInstanceBindRegions`
**must** be valid rectangles contained within the dimensions of `image`

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01629) VUID-VkBindImageMemoryInfo-pNext-01629

If the `pNext` chain includes a
[VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html) structure, the union of the areas
of all elements of
[VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html)::`pSplitInstanceBindRegions`
that correspond to the same instance of `image` **must** cover the
entire image

* 
[](#VUID-VkBindImageMemoryInfo-image-01630) VUID-VkBindImageMemoryInfo-image-01630

If `image` was created with a valid swapchain handle in
[VkImageSwapchainCreateInfoKHR](VkImageSwapchainCreateInfoKHR.html)::`swapchain`, then the
`pNext` chain **must** include a
[VkBindImageMemorySwapchainInfoKHR](VkBindImageMemorySwapchainInfoKHR.html) structure containing the same
swapchain handle

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01631) VUID-VkBindImageMemoryInfo-pNext-01631

If the `pNext` chain includes a
[VkBindImageMemorySwapchainInfoKHR](VkBindImageMemorySwapchainInfoKHR.html) structure, `memory` **must** be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01632) VUID-VkBindImageMemoryInfo-pNext-01632

If the `pNext` chain does not include a
[VkBindImageMemorySwapchainInfoKHR](VkBindImageMemorySwapchainInfoKHR.html) structure, `memory` **must** be
a valid [VkDeviceMemory](VkDeviceMemory.html) handle

Valid Usage (Implicit)

* 
[](#VUID-VkBindImageMemoryInfo-sType-sType) VUID-VkBindImageMemoryInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_INFO](VkStructureType.html)

* 
[](#VUID-VkBindImageMemoryInfo-pNext-pNext) VUID-VkBindImageMemoryInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html), [VkBindImageMemorySwapchainInfoKHR](VkBindImageMemorySwapchainInfoKHR.html), [VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html), or [VkBindMemoryStatus](VkBindMemoryStatus.html)

* 
[](#VUID-VkBindImageMemoryInfo-sType-unique) VUID-VkBindImageMemoryInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBindImageMemoryInfo-image-parameter) VUID-VkBindImageMemoryInfo-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkBindImageMemoryInfo-commonparent) VUID-VkBindImageMemoryInfo-commonparent

 Both of `image`, and `memory` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `image` **must** be externally synchronized

[VK_KHR_bind_memory2](VK_KHR_bind_memory2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`, [VkImage](VkImage.html), [VkStructureType](VkStructureType.html), [vkBindImageMemory2](vkBindImageMemory2.html), [vkBindImageMemory2](vkBindImageMemory2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBindImageMemoryInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
