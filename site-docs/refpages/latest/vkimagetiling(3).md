# VkImageTiling(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageTiling.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageTiling - Specifies the tiling arrangement of data in an image

Possible values of [VkImageCreateInfo](VkImageCreateInfo.html)::`tiling`, specifying the
tiling arrangement of texel blocks in an image, are:

// Provided by VK_VERSION_1_0
typedef enum VkImageTiling {
    VK_IMAGE_TILING_OPTIMAL = 0,
    VK_IMAGE_TILING_LINEAR = 1,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT = 1000158000,
} VkImageTiling;

* 
[VK_IMAGE_TILING_OPTIMAL](#) specifies optimal tiling (texels are laid
out in an implementation-dependent arrangement, for more efficient
memory access).

* 
[VK_IMAGE_TILING_LINEAR](#) specifies linear tiling (texels are laid
out in memory in row-major order, possibly with some padding on each
row).

* 
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#) specifies that the image’s
tiling is defined by a [Linux DRM format    modifier](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier).
The modifier is specified at image creation with
[VkImageDrmFormatModifierListCreateInfoEXT](VkImageDrmFormatModifierListCreateInfoEXT.html) or
[VkImageDrmFormatModifierExplicitCreateInfoEXT](VkImageDrmFormatModifierExplicitCreateInfoEXT.html), and **can** be queried
with [vkGetImageDrmFormatModifierPropertiesEXT](vkGetImageDrmFormatModifierPropertiesEXT.html).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html), [VkPhysicalDeviceSparseImageFormatInfo2](VkPhysicalDeviceSparseImageFormatInfo2.html), [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html), [vkGetPhysicalDeviceExternalImageFormatPropertiesNV](vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html), [vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html), [vkGetPhysicalDeviceSparseImageFormatProperties](vkGetPhysicalDeviceSparseImageFormatProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageTiling).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
