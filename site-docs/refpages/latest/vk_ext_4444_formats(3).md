# VK_EXT_4444_formats(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_4444_formats.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_4444_formats](#VK_EXT_4444_formats)
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

VK_EXT_4444_formats - device extension

**Name String**

`VK_EXT_4444_formats`

**Extension Type**

Device extension

**Registered Extension Number**

341

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Joshua Ashton [Joshua-Ashton](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_4444_formats] @Joshua-Ashton%0A*Here describe the issue or question you have about the VK_EXT_4444_formats extension*)

**Last Modified Date**

2020-07-28

**IP Status**

No known IP claims.

**Contributors**

* 
Joshua Ashton, Valve

* 
Faith Ekstrand, Intel

This extension defines the [VK_FORMAT_A4R4G4B4_UNORM_PACK16_EXT](VkFormat.html) and
[VK_FORMAT_A4B4G4R4_UNORM_PACK16_EXT](VkFormat.html) formats which are defined in other
current graphics APIs.

This extension may be useful for building translation layers for those APIs
or for porting applications that use these formats without having to resort
to swizzles.

When VK_EXT_custom_border_color is used, these formats are not subject to
the same restrictions for border color without format as with
VK_FORMAT_B4G4R4A4_UNORM_PACK16.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevice4444FormatsFeaturesEXT](VkPhysicalDevice4444FormatsFeaturesEXT.html)

* 
`VK_EXT_4444_FORMATS_EXTENSION_NAME`

* 
`VK_EXT_4444_FORMATS_SPEC_VERSION`

* 
Extending [VkFormat](VkFormat.html):

[VK_FORMAT_A4B4G4R4_UNORM_PACK16_EXT](VkFormat.html)

* 
[VK_FORMAT_A4R4G4B4_UNORM_PACK16_EXT](VkFormat.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_4444_FORMATS_FEATURES_EXT](VkStructureType.html)

The format enumerants introduced by the extension are included in core
Vulkan 1.3, with the EXT suffix omitted.
However, runtime support for these formats is optional in core Vulkan 1.3,
while if this extension is supported, runtime support is mandatory.
The feature structure is not promoted.
The original enum names are still available as aliases of the core
functionality.

* 
Revision 1, 2020-07-04 (Joshua Ashton)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_4444_formats).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
