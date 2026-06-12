# VkImageAlignmentControlCreateInfoMESA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageAlignmentControlCreateInfoMESA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageAlignmentControlCreateInfoMESA - Specify image alignment

If the `pNext` list of [VkImageCreateInfo](VkImageCreateInfo.html) includes a
`VkImageAlignmentControlCreateInfoMESA` structure, then that structure
describes desired alignment for this image.

The `VkImageAlignmentControlCreateInfoMESA` structure is defined as:

// Provided by VK_MESA_image_alignment_control
typedef struct VkImageAlignmentControlCreateInfoMESA {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           maximumRequestedAlignment;
} VkImageAlignmentControlCreateInfoMESA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maximumRequestedAlignment` specifies the maximum alignment for the
image.

If `maximumRequestedAlignment` is not 0, the implementation **should**
choose an image memory layout that requires an alignment no larger than
`maximumRequestedAlignment` as reported in
[VkMemoryRequirements](VkMemoryRequirements.html)::`alignment`.
If such a layout does not exist for the given image creation parameters, the
implementation **should** return the smallest alignment which is supported in
[VkMemoryRequirements](VkMemoryRequirements.html).

If an implementation needs to disable image compression for
`maximumRequestedAlignment` to be honored - where a larger alignment
would enable image compression - the implementation **should** not use
`maximumRequestedAlignment`, and **should** return the smallest alignment
which does not compromise compression.
If the [`imageCompressionControl`](../../../../spec/latest/chapters/features.html#features-imageCompressionControl)
feature is enabled, the application **can** chain a
[VkImageCompressionControlEXT](VkImageCompressionControlEXT.html) with
[VK_IMAGE_COMPRESSION_DISABLED_EXT](VkImageCompressionFlagBitsEXT.html).
In this case, image compression considerations **should** not apply when
implementation decides alignment.

Valid Usage

* 
[](#VUID-VkImageAlignmentControlCreateInfoMESA-maximumRequestedAlignment-09655) VUID-VkImageAlignmentControlCreateInfoMESA-maximumRequestedAlignment-09655

If `maximumRequestedAlignment` is not 0,
`maximumRequestedAlignment` **must** be a power of two

* 
[](#VUID-VkImageAlignmentControlCreateInfoMESA-maximumRequestedAlignment-09656) VUID-VkImageAlignmentControlCreateInfoMESA-maximumRequestedAlignment-09656

If `maximumRequestedAlignment` is not 0, the bitwise-and of
`maximumRequestedAlignment` and
[`supportedImageAlignmentMask`](../../../../spec/latest/chapters/limits.html#limits-supportedImageAlignmentMask)
**must** be non-zero

* 
[](#VUID-VkImageAlignmentControlCreateInfoMESA-imageAlignmentControl-09657) VUID-VkImageAlignmentControlCreateInfoMESA-imageAlignmentControl-09657

[`imageAlignmentControl`](../../../../spec/latest/chapters/features.html#features-imageAlignmentControl) **must** be
enabled

Valid Usage (Implicit)

* 
[](#VUID-VkImageAlignmentControlCreateInfoMESA-sType-sType) VUID-VkImageAlignmentControlCreateInfoMESA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_ALIGNMENT_CONTROL_CREATE_INFO_MESA](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

[VK_MESA_image_alignment_control](VK_MESA_image_alignment_control.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageAlignmentControlCreateInfoMESA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
