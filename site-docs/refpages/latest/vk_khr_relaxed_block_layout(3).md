# VK_KHR_relaxed_block_layout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_relaxed_block_layout.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_relaxed_block_layout](#VK_KHR_relaxed_block_layout)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_relaxed_block_layout - device extension

**Name String**

`VK_KHR_relaxed_block_layout`

**Extension Type**

Device extension

**Registered Extension Number**

145

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
John Kessenich [johnkslang](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_relaxed_block_layout] @johnkslang%0A*Here describe the issue or question you have about the VK_KHR_relaxed_block_layout extension*)

**Last Modified Date**

2017-03-26

**IP Status**

No known IP claims.

**Contributors**

* 
John Kessenich, Google

The `VK_KHR_relaxed_block_layout` extension allows implementations to
indicate they can support more variation in block `Offset` decorations.
For example, placing a vector of three floats at an offset of
16×N +  4.

See [Offset and Stride Assignment](../../../../spec/latest/chapters/interfaces.html#interfaces-resources-layout) for
details.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
`VK_KHR_RELAXED_BLOCK_LAYOUT_EXTENSION_NAME`

* 
`VK_KHR_RELAXED_BLOCK_LAYOUT_SPEC_VERSION`

* 
Revision 1, 2017-03-26 (JohnK)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_relaxed_block_layout).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
