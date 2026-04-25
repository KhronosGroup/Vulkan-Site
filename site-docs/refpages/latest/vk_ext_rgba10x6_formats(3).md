# VK_EXT_rgba10x6_formats(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_rgba10x6_formats.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_rgba10x6_formats](#VK_EXT_rgba10x6_formats)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_rgba10x6_formats - device extension

**Name String**

`VK_EXT_rgba10x6_formats`

**Extension Type**

Device extension

**Registered Extension Number**

345

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_rgba10x6_formats] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_EXT_rgba10x6_formats extension*)

**Last Modified Date**

2021-09-29

**IP Status**

No known IP claims.

**Contributors**

* 
Jan-Harald Fredriksen, Arm

* 
Graeme Leese, Broadcom

* 
Spencer Fricke, Samsung

This extension enables the
[VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16](VkFormat.html) format to be used without
a [sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) enabled.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT](VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT.html)

* 
`VK_EXT_RGBA10X6_FORMATS_EXTENSION_NAME`

* 
`VK_EXT_RGBA10X6_FORMATS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RGBA10X6_FORMATS_FEATURES_EXT](VkStructureType.html)

1) Should we reuse the existing format enumeration or introduce a new one?

**RESOLVED**: We reuse an existing format enumeration,
[VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16](VkFormat.html), that was previously
exclusively used for YCbCr and therefore had a set of limitations related to
that usage.
The alternative was to introduce a new format token with exactly the same
bit representation as the existing token, but without the limitations.

2) Should we only introduce
[VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16](VkFormat.html) or also 1-3 component
variations?

**RESOLVED**: Only the 4-component format is introduced because the 1- and 2-
component variations are already not exclusive to YCbCr, and the 3-component
variation is not a good match for hardware capabilities.

* 
Revision 1, 2021-09-29 (Jan-Harald Fredriksen)

Initial EXT version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_rgba10x6_formats).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
