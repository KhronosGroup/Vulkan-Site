# VK_NV_shader_subgroup_partitioned(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_shader_subgroup_partitioned.html

## Table of Contents

- [Name](#_name)
- [VK_NV_shader_subgroup_partitioned](#VK_NV_shader_subgroup_partitioned)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to VK_EXT_shader_subgroup_partitioned](#_promotion_to_vk_ext_shader_subgroup_partitioned)
- [Promotion_to_VK_EXT_shader_subgroup_partitioned](#_promotion_to_vk_ext_shader_subgroup_partitioned)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_shader_subgroup_partitioned - device extension

**Name String**

`VK_NV_shader_subgroup_partitioned`

**Extension Type**

Device extension

**Registered Extension Number**

199

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_NV_shader_subgroup_partitioned](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_shader_subgroup_partitioned.html)

**Deprecation State**

* 
*Promoted* to
[VK_EXT_shader_subgroup_partitioned](VK_EXT_shader_subgroup_partitioned.html)
extension

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_shader_subgroup_partitioned] @jeffbolznv%0A*Here describe the issue or question you have about the VK_NV_shader_subgroup_partitioned extension*)

**Last Modified Date**

2025-11-12

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_shader_subgroup_partitioned`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GL_NV_shader_subgroup_partitioned.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension enables support for a new class of
[group operations](../../../../spec/latest/chapters/shaders.html#shaders-group-operations) on [subgroups](../../../../spec/latest/chapters/shaders.html#shaders-scope-subgroup) via the
[`GL_NV_shader_subgroup_partitioned`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GL_NV_shader_subgroup_partitioned.txt)
GLSL extension and
[`SPV_NV_shader_subgroup_partitioned`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_shader_subgroup_partitioned.html)
SPIR-V extension.
Support for these new operations is advertised via the
[VK_SUBGROUP_FEATURE_PARTITIONED_BIT_NV](VkSubgroupFeatureFlagBits.html) bit.

This extension requires Vulkan 1.1, for general subgroup support.

All functionality in this extension is included in
`[VK_EXT_shader_subgroup_partitioned](VK_EXT_shader_subgroup_partitioned.html)`, with the suffix changed to EXT.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
`VK_NV_SHADER_SUBGROUP_PARTITIONED_EXTENSION_NAME`

* 
`VK_NV_SHADER_SUBGROUP_PARTITIONED_SPEC_VERSION`

* 
Extending [VkSubgroupFeatureFlagBits](VkSubgroupFeatureFlagBits.html):

[VK_SUBGROUP_FEATURE_PARTITIONED_BIT_NV](VkSubgroupFeatureFlagBits.html)

* 
Revision 1, 2018-03-17 (Jeff Bolz)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_shader_subgroup_partitioned).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
