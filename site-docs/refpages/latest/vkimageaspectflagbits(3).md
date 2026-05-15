# VkImageAspectFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageAspectFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageAspectFlagBits - Bitmask specifying which aspects of an image are included in a view

Bits which **can** be set in an aspect mask to specify aspects of an image for
purposes such as identifying a subresource, are:

// Provided by VK_VERSION_1_0
typedef enum VkImageAspectFlagBits {
    VK_IMAGE_ASPECT_COLOR_BIT = 0x00000001,
    VK_IMAGE_ASPECT_DEPTH_BIT = 0x00000002,
    VK_IMAGE_ASPECT_STENCIL_BIT = 0x00000004,
    VK_IMAGE_ASPECT_METADATA_BIT = 0x00000008,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_ASPECT_PLANE_0_BIT = 0x00000010,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_ASPECT_PLANE_1_BIT = 0x00000020,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_ASPECT_PLANE_2_BIT = 0x00000040,
  // Provided by VK_VERSION_1_3
    VK_IMAGE_ASPECT_NONE = 0,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_IMAGE_ASPECT_MEMORY_PLANE_0_BIT_EXT = 0x00000080,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_IMAGE_ASPECT_MEMORY_PLANE_1_BIT_EXT = 0x00000100,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_IMAGE_ASPECT_MEMORY_PLANE_2_BIT_EXT = 0x00000200,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_IMAGE_ASPECT_MEMORY_PLANE_3_BIT_EXT = 0x00000400,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_IMAGE_ASPECT_PLANE_0_BIT_KHR = VK_IMAGE_ASPECT_PLANE_0_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_IMAGE_ASPECT_PLANE_1_BIT_KHR = VK_IMAGE_ASPECT_PLANE_1_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_IMAGE_ASPECT_PLANE_2_BIT_KHR = VK_IMAGE_ASPECT_PLANE_2_BIT,
  // Provided by VK_KHR_maintenance4
    VK_IMAGE_ASPECT_NONE_KHR = VK_IMAGE_ASPECT_NONE,
} VkImageAspectFlagBits;

* 
[VK_IMAGE_ASPECT_NONE](#) specifies no image aspect, or the image
aspect is not applicable.

* 
[VK_IMAGE_ASPECT_COLOR_BIT](#) specifies the color aspect.

* 
[VK_IMAGE_ASPECT_DEPTH_BIT](#) specifies the depth aspect.

* 
[VK_IMAGE_ASPECT_STENCIL_BIT](#) specifies the stencil aspect.

* 
[VK_IMAGE_ASPECT_METADATA_BIT](#) specifies the metadata aspect used
for [sparse resource](../../../../spec/latest/chapters/sparsemem.html#sparsememory) operations.

* 
[VK_IMAGE_ASPECT_PLANE_0_BIT](#) specifies plane 0 of a *multi-planar*
image format.

* 
[VK_IMAGE_ASPECT_PLANE_1_BIT](#) specifies plane 1 of a *multi-planar*
image format.

* 
[VK_IMAGE_ASPECT_PLANE_2_BIT](#) specifies plane 2 of a *multi-planar*
image format.

* 
[VK_IMAGE_ASPECT_MEMORY_PLANE_0_BIT_EXT](#) specifies *memory plane* 0.

* 
[VK_IMAGE_ASPECT_MEMORY_PLANE_1_BIT_EXT](#) specifies *memory plane* 1.

* 
[VK_IMAGE_ASPECT_MEMORY_PLANE_2_BIT_EXT](#) specifies *memory plane* 2.

* 
[VK_IMAGE_ASPECT_MEMORY_PLANE_3_BIT_EXT](#) specifies *memory plane* 3.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html), [VkDeviceImageMemoryRequirements](VkDeviceImageMemoryRequirements.html), [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html), [VkImageAspectFlags](VkImageAspectFlags.html), [VkImagePlaneMemoryRequirementsInfo](VkImagePlaneMemoryRequirementsInfo.html), [VkImportMetalTextureInfoEXT](VkImportMetalTextureInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageAspectFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
