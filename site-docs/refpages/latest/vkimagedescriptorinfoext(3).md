# VkImageDescriptorInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageDescriptorInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageDescriptorInfoEXT - Structure describing an image descriptor created from an image

`VkImageDescriptorInfoEXT` is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkImageDescriptorInfoEXT {
    VkStructureType                 sType;
    const void*                     pNext;
    const VkImageViewCreateInfo*    pView;
    VkImageLayout                   layout;
} VkImageDescriptorInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pView` is an [VkImageViewCreateInfo](VkImageViewCreateInfo.html) describing the descriptor.

* 
`layout` is the [VkImageLayout](VkImageLayout.html) that the image view will be in
when accessed as a descriptor.

Valid Usage

* 
[](#VUID-VkImageDescriptorInfoEXT-pView-11426) VUID-VkImageDescriptorInfoEXT-pView-11426

`pView->viewType` **must** not be [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html) if
`pView->image` was created with an `imageType` of
[VK_IMAGE_TYPE_3D](VkImageType.html)

* 
[](#VUID-VkImageDescriptorInfoEXT-pView-11427) VUID-VkImageDescriptorInfoEXT-pView-11427

If `pView->viewType` is [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) and
`pView->image` was created with an `imageType` of
[VK_IMAGE_TYPE_3D](VkImageType.html), `pView->image` **must** have been created with
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](VkImageCreateFlagBits.html) set

* 
[](#VUID-VkImageDescriptorInfoEXT-layout-11219) VUID-VkImageDescriptorInfoEXT-layout-11219

`layout` **must** be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html),
or [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-VkImageDescriptorInfoEXT-layout-11221) VUID-VkImageDescriptorInfoEXT-layout-11221

    If `layout` is
    [VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html),
    [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
    [VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
    [VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
or
    [VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html), then
    `pView->aspectMask` **must** not include
    [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageDescriptorInfoEXT-pView-11430) VUID-VkImageDescriptorInfoEXT-pView-11430

If `pView->image` is a depth/stencil image,
`pView->subresourceRange.aspectMask` **must** include either
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html) but
not both

Valid Usage (Implicit)

* 
[](#VUID-VkImageDescriptorInfoEXT-sType-sType) VUID-VkImageDescriptorInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_DESCRIPTOR_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkImageDescriptorInfoEXT-pNext-pNext) VUID-VkImageDescriptorInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageDescriptorInfoEXT-pView-parameter) VUID-VkImageDescriptorInfoEXT-pView-parameter

 `pView` **must** be a valid pointer to a valid [VkImageViewCreateInfo](VkImageViewCreateInfo.html) structure

* 
[](#VUID-VkImageDescriptorInfoEXT-layout-parameter) VUID-VkImageDescriptorInfoEXT-layout-parameter

 `layout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkImageLayout](VkImageLayout.html), [VkImageViewCreateInfo](VkImageViewCreateInfo.html), [VkResourceDescriptorDataEXT](VkResourceDescriptorDataEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkImageDescriptorInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
