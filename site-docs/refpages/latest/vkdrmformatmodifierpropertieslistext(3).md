# VkDrmFormatModifierPropertiesListEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDrmFormatModifierPropertiesListEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDrmFormatModifierPropertiesListEXT - Structure specifying the list of DRM format modifiers supported for a format

To obtain the list of [Linux DRM format modifiers](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier) compatible with a [VkFormat](VkFormat.html), add a
[VkDrmFormatModifierPropertiesListEXT](#) structure to the `pNext`
chain of [VkFormatProperties2](VkFormatProperties2.html).

The [VkDrmFormatModifierPropertiesListEXT](#) structure is defined as:

// Provided by VK_EXT_image_drm_format_modifier
typedef struct VkDrmFormatModifierPropertiesListEXT {
    VkStructureType                      sType;
    void*                                pNext;
    uint32_t                             drmFormatModifierCount;
    VkDrmFormatModifierPropertiesEXT*    pDrmFormatModifierProperties;
} VkDrmFormatModifierPropertiesListEXT;

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
array of [VkDrmFormatModifierPropertiesEXT](VkDrmFormatModifierPropertiesEXT.html) structures.

If `pDrmFormatModifierProperties` is `NULL`, then the function returns
in `drmFormatModifierCount` the number of modifiers compatible with the
queried `format`.
Otherwise, the application **must** set `drmFormatModifierCount` to the
length of the array `pDrmFormatModifierProperties`; the function will
write at most `drmFormatModifierCount` elements to the array, and will
return in `drmFormatModifierCount` the number of elements written.

Among the elements in array `pDrmFormatModifierProperties`, each
returned `drmFormatModifier` **must** be unique.

Valid Usage (Implicit)

* 
[](#VUID-VkDrmFormatModifierPropertiesListEXT-sType-sType) VUID-VkDrmFormatModifierPropertiesListEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DRM_FORMAT_MODIFIER_PROPERTIES_LIST_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFormatProperties2](VkFormatProperties2.html)

[VK_EXT_image_drm_format_modifier](VK_EXT_image_drm_format_modifier.html), [VkDrmFormatModifierPropertiesEXT](VkDrmFormatModifierPropertiesEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkDrmFormatModifierPropertiesListEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
