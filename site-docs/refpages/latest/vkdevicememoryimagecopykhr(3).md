# VkDeviceMemoryImageCopyKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceMemoryImageCopyKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceMemoryImageCopyKHR - Structure specifying a copy operation between a memory range and texels in an image

The `VkDeviceMemoryImageCopyKHR` structure is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkDeviceMemoryImageCopyKHR {
    VkStructureType             sType;
    const void*                 pNext;
    VkDeviceAddressRangeKHR     addressRange;
    VkAddressCommandFlagsKHR    addressFlags;
    uint32_t                    addressRowLength;
    uint32_t                    addressImageHeight;
    VkImageSubresourceLayers    imageSubresource;
    VkImageLayout               imageLayout;
    VkOffset3D                  imageOffset;
    VkExtent3D                  imageExtent;
} VkDeviceMemoryImageCopyKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`addressRange` is a [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) structure defining
the address range accessed by the copy operation.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining
the copy flags for the source address range.

* 
`addressRowLength` specifies the total number of texels in the
address range representing a row of texels in the x dimension.
Each new row of pixels in the copy will be read at an offset increment
by this number of texels.

* 
`addressImageHeight` specifies the total number of rows of texels in
the address range representing a 2D slice of texels in the x and y
dimensions.
Each new 2D slice of pixels in the copy will be read at an offset
increment by this number of rows of texels.

* 
`imageSubresource` is a [VkImageSubresourceLayers](VkImageSubresourceLayers.html) used to
specify the specific image subresources of the image used for the source
or destination image data.

* 
`imageLayout` is the [VkImageLayout](VkImageLayout.html) of the image subresource
accessed by this copy.

* 
`imageOffset` selects the initial `x`, `y`, `z` offsets
in texels of the sub-region of the source or destination image data.

* 
`imageExtent` is the size in texels of the image to copy in
`width`, `height` and `depth`.

This structure defines a copy operation where `srcRange.size` bytes will
be copied from `srcRange.address` to `dstRange.address`.

Valid Usage

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-addressRange-13097) VUID-VkDeviceMemoryImageCopyKHR-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-addressRange-13098) VUID-VkDeviceMemoryImageCopyKHR-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-addressRange-13099) VUID-VkDeviceMemoryImageCopyKHR-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-addressFlags-13100) VUID-VkDeviceMemoryImageCopyKHR-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-addressRange-13122) VUID-VkDeviceMemoryImageCopyKHR-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-addressRange-13123) VUID-VkDeviceMemoryImageCopyKHR-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-addressFlags-13101) VUID-VkDeviceMemoryImageCopyKHR-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-addressRange-13124) VUID-VkDeviceMemoryImageCopyKHR-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-addressRange-13125) VUID-VkDeviceMemoryImageCopyKHR-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-size-13037) VUID-VkDeviceMemoryImageCopyKHR-size-13037

The `size` member of `addressRange` **must** be large enough to
contain all address locations that are accessed by this copy according
to [Buffer and Image Addressing](../../../../spec/latest/chapters/copies.html#copies-buffers-images-addressing)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-addressRowLength-09101) VUID-VkDeviceMemoryImageCopyKHR-addressRowLength-09101

`addressRowLength` **must** be `0`, or greater than or equal to the
`width` member of `imageExtent`

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-addressImageHeight-09102) VUID-VkDeviceMemoryImageCopyKHR-addressImageHeight-09102

`addressImageHeight` **must** be `0`, or greater than or equal to the
`height` member of `imageExtent`

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-aspectMask-09103) VUID-VkDeviceMemoryImageCopyKHR-aspectMask-09103

The `aspectMask` member of `imageSubresource` **must** only have a
single bit set

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-imageExtent-06659) VUID-VkDeviceMemoryImageCopyKHR-imageExtent-06659

`imageExtent.width` **must** not be 0

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-imageExtent-06660) VUID-VkDeviceMemoryImageCopyKHR-imageExtent-06660

`imageExtent.height` **must** not be 0

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-imageExtent-06661) VUID-VkDeviceMemoryImageCopyKHR-imageExtent-06661

`imageExtent.depth` **must** not be 0

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-sType-sType) VUID-VkDeviceMemoryImageCopyKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_MEMORY_IMAGE_COPY_KHR](VkStructureType.html)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-pNext-pNext) VUID-VkDeviceMemoryImageCopyKHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkCopyCommandTransformInfoQCOM](VkCopyCommandTransformInfoQCOM.html)

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-sType-unique) VUID-VkDeviceMemoryImageCopyKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-addressFlags-parameter) VUID-VkDeviceMemoryImageCopyKHR-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-imageSubresource-parameter) VUID-VkDeviceMemoryImageCopyKHR-imageSubresource-parameter

 `imageSubresource` **must** be a valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structure

* 
[](#VUID-VkDeviceMemoryImageCopyKHR-imageLayout-parameter) VUID-VkDeviceMemoryImageCopyKHR-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkCopyDeviceMemoryImageInfoKHR](VkCopyDeviceMemoryImageInfoKHR.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkExtent3D](VkExtent3D.html), [VkImageLayout](VkImageLayout.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html), [VkOffset3D](VkOffset3D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkDeviceMemoryImageCopyKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
