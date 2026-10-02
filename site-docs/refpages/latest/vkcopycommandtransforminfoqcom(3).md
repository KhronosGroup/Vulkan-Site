# VkCopyCommandTransformInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyCommandTransformInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyCommandTransformInfoQCOM - Structure describing transform parameters of rotated copy command

The `VkCopyCommandTransformInfoQCOM` structure is defined as:

// Provided by VK_QCOM_rotated_copy_commands
typedef struct VkCopyCommandTransformInfoQCOM {
    VkStructureType                  sType;
    const void*                      pNext;
    VkSurfaceTransformFlagBitsKHR    transform;
} VkCopyCommandTransformInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`transform` is a [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html) value
describing the transform to be applied.

Including this structure in the `pNext` chain of
[VkBufferImageCopy2](VkBufferImageCopy2.html) defines a rotation to be performed when copying
between an image and a buffer.
Including this structure in the `pNext` chain of [VkBlitImageInfo2](VkBlitImageInfo2.html)
defines a rotation to be performed when blitting between two images.
If this structure is not specified in either case, the implementation
behaves as if it was specified with a `transform` equal to
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html).

Specifying a transform for a copy between an image and a buffer
[rotates the region accessed in the image around the offset](../../../../spec/latest/chapters/copies.html#copies-buffers-images-rotation-addressing).
Specifying a transform for a blit performs a similar transform as described
in [Image Blits with Scaling and Rotation](../../../../spec/latest/chapters/copies.html#copies-images-scaling-rotation).

Rotations other than [VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html) **can** only
be specified for single-plane 2D images with a 1x1x1
[texel block extent](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes).

Valid Usage

* 
[](#VUID-VkCopyCommandTransformInfoQCOM-transform-04560) VUID-VkCopyCommandTransformInfoQCOM-transform-04560

`transform` **must** be [VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkCopyCommandTransformInfoQCOM-sType-sType) VUID-VkCopyCommandTransformInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_COMMAND_TRANSFORM_INFO_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferImageCopy2](VkBufferImageCopy2.html)

* 
[VkDeviceMemoryImageCopyKHR](VkDeviceMemoryImageCopyKHR.html)

* 
[VkImageBlit2](VkImageBlit2.html)

[VK_QCOM_rotated_copy_commands](VK_QCOM_rotated_copy_commands.html), [VkStructureType](VkStructureType.html), [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkCopyCommandTransformInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
