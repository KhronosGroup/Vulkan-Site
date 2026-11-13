# VkBufferImageCopy(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferImageCopy.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferImageCopy - Structure specifying a buffer image copy operation

For both [vkCmdCopyBufferToImage](vkCmdCopyBufferToImage.html) and [vkCmdCopyImageToBuffer](vkCmdCopyImageToBuffer.html), each
element of `pRegions` is a structure defined as:

// Provided by VK_VERSION_1_0
typedef struct VkBufferImageCopy {
    VkDeviceSize                bufferOffset;
    uint32_t                    bufferRowLength;
    uint32_t                    bufferImageHeight;
    VkImageSubresourceLayers    imageSubresource;
    VkOffset3D                  imageOffset;
    VkExtent3D                  imageExtent;
} VkBufferImageCopy;

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

Valid Usage

* 
[](#VUID-VkBufferImageCopy-bufferRowLength-09101) VUID-VkBufferImageCopy-bufferRowLength-09101

`bufferRowLength` **must** be `0`, or greater than or equal to the
`width` member of `imageExtent`

* 
[](#VUID-VkBufferImageCopy-bufferImageHeight-09102) VUID-VkBufferImageCopy-bufferImageHeight-09102

`bufferImageHeight` **must** be `0`, or greater than or equal to the
`height` member of `imageExtent`

* 
[](#VUID-VkBufferImageCopy-aspectMask-09103) VUID-VkBufferImageCopy-aspectMask-09103

The `aspectMask` member of `imageSubresource` **must** only have a
single bit set

* 
[](#VUID-VkBufferImageCopy-imageExtent-06659) VUID-VkBufferImageCopy-imageExtent-06659

`imageExtent.width` **must** not be 0

* 
[](#VUID-VkBufferImageCopy-imageExtent-06660) VUID-VkBufferImageCopy-imageExtent-06660

`imageExtent.height` **must** not be 0

* 
[](#VUID-VkBufferImageCopy-imageExtent-06661) VUID-VkBufferImageCopy-imageExtent-06661

`imageExtent.depth` **must** not be 0

Valid Usage (Implicit)

* 
[](#VUID-VkBufferImageCopy-imageSubresource-parameter) VUID-VkBufferImageCopy-imageSubresource-parameter

 `imageSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkDeviceSize`, [VkExtent3D](VkExtent3D.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkOffset3D](VkOffset3D.html), [vkCmdCopyBufferToImage](vkCmdCopyBufferToImage.html), [vkCmdCopyImageToBuffer](vkCmdCopyImageToBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkBufferImageCopy).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
