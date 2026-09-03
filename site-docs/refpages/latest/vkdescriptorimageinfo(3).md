# VkDescriptorImageInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorImageInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorImageInfo - Structure specifying descriptor image information

The `VkDescriptorImageInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorImageInfo {
    VkSampler        sampler;
    VkImageView      imageView;
    VkImageLayout    imageLayout;
} VkDescriptorImageInfo;

* 
`sampler` is a sampler handle, and is used in descriptor updates for
types [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html) and
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) if the binding being
updated does not use immutable samplers.

* 
`imageView` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) or
an image view handle, and is used in descriptor updates for types
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), and
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html).

* 
`imageLayout` is the layout that the image subresources accessible
from `imageView` will be in at the time this descriptor is accessed.
`imageLayout` is used in descriptor updates for types
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), and
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html).

Members of `VkDescriptorImageInfo` that are not used in an update (as
described above) are ignored.

Valid Usage

* 
[](#VUID-VkDescriptorImageInfo-imageView-06712) VUID-VkDescriptorImageInfo-imageView-06712

`imageView` **must** not be a 2D array image view created from a 3D
image

* 
[](#VUID-VkDescriptorImageInfo-imageView-07795) VUID-VkDescriptorImageInfo-imageView-07795

If `imageView` is a 2D view created from a 3D image, then
`descriptorType` **must** be [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html)

* 
[](#VUID-VkDescriptorImageInfo-imageView-07796) VUID-VkDescriptorImageInfo-imageView-07796

If `imageView` is a 2D view created from a 3D image, then the image
**must** have been created with
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](VkImageCreateFlagBits.html) set

* 
[](#VUID-VkDescriptorImageInfo-descriptorType-06713) VUID-VkDescriptorImageInfo-descriptorType-06713

If the [`image2DViewOf3D`](../../../../spec/latest/chapters/features.html#features-image2DViewOf3D) feature is
not enabled or `descriptorType` is not
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html) then
`imageView` **must** not be a 2D view created from a 3D image

* 
[](#VUID-VkDescriptorImageInfo-descriptorType-06714) VUID-VkDescriptorImageInfo-descriptorType-06714

If the [`sampler2DViewOf3D`](../../../../spec/latest/chapters/features.html#features-sampler2DViewOf3D) feature
is not enabled or `descriptorType` is not
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) then
`imageView` **must** not be a 2D view created from a 3D image

* 
[](#VUID-VkDescriptorImageInfo-imageView-01976) VUID-VkDescriptorImageInfo-imageView-01976

If `imageView` is created from a depth/stencil image, the
`aspectMask` used to create the `imageView` **must** include either
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html) but
not both

* 
[](#VUID-VkDescriptorImageInfo-imageLayout-09425) VUID-VkDescriptorImageInfo-imageLayout-09425

If `imageLayout` is [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html),
then the `aspectMask` used to create `imageView` **must** not
include either [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkDescriptorImageInfo-imageLayout-09426) VUID-VkDescriptorImageInfo-imageLayout-09426

If `imageLayout` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html), then the
`aspectMask` used to create `imageView` **must** not include
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkDescriptorImageInfo-sampler-01564) VUID-VkDescriptorImageInfo-sampler-01564

If `sampler` is used and the [VkFormat](VkFormat.html) of the image is a
[multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), the image **must** have been
created with [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html), and the
`aspectMask` of the `imageView` **must** be a valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkDescriptorImageInfo-mutableComparisonSamplers-04450) VUID-VkDescriptorImageInfo-mutableComparisonSamplers-04450

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`mutableComparisonSamplers`
is [VK_FALSE](VK_FALSE.html), then `sampler` **must** have been created with
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`compareEnable` set to [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorImageInfo-commonparent) VUID-VkDescriptorImageInfo-commonparent

 Both of `imageView`, and `sampler` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorDataEXT](VkDescriptorDataEXT.html), [VkImageLayout](VkImageLayout.html), [VkImageView](VkImageView.html), [VkSampler](VkSampler.html), [VkWriteDescriptorSet](VkWriteDescriptorSet.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorImageInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
