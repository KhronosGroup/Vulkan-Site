# VK_ARM_format_pack(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_format_pack.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_format_pack](#VK_ARM_format_pack)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [What do we call this extension?](#_what_do_we_call_this_extension)
- [What_do_we_call_this_extension?](#_what_do_we_call_this_extension)
- [Compatibility classes](#_compatibility_classes)
- [Format feature requirements](#_format_feature_requirements)
- [Format_feature_requirements](#_format_feature_requirements)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_format_pack - device extension

**Name String**

`VK_ARM_format_pack`

**Extension Type**

Device extension

**Registered Extension Number**

610

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_format_pack] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_ARM_format_pack extension*)

**Last Modified Date**

2025-03-24

**Interactions and External Dependencies**
**Contributors**

* 
Jan-Harald Fredriksen, Arm

* 
Lisa Wu, Arm

* 
Oivind Boge, Arm

This extension adds support for additional 1-, 2- and 4-component formats
with 10, 12, or 14 bits of components in 16-bit containers.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFormatPackFeaturesARM](VkPhysicalDeviceFormatPackFeaturesARM.html)

* 
`VK_ARM_FORMAT_PACK_EXTENSION_NAME`

* 
`VK_ARM_FORMAT_PACK_SPEC_VERSION`

* 
Extending [VkFormat](VkFormat.html):

[VK_FORMAT_G14X2_B14X2R14X2_2PLANE_420_UNORM_3PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_G14X2_B14X2R14X2_2PLANE_422_UNORM_3PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_R10X6G10X6B10X6A10X6_UINT_4PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_R10X6G10X6_UINT_2PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_R10X6_UINT_PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_R12X4G12X4B12X4A12X4_UINT_4PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_R12X4G12X4_UINT_2PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_R12X4_UINT_PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_R14X2G14X2B14X2A14X2_UINT_4PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_R14X2G14X2B14X2A14X2_UNORM_4PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_R14X2G14X2_UINT_2PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_R14X2G14X2_UNORM_2PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_R14X2_UINT_PACK16_ARM](VkFormat.html)

* 
[VK_FORMAT_R14X2_UNORM_PACK16_ARM](VkFormat.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FORMAT_PACK_FEATURES_ARM](VkStructureType.html)

**RESOLVED**

Many existing extension have the format in the name, but in this case we
want to expose multiple formats.

We will describe this set of formats as a “pack”.

**RESOLVED**

Should these additional formats be in the same compatibility class as any
other formats? For single-plane formats, we put formats with the same number
of bits (but different types) in the same class.
Each multi-plane or subsampled format gets its own compatibility class.
This is consistent with how existing formats are handled.

**RESOLVED**

The format feature queries could be used to determine what is supported on
any given implementation, but it may be useful to establish a baseline
requirement in the specification.
For that purpose, we require a set of format features - sufficient to enable
texture operations - to be supported for the added unsigned integer
single-plane formats.
Other formats and format features are optional.

* 
Revision 1, 2025-03-24

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_format_pack).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
