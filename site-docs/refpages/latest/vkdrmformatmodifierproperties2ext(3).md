# VkDrmFormatModifierProperties2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDrmFormatModifierProperties2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDrmFormatModifierProperties2EXT - Structure specifying properties of a format when combined with a DRM format modifier

The [VkDrmFormatModifierProperties2EXT](#) structure describes properties
of a [VkFormat](VkFormat.html) when that format is combined with a
[Linux DRM format modifier](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier).
These properties, like those of [VkFormatProperties2](VkFormatProperties2.html), are independent
of any particular image.

The [VkDrmFormatModifierPropertiesEXT](VkDrmFormatModifierPropertiesEXT.html) structure is defined as:

// Provided by VK_EXT_image_drm_format_modifier with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
typedef struct VkDrmFormatModifierProperties2EXT {
    uint64_t                 drmFormatModifier;
    uint32_t                 drmFormatModifierPlaneCount;
    VkFormatFeatureFlags2    drmFormatModifierTilingFeatures;
} VkDrmFormatModifierProperties2EXT;

* 
`drmFormatModifier` is a *Linux DRM format modifier*.

* 
`drmFormatModifierPlaneCount` is the number of *memory planes* in
any image created with `format` and `drmFormatModifier`.
An image’s *memory planecount* is distinct from its *format planecount*,
as explained below.

* 
`drmFormatModifierTilingFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html) that are supported by any image created
with `format` and `drmFormatModifier`.

[VK_EXT_image_drm_format_modifier](VK_EXT_image_drm_format_modifier.html), [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkDrmFormatModifierPropertiesList2EXT](VkDrmFormatModifierPropertiesList2EXT.html), [VkFormatFeatureFlags2](VkFormatFeatureFlags2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkDrmFormatModifierProperties2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
