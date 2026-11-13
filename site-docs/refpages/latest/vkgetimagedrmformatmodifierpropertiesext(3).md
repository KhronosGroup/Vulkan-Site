# vkGetImageDrmFormatModifierPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetImageDrmFormatModifierPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetImageDrmFormatModifierPropertiesEXT - Returns an image’s DRM format modifier

If an image was created with [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html),
then the image has a [Linux DRM format modifier](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier).
To query the *modifier*, call:

// Provided by VK_EXT_image_drm_format_modifier
VkResult vkGetImageDrmFormatModifierPropertiesEXT(
    VkDevice                                    device,
    VkImage                                     image,
    VkImageDrmFormatModifierPropertiesEXT*      pProperties);

* 
`device` is the logical device that owns the image.

* 
`image` is the queried image.

* 
`pProperties` is a pointer to a
[VkImageDrmFormatModifierPropertiesEXT](VkImageDrmFormatModifierPropertiesEXT.html) structure in which
properties of the image’s *DRM format modifier* are returned.

Valid Usage

* 
[](#VUID-vkGetImageDrmFormatModifierPropertiesEXT-image-02272) VUID-vkGetImageDrmFormatModifierPropertiesEXT-image-02272

`image` **must** have been created with [    `tiling`](../../../../spec/latest/chapters/resources.html#VkImageCreateInfo) equal to [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageDrmFormatModifierPropertiesEXT-device-parameter) VUID-vkGetImageDrmFormatModifierPropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetImageDrmFormatModifierPropertiesEXT-image-parameter) VUID-vkGetImageDrmFormatModifierPropertiesEXT-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkGetImageDrmFormatModifierPropertiesEXT-pProperties-parameter) VUID-vkGetImageDrmFormatModifierPropertiesEXT-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkImageDrmFormatModifierPropertiesEXT](VkImageDrmFormatModifierPropertiesEXT.html) structure

* 
[](#VUID-vkGetImageDrmFormatModifierPropertiesEXT-image-parent) VUID-vkGetImageDrmFormatModifierPropertiesEXT-image-parent

 `image` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_image_drm_format_modifier](VK_EXT_image_drm_format_modifier.html), [VkDevice](VkDevice.html), [VkImage](VkImage.html), [VkImageDrmFormatModifierPropertiesEXT](VkImageDrmFormatModifierPropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetImageDrmFormatModifierPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
