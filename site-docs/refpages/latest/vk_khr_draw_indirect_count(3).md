# VK_KHR_draw_indirect_count(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_draw_indirect_count.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_draw_indirect_count](#VK_KHR_draw_indirect_count)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Commands](#_new_commands)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_draw_indirect_count - device extension

**Name String**

`VK_KHR_draw_indirect_count`

**Extension Type**

Device extension

**Registered Extension Number**

170

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_draw_indirect_count] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_KHR_draw_indirect_count extension*)

**Last Modified Date**

2017-08-25

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

* 
Piers Daniell, NVIDIA

This extension is based on the `[VK_AMD_draw_indirect_count](VK_AMD_draw_indirect_count.html)`
extension.
This extension allows an application to source the number of draws for
indirect drawing calls from a buffer.

Applications might want to do culling on the GPU via a compute shader prior
to drawing.
This enables the application to generate an arbitrary number of drawing
commands and execute them without host intervention.

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
However, if Vulkan 1.2 is supported and this extension is not, the commands
[vkCmdDrawIndirectCount](vkCmdDrawIndirectCount.html) and [vkCmdDrawIndexedIndirectCount](vkCmdDrawIndexedIndirectCount.html) are
optional.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkCmdDrawIndexedIndirectCountKHR](vkCmdDrawIndexedIndirectCount.html)

* 
[vkCmdDrawIndirectCountKHR](vkCmdDrawIndirectCount.html)

* 
`VK_KHR_DRAW_INDIRECT_COUNT_EXTENSION_NAME`

* 
`VK_KHR_DRAW_INDIRECT_COUNT_SPEC_VERSION`

* 
Revision 1, 2017-08-25 (Piers Daniell)

Initial draft based on VK_AMD_draw_indirect_count

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_draw_indirect_count).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
