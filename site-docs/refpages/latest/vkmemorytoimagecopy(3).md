# VkMemoryToImageCopy(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryToImageCopy.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryToImageCopy - Structure specifying a host memory to image copy operation

Each element of [VkCopyMemoryToImageInfo](VkCopyMemoryToImageInfo.html)::`pRegions` is a structure
defined as:

// Provided by VK_VERSION_1_4
typedef struct VkMemoryToImageCopy {
    VkStructureType             sType;
    const void*                 pNext;
    const void*                 pHostPointer;
    uint32_t                    memoryRowLength;
    uint32_t                    memoryImageHeight;
    VkImageSubresourceLayers    imageSubresource;
    VkOffset3D                  imageOffset;
    VkExtent3D                  imageExtent;
} VkMemoryToImageCopy;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkMemoryToImageCopy
typedef VkMemoryToImageCopy VkMemoryToImageCopyEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pHostPointer` is the host memory address which is the source of the
copy.

* 
`memoryRowLength` and `memoryImageHeight` specify in texels a
subregion of a larger two- or three-dimensional image in host memory,
and control the addressing calculations.
If either of these values is zero, that aspect of the host memory is
considered to be tightly packed according to the `imageExtent`.

* 
`imageSubresource` is a [VkImageSubresourceLayers](VkImageSubresourceLayers.html) used to
specify the specific image subresources of the image used for the source
or destination image data.

* 
`imageOffset` selects the initial `x`, `y`, `z` offsets
in texels of the sub-region of the destination image data.

* 
`imageExtent` is the size in texels of the image to copy in
`width`, `height` and `depth`.

This structure is functionally similar to [VkBufferImageCopy2](VkBufferImageCopy2.html), except
it defines host memory as the source of copy instead of a buffer.
In particular, the same data packing rules and restrictions as that
structure apply here as well.

Valid Usage

* 
[](#VUID-VkMemoryToImageCopy-pHostPointer-09061) VUID-VkMemoryToImageCopy-pHostPointer-09061

`pHostPointer` **must** point to memory that is large enough to contain
all memory locations that are accessed according to
[Buffer and Image Addressing](../../../../spec/latest/chapters/copies.html#copies-buffers-images-addressing), for
each element of `pRegions`

* 
[](#VUID-VkMemoryToImageCopy-pRegions-09062) VUID-VkMemoryToImageCopy-pRegions-09062

The union of all source regions, and the union of all destination
regions, specified by the elements of `pRegions`, **must** not overlap
in memory

* 
[](#VUID-VkMemoryToImageCopy-memoryRowLength-09101) VUID-VkMemoryToImageCopy-memoryRowLength-09101

`memoryRowLength` **must** be `0`, or greater than or equal to the
`width` member of `imageExtent`

* 
[](#VUID-VkMemoryToImageCopy-memoryImageHeight-09102) VUID-VkMemoryToImageCopy-memoryImageHeight-09102

`memoryImageHeight` **must** be `0`, or greater than or equal to the
`height` member of `imageExtent`

* 
[](#VUID-VkMemoryToImageCopy-aspectMask-09103) VUID-VkMemoryToImageCopy-aspectMask-09103

The `aspectMask` member of `imageSubresource` **must** only have a
single bit set

* 
[](#VUID-VkMemoryToImageCopy-imageExtent-06659) VUID-VkMemoryToImageCopy-imageExtent-06659

`imageExtent.width` **must** not be 0

* 
[](#VUID-VkMemoryToImageCopy-imageExtent-06660) VUID-VkMemoryToImageCopy-imageExtent-06660

`imageExtent.height` **must** not be 0

* 
[](#VUID-VkMemoryToImageCopy-imageExtent-06661) VUID-VkMemoryToImageCopy-imageExtent-06661

`imageExtent.depth` **must** not be 0

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryToImageCopy-sType-sType) VUID-VkMemoryToImageCopy-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_TO_IMAGE_COPY](VkStructureType.html)

* 
[](#VUID-VkMemoryToImageCopy-pNext-pNext) VUID-VkMemoryToImageCopy-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryToImageCopy-pHostPointer-parameter) VUID-VkMemoryToImageCopy-pHostPointer-parameter

 `pHostPointer` **must** be a pointer value

* 
[](#VUID-VkMemoryToImageCopy-imageSubresource-parameter) VUID-VkMemoryToImageCopy-imageSubresource-parameter

 `imageSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkCopyMemoryToImageInfo](VkCopyMemoryToImageInfo.html), [VkExtent3D](VkExtent3D.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkOffset3D](VkOffset3D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkMemoryToImageCopy).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
