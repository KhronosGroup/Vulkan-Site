# VkImageToMemoryCopy(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageToMemoryCopy.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageToMemoryCopy - Structure specifying an image to host memory copy operation

Each element of [VkCopyImageToMemoryInfo](VkCopyImageToMemoryInfo.html)::`pRegions` is a structure
defined as:

// Provided by VK_VERSION_1_4
typedef struct VkImageToMemoryCopy {
    VkStructureType             sType;
    const void*                 pNext;
    void*                       pHostPointer;
    uint32_t                    memoryRowLength;
    uint32_t                    memoryImageHeight;
    VkImageSubresourceLayers    imageSubresource;
    VkOffset3D                  imageOffset;
    VkExtent3D                  imageExtent;
} VkImageToMemoryCopy;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkImageToMemoryCopy
typedef VkImageToMemoryCopy VkImageToMemoryCopyEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pHostPointer` is the host memory address which is the destination
of the copy.

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
in texels of the sub-region of the source image data.

* 
`imageExtent` is the size in texels of the image to copy in
`width`, `height` and `depth`.

This structure is functionally similar to [VkBufferImageCopy2](VkBufferImageCopy2.html), except
it defines host memory as the target of copy instead of a buffer.
In particular, the same data packing rules and restrictions as that
structure apply here as well.

Valid Usage

* 
[](#VUID-VkImageToMemoryCopy-pHostPointer-09066) VUID-VkImageToMemoryCopy-pHostPointer-09066

`pHostPointer` **must** point to memory that is large enough to contain
all memory locations that are accessed according to
[Buffer and Image Addressing](../../../../spec/latest/chapters/copies.html#copies-buffers-images-addressing), for
each element of `pRegions`

* 
[](#VUID-VkImageToMemoryCopy-pRegions-09067) VUID-VkImageToMemoryCopy-pRegions-09067

The union of all source regions, and the union of all destination
regions, specified by the elements of `pRegions`, **must** not overlap
in memory

* 
[](#VUID-VkImageToMemoryCopy-memoryRowLength-09101) VUID-VkImageToMemoryCopy-memoryRowLength-09101

`memoryRowLength` **must** be `0`, or greater than or equal to the
`width` member of `imageExtent`

* 
[](#VUID-VkImageToMemoryCopy-memoryImageHeight-09102) VUID-VkImageToMemoryCopy-memoryImageHeight-09102

`memoryImageHeight` **must** be `0`, or greater than or equal to the
`height` member of `imageExtent`

* 
[](#VUID-VkImageToMemoryCopy-aspectMask-09103) VUID-VkImageToMemoryCopy-aspectMask-09103

The `aspectMask` member of `imageSubresource` **must** only have a
single bit set

* 
[](#VUID-VkImageToMemoryCopy-imageExtent-06659) VUID-VkImageToMemoryCopy-imageExtent-06659

`imageExtent.width` **must** not be 0

* 
[](#VUID-VkImageToMemoryCopy-imageExtent-06660) VUID-VkImageToMemoryCopy-imageExtent-06660

`imageExtent.height` **must** not be 0

* 
[](#VUID-VkImageToMemoryCopy-imageExtent-06661) VUID-VkImageToMemoryCopy-imageExtent-06661

`imageExtent.depth` **must** not be 0

Valid Usage (Implicit)

* 
[](#VUID-VkImageToMemoryCopy-sType-sType) VUID-VkImageToMemoryCopy-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_TO_MEMORY_COPY](VkStructureType.html)

* 
[](#VUID-VkImageToMemoryCopy-pNext-pNext) VUID-VkImageToMemoryCopy-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageToMemoryCopy-pHostPointer-parameter) VUID-VkImageToMemoryCopy-pHostPointer-parameter

 `pHostPointer` **must** be a pointer value

* 
[](#VUID-VkImageToMemoryCopy-imageSubresource-parameter) VUID-VkImageToMemoryCopy-imageSubresource-parameter

 `imageSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkCopyImageToMemoryInfo](VkCopyImageToMemoryInfo.html), [VkExtent3D](VkExtent3D.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkOffset3D](VkOffset3D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkImageToMemoryCopy).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
