# VkCopyMemoryToImageIndirectInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyMemoryToImageIndirectInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyMemoryToImageIndirectInfoKHR - Parameters describing indirect image copy parameters

The [VkCopyMemoryToImageIndirectInfoKHR](#) structure is defined as:

// Provided by VK_KHR_copy_memory_indirect
typedef struct VkCopyMemoryToImageIndirectInfoKHR {
    VkStructureType                    sType;
    const void*                        pNext;
    VkAddressCopyFlagsKHR              srcCopyFlags;
    uint32_t                           copyCount;
    VkStridedDeviceAddressRangeKHR     copyAddressRange;
    VkImage                            dstImage;
    VkImageLayout                      dstImageLayout;
    const VkImageSubresourceLayers*    pImageSubresources;
} VkCopyMemoryToImageIndirectInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcCopyFlags` is a [VkAddressCopyFlagsKHR](VkAddressCopyFlagsKHR.html) value defining the
copy flags for the source address range.

* 
`copyCount` is the number of copies to execute, and **can** be zero.

* 
`copyAddressRange` is a memory region specifying the copy
parameters.
It is laid out as an array of
[VkCopyMemoryToImageIndirectCommandKHR](VkCopyMemoryToImageIndirectCommandKHR.html) structures.

* 
`dstImage` is the destination image.

* 
`dstImageLayout` is the layout of the destination image subresources
for the copy.

* 
`pImageSubresources` is a pointer to an array of `copyCount`
[VkImageSubresourceLayers](VkImageSubresourceLayers.html) structures, specifying the image
subresources of the destination image data for the copy operation.

Valid Usage

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-srcCopyFlags-10950) VUID-VkCopyMemoryToImageIndirectInfoKHR-srcCopyFlags-10950

If `srcCopyFlags` contains [VK_ADDRESS_COPY_SPARSE_BIT_KHR](VkAddressCopyFlagBitsKHR.html), the
source memory regions accessed **must** be [bound to    memory](../../../../spec/latest/chapters/sparsemem.html#sparsememory)

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-copyCount-10951) VUID-VkCopyMemoryToImageIndirectInfoKHR-copyCount-10951

`copyCount` **must** be less than or equal to
`copyAddressRange.size` / `copyAddressRange.stride`

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-copyAddressRange-10952) VUID-VkCopyMemoryToImageIndirectInfoKHR-copyAddressRange-10952

`copyAddressRange.address` **must** be 4 byte aligned

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-copyAddressRange-10953) VUID-VkCopyMemoryToImageIndirectInfoKHR-copyAddressRange-10953

`copyAddressRange.stride` **must** be a multiple of `4` and **must** be
greater than or equal to
sizeof([VkCopyMemoryToImageIndirectCommandKHR](VkCopyMemoryToImageIndirectCommandKHR.html))

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-10955) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-10955

The format features of `dstImage` **must** contain
[VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-copyAddressRange-12213) VUID-VkCopyMemoryToImageIndirectInfoKHR-copyAddressRange-12213

`copyAddressRange` **must** be a device address range allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-07661) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-07661

`dstImage` **must** not be a protected image

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-aspectMask-07662) VUID-VkCopyMemoryToImageIndirectInfoKHR-aspectMask-07662

The `aspectMask` member for every subresource in
`pImageSubresources` **must** only have a single bit set

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-aspectMask-12287) VUID-VkCopyMemoryToImageIndirectInfoKHR-aspectMask-12287

The `aspectMask` member for every subresource in
`pImageSubresources` **must** specify an aspect present in
`dstImage`

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-07664) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-07664

`dstImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-07665) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-07665

If `dstImage` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-07973) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-07973

`dstImage` **must** have a sample count equal to
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImageLayout-07667) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImageLayout-07667

`dstImageLayout` **must** specify the layout of the image subresources
of `dstImage` at the time this command is executed on a
`VkDevice`

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImageLayout-07669) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImageLayout-07669

`dstImageLayout` **must** be
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
or [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-mipLevel-07670) VUID-VkCopyMemoryToImageIndirectInfoKHR-mipLevel-07670

The specified `mipLevel` of each region in `pImageSubresources`
**must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-12288) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-12288

If `dstImage` is not of type [VK_IMAGE_TYPE_3D](VkImageType.html), and the
specified `layerCount` of each region in `pImageSubresources` is
not [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), the specified `baseArrayLayer`
+  `layerCount` of each region in `pImageSubresources` **must**
be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-12289) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-12289

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), and the specified
`layerCount` of each region in `pImageSubresources` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), for each destination region,
(`imageSubresource.baseArrayLayer` + 
`imageSubresource.layerCount`) **must** be less than or equal to the
depth of the specified subresource

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-12290) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-12290

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), and the specified
`layerCount` of each region in `pImageSubresources` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), for each destination region, if
(`imageSubresource.baseArrayLayer` + 
`imageSubresource.layerCount`) does not equal the depth of the
specified subresource, `imageSubresource.layerCount` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-12291) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-12291

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), for each
destination region, `imageSubresource.baseArrayLayer` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-12292) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-12292

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), for each
destination region, `imageSubresource.baseArrayLayer` **must** be less
than or equal to the depth of the specified subresource

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-07673) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-07673

`dstImage` **must** not have been created with `flags` containing
[VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-commandBuffer-07674) VUID-VkCopyMemoryToImageIndirectInfoKHR-commandBuffer-07674

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), for each region, the `aspectMask`
member of `pImageSubresources` **must** not be
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-10974) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-10974

The format features of `dstImage` **must** contain
[VK_FORMAT_FEATURE_TRANSFER_DST_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-copyAddressRange-10975) VUID-VkCopyMemoryToImageIndirectInfoKHR-copyAddressRange-10975

Any of the source or destination memory regions specified in
`copyAddressRange` **must** not overlap with any of the specified
destination memory regions at the time this command is executed on
device

Valid Usage (Implicit)

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-sType-sType) VUID-VkCopyMemoryToImageIndirectInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_MEMORY_TO_IMAGE_INDIRECT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-pNext-pNext) VUID-VkCopyMemoryToImageIndirectInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-srcCopyFlags-parameter) VUID-VkCopyMemoryToImageIndirectInfoKHR-srcCopyFlags-parameter

 `srcCopyFlags` **must** be a valid combination of [VkAddressCopyFlagBitsKHR](VkAddressCopyFlagBitsKHR.html) values

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-parameter) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImage-parameter

 `dstImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImageLayout-parameter) VUID-VkCopyMemoryToImageIndirectInfoKHR-dstImageLayout-parameter

 `dstImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-pImageSubresources-parameter) VUID-VkCopyMemoryToImageIndirectInfoKHR-pImageSubresources-parameter

 `pImageSubresources` **must** be a valid pointer to an array of `copyCount` valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structures

* 
[](#VUID-VkCopyMemoryToImageIndirectInfoKHR-copyCount-arraylength) VUID-VkCopyMemoryToImageIndirectInfoKHR-copyCount-arraylength

 `copyCount` **must** be greater than `0`

[VK_KHR_copy_memory_indirect](VK_KHR_copy_memory_indirect.html), [VkAddressCopyFlagsKHR](VkAddressCopyFlagsKHR.html), [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html), [VkStructureType](VkStructureType.html), [vkCmdCopyMemoryToImageIndirectKHR](vkCmdCopyMemoryToImageIndirectKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkCopyMemoryToImageIndirectInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
