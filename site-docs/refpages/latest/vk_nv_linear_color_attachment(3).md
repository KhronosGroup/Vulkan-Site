# VK_NV_linear_color_attachment(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_linear_color_attachment.html

## Table of Contents

- [Name](#_name)
- [VK_NV_linear_color_attachment](#VK_NV_linear_color_attachment)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_linear_color_attachment - device extension

**Name String**

`VK_NV_linear_color_attachment`

**Extension Type**

Device extension

**Registered Extension Number**

431

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_format_feature_flags2

**Contact**

* 
sourav parmar [souravpNV](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_linear_color_attachment] @souravpNV%0A*Here describe the issue or question you have about the VK_NV_linear_color_attachment extension*)

**Last Modified Date**

2021-12-02

**Interactions and External Dependencies**

* 
This extension requires `[VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)`

**Contributors**

* 
Pat Brown, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Sourav Parmar, NVIDIA

This extension expands support for using [VK_IMAGE_TILING_LINEAR](VkImageTiling.html) images
as color attachments when all the color attachments in the render pass
instance have [VK_IMAGE_TILING_LINEAR](VkImageTiling.html) tiling.
This extension adds a new flag bit
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html) that extends the
existing [VkFormatFeatureFlagBits2KHR](VkFormatFeatureFlagBits2.html) bits.
This flag **can** be set for renderable color formats in the
[VkFormatProperties3KHR](VkFormatProperties3.html)::`linearTilingFeatures` format properties
structure member.
Formats with the [VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html)
flag **may** be used as color attachments as long as all the color attachments
in the render pass instance have [VK_IMAGE_TILING_LINEAR](VkImageTiling.html) tiling, and
the formats their images views are created with have
[VkFormatProperties3KHR](VkFormatProperties3.html)::`linearTilingFeatures` which include
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html).
This extension supports both dynamic rendering and traditional render
passes.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceLinearColorAttachmentFeaturesNV](VkPhysicalDeviceLinearColorAttachmentFeaturesNV.html)

* 
`VK_NV_LINEAR_COLOR_ATTACHMENT_EXTENSION_NAME`

* 
`VK_NV_LINEAR_COLOR_ATTACHMENT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINEAR_COLOR_ATTACHMENT_FEATURES_NV](VkStructureType.html)

If [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html)

* 
Revision 1, 2021-11-29 (sourav parmar)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_linear_color_attachment).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
