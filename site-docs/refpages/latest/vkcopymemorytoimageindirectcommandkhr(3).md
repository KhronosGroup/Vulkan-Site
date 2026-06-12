# VkCopyMemoryToImageIndirectCommandKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyMemoryToImageIndirectCommandKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyMemoryToImageIndirectCommandKHR - Structure specifying indirect memory region to image copy operation

The structure describing source and destination memory regions,
`VkCopyMemoryToImageIndirectCommandKHR` is defined as:

// Provided by VK_KHR_copy_memory_indirect
typedef struct VkCopyMemoryToImageIndirectCommandKHR {
    VkDeviceAddress             srcAddress;
    uint32_t                    bufferRowLength;
    uint32_t                    bufferImageHeight;
    VkImageSubresourceLayers    imageSubresource;
    VkOffset3D                  imageOffset;
    VkExtent3D                  imageExtent;
} VkCopyMemoryToImageIndirectCommandKHR;

// Provided by VK_NV_copy_memory_indirect
// Equivalent to VkCopyMemoryToImageIndirectCommandKHR
typedef VkCopyMemoryToImageIndirectCommandKHR VkCopyMemoryToImageIndirectCommandNV;

* 
`srcAddress` is the starting address of the source device memory to
copy from.

* 
`bufferRowLength` and `bufferImageHeight` specify in texels a
subregion of a larger two- or three-dimensional image in buffer memory,
and control the addressing calculations.
If either of these values is zero, that aspect of the buffer memory is
considered to be tightly packed according to the `imageExtent`.

* 
`imageSubresource` is a [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure
used to specify the specific image subresources of the image used for
the destination image data, which **must** match the value specified in
corresponding index of the
`pCopyMemoryToImageIndirectInfo->pImageSubresources` array of
[vkCmdCopyMemoryToImageIndirectKHR](vkCmdCopyMemoryToImageIndirectKHR.html) during command recording.

* 
`imageOffset` selects the initial `x`, `y`, `z` offsets
in texels of the sub-region of the destination image data.

* 
`imageExtent` is the size in texels of the destination image in
`width`, `height` and `depth`.

Valid Usage

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-srcAddress-10963) VUID-VkCopyMemoryToImageIndirectCommandKHR-srcAddress-10963

The `srcAddress` **must** be 4 byte aligned

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-dstImage-12282) VUID-VkCopyMemoryToImageIndirectCommandKHR-dstImage-12282

If `dstImage` does not have either a depth/stencil format
or a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion),
`srcAddress` **must** be a multiple of the
[texel block size](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes)

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-dstImage-12283) VUID-VkCopyMemoryToImageIndirectCommandKHR-dstImage-12283

If `dstImage` has a
[multi-planar format](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion),
`srcAddress` **must** be a multiple of the element size of the
compatible format for the format and the `aspectMask` of the
`imageSubresource` as defined in [Compatible Formats of Planes of Multi-Planar Formats](../../../../spec/latest/chapters/formats.html#formats-compatible-planes)

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-bufferRowLength-10964) VUID-VkCopyMemoryToImageIndirectCommandKHR-bufferRowLength-10964

`bufferRowLength` **must** be `0`, or greater than or equal to the
`width` member of `imageExtent`

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-bufferImageHeight-10965) VUID-VkCopyMemoryToImageIndirectCommandKHR-bufferImageHeight-10965

`bufferImageHeight` **must** be `0`, or greater than or equal to the
`height` member of `imageExtent`

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-imageOffset-10966) VUID-VkCopyMemoryToImageIndirectCommandKHR-imageOffset-10966

`imageOffset` **must** specify a valid offset in the destination image

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-imageExtent-10967) VUID-VkCopyMemoryToImageIndirectCommandKHR-imageExtent-10967

`imageExtent` **must** specify a valid region in the destination image
and **can** be `0`

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-srcAddress-10968) VUID-VkCopyMemoryToImageIndirectCommandKHR-srcAddress-10968

The memory region starting at `srcAddress` and described by
`bufferRowLength` and `bufferImageHeight` **must** not exceed the
bounds of the memory allocation backing memory at `srcAddress`

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-imageOffset-10969) VUID-VkCopyMemoryToImageIndirectCommandKHR-imageOffset-10969

The `imageOffset` and `imageExtent` members of each region **must**
respect the image transfer granularity requirements of
`commandBuffer`’s command pool’s queue family, as described in
[VkQueueFamilyProperties](VkQueueFamilyProperties.html)

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-imageOffset-10970) VUID-VkCopyMemoryToImageIndirectCommandKHR-imageOffset-10970

For each destination region, `imageOffset.x` and
(`imageExtent.width` +  `imageOffset.x`) **must** both be
greater than or equal to `0` and less than or equal to the width of the
specified subresource

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-imageOffset-10971) VUID-VkCopyMemoryToImageIndirectCommandKHR-imageOffset-10971

For each destination region, `imageOffset.y` and
(`imageExtent.height` +  `imageOffset.y`) **must** both
be greater than or equal to `0` and less than or equal to the height of
the specified subresource

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-imageSubresource-12284) VUID-VkCopyMemoryToImageIndirectCommandKHR-imageSubresource-12284

The members of `imageSubresource` **must** be identical to the members
of the [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure specified in the
corresponding index of the
`pCopyMemoryToImageIndirectInfo->pImageSubresources` array of
[vkCmdCopyMemoryToImageIndirectKHR](vkCmdCopyMemoryToImageIndirectKHR.html) during command recording

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-dstImage-12285) VUID-VkCopyMemoryToImageIndirectCommandKHR-dstImage-12285

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), `imageOffset.y`
**must** be `0` and `imageExtent.height` **must** be `1`

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-dstImage-12286) VUID-VkCopyMemoryToImageIndirectCommandKHR-dstImage-12286

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), `imageOffset.z` **must** be `0` and
`imageExtent.depth` **must** be `1`

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-srcAddress-12214) VUID-VkCopyMemoryToImageIndirectCommandKHR-srcAddress-12214

`srcAddress` **must** be a device address allocated to the application
from a buffer created with the [VK_BUFFER_USAGE_TRANSFER_SRC_BIT](VkBufferUsageFlagBits.html)
usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-srcAddress-parameter) VUID-VkCopyMemoryToImageIndirectCommandKHR-srcAddress-parameter

 `srcAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkCopyMemoryToImageIndirectCommandKHR-imageSubresource-parameter) VUID-VkCopyMemoryToImageIndirectCommandKHR-imageSubresource-parameter

 `imageSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

[VK_KHR_copy_memory_indirect](VK_KHR_copy_memory_indirect.html), [VK_NV_copy_memory_indirect](VK_NV_copy_memory_indirect.html), `VkDeviceAddress`, [VkExtent3D](VkExtent3D.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkOffset3D](VkOffset3D.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkCopyMemoryToImageIndirectCommandKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
