# VK_EXT_ycbcr_2plane_444_formats(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_ycbcr_2plane_444_formats.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_ycbcr_2plane_444_formats](#VK_EXT_ycbcr_2plane_444_formats)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_ycbcr_2plane_444_formats - device extension

**Name String**

`VK_EXT_ycbcr_2plane_444_formats`

**Extension Type**

Device extension

**Registered Extension Number**

331

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Tony Zlatinski [tzlatinski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_ycbcr_2plane_444_formats] @tzlatinski%0A*Here describe the issue or question you have about the VK_EXT_ycbcr_2plane_444_formats extension*)

**Last Modified Date**

2020-07-28

**IP Status**

No known IP claims.

**Contributors**

* 
Piers Daniell, NVIDIA

* 
Ping Liu, Intel

This extension adds some Y′CBCR formats that are in common use for video
encode and decode, but were not part of the
`[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html)` extension.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT](VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT.html)

* 
`VK_EXT_YCBCR_2PLANE_444_FORMATS_EXTENSION_NAME`

* 
`VK_EXT_YCBCR_2PLANE_444_FORMATS_SPEC_VERSION`

* 
Extending [VkFormat](VkFormat.html):

[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16_EXT](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16_EXT](VkFormat.html)

* 
[VK_FORMAT_G16_B16R16_2PLANE_444_UNORM_EXT](VkFormat.html)

* 
[VK_FORMAT_G8_B8R8_2PLANE_444_UNORM_EXT](VkFormat.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_YCBCR_2_PLANE_444_FORMATS_FEATURES_EXT](VkStructureType.html)

The format enumerants introduced by the extension are included in core
Vulkan 1.3, with the EXT suffix omitted.
However, runtime support for these formats is optional in core Vulkan 1.3,
while if this extension is supported, runtime support is mandatory.
The feature structure is not promoted.
The original enum names are still available as aliases of the core
functionality.

* 
Revision 1, 2020-03-08 (Piers Daniell)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_ycbcr_2plane_444_formats).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
