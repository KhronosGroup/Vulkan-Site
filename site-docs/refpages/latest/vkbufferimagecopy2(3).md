# VkBufferImageCopy2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferImageCopy2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferImageCopy2 - Structure specifying a buffer image copy operation

For both [vkCmdCopyBufferToImage2](vkCmdCopyBufferToImage2.html) and [vkCmdCopyImageToBuffer2](vkCmdCopyImageToBuffer2.html),
each element of `pRegions` is a structure defined as:

// Provided by VK_VERSION_1_3
typedef struct VkBufferImageCopy2 {
    VkStructureType             sType;
    const void*                 pNext;
    VkDeviceSize                bufferOffset;
    uint32_t                    bufferRowLength;
    uint32_t                    bufferImageHeight;
    VkImageSubresourceLayers    imageSubresource;
    VkOffset3D                  imageOffset;
    VkExtent3D                  imageExtent;
} VkBufferImageCopy2;

// Provided by VK_KHR_copy_commands2
// Equivalent to VkBufferImageCopy2
typedef VkBufferImageCopy2 VkBufferImageCopy2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`bufferOffset` is the offset in bytes from the start of the buffer
object where the image data is copied from or to.

* 
`bufferRowLength` and `bufferImageHeight` specify in texels a
subregion of a larger two- or three-dimensional image in buffer memory,
and control the addressing calculations.
If either of these values is zero, that aspect of the buffer memory is
considered to be tightly packed according to the `imageExtent`.

* 
`imageSubresource` is a [VkImageSubresourceLayers](VkImageSubresourceLayers.html) used to
specify the specific image subresources of the image used for the source
or destination image data.

* 
`imageOffset` selects the initial `x`, `y`, `z` offsets
in texels of the sub-region of the source or destination image data.

* 
`imageExtent` is the size in texels of the image to copy in
`width`, `height` and `depth`.

This structure is functionally identical to [VkBufferImageCopy](VkBufferImageCopy.html), but
adds `sType` and `pNext` parameters, allowing it to be more easily
extended.

Valid Usage

* 
[](#VUID-VkBufferImageCopy2-bufferRowLength-09101) VUID-VkBufferImageCopy2-bufferRowLength-09101

`bufferRowLength` **must** be `0`, or greater than or equal to the
`width` member of `imageExtent`

* 
[](#VUID-VkBufferImageCopy2-bufferImageHeight-09102) VUID-VkBufferImageCopy2-bufferImageHeight-09102

`bufferImageHeight` **must** be `0`, or greater than or equal to the
`height` member of `imageExtent`

* 
[](#VUID-VkBufferImageCopy2-aspectMask-09103) VUID-VkBufferImageCopy2-aspectMask-09103

The `aspectMask` member of `imageSubresource` **must** only have a
single bit set

* 
[](#VUID-VkBufferImageCopy2-imageExtent-06659) VUID-VkBufferImageCopy2-imageExtent-06659

`imageExtent.width` **must** not be 0

* 
[](#VUID-VkBufferImageCopy2-imageExtent-06660) VUID-VkBufferImageCopy2-imageExtent-06660

`imageExtent.height` **must** not be 0

* 
[](#VUID-VkBufferImageCopy2-imageExtent-06661) VUID-VkBufferImageCopy2-imageExtent-06661

`imageExtent.depth` **must** not be 0

Valid Usage (Implicit)

* 
[](#VUID-VkBufferImageCopy2-sType-sType) VUID-VkBufferImageCopy2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_IMAGE_COPY_2](VkStructureType.html)

* 
[](#VUID-VkBufferImageCopy2-pNext-pNext) VUID-VkBufferImageCopy2-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)

* 
[](#VUID-VkBufferImageCopy2-sType-unique) VUID-VkBufferImageCopy2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBufferImageCopy2-imageSubresource-parameter) VUID-VkBufferImageCopy2-imageSubresource-parameter

 `imageSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCopyBufferToImageInfo2](VkCopyBufferToImageInfo2.html), [VkCopyImageToBufferInfo2](VkCopyImageToBufferInfo2.html), `VkDeviceSize`, [VkExtent3D](VkExtent3D.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkOffset3D](VkOffset3D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkBufferImageCopy2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
