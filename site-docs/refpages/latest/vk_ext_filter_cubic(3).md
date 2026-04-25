# VK_EXT_filter_cubic(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_filter_cubic.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_filter_cubic](#VK_EXT_filter_cubic)
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

VK_EXT_filter_cubic - device extension

**Name String**

`VK_EXT_filter_cubic`

**Extension Type**

Device extension

**Registered Extension Number**

171

**Revision**

3

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_filter_cubic] @mnetsch%0A*Here describe the issue or question you have about the VK_EXT_filter_cubic extension*)

**Last Modified Date**

2019-12-13

**Contributors**

* 
Bill Licea-Kane, Qualcomm Technologies, Inc.

* 
Andrew Garrard, Samsung

* 
Daniel Koch, NVIDIA

* 
Donald Scorgie, Imagination Technologies

* 
Graeme Leese, Broadcom

* 
Jan-Harald Fredriksen, ARM

* 
Jeff Leger, Qualcomm Technologies, Inc.

* 
Tobias Hector, AMD

* 
Tom Olson, ARM

* 
Stuart Smith, Imagination Technologies

`VK_EXT_filter_cubic` extends `VK_IMG_filter_cubic`.

It documents cubic filtering of other image view types.
It adds new structures that **can** be added to the `pNext` chain of
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) and [VkImageFormatProperties2](VkImageFormatProperties2.html)
that **can** be used to determine which image types and which image view types
support cubic filtering.

* 
Extending [VkImageFormatProperties2](VkImageFormatProperties2.html):

[VkFilterCubicImageViewImageFormatPropertiesEXT](VkFilterCubicImageViewImageFormatPropertiesEXT.html)

Extending [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html):

* 
[VkPhysicalDeviceImageViewImageFormatInfoEXT](VkPhysicalDeviceImageViewImageFormatInfoEXT.html)

* 
`VK_EXT_FILTER_CUBIC_EXTENSION_NAME`

* 
`VK_EXT_FILTER_CUBIC_SPEC_VERSION`

* 
Extending [VkFilter](VkFilter.html):

[VK_FILTER_CUBIC_EXT](VkFilter.html)

Extending [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](VkFormatFeatureFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_FILTER_CUBIC_IMAGE_VIEW_IMAGE_FORMAT_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_VIEW_IMAGE_FORMAT_INFO_EXT](VkStructureType.html)

* 
Revision 3, 2019-12-13 (wwlk)

Delete requirement to cubic filter the formats USCALED_PACKED32,
SSCALED_PACKED32, UINT_PACK32, and SINT_PACK32 (cut/paste error)

Revision 2, 2019-06-05 (wwlk)

* 
Clarify 1D optional

Revision 1, 2019-01-24 (wwlk)

* 
Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_filter_cubic).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
