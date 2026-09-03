# VkImageView(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageView.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageView - Opaque handle to an image view object

Image objects are not directly accessed by pipeline shaders for reading or
writing image data.
Instead, *image views* representing contiguous ranges of the image
subresources and containing additional metadata are used for that purpose.
Views **must** be created on images of compatible types, and **must** represent a
valid subset of image subresources.

Image views are represented by `VkImageView` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkImageView)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorImageInfo](VkDescriptorImageInfo.html), [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html), [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html), [VkImageViewCaptureDescriptorDataInfoEXT](VkImageViewCaptureDescriptorDataInfoEXT.html), [VkImageViewHandleInfoNVX](VkImageViewHandleInfoNVX.html), [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html), [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html), [VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html), [VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html), [VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html), [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html), [vkBindOpticalFlowSessionImageNV](vkBindOpticalFlowSessionImageNV.html), [vkCmdBindInvocationMaskHUAWEI](vkCmdBindInvocationMaskHUAWEI.html), [vkCmdBindShadingRateImageNV](vkCmdBindShadingRateImageNV.html), [vkCreateImageView](vkCreateImageView.html), [vkDestroyImageView](vkDestroyImageView.html), [vkGetImageViewAddressNVX](vkGetImageViewAddressNVX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageView).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
