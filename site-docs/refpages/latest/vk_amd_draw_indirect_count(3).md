# VK_AMD_draw_indirect_count(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_draw_indirect_count.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_draw_indirect_count](#VK_AMD_draw_indirect_count)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to VK_KHR_draw_indirect_count](#_promotion_to_vk_khr_draw_indirect_count)
- [Promotion_to_VK_KHR_draw_indirect_count](#_promotion_to_vk_khr_draw_indirect_count)
- [New Commands](#_new_commands)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_draw_indirect_count - device extension

**Name String**

`VK_AMD_draw_indirect_count`

**Extension Type**

Device extension

**Registered Extension Number**

34

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[VK_KHR_draw_indirect_count](VK_KHR_draw_indirect_count.html)
extension

Which in turn was *promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Daniel Rakos [drakos-amd](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_draw_indirect_count] @drakos-amd%0A*Here describe the issue or question you have about the VK_AMD_draw_indirect_count extension*)

**Last Modified Date**

2016-08-23

**IP Status**

No known IP claims.

**Contributors**

* 
Matthaeus G. Chajdas, AMD

* 
Derrick Owens, AMD

* 
Graham Sellers, AMD

* 
Daniel Rakos, AMD

* 
Dominik Witczak, AMD

This extension allows an application to source the number of draws for
indirect drawing commands from a buffer.
This enables applications to generate an arbitrary number of drawing
commands and execute them without host intervention.

All functionality in this extension is included in
`[VK_KHR_draw_indirect_count](VK_KHR_draw_indirect_count.html)`, with the suffix changed to KHR.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkCmdDrawIndexedIndirectCountAMD](vkCmdDrawIndexedIndirectCount.html)

* 
[vkCmdDrawIndirectCountAMD](vkCmdDrawIndirectCount.html)

* 
`VK_AMD_DRAW_INDIRECT_COUNT_EXTENSION_NAME`

* 
`VK_AMD_DRAW_INDIRECT_COUNT_SPEC_VERSION`

* 
Revision 2, 2016-08-23 (Dominik Witczak)

Minor fixes

Revision 1, 2016-07-21 (Matthaeus Chajdas)

* 
Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_draw_indirect_count).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
