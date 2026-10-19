# VK_EXT_separate_stencil_usage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_separate_stencil_usage.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_separate_stencil_usage](#VK_EXT_separate_stencil_usage)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_separate_stencil_usage - device extension

**Name String**

`VK_EXT_separate_stencil_usage`

**Extension Type**

Device extension

**Registered Extension Number**

247

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Daniel Rakos [drakos-amd](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_separate_stencil_usage] @drakos-amd%0A*Here describe the issue or question you have about the VK_EXT_separate_stencil_usage extension*)

**Last Modified Date**

2018-11-08

**IP Status**

No known IP claims.

**Contributors**

* 
Daniel Rakos, AMD

* 
Jordan Logan, AMD

This extension allows specifying separate usage flags for the stencil aspect
of images with a depth-stencil format at image creation time.

All functionality in this extension is included in core Vulkan 1.2, with the
EXT suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkImageCreateInfo](VkImageCreateInfo.html), [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html):

[VkImageStencilUsageCreateInfoEXT](VkImageStencilUsageCreateInfo.html)

* 
`VK_EXT_SEPARATE_STENCIL_USAGE_EXTENSION_NAME`

* 
`VK_EXT_SEPARATE_STENCIL_USAGE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_IMAGE_STENCIL_USAGE_CREATE_INFO_EXT](VkStructureType.html)

* 
Revision 1, 2018-11-08 (Daniel Rakos)

Internal revisions.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_separate_stencil_usage).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
