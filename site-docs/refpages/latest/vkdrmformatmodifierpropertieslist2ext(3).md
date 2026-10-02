# VkDrmFormatModifierPropertiesList2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDrmFormatModifierPropertiesList2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDrmFormatModifierPropertiesList2EXT - Structure specifying the list of DRM format modifiers supported for a format

The list of [Linux DRM format modifiers](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier)
compatible with a [VkFormat](VkFormat.html) **can** be obtained by adding a
[VkDrmFormatModifierPropertiesList2EXT](#) structure to the `pNext`
chain of [VkFormatProperties2](VkFormatProperties2.html).

The [VkDrmFormatModifierPropertiesList2EXT](#) structure is defined as:

// Provided by VK_EXT_image_drm_format_modifier with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
typedef struct VkDrmFormatModifierPropertiesList2EXT {
    VkStructureType                       sType;
    void*                                 pNext;
    uint32_t                              drmFormatModifierCount;
    VkDrmFormatModifierProperties2EXT*    pDrmFormatModifierProperties;
} VkDrmFormatModifierPropertiesList2EXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`drmFormatModifierCount` is an inout parameter related to the number
of modifiers compatible with the `format`, as described below.

* 
`pDrmFormatModifierProperties` is either `NULL` or a pointer to an
array of [VkDrmFormatModifierProperties2EXT](VkDrmFormatModifierProperties2EXT.html) structures.

If `pDrmFormatModifierProperties` is `NULL`, the number of modifiers
compatible with the queried `format` is returned in
`drmFormatModifierCount`.
Otherwise, the application **must** set `drmFormatModifierCount` to the
length of the array `pDrmFormatModifierProperties`; the function will
write at most `drmFormatModifierCount` elements to the array, and will
return in `drmFormatModifierCount` the number of elements written.

Among the elements in array `pDrmFormatModifierProperties`, each
returned `drmFormatModifier` **must** be unique.

Among the elements in array `pDrmFormatModifierProperties`, the bits
reported in `drmFormatModifierTilingFeatures` **must** include the bits
reported in the corresponding element of
`VkDrmFormatModifierPropertiesListEXT`::`pDrmFormatModifierProperties`.

Valid Usage (Implicit)

* 
[](#VUID-VkDrmFormatModifierPropertiesList2EXT-sType-sType) VUID-VkDrmFormatModifierPropertiesList2EXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DRM_FORMAT_MODIFIER_PROPERTIES_LIST_2_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFormatProperties2](VkFormatProperties2.html)

[VK_EXT_image_drm_format_modifier](VK_EXT_image_drm_format_modifier.html), [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkDrmFormatModifierProperties2EXT](VkDrmFormatModifierProperties2EXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkDrmFormatModifierPropertiesList2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
