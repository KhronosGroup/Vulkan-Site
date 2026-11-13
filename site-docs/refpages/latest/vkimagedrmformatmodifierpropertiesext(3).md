# VkImageDrmFormatModifierPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageDrmFormatModifierPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageDrmFormatModifierPropertiesEXT - Properties of an image’s Linux DRM format modifier

The [VkImageDrmFormatModifierPropertiesEXT](#) structure is defined as:

// Provided by VK_EXT_image_drm_format_modifier
typedef struct VkImageDrmFormatModifierPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           drmFormatModifier;
} VkImageDrmFormatModifierPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`drmFormatModifier` returns the image’s
[Linux DRM format modifier](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier).

If the `image` was created with
[VkImageDrmFormatModifierListCreateInfoEXT](VkImageDrmFormatModifierListCreateInfoEXT.html), then the returned
`drmFormatModifier` **must** belong to the list of modifiers provided at
time of image creation in
[VkImageDrmFormatModifierListCreateInfoEXT](VkImageDrmFormatModifierListCreateInfoEXT.html)::`pDrmFormatModifiers`.
If the `image` was created with
[VkImageDrmFormatModifierExplicitCreateInfoEXT](VkImageDrmFormatModifierExplicitCreateInfoEXT.html), then the returned
`drmFormatModifier` **must** be the modifier provided at time of image
creation in
[VkImageDrmFormatModifierExplicitCreateInfoEXT](VkImageDrmFormatModifierExplicitCreateInfoEXT.html)::`drmFormatModifier`.

Valid Usage (Implicit)

* 
[](#VUID-VkImageDrmFormatModifierPropertiesEXT-sType-sType) VUID-VkImageDrmFormatModifierPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_DRM_FORMAT_MODIFIER_PROPERTIES_EXT](VkStructureType.html)

* 
[](#VUID-VkImageDrmFormatModifierPropertiesEXT-pNext-pNext) VUID-VkImageDrmFormatModifierPropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_image_drm_format_modifier](VK_EXT_image_drm_format_modifier.html), [VkStructureType](VkStructureType.html), [vkGetImageDrmFormatModifierPropertiesEXT](vkGetImageDrmFormatModifierPropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageDrmFormatModifierPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
