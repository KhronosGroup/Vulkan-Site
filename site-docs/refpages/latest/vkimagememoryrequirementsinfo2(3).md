# VkImageMemoryRequirementsInfo2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageMemoryRequirementsInfo2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageMemoryRequirementsInfo2 - (None)

The `VkImageMemoryRequirementsInfo2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkImageMemoryRequirementsInfo2 {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
} VkImageMemoryRequirementsInfo2;

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to VkImageMemoryRequirementsInfo2
typedef VkImageMemoryRequirementsInfo2 VkImageMemoryRequirementsInfo2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is the image to query.

Valid Usage

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-01589) VUID-VkImageMemoryRequirementsInfo2-image-01589

If `image` was created with a *multi-planar* format and the
[VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) flag, there **must** be a
[VkImagePlaneMemoryRequirementsInfo](VkImagePlaneMemoryRequirementsInfo.html) included in the `pNext`
chain of the [VkImageMemoryRequirementsInfo2](#) structure

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-02279) VUID-VkImageMemoryRequirementsInfo2-image-02279

If `image` was created with [VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) and
with [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), then there **must** be
a [VkImagePlaneMemoryRequirementsInfo](VkImagePlaneMemoryRequirementsInfo.html) included in the `pNext`
chain of the [VkImageMemoryRequirementsInfo2](#) structure

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-01590) VUID-VkImageMemoryRequirementsInfo2-image-01590

If `image` was not created with the
[VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) flag, there **must** not be a
[VkImagePlaneMemoryRequirementsInfo](VkImagePlaneMemoryRequirementsInfo.html) included in the `pNext`
chain of the [VkImageMemoryRequirementsInfo2](#) structure

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-02280) VUID-VkImageMemoryRequirementsInfo2-image-02280

If `image` was created with a single-plane format and with any
`tiling` other than [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html),
then there **must** not be a [VkImagePlaneMemoryRequirementsInfo](VkImagePlaneMemoryRequirementsInfo.html)
included in the `pNext` chain of the
[VkImageMemoryRequirementsInfo2](#) structure

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-01897) VUID-VkImageMemoryRequirementsInfo2-image-01897

If `image` was created with the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)
external memory handle type, then `image` **must** be bound to memory

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-08961) VUID-VkImageMemoryRequirementsInfo2-image-08961

If `image` was created with the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](VkExternalMemoryHandleTypeFlagBits.html) external
memory handle type, then `image` **must** be bound to memory

Valid Usage (Implicit)

* 
[](#VUID-VkImageMemoryRequirementsInfo2-sType-sType) VUID-VkImageMemoryRequirementsInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_MEMORY_REQUIREMENTS_INFO_2](VkStructureType.html)

* 
[](#VUID-VkImageMemoryRequirementsInfo2-pNext-pNext) VUID-VkImageMemoryRequirementsInfo2-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkImagePlaneMemoryRequirementsInfo](VkImagePlaneMemoryRequirementsInfo.html)

* 
[](#VUID-VkImageMemoryRequirementsInfo2-sType-unique) VUID-VkImageMemoryRequirementsInfo2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-parameter) VUID-VkImageMemoryRequirementsInfo2-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

[VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkImage](VkImage.html), [VkStructureType](VkStructureType.html), [vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html), [vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageMemoryRequirementsInfo2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
