# VK_IMG_filter_linear_2d(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_IMG_filter_linear_2d.html

## Table of Contents

- [Name](#_name)
- [VK_IMG_filter_linear_2d](#VK_IMG_filter_linear_2d)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_IMG_filter_linear_2d - device extension

**Name String**

`VK_IMG_filter_linear_2d`

**Extension Type**

Device extension

**Registered Extension Number**

601

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**Contact**

* 
Jarred Davies

**Last Modified Date**

2026-05-22

**IP Status**

No known IP claims.

**Contributors**

* 
Jarred Davies, Imagination

This extension introduces
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_LINEAR_2D_BIT_IMG](VkFormatFeatureFlagBits2.html), which
indicates that a format supports the behavior of
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits2.html) but only for 1D
and 2D image types.

* 
`VK_IMG_FILTER_LINEAR_2D_EXTENSION_NAME`

* 
`VK_IMG_FILTER_LINEAR_2D_SPEC_VERSION`

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_LINEAR_2D_BIT_IMG](VkFormatFeatureFlagBits2.html)

None.

* 
Revision 1, 2026-05-22 (Jarred Davies)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_IMG_filter_linear_2d).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
