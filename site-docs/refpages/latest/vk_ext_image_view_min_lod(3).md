# VK_EXT_image_view_min_lod(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_image_view_min_lod.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_image_view_min_lod](#VK_EXT_image_view_min_lod)
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

VK_EXT_image_view_min_lod - device extension

**Name String**

`VK_EXT_image_view_min_lod`

**Extension Type**

Device extension

**Registered Extension Number**

392

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Joshua Ashton [Joshua-Ashton](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_image_view_min_lod] @Joshua-Ashton%0A*Here describe the issue or question you have about the VK_EXT_image_view_min_lod extension*)

**Last Modified Date**

2021-11-09

**IP Status**

No known IP claims.

**Contributors**

* 
Joshua Ashton, Valve

* 
Hans-Kristian Arntzen, Valve

* 
Samuel Iglesias Gonsalvez, Igalia

* 
Tobias Hector, AMD

* 
Faith Ekstrand, Intel

* 
Tom Olson, ARM

This extension allows applications to clamp the minimum LOD value during
[Image Level(s) Selection](../../../../spec/latest/chapters/textures.html#textures-image-level-selection),
[Texel Gathering](../../../../spec/latest/chapters/textures.html#textures-gather) and
[Integer Texel Coordinate Operations](../../../../spec/latest/chapters/textures.html#textures-integer-coordinate-operations) with a given [VkImageView](VkImageView.html) by
[VkImageViewMinLodCreateInfoEXT](VkImageViewMinLodCreateInfoEXT.html)::`minLod`.

This extension may be useful to restrict a [VkImageView](VkImageView.html) to only mips
which have been uploaded, and the use of fractional `minLod` can be
useful for smoothly introducing new mip levels when using linear mipmap
filtering.

* 
Extending [VkImageViewCreateInfo](VkImageViewCreateInfo.html):

[VkImageViewMinLodCreateInfoEXT](VkImageViewMinLodCreateInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceImageViewMinLodFeaturesEXT](VkPhysicalDeviceImageViewMinLodFeaturesEXT.html)

* 
`VK_EXT_IMAGE_VIEW_MIN_LOD_EXTENSION_NAME`

* 
`VK_EXT_IMAGE_VIEW_MIN_LOD_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_IMAGE_VIEW_MIN_LOD_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_VIEW_MIN_LOD_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2021-07-06 (Joshua Ashton)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_image_view_min_lod).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
