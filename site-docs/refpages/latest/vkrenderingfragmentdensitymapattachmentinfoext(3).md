# VkRenderingFragmentDensityMapAttachmentInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderingFragmentDensityMapAttachmentInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderingFragmentDensityMapAttachmentInfoEXT - Structure specifying fragment shading rate attachment information

The `VkRenderingFragmentDensityMapAttachmentInfoEXT` structure is
defined as:

// Provided by VK_EXT_fragment_density_map with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
typedef struct VkRenderingFragmentDensityMapAttachmentInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkImageView        imageView;
    VkImageLayout      imageLayout;
} VkRenderingFragmentDensityMapAttachmentInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageView` is the image view that will be used as a fragment
density map attachment.

* 
`imageLayout` is the layout that `imageView` will be in during
rendering.

This structure can be included in the `pNext` chain of
[VkRenderingInfo](VkRenderingInfo.html) to define a fragment density map.
If this structure is not included in the `pNext` chain, `imageView`
is treated as [VK_NULL_HANDLE](VK_NULL_HANDLE.html).

Valid Usage

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-06157) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-06157

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageLayout` **must**
be [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT](VkImageLayout.html)

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-06158) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-06158

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** have been
created with the [VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](VkImageUsageFlagBits.html) usage
flag set

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-06159) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-06159

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** not have been
created with [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-apiVersion-07908) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-apiVersion-07908

If
the [`multiview`](../../../../spec/latest/chapters/features.html#features-multiview) feature is not enabled,
[VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
1.1, and
`imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** have a
`layerCount` equal to `1`

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-sType-sType) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-parameter) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageView-parameter

 `imageView` **must** be a valid [VkImageView](VkImageView.html) handle

* 
[](#VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageLayout-parameter) VUID-VkRenderingFragmentDensityMapAttachmentInfoEXT-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderingInfo](VkRenderingInfo.html)

[VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html), [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkImageLayout](VkImageLayout.html), [VkImageView](VkImageView.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderingFragmentDensityMapAttachmentInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
