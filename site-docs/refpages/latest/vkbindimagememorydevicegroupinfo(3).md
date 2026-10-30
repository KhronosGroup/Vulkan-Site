# VkBindImageMemoryDeviceGroupInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindImageMemoryDeviceGroupInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindImageMemoryDeviceGroupInfo - Structure specifying device within a group to bind to

The `VkBindImageMemoryDeviceGroupInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkBindImageMemoryDeviceGroupInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           deviceIndexCount;
    const uint32_t*    pDeviceIndices;
    uint32_t           splitInstanceBindRegionCount;
    const VkRect2D*    pSplitInstanceBindRegions;
} VkBindImageMemoryDeviceGroupInfo;

// Provided by VK_KHR_bind_memory2 with VK_KHR_device_group
// Equivalent to VkBindImageMemoryDeviceGroupInfo
typedef VkBindImageMemoryDeviceGroupInfo VkBindImageMemoryDeviceGroupInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceIndexCount` is the number of elements in
`pDeviceIndices`.

* 
`pDeviceIndices` is a pointer to an array of device indices.

* 
`splitInstanceBindRegionCount` is the number of elements in
`pSplitInstanceBindRegions`.

* 
`pSplitInstanceBindRegions` is a pointer to an array of
[VkRect2D](VkRect2D.html) structures describing which regions of the image are
attached to each instance of memory.

If the `pNext` chain of [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html) includes a
`VkBindImageMemoryDeviceGroupInfo` structure, then that structure
determines how memory is bound to images across multiple devices in a device
group.

If `deviceIndexCount` is greater than zero, then on device index i
`image` is attached to the instance of the memory on the physical device
with device index `pDeviceIndices`[i].

Let N be the number of physical devices in the logical device.
If `splitInstanceBindRegionCount` is greater than zero, then
`pSplitInstanceBindRegions` is a pointer to an array of N2
rectangles, where the image region specified by the rectangle at element
i*N+j in resource instance i is bound to the memory instance
j.
The blocks of the memory that are bound to each sparse image block region
use an offset in memory, relative to `memoryOffset`, computed as if the
whole image was being bound to a contiguous range of memory.
In other words, horizontally adjacent image blocks use consecutive blocks of
memory, vertically adjacent image blocks are separated by the number of
bytes per block multiplied by the width in blocks of `image`, and the
block at (0,0) corresponds to memory starting at `memoryOffset`.

If `splitInstanceBindRegionCount` and `deviceIndexCount` are zero
and the memory comes from a memory heap with the
[VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](VkMemoryHeapFlagBits.html) bit set, then it is as if
`pDeviceIndices` contains consecutive indices from zero to the number of
physical devices in the logical device, minus one.
In other words, by default each physical device attaches to its own instance
of the memory.

If `splitInstanceBindRegionCount` and `deviceIndexCount` are zero
and the memory comes from a memory heap without the
[VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](VkMemoryHeapFlagBits.html) bit set, then it is as if
`pDeviceIndices` contains an array of zeros.
In other words, by default each physical device attaches to instance zero.

Valid Usage

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-deviceIndexCount-01633) VUID-VkBindImageMemoryDeviceGroupInfo-deviceIndexCount-01633

At least one of `deviceIndexCount` and
`splitInstanceBindRegionCount` **must** be zero

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-deviceIndexCount-01634) VUID-VkBindImageMemoryDeviceGroupInfo-deviceIndexCount-01634

`deviceIndexCount` **must** either be zero or equal to the number of
physical devices in the logical device

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-pDeviceIndices-01635) VUID-VkBindImageMemoryDeviceGroupInfo-pDeviceIndices-01635

All elements of `pDeviceIndices` **must** be valid device indices

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-splitInstanceBindRegionCount-01636) VUID-VkBindImageMemoryDeviceGroupInfo-splitInstanceBindRegionCount-01636

`splitInstanceBindRegionCount` **must** either be zero or equal to the
number of physical devices in the logical device squared

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-pSplitInstanceBindRegions-01637) VUID-VkBindImageMemoryDeviceGroupInfo-pSplitInstanceBindRegions-01637

Elements of `pSplitInstanceBindRegions` that correspond to the same
instance of an image **must** not overlap

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-offset-01638) VUID-VkBindImageMemoryDeviceGroupInfo-offset-01638

The `offset.x` member of any element of
`pSplitInstanceBindRegions` **must** be a multiple of the sparse image
block width
(`VkSparseImageFormatProperties`::`imageGranularity.width`) of
all non-metadata aspects of the image

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-offset-01639) VUID-VkBindImageMemoryDeviceGroupInfo-offset-01639

The `offset.y` member of any element of
`pSplitInstanceBindRegions` **must** be a multiple of the sparse image
block height
(`VkSparseImageFormatProperties`::`imageGranularity.height`) of
all non-metadata aspects of the image

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-extent-01640) VUID-VkBindImageMemoryDeviceGroupInfo-extent-01640

The `extent.width` member of any element of
`pSplitInstanceBindRegions` **must** either be a multiple of the sparse
image block width of all non-metadata aspects of the image, or else
`extent.width` +  `offset.x` **must** equal the width of the
image subresource

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-extent-01641) VUID-VkBindImageMemoryDeviceGroupInfo-extent-01641

The `extent.height` member of any element of
`pSplitInstanceBindRegions` **must** either be a multiple of the sparse
image block height of all non-metadata aspects of the image, or else
`extent.height` +  `offset.y` **must** equal the height of the
image subresource

Valid Usage (Implicit)

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-sType-sType) VUID-VkBindImageMemoryDeviceGroupInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_DEVICE_GROUP_INFO](VkStructureType.html)

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-pDeviceIndices-parameter) VUID-VkBindImageMemoryDeviceGroupInfo-pDeviceIndices-parameter

 If `deviceIndexCount` is not `0`, `pDeviceIndices` **must** be a valid pointer to an array of `deviceIndexCount` `uint32_t` values

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-pSplitInstanceBindRegions-parameter) VUID-VkBindImageMemoryDeviceGroupInfo-pSplitInstanceBindRegions-parameter

 If `splitInstanceBindRegionCount` is not `0`, `pSplitInstanceBindRegions` **must** be a valid pointer to an array of `splitInstanceBindRegionCount` [VkRect2D](VkRect2D.html) structures

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindImageMemoryInfo](VkBindImageMemoryInfo.html)

[VK_KHR_bind_memory2](VK_KHR_bind_memory2.html), [VK_KHR_device_group](VK_KHR_device_group.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkRect2D](VkRect2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBindImageMemoryDeviceGroupInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
