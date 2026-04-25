# VkImage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImage.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImage - Opaque handle to an image object

Images are specialized resources that have multi-dimensional access, as
outlined in the [Images](../../../../spec/latest/chapters/images.html#images) chapter.
Images **can** be used for various purposes, such as [rendering attachments](../../../../spec/latest/chapters/renderpass.html#renderpass), [for copy operations](../../../../spec/latest/chapters/copies.html#copies), or accessed through shaders
via [resource descriptors](../../../../spec/latest/chapters/descriptors.html#descriptors).

Images are represented by `VkImage` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkImage)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html), [VkBlitImageInfo2](VkBlitImageInfo2.html), [VkCopyBufferToImageInfo2](VkCopyBufferToImageInfo2.html), [VkCopyDeviceMemoryImageInfoKHR](VkCopyDeviceMemoryImageInfoKHR.html), [VkCopyImageInfo2](VkCopyImageInfo2.html), [VkCopyImageToBufferInfo2](VkCopyImageToBufferInfo2.html), [VkCopyImageToImageInfo](VkCopyImageToImageInfo.html), [VkCopyImageToMemoryInfo](VkCopyImageToMemoryInfo.html), [VkCopyMemoryToImageIndirectInfoKHR](VkCopyMemoryToImageIndirectInfoKHR.html), [VkCopyMemoryToImageInfo](VkCopyMemoryToImageInfo.html), [VkDedicatedAllocationMemoryAllocateInfoNV](VkDedicatedAllocationMemoryAllocateInfoNV.html), [VkExportMetalIOSurfaceInfoEXT](VkExportMetalIOSurfaceInfoEXT.html), [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html), [VkFrameBoundaryEXT](VkFrameBoundaryEXT.html), [VkHostImageLayoutTransitionInfo](VkHostImageLayoutTransitionInfo.html), [VkImageCaptureDescriptorDataInfoEXT](VkImageCaptureDescriptorDataInfoEXT.html), [VkImageMemoryBarrier](VkImageMemoryBarrier.html), [VkImageMemoryBarrier2](VkImageMemoryBarrier2.html), [VkImageMemoryRequirementsInfo2](VkImageMemoryRequirementsInfo2.html), [VkImageSparseMemoryRequirementsInfo2](VkImageSparseMemoryRequirementsInfo2.html), [VkImageViewCreateInfo](VkImageViewCreateInfo.html), [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html), [VkResolveImageInfo2](VkResolveImageInfo2.html), [VkSparseImageMemoryBindInfo](VkSparseImageMemoryBindInfo.html), [VkSparseImageOpaqueMemoryBindInfo](VkSparseImageOpaqueMemoryBindInfo.html), [vkBindImageMemory](vkBindImageMemory.html), [vkCmdBlitImage](vkCmdBlitImage.html), [vkCmdClearColorImage](vkCmdClearColorImage.html), [vkCmdClearDepthStencilImage](vkCmdClearDepthStencilImage.html), [vkCmdCopyBufferToImage](vkCmdCopyBufferToImage.html), [vkCmdCopyImage](vkCmdCopyImage.html), [vkCmdCopyImageToBuffer](vkCmdCopyImageToBuffer.html), [vkCmdCopyMemoryToImageIndirectNV](vkCmdCopyMemoryToImageIndirectNV.html), [vkCmdResolveImage](vkCmdResolveImage.html), [vkCreateImage](vkCreateImage.html), [vkDestroyImage](vkDestroyImage.html), [vkGetImageDrmFormatModifierPropertiesEXT](vkGetImageDrmFormatModifierPropertiesEXT.html), [vkGetImageMemoryRequirements](vkGetImageMemoryRequirements.html), [vkGetImageOpaqueCaptureDataEXT](vkGetImageOpaqueCaptureDataEXT.html), [vkGetImageSparseMemoryRequirements](vkGetImageSparseMemoryRequirements.html), [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), [vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html), [vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html), [vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html), [vkGetSwapchainImagesKHR](vkGetSwapchainImagesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
